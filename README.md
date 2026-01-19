# Free Financial News API

A completely free REST API that aggregates financial news from 24+ major RSS feeds and tracks stock mentions with intelligent multi-tier ticker extraction. Supports ~500+ stocks from major US indices (S&P 500, NASDAQ-100, Dow Jones 30). No setup required - just start using it.

## Quick Start

**Base URL:** `https://actually-free-api.vercel.app`

Just make HTTP requests - no API keys, no authentication, no limits.

```bash
# Get latest financial news with stock tickers
curl "https://actually-free-api.vercel.app/api/news"

# Get news for specific stocks
curl "https://actually-free-api.vercel.app/api/news?tickers=AAPL,NVDA"

# Get all tracked stocks (~500+ from major indices)
curl "https://actually-free-api.vercel.app/api/stocks"

# Search news by keywords
curl "https://actually-free-api.vercel.app/api/news?search=quantum%20computing"

# Filter by date range
curl "https://actually-free-api.vercel.app/api/news?startDate=2024-01-01&endDate=2024-01-31"

# Get S&P 500 stocks only
curl "https://actually-free-api.vercel.app/api/stocks?index=SP500"
```

## Features

### News API
- **100% Free** - No API keys, no rate limits, no credit card required
- **24+ News Sources** - Reuters, Bloomberg, CNBC, WSJ, Financial Times, Yahoo Finance, Google News, SEC EDGAR, and more
- **30-Day History** - Access up to a month of historical financial news
- **Smart Ticker Extraction** - Four-tier extraction system (see below)
- **Full Article Fetching** - Extracts content from article URLs for better ticker detection
- **NLP Entity Recognition** - Uses compromise.js for organization and person name extraction
- **Product & Brand Recognition** - Recognizes products (iOS->AAPL, Windows->MSFT) and brands
- **CEO Name Recognition** - Links CEO mentions to companies (Jensen Huang->NVDA)
- **Powerful Search** - Search by keywords, stock symbols, company names
- **Date Filtering** - Get news from specific date ranges
- **Source Filtering** - Filter by specific news outlets
- **Ticker Filtering** - Get news mentioning specific stocks
- **Pagination** - Efficient pagination for large result sets
- **Daily Updates** - Automatically updated daily with fresh articles

### Stock Tracking API
- **500+ Stocks** - All major US index constituents (S&P 500, NASDAQ-100, Dow Jones 30)
- **Ticker Mentions** - Track which stocks are mentioned in news articles
- **Index Filtering** - Filter stocks by specific index (SP500, NASDAQ100, DOW30)
- **Stock Search** - Search stocks by ticker or company name

## How Ticker Extraction Works

The API uses a four-tier extraction system to identify stock tickers in news articles:

### Tier 1: Explicit Ticker Mentions (Highest Confidence)
- Dollar sign format: `$AAPL`, `$NVDA`
- Exchange prefix: `NASDAQ:GOOGL`, `NYSE:IBM`
- Parentheses format: `(AAPL)`, `(NASDAQ:MSFT)`

### Tier 2: Pattern-Based Extraction
- Context-aware: "AAPL shares rose", "NVDA stock jumped"
- Possessive: "Apple's stock", "Microsoft's earnings"
- Movement patterns: "NVDA jumped 5%", "AAPL fell 3%"
- Price mentions: "AAPL at $150", "NVDA trading at $800"

### Tier 3: Company Name Matching
- Company names: "Apple" -> AAPL, "Alphabet" -> GOOGL
- Products/brands: "iOS" -> AAPL, "YouTube" -> GOOGL
- CEO names: "Jensen Huang" -> NVDA, "Mark Zuckerberg" -> META

### Tier 4: NLP Entity Extraction
- Uses compromise.js for natural language processing
- Extracts organization names from text
- Maps person names to companies via CEO database
- Analyzes proper nouns for company references

### Full Article Fetching
When RSS snippets don't contain tickers, the system fetches full article content using Mozilla Readability (same technology as Firefox Reader View) to extract clean text for better ticker detection.

## API Documentation

### News Endpoints

#### GET /api/news

Fetch news articles with optional filtering. Each article includes automatically extracted stock tickers.

**Query Parameters:**
- `startDate` (string) - Filter from this date (ISO 8601 format)
- `endDate` (string) - Filter until this date (ISO 8601 format)
- `search` (string) - Full-text search in title and description (optimized with PostgreSQL GIN index)
- `source` (string) - Filter by specific source name
- `ticker` (string) - Filter by single stock ticker (e.g., AAPL)
- `tickers` (string) - Filter by multiple stock tickers (comma-separated: AAPL,NVDA,META)
- `sort` (string) - Sort field: `pub_date` (default), `created_at`, or `source`
- `order` (string) - Sort order: `desc` (default) or `asc`
- `page` (number) - Page number (default: 1)
- `limit` (number) - Results per page (max 100, default: 20)

**Response includes:**
- Article title, description, content
- Publication date and source
- Extracted stock tickers (AAPL, NVDA, etc.)
- Direct link to original article

**Examples:**
```bash
# Get news mentioning Apple or NVIDIA
curl "https://actually-free-api.vercel.app/api/news?tickers=AAPL,NVDA"

# Search for quantum computing news (uses full-text search)
curl "https://actually-free-api.vercel.app/api/news?search=quantum%20computing"

# Get Tesla news from last week, sorted by date ascending
curl "https://actually-free-api.vercel.app/api/news?ticker=TSLA&limit=10&order=asc"

# Get latest news sorted by source alphabetically
curl "https://actually-free-api.vercel.app/api/news?sort=source&order=asc"

# Search for AI news from multiple stocks
curl "https://actually-free-api.vercel.app/api/news?tickers=NVDA,GOOGL,MSFT&search=artificial%20intelligence"
```

#### GET /api/sources

Get list of all RSS feed sources.

#### GET /api/stats

Get API statistics and database information.

### Stock Tracking Endpoints

#### GET /api/stocks

Get list of all tracked stocks from major US indices (~500+ stocks).

**Query Parameters:**
- `index` (string) - Filter by index: `SP500`, `NASDAQ100`, or `DOW30`
- `ticker` (string) - Look up a specific ticker
- `search` (string) - Search by ticker or company name

**Examples:**
```bash
# Get all stocks
curl "https://actually-free-api.vercel.app/api/stocks"

# Get S&P 500 stocks
curl "https://actually-free-api.vercel.app/api/stocks?index=SP500"

# Look up a specific ticker
curl "https://actually-free-api.vercel.app/api/stocks?ticker=AAPL"

# Search for stocks
curl "https://actually-free-api.vercel.app/api/stocks?search=apple"
```

#### GET /api/stocks/tickers

Get array of all tracked ticker symbols.

**Query Parameters:**
- `index` (string) - Filter by index: `SP500`, `NASDAQ100`, or `DOW30`

#### GET /api/stocks/stats

Get statistics about stock mentions in news articles and index coverage.

See the [live documentation](https://actually-free-api.vercel.app) for more examples and interactive demos.

## Project Structure

```
ActuallyFreeAPI/
├── app/
│   ├── api/
│   │   ├── cron/
│   │   │   └── fetch-rss/        # Cron job endpoint
│   │   ├── news/                 # News articles endpoint
│   │   ├── sources/              # Sources listing endpoint
│   │   ├── stats/                # Statistics endpoint
│   │   └── stocks/               # Stock tracking endpoints
│   ├── components/               # React components
│   ├── hooks/                    # Custom React hooks
│   ├── utils/                    # Utility functions
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Landing page
├── config/
│   ├── rss-feeds.ts              # RSS feed configuration
│   └── index-constituents.ts     # Major US index stocks (~500+)
├── database/
│   ├── schema.sql                # Database schema
│   └── README.md                 # Database setup guide
├── lib/
│   ├── supabase.ts               # Supabase client
│   ├── extractTickers.ts         # Ticker extraction logic
│   ├── ticker-mappings.ts        # Company name to ticker mappings
│   ├── article-fetcher.ts        # Full article content extraction
│   └── nlp-extractor.ts          # NLP-based entity extraction
├── .env.example                  # Environment variables template
├── vercel.json                   # Vercel cron configuration
└── README.md                     # This file
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Test production build locally
npm run start

# Lint check
npm run lint

# Clear cache (if issues)
rm -rf .next && npm run dev
```

## News Sources

The API aggregates from 24+ major financial news outlets:

- **Reuters**, **Yahoo Finance**, **MarketWatch**
- **Bloomberg** (Markets & Technology)
- **CNBC** (Top News, Markets, Investing)
- **Wall Street Journal** (Markets & Business)
- **Financial Times**, **Forbes** (Business & Innovation)
- **Business Insider**, **Seeking Alpha**, **IBD**
- **Motley Fool**, **Benzinga**, **The Economist**
- **Investopedia**
- **Google News** (Stock Market aggregation)
- **SEC EDGAR** (8-K filings)

View complete list: `GET /api/sources`

## Tracked Stocks

The API tracks all major US index constituents - over 500 unique stocks:

**S&P 500** (~500 stocks)
The 500 largest US companies by market capitalization, including Apple, Microsoft, Amazon, Google, and more.

**NASDAQ-100** (~100 stocks)
The 100 largest non-financial companies on NASDAQ, including tech giants and growth companies.

**Dow Jones Industrial Average** (30 stocks)
The 30 blue-chip US companies representing major industries.

**Intelligent Ticker Extraction**
These stocks are automatically tracked in all news articles with intelligent extraction that recognizes:
- Company names (Apple -> AAPL)
- Product names (iOS -> AAPL, Windows -> MSFT)
- Brand names (Instagram -> META, YouTube -> GOOGL)
- CEO names (Jensen Huang -> NVDA, Mark Zuckerberg -> META)

**API Endpoints:**
```bash
# View all tracked stocks
curl "https://actually-free-api.vercel.app/api/stocks"

# View S&P 500 stocks only
curl "https://actually-free-api.vercel.app/api/stocks?index=SP500"

# View NASDAQ-100 stocks only
curl "https://actually-free-api.vercel.app/api/stocks?index=NASDAQ100"

# View Dow Jones 30 stocks only
curl "https://actually-free-api.vercel.app/api/stocks?index=DOW30"
```

## Self-Hosting

Want to run your own instance? See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed setup instructions.

## Contributing

Want to help improve this API? Check out [CONTRIBUTING.md](CONTRIBUTING.md).

Ideas for contributions:
- Add more RSS feeds
- Improve search functionality
- Add sentiment analysis
- Create SDKs for different languages

## License

MIT License - Free to use for personal and commercial projects.

## Support

- Give this repo a star if you find it useful
- Share with others who might need financial news data
- [Report issues](https://github.com/mestrovicjozo/ActuallyFreeAPI/issues) if you find bugs

---

**Making financial news accessible to everyone** - No barriers, no costs, just data.
