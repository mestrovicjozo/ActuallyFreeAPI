'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const rssFeedsByCategory = {
  general: [
    { name: 'Reuters World News', description: 'Reuters world and business news' },
    { name: 'Yahoo Finance', description: 'Yahoo Finance latest news' },
    { name: 'MarketWatch', description: 'MarketWatch top financial stories' },
    { name: 'CNBC Top News', description: 'CNBC top business news' },
    { name: 'Benzinga', description: 'Fast-breaking financial news' },
  ],
  markets: [
    { name: 'Bloomberg Markets', description: 'Bloomberg market updates' },
    { name: 'CNBC Markets', description: 'CNBC market news and analysis' },
    { name: 'WSJ Markets', description: 'Wall Street Journal market news' },
    { name: 'FT Markets', description: 'Financial Times market coverage' },
    { name: 'Seeking Alpha', description: 'Breaking market news and analysis' },
    { name: 'Business Insider', description: 'Business Insider market news' },
    { name: 'Google News', description: 'Aggregated stock market news' },
    { name: 'Yahoo Finance Top', description: 'Top financial stories' },
  ],
  technology: [
    { name: 'Bloomberg Technology', description: 'Tech and innovation news' },
    { name: 'Forbes Innovation', description: 'Forbes innovation and technology' },
  ],
  business: [
    { name: 'WSJ Business', description: 'WSJ business coverage' },
    { name: 'Forbes Business', description: 'Forbes business news' },
  ],
  investing: [
    { name: 'CNBC Investing', description: 'Investment news and strategies' },
    { name: 'Motley Fool', description: 'Investment advice and stock picks' },
  ],
  stocks: [
    { name: 'Seeking Alpha Ideas', description: 'Top stock ideas and analysis' },
    { name: 'IBD Stock Market', description: 'Stock market news and tips' },
  ],
  other: [
    { name: 'The Economist', description: 'Economic and financial analysis' },
    { name: 'Investopedia', description: 'Financial education and news' },
    { name: 'SEC EDGAR', description: 'SEC material event filings' },
  ],
};

const categoryLabels: Record<string, string> = {
  general: 'General',
  markets: 'Markets',
  technology: 'Technology',
  business: 'Business',
  investing: 'Investing',
  stocks: 'Stocks',
  other: 'Specialized',
};

const categoryDotColors: Record<string, string> = {
  general: 'bg-blue-400',
  markets: 'bg-cyan-400',
  technology: 'bg-emerald-400',
  business: 'bg-amber-400',
  investing: 'bg-rose-400',
  stocks: 'bg-violet-400',
  other: 'bg-zinc-400',
};

export default function Home() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [articleCount, setArticleCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://actually-free-api.vercel.app/api/stats')
      .then(res => res.json())
      .then(data => {
        setArticleCount(data.totalArticles);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const totalFeeds = Object.values(rssFeedsByCategory).reduce((acc, feeds) => acc + feeds.length, 0);

  const exampleResponse = {
    data: [
      {
        id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        title: "Apple (AAPL) and Microsoft ($MSFT) Lead Tech Rally",
        description: "Major technology stocks saw significant gains today...",
        link: "https://example.com/article/tech-rally",
        pub_date: "2025-01-20T14:30:00Z",
        source: "Reuters",
        tickers: ["AAPL", "MSFT"],
      }
    ],
    pagination: { page: 1, limit: 20, total: 1547, totalPages: 78 }
  };

  const examples = [
    {
      title: 'Get Latest News',
      description: 'Fetch the most recent articles',
      code: 'curl https://actually-free-api.vercel.app/api/news'
    },
    {
      title: 'Filter by Ticker',
      description: 'Get articles about specific stocks',
      code: 'curl https://actually-free-api.vercel.app/api/news?ticker=AAPL'
    },
    {
      title: 'Search Keywords',
      description: 'Find articles containing text',
      code: 'curl https://actually-free-api.vercel.app/api/news?search=earnings'
    },
    {
      title: 'Filter by Date',
      description: 'Get articles within a date range',
      code: 'curl "https://actually-free-api.vercel.app/api/news?startDate=2025-01-01"'
    }
  ];

  const endpoints = [
    { path: '/api/news', description: 'Fetch news articles with filtering, search, ticker symbols, and pagination' },
    { path: '/api/sources', description: 'List all RSS feed sources organized by category' },
    { path: '/api/stats', description: 'Get API statistics including article counts and database info' },
  ];

  const features = [
    {
      title: 'No Authentication',
      description: 'Start immediately. No API keys, no signup, no billing.',
      icon: (
        <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: '24+ RSS Feeds',
      description: 'Reuters, Bloomberg, CNBC, WSJ, and 20+ premium sources.',
      icon: (
        <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      ),
    },
    {
      title: 'Ticker Extraction',
      description: 'Automatic NLP-powered stock symbol detection on every article.',
      icon: (
        <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
    },
    {
      title: '30-Day Archive',
      description: 'Access historical financial news data with date range queries.',
      icon: (
        <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
            </span>
            <span className="text-xs text-zinc-400 font-medium font-body">Live &middot; Always Free</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
          >
            <span className="text-zinc-100">Financial News API.</span>
            <br />
            <span className="relative">
              <span className="absolute -inset-x-6 -inset-y-2 bg-brand/5 blur-2xl rounded-full pointer-events-none" />
              <span className="relative text-brand">Actually Free.</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-lg text-zinc-400 max-w-xl mb-8 leading-relaxed font-body"
          >
            Instant access to financial news from {totalFeeds} premium sources.
            No API keys, no rate limits, no credit card. Just data.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="flex gap-3"
          >
            <a
              href="#quickstart"
              className="px-5 py-2.5 bg-brand text-zinc-950 rounded-lg font-semibold text-sm hover:brightness-110 transition-all"
            >
              Get Started
            </a>
            <a
              href="https://github.com/mestrovicjozo/ActuallyFreeAPI"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border border-zinc-700 text-zinc-300 rounded-lg font-semibold text-sm hover:bg-zinc-800/60 hover:border-zinc-600 transition-colors"
            >
              View Source
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="border-y border-zinc-800/60 bg-zinc-900/20"
      >
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-heading font-bold text-zinc-100">
                {loading ? '\u2014' : articleCount?.toLocaleString()}
              </p>
              <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-body">Articles</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-heading font-bold text-zinc-100">{totalFeeds}</p>
              <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-body">Sources</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-heading font-bold text-zinc-100">
                {Object.keys(rssFeedsByCategory).length}
              </p>
              <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-body">Categories</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-heading font-bold text-brand">Free</p>
              <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-body">Forever</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Quick Start */}
      <motion.section
        id="quickstart"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="py-20 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-zinc-100 mb-3">Quick Start</h2>
          <p className="text-zinc-400 font-body mb-10">Copy and paste to start fetching data.</p>

          <div className="grid md:grid-cols-2 gap-3">
            {examples.map((example, i) => (
              <div
                key={i}
                className="group rounded-lg border border-zinc-800 bg-zinc-900/40 overflow-hidden hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/60">
                  <div>
                    <p className="text-sm font-medium text-zinc-200">{example.title}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{example.description}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(example.code, i)}
                    className="shrink-0 ml-3 px-2.5 py-1 text-xs rounded-md border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors"
                  >
                    {copiedIndex === i ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="px-4 py-3 overflow-x-auto">
                  <code className="text-sm font-mono text-brand whitespace-nowrap">
                    <span className="text-zinc-500">$ </span>{example.code}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* JSON Response Preview */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="py-20 px-6 bg-zinc-900/20"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-zinc-100 mb-3">API Response</h2>
          <p className="text-zinc-400 font-body mb-10">
            Structured JSON with article metadata, summaries, and extracted ticker symbols.
          </p>

          <div className="rounded-xl border border-zinc-800 overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                  <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                  <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                    GET
                  </span>
                  <span className="text-xs font-mono text-zinc-400">/api/news</span>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(JSON.stringify(exampleResponse, null, 2), 999)}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors font-medium"
              >
                {copiedIndex === 999 ? 'Copied' : 'Copy'}
              </button>
            </div>

            {/* JSON body */}
            <div className="p-5 overflow-x-auto max-h-[420px] overflow-y-auto bg-zinc-950/60">
              <pre className="text-sm font-mono leading-6">
                {JSON.stringify(exampleResponse, null, 2).split('\n').map((line, i) => (
                  <div key={i} className="hover:bg-zinc-800/30 px-2 -mx-2 rounded">
                    <JsonLine line={line} />
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </div>
      </motion.section>

      {/* News Sources */}
      <motion.section
        id="sources"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="py-20 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-zinc-100 mb-3">News Sources</h2>
          <p className="text-zinc-400 font-body mb-8">
            Aggregating {totalFeeds} feeds from trusted financial outlets.
          </p>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeCategory === null
                  ? 'bg-brand/15 text-brand border border-brand/30'
                  : 'border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              All ({totalFeeds})
            </button>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(activeCategory === key ? null : key)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  activeCategory === key
                    ? 'bg-brand/15 text-brand border border-brand/30'
                    : 'border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                }`}
              >
                {label} ({rssFeedsByCategory[key as keyof typeof rssFeedsByCategory]?.length || 0})
              </button>
            ))}
          </div>

          {/* Source cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(rssFeedsByCategory)
              .filter(([category]) => activeCategory === null || activeCategory === category)
              .flatMap(([category, feeds]) =>
                feeds.map((feed, idx) => (
                  <div
                    key={`${category}-${idx}`}
                    className="flex items-center gap-3 p-4 rounded-lg border border-zinc-800/60 hover:border-zinc-700 bg-zinc-900/30 transition-colors"
                  >
                    <div className={`w-2 h-2 rounded-full shrink-0 ${categoryDotColors[category] || 'bg-zinc-400'}`} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-zinc-200 truncate">{feed.name}</p>
                      <p className="text-xs text-zinc-500">{categoryLabels[category] || category}</p>
                    </div>
                  </div>
                ))
              )}
          </div>
        </div>
      </motion.section>

      {/* API Endpoints */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="py-20 px-6 bg-zinc-900/20"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-zinc-100 mb-3">Endpoints</h2>
          <p className="text-zinc-400 font-body mb-10">Three endpoints to power your application.</p>

          <div className="space-y-3">
            {endpoints.map((ep, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center gap-3 p-5 rounded-lg border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-3 shrink-0">
                  <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                    GET
                  </span>
                  <code className="text-sm font-mono text-zinc-100">{ep.path}</code>
                </div>
                <p className="text-sm text-zinc-400 font-body">{ep.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="py-20 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-zinc-100 mb-10">
            Why This API?
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="p-5 rounded-lg border border-zinc-800/60 hover:border-zinc-700 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold text-zinc-100 mb-1.5">{f.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed font-body">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/60 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-brand flex items-center justify-center">
              <span className="text-zinc-950 font-heading font-extrabold text-[7px] leading-none">AF</span>
            </div>
            <span className="text-sm text-zinc-400 font-body">ActuallyFreeAPI</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/mestrovicjozo/ActuallyFreeAPI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://github.com/mestrovicjozo/ActuallyFreeAPI#readme"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Documentation
            </a>
          </div>

          <p className="text-xs text-zinc-600 font-body">Built with Next.js &amp; Supabase</p>
        </div>
      </footer>
    </div>
  );
}

/* ── JSON Syntax Highlighting ── */

function JsonLine({ line }: { line: string }) {
  // Key-value pairs: "key": value
  const kvMatch = line.match(/^(\s*)"([^"]+)"(\s*:\s*)(.*)/);
  if (kvMatch) {
    const [, indent, key, colon, rest] = kvMatch;
    return (
      <>
        <span>{indent}</span>
        <span className="text-brand">&quot;{key}&quot;</span>
        <span className="text-zinc-600">{colon}</span>
        <ValueSpan value={rest} />
      </>
    );
  }

  // Standalone string values in arrays: "value",
  const strMatch = line.match(/^(\s*)"([^"]*)"(,?\s*)$/);
  if (strMatch) {
    const [, indent, str, trailing] = strMatch;
    return (
      <>
        <span>{indent}</span>
        <span className="text-sky-400">&quot;{str}&quot;</span>
        <span className="text-zinc-600">{trailing}</span>
      </>
    );
  }

  // Structural characters
  return <span className="text-zinc-600">{line}</span>;
}

function ValueSpan({ value }: { value: string }) {
  const trimmed = value.trimEnd();
  const hasComma = trimmed.endsWith(',');
  const core = hasComma ? trimmed.slice(0, -1).trim() : trimmed.trim();
  const comma = hasComma ? ',' : '';

  if (core.startsWith('"') && core.endsWith('"')) {
    return <><span className="text-sky-400">{core}</span><span className="text-zinc-600">{comma}</span></>;
  }
  if (/^\d+$/.test(core)) {
    return <><span className="text-amber-400">{core}</span><span className="text-zinc-600">{comma}</span></>;
  }
  if (core === 'true' || core === 'false') {
    return <><span className="text-rose-400">{core}</span><span className="text-zinc-600">{comma}</span></>;
  }
  if (core === 'null') {
    return <><span className="text-zinc-500">{core}</span><span className="text-zinc-600">{comma}</span></>;
  }
  return <span className="text-zinc-500">{value}</span>;
}
