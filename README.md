# Free Financial News & Stock Tracking API

A completely free REST API that aggregates financial news from 21+ major RSS feeds and tracks stock mentions with intelligent ticker extraction. No setup required - just start using it!

## 🚀 Quick Start

**Base URL:** `https://actually-free-api.vercel.app`

Just make HTTP requests - no API keys, no authentication, no limits!

```bash
# Get latest financial news with stock tickers
curl "https://actually-free-api.vercel.app/api/news"

# Get news for specific stocks
curl "https://actually-free-api.vercel.app/api/news?tickers=AAPL,NVDA"

# Get stock price tracking data
curl "https://actually-free-api.vercel.app/api/stocks"

# Search news by keywords
curl "https://actually-free-api.vercel.app/api/news?search=quantum%20computing"

# Filter by date range
curl "https://actually-free-api.vercel.app/api/news?startDate=2024-01-01&endDate=2024-01-31"
```

## ✨ Features

### News API
- **100% Free** - No API keys, no rate limits, no credit card required
- **21+ News Sources** - Reuters, Bloomberg, CNBC, WSJ, Financial Times, Yahoo Finance, and more
- **30-Day History** - Access up to a month of historical financial news
- **Smart Ticker Extraction** - Automatically detects stock tickers from articles
- **Product & Brand Recognition** - Recognizes products (iOS→AAPL, Windows→MSFT) and brands
- **CEO Name Recognition** - Links CEO mentions to companies (Jensen Huang→NVDA)
- **Powerful Search** - Search by keywords, stock symbols, company names
- **Date Filtering** - Get news from specific date ranges
- **Source Filtering** - Filter by specific news outlets
- **Ticker Filtering** - Get news mentioning specific stocks
- **Pagination** - Efficient pagination for large result sets
- **Daily Updates** - Automatically updated daily with fresh articles

### Stock Tracking API
- **18 Portfolio Stocks** - Tracking AI, quantum computing, and tech stocks
- **Stock Statistics** - Get price trends and mentions for tracked stocks
- **Portfolio Focus** - Curated list based on actual investment portfolio

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

**Example:**
```bash
curl "https://actually-free-api.vercel.app/api/sources"
```

#### GET /api/stats

Get API statistics and database information.

**Example:**
```bash
curl "https://actually-free-api.vercel.app/api/stats"
```

### Stock Tracking Endpoints

#### GET /api/stocks

Get list of all tracked stocks from the portfolio.

**Example:**
```bash
curl "https://actually-free-api.vercel.app/api/stocks"
```

#### GET /api/stocks/tickers

Get array of all tracked ticker symbols.

**Example:**
```bash
curl "https://actually-free-api.vercel.app/api/stocks/tickers"
```

#### GET /api/stocks/stats

Get statistics about stock mentions in news articles.

**Example:**
```bash
curl "https://actually-free-api.vercel.app/api/stocks/stats"
```

See the [live documentation](https://actually-free-api.vercel.app) for more examples and interactive demos.

## Project Structure

```
ActuallyFreeAPI/
├── app/
│   ├── api/
│   │   ├── cron/
│   │   │   └── fetch-rss/    # Cron job endpoint
│   │   ├── news/             # News articles endpoint
│   │   ├── sources/          # Sources listing endpoint
│   │   └── stats/            # Statistics endpoint
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              # Landing page
├── config/
│   └── rss-feeds.ts          # RSS feed configuration
├── database/
│   ├── schema.sql            # Database schema
│   └── README.md             # Database setup guide
├── lib/
│   └── supabase.ts           # Supabase client
├── .env.example              # Environment variables template
├── vercel.json               # Vercel cron configuration
└── README.md                 # This file
```

## 📰 News Sources

The API aggregates from 21+ major financial news outlets:

- **Reuters**, **Yahoo Finance**, **MarketWatch**
- **Bloomberg** (Markets & Technology)
- **CNBC** (Top News, Markets, Investing)
- **Wall Street Journal** (Markets & Business)
- **Financial Times**, **Forbes** (Business & Innovation)
- **Business Insider**, **Seeking Alpha**, **IBD**
- **Motley Fool**, **Benzinga**, **The Economist**
- **Investopedia**

View complete list: `GET /api/sources`

## 📈 Tracked Stocks

The API tracks 18 stocks from my personal investment portfolio, focusing on AI, quantum computing, and technology:

**Quantum Computing (4 stocks)**
- QBTS - D-Wave Quantum
- IONQ - IonQ
- QUBT - Quantum Computing Inc.
- RGTI - Rigetti Computing

**Tech Giants (5 stocks)**
- META - Meta Platforms
- NVDA - NVIDIA
- MSFT - Microsoft
- AMZN - Amazon
- GOOGL - Alphabet (Google)

**Semiconductors & Tech (4 stocks)**
- AMD - Advanced Micro Devices
- AVGO - Broadcom
- ASML - ASML Holding
- FN - Fabrinet

**AI & Enterprise (5 stocks)**
- PLTR - Palantir Technologies
- ORCL - Oracle
- IBM - IBM
- FTNT - Fortinet
- FDS - FactSet Research Systems

These stocks are automatically tracked in all news articles with intelligent extraction that recognizes:
- Company names (Apple → AAPL)
- Product names (iOS → AAPL, Windows → MSFT)
- Brand names (Instagram → META, YouTube → GOOGL)
- CEO names (Jensen Huang → NVDA, Mark Zuckerberg → META)

View current tracked stocks: `GET /api/stocks`

## 🛠️ Self-Hosting

Want to run your own instance? See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed setup instructions.

## 🤝 Contributing

Want to help improve this API? Check out [CONTRIBUTING.md](CONTRIBUTING.md)!

Ideas for contributions:
- Add more RSS feeds
- Improve search functionality
- Add sentiment analysis
- Create SDKs for different languages

## 📄 License

MIT License - Free to use for personal and commercial projects.

## ⭐ Support

- Give this repo a star if you find it useful!
- Share with others who might need financial news data
- [Report issues](https://github.com/mestrovicjozo/ActuallyFreeAPI/issues) if you find bugs

---

**Making financial news accessible to everyone** - No barriers, no costs, just data.
