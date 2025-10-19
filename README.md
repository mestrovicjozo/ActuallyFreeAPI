# Free Financial News API

A completely free REST API that aggregates financial news from 21+ major RSS feeds. No setup required - just start using it!

## 🚀 Quick Start

**Base URL:** `https://actually-free-api.vercel.app`

Just make HTTP requests - no API keys, no authentication, no limits!

```bash
# Get latest financial news
curl "https://actually-free-api.vercel.app/api/news"

# Search for specific stocks
curl "https://actually-free-api.vercel.app/api/news?search=AAPL"

# Get news from specific sources
curl "https://actually-free-api.vercel.app/api/news?source=Bloomberg%20Markets"

# Filter by date range
curl "https://actually-free-api.vercel.app/api/news?startDate=2024-01-01&endDate=2024-01-31"
```

## ✨ Features

- **100% Free** - No API keys, no rate limits, no credit card required
- **21+ News Sources** - Reuters, Bloomberg, CNBC, WSJ, Financial Times, Yahoo Finance, and more
- **30-Day History** - Access up to a month of historical financial news
- **Powerful Search** - Search by keywords, stock symbols (AAPL, TSLA, etc.)
- **Date Filtering** - Get news from specific date ranges
- **Source Filtering** - Filter by specific news outlets
- **Pagination** - Efficient pagination for large result sets
- **Daily Updates** - Automatically updated daily with fresh articles

## API Documentation

### Endpoints

#### GET /api/news

Fetch news articles with optional filtering.

**Query Parameters:**
- `startDate` (string) - Filter from this date (ISO 8601 format)
- `endDate` (string) - Filter until this date (ISO 8601 format)
- `search` (string) - Search in title and description
- `source` (string) - Filter by specific source name
- `page` (number) - Page number (default: 1)
- `limit` (number) - Results per page (max 100, default: 20)

**Example:**
```bash
curl "https://actually-free-api.vercel.app/api/news?search=TSLA&limit=10"
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

See `/app/api/README.md` for complete API documentation with examples in multiple languages.

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

## 🛠️ Self-Hosting

Want to run your own instance? See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed setup instructions.

## 🤝 Contributing

Want to help improve this API? Check out [CONTRIBUTING.md](CONTRIBUTING.md)!

Ideas for contributions:
- Add more RSS feeds
- Improve search functionality
- Add sentiment analysis
- Create SDKs for different languages
- Improve documentation

## 📄 License

MIT License - Free to use for personal and commercial projects.

## ⭐ Support

- Give this repo a star if you find it useful!
- Share with others who might need financial news data
- [Report issues](https://github.com/mestrovicjozo/ActuallyFreeAPI/issues) if you find bugs

---

**Making financial news accessible to everyone** - No barriers, no costs, just data.
