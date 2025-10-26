import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getTotalStockCount } from '@/config/stock-tickers';

export async function GET() {
  try {
    // Get total count
    const { count: totalPrices, error: countError } = await supabase
      .from('stock_prices')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('Error getting count:', countError);
      return NextResponse.json(
        { error: 'Failed to fetch statistics' },
        { status: 500 }
      );
    }

    // Get date range
    const { data: dateRange, error: dateError } = await supabase
      .from('stock_prices')
      .select('timestamp')
      .order('timestamp', { ascending: false })
      .limit(1);

    const { data: oldestDate, error: oldestError } = await supabase
      .from('stock_prices')
      .select('timestamp')
      .order('timestamp', { ascending: true })
      .limit(1);

    // Get unique tickers count
    const { data: uniqueTickers, error: tickersError } = await supabase
      .from('stock_prices')
      .select('ticker');

    const uniqueTickersSet = new Set(
      uniqueTickers?.map((item) => item.ticker) || []
    );

    return NextResponse.json({
      totalPriceRecords: totalPrices || 0,
      trackedStocks: getTotalStockCount(),
      uniqueTickersInDB: uniqueTickersSet.size,
      latestUpdate: dateRange?.[0]?.timestamp || null,
      oldestRecord: oldestDate?.[0]?.timestamp || null,
      snapshotsPerDay: 4,
    });
  } catch (error) {
    console.error('Error in stocks stats API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
