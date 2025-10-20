import { NextRequest, NextResponse } from 'next/server';
import Parser from 'rss-parser';
import { supabase } from '@/lib/supabase';
import { RSS_FEEDS } from '@/config/rss-feeds';
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

  const summary = {
    timestamp: new Date().toISOString(),
    totalFeeds: RSS_FEEDS.length,
    successful: totalSuccessful,
    failed: totalFailed,
    totalArticlesAdded,
    results,
  };

  console.log('RSS fetch completed:', {
    totalArticlesAdded,
    successful: totalSuccessful,
    failed: totalFailed,
  });

  return NextResponse.json(summary);
}

// Also support POST for manual triggers
export async function POST(request: NextRequest) {
  return GET(request);
}
