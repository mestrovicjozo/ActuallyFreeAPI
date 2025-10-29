/**
 * Export 100 articles without tickers to a markdown file for review
 * Run with: npx tsx scripts/export-articles-without-tickers.ts
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.service_role || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function exportArticlesWithoutTickers() {
  console.log('📥 Fetching 100 articles without tickers...\n');

  const { data, error } = await supabase
    .from('news_articles')
    .select('title, description, pub_date, source, link, content')
    .is('tickers', null)
    .order('pub_date', { ascending: false })
    .limit(100);

  if (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }

  console.log(`✅ Found ${data?.length || 0} articles\n`);

  let markdown = '# Articles Without Tickers - Sample of 100\n\n';
  markdown += 'Review these articles to verify if they should have ticker labels.\n\n';
  markdown += `Generated: ${new Date().toLocaleString()}\n\n`;
  markdown += '---\n\n';

  data?.forEach((article, index) => {
    markdown += `## ${index + 1}. ${article.title}\n\n`;
    markdown += `**Source:** ${article.source}\n`;
    markdown += `**Date:** ${new Date(article.pub_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}\n`;

    if (article.description) {
      markdown += `**Description:** ${article.description}\n`;
    }

    markdown += `**Link:** ${article.link}\n\n`;

    // Add a snippet of content if available
    if (article.content) {
      const snippet = article.content.substring(0, 200).trim();
      markdown += `**Content Preview:** ${snippet}${article.content.length > 200 ? '...' : ''}\n\n`;
    }

    markdown += '---\n\n';
  });

  const outputPath = path.resolve(process.cwd(), 'articles-without-tickers.md');
  fs.writeFileSync(outputPath, markdown);

  console.log(`✅ Created: ${outputPath}`);
  console.log(`📄 Total articles exported: ${data?.length || 0}`);
}

exportArticlesWithoutTickers()
  .then(() => {
    console.log('\n👋 Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Error:', error);
    process.exit(1);
  });
