// Polygon.io API client for fetching stock data
// Documentation: https://polygon.io/docs/stocks

export interface PolygonSnapshot {
  ticker: string;
  todaysChangePerc: number;
  todaysChange: number;
  updated: number;
  day: {
    o: number; // open
    h: number; // high
    l: number; // low
    c: number; // close
    v: number; // volume
    vw: number; // volume weighted average price
  };
  min: {
    av: number; // accumulated volume
    c: number; // close
    h: number; // high
    l: number; // low
    o: number; // open
    v: number; // volume
    vw: number; // volume weighted average price
  };
  prevDay: {
    o: number;
    h: number;
    l: number;
    c: number;
    v: number;
    vw: number;
  };
}

export interface PolygonSnapshotResponse {
  status: string;
  ticker: PolygonSnapshot;
}

export interface StockData {
  ticker: string;
  companyName: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: number;
  marketCap?: number;
  timestamp: Date;
  source: string;
}

const POLYGON_API_KEY = process.env.POLYGON_API || '';
const POLYGON_BASE_URL = 'https://api.polygon.io';

// Rate limiting: Varies by plan
// Free tier: 5 calls per minute
// Starter: 100 calls per minute
const RATE_LIMIT_DELAY = 12000; // 12 seconds between calls (5/min)

class PolygonClient {
  private lastCallTime = 0;

  private async rateLimitedFetch(url: string): Promise<Response> {
    const now = Date.now();
    const timeSinceLastCall = now - this.lastCallTime;

    if (timeSinceLastCall < RATE_LIMIT_DELAY) {
      await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY - timeSinceLastCall));
    }

    this.lastCallTime = Date.now();
    return fetch(url);
  }

  async getSnapshot(ticker: string): Promise<PolygonSnapshot | null> {
    try {
      const url = `${POLYGON_BASE_URL}/v2/snapshot/locale/us/markets/stocks/tickers/${ticker}?apiKey=${POLYGON_API_KEY}`;
      const response = await this.rateLimitedFetch(url);

      if (!response.ok) {
        console.error(`[Polygon] Failed to fetch snapshot for ${ticker}: ${response.status}`);
        return null;
      }

      const data: PolygonSnapshotResponse = await response.json();

      // Check if we got valid data
      if (data.status !== 'OK' || !data.ticker) {
        console.warn(`[Polygon] No data available for ${ticker}`);
        return null;
      }

      return data.ticker;
    } catch (error) {
      console.error(`[Polygon] Error fetching snapshot for ${ticker}:`, error);
      return null;
    }
  }

  async getStockData(ticker: string, companyName?: string): Promise<StockData | null> {
    try {
      const snapshot = await this.getSnapshot(ticker);

      if (!snapshot) {
        return null;
      }

      // Use the current day's close price (most recent)
      const price = snapshot.day?.c || snapshot.prevDay.c;
      const change = snapshot.todaysChange;
      const changePercent = snapshot.todaysChangePerc;
      const volume = snapshot.day?.v || snapshot.prevDay.v;

      return {
        ticker,
        companyName: companyName || ticker,
        price,
        change,
        changePercent,
        volume,
        timestamp: new Date(snapshot.updated / 1000000), // Convert nanoseconds to milliseconds
        source: 'polygon',
      };
    } catch (error) {
      console.error(`[Polygon] Error getting stock data for ${ticker}:`, error);
      return null;
    }
  }

  async getBatchStockData(
    tickers: { ticker: string; name: string }[]
  ): Promise<StockData[]> {
    const results: StockData[] = [];

    console.log(`[Polygon] Fetching data for ${tickers.length} stocks...`);

    for (let i = 0; i < tickers.length; i++) {
      const { ticker, name } = tickers[i];

      if ((i + 1) % 5 === 0) {
        console.log(`[Polygon] Progress: ${i + 1}/${tickers.length} stocks processed`);
      }

      const data = await this.getStockData(ticker, name);

      if (data) {
        results.push(data);
      }
    }

    console.log(`[Polygon] Successfully fetched ${results.length}/${tickers.length} stocks`);

    return results;
  }
}

// Export singleton instance
export const polygonClient = new PolygonClient();
