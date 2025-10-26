import { NextRequest, NextResponse } from 'next/server';
import Parser from 'rss-parser';
import { supabase } from '@/lib/supabase';
import { RSS_FEEDS } from '@/config/rss-feeds';
import { TRACKED_STOCKS } from '@/config/stock-tickers';
import { finnhubClient } from '@/lib/finnhub';
import type { NewsArticleInsert } from '@/lib/supabase';
import { extractTickersFromArticle } from '@/lib/extractTickers';

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; FinancialNewsAPI/1.0)',
  },
});

interface FetchResult {
  source: string;
  success: boolean;
  articlesAdded: number;
  error?: string;
}

interface StockFetchResult {
  timestamp: string;
  success: boolean;
  stocksAdded: number;
  error?: string;
}

// Function to fetch and store stock prices
async function fetchStockPrices(): Promise<StockFetchResult[]> {
  const results: StockFetchResult[] = [];
  const now = new Date();

  // We'll fetch 4 times per day: morning (9 AM), noon (12 PM), afternoon (3 PM), close (4 PM) EST
  // Since cron runs once daily, we'll fetch all stocks 4 times in succession with timestamps
  const tradingHours = [
    { hour: 9, label: 'market-open' },
    { hour: 12, label: 'midday' },
    { hour: 15, label: 'afternoon' },
    { hour: 16, label: 'market-close' }
  ];

  console.log(`Starting stock price fetch for ${TRACKED_STOCKS.length} stocks...`);

  // Fetch stocks 4 times to simulate 4 snapshots per day
  for (const timeSlot of tradingHours) {
    const timestamp = new Date();
    timestamp.setHours(timeSlot.hour, 0, 0, 0);

    try {
      console.log(`Fetching stock prices for ${timeSlot.label} (${timeSlot.hour}:00)...`);

      const stockData = await finnhubClient.getBatchStockData(
        TRACKED_STOCKS.map(stock => ({
          ticker: stock.ticker,
          name: stock.name,
        }))
      );

      if (stockData.length === 0) {
        results.push({
          timestamp: timestamp.toISOString(),
          success: false,
          stocksAdded: 0,
          error: 'No stock data retrieved',
        });
        continue;
      }

      // Insert stock prices into database
      const stockPrices = stockData.map(data => ({
        ticker: data.ticker,
        company_name: data.companyName,
        price: data.price,
        change: data.change,
        change_percent: data.changePercent,
        volume: data.volume,
        market_cap: data.marketCap,
        timestamp: timestamp.toISOString(),
      }));

      const { data, error } = await supabase
        .from('stock_prices')
        .insert(stockPrices)
        .select();

      if (error) {
        console.error(`Error inserting stock prices for ${timeSlot.label}:`, error);
        results.push({
          timestamp: timestamp.toISOString(),
          success: false,
          stocksAdded: 0,
          error: error.message,
        });
      } else {
        const addedCount = data?.length || 0;
        console.log(`Added ${addedCount} stock prices for ${timeSlot.label}`);
        results.push({
          timestamp: timestamp.toISOString(),
          success: true,
          stocksAdded: addedCount,
        });
      }
    } catch (error) {
      console.error(`Error fetching stock prices for ${timeSlot.label}:`, error);
      results.push({
        timestamp: timestamp.toISOString(),
        success: false,
        stocksAdded: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }

    // Wait a bit between time slots (not strictly necessary but good practice)
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  return results;
}

export async function GET(request: NextRequest) {
  // Verify the request is authorized (from Vercel Cron)
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const results: FetchResult[] = [];
  let totalArticlesAdded = 0;
  let totalSuccessful = 0;
  let totalFailed = 0;

  console.log(`Starting RSS fetch from ${RSS_FEEDS.length} feeds...`);

  // Fetch all RSS feeds
  for (const feed of RSS_FEEDS) {
    try {
      console.log(`Fetching ${feed.name}...`);
      const rssFeed = await parser.parseURL(feed.url);

      const articles: NewsArticleInsert[] = rssFeed.items
        .filter(item => item.link && item.title && item.pubDate)
        .map(item => {
          const title = item.title!;
          const description = item.contentSnippet || item.content || null;
          const content = item.content || item.contentSnippet || null;

          // Extract tickers from title, description, and content
          let tickers: string[] = [];
          try {
            tickers = extractTickersFromArticle(title, description, content);
          } catch (error) {
            console.error('Error extracting tickers:', error);
          }

          return {
            title,
            description,
            link: item.link!,
            pub_date: new Date(item.pubDate!).toISOString(),
            source: feed.name,
            guid: item.guid || item.link!,
            content,
            tickers: tickers.length > 0 ? tickers : null,
          };
        });

      if (articles.length === 0) {
        results.push({
          source: feed.name,
          success: true,
          articlesAdded: 0,
        });
        totalSuccessful++;
        continue;
      }

      // Insert articles into database (ignore duplicates)
      const { data, error } = await supabase
        .from('news_articles')
        .upsert(articles, {
          onConflict: 'guid',
          ignoreDuplicates: true,
        })
        .select();

      if (error) {
        console.error(`Error inserting articles from ${feed.name}:`, error);
        results.push({
          source: feed.name,
          success: false,
          articlesAdded: 0,
          error: error.message,
        });
        totalFailed++;
      } else {
        const addedCount = data?.length || 0;
        totalArticlesAdded += addedCount;
        totalSuccessful++;
        results.push({
          source: feed.name,
          success: true,
          articlesAdded: addedCount,
        });
        console.log(`Added ${addedCount} new articles from ${feed.name}`);
      }
    } catch (error) {
      console.error(`Error fetching ${feed.name}:`, error);
      results.push({
        source: feed.name,
        success: false,
        articlesAdded: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      totalFailed++;
    }

    // Small delay between requests to be respectful to RSS feeds
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Clean up old articles (older than 30 days)
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { error: deleteError } = await supabase
      .from('news_articles')
      .delete()
      .lt('pub_date', thirtyDaysAgo.toISOString());

    if (deleteError) {
      console.error('Error deleting old articles:', deleteError);
    } else {
      console.log('Successfully cleaned up old articles');
    }
  } catch (error) {
    console.error('Error in cleanup:', error);
  }

  // ============================================================================
  // FETCH STOCK PRICES (4 snapshots per day)
  // ============================================================================

  console.log('\n=== Starting stock price fetch ===');
  const stockResults = await fetchStockPrices();

  // Clean up old stock prices (older than 90 days)
  try {
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const { error: deleteError } = await supabase
      .from('stock_prices')
      .delete()
      .lt('timestamp', ninetyDaysAgo.toISOString());

    if (deleteError) {
      console.error('Error deleting old stock prices:', deleteError);
    } else {
      console.log('Successfully cleaned up old stock prices');
    }
  } catch (error) {
    console.error('Error in stock cleanup:', error);
  }

  const totalStockPricesAdded = stockResults.reduce((sum, r) => sum + r.stocksAdded, 0);
  const stockSuccessCount = stockResults.filter(r => r.success).length;

  const summary = {
    timestamp: new Date().toISOString(),
    news: {
      totalFeeds: RSS_FEEDS.length,
      successful: totalSuccessful,
      failed: totalFailed,
      totalArticlesAdded,
      results,
    },
    stocks: {
      totalStocks: TRACKED_STOCKS.length,
      snapshots: stockResults.length,
      successfulSnapshots: stockSuccessCount,
      totalStockPricesAdded,
      results: stockResults,
    },
  };

  console.log('Cron job completed:', {
    news: {
      totalArticlesAdded,
      successful: totalSuccessful,
      failed: totalFailed,
    },
    stocks: {
      totalStockPricesAdded,
      successfulSnapshots: stockSuccessCount,
    },
  });

  return NextResponse.json(summary);
}

// Also support POST for manual triggers
export async function POST(request: NextRequest) {
  return GET(request);
}
