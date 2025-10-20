-- Migration: Add tickers field to news_articles table
-- Run this on existing Supabase databases to add ticker support

-- Add tickers column (TEXT[] for array of ticker symbols)
ALTER TABLE news_articles
ADD COLUMN IF NOT EXISTS tickers TEXT[];

-- Create GIN index for efficient array searching
CREATE INDEX IF NOT EXISTS idx_news_articles_tickers ON news_articles
USING GIN (tickers);

-- Note: After running this migration, you should:
-- 1. Deploy the updated cron job to start extracting tickers
-- 2. Optionally backfill tickers for existing articles by re-running the cron job
