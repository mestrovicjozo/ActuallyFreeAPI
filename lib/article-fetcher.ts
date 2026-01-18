/**
 * Full article content extraction using Mozilla Readability
 * Same technology as Firefox Reader View - completely free
 */

import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';

export interface ArticleContent {
  title: string | null;
  content: string | null;
  textContent: string | null;
  excerpt: string | null;
  byline: string | null;
  siteName: string | null;
  success: boolean;
  error?: string;
}

// Rate limiting configuration
const FETCH_DELAY_MS = 1500; // 1.5 seconds between fetches
let lastFetchTime = 0;

/**
 * Fetches and extracts clean article content from a URL
 * Uses Mozilla Readability for content extraction
 */
export async function fetchArticleContent(url: string): Promise<ArticleContent> {
  // Rate limiting
  const now = Date.now();
  const timeSinceLastFetch = now - lastFetchTime;
  if (timeSinceLastFetch < FETCH_DELAY_MS) {
    await new Promise(resolve => setTimeout(resolve, FETCH_DELAY_MS - timeSinceLastFetch));
  }
  lastFetchTime = Date.now();

  try {
    // Validate URL
    const parsedUrl = new URL(url);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return {
        title: null,
        content: null,
        textContent: null,
        excerpt: null,
        byline: null,
        siteName: null,
        success: false,
        error: 'Invalid URL protocol',
      };
    }

    // Fetch the article HTML
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; FinancialNewsBot/1.0; +https://actually-free-api.vercel.app)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      return {
        title: null,
        content: null,
        textContent: null,
        excerpt: null,
        byline: null,
        siteName: null,
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const html = await response.text();

    // Parse HTML with JSDOM
    const dom = new JSDOM(html, { url });
    const document = dom.window.document;

    // Extract content with Readability
    const reader = new Readability(document);
    const article = reader.parse();

    if (!article) {
      return {
        title: null,
        content: null,
        textContent: null,
        excerpt: null,
        byline: null,
        siteName: null,
        success: false,
        error: 'Readability could not parse article',
      };
    }

    return {
      title: article.title ?? null,
      content: article.content ?? null,
      textContent: article.textContent ?? null,
      excerpt: article.excerpt ?? null,
      byline: article.byline ?? null,
      siteName: article.siteName ?? null,
      success: true,
    };
  } catch (error) {
    return {
      title: null,
      content: null,
      textContent: null,
      excerpt: null,
      byline: null,
      siteName: null,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Batch fetch multiple articles with rate limiting
 * Processes articles sequentially to respect rate limits
 */
export async function fetchMultipleArticles(
  urls: string[],
  maxArticles: number = 10
): Promise<Map<string, ArticleContent>> {
  const results = new Map<string, ArticleContent>();
  const urlsToFetch = urls.slice(0, maxArticles);

  for (const url of urlsToFetch) {
    const content = await fetchArticleContent(url);
    results.set(url, content);
  }

  return results;
}

/**
 * Extracts just the text content from an article URL
 * Returns null if extraction fails
 */
export async function getArticleText(url: string): Promise<string | null> {
  const content = await fetchArticleContent(url);
  return content.success ? content.textContent : null;
}
