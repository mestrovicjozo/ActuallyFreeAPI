/**
 * Robust stock ticker symbol extraction from text
 * Uses a three-tier approach:
 * 1. Explicit ticker mentions ($AAPL, NASDAQ:GOOGL)
 * 2. Company name matching (Alphabet → GOOGL)
 * 3. Validation against tracked stocks only
 */

import {
  extractTickersFromCompanyNames,
  isTrackedTicker
} from './ticker-mappings';

// Common stock exchanges
const EXCHANGES = [
  'NYSE',
  'NASDAQ',
  'AMEX',
  'TSX',
  'LSE',
  'HKEX',
  'SSE',
  'SZSE',
  'JPX',
  'BSE',
  'NSE',
];

/**
 * Extracts ticker symbols from text using multiple strategies
 * @param text - The text to extract tickers from (title, description, content)
 * @returns Array of unique ticker symbols in uppercase (validated against tracked stocks)
 */
export function extractTickers(text: string): string[] {
  if (!text) return [];

  const tickers = new Set<string>();

  // TIER 1: Explicit ticker mentions (highest confidence)
  // These are intentional ticker references in standard formats

  // Pattern 1: Dollar sign format - $AAPL, $TSLA
  const dollarPattern = /\$([A-Z]{1,5})\b/g;
  let match;
  while ((match = dollarPattern.exec(text)) !== null) {
    const ticker = match[1];
    if (isTrackedTicker(ticker)) {
      tickers.add(ticker);
    }
  }

  // Pattern 2: Parentheses format - (AAPL), (NASDAQ:AAPL)
  const parenPattern = /\((?:(?:NYSE|NASDAQ|AMEX):\s*)?([A-Z]{1,5})\)/g;
  while ((match = parenPattern.exec(text)) !== null) {
    const ticker = match[1];
    if (isTrackedTicker(ticker)) {
      tickers.add(ticker);
    }
  }

  // Pattern 3: Exchange prefix format - NASDAQ:AAPL, NYSE:TSLA
  const exchangePattern = new RegExp(
    `\\b(${EXCHANGES.join('|')}):\\s*([A-Z]{1,5})\\b`,
    'g'
  );
  while ((match = exchangePattern.exec(text)) !== null) {
    const ticker = match[2];
    if (isTrackedTicker(ticker)) {
      tickers.add(ticker);
    }
  }

  // Pattern 4: Ticker references in quotes - "AAPL", 'TSLA'
  // Only if they're valid tracked tickers
  const quotePattern = /["']([A-Z]{1,5})["']/g;
  while ((match = quotePattern.exec(text)) !== null) {
    const ticker = match[1];
    if (isTrackedTicker(ticker) && !isFalsePositive(ticker)) {
      tickers.add(ticker);
    }
  }

  // Pattern 5: Context-aware standalone ticker mentions
  // Look for tickers followed by stock-related keywords
  // Example: "AAPL shares rose" or "TSLA stock jumped"
  const contextPattern = /\b([A-Z]{2,5})\b\s+(?:stock|shares|ticker|traded|trading|equity|equities)\b/gi;
  while ((match = contextPattern.exec(text)) !== null) {
    const ticker = match[1].toUpperCase();
    if (isTrackedTicker(ticker) && !isFalsePositive(ticker)) {
      tickers.add(ticker);
    }
  }

  // TIER 2: Company name extraction (high confidence)
  // Extract tickers from company names like "Apple", "Alphabet", "Tesla"
  const companyTickers = extractTickersFromCompanyNames(text);
  companyTickers.forEach(ticker => tickers.add(ticker));

  // Return sorted array of validated tickers
  return Array.from(tickers).sort();
}

/**
 * Checks if a string is likely a ticker symbol
 */
function isLikelyTicker(text: string): boolean {
  // Must be 1-5 characters
  if (text.length < 1 || text.length > 5) return false;

  // Must be all uppercase letters
  if (!/^[A-Z]+$/.test(text)) return false;

  // Not a common false positive
  if (isFalsePositive(text)) return false;

  return true;
}

/**
 * Common words that might be mistaken for tickers
 */
const FALSE_POSITIVES = new Set([
  'A', 'I', 'THE', 'AND', 'OR', 'BUT', 'FOR', 'AT', 'BY', 'TO', 'IN', 'ON',
  'IS', 'IT', 'BE', 'AS', 'OF', 'AN', 'US', 'UK', 'EU', 'UN', 'CEO', 'CFO',
  'CTO', 'IPO', 'SEC', 'FDA', 'FTC', 'DOJ', 'FBI', 'CIA', 'IRS', 'LLC',
  'INC', 'LTD', 'CORP', 'CO', 'PLC', 'SA', 'AG', 'NV', 'AB', 'ASA',
  'ETF', 'REIT', 'SPV', 'LP', 'LLP', 'ESG', 'AI', 'ML', 'AR', 'VR',
  'API', 'SDK', 'UI', 'UX', 'IT', 'HR', 'PR', 'IR', 'RD', 'QA',
  'AM', 'PM', 'ET', 'PT', 'MT', 'CT', 'GMT', 'UTC', 'EST', 'PST',
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
  'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN',
  'USA', 'UK', 'EU', 'UAE', 'GDP', 'CPI', 'PPI', 'PCE', 'NFP',
  'FED', 'ECB', 'BOE', 'BOJ', 'PBOC', 'IMF', 'OECD', 'WTO', 'WHO',
  'COVID', 'SARS', 'HIV', 'AIDS', 'DNA', 'RNA', 'MRI', 'CT', 'XRAY',
]);

/**
 * Checks if a ticker is likely a false positive
 */
function isFalsePositive(ticker: string): boolean {
  return FALSE_POSITIVES.has(ticker.toUpperCase());
}

/**
 * Extracts tickers from multiple text fields
 * @param title - Article title
 * @param description - Article description
 * @param content - Article content
 * @returns Array of unique ticker symbols
 */
export function extractTickersFromArticle(
  title?: string | null,
  description?: string | null,
  content?: string | null
): string[] {
  const allText = [title, description, content]
    .filter((text): text is string => Boolean(text))
    .join(' ');

  return extractTickers(allText);
}
