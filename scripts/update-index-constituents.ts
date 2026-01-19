/**
 * Update Index Constituents Script
 *
 * This script fetches the latest constituent data from public sources
 * and outputs TypeScript code that can be used to update index-constituents.ts
 *
 * Data sources:
 * - S&P 500: https://raw.githubusercontent.com/datasets/s-and-p-500-companies/main/data/constituents.csv
 * - NASDAQ-100: https://yfiua.github.io/index-constituents/constituents-nasdaq100.csv
 *
 * Usage:
 *   npx ts-node scripts/update-index-constituents.ts
 *
 * The script will output the updated data to console. You can then
 * manually copy it to config/index-constituents.ts if changes are needed.
 */

interface StockEntry {
  ticker: string;
  name: string;
}

async function fetchCSV(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.text();
}

function parseCSV(csv: string, tickerCol: number, nameCol: number, hasHeader: boolean = true): StockEntry[] {
  const lines = csv.trim().split('\n');
  const dataLines = hasHeader ? lines.slice(1) : lines;

  return dataLines
    .map(line => {
      // Handle CSV with potential commas in quoted fields
      const parts: string[] = [];
      let current = '';
      let inQuotes = false;

      for (const char of line) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          parts.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      parts.push(current.trim());

      const ticker = parts[tickerCol]?.replace(/"/g, '').trim();
      const name = parts[nameCol]?.replace(/"/g, '').trim();

      if (ticker && name) {
        return { ticker, name };
      }
      return null;
    })
    .filter((entry): entry is StockEntry => entry !== null);
}

async function fetchSP500(): Promise<StockEntry[]> {
  console.log('Fetching S&P 500 constituents...');
  const url = 'https://raw.githubusercontent.com/datasets/s-and-p-500-companies/main/data/constituents.csv';

  try {
    const csv = await fetchCSV(url);
    // CSV format: Symbol,Name,Sector
    const stocks = parseCSV(csv, 0, 1, true);
    console.log(`  Found ${stocks.length} S&P 500 stocks`);
    return stocks;
  } catch (error) {
    console.error('  Error fetching S&P 500:', error);
    return [];
  }
}

async function fetchNASDAQ100(): Promise<StockEntry[]> {
  console.log('Fetching NASDAQ-100 constituents...');
  const url = 'https://yfiua.github.io/index-constituents/constituents-nasdaq100.csv';

  try {
    const csv = await fetchCSV(url);
    // CSV format: ticker,name
    const stocks = parseCSV(csv, 0, 1, true);
    console.log(`  Found ${stocks.length} NASDAQ-100 stocks`);
    return stocks;
  } catch (error) {
    console.error('  Error fetching NASDAQ-100:', error);
    return [];
  }
}

function generateTypeScript(sp500: StockEntry[], nasdaq100: StockEntry[]): void {
  console.log('\n=== Generated TypeScript Data ===\n');

  // Generate NASDAQ-100 tickers set
  const nasdaq100Tickers = nasdaq100.map(s => s.ticker);
  console.log('// NASDAQ-100 tickers for quick lookup');
  console.log('const NASDAQ100_TICKERS = new Set([');
  for (let i = 0; i < nasdaq100Tickers.length; i += 10) {
    const chunk = nasdaq100Tickers.slice(i, i + 10);
    console.log(`  ${chunk.map(t => `'${t}'`).join(', ')},`);
  }
  console.log(']);\n');

  // Generate S&P 500 raw data
  console.log('// S&P 500 raw data (ticker, name)');
  console.log('const SP500_RAW: [string, string][] = [');
  for (const stock of sp500) {
    const escapedName = stock.name.replace(/'/g, "\\'");
    console.log(`  ['${stock.ticker}', '${escapedName}'],`);
  }
  console.log('];\n');

  // Find NASDAQ-100 only stocks (not in S&P 500)
  const sp500Tickers = new Set(sp500.map(s => s.ticker));
  const nasdaq100Only = nasdaq100.filter(s => !sp500Tickers.has(s.ticker));

  if (nasdaq100Only.length > 0) {
    console.log('// Additional NASDAQ-100 stocks not in S&P 500');
    console.log('const NASDAQ100_ONLY: [string, string][] = [');
    for (const stock of nasdaq100Only) {
      const escapedName = stock.name.replace(/'/g, "\\'");
      console.log(`  ['${stock.ticker}', '${escapedName}'],`);
    }
    console.log('];\n');
  }

  // Summary
  console.log('=== Summary ===');
  console.log(`S&P 500: ${sp500.length} stocks`);
  console.log(`NASDAQ-100: ${nasdaq100.length} stocks`);
  console.log(`NASDAQ-100 only (not in S&P): ${nasdaq100Only.length} stocks`);

  const allTickers = new Set([...sp500.map(s => s.ticker), ...nasdaq100.map(s => s.ticker)]);
  console.log(`Total unique tickers: ${allTickers.size}`);
}

async function main() {
  console.log('Index Constituents Update Script');
  console.log('================================\n');

  const [sp500, nasdaq100] = await Promise.all([
    fetchSP500(),
    fetchNASDAQ100(),
  ]);

  if (sp500.length === 0 && nasdaq100.length === 0) {
    console.error('\nNo data fetched. Check your internet connection and try again.');
    process.exit(1);
  }

  generateTypeScript(sp500, nasdaq100);

  console.log('\nTo update the config, copy the generated TypeScript code above');
  console.log('into config/index-constituents.ts and update the DOW30_TICKERS manually');
  console.log('(Dow Jones 30 rarely changes and can be verified at');
  console.log('https://www.slickcharts.com/dowjones)');
}

main().catch(console.error);
