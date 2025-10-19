# Financial News API Documentation

Welcome to the free Financial News API! This API provides access to up to 30 days of financial news aggregated from 25+ major RSS feeds.

## Base URL

```
https://your-domain.vercel.app/api
```

## Endpoints

### 1. Get News Articles

Fetch financial news articles with optional filtering and pagination.

**Endpoint:** `GET /api/news`

**Query Parameters:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `startDate` | string | Filter articles from this date (ISO 8601) | `2024-01-01` |
| `endDate` | string | Filter articles until this date (ISO 8601) | `2024-01-31` |
| `search` | string | Search in title and description | `AAPL` or `inflation` |
| `source` | string | Filter by specific RSS source | `Reuters Business` |
| `page` | number | Page number (default: 1) | `1` |
| `limit` | number | Results per page (max 100, default: 20) | `50` |

**Example Requests:**

```bash
# Get latest 20 articles
curl "https://your-domain.vercel.app/api/news"

# Search for articles about Apple
curl "https://your-domain.vercel.app/api/news?search=AAPL"

# Get articles from last 7 days
curl "https://your-domain.vercel.app/api/news?startDate=2024-01-15&endDate=2024-01-22"

# Get articles from specific source
curl "https://your-domain.vercel.app/api/news?source=Reuters%20Business"

# Pagination - get page 2 with 50 results
curl "https://your-domain.vercel.app/api/news?page=2&limit=50"

# Combine filters
curl "https://your-domain.vercel.app/api/news?search=Tesla&startDate=2024-01-01&limit=10"
```

**Response:**

```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Article Title",
      "description": "Article description or summary",
      "link": "https://example.com/article",
      "pub_date": "2024-01-20T15:30:00Z",
      "source": "Reuters Business",
      "guid": "unique-article-id",
      "content": "Full article content if available",
      "created_at": "2024-01-20T15:35:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1523,
    "totalPages": 77,
    "hasNextPage": true,
    "hasPreviousPage": false
  },
  "filters": {
    "startDate": null,
    "endDate": null,
    "search": null,
    "source": null
  }
}
```

---

### 2. Get News Sources

Get a list of all RSS feeds the API aggregates from.

**Endpoint:** `GET /api/sources`

**Example Request:**

```bash
curl "https://your-domain.vercel.app/api/sources"
```

**Response:**

```json
{
  "total": 25,
  "categories": [
    "general",
    "markets",
    "stocks",
    "investing",
    "business",
    "technology",
    "economics",
    "education"
  ],
  "sources": [
    {
      "name": "Reuters Business",
      "category": "general",
      "description": "Reuters business and financial news"
    },
    {
      "name": "Yahoo Finance",
      "category": "general",
      "description": "Yahoo Finance latest news"
    }
  ],
  "byCategory": {
    "general": [
      {
        "name": "Reuters Business",
        "url": "...",
        "category": "general",
        "description": "..."
      }
    ],
    "markets": [...]
  }
}
```

---

### 3. Get API Statistics

Get statistics about the API's database and recent activity.

**Endpoint:** `GET /api/stats`

**Example Request:**

```bash
curl "https://your-domain.vercel.app/api/stats"
```

**Response:**

```json
{
  "totalArticles": 15234,
  "articlesLast24Hours": 523,
  "newestArticle": "2024-01-22T18:45:00Z",
  "oldestArticle": "2023-12-23T08:15:00Z",
  "articlesBySource": {
    "Reuters Business": 1234,
    "Yahoo Finance": 987,
    "MarketWatch Top Stories": 856
  },
  "lastUpdated": "2024-01-22T18:50:00Z"
}
```

---

## Rate Limits

Currently, there are no strict rate limits, but please be respectful:
- Recommended: No more than 60 requests per minute
- Cache responses when possible
- Use pagination instead of fetching all articles at once

## CORS

The API supports CORS and can be called from any origin.

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message description"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request (invalid parameters)
- `500` - Internal Server Error

## Data Freshness

- Articles are fetched hourly from all RSS feeds
- Articles older than 30 days are automatically removed
- The database typically contains 10,000-20,000 articles

## Sources

The API aggregates news from these major outlets:
- Reuters, Yahoo Finance, MarketWatch, CNBC
- Bloomberg, Wall Street Journal, Financial Times
- Seeking Alpha, Forbes, Barron's
- And 15+ more financial news sources

See `/api/sources` for the complete list.

## Common Use Cases

### Get Latest Market News
```bash
curl "https://your-domain.vercel.app/api/news?limit=10"
```

### Search for Stock Symbol
```bash
# Search for Tesla news
curl "https://your-domain.vercel.app/api/news?search=TSLA"
```

### Get News from Specific Date Range
```bash
# Last 7 days
curl "https://your-domain.vercel.app/api/news?startDate=2024-01-15&endDate=2024-01-22"
```

### Filter by Category
```bash
# Get all MarketWatch articles
curl "https://your-domain.vercel.app/api/news?source=MarketWatch%20Top%20Stories"
```

## JavaScript/TypeScript Example

```typescript
interface NewsArticle {
  id: string;
  title: string;
  description: string | null;
  link: string;
  pub_date: string;
  source: string;
  guid: string;
  content: string | null;
  created_at: string;
}

interface NewsResponse {
  data: NewsArticle[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  filters: {
    startDate: string | null;
    endDate: string | null;
    search: string | null;
    source: string | null;
  };
}

async function getFinancialNews(params: {
  search?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}): Promise<NewsResponse> {
  const queryParams = new URLSearchParams();

  if (params.search) queryParams.set('search', params.search);
  if (params.startDate) queryParams.set('startDate', params.startDate);
  if (params.endDate) queryParams.set('endDate', params.endDate);
  if (params.page) queryParams.set('page', params.page.toString());
  if (params.limit) queryParams.set('limit', params.limit.toString());

  const response = await fetch(
    `https://your-domain.vercel.app/api/news?${queryParams}`
  );

  return response.json();
}

// Usage
const news = await getFinancialNews({
  search: 'AAPL',
  limit: 10
});
console.log(news.data);
```

## Python Example

```python
import requests
from datetime import datetime, timedelta

BASE_URL = "https://your-domain.vercel.app/api"

def get_financial_news(search=None, start_date=None, end_date=None, page=1, limit=20):
    params = {
        'page': page,
        'limit': limit
    }

    if search:
        params['search'] = search
    if start_date:
        params['startDate'] = start_date
    if end_date:
        params['endDate'] = end_date

    response = requests.get(f"{BASE_URL}/news", params=params)
    return response.json()

# Get news about Tesla from last week
last_week = (datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d')
news = get_financial_news(
    search='TSLA',
    start_date=last_week,
    limit=10
)

for article in news['data']:
    print(f"{article['title']} - {article['source']}")
```

## Support

For issues, questions, or feature requests, please open an issue on our GitHub repository.

## License

This API is free to use for personal and commercial projects.
