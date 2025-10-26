-- Step-by-step diagnostic and cleanup script
-- Run each section separately to see what's happening

-- ============================================================================
-- STEP 1: Check current state
-- ============================================================================

-- Check date range of articles
SELECT
  'Date Range' as check_type,
  MIN(pub_date) as oldest_article,
  MAX(pub_date) as newest_article,
  COUNT(*) as total_articles
FROM news_articles;

-- Check ticker distribution
SELECT
  'Ticker Stats' as check_type,
  COUNT(*) as total_articles,
  COUNT(tickers) as articles_with_tickers,
  COUNT(*) - COUNT(tickers) as articles_without_tickers
FROM news_articles;

-- Check some sample articles
SELECT
  pub_date,
  LEFT(title, 80) as title_preview,
  tickers
FROM news_articles
ORDER BY pub_date DESC
LIMIT 10;

-- ============================================================================
-- STEP 2: Delete old articles (run this separately after checking above)
-- ============================================================================

-- Uncomment to run the deletion:
/*
DELETE FROM news_articles
WHERE pub_date < '2024-10-19 00:00:00+00'::TIMESTAMP WITH TIME ZONE;
*/

-- Check how many would be deleted without actually deleting:
SELECT
  'Articles to delete' as info,
  COUNT(*) as count
FROM news_articles
WHERE pub_date < '2024-10-19 00:00:00+00'::TIMESTAMP WITH TIME ZONE;

-- ============================================================================
-- STEP 3: Sample ticker extraction test
-- ============================================================================

-- Test the extraction on a few articles to see if it works
SELECT
  LEFT(title, 80) as title,
  tickers as old_tickers,
  (
    SELECT ARRAY_AGG(DISTINCT ticker)
    FROM (
      SELECT upper(match[1]) as ticker
      FROM regexp_matches(title || ' ' || COALESCE(description, '') || ' ' || COALESCE(content, ''), '\$([A-Z]{1,5})\b', 'g') AS match
      WHERE upper(match[1]) IN ('AAPL', 'MSFT', 'GOOGL', 'GOOG', 'AMZN', 'META', 'TSLA', 'NVDA')
      UNION
      SELECT upper(match[1]) as ticker
      FROM regexp_matches(title || ' ' || COALESCE(description, '') || ' ' || COALESCE(content, ''), '\((?:(?:NYSE|NASDAQ|AMEX):\s*)?([A-Z]{1,5})\)', 'g') AS match
      WHERE upper(match[1]) IN ('AAPL', 'MSFT', 'GOOGL', 'GOOG', 'AMZN', 'META', 'TSLA', 'NVDA')
      UNION
      SELECT upper(match[1]) as ticker
      FROM regexp_matches(title || ' ' || COALESCE(description, '') || ' ' || COALESCE(content, ''), '\b(?:NYSE|NASDAQ|AMEX):\s*([A-Z]{1,5})\b', 'g') AS match
      WHERE upper(match[1]) IN ('AAPL', 'MSFT', 'GOOGL', 'GOOG', 'AMZN', 'META', 'TSLA', 'NVDA')
    ) t
  ) as extracted_tickers
FROM news_articles
WHERE pub_date >= '2024-10-19 00:00:00+00'::TIMESTAMP WITH TIME ZONE
ORDER BY pub_date DESC
LIMIT 20;
