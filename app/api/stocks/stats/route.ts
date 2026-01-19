import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { INDEX_STATS, VALID_TICKERS } from '@/config/index-constituents';

export async function GET() {
  try {
    // Get ticker mention statistics from news articles
    const { data: articles, error: articlesError } = await supabase
      .from('news_articles')
      .select('tickers')
      .not('tickers', 'is', null);

    if (articlesError) {
      console.error('Error fetching articles:', articlesError);
      return NextResponse.json(
        { error: 'Failed to fetch statistics' },
        { status: 500 }
      );
    }

    // Count ticker mentions
    const tickerCounts = new Map<string, number>();
    let totalMentions = 0;

    for (const article of articles || []) {
      if (article.tickers && Array.isArray(article.tickers)) {
        for (const ticker of article.tickers) {
          const count = tickerCounts.get(ticker) || 0;
          tickerCounts.set(ticker, count + 1);
          totalMentions++;
        }
      }
    }

    // Get top mentioned tickers
    const topTickers = Array.from(tickerCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([ticker, count]) => ({ ticker, mentions: count }));

    // Get article date range
    const { data: newestArticle } = await supabase
      .from('news_articles')
      .select('pub_date')
      .order('pub_date', { ascending: false })
      .limit(1);

    const { data: oldestArticle } = await supabase
      .from('news_articles')
      .select('pub_date')
      .order('pub_date', { ascending: true })
      .limit(1);

    // Count articles with tickers
    const { count: articlesWithTickers } = await supabase
      .from('news_articles')
      .select('*', { count: 'exact', head: true })
      .not('tickers', 'is', null);

    const { count: totalArticles } = await supabase
      .from('news_articles')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      indexStats: {
        totalTrackedStocks: VALID_TICKERS.size,
        sp500: INDEX_STATS.sp500,
        nasdaq100: INDEX_STATS.nasdaq100,
        dow30: INDEX_STATS.dow30,
      },
      articleStats: {
        totalArticles: totalArticles || 0,
        articlesWithTickers: articlesWithTickers || 0,
        tickerCoveragePercent: totalArticles
          ? Math.round(((articlesWithTickers || 0) / totalArticles) * 100)
          : 0,
        totalTickerMentions: totalMentions,
        uniqueTickersMentioned: tickerCounts.size,
        newestArticle: newestArticle?.[0]?.pub_date || null,
        oldestArticle: oldestArticle?.[0]?.pub_date || null,
      },
      topMentionedTickers: topTickers,
    });
  } catch (error) {
    console.error('Error in stocks stats API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
