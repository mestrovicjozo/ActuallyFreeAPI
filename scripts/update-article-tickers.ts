/**
 * Migration script to re-extract tickers for all existing articles
 * using the improved context-aware extraction logic
 *
 * Run with: npx tsx scripts/update-article-tickers.ts
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Now import after env is loaded
import { createClient } from '@supabase/supabase-js';
import { extractTickersFromArticle } from '../lib/extractTickers';

// Create Supabase client with loaded env variables
// Use SERVICE ROLE key for admin operations (bypasses RLS)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.service_role || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  console.error('   Required: NEXT_PUBLIC_SUPABASE_URL and service_role (or SUPABASE_SERVICE_ROLE_KEY)');
  console.error('   Get your service role key from: Supabase Dashboard → Settings → API');
  process.exit(1);
}

console.log('✅ Using Supabase service role key for admin operations\n');
const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface Article {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  tickers: string[] | null;
}

async function updateArticleTickers() {
  console.log('🚀 Starting ticker extraction update for all articles...\n');

  // First, delete articles older than October 19, 2024
  console.log('🗑️  Deleting articles older than October 19, 2024...');
  const cutoffDate = new Date('2024-10-19T00:00:00Z');

  const { error: deleteError, count: deletedCount } = await supabase
    .from('news_articles')
    .delete({ count: 'exact' })
    .lt('pub_date', cutoffDate.toISOString());

  if (deleteError) {
    console.error('❌ Error deleting old articles:', deleteError);
  } else {
    console.log(`✅ Deleted ${deletedCount || 0} old articles\n`);
  }

  let totalArticles = 0;
  let updatedArticles = 0;
  let unchangedArticles = 0;
  let articlesWithTickers = 0;
  let errorCount = 0;
  let page = 0;
  const pageSize = 100;

  try {
    // Process articles in batches
    while (true) {
      console.log(`\n📦 Fetching batch ${page + 1} (${page * pageSize} - ${(page + 1) * pageSize})...`);

      const { data: articles, error } = await supabase
        .from('news_articles')
        .select('id, title, description, content, tickers, pub_date')
        .range(page * pageSize, (page + 1) * pageSize - 1)
        .order('pub_date', { ascending: false });

      if (error) {
        console.error('❌ Error fetching articles:', error);
        break;
      }

      if (!articles || articles.length === 0) {
        console.log('\n✅ No more articles to process');
        break;
      }

      console.log(`   Found ${articles.length} articles in this batch`);
      totalArticles += articles.length;

      // Process each article
      for (const article of articles) {
        try {
          // Extract tickers using the improved logic
          const newTickers = extractTickersFromArticle(
            article.title,
            article.description,
            article.content
          );

          // Compare with existing tickers
          const oldTickers = article.tickers || [];
          const oldSet = new Set(oldTickers);
          const newSet = new Set(newTickers);

          const hasChanged =
            oldSet.size !== newSet.size ||
            ![...oldSet].every(ticker => newSet.has(ticker));

          if (hasChanged) {
            // Update the article
            const { error: updateError } = await supabase
              .from('news_articles')
              .update({ tickers: newTickers.length > 0 ? newTickers : null })
              .eq('id', article.id);

            if (updateError) {
              console.error(`   ❌ Error updating article ${article.id}:`, updateError);
              errorCount++;
            } else {
              updatedArticles++;
              if (newTickers.length > 0) {
                articlesWithTickers++;
                console.log(`   ✓ Updated: "${article.title.substring(0, 60)}..."`);
                console.log(`     Old: [${oldTickers.join(', ')}]`);
                console.log(`     New: [${newTickers.join(', ')}]`);
              }
            }
          } else {
            unchangedArticles++;
            if (newTickers.length > 0) {
              articlesWithTickers++;
            }
          }
        } catch (error) {
          console.error(`   ❌ Error processing article ${article.id}:`, error);
          errorCount++;
        }
      }

      console.log(`   Progress: ${updatedArticles} updated, ${unchangedArticles} unchanged, ${errorCount} errors`);

      page++;

      // Small delay to avoid overwhelming the database
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 Summary');
    console.log('='.repeat(60));
    console.log(`Total articles processed: ${totalArticles}`);
    console.log(`Articles updated: ${updatedArticles}`);
    console.log(`Articles unchanged: ${unchangedArticles}`);
    console.log(`Articles with tickers: ${articlesWithTickers}`);
    console.log(`Articles without tickers: ${totalArticles - articlesWithTickers}`);
    console.log(`Errors: ${errorCount}`);
    console.log('='.repeat(60));

    if (updatedArticles > 0) {
      console.log('\n✨ Ticker extraction update completed successfully!');
    } else {
      console.log('\n✅ All articles already have up-to-date ticker extraction');
    }

  } catch (error) {
    console.error('\n💥 Fatal error:', error);
    process.exit(1);
  }
}

// Run the migration
updateArticleTickers()
  .then(() => {
    console.log('\n👋 Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Unhandled error:', error);
    process.exit(1);
  });
