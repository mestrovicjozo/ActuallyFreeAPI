import { NextResponse } from 'next/server';
import { RSS_FEEDS, getCategories } from '@/config/rss-feeds';

export async function GET() {
  try {
    // Get all unique categories
    const categories = getCategories();

    // Group feeds by category
    const feedsByCategory = categories.reduce((acc, category) => {
      acc[category] = RSS_FEEDS.filter(feed => feed.category === category);
      return acc;
    }, {} as Record<string, typeof RSS_FEEDS>);

    return NextResponse.json({
      total: RSS_FEEDS.length,
      categories,
      sources: RSS_FEEDS.map(feed => ({
        name: feed.name,
        category: feed.category,
        description: feed.description,
      })),
      byCategory: feedsByCategory,
    });
  } catch (error) {
    console.error('Error fetching sources:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sources' },
      { status: 500 }
    );
  }
}
