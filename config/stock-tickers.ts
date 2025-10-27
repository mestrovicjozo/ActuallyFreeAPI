export interface Stock {
  ticker: string;
  name: string;
  index: string[];
}

// AI Playground Portfolio - Only tracking stocks from the portfolio
export const TRACKED_STOCKS: Stock[] = [
  // Quantum Computing
  { ticker: 'QBTS', name: 'D-Wave Quantum Inc.', index: ['NASDAQ'] },
  { ticker: 'IONQ', name: 'IonQ Inc.', index: ['NYSE'] },
  { ticker: 'QUBT', name: 'Quantum Computing Inc.', index: ['NASDAQ'] },
  { ticker: 'RGTI', name: 'Rigetti Computing Inc.', index: ['NASDAQ'] },

  // Tech Giants
  { ticker: 'META', name: 'Meta Platforms Inc.', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'NVDA', name: 'NVIDIA Corporation', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'MSFT', name: 'Microsoft Corporation', index: ['NASDAQ-100', 'S&P 500', 'Dow Jones'] },
  { ticker: 'AMZN', name: 'Amazon.com Inc.', index: ['NASDAQ-100', 'S&P 500', 'Dow Jones'] },
  { ticker: 'GOOGL', name: 'Alphabet Inc. Class A', index: ['NASDAQ-100', 'S&P 500'] },

  // Semiconductors & Tech
  { ticker: 'AMD', name: 'Advanced Micro Devices Inc.', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'AVGO', name: 'Broadcom Inc.', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'ASML', name: 'ASML Holding N.V.', index: ['NASDAQ'] },
  { ticker: 'FN', name: 'Fabrinet', index: ['NYSE'] },

  // AI & Data Analytics
  { ticker: 'PLTR', name: 'Palantir Technologies Inc.', index: ['NYSE'] },

  // Enterprise Software & Cloud
  { ticker: 'ORCL', name: 'Oracle Corporation', index: ['NASDAQ-100', 'S&P 500'] },
  { ticker: 'IBM', name: 'IBM Corporation', index: ['S&P 500', 'Dow Jones'] },

  // Cybersecurity
  { ticker: 'FTNT', name: 'Fortinet Inc.', index: ['NASDAQ'] },

  // Financial Services & Data
  { ticker: 'FDS', name: 'FactSet Research Systems Inc.', index: ['NYSE'] },
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
