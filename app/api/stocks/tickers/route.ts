import { NextRequest, NextResponse } from 'next/server';
import {
  getAllTickers,
  getStocksByIndex,
  VALID_TICKERS,
  type IndexType
} from '@/config/index-constituents';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const indexParam = searchParams.get('index');

  // If filtering by index
  if (indexParam) {
    const validIndices = ['SP500', 'NASDAQ100', 'DOW30'];
    if (!validIndices.includes(indexParam.toUpperCase())) {
      return NextResponse.json(
        { error: `Invalid index. Valid options: ${validIndices.join(', ')}` },
        { status: 400 }
      );
    }

    const stocks = getStocksByIndex(indexParam.toUpperCase() as IndexType);
    return NextResponse.json({
      index: indexParam.toUpperCase(),
      total: stocks.length,
      tickers: stocks.map(s => s.ticker),
    });
  }

  // Return all tickers
  const tickers = getAllTickers();
  return NextResponse.json({
    total: VALID_TICKERS.size,
    tickers,
  });
}
