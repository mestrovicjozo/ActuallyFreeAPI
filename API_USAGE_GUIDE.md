# Financial News API - Usage Guide

Complete guide for integrating the free financial news API into your application.

## Base URL
```
https://actually-free-api.vercel.app
```

## Authentication
**None required!** This is a completely free API with no authentication, API keys, or rate limits.

---

## Endpoints

### 1. Get News Articles
**Endpoint:** `GET /api/news`

Fetch financial news articles with powerful filtering options.

#### Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `page` | integer | Page number (default: 1) | `?page=2` |
| `limit` | integer | Results per page (max: 100, default: 20) | `?limit=50` |
| `startDate` | ISO 8601 | Filter articles after this date | `?startDate=2025-01-01` |
| `endDate` | ISO 8601 | Filter articles before this date | `?endDate=2025-01-31` |
| `search` | string | Search in title and description | `?search=earnings` |
| `source` | string | Filter by news source | `?source=Reuters` |
| `ticker` | string | Filter by stock ticker symbol | `?ticker=AAPL` |

#### Response Format

```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Apple (AAPL) and Microsoft ($MSFT) Lead Tech Stocks Rally",
      "description": "Major technology stocks saw significant gains today...",
      "link": "https://example.com/article",
      "pub_date": "2025-01-20T14:30:00Z",
      "source": "Reuters",
      "guid": "reuters-tech-rally-20250120",
      "content": "Full article content...",
      "tickers": ["AAPL", "MSFT"],
      "created_at": "2025-01-20T14:35:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1547,
    "totalPages": 78,
    "hasNextPage": true,
    "hasPreviousPage": false
  },
  "filters": {
    "startDate": null,
    "endDate": null,
    "search": null,
    "source": null,
    "ticker": null
  }
}
```

---

### 2. Get News Sources
**Endpoint:** `GET /api/sources`

Get a list of all available RSS feed sources.

#### Response Format

```json
{
  "sources": [
    {
      "name": "Reuters World News",
      "url": "http://feeds.reuters.com/Reuters/worldNews",
      "category": "general",
      "description": "Reuters world and business news"
    }
  ],
  "totalSources": 21,
  "categories": ["general", "markets", "stocks", "investing", "technology", "business", "economics", "education"]
}
```

---

### 3. Get API Statistics
**Endpoint:** `GET /api/stats`

Get statistics about the API and database.

#### Response Format

```json
{
  "totalArticles": 1547,
  "totalSources": 21,
  "oldestArticle": "2024-12-21T10:00:00Z",
  "newestArticle": "2025-01-20T14:30:00Z",
  "articlesLast24Hours": 127,
  "categories": 8
}
```

---

## Usage Examples

### JavaScript / TypeScript

```typescript
// Fetch latest news
async function getLatestNews() {
  const response = await fetch('https://actually-free-api.vercel.app/api/news');
  const data = await response.json();
  return data;
}

// Filter by ticker symbol
async function getNewsByTicker(ticker: string) {
  const response = await fetch(
    `https://actually-free-api.vercel.app/api/news?ticker=${ticker}`
  );
  const data = await response.json();
  return data;
}

// Search with multiple filters
async function searchNews(params: {
  search?: string;
  ticker?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}) {
  const queryParams = new URLSearchParams();

  if (params.search) queryParams.append('search', params.search);
  if (params.ticker) queryParams.append('ticker', params.ticker);
  if (params.startDate) queryParams.append('startDate', params.startDate);
  if (params.endDate) queryParams.append('endDate', params.endDate);
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());

  const response = await fetch(
    `https://actually-free-api.vercel.app/api/news?${queryParams}`
  );
  const data = await response.json();
  return data;
}

// Example usage
const appleNews = await getNewsByTicker('AAPL');
const earningsNews = await searchNews({
  search: 'earnings',
  startDate: '2025-01-01',
  limit: 50
});
```

---

### React Hook

```typescript
import { useState, useEffect } from 'react';

interface NewsFilters {
  ticker?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
  source?: string;
  page?: number;
  limit?: number;
}

export function useFinancialNews(filters: NewsFilters = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });

        const response = await fetch(
          `https://actually-free-api.vercel.app/api/news?${params}`
        );

        if (!response.ok) throw new Error('Failed to fetch news');

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [JSON.stringify(filters)]);

  return { data, loading, error };
}

// Usage in component
function NewsComponent() {
  const { data, loading, error } = useFinancialNews({
    ticker: 'AAPL',
    limit: 10
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {data?.data.map(article => (
        <div key={article.id}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <a href={article.link}>Read more</a>
        </div>
      ))}
    </div>
  );
}
```

---

### Python

```python
import requests
from typing import Optional, Dict, List
from datetime import datetime

class FinancialNewsAPI:
    BASE_URL = "https://actually-free-api.vercel.app"

    def get_news(
        self,
        ticker: Optional[str] = None,
        search: Optional[str] = None,
        start_date: Optional[str] = None,
        end_date: Optional[str] = None,
        source: Optional[str] = None,
        page: int = 1,
        limit: int = 20
    ) -> Dict:
        """
        Fetch financial news articles with filters

        Args:
            ticker: Stock ticker symbol (e.g., 'AAPL')
            search: Search query for title/description
            start_date: ISO 8601 date string (e.g., '2025-01-01')
            end_date: ISO 8601 date string
            source: News source name
            page: Page number
            limit: Results per page (max 100)

        Returns:
            Dict containing articles and pagination info
        """
        params = {
            'page': page,
            'limit': limit
        }

        if ticker:
            params['ticker'] = ticker
        if search:
            params['search'] = search
        if start_date:
            params['startDate'] = start_date
        if end_date:
            params['endDate'] = end_date
        if source:
            params['source'] = source

        response = requests.get(f"{self.BASE_URL}/api/news", params=params)
        response.raise_for_status()
        return response.json()

    def get_sources(self) -> Dict:
        """Get all available news sources"""
        response = requests.get(f"{self.BASE_URL}/api/sources")
        response.raise_for_status()
        return response.json()

    def get_stats(self) -> Dict:
        """Get API statistics"""
        response = requests.get(f"{self.BASE_URL}/api/stats")
        response.raise_for_status()
        return response.json()

# Example usage
api = FinancialNewsAPI()

# Get Apple news
apple_news = api.get_news(ticker='AAPL', limit=10)

# Search for earnings reports
earnings = api.get_news(
    search='earnings',
    start_date='2025-01-01',
    limit=50
)

# Get all sources
sources = api.get_sources()

# Print articles
for article in apple_news['data']:
    print(f"{article['title']}")
    print(f"Source: {article['source']}")
    print(f"Tickers: {', '.join(article['tickers'] or [])}")
    print(f"Link: {article['link']}\n")
```

---

### cURL

```bash
# Get latest news
curl https://actually-free-api.vercel.app/api/news

# Filter by ticker
curl https://actually-free-api.vercel.app/api/news?ticker=AAPL

# Search for earnings with date range
curl "https://actually-free-api.vercel.app/api/news?search=earnings&startDate=2025-01-01&endDate=2025-01-31"

# Get specific source with pagination
curl "https://actually-free-api.vercel.app/api/news?source=Reuters&page=2&limit=50"

# Combine multiple filters
curl "https://actually-free-api.vercel.app/api/news?ticker=TSLA&search=earnings&limit=10"

# Get all sources
curl https://actually-free-api.vercel.app/api/sources

# Get statistics
curl https://actually-free-api.vercel.app/api/stats
```

---

## Common Use Cases

### 1. Real-time Stock News Dashboard

```typescript
// Fetch news for a watchlist of stocks
async function getWatchlistNews(tickers: string[]) {
  const allNews = await Promise.all(
    tickers.map(ticker =>
      fetch(`https://actually-free-api.vercel.app/api/news?ticker=${ticker}&limit=5`)
        .then(res => res.json())
    )
  );

  return allNews.flatMap((response, index) =>
    response.data.map(article => ({
      ...article,
      watchlistTicker: tickers[index]
    }))
  );
}

const watchlist = ['AAPL', 'TSLA', 'MSFT', 'GOOGL', 'AMZN'];
const news = await getWatchlistNews(watchlist);
```

### 2. Daily News Digest Email

```python
from datetime import datetime, timedelta
import smtplib
from email.mime.text import MIMEText

def get_daily_digest():
    """Get news from the last 24 hours"""
    api = FinancialNewsAPI()

    yesterday = (datetime.now() - timedelta(days=1)).isoformat()
    today = datetime.now().isoformat()

    news = api.get_news(
        start_date=yesterday,
        end_date=today,
        limit=100
    )

    return news['data']

def send_digest_email(news_articles):
    """Send email with daily news digest"""
    html = "<h1>Daily Financial News Digest</h1>"

    for article in news_articles[:20]:  # Top 20 articles
        html += f"""
        <div>
            <h3>{article['title']}</h3>
            <p><strong>Source:</strong> {article['source']}</p>
            <p>{article['description']}</p>
            <a href="{article['link']}">Read more</a>
            <hr>
        </div>
        """

    # Send email logic here
    # ...
```

### 3. Ticker Sentiment Analysis

```typescript
async function analyzeTickerSentiment(ticker: string, days: number = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const response = await fetch(
    `https://actually-free-api.vercel.app/api/news?ticker=${ticker}&startDate=${startDate.toISOString()}&limit=100`
  );

  const data = await response.json();

  // Analyze article titles and descriptions for sentiment
  const articles = data.data;
  const positiveWords = ['surge', 'rally', 'gain', 'rise', 'jump', 'up'];
  const negativeWords = ['fall', 'drop', 'plunge', 'decline', 'down', 'loss'];

  let sentiment = {
    positive: 0,
    negative: 0,
    neutral: 0,
    total: articles.length
  };

  articles.forEach(article => {
    const text = (article.title + ' ' + article.description).toLowerCase();

    const hasPositive = positiveWords.some(word => text.includes(word));
    const hasNegative = negativeWords.some(word => text.includes(word));

    if (hasPositive && !hasNegative) sentiment.positive++;
    else if (hasNegative && !hasPositive) sentiment.negative++;
    else sentiment.neutral++;
  });

  return sentiment;
}

// Usage
const appleSentiment = await analyzeTickerSentiment('AAPL', 7);
console.log(appleSentiment);
// { positive: 15, negative: 5, neutral: 10, total: 30 }
```

### 4. Market Alert System

```typescript
interface AlertConfig {
  ticker: string;
  keywords: string[];
  checkInterval: number; // minutes
}

class NewsAlertSystem {
  private lastChecked: Map<string, Date> = new Map();

  async checkForAlerts(config: AlertConfig): Promise<any[]> {
    const response = await fetch(
      `https://actually-free-api.vercel.app/api/news?ticker=${config.ticker}&limit=20`
    );

    const data = await response.json();
    const lastCheck = this.lastChecked.get(config.ticker) || new Date(0);

    // Filter for new articles with keywords
    const alerts = data.data.filter(article => {
      const articleDate = new Date(article.pub_date);
      const hasKeyword = config.keywords.some(keyword =>
        article.title.toLowerCase().includes(keyword.toLowerCase()) ||
        article.description?.toLowerCase().includes(keyword.toLowerCase())
      );

      return articleDate > lastCheck && hasKeyword;
    });

    this.lastChecked.set(config.ticker, new Date());
    return alerts;
  }

  async startMonitoring(configs: AlertConfig[], callback: (alerts: any[]) => void) {
    for (const config of configs) {
      setInterval(async () => {
        const alerts = await this.checkForAlerts(config);
        if (alerts.length > 0) {
          callback(alerts);
        }
      }, config.checkInterval * 60 * 1000);
    }
  }
}

// Usage
const alertSystem = new NewsAlertSystem();

alertSystem.startMonitoring(
  [
    { ticker: 'AAPL', keywords: ['earnings', 'lawsuit', 'ceo'], checkInterval: 5 },
    { ticker: 'TSLA', keywords: ['recall', 'delivery', 'production'], checkInterval: 5 }
  ],
  (alerts) => {
    console.log('🚨 News Alert:', alerts);
    // Send notification, email, etc.
  }
);
```

---

## Best Practices

### 1. Error Handling

```typescript
async function fetchNewsWithRetry(url: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;

      // Exponential backoff
      await new Promise(resolve =>
        setTimeout(resolve, Math.pow(2, i) * 1000)
      );
    }
  }
}
```

### 2. Caching

```typescript
class NewsCache {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private ttl: number = 5 * 60 * 1000; // 5 minutes

  async get(url: string): Promise<any> {
    const cached = this.cache.get(url);

    if (cached && Date.now() - cached.timestamp < this.ttl) {
      return cached.data;
    }

    const response = await fetch(url);
    const data = await response.json();

    this.cache.set(url, { data, timestamp: Date.now() });
    return data;
  }
}

const cache = new NewsCache();
const news = await cache.get('https://actually-free-api.vercel.app/api/news?ticker=AAPL');
```

### 3. Pagination

```typescript
async function getAllArticles(filters: any) {
  let allArticles = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const params = new URLSearchParams({ ...filters, page: page.toString() });
    const response = await fetch(
      `https://actually-free-api.vercel.app/api/news?${params}`
    );
    const data = await response.json();

    allArticles.push(...data.data);
    hasMore = data.pagination.hasNextPage;
    page++;

    // Add delay to be respectful
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return allArticles;
}
```

---

## Rate Limits

**Currently:** No rate limits!

**Recommendation:** Even though there are no enforced rate limits, please be respectful:
- Cache responses when possible
- Add small delays between requests in loops
- Don't hammer the API unnecessarily

---

## Data Retention

- Articles are stored for **30 days**
- Older articles are automatically deleted
- New articles are fetched **daily** (free tier) or **hourly** (pro tier)

---

## News Sources

The API aggregates news from 21+ sources:

- **General:** Reuters, Yahoo Finance, MarketWatch, CNBC, Benzinga
- **Markets:** Bloomberg Markets, WSJ Markets, FT Markets, Business Insider Markets
- **Business:** Forbes Business, WSJ Business
- **Technology:** Bloomberg Technology, Forbes Innovation
- **Investing:** Seeking Alpha, Motley Fool, IBD
- **Education:** Investopedia
- **Economics:** The Economist

---

## Support & Issues

- **GitHub:** [ActuallyFreeAPI Repository](https://github.com/mestrovicjozo/ActuallyFreeAPI)
- **Issues:** Report bugs or request features via GitHub Issues
- **Contributions:** Pull requests welcome!

---

## License

This API is provided free of charge for personal and commercial use. Please credit the source when appropriate.

---

**Last Updated:** January 2025
