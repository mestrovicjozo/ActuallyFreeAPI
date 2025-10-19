import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Get total article count
    const { count: totalArticles, error: countError } = await supabase
      .from('news_articles')
      .select('*', { count: 'exact', head: true });

    if (countError) throw countError;

    // Get article count by source
    const { data: sourceStats, error: sourceError } = await supabase
      .from('news_articles')
      .select('source')
      .then(result => {
        if (result.error) return { data: null, error: result.error };

        const counts = result.data.reduce((acc: Record<string, number>, article) => {
          acc[article.source] = (acc[article.source] || 0) + 1;
          return acc;
        }, {});

        return { data: counts, error: null };
      });

    if (sourceError) throw sourceError;

    // Get date range of articles
    const { data: dateRange, error: dateError } = await supabase
      .from('news_articles')
      .select('pub_date')
      .order('pub_date', { ascending: false })
      .limit(1)
      .single();

    const { data: oldestArticle, error: oldestError } = await supabase
      .from('news_articles')
      .select('pub_date')
      .order('pub_date', { ascending: true })
      .limit(1)
      .single();

    // Get articles from last 24 hours
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const { count: last24Hours, error: recentError } = await supabase
      .from('news_articles')
      .select('*', { count: 'exact', head: true })
      .gte('pub_date', yesterday.toISOString());

    if (recentError) throw recentError;

    return NextResponse.json({
      totalArticles: totalArticles || 0,
      articlesLast24Hours: last24Hours || 0,
      newestArticle: dateRange?.pub_date || null,
      oldestArticle: oldestArticle?.pub_date || null,
      articlesBySource: sourceStats || {},
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
