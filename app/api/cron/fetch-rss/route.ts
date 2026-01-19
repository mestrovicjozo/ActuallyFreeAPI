import { NextRequest, NextResponse } from 'next/server';
import Parser from 'rss-parser';
import { supabase } from '@/lib/supabase';
import { RSS_FEEDS } from '@/config/rss-feeds';
import type { NewsArticleInsert } from '@/lib/supabase';
import { extractTickersFromArticle } from '@/lib/extractTickers';
import { getArticleText } from '@/lib/article-fetcher';

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

      // Process RSS items and extract tickers
      const validItems = rssFeed.items.filter(item => item.link && item.title && item.pubDate);

      // Collect articles that need full content fetch (no tickers from RSS snippet)
      const articlesNeedingFullContent: Array<{
        item: typeof validItems[0];
        initialTickers: string[];
      }> = [];

      const articles: NewsArticleInsert[] = [];

      for (const item of validItems) {
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

        // If no tickers found and article has a link, queue for full content fetch
        if (tickers.length === 0 && item.link) {
          articlesNeedingFullContent.push({ item, initialTickers: tickers });
        } else {
          articles.push({
            title,
            description,
            link: item.link!,
            pub_date: new Date(item.pubDate!).toISOString(),
            source: feed.name,
            guid: item.guid || item.link!,
            content,
            tickers: tickers.length > 0 ? tickers : null,
          });
        }
      }

      // Fetch full content for articles without tickers (limited to 5 per feed)
      const articlesToFetch = articlesNeedingFullContent.slice(0, 5);
      for (const { item } of articlesToFetch) {
        try {
          const fullText = await getArticleText(item.link!);
          const title = item.title!;
          const description = item.contentSnippet || item.content || null;

          // Re-extract tickers with full article content
          let tickers: string[] = [];
          if (fullText) {
            tickers = extractTickersFromArticle(title, description, fullText);
          }

          articles.push({
            title,
            description,
            link: item.link!,
            pub_date: new Date(item.pubDate!).toISOString(),
            source: feed.name,
            guid: item.guid || item.link!,
            content: fullText || (item.content || item.contentSnippet || null),
            tickers: tickers.length > 0 ? tickers : null,
          });
        } catch (error) {
          // If full fetch fails, add article without full content
          const title = item.title!;
          const description = item.contentSnippet || item.content || null;
          const content = item.content || item.contentSnippet || null;

          articles.push({
            title,
            description,
            link: item.link!,
            pub_date: new Date(item.pubDate!).toISOString(),
            source: feed.name,
            guid: item.guid || item.link!,
            content,
            tickers: null,
          });
        }
      }

      // Add remaining articles that we didn't fetch full content for
      for (const { item } of articlesNeedingFullContent.slice(5)) {
        const title = item.title!;
        const description = item.contentSnippet || item.content || null;
        const content = item.content || item.contentSnippet || null;

        articles.push({
          title,
          description,
          link: item.link!,
          pub_date: new Date(item.pubDate!).toISOString(),
          source: feed.name,
          guid: item.guid || item.link!,
          content,
          tickers: null,
        });
      }

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

  console.log('Cron job completed:', {
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
