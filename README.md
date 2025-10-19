# Free Financial News API

A completely free REST API that aggregates financial news from 25+ major RSS feeds. Built with Next.js, Supabase, and deployed on Vercel.

## Features

- **100% Free** - No API keys, no rate limits, no credit card required
- **25+ News Sources** - Aggregates from Reuters, Bloomberg, CNBC, WSJ, Financial Times, and more
- **30-Day History** - Access up to a month of historical financial news
- **Powerful Filtering** - Filter by date range, source, and search keywords/stock symbols
- **Hourly Updates** - Automatically fetches new articles every hour via Vercel Cron
- **Pagination Support** - Efficient pagination for large result sets
- **Full-Text Search** - Search across article titles and descriptions

## Tech Stack

- **Frontend/Backend**: Next.js 15 with App Router
- **Database**: Supabase (PostgreSQL)
- **RSS Parsing**: rss-parser
- **Deployment**: Vercel
- **Cron Jobs**: Vercel Cron
- **Language**: TypeScript

## Quick Start

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier)
- A Vercel account (free tier)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ActuallyFreeAPI.git
cd ActuallyFreeAPI
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Copy and paste the contents of `database/schema.sql` and run it
4. Get your project URL and anon key from Settings > API

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
CRON_SECRET=your_random_secret_key
```

Generate a random secret for `CRON_SECRET`:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 5. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000` to see the landing page.

### 6. Test the API Locally

```bash
# Get latest news
curl "http://localhost:3000/api/news"

# Search for a stock
curl "http://localhost:3000/api/news?search=AAPL"

# Get sources
curl "http://localhost:3000/api/sources"

# Get stats
curl "http://localhost:3000/api/stats"
```

### 7. Manually Trigger RSS Fetch (for testing)

```bash
curl -X POST "http://localhost:3000/api/cron/fetch-rss" \
  -H "Authorization: Bearer your_cron_secret"
```

## Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `CRON_SECRET`
5. Click "Deploy"

### 3. Verify Cron Job

1. After deployment, go to your Vercel project dashboard
2. Navigate to the "Cron Jobs" tab
3. You should see the `fetch-rss` job scheduled to run every hour
4. Click "Run" to test it manually

### 4. Update Domain References

After deployment, update the example URLs in:
- `app/page.tsx` (replace `your-domain.vercel.app` with your actual domain)
- `app/api/README.md` (update all example URLs)

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
curl "https://your-domain.vercel.app/api/news?search=TSLA&limit=10"
```

#### GET /api/sources

Get list of all RSS feed sources.

**Example:**
```bash
curl "https://your-domain.vercel.app/api/sources"
```

#### GET /api/stats

Get API statistics and database information.

**Example:**
```bash
curl "https://your-domain.vercel.app/api/stats"
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

## Configuration

### Adding New RSS Feeds

Edit `config/rss-feeds.ts` and add your feed to the `RSS_FEEDS` array:

```typescript
{
  name: 'Your Feed Name',
  url: 'https://example.com/feed.xml',
  category: 'general',
  description: 'Description of the feed',
}
```

### Changing Cron Schedule

Edit `vercel.json` to change how often articles are fetched:

```json
{
  "crons": [
    {
      "path": "/api/cron/fetch-rss",
      "schedule": "0 * * * *"  // Every hour at minute 0
    }
  ]
}
```

Cron schedule examples:
- `0 * * * *` - Every hour
- `0 */2 * * *` - Every 2 hours
- `*/30 * * * *` - Every 30 minutes
- `0 0 * * *` - Once daily at midnight

### Adjusting Data Retention

The database automatically deletes articles older than 30 days. To change this:

1. Edit `database/schema.sql` - modify the `delete_old_articles()` function
2. Edit `app/api/cron/fetch-rss/route.ts` - adjust the cleanup logic

## News Sources

The API aggregates news from 25+ major financial outlets:

- **General**: Reuters, Yahoo Finance, CNBC, Forbes, Benzinga
- **Markets**: MarketWatch, Bloomberg, WSJ, FT, Barron's
- **Stocks**: Seeking Alpha, Investor's Business Daily
- **Investing**: Forbes Investing, Motley Fool
- **Economics**: The Economist
- **Education**: Investopedia

See the full list at `/api/sources` or in `config/rss-feeds.ts`.

## Monitoring & Maintenance

### View Logs

Check Vercel logs to monitor the cron job:
1. Go to your Vercel project dashboard
2. Click "Logs"
3. Filter by function name

### Check Database Size

Monitor your Supabase database usage:
1. Go to Supabase dashboard
2. Navigate to Settings > Database
3. Check storage usage (free tier: 500 MB)

### Troubleshooting

**Problem**: Cron job not running
- Verify `vercel.json` is in the project root
- Check Vercel dashboard > Cron Jobs tab
- Ensure environment variables are set correctly

**Problem**: No articles in database
- Manually trigger the cron job from Vercel dashboard
- Check logs for errors
- Verify Supabase credentials are correct

**Problem**: RSS feeds failing
- Some feeds may be temporarily unavailable
- Check `app/api/cron/fetch-rss/route.ts` logs
- Verify feed URLs in `config/rss-feeds.ts`

## Development

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Run Linter

```bash
npm run lint
```

### Type Checking

```bash
npx tsc --noEmit
```

## Contributing

Contributions are welcome! Here are some ideas:

- Add more RSS feeds
- Improve search functionality
- Add sentiment analysis
- Create additional filtering options
- Improve documentation
- Add rate limiting
- Create SDKs for different languages

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database powered by [Supabase](https://supabase.com)
- Deployed on [Vercel](https://vercel.com)
- RSS parsing by [rss-parser](https://github.com/rbren/rss-parser)

## Support

For questions, issues, or feature requests:
- Open an issue on GitHub
- Check the documentation in `/app/api/README.md`
- Review the database setup guide in `/database/README.md`

---

**Built with Claude Code** - Making financial news accessible to everyone.
