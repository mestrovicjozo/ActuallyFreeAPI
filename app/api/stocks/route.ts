import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Query parameters
    const ticker = searchParams.get('ticker');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Validate limit
    if (limit > 1000) {
      return NextResponse.json(
        { error: 'Limit cannot exceed 1000' },
        { status: 400 }
      );
    }

    // Build query
    let query = supabase
      .from('stock_prices')
      .select('*', { count: 'exact' });

    // Filter by ticker
    if (ticker) {
      query = query.eq('ticker', ticker.toUpperCase());
    }

    // Filter by date range
    if (startDate) {
      query = query.gte('timestamp', startDate);
    }
    if (endDate) {
      query = query.lte('timestamp', endDate);
    }

    // Order by timestamp (most recent first)
    query = query.order('timestamp', { ascending: false });

    // Pagination
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching stock prices:', error);
      return NextResponse.json(
        { error: 'Failed to fetch stock prices' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data,
      pagination: {
        total: count,
        limit,
        offset,
        returned: data?.length || 0,
      },
    });
  } catch (error) {
    console.error('Error in stocks API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
