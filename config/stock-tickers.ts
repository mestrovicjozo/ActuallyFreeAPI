export interface Stock {
  ticker: string;
  name: string;
  index: string[];
}

// Curated list of major stocks from S&P 500, NASDAQ-100, and Dow Jones
// Focusing on high-volume, widely-tracked stocks to stay within API limits
export const TRACKED_STOCKS: Stock[] = [
  // Tech Giants (NASDAQ-100 & S&P 500)
  { ticker: 'AAPL', name: 'Apple Inc.', index: ['NASDAQ-100', 'S&P 500', 'Dow Jones'] },
  { ticker: 'MSFT', name: 'Microsoft Corporation', index: ['NASDAQ-100', 'S&P 500', 'Dow Jones'] },
  { ticker: 'GOOGL', name: 'Alphabet Inc. Class A', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'GOOG', name: 'Alphabet Inc. Class C', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'AMZN', name: 'Amazon.com Inc.', index: ['NASDAQ-100', 'S&P 500', 'Dow Jones'] },
  { ticker: 'META', name: 'Meta Platforms Inc.', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'TSLA', name: 'Tesla Inc.', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'NVDA', name: 'NVIDIA Corporation', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'NFLX', name: 'Netflix Inc.', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'INTC', name: 'Intel Corporation', index: ['NASDAQ-100', 'S&P 500', 'Dow Jones'] },
  { ticker: 'AMD', name: 'Advanced Micro Devices', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'ADBE', name: 'Adobe Inc.', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'CSCO', name: 'Cisco Systems Inc.', index: ['NASDAQ-100', 'S&P 500', 'Dow Jones'] },
  { ticker: 'AVGO', name: 'Broadcom Inc.', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'ORCL', name: 'Oracle Corporation', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'CRM', name: 'Salesforce Inc.', index: ['NASDAQ-100', 'S&P 500', 'Dow Jones'] },
  { ticker: 'QCOM', name: 'QUALCOMM Inc.', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'TXN', name: 'Texas Instruments', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'IBM', name: 'IBM Corporation', index: ['S&P 500', 'Dow Jones'] },

  // Financial Services (Dow Jones & S&P 500)
  { ticker: 'JPM', name: 'JPMorgan Chase & Co.', index: ['S&P 500', 'Dow Jones'] },
  { ticker: 'BAC', name: 'Bank of America Corp.', index: ['S&P 500'] },
  { ticker: 'WFC', name: 'Wells Fargo & Company', index: ['S&P 500'] },
  { ticker: 'GS', name: 'Goldman Sachs Group', index: ['S&P 500', 'Dow Jones'] },
  { ticker: 'MS', name: 'Morgan Stanley', index: ['S&P 500'] },
  { ticker: 'C', name: 'Citigroup Inc.', index: ['S&P 500'] },
  { ticker: 'AXP', name: 'American Express', index: ['S&P 500', 'Dow Jones'] },
  { ticker: 'V', name: 'Visa Inc.', index: ['S&P 500', 'Dow Jones'] },
  { ticker: 'MA', name: 'Mastercard Inc.', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'PYPL', name: 'PayPal Holdings', index: ['NASDAQ-100', 'S&P 500'] },

  // Healthcare & Pharma (Dow Jones & S&P 500)
  { ticker: 'JNJ', name: 'Johnson & Johnson', index: ['S&P 500', 'Dow Jones'] },
  { ticker: 'UNH', name: 'UnitedHealth Group', index: ['S&P 500', 'Dow Jones'] },
  { ticker: 'PFE', name: 'Pfizer Inc.', index: ['S&P 500'] },
  { ticker: 'ABBV', name: 'AbbVie Inc.', index: ['S&P 500'] },
  { ticker: 'TMO', name: 'Thermo Fisher Scientific', index: ['S&P 500'] },
  { ticker: 'MRK', name: 'Merck & Co.', index: ['S&P 500', 'Dow Jones'] },
  { ticker: 'ABT', name: 'Abbott Laboratories', index: ['S&P 500'] },
  { ticker: 'LLY', name: 'Eli Lilly and Company', index: ['S&P 500'] },
  { ticker: 'AMGN', name: 'Amgen Inc.', index: ['NASDAQ-100', 'S&P 500', 'Dow Jones'] },
  { ticker: 'GILD', name: 'Gilead Sciences', index: ['NASDAQ-100', 'S&P 500'] },

  // Consumer Goods & Retail
  { ticker: 'WMT', name: 'Walmart Inc.', index: ['S&P 500', 'Dow Jones'] },
  { ticker: 'HD', name: 'Home Depot Inc.', index: ['S&P 500', 'Dow Jones'] },
  { ticker: 'PG', name: 'Procter & Gamble', index: ['S&P 500', 'Dow Jones'] },
  { ticker: 'KO', name: 'Coca-Cola Company', index: ['S&P 500', 'Dow Jones'] },
  { ticker: 'PEP', name: 'PepsiCo Inc.', index: ['S&P 500'] },
  { ticker: 'COST', name: 'Costco Wholesale', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'NKE', name: 'Nike Inc.', index: ['S&P 500', 'Dow Jones'] },
  { ticker: 'MCD', name: "McDonald's Corporation", index: ['S&P 500', 'Dow Jones'] },
  { ticker: 'DIS', name: 'Walt Disney Company', index: ['S&P 500', 'Dow Jones'] },
  { ticker: 'SBUX', name: 'Starbucks Corporation', index: ['NASDAQ-100', 'S&P 500'] },

  // Industrial & Manufacturing
  { ticker: 'BA', name: 'Boeing Company', index: ['S&P 500', 'Dow Jones'] },
  { ticker: 'CAT', name: 'Caterpillar Inc.', index: ['S&P 500', 'Dow Jones'] },
  { ticker: 'HON', name: 'Honeywell International', index: ['S&P 500', 'Dow Jones'] },
  { ticker: 'MMM', name: '3M Company', index: ['S&P 500', 'Dow Jones'] },
  { ticker: 'GE', name: 'General Electric', index: ['S&P 500'] },
  { ticker: 'UPS', name: 'United Parcel Service', index: ['S&P 500'] },
  { ticker: 'LMT', name: 'Lockheed Martin', index: ['S&P 500'] },

  // Energy & Utilities
  { ticker: 'XOM', name: 'Exxon Mobil Corporation', index: ['S&P 500', 'Dow Jones'] },
  { ticker: 'CVX', name: 'Chevron Corporation', index: ['S&P 500', 'Dow Jones'] },
  { ticker: 'COP', name: 'ConocoPhillips', index: ['S&P 500'] },
  { ticker: 'SLB', name: 'Schlumberger Limited', index: ['S&P 500'] },

  // Telecom & Media
  { ticker: 'VZ', name: 'Verizon Communications', index: ['S&P 500', 'Dow Jones'] },
  { ticker: 'T', name: 'AT&T Inc.', index: ['S&P 500'] },
  { ticker: 'CMCSA', name: 'Comcast Corporation', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'TMUS', name: 'T-Mobile US Inc.', index: ['NASDAQ-100', 'S&P 500'] },

  // E-commerce & Services
  { ticker: 'EBAY', name: 'eBay Inc.', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'BKNG', name: 'Booking Holdings', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'ABNB', name: 'Airbnb Inc.', index: ['NASDAQ-100'] },

  // Semiconductors
  { ticker: 'TSM', name: 'Taiwan Semiconductor', index: ['S&P 500'] },
  { ticker: 'AMAT', name: 'Applied Materials', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'LRCX', name: 'Lam Research', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'KLAC', name: 'KLA Corporation', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'MU', name: 'Micron Technology', index: ['NASDAQ-100', 'S&P 500'] },

  // Software & Cloud
  { ticker: 'NOW', name: 'ServiceNow Inc.', index: ['S&P 500'] },
  { ticker: 'INTU', name: 'Intuit Inc.', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'SNOW', name: 'Snowflake Inc.', index: ['S&P 500'] },
  { ticker: 'PANW', name: 'Palo Alto Networks', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'CRWD', name: 'CrowdStrike Holdings', index: ['NASDAQ-100', 'S&P 500'] },

  // Automotive
  { ticker: 'F', name: 'Ford Motor Company', index: ['S&P 500'] },
  { ticker: 'GM', name: 'General Motors', index: ['S&P 500'] },
  { ticker: 'RIVN', name: 'Rivian Automotive', index: ['NASDAQ-100'] },

  // Other Notable Companies
  { ticker: 'SPOT', name: 'Spotify Technology', index: ['S&P 500'] },
  { ticker: 'UBER', name: 'Uber Technologies', index: ['S&P 500'] },
  { ticker: 'LYFT', name: 'Lyft Inc.', index: ['NASDAQ-100'] },
  { ticker: 'ZM', name: 'Zoom Video Communications', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'DOCU', name: 'DocuSign Inc.', index: ['NASDAQ-100', 'S&P 500'] },

  // Crypto & Blockchain
  { ticker: 'COIN', name: 'Coinbase Global Inc.', index: ['NASDAQ-100'] },
  { ticker: 'MSTR', name: 'MicroStrategy Inc.', index: ['NASDAQ-100'] },
  { ticker: 'MARA', name: 'Marathon Digital Holdings', index: ['NASDAQ-100'] },
  { ticker: 'RIOT', name: 'Riot Platforms Inc.', index: ['NASDAQ-100'] },

  // Social Media & Communication
  { ticker: 'SNAP', name: 'Snap Inc.', index: ['S&P 500'] },
  { ticker: 'PINS', name: 'Pinterest Inc.', index: ['S&P 500'] },
  { ticker: 'RDDT', name: 'Reddit Inc.', index: ['S&P 500'] },

  // Clean Energy & EV
  { ticker: 'PLUG', name: 'Plug Power Inc.', index: ['NASDAQ-100'] },
  { ticker: 'FCEL', name: 'FuelCell Energy Inc.', index: ['NASDAQ-100'] },
  { ticker: 'ENPH', name: 'Enphase Energy Inc.', index: ['NASDAQ-100'] },
  { ticker: 'BLNK', name: 'Blink Charging Co.', index: ['NASDAQ-100'] },
  { ticker: 'CHPT', name: 'ChargePoint Holdings', index: ['S&P 500'] },
];

// Helper functions
export function getStocksByIndex(indexName: string): Stock[] {
  return TRACKED_STOCKS.filter(stock => stock.index.includes(indexName));
}

export function getAllTickers(): string[] {
  return TRACKED_STOCKS.map(stock => stock.ticker);
}

export function getStockByTicker(ticker: string): Stock | undefined {
  return TRACKED_STOCKS.find(stock => stock.ticker.toUpperCase() === ticker.toUpperCase());
}

export function getTotalStockCount(): number {
  return TRACKED_STOCKS.length;
}

export function getIndices(): string[] {
  const indices = new Set<string>();
  TRACKED_STOCKS.forEach(stock => {
    stock.index.forEach(idx => indices.add(idx));
  });
  return Array.from(indices);
}
