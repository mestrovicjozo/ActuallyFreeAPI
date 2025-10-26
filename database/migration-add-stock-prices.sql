-- Migration: Add stock_prices table
-- Run this in Supabase SQL Editor if you already have news_articles table

-- ============================================================================
-- STOCK PRICES TABLE
-- ============================================================================

-- Create stock_prices table
CREATE TABLE IF NOT EXISTS stock_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticker TEXT NOT NULL,
  company_name TEXT NOT NULL,
  price DECIMAL(12, 4) NOT NULL,
  change DECIMAL(12, 4),
  change_percent DECIMAL(8, 4),
  volume BIGINT,
  market_cap BIGINT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_stock_prices_ticker ON stock_prices(ticker);
CREATE INDEX IF NOT EXISTS idx_stock_prices_timestamp ON stock_prices(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_stock_prices_ticker_timestamp ON stock_prices(ticker, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_stock_prices_created_at ON stock_prices(created_at DESC);

-- Function to automatically delete stock prices older than 90 days
CREATE OR REPLACE FUNCTION delete_old_stock_prices()
RETURNS void AS $$
BEGIN
  DELETE FROM stock_prices
  WHERE timestamp < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security (RLS)
ALTER TABLE stock_prices ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows read access to everyone
DROP POLICY IF EXISTS "Allow public read access" ON stock_prices;
CREATE POLICY "Allow public read access" ON stock_prices
  FOR SELECT
  USING (true);

-- Create a policy that allows insert for service role
DROP POLICY IF EXISTS "Allow insert for service role" ON stock_prices;
CREATE POLICY "Allow insert for service role" ON stock_prices
  FOR INSERT
  WITH CHECK (true);

-- Summary
DO $$
BEGIN
  RAISE NOTICE '✅ Stock prices table created successfully!';
  RAISE NOTICE '📊 Table includes: ticker, company_name, price, change, change_percent, volume, market_cap';
  RAISE NOTICE '🔍 Indexes created for optimal query performance';
  RAISE NOTICE '🔒 RLS policies enabled for public read access';
END $$;
