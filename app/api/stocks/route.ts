import { NextRequest, NextResponse } from 'next/server';
import {
  INDEX_STOCKS,
  VALID_TICKERS,
  getStocksByIndex,
  getIndices,
  getStockInfo,
  INDEX_STATS,
  type IndexType
} from '@/config/index-constituents';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Filter by index
  const indexParam = searchParams.get('index');

  // Filter by ticker
  const tickerParam = searchParams.get('ticker');

  // Search by name
  const searchParam = searchParams.get('search');

  // If searching for a specific ticker
  if (tickerParam) {
    const stock = getStockInfo(tickerParam.toUpperCase());
    if (stock) {
      return NextResponse.json({
        found: true,
        stock,
      });
    }
    return NextResponse.json({
      found: false,
      ticker: tickerParam.toUpperCase(),
      message: 'Ticker not found in major indices',
    });
  }

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
      stocks,
    });
  }

  // If searching by name
  if (searchParam) {
    const searchLower = searchParam.toLowerCase();
    const matches = INDEX_STOCKS.filter(
      stock =>
        stock.ticker.toLowerCase().includes(searchLower) ||
        stock.name.toLowerCase().includes(searchLower)
    );

    return NextResponse.json({
      search: searchParam,
      total: matches.length,
      stocks: matches,
    });
  }

  // Return all stocks
  return NextResponse.json({
    total: VALID_TICKERS.size,
    indices: getIndices(),
    stats: INDEX_STATS,
    stocks: INDEX_STOCKS,
  });
}
