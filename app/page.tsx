'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Home() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const exampleResponse = {
    data: [
      {
        id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        title: "Apple (AAPL) and Microsoft ($MSFT) Lead Tech Stocks Rally",
        description: "Major technology stocks saw significant gains today as investor confidence returned to the market, with AAPL rising 3.2% and MSFT gaining 2.8%.",
        link: "https://actually-free-api.vercel.app/article/tech-rally",
        pub_date: "2025-01-20T14:30:00Z",
        source: "Reuters",
        guid: "reuters-tech-rally-20250120",
        content: "Major technology stocks saw significant gains...",
        tickers: ["AAPL", "MSFT"],
        created_at: "2025-01-20T14:35:00Z"
      },
      {
        id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
        title: "Tesla Stock Surges on Strong Earnings Report",
        description: "Tesla (NASDAQ:TSLA) shares jumped 5% after reporting better-than-expected quarterly earnings and revenue growth.",
        link: "https://actually-free-api.vercel.app/article/tsla-earnings",
        pub_date: "2025-01-20T13:15:00Z",
        source: "Bloomberg",
        guid: "bloomberg-tsla-earnings-20250120",
        content: "Tesla shares jumped 5% after reporting better-than-expected...",
        tickers: ["TSLA"],
        created_at: "2025-01-20T13:20:00Z"
      }
    ],
    pagination: {
      page: 1,
      limit: 20,
      total: 1547,
      totalPages: 78,
      hasNextPage: true,
      hasPreviousPage: false
    },
    filters: {
      startDate: null,
      endDate: null,
      search: null,
      source: null,
      ticker: null
    }
  };

  const examples = [
    {
      title: 'Get Latest News',
      description: 'Fetch the most recent articles',
      code: 'curl https://actually-free-api.vercel.app/api/news'
    },
    {
      title: 'Filter by Ticker',
      description: 'Get articles about specific stock symbols',
      code: 'curl https://actually-free-api.vercel.app/api/news?ticker=AAPL'
    },
    {
      title: 'Search for Keywords',
      description: 'Find articles containing specific text',
      code: 'curl https://actually-free-api.vercel.app/api/news?search=earnings'
    },
    {
      title: 'Filter by Date Range',
      description: 'Get articles within a date range',
      code: 'curl "https://actually-free-api.vercel.app/api/news?startDate=2025-01-01&endDate=2025-01-31"'
    }
  ];

  const features = [
    {
      title: 'No Authentication',
      description: 'Start using immediately without API keys or registration',
      icon: '🔓'
    },
    {
      title: '21+ Sources',
      description: 'Reuters, Bloomberg, CNBC, WSJ, and top financial outlets',
      icon: '📰'
    },
    {
      title: 'Fast & Reliable',
      description: 'Optimized queries with smart caching for instant responses',
      icon: '⚡'
    },
    {
      title: '30-Day Archive',
      description: 'Access the last 30 days of financial news articles',
      icon: '📅'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-gray-900 to-black">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-center mb-20"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-300 bg-clip-text text-transparent"
          >
            Free Financial News API
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto"
          >
            Access <span className="font-bold text-purple-400">30 days</span> of financial news from{' '}
            <span className="font-bold text-purple-400">21+ major sources</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-lg text-gray-400 mb-10"
          >
            No API keys • No rate limits • No credit card
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <motion.a
              href="#try-it"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-lg font-semibold text-lg transition-all shadow-lg shadow-purple-500/50 hover:shadow-purple-400/60"
            >
              Try It Now
            </motion.a>
            <motion.a
              href="https://github.com/mestrovicjozo/ActuallyFreeAPI#readme"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 border-2 border-purple-500/50 bg-purple-500/10 backdrop-blur-sm text-purple-200 hover:border-purple-400 hover:bg-purple-500/20 rounded-lg font-semibold text-lg transition-all"
            >
              Documentation
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Sections with individual black backgrounds */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">

        {/* JSON Response Preview */}
        <motion.div
          id="try-it"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            What You&apos;ll Get
          </h2>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto text-lg">
            Make a simple GET request and receive structured JSON with article metadata, summaries, and links to full content
          </p>

          <div className="max-w-5xl mx-auto">
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 overflow-hidden shadow-2xl shadow-purple-500/20 relative">
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-2xl blur-xl -z-10"></div>
                {/* Terminal Header */}
                <div className="bg-gray-900/80 backdrop-blur-sm px-4 py-3 flex items-center justify-between border-b border-purple-500/20">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-sm text-purple-300 font-mono">
                    GET /api/news
                  </span>
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(exampleResponse, null, 2), 999)}
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium"
                  >
                    {copiedIndex === 999 ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                {/* JSON Content */}
                <div className="p-6 overflow-x-auto max-h-[600px] overflow-y-auto">
                  <pre className="text-sm font-mono text-gray-300">
                    <code>{JSON.stringify(exampleResponse, null, 2)
                      .split('\n')
                      .map((line, i) => {
                        // Simple syntax highlighting
                        if (line.includes('"id"') || line.includes('"title"') || line.includes('"description"')) {
                          const parts = line.split(':');
                          if (parts.length > 1) {
                            return (
                              <div key={i}>
                                <span className="text-purple-400 font-semibold">{parts[0]}:</span>
                                <span className="text-green-400">{parts.slice(1).join(':')}</span>
                              </div>
                            );
                          }
                        }
                        return <div key={i}>{line}</div>;
                      })
                    }</code>
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>

        {/* Quick Start Examples */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Quick Start
          </h2>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto text-lg">
            Copy and paste these examples to start fetching financial news instantly
          </p>

          <div className="max-w-4xl mx-auto space-y-4">
            {examples.map((example, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className="group bg-black/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 overflow-hidden hover:border-purple-400/50 transition-all shadow-lg hover:shadow-purple-500/30"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        {example.title}
                      </h3>
                      <p className="text-sm text-gray-300">
                        {example.description}
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(example.code, i)}
                      className="px-3 py-1 text-sm bg-purple-500/20 text-purple-300 rounded-md hover:bg-purple-500/30 transition-colors font-medium border border-purple-500/30"
                    >
                      {copiedIndex === i ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="bg-gray-900/60 rounded-lg p-4 overflow-x-auto border border-purple-500/20">
                    <code className="text-sm font-mono text-green-400">
                      {example.code}
                    </code>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* API Endpoints */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Available Endpoints
          </h2>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              {
                method: 'GET',
                path: '/api/news',
                description: 'Fetch news with filtering, search, and pagination'
              },
              {
                method: 'GET',
                path: '/api/sources',
                description: 'List all RSS feed sources and categories'
              },
              {
                method: 'GET',
                path: '/api/stats',
                description: 'Get API statistics and database information'
              }
            ].map((endpoint, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                whileHover={{ y: -3 }}
                className="group relative p-6 bg-black/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all shadow-lg hover:shadow-purple-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-purple-500/10 rounded-2xl transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="inline-block px-3 py-1 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-md text-sm font-bold mb-3">
                    {endpoint.method}
                  </div>
                  <h3 className="text-lg font-bold text-white font-mono mb-2">
                    {endpoint.path}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {endpoint.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Why Use This API?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                whileHover={{ y: -3 }}
                className="group relative p-6 bg-black/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all shadow-lg hover:shadow-purple-500/30"
              >
                {/* Gradient glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-purple-500/10 rounded-2xl transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-bold mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* News Sources */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            News Sources
          </h2>

          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              'Reuters', 'Bloomberg', 'CNBC', 'WSJ', 'Yahoo Finance',
              'MarketWatch', 'Financial Times', 'Seeking Alpha', 'Forbes',
              'Business Insider', 'Motley Fool', 'Benzinga', 'IBD',
              'Investopedia', 'The Economist'
            ].map((source, i) => (
              <motion.div
                key={source}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: i * 0.01 }}
                whileHover={{ scale: 1.03 }}
                className="px-4 py-3 bg-black/40 backdrop-blur-xl border border-purple-500/30 hover:border-purple-400/50 rounded-xl text-center text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-purple-500/20"
              >
                {source}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center pt-12 pb-6"
        >
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30 shadow-lg shadow-purple-500/10">
            <p className="text-gray-300 mb-4">
              Built with Next.js, Supabase & Vercel
            </p>
            <div className="flex gap-6 justify-center">
              <motion.a
                href="https://github.com/mestrovicjozo/ActuallyFreeAPI"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -1 }}
                className="text-purple-400 font-semibold hover:text-purple-300 transition-colors"
              >
                GitHub
              </motion.a>
              <span className="text-gray-600">•</span>
              <motion.a
                href="https://github.com/mestrovicjozo/ActuallyFreeAPI/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -1 }}
                className="text-purple-400 font-semibold hover:text-purple-300 transition-colors"
              >
                Contributing
              </motion.a>
            </div>
            <p className="mt-6 text-sm text-gray-400">
              Making financial news accessible to everyone
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
