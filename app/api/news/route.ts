import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface NewsQueryParams {
  startDate?: string;
  endDate?: string;
  search?: string;
  source?: string;
  ticker?: string;
  page?: string;
  limit?: string;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse query parameters
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const search = searchParams.get('search');
    const source = searchParams.get('source');
    const ticker = searchParams.get('ticker');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 100); // Max 100 per page

    // Calculate pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Start building the query
    let query = supabase
      .from('news_articles')
      .select('*', { count: 'exact' })
      .order('pub_date', { ascending: false });

    // Apply date range filter
    if (startDate) {
      try {
        const start = new Date(startDate);
        if (!isNaN(start.getTime())) {
          query = query.gte('pub_date', start.toISOString());
        }
      } catch (error) {
        return NextResponse.json(
          { error: 'Invalid startDate format. Use ISO 8601 format (e.g., 2024-01-01)' },
          { status: 400 }
        );
      }
    }

    if (endDate) {
      try {
        const end = new Date(endDate);
        if (!isNaN(end.getTime())) {
          query = query.lte('pub_date', end.toISOString());
        }
      } catch (error) {
        return NextResponse.json(
          { error: 'Invalid endDate format. Use ISO 8601 format (e.g., 2024-01-31)' },
          { status: 400 }
        );
      }
    }

    // Apply source filter
    if (source) {
      query = query.eq('source', source);
    }

    // Apply ticker filter (searches in tickers array)
    if (ticker) {
      // PostgreSQL array contains operator
      query = query.contains('tickers', [ticker.toUpperCase()]);
    }

    // Apply search filter (searches in title and description)
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Apply pagination
    query = query.range(from, to);

    // Execute query
    const { data, error, count } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch news articles' },
        { status: 500 }
      );
    }

    // Calculate pagination metadata
    const totalPages = count ? Math.ceil(count / limit) : 0;
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      },
      filters: {
        startDate: startDate || null,
        endDate: endDate || null,
        search: search || null,
        source: source || null,
        ticker: ticker || null,
      },
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
