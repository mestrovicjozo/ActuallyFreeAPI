/**
 * Quick diagnostic script to check what's actually in the database
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
  console.log('🔍 Checking database state...\n');

  // Check total articles
  const { count: totalCount, error: countError } = await supabase
    .from('news_articles')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('❌ Error counting articles:', countError);
    return;
  }

  console.log(`📊 Total articles in database: ${totalCount}`);

  // Check articles with tickers
  const { count: withTickersCount, error: tickerCountError } = await supabase
    .from('news_articles')
    .select('*', { count: 'exact', head: true })
    .not('tickers', 'is', null);

  if (tickerCountError) {
    console.error('❌ Error counting articles with tickers:', tickerCountError);
    return;
  }

  console.log(`📌 Articles with tickers: ${withTickersCount}`);
  console.log(`📭 Articles without tickers: ${(totalCount || 0) - (withTickersCount || 0)}\n`);

  // Fetch a few sample articles with tickers
  console.log('📄 Sample articles WITH tickers:');
  const { data: withTickersSamples, error: samplesError } = await supabase
    .from('news_articles')
    .select('id, title, tickers, pub_date')
    .not('tickers', 'is', null)
    .order('pub_date', { ascending: false })
    .limit(5);

  if (samplesError) {
    console.error('❌ Error fetching samples:', samplesError);
  } else if (withTickersSamples && withTickersSamples.length > 0) {
    withTickersSamples.forEach((article, i) => {
      console.log(`\n${i + 1}. ${article.title.substring(0, 70)}...`);
      console.log(`   Tickers: [${(article.tickers || []).join(', ')}]`);
      console.log(`   ID: ${article.id}`);
    });
  } else {
    console.log('   No articles with tickers found! 😱');
  }

  // Check a few random articles to see their state
  console.log('\n\n📄 Sample random articles (checking actual state):');
  const { data: randomSamples, error: randomError } = await supabase
    .from('news_articles')
    .select('id, title, tickers, pub_date')
    .order('pub_date', { ascending: false })
    .limit(10);

  if (randomError) {
    console.error('❌ Error fetching random samples:', randomError);
  } else if (randomSamples) {
    randomSamples.forEach((article, i) => {
      console.log(`\n${i + 1}. ${article.title.substring(0, 70)}...`);
      console.log(`   Tickers: ${article.tickers ? `[${article.tickers.join(', ')}]` : 'NULL'}`);
      console.log(`   Date: ${article.pub_date}`);
    });
  }

  // Check date range
  console.log('\n\n📅 Date range of articles:');
  const { data: dateRange, error: dateError } = await supabase
    .from('news_articles')
    .select('pub_date')
    .order('pub_date', { ascending: true })
    .limit(1);

  if (!dateError && dateRange && dateRange.length > 0) {
    console.log(`   Oldest: ${dateRange[0].pub_date}`);
  }

  const { data: dateRangeNew, error: dateErrorNew } = await supabase
    .from('news_articles')
    .select('pub_date')
    .order('pub_date', { ascending: false })
    .limit(1);

  if (!dateErrorNew && dateRangeNew && dateRangeNew.length > 0) {
    console.log(`   Newest: ${dateRangeNew[0].pub_date}`);
  }
}

checkDatabase()
  .then(() => {
    console.log('\n✅ Database check complete');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Error:', error);
    process.exit(1);
  });
