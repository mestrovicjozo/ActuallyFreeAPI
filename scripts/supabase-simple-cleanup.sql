-- Simple cleanup and update script
-- Run this in Supabase SQL Editor

-- ============================================================================
-- STEP 1: Delete articles older than October 19, 2024
-- ============================================================================

DELETE FROM news_articles
WHERE pub_date < '2024-10-19 00:00:00+00'::TIMESTAMP WITH TIME ZONE;

-- Show result
SELECT 'Cleanup complete' as status, COUNT(*) as remaining_articles FROM news_articles;

-- ============================================================================
-- STEP 2: Reset all tickers to NULL (fresh start)
-- ============================================================================

UPDATE news_articles SET tickers = NULL;

SELECT 'Tickers reset' as status, COUNT(*) as articles_with_null_tickers
FROM news_articles WHERE tickers IS NULL;

-- ============================================================================
-- STEP 3: Extract and update tickers for all articles
-- ============================================================================

-- This will find explicit ticker mentions like $AAPL, (NASDAQ:TSLA), NYSE:MSFT
UPDATE news_articles
SET tickers = (
  SELECT ARRAY_AGG(DISTINCT ticker ORDER BY ticker)
  FROM (
    -- Pattern 1: $AAPL format
    SELECT upper(match[1]) as ticker
    FROM regexp_matches(
      title || ' ' || COALESCE(description, '') || ' ' || COALESCE(content, ''),
      '\$([A-Z]{1,5})\b',
      'g'
    ) AS match
    WHERE upper(match[1]) IN (
      'AAPL', 'MSFT', 'GOOGL', 'GOOG', 'AMZN', 'META', 'TSLA', 'NVDA', 'NFLX', 'INTC',
      'AMD', 'ADBE', 'CSCO', 'AVGO', 'ORCL', 'CRM', 'QCOM', 'TXN', 'IBM',
      'JPM', 'BAC', 'WFC', 'GS', 'MS', 'C', 'AXP', 'V', 'MA', 'PYPL',
      'JNJ', 'UNH', 'PFE', 'ABBV', 'TMO', 'MRK', 'ABT', 'LLY', 'AMGN', 'GILD',
      'WMT', 'HD', 'PG', 'KO', 'PEP', 'COST', 'NKE', 'MCD', 'DIS', 'SBUX',
      'BA', 'CAT', 'HON', 'MMM', 'GE', 'UPS', 'LMT',
      'XOM', 'CVX', 'COP', 'SLB',
      'VZ', 'T', 'CMCSA', 'TMUS',
      'EBAY', 'BKNG', 'ABNB',
      'TSM', 'AMAT', 'LRCX', 'KLAC', 'MU',
      'NOW', 'INTU', 'SNOW', 'PANW', 'CRWD',
      'F', 'GM', 'RIVN',
      'SPOT', 'UBER', 'LYFT', 'ZM', 'DOCU',
      'COIN', 'MSTR', 'MARA', 'RIOT',
      'SNAP', 'PINS', 'RDDT',
      'PLUG', 'FCEL', 'ENPH', 'BLNK', 'CHPT'
    )

    UNION

    -- Pattern 2: (AAPL) or (NASDAQ:AAPL) format
    SELECT upper(match[1]) as ticker
    FROM regexp_matches(
      title || ' ' || COALESCE(description, '') || ' ' || COALESCE(content, ''),
      '\((?:(?:NYSE|NASDAQ|AMEX):\s*)?([A-Z]{1,5})\)',
      'g'
    ) AS match
    WHERE upper(match[1]) IN (
      'AAPL', 'MSFT', 'GOOGL', 'GOOG', 'AMZN', 'META', 'TSLA', 'NVDA', 'NFLX', 'INTC',
      'AMD', 'ADBE', 'CSCO', 'AVGO', 'ORCL', 'CRM', 'QCOM', 'TXN', 'IBM',
      'JPM', 'BAC', 'WFC', 'GS', 'MS', 'C', 'AXP', 'V', 'MA', 'PYPL',
      'JNJ', 'UNH', 'PFE', 'ABBV', 'TMO', 'MRK', 'ABT', 'LLY', 'AMGN', 'GILD',
      'WMT', 'HD', 'PG', 'KO', 'PEP', 'COST', 'NKE', 'MCD', 'DIS', 'SBUX',
      'BA', 'CAT', 'HON', 'MMM', 'GE', 'UPS', 'LMT',
      'XOM', 'CVX', 'COP', 'SLB',
      'VZ', 'T', 'CMCSA', 'TMUS',
      'EBAY', 'BKNG', 'ABNB',
      'TSM', 'AMAT', 'LRCX', 'KLAC', 'MU',
      'NOW', 'INTU', 'SNOW', 'PANW', 'CRWD',
      'F', 'GM', 'RIVN',
      'SPOT', 'UBER', 'LYFT', 'ZM', 'DOCU',
      'COIN', 'MSTR', 'MARA', 'RIOT',
      'SNAP', 'PINS', 'RDDT',
      'PLUG', 'FCEL', 'ENPH', 'BLNK', 'CHPT'
    )

    UNION

    -- Pattern 3: NYSE:AAPL or NASDAQ:TSLA format
    SELECT upper(match[1]) as ticker
    FROM regexp_matches(
      title || ' ' || COALESCE(description, '') || ' ' || COALESCE(content, ''),
      '\b(?:NYSE|NASDAQ|AMEX):\s*([A-Z]{1,5})\b',
      'g'
    ) AS match
    WHERE upper(match[1]) IN (
      'AAPL', 'MSFT', 'GOOGL', 'GOOG', 'AMZN', 'META', 'TSLA', 'NVDA', 'NFLX', 'INTC',
      'AMD', 'ADBE', 'CSCO', 'AVGO', 'ORCL', 'CRM', 'QCOM', 'TXN', 'IBM',
      'JPM', 'BAC', 'WFC', 'GS', 'MS', 'C', 'AXP', 'V', 'MA', 'PYPL',
      'JNJ', 'UNH', 'PFE', 'ABBV', 'TMO', 'MRK', 'ABT', 'LLY', 'AMGN', 'GILD',
      'WMT', 'HD', 'PG', 'KO', 'PEP', 'COST', 'NKE', 'MCD', 'DIS', 'SBUX',
      'BA', 'CAT', 'HON', 'MMM', 'GE', 'UPS', 'LMT',
      'XOM', 'CVX', 'COP', 'SLB',
      'VZ', 'T', 'CMCSA', 'TMUS',
      'EBAY', 'BKNG', 'ABNB',
      'TSM', 'AMAT', 'LRCX', 'KLAC', 'MU',
      'NOW', 'INTU', 'SNOW', 'PANW', 'CRWD',
      'F', 'GM', 'RIVN',
      'SPOT', 'UBER', 'LYFT', 'ZM', 'DOCU',
      'COIN', 'MSTR', 'MARA', 'RIOT',
      'SNAP', 'PINS', 'RDDT',
      'PLUG', 'FCEL', 'ENPH', 'BLNK', 'CHPT'
    )
  ) t
)
WHERE id IS NOT NULL;

-- ============================================================================
-- Summary
-- ============================================================================

SELECT
  'Summary' as report,
  COUNT(*) as total_articles,
  COUNT(tickers) as articles_with_tickers,
  COUNT(*) - COUNT(tickers) as articles_without_tickers,
  COALESCE(SUM(array_length(tickers, 1)), 0) as total_ticker_mentions
FROM news_articles;

-- Show some examples
SELECT
  pub_date,
  LEFT(title, 60) as title_preview,
  tickers
FROM news_articles
WHERE tickers IS NOT NULL
ORDER BY pub_date DESC
LIMIT 10;
