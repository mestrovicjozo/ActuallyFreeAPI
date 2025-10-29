-- Migration: Add source field to stock_prices table
-- This allows tracking which API provided each data point

-- Add source column (nullable for existing records)
ALTER TABLE stock_prices
ADD COLUMN IF NOT EXISTS source TEXT;

-- Add index for filtering by source
CREATE INDEX IF NOT EXISTS idx_stock_prices_source
ON stock_prices(source);

-- Add composite index for ticker + source queries
CREATE INDEX IF NOT EXISTS idx_stock_prices_ticker_source
ON stock_prices(ticker, source);

-- Update existing records to have 'finnhub' as source
UPDATE stock_prices
SET source = 'finnhub'
WHERE source IS NULL;

-- Optional: Add comment explaining the field
COMMENT ON COLUMN stock_prices.source IS 'API source that provided this data point (finnhub, alphavantage, marketstack, polygon, or averaged)';
