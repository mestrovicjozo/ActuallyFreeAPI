# Database Setup Guide

This guide will help you set up the Supabase database for the Financial News API.

## Prerequisites

1. Create a free Supabase account at [supabase.com](https://supabase.com)
2. Create a new project in Supabase

## Setup Steps

### 1. Get Your Supabase Credentials

After creating your project:
1. Go to your project settings
2. Navigate to API section
3. Copy the following values:
   - Project URL (e.g., `https://xxxxx.supabase.co`)
   - Anon/Public key

### 2. Configure Environment Variables

Create a `.env.local` file in the root of your project:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
CRON_SECRET=your_random_secret_key
```

Replace the values with your actual Supabase credentials.

### 3. Run Database Migration

1. Open your Supabase project dashboard
2. Go to the SQL Editor
3. Copy the contents of `schema.sql` from this directory
4. Paste and run the SQL in the editor

This will create:
- `news_articles` table with all necessary columns
- Indexes for optimized querying (by date, source, full-text search)
- A function to delete articles older than 30 days
- Row Level Security policies for public read access

## Database Schema

### news_articles Table

| Column       | Type                     | Description                           |
|-------------|--------------------------|---------------------------------------|
| id          | UUID                     | Primary key (auto-generated)          |
| title       | TEXT                     | Article title                         |
| description | TEXT                     | Article description/summary           |
| link        | TEXT                     | URL to the original article           |
| pub_date    | TIMESTAMP WITH TIME ZONE | Publication date                      |
| source      | TEXT                     | RSS feed source name                  |
| guid        | TEXT                     | Unique identifier from RSS feed       |
| content     | TEXT                     | Full article content (if available)   |
| created_at  | TIMESTAMP WITH TIME ZONE | When the record was created           |

## Data Retention

The database includes a function `delete_old_articles()` that removes articles older than 30 days. You can:

1. **Manual cleanup**: Call the function periodically via SQL Editor:
   ```sql
   SELECT delete_old_articles();
   ```

2. **Automatic cleanup** (optional): Enable pg_cron extension in Supabase and schedule it to run daily.

## Indexes

The following indexes are created for optimal performance:
- `idx_news_articles_pub_date`: Fast sorting by publication date
- `idx_news_articles_source`: Quick filtering by source
- `idx_news_articles_search`: Full-text search on title and description
- Unique constraint on `guid` prevents duplicate articles

## Testing Your Setup

After running the migration, you can test if everything works:

```sql
-- Insert a test article
INSERT INTO news_articles (title, description, link, pub_date, source, guid)
VALUES (
  'Test Article',
  'This is a test',
  'https://example.com',
  NOW(),
  'test-source',
  'test-guid-123'
);

-- Query the test article
SELECT * FROM news_articles WHERE source = 'test-source';

-- Clean up
DELETE FROM news_articles WHERE source = 'test-source';
```
