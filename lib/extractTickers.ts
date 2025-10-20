/**
 * Extracts stock ticker symbols from text
 * Supports formats like: $AAPL, (AAPL), NASDAQ:AAPL, NYSE:AAPL
 */

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
 * Extracts ticker symbols from text
 * @param text - The text to extract tickers from (title, description, content)
 * @returns Array of unique ticker symbols in uppercase
 */
export function extractTickers(text: string): string[] {
  if (!text) return [];

  const tickers = new Set<string>();

  // Pattern 1: Dollar sign format - $AAPL, $TSLA
  // Must be 1-5 uppercase letters after $
  const dollarPattern = /\$([A-Z]{1,5})\b/g;
  let match;
  while ((match = dollarPattern.exec(text)) !== null) {
    tickers.add(match[1]);
  }

  // Pattern 2: Parentheses format - (AAPL), (NASDAQ:AAPL)
  // Extracts ticker from parentheses
  const parenPattern = /\((?:(?:NYSE|NASDAQ|AMEX):\s*)?([A-Z]{1,5})\)/g;
  while ((match = parenPattern.exec(text)) !== null) {
    tickers.add(match[1]);
  }

  // Pattern 3: Exchange prefix format - NASDAQ:AAPL, NYSE:TSLA
  const exchangePattern = new RegExp(
    `\\b(${EXCHANGES.join('|')}):\\s*([A-Z]{1,5})\\b`,
    'g'
  );
  while ((match = exchangePattern.exec(text)) !== null) {
    tickers.add(match[2]);
  }

  // Pattern 4: Ticker references in quotes - "AAPL", 'TSLA'
  const quotePattern = /["']([A-Z]{1,5})["']/g;
  while ((match = quotePattern.exec(text)) !== null) {
    // Only add if it's likely a ticker (not a common word)
    const potential = match[1];
    if (isLikelyTicker(potential)) {
      tickers.add(potential);
    }
  }

  // Pattern 5: Standalone uppercase words that look like tickers
  // More conservative - only 2-5 letters, surrounded by specific patterns
  const standalonePattern = /\b([A-Z]{2,5})\b(?=\s+(?:stock|shares|stock|ticker|traded|trading|market|price|earnings|revenue|profit|loss|gained|rose|fell|dropped|climbed|plunged|surged))/gi;
  while ((match = standalonePattern.exec(text)) !== null) {
    const potential = match[1].toUpperCase();
    if (isLikelyTicker(potential)) {
      tickers.add(potential);
    }
  }

  // Filter out common false positives
  const filtered = Array.from(tickers).filter(ticker => !isFalsePositive(ticker));

  return filtered.sort();
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
