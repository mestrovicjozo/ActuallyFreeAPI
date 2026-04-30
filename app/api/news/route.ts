import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface NewsQueryParams {
  startDate?: string;
  endDate?: string;
  search?: string;
  source?: string;
  ticker?: string;
  tickers?: string;
  page?: string;
  limit?: string;
  sort?: string;
  order?: string;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse and validate query parameters
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const search = searchParams.get('search')?.slice(0, 200) || null;
    const source = searchParams.get('source')?.slice(0, 100) || null;
    const ticker = searchParams.get('ticker')?.slice(0, 10) || null;
    const tickers = searchParams.get('tickers')?.slice(0, 200) || null;
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);
    const limit = Math.min(Math.max(1, parseInt(searchParams.get('limit') || '20', 10) || 20), 100);
    const sort = searchParams.get('sort') || 'pub_date';
    const order = searchParams.get('order') || 'desc';

    // Validate sort field
    const validSortFields = ['pub_date', 'created_at', 'source'];
    const sortField = validSortFields.includes(sort) ? sort : 'pub_date';

    // Validate order
    const ascending = order === 'asc';

    // Calculate pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Start building the query
    let query = supabase
      .from('news_articles')
      .select('*', { count: 'exact' })
      .order(sortField, { ascending });

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
    // Support both single ticker and multiple tickers
    if (tickers) {
      // Multiple tickers support: ?tickers=AAPL,GOOGL,NVDA
      const tickerArray = tickers.split(',').map(t => t.trim().toUpperCase()).filter(t => t && t.length <= 10).slice(0, 20);
      if (tickerArray.length > 0) {
        // Use overlaps operator to find articles containing ANY of the specified tickers
        query = query.overlaps('tickers', tickerArray);
      }
    } else if (ticker) {
      // Backward compatibility: single ticker support
      query = query.contains('tickers', [ticker.toUpperCase()]);
    }

    // Apply search filter using full-text search
    if (search) {
      // Use plainto_tsquery (plfts) which treats input as plain text
      // and does not interpret FTS operators, preventing injection attacks
      const searchQuery = search.trim();
      query = query.or(`title.plfts.${searchQuery},description.plfts.${searchQuery}`);
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
        tickers: tickers || null,
      },
      sorting: {
        sort: sortField,
        order: order,
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
