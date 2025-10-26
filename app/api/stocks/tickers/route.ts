import { NextResponse } from 'next/server';
import { TRACKED_STOCKS, getStocksByIndex, getIndices } from '@/config/stock-tickers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const index = searchParams.get('index');

  if (index) {
    const stocks = getStocksByIndex(index);
    return NextResponse.json({
      index,
      total: stocks.length,
      stocks,
    });
  }

  return NextResponse.json({
    total: TRACKED_STOCKS.length,
    indices: getIndices(),
    stocks: TRACKED_STOCKS,
  });
}
