export interface RSSFeed {
  name: string;
  url: string;
  category: string;
  description: string;
}

export const RSS_FEEDS: RSSFeed[] = [
  // Reuters
  {
    name: 'Reuters Business',
    url: 'https://www.reutersagency.com/feed/?taxonomy=best-topics&post_type=best',
    category: 'general',
    description: 'Reuters business and financial news',
  },

  // Yahoo Finance
  {
    name: 'Yahoo Finance',
    url: 'https://finance.yahoo.com/news/rssindex',
    category: 'general',
    description: 'Yahoo Finance latest news',
  },

  // MarketWatch
  {
    name: 'MarketWatch Top Stories',
    url: 'https://www.marketwatch.com/rss/topstories',
    category: 'general',
    description: 'MarketWatch top financial stories',
  },

  // Seeking Alpha
  {
    name: 'Seeking Alpha Market News',
    url: 'https://seekingalpha.com/market_currents.xml',
    category: 'markets',
    description: 'Breaking market news and analysis',
  },
  {
    name: 'Seeking Alpha Top Stock Ideas',
    url: 'https://seekingalpha.com/feed.xml',
    category: 'stocks',
    description: 'Top stock ideas and analysis',
  },

  // CNBC
  {
    name: 'CNBC Top News',
    url: 'https://www.cnbc.com/id/100003114/device/rss/rss.html',
    category: 'general',
    description: 'CNBC top business news',
  },
  {
    name: 'CNBC Markets',
    url: 'https://www.cnbc.com/id/20409666/device/rss/rss.html',
    category: 'markets',
    description: 'CNBC market news and analysis',
  },
  {
    name: 'CNBC Investing',
    url: 'https://www.cnbc.com/id/15839069/device/rss/rss.html',
    category: 'investing',
    description: 'Investment news and strategies',
  },

  // Bloomberg (via their public feeds)
  {
    name: 'Bloomberg Markets',
    url: 'https://feeds.bloomberg.com/markets/news.rss',
    category: 'markets',
    description: 'Bloomberg market updates',
  },
  {
    name: 'Bloomberg Technology',
    url: 'https://feeds.bloomberg.com/technology/news.rss',
    category: 'technology',
    description: 'Tech and innovation news',
  },

  // The Wall Street Journal
  {
    name: 'WSJ Markets',
    url: 'https://feeds.a.dj.com/rss/RSSMarketsMain.xml',
    category: 'markets',
    description: 'Wall Street Journal market news',
  },
  {
    name: 'WSJ Business',
    url: 'https://feeds.a.dj.com/rss/WSJcomUSBusiness.xml',
    category: 'business',
    description: 'WSJ business coverage',
  },

  // Financial Times
  {
    name: 'FT Markets',
    url: 'https://www.ft.com/markets?format=rss',
    category: 'markets',
    description: 'Financial Times market coverage',
  },

  // Forbes
  {
    name: 'Forbes Money',
    url: 'https://www.forbes.com/money/feed/',
    category: 'general',
    description: 'Forbes money and finance',
  },
  {
    name: 'Forbes Investing',
    url: 'https://www.forbes.com/investing/feed/',
    category: 'investing',
    description: 'Forbes investing insights',
  },

  // Barron's
  {
    name: "Barron's Market News",
    url: 'https://www.barrons.com/rss',
    category: 'markets',
    description: "Barron's market analysis",
  },

  // Investor's Business Daily
  {
    name: 'IBD Stock Market',
    url: 'https://www.investors.com/feed/',
    category: 'stocks',
    description: 'Stock market news and investing tips',
  },

  // The Motley Fool
  {
    name: 'Motley Fool',
    url: 'https://www.fool.com/feeds/index.aspx',
    category: 'investing',
    description: 'Investment advice and stock picks',
  },

  // Benzinga
  {
    name: 'Benzinga News',
    url: 'https://www.benzinga.com/feed',
    category: 'general',
    description: 'Fast-breaking financial news',
  },

  // The Economist
  {
    name: 'The Economist Finance',
    url: 'https://www.economist.com/finance-and-economics/rss.xml',
    category: 'economics',
    description: 'Economic and financial analysis',
  },

  // Investopedia
  {
    name: 'Investopedia Markets',
    url: 'https://www.investopedia.com/feedbuilder/feed/getfeed?feedName=rss_headline',
    category: 'education',
    description: 'Financial education and market news',
  },
];

// Helper function to get feeds by category
export function getFeedsByCategory(category: string): RSSFeed[] {
  return RSS_FEEDS.filter(feed => feed.category === category);
}

// Helper function to get all categories
export function getCategories(): string[] {
  return Array.from(new Set(RSS_FEEDS.map(feed => feed.category)));
}

// Helper function to get feed by name
export function getFeedByName(name: string): RSSFeed | undefined {
  return RSS_FEEDS.find(feed => feed.name === name);
}
