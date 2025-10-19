# RSS Cron Job Documentation

This directory contains the cron job endpoint that fetches RSS feeds and stores articles in the database.

## Overview

The `/api/cron/fetch-rss` endpoint:
- Fetches articles from all configured RSS feeds
- Stores new articles in Supabase (avoids duplicates using `guid`)
- Automatically cleans up articles older than 30 days
- Runs every hour via Vercel Cron Jobs

## Configuration

### Vercel Cron Setup

The cron job is configured in `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/fetch-rss",
      "schedule": "0 * * * *"
    }
  ]
}
```

**Schedule**: `0 * * * *` (every hour at minute 0)

To change the frequency, modify the cron expression:
- `0 * * * *` - Every hour
- `0 */2 * * *` - Every 2 hours
- `0 0 * * *` - Once a day at midnight
- `*/30 * * * *` - Every 30 minutes

### Security

The endpoint is protected by a secret token. Set `CRON_SECRET` in your environment variables:

```bash
CRON_SECRET=your_random_secret_key
```

Vercel Cron Jobs automatically include this as a Bearer token in the Authorization header.

## Manual Testing

You can manually trigger the cron job for testing:

### Using cURL:
```bash
curl -X POST https://your-domain.vercel.app/api/cron/fetch-rss \
  -H "Authorization: Bearer your_cron_secret"
```

### Using the Vercel Dashboard:
1. Go to your project on Vercel
2. Navigate to the "Cron Jobs" tab
3. Click "Run" next to the fetch-rss job

## Response Format

The endpoint returns a JSON summary:

```json
{
  "timestamp": "2024-01-01T12:00:00.000Z",
  "totalFeeds": 25,
  "successful": 24,
  "failed": 1,
  "totalArticlesAdded": 156,
  "results": [
    {
      "source": "Reuters Business",
      "success": true,
      "articlesAdded": 12
    },
    {
      "source": "Failed Feed",
      "success": false,
      "articlesAdded": 0,
      "error": "Connection timeout"
    }
  ]
}
```

## How It Works

1. **Fetch RSS Feeds**: Loops through all feeds configured in `config/rss-feeds.ts`
2. **Parse Content**: Uses `rss-parser` to extract articles
3. **Insert to Database**: Upserts articles (ignores duplicates based on `guid`)
4. **Cleanup**: Removes articles older than 30 days
5. **Return Summary**: Sends back statistics about the operation

## Error Handling

- Individual feed failures don't stop the entire job
- Errors are logged and included in the response
- A 500ms delay between feeds prevents rate limiting
- 10-second timeout per feed fetch

## Monitoring

Check the Vercel logs to monitor cron job execution:
1. Go to your Vercel project dashboard
2. Click on "Logs"
3. Filter by the cron job function

Look for:
- Successful executions
- Number of articles added
- Failed feeds
- Error messages

## Troubleshooting

### Cron job not running
- Ensure your project is deployed to Vercel
- Verify `vercel.json` is in the project root
- Check Vercel dashboard for cron job status

### No articles being added
- Verify Supabase credentials are correct
- Check that RSS feeds are accessible
- Look for error messages in Vercel logs

### Duplicate articles
- The system uses `guid` to prevent duplicates
- If duplicates appear, verify the RSS feed provides consistent GUIDs

### Database full
- Verify the cleanup function is running
- Check that articles older than 30 days are being deleted
- Monitor Supabase storage usage
