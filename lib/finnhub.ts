// Finnhub API client for fetching stock data
// Documentation: https://finnhub.io/docs/api

export interface FinnhubQuote {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; // Previous close price
  t: number; // Timestamp
}

export interface FinnhubProfile {
  country: string;
  currency: string;
  exchange: string;
  ipo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
  logo: string;
  finnhubIndustry: string;
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
}

const FINNHUB_API_KEY = process.env.FINNHUB_API || '';
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

// Rate limiting: Free tier allows 60 calls/minute
const RATE_LIMIT_DELAY = 1100; // 1.1 seconds between calls to stay under 60/min

class FinnhubClient {
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

  async getQuote(ticker: string): Promise<FinnhubQuote | null> {
    try {
      const url = `${FINNHUB_BASE_URL}/quote?symbol=${ticker}&token=${FINNHUB_API_KEY}`;
      const response = await this.rateLimitedFetch(url);

      if (!response.ok) {
        console.error(`Failed to fetch quote for ${ticker}: ${response.status}`);
        return null;
      }

      const data = await response.json();

      // Check if we got valid data (c > 0 means we have a current price)
      if (data.c === 0) {
        console.warn(`No data available for ${ticker}`);
        return null;
      }

      return data;
    } catch (error) {
      console.error(`Error fetching quote for ${ticker}:`, error);
      return null;
    }
  }

  async getProfile(ticker: string): Promise<FinnhubProfile | null> {
    try {
      const url = `${FINNHUB_BASE_URL}/stock/profile2?symbol=${ticker}&token=${FINNHUB_API_KEY}`;
      const response = await this.rateLimitedFetch(url);

      if (!response.ok) {
        console.error(`Failed to fetch profile for ${ticker}: ${response.status}`);
        return null;
      }

      const data = await response.json();

      // Check if we got valid data
      if (!data.name) {
        console.warn(`No profile data available for ${ticker}`);
        return null;
      }

      return data;
    } catch (error) {
      console.error(`Error fetching profile for ${ticker}:`, error);
      return null;
    }
  }

  async getStockData(ticker: string, companyName?: string): Promise<StockData | null> {
    try {
      // Fetch quote data
      const quote = await this.getQuote(ticker);

      if (!quote) {
        return null;
      }

      // If company name not provided, try to fetch it from profile
      let name = companyName;
      if (!name) {
        const profile = await this.getProfile(ticker);
        name = profile?.name || ticker;
      }

      return {
        ticker,
        companyName: name,
        price: quote.c,
        change: quote.d,
        changePercent: quote.dp,
        marketCap: undefined, // We'll fetch this from profile if needed
        timestamp: new Date(quote.t * 1000), // Convert Unix timestamp to Date
      };
    } catch (error) {
      console.error(`Error getting stock data for ${ticker}:`, error);
      return null;
    }
  }

  async getBatchStockData(
    tickers: { ticker: string; name: string }[]
  ): Promise<StockData[]> {
    const results: StockData[] = [];

    console.log(`Fetching data for ${tickers.length} stocks...`);

    for (let i = 0; i < tickers.length; i++) {
      const { ticker, name } = tickers[i];

      if ((i + 1) % 10 === 0) {
        console.log(`Progress: ${i + 1}/${tickers.length} stocks processed`);
      }

      const data = await this.getStockData(ticker, name);

      if (data) {
        results.push(data);
      }
    }

    console.log(`Successfully fetched ${results.length}/${tickers.length} stocks`);

    return results;
  }
}

// Export singleton instance
export const finnhubClient = new FinnhubClient();
