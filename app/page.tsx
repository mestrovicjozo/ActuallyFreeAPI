'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// RSS Feed data with categories
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

const categoryInfo: Record<string, { label: string; icon: string; color: string }> = {
  general: { label: 'General News', icon: '📰', color: 'from-indigo-500 to-purple-500' },
  markets: { label: 'Markets', icon: '📈', color: 'from-cyan-500 to-blue-500' },
  technology: { label: 'Technology', icon: '💻', color: 'from-emerald-500 to-green-500' },
  business: { label: 'Business', icon: '💼', color: 'from-amber-500 to-orange-500' },
  investing: { label: 'Investing', icon: '💰', color: 'from-pink-500 to-rose-500' },
  stocks: { label: 'Stocks', icon: '📊', color: 'from-violet-500 to-purple-500' },
  other: { label: 'Specialized', icon: '🎯', color: 'from-teal-500 to-cyan-500' },
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
      .catch(err => {
        console.error('Failed to fetch stats:', err);
        setLoading(false);
      });
  }, []);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

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

  const features = [
    {
      title: 'No Authentication',
      description: 'Start immediately - no API keys, no signup, no hassle',
      icon: '🔓',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      title: '24 RSS Feeds',
      description: 'Reuters, Bloomberg, CNBC, WSJ and 20+ premium sources',
      icon: '📡',
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      title: 'Ticker Extraction',
      description: 'Automatic NLP-powered stock symbol detection',
      icon: '🎯',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      title: '30-Day Archive',
      description: 'Access historical financial news data',
      icon: '📅',
      gradient: 'from-orange-400 to-red-500'
    }
  ];

  // Calculate total feeds
  const totalFeeds = Object.values(rssFeedsByCategory).reduce((acc, feeds) => acc + feeds.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-1.5s' }}></div>
      </div>

      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm text-purple-200 font-medium">Live API • Always Free</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Financial News API
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Actually Free
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-300 mb-4 max-w-2xl mx-auto"
          >
            Access <span className="font-bold text-purple-400">{totalFeeds} RSS feeds</span> from premium financial sources.
            <br />
            Real-time news with <span className="font-bold text-cyan-400">automatic ticker extraction</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center justify-center gap-3 text-gray-400 mb-10 flex-wrap"
          >
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No API keys
            </span>
            <span className="text-gray-600">•</span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No rate limits
            </span>
            <span className="text-gray-600">•</span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No credit card
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <motion.a
              href="#try-it"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
            >
              Try It Now
            </motion.a>
            <motion.a
              href="#sources"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 glass glass-hover rounded-xl text-purple-200 font-semibold text-lg transition-all"
            >
              View Sources
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex justify-center mb-20"
        >
          <div className="glass rounded-2xl p-8 shadow-2xl shadow-purple-500/10">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="text-center">
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Articles Available</p>
                {loading ? (
                  <div className="h-12 w-32 bg-purple-500/20 rounded-lg animate-pulse"></div>
                ) : (
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  >
                    {articleCount?.toLocaleString() || '0'}
                  </motion.p>
                )}
              </div>
              <div className="hidden sm:block w-px h-16 bg-purple-500/30"></div>
              <div className="text-center">
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">News Sources</p>
                <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {totalFeeds}
                </p>
              </div>
              <div className="hidden sm:block w-px h-16 bg-purple-500/30"></div>
              <div className="text-center">
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Categories</p>
                <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                  {Object.keys(rssFeedsByCategory).length}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 pb-16 sm:px-6 lg:px-8">

        {/* RSS Sources Section */}
        <motion.section
          id="sources"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Premium News Sources
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Aggregating {totalFeeds} RSS feeds from the world&apos;s most trusted financial news outlets
            </p>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === null
                  ? 'bg-purple-500 text-white'
                  : 'glass text-gray-300 hover:text-white'
              }`}
            >
              All Sources ({totalFeeds})
            </button>
            {Object.entries(categoryInfo).map(([key, { label, icon }]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(activeCategory === key ? null : key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  activeCategory === key
                    ? 'bg-purple-500 text-white'
                    : 'glass text-gray-300 hover:text-white'
                }`}
              >
                <span>{icon}</span>
                {label} ({rssFeedsByCategory[key as keyof typeof rssFeedsByCategory]?.length || 0})
              </button>
            ))}
          </div>

          {/* Sources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(rssFeedsByCategory)
              .filter(([category]) => activeCategory === null || activeCategory === category)
              .map(([category, feeds]) => (
                feeds.map((feed, idx) => (
                  <motion.div
                    key={`${category}-${idx}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.02 }}
                    whileHover={{ y: -3, scale: 1.01 }}
                    className="glass glass-hover rounded-xl p-5 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{categoryInfo[category]?.icon || '📄'}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-white truncate">{feed.name}</h3>
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-1">{feed.description}</p>
                        <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${categoryInfo[category]?.color || 'from-gray-500 to-gray-600'} text-white`}>
                          {categoryInfo[category]?.label || category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ))}
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Why Use This API?
            </h2>
            <p className="text-gray-400 text-lg">Built for developers who need financial data without the hassle</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl -z-10"
                  style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
                ></div>
                <div className="glass glass-hover rounded-2xl p-6 h-full transition-all">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* JSON Response Preview */}
        <motion.section
          id="try-it"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              What You&apos;ll Get
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Clean, structured JSON with article metadata, summaries, and extracted ticker symbols
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10">
              {/* Terminal Header */}
              <div className="bg-slate-900/80 px-4 py-3 flex items-center justify-between border-b border-purple-500/20">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm text-purple-300 font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  GET /api/news
                </span>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(exampleResponse, null, 2), 999)}
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium"
                >
                  {copiedIndex === 999 ? '✓ Copied!' : 'Copy'}
                </button>
              </div>

              {/* JSON Content */}
              <div className="p-6 overflow-x-auto max-h-[400px] overflow-y-auto bg-slate-950/50">
                <pre className="text-sm font-mono">
                  <code className="text-gray-300">
                    {JSON.stringify(exampleResponse, null, 2)
                      .split('\n')
                      .map((line, i) => (
                        <div key={i} className="hover:bg-purple-500/5">
                          {line.includes('"') && line.includes(':') ? (
                            <>
                              <span className="text-purple-400">{line.split(':')[0]}:</span>
                              <span className="text-emerald-400">{line.split(':').slice(1).join(':')}</span>
                            </>
                          ) : (
                            <span>{line}</span>
                          )}
                        </div>
                      ))}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Quick Start Examples */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Quick Start
            </h2>
            <p className="text-gray-400 text-lg">Copy and paste to start fetching financial news instantly</p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
            {examples.map((example, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                className="glass glass-hover rounded-xl overflow-hidden transition-all"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-white mb-1">{example.title}</h3>
                      <p className="text-sm text-gray-400">{example.description}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(example.code, i)}
                      className="shrink-0 px-3 py-1 text-sm bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors font-medium border border-purple-500/30"
                    >
                      {copiedIndex === i ? '✓' : 'Copy'}
                    </button>
                  </div>
                  <div className="bg-slate-950/60 rounded-lg p-3 overflow-x-auto border border-purple-500/20">
                    <code className="text-sm font-mono text-emerald-400 whitespace-nowrap">
                      {example.code}
                    </code>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* API Endpoints */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              API Endpoints
            </h2>
            <p className="text-gray-400 text-lg">Three simple endpoints to power your application</p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              {
                method: 'GET',
                path: '/api/news',
                description: 'Fetch news with filtering, search, ticker symbols, and pagination',
                color: 'from-emerald-500 to-green-500'
              },
              {
                method: 'GET',
                path: '/api/sources',
                description: 'List all RSS feed sources organized by category',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                method: 'GET',
                path: '/api/stats',
                description: 'Get API statistics, article counts, and database info',
                color: 'from-purple-500 to-pink-500'
              }
            ].map((endpoint, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass glass-hover rounded-2xl p-6 transition-all"
              >
                <div className={`inline-block px-3 py-1 bg-gradient-to-r ${endpoint.color} text-white rounded-lg text-sm font-bold mb-3`}>
                  {endpoint.method}
                </div>
                <h3 className="text-lg font-bold text-white font-mono mb-2">
                  {endpoint.path}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {endpoint.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center pt-12 pb-8"
        >
          <div className="glass rounded-2xl p-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">🚀</span>
              <span className="text-xl font-bold text-white">ActuallyFreeAPI</span>
            </div>
            <p className="text-gray-400 mb-6">
              Built with Next.js, Supabase & Vercel
            </p>
            <div className="flex gap-6 justify-center mb-6">
              <motion.a
                href="https://github.com/mestrovicjozo/ActuallyFreeAPI"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 text-purple-400 font-semibold hover:text-purple-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </motion.a>
              <span className="text-gray-600">•</span>
              <motion.a
                href="https://github.com/mestrovicjozo/ActuallyFreeAPI#readme"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="text-purple-400 font-semibold hover:text-purple-300 transition-colors"
              >
                Documentation
              </motion.a>
            </div>
            <p className="text-sm text-gray-500">
              Making financial news accessible to everyone
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
