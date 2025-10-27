import { TRACKED_STOCKS } from '@/config/stock-tickers';

/**
 * Company name variations and aliases mapped to ticker symbols
 * This helps extract tickers when articles mention company names instead of ticker symbols
 */
export interface CompanyMapping {
  tickers: string[];
  names: string[];
}

// Build comprehensive mappings from TRACKED_STOCKS with common variations
export const COMPANY_NAME_TO_TICKERS: Map<string, string[]> = new Map();

// Manually defined aliases and variations for better matching
// Includes: company names, product names, brand names, subsidiaries, and CEO/founder associations
const MANUAL_ALIASES: Record<string, string[]> = {
  'AAPL': [
    'apple', 'apple inc', 'apple computer',
    // Products
    'iphone', 'ipad', 'imac', 'macbook', 'airpods', 'apple watch', 'ios', 'macos',
    'ipados', 'watchos', 'tvos', 'app store', 'itunes', 'icloud', 'apple tv', 'apple music',
    'safari', 'siri', 'airtag', 'homepod', 'vision pro', 'apple vision',
    // CEO/Founder
    'tim cook', 'steve jobs'
  ],
  'MSFT': [
    'microsoft', 'microsoft corp', 'microsoft corporation',
    // Products
    'windows', 'office 365', 'xbox', 'azure', 'teams', 'outlook', 'surface', 'bing',
    'visual studio', 'github', 'linkedin', 'skype', 'onedrive', 'sharepoint', 'dynamics',
    'power bi', 'windows 11', 'windows 10', 'copilot', 'edge browser',
    // CEO
    'satya nadella', 'bill gates'
  ],
  'GOOGL': [
    'alphabet', 'google', 'alphabet inc', 'google parent',
    // Products & Services
    'youtube', 'android', 'chrome', 'gmail', 'google search', 'google maps', 'google cloud',
    'waymo', 'google play', 'pixel', 'nest', 'fitbit', 'chromebook', 'google workspace',
    'google ads', 'google photos', 'google drive', 'google docs', 'bard', 'gemini',
    // CEO
    'sundar pichai', 'larry page', 'sergey brin'
  ],
  'GOOG': [
    'alphabet', 'google', 'alphabet inc', 'google parent',
    'youtube', 'android', 'chrome', 'gmail', 'waymo', 'pixel', 'nest'
  ],
  'AMZN': [
    'amazon', 'amazon.com', 'amazon inc',
    // Products & Services
    'aws', 'amazon web services', 'prime', 'prime video', 'kindle', 'alexa', 'echo',
    'whole foods', 'twitch', 'audible', 'fire tv', 'amazon music', 'amazon fresh',
    // CEO
    'andy jassy', 'jeff bezos'
  ],
  'META': [
    'meta', 'meta platforms', 'facebook', 'fb',
    // Products & Subsidiaries
    'instagram', 'whatsapp', 'oculus', 'quest', 'threads', 'messenger', 'reality labs',
    'meta quest', 'llama', 'ray-ban stories',
    // CEO
    'mark zuckerberg', 'zuckerberg'
  ],
  'TSLA': ['tesla', 'tesla motors', 'tesla inc', 'elon musk', 'model s', 'model 3', 'model x', 'model y', 'cybertruck', 'powerwall', 'supercharger'],
  'NVDA': [
    'nvidia', 'nvidia corp', 'nvidia corporation',
    // Products
    'geforce', 'rtx', 'gtx', 'cuda', 'dgx', 'jetson', 'tegra', 'grace', 'hopper',
    'omniverse', 'shield', 'nvlink',
    // CEO
    'jensen huang', 'jensen'
  ],
  'NFLX': ['netflix', 'netflix inc'],
  'INTC': ['intel', 'intel corp', 'intel corporation', 'core i7', 'core i9', 'xeon', 'celeron', 'pentium'],
  'AMD': [
    'amd', 'advanced micro devices',
    // Products
    'ryzen', 'radeon', 'epyc', 'threadripper', 'athlon', 'radeon rx', 'instinct',
    // CEO
    'lisa su'
  ],
  'ADBE': ['adobe', 'adobe inc', 'adobe systems', 'photoshop', 'illustrator', 'acrobat', 'creative cloud', 'premiere', 'after effects'],
  'CSCO': ['cisco', 'cisco systems', 'webex'],
  'AVGO': ['broadcom', 'broadcom inc', 'vmware'],
  'ORCL': [
    'oracle', 'oracle corp', 'oracle corporation',
    // Products
    'oracle database', 'oracle cloud', 'java', 'mysql', 'netsuiteoracle',
    // CEO
    'larry ellison', 'safra catz'
  ],
  'CRM': ['salesforce', 'salesforce.com'],
  'QCOM': ['qualcomm', 'qualcomm inc'],
  'TXN': ['texas instruments', 'ti'],
  'IBM': [
    'ibm', 'international business machines',
    // Products
    'watson', 'red hat', 'ibm cloud', 'quantum system one', 'z systems', 'power systems',
    // CEO
    'arvind krishna'
  ],
  'JPM': ['jpmorgan', 'jpmorgan chase', 'jp morgan'],
  'BAC': ['bank of america', 'bofa'],
  'WFC': ['wells fargo', 'wells fargo & company'],
  'GS': ['goldman sachs', 'goldman'],
  'MS': ['morgan stanley'],
  'C': ['citigroup', 'citi', 'citibank'],
  'AXP': ['american express', 'amex'],
  'V': ['visa', 'visa inc'],
  'MA': ['mastercard', 'mastercard inc'],
  'PYPL': ['paypal', 'paypal holdings'],
  'JNJ': ['johnson & johnson', 'johnson and johnson', 'j&j'],
  'UNH': ['unitedhealth', 'united health', 'unitedhealth group'],
  'PFE': ['pfizer', 'pfizer inc'],
  'ABBV': ['abbvie', 'abbvie inc'],
  'TMO': ['thermo fisher', 'thermo fisher scientific'],
  'MRK': ['merck', 'merck & co'],
  'ABT': ['abbott', 'abbott laboratories'],
  'LLY': ['eli lilly', 'lilly', 'eli lilly and company'],
  'AMGN': ['amgen', 'amgen inc'],
  'GILD': ['gilead', 'gilead sciences'],
  'WMT': ['walmart', 'wal-mart', 'walmart inc'],
  'HD': ['home depot', 'the home depot'],
  'PG': ['procter & gamble', 'procter and gamble', 'p&g'],
  'KO': ['coca-cola', 'coca cola', 'coke'],
  'PEP': ['pepsico', 'pepsi'],
  'COST': ['costco', 'costco wholesale'],
  'NKE': ['nike', 'nike inc'],
  'MCD': ['mcdonalds', "mcdonald's", 'mcd'],
  'DIS': ['disney', 'walt disney', 'the walt disney company'],
  'SBUX': ['starbucks', 'starbucks corporation'],
  'BA': ['boeing', 'boeing company'],
  'CAT': ['caterpillar', 'caterpillar inc'],
  'HON': ['honeywell', 'honeywell international'],
  'MMM': ['3m', '3m company'],
  'GE': ['general electric', 'ge'],
  'UPS': ['ups', 'united parcel service'],
  'LMT': ['lockheed martin', 'lockheed'],
  'XOM': ['exxon', 'exxon mobil', 'exxonmobil'],
  'CVX': ['chevron', 'chevron corporation'],
  'COP': ['conocophillips', 'conoco'],
  'SLB': ['schlumberger', 'slb'],
  'VZ': ['verizon', 'verizon communications'],
  'T': ['at&t', 'att', 'at and t'],
  'CMCSA': ['comcast', 'comcast corporation'],
  'TMUS': ['t-mobile', 'tmobile', 't mobile'],
  'EBAY': ['ebay', 'ebay inc'],
  'BKNG': ['booking', 'booking holdings', 'booking.com'],
  'ABNB': ['airbnb', 'airbnb inc'],
  'TSM': ['tsmc', 'taiwan semiconductor', 'taiwan semi'],
  'AMAT': ['applied materials', 'amat'],
  'LRCX': ['lam research'],
  'KLAC': ['kla', 'kla corporation', 'kla-tencor'],
  'MU': ['micron', 'micron technology'],
  'NOW': ['servicenow', 'service now'],
  'INTU': ['intuit', 'intuit inc'],
  'SNOW': ['snowflake', 'snowflake inc'],
  'PANW': ['palo alto', 'palo alto networks'],
  'CRWD': ['crowdstrike', 'crowdstrike holdings'],
  'F': ['ford', 'ford motor', 'ford motor company'],
  'GM': ['general motors', 'gm'],
  'RIVN': ['rivian', 'rivian automotive'],
  'SPOT': ['spotify', 'spotify technology'],
  'UBER': ['uber', 'uber technologies'],
  'LYFT': ['lyft', 'lyft inc'],
  'ZM': ['zoom', 'zoom video', 'zoom communications'],
  'DOCU': ['docusign', 'docusign inc'],
  'COIN': ['coinbase', 'coinbase global'],
  'MSTR': ['microstrategy', 'microstrategy inc'],
  'MARA': ['marathon digital', 'marathon'],
  'RIOT': ['riot', 'riot platforms', 'riot blockchain'],
  'SNAP': ['snap', 'snap inc', 'snapchat'],
  'PINS': ['pinterest', 'pinterest inc'],
  'RDDT': ['reddit', 'reddit inc'],
  'PLUG': ['plug power', 'plug'],
  'FCEL': ['fuelcell', 'fuelcell energy'],
  'ENPH': ['enphase', 'enphase energy'],
  'BLNK': ['blink', 'blink charging'],
  'CHPT': ['chargepoint', 'chargepoint holdings'],
  'QBTS': [
    'd-wave', 'd-wave quantum', 'dwave', 'd wave',
    // Technology & Products
    'quantum annealing', 'advantage quantum', 'leap quantum cloud',
    // CEO
    'alan baratz'
  ],
  'IONQ': [
    'ionq', 'ionq inc',
    // Technology & Products
    'trapped ion', 'ionq forte', 'ionq aria',
    // CEO
    'peter chapman'
  ],
  'QUBT': [
    'quantum computing', 'quantum computing inc', 'qci',
    // Technology & Products
    'reservoir computer', 'dirac', 'qatalyst'
  ],
  'RGTI': [
    'rigetti', 'rigetti computing',
    // Technology & Products
    'superconducting quantum', 'rigetti cloud services', 'aspen quantum processor',
    // CEO/Founder
    'chad rigetti'
  ],
  'PLTR': [
    'palantir', 'palantir technologies',
    // Products
    'gotham', 'foundry', 'apollo', 'artificial intelligence platform', 'aip',
    // CEO
    'alex karp', 'peter thiel'
  ],
  'ASML': [
    'asml', 'asml holding',
    // Products & Technology
    'euv', 'extreme ultraviolet', 'lithography', 'twinscan', 'duv',
    // CEO
    'peter wennink', 'christophe fouquet'
  ],
  'FN': [
    'fabrinet',
    // CEO
    'seamus grady'
  ],
  'FTNT': [
    'fortinet', 'fortinet inc',
    // Products
    'fortigate', 'fortios', 'fortianalyzer', 'fortimanager', 'fortisiem', 'forticloud',
    // CEO
    'ken xie'
  ],
  'FDS': [
    'factset', 'factset research', 'factset research systems',
    // Products
    'factset workstation',
    // CEO
    'philip snow'
  ],
};

// Build the main mapping
function buildCompanyNameMapping() {
  const mapping = new Map<string, string[]>();

  // Add all tracked stocks with their base names
  TRACKED_STOCKS.forEach(stock => {
    const baseName = stock.name.toLowerCase()
      .replace(/\s+(inc\.?|corp\.?|corporation|company|co\.?|ltd\.?|llc|plc)$/i, '')
      .trim();

    // Add base name
    if (!mapping.has(baseName)) {
      mapping.set(baseName, []);
    }
    if (!mapping.get(baseName)!.includes(stock.ticker)) {
      mapping.get(baseName)!.push(stock.ticker);
    }

    // Add full name
    const fullName = stock.name.toLowerCase();
    if (!mapping.has(fullName)) {
      mapping.set(fullName, []);
    }
    if (!mapping.get(fullName)!.includes(stock.ticker)) {
      mapping.get(fullName)!.push(stock.ticker);
    }

    // Add ticker itself
    const tickerLower = stock.ticker.toLowerCase();
    if (!mapping.has(tickerLower)) {
      mapping.set(tickerLower, []);
    }
    if (!mapping.get(tickerLower)!.includes(stock.ticker)) {
      mapping.get(tickerLower)!.push(stock.ticker);
    }

    // Add manual aliases if defined
    if (MANUAL_ALIASES[stock.ticker]) {
      MANUAL_ALIASES[stock.ticker].forEach(alias => {
        const aliasLower = alias.toLowerCase();
        if (!mapping.has(aliasLower)) {
          mapping.set(aliasLower, []);
        }
        if (!mapping.get(aliasLower)!.includes(stock.ticker)) {
          mapping.get(aliasLower)!.push(stock.ticker);
        }
      });
    }
  });

  return mapping;
}

// Initialize the mapping
const MAPPING = buildCompanyNameMapping();

/**
 * Find tickers by company name or alias
 * @param companyName - The company name to look up (case-insensitive)
 * @returns Array of ticker symbols, or empty array if not found
 */
export function getTickersByCompanyName(companyName: string): string[] {
  const normalized = companyName.toLowerCase().trim();
  return MAPPING.get(normalized) || [];
}

/**
 * Check if a ticker symbol is in our tracked list
 * @param ticker - The ticker symbol to check
 * @returns True if the ticker is tracked, false otherwise
 */
export function isTrackedTicker(ticker: string): boolean {
  const upperTicker = ticker.toUpperCase();
  return TRACKED_STOCKS.some(stock => stock.ticker === upperTicker);
}

/**
 * Get all valid ticker symbols
 * @returns Array of all tracked ticker symbols
 */
export function getAllValidTickers(): string[] {
  return TRACKED_STOCKS.map(stock => stock.ticker);
}

/**
 * Extract company names from text that match our tracked companies
 * Returns the tickers associated with those company names
 *
 * Uses context-aware matching to reduce false positives:
 * - Requires company names to appear with stock-related context OR
 * - Appear in typical business/financial sentence structures
 */
export function extractTickersFromCompanyNames(text: string): string[] {
  if (!text) return [];

  const foundTickers = new Set<string>();
  const lowerText = text.toLowerCase();

  // Stock-related context words that indicate we're talking about companies as investments
  const strongContext = [
    'stock', 'shares', 'share', 'traded', 'trading', 'ticker', 'equity', 'equities',
    'earnings', 'revenue', 'profit', 'loss', 'reported', 'reports',
    'rose', 'fell', 'gained', 'lost', 'jumped', 'plunged', 'surged', 'dropped',
    'climbed', 'tumbled', 'rallied', 'declined', 'soared', 'slumped',
    'market cap', 'valuation', 'ipo', 'nasdaq:', 'nyse:', 'dow', 's&p',
    'quarterly', 'financial', 'investors', 'investment', 'forecast', 'guidance',
  ];

  // Weaker context that needs company name to be capitalized or with other indicators
  const weakContext = [
    'announces', 'announced', 'announce', 'ceo', 'cfo', 'founder', 'chief',
    'inc.', 'inc', 'corp.', 'corp', 'corporation',
    'partnership', 'deal', 'merger', 'acquisition', 'acquires',
    'compete', 'competes', 'launches', 'launched', 'unveils', 'unveiled',
    'releases', 'released', 'debuts', 'debuted', 'introduces', 'introduced',
  ];

  // Product/brand context - even weaker, but still relevant for tech companies
  const productContext = [
    'users', 'customers', 'platform', 'device', 'software', 'hardware', 'app',
    'service', 'sales', 'sells', 'selling', 'sold', 'buy', 'buying', 'bought',
    'upgrade', 'update', 'version', 'release', 'beta', 'features',
  ];

  // Check each company name/alias in our mapping
  MAPPING.forEach((tickers, companyName) => {
    // Escape special regex characters
    const escapedName = companyName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Create pattern that looks for the company name with word boundaries
    const namePattern = new RegExp(`\\b${escapedName}\\b`, 'i');

    if (!namePattern.test(lowerText)) {
      return; // Company name not found at all
    }

    // Check if company name appears with stock-related context
    // Look within 50 characters before or after the company name mention
    const matches = [...lowerText.matchAll(new RegExp(`\\b${escapedName}\\b`, 'gi'))];

    for (const match of matches) {
      const matchIndex = match.index!;
      const contextStart = Math.max(0, matchIndex - 50);
      const contextEnd = Math.min(lowerText.length, matchIndex + companyName.length + 50);
      const contextWindow = lowerText.slice(contextStart, contextEnd);

      // Check for strong stock-related context
      const hasStrongContext = strongContext.some(word => contextWindow.includes(word));

      // Check for weak context
      const hasWeakContext = weakContext.some(word => contextWindow.includes(word));

      // Check for product/brand context
      const hasProductContext = productContext.some(word => contextWindow.includes(word));

      // Also check if the company name is capitalized in the original text (indicates proper noun)
      const originalContextStart = Math.max(0, matchIndex - 50);
      const originalContextEnd = Math.min(text.length, matchIndex + companyName.length + 50);
      const originalContextWindow = text.slice(originalContextStart, originalContextEnd);
      const capitalizedPattern = new RegExp(`\\b${escapedName}\\b`, 'i');
      const capitalizedMatch = originalContextWindow.match(capitalizedPattern);
      const isCapitalized = capitalizedMatch && capitalizedMatch[0][0] === capitalizedMatch[0][0].toUpperCase();

      // Determine if this is a product/brand name (lowercase in mapping indicates it's a product)
      const isProductName = companyName === companyName.toLowerCase() &&
                            companyName.length > 2 &&
                            !['inc', 'corp', 'ltd', 'llc', 'the'].includes(companyName);

      // Accept if:
      // 1. Strong context (stock, shares, earnings, etc.) - always valid
      // 2. Weak context AND capitalized - company announcements/news
      // 3. Product context AND (is product name OR capitalized) - product mentions tie to company
      // 4. Product/brand name mentioned (like "ios", "windows") with product context
      if (hasStrongContext ||
          (hasWeakContext && isCapitalized) ||
          (hasProductContext && (isProductName || isCapitalized))) {
        tickers.forEach(ticker => foundTickers.add(ticker));
        break; // Found valid context for this company name
      }
    }
  });

  return Array.from(foundTickers).sort();
}
