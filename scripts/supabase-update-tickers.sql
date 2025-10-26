-- Migration script to update tickers on all articles in Supabase
-- This uses a PostgreSQL function to re-extract tickers from article text
--
-- STEP 1: Delete articles older than October 19, 2024
-- STEP 2: Create a function to extract tickers (simplified version for SQL)
-- STEP 3: Update all articles with new ticker extraction
--
-- Run this in Supabase SQL Editor

BEGIN;

-- ============================================================================
-- STEP 1: Clean up old articles (before October 19, 2024)
-- ============================================================================

DO $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM news_articles
  WHERE pub_date < '2024-10-19T00:00:00Z';

  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RAISE NOTICE '🗑️  Deleted % articles older than October 19, 2024', deleted_count;
END $$;

-- ============================================================================
-- STEP 2: Create ticker extraction function
-- ============================================================================
-- This is a simplified version that extracts tickers from explicit mentions
-- The full context-aware extraction will happen on future articles via the API

CREATE OR REPLACE FUNCTION extract_tickers_simple(text_content TEXT)
RETURNS TEXT[] AS $$
DECLARE
  tickers TEXT[] := ARRAY[]::TEXT[];
  ticker TEXT;
BEGIN
  IF text_content IS NULL THEN
    RETURN tickers;
  END IF;

  -- Extract tickers in format: $AAPL, $TSLA, etc.
  FOR ticker IN
    SELECT DISTINCT upper(match[1])
    FROM regexp_matches(text_content, '\$([A-Z]{1,5})\b', 'g') AS match
  LOOP
    -- Only add if it's a valid tracked ticker
    IF ticker IN (
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
    ) THEN
      tickers := array_append(tickers, ticker);
    END IF;
  END LOOP;

  -- Extract tickers in format: (AAPL), (NASDAQ:AAPL)
  FOR ticker IN
    SELECT DISTINCT upper(match[1])
    FROM regexp_matches(text_content, '\((?:(?:NYSE|NASDAQ|AMEX):\s*)?([A-Z]{1,5})\)', 'g') AS match
  LOOP
    IF ticker IN (
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
    ) AND NOT (ticker = ANY(tickers)) THEN
      tickers := array_append(tickers, ticker);
    END IF;
  END LOOP;

  -- Extract tickers in format: NASDAQ:AAPL, NYSE:TSLA
  FOR ticker IN
    SELECT DISTINCT upper(match[1])
    FROM regexp_matches(text_content, '\b(?:NYSE|NASDAQ|AMEX):\s*([A-Z]{1,5})\b', 'g') AS match
  LOOP
    IF ticker IN (
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
    ) AND NOT (ticker = ANY(tickers)) THEN
      tickers := array_append(tickers, ticker);
    END IF;
  END LOOP;

  -- Sort and return unique tickers
  SELECT ARRAY_AGG(DISTINCT t ORDER BY t) INTO tickers FROM unnest(tickers) t;

  RETURN tickers;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Notification after function creation
DO $$
BEGIN
  RAISE NOTICE '✅ Created ticker extraction function';
END $$;

-- ============================================================================
-- STEP 3: Update all articles with extracted tickers
-- ============================================================================

DO $$
DECLARE
  updated_count INTEGER := 0;
  total_count INTEGER;
  article RECORD;
  new_tickers TEXT[];
  combined_text TEXT;
BEGIN
  -- Get total count
  SELECT COUNT(*) INTO total_count FROM news_articles;
  RAISE NOTICE '📊 Processing % articles...', total_count;

  -- Update articles in batches
  FOR article IN
    SELECT id, title, description, content
    FROM news_articles
    ORDER BY created_at DESC
  LOOP
    -- Combine all text fields
    combined_text := COALESCE(article.title, '') || ' ' ||
                    COALESCE(article.description, '') || ' ' ||
                    COALESCE(article.content, '');

    -- Extract tickers
    new_tickers := extract_tickers_simple(combined_text);

    -- Update the article
    UPDATE news_articles
    SET tickers = CASE WHEN array_length(new_tickers, 1) > 0 THEN new_tickers ELSE NULL END
    WHERE id = article.id;

    updated_count := updated_count + 1;

    -- Log progress every 100 articles
    IF updated_count % 100 = 0 THEN
      RAISE NOTICE '   Progress: % / % articles processed', updated_count, total_count;
    END IF;
  END LOOP;

  RAISE NOTICE '✅ Updated % articles with new ticker extraction', updated_count;
END $$;

-- ============================================================================
-- Summary
-- ============================================================================

DO $$
DECLARE
  total_articles INTEGER;
  articles_with_tickers INTEGER;
  total_ticker_mentions INTEGER;
BEGIN
  SELECT COUNT(*) INTO total_articles FROM news_articles;
  SELECT COUNT(*) INTO articles_with_tickers FROM news_articles WHERE tickers IS NOT NULL AND array_length(tickers, 1) > 0;
  SELECT SUM(array_length(tickers, 1)) INTO total_ticker_mentions FROM news_articles WHERE tickers IS NOT NULL;

  RAISE NOTICE '';
  RAISE NOTICE '========================================';
  RAISE NOTICE '📊 Summary';
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Total articles: %', total_articles;
  RAISE NOTICE 'Articles with tickers: %', articles_with_tickers;
  RAISE NOTICE 'Total ticker mentions: %', COALESCE(total_ticker_mentions, 0);
  RAISE NOTICE '========================================';
END $$;

COMMIT;

-- ============================================================================
-- Cleanup: Drop the temporary function (optional)
-- ============================================================================
-- Uncomment the line below if you want to remove the function after migration
-- DROP FUNCTION IF EXISTS extract_tickers_simple(TEXT);
