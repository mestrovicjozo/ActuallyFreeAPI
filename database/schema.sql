-- Create news_articles table
CREATE TABLE IF NOT EXISTS news_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  link TEXT NOT NULL,
  pub_date TIMESTAMP WITH TIME ZONE NOT NULL,
  source TEXT NOT NULL,
  guid TEXT NOT NULL UNIQUE,
  content TEXT,
  tickers TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_news_articles_pub_date ON news_articles(pub_date DESC);
CREATE INDEX IF NOT EXISTS idx_news_articles_source ON news_articles(source);
CREATE INDEX IF NOT EXISTS idx_news_articles_created_at ON news_articles(created_at DESC);

-- Create a GIN index for full-text search on title and description
CREATE INDEX IF NOT EXISTS idx_news_articles_search ON news_articles
USING GIN (to_tsvector('english', title || ' ' || COALESCE(description, '')));

-- Create a GIN index for ticker array searches
CREATE INDEX IF NOT EXISTS idx_news_articles_tickers ON news_articles
USING GIN (tickers);

-- Function to automatically delete articles older than 30 days
CREATE OR REPLACE FUNCTION delete_old_articles()
RETURNS void AS $$
BEGIN
  DELETE FROM news_articles
  WHERE pub_date < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- Optional: Create a scheduled job (if you want automatic cleanup)
-- Note: You'll need to enable pg_cron extension in Supabase for this to work
-- SELECT cron.schedule('delete-old-articles', '0 2 * * *', 'SELECT delete_old_articles()');

-- Enable Row Level Security (RLS)
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows read access to everyone
CREATE POLICY "Allow public read access" ON news_articles
  FOR SELECT
  USING (true);

-- Create a policy that allows insert for authenticated requests (for the cron job)
-- We'll use service role key for inserts, so this is mainly for documentation
CREATE POLICY "Allow insert for service role" ON news_articles
  FOR INSERT
  WITH CHECK (true);

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
CREATE POLICY "Allow public read access" ON stock_prices
  FOR SELECT
  USING (true);

-- Create a policy that allows insert for service role
CREATE POLICY "Allow insert for service role" ON stock_prices
  FOR INSERT
  WITH CHECK (true);
