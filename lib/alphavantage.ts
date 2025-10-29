// Alpha Vantage API client for fetching stock data
// Documentation: https://www.alphavantage.co/documentation/

export interface AlphaVantageQuote {
  '01. symbol': string;
  '02. open': string;
  '03. high': string;
  '04. low': string;
  '05. price': string;
  '06. volume': string;
  '07. latest trading day': string;
  '08. previous close': string;
  '09. change': string;
  '10. change percent': string;
}

export interface AlphaVantageResponse {
  'Global Quote': AlphaVantageQuote;
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

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API || '';
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';

// Rate limiting: Free tier allows 25 API requests per day, 5 per minute
const RATE_LIMIT_DELAY = 12000; // 12 seconds between calls to stay under 5/min

class AlphaVantageClient {
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

  async getQuote(ticker: string): Promise<AlphaVantageQuote | null> {
    try {
      const url = `${ALPHA_VANTAGE_BASE_URL}?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`;
      const response = await this.rateLimitedFetch(url);

      if (!response.ok) {
        console.error(`[Alpha Vantage] Failed to fetch quote for ${ticker}: ${response.status}`);
        return null;
      }

      const data: AlphaVantageResponse = await response.json();

      // Check if we got valid data
      if (!data['Global Quote'] || !data['Global Quote']['01. symbol']) {
        console.warn(`[Alpha Vantage] No data available for ${ticker}`);
        return null;
      }

      return data['Global Quote'];
    } catch (error) {
      console.error(`[Alpha Vantage] Error fetching quote for ${ticker}:`, error);
      return null;
    }
  }

  async getStockData(ticker: string, companyName?: string): Promise<StockData | null> {
    try {
      const quote = await this.getQuote(ticker);

      if (!quote) {
        return null;
      }

      // Parse the change percent to remove the % sign
      const changePercentStr = quote['10. change percent'].replace('%', '');

      return {
        ticker,
        companyName: companyName || ticker,
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: parseFloat(changePercentStr),
        volume: parseInt(quote['06. volume']),
        timestamp: new Date(quote['07. latest trading day']),
        source: 'alphavantage',
      };
    } catch (error) {
      console.error(`[Alpha Vantage] Error getting stock data for ${ticker}:`, error);
      return null;
    }
  }

  async getBatchStockData(
    tickers: { ticker: string; name: string }[]
  ): Promise<StockData[]> {
    const results: StockData[] = [];

    console.log(`[Alpha Vantage] Fetching data for ${tickers.length} stocks...`);

    for (let i = 0; i < tickers.length; i++) {
      const { ticker, name } = tickers[i];

      if ((i + 1) % 5 === 0) {
        console.log(`[Alpha Vantage] Progress: ${i + 1}/${tickers.length} stocks processed`);
      }

      const data = await this.getStockData(ticker, name);

      if (data) {
        results.push(data);
      }
    }

    console.log(`[Alpha Vantage] Successfully fetched ${results.length}/${tickers.length} stocks`);

    return results;
  }
}

// Export singleton instance
export const alphaVantageClient = new AlphaVantageClient();
