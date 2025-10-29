// Marketstack API client for fetching stock data
// Documentation: https://marketstack.com/documentation

export interface MarketstackEODData {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adj_high: number | null;
  adj_low: number | null;
  adj_close: number;
  adj_open: number;
  adj_volume: number;
  split_factor: number;
  dividend: number;
  symbol: string;
  exchange: string;
  date: string;
}

export interface MarketstackResponse {
  pagination: {
    limit: number;
    offset: number;
    count: number;
    total: number;
  };
  data: MarketstackEODData[];
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

const MARKETSTACK_API_KEY = process.env.MARKETSTACK_API || '';
const MARKETSTACK_BASE_URL = 'http://api.marketstack.com/v1';

// Rate limiting: Free tier allows 100 requests per month, 1 request per minute for real-time
const RATE_LIMIT_DELAY = 60000; // 60 seconds between calls (1/min)

class MarketstackClient {
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

  async getEOD(ticker: string): Promise<MarketstackEODData | null> {
    try {
      // Get latest EOD data (limit=1 for most recent)
      const url = `${MARKETSTACK_BASE_URL}/eod/latest?access_key=${MARKETSTACK_API_KEY}&symbols=${ticker}&limit=1`;
      const response = await this.rateLimitedFetch(url);

      if (!response.ok) {
        console.error(`[Marketstack] Failed to fetch EOD for ${ticker}: ${response.status}`);
        return null;
      }

      const data: MarketstackResponse = await response.json();

      // Check if we got valid data
      if (!data.data || data.data.length === 0) {
        console.warn(`[Marketstack] No data available for ${ticker}`);
        return null;
      }

      return data.data[0];
    } catch (error) {
      console.error(`[Marketstack] Error fetching EOD for ${ticker}:`, error);
      return null;
    }
  }

  async getStockData(ticker: string, companyName?: string): Promise<StockData | null> {
    try {
      const eod = await this.getEOD(ticker);

      if (!eod) {
        return null;
      }

      // Calculate change and change percent from open to close
      const change = eod.close - eod.open;
      const changePercent = (change / eod.open) * 100;

      return {
        ticker,
        companyName: companyName || ticker,
        price: eod.close,
        change: parseFloat(change.toFixed(2)),
        changePercent: parseFloat(changePercent.toFixed(2)),
        volume: eod.volume,
        timestamp: new Date(eod.date),
        source: 'marketstack',
      };
    } catch (error) {
      console.error(`[Marketstack] Error getting stock data for ${ticker}:`, error);
      return null;
    }
  }

  async getBatchStockData(
    tickers: { ticker: string; name: string }[]
  ): Promise<StockData[]> {
    const results: StockData[] = [];

    console.log(`[Marketstack] Fetching data for ${tickers.length} stocks...`);
    console.warn(`[Marketstack] Note: Rate limit is 1 req/min on free tier. This will take ${tickers.length} minutes.`);

    for (let i = 0; i < tickers.length; i++) {
      const { ticker, name } = tickers[i];

      console.log(`[Marketstack] Progress: ${i + 1}/${tickers.length} stocks (${ticker})`);

      const data = await this.getStockData(ticker, name);

      if (data) {
        results.push(data);
      }
    }

    console.log(`[Marketstack] Successfully fetched ${results.length}/${tickers.length} stocks`);

    return results;
  }
}

// Export singleton instance
export const marketstackClient = new MarketstackClient();
