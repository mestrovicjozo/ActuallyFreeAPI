/**
 * NLP-based entity extraction using compromise.js
 * Lightweight (200KB), no external dependencies
 * Extracts organizations and people for ticker mapping
 */

import nlp from 'compromise';
import { getTickersByCompanyName, isTrackedTicker } from './ticker-mappings';

/**
 * CEO/Founder to ticker mapping for person name extraction
 */
const CEO_TO_TICKER: Record<string, string> = {
  // Tech Giants
  'tim cook': 'AAPL',
  'satya nadella': 'MSFT',
  'sundar pichai': 'GOOGL',
  'andy jassy': 'AMZN',
  'mark zuckerberg': 'META',
  'jensen huang': 'NVDA',
  'lisa su': 'AMD',
  'pat gelsinger': 'INTC',

  // Founders/Former CEOs still associated
  'jeff bezos': 'AMZN',
  'bill gates': 'MSFT',
  'larry page': 'GOOGL',
  'sergey brin': 'GOOGL',
  'elon musk': 'TSLA',
  'steve jobs': 'AAPL',
  'larry ellison': 'ORCL',

  // Quantum Computing CEOs
  'alan baratz': 'QBTS',
  'peter chapman': 'IONQ',
  'chad rigetti': 'RGTI',

  // Other Notable CEOs
  'alex karp': 'PLTR',
  'peter thiel': 'PLTR',
  'arvind krishna': 'IBM',
  'safra catz': 'ORCL',
  'ken xie': 'FTNT',
  'philip snow': 'FDS',
  'seamus grady': 'FN',
  'peter wennink': 'ASML',
  'christophe fouquet': 'ASML',
};

/**
 * Extract ticker symbols from text using NLP-based entity recognition
 * @param text - The text to analyze
 * @returns Array of unique ticker symbols
 */
export function extractTickersWithNLP(text: string): string[] {
  if (!text || text.length < 10) return [];

  const foundTickers = new Set<string>();

  try {
    const doc = nlp(text);

    // Extract organizations
    const organizations = doc.organizations().out('array') as string[];
    for (const org of organizations) {
      const tickers = getTickersByCompanyName(org);
      tickers.forEach(t => foundTickers.add(t));
    }

    // Extract people names and map to tickers (for CEO mentions)
    const people = doc.people().out('array') as string[];
    for (const person of people) {
      const normalizedName = person.toLowerCase().trim();

      // Check direct CEO mapping
      if (CEO_TO_TICKER[normalizedName]) {
        const ticker = CEO_TO_TICKER[normalizedName];
        if (isTrackedTicker(ticker)) {
          foundTickers.add(ticker);
        }
      }

      // Also check partial matches (e.g., "Huang" for Jensen Huang)
      for (const [ceoName, ticker] of Object.entries(CEO_TO_TICKER)) {
        const nameParts = ceoName.split(' ');
        const lastName = nameParts[nameParts.length - 1];
        if (normalizedName.includes(lastName) && isTrackedTicker(ticker)) {
          // Verify context - look for CEO-related words nearby
          const lowerText = text.toLowerCase();
          const personIndex = lowerText.indexOf(normalizedName);
          if (personIndex !== -1) {
            const contextStart = Math.max(0, personIndex - 30);
            const contextEnd = Math.min(lowerText.length, personIndex + normalizedName.length + 30);
            const context = lowerText.slice(contextStart, contextEnd);

            const ceoContextWords = ['ceo', 'chief', 'executive', 'founder', 'president', 'chairman', 'boss', 'head', 'leader'];
            if (ceoContextWords.some(word => context.includes(word))) {
              foundTickers.add(ticker);
            }
          }
        }
      }
    }

    // Extract proper nouns that might be company names
    const properNouns = doc.nouns().if('#ProperNoun').out('array') as string[];
    for (const noun of properNouns) {
      // Skip very short or very long proper nouns
      if (noun.length < 2 || noun.length > 30) continue;

      const tickers = getTickersByCompanyName(noun);
      tickers.forEach(t => foundTickers.add(t));
    }

  } catch (error) {
    console.error('NLP extraction error:', error);
  }

  return Array.from(foundTickers).sort();
}

/**
 * Extract company mentions with confidence scores
 * Useful for debugging and analysis
 */
export function extractCompaniesWithConfidence(text: string): Array<{
  name: string;
  ticker: string | null;
  confidence: 'high' | 'medium' | 'low';
  type: 'organization' | 'person' | 'noun';
}> {
  if (!text) return [];

  const results: Array<{
    name: string;
    ticker: string | null;
    confidence: 'high' | 'medium' | 'low';
    type: 'organization' | 'person' | 'noun';
  }> = [];

  try {
    const doc = nlp(text);

    // Organizations have high confidence
    const organizations = doc.organizations().out('array') as string[];
    for (const org of organizations) {
      const tickers = getTickersByCompanyName(org);
      results.push({
        name: org,
        ticker: tickers.length > 0 ? tickers[0] : null,
        confidence: 'high',
        type: 'organization',
      });
    }

    // People with CEO mapping have medium confidence
    const people = doc.people().out('array') as string[];
    for (const person of people) {
      const normalizedName = person.toLowerCase().trim();
      const ticker = CEO_TO_TICKER[normalizedName] || null;
      if (ticker) {
        results.push({
          name: person,
          ticker,
          confidence: 'medium',
          type: 'person',
        });
      }
    }

    // Proper nouns have lower confidence
    const properNouns = doc.nouns().if('#ProperNoun').out('array') as string[];
    for (const noun of properNouns) {
      // Avoid duplicates
      if (organizations.includes(noun) || people.includes(noun)) continue;

      const tickers = getTickersByCompanyName(noun);
      if (tickers.length > 0) {
        results.push({
          name: noun,
          ticker: tickers[0],
          confidence: 'low',
          type: 'noun',
        });
      }
    }

  } catch (error) {
    console.error('NLP extraction error:', error);
  }

  return results;
}
