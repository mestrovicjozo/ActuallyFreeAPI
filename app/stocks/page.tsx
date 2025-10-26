'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function StocksPage() {
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
        ticker: "AAPL",
        company_name: "Apple Inc.",
        price: 178.25,
        change: 2.15,
        change_percent: 1.22,
        volume: null,
        market_cap: null,
        timestamp: "2025-01-20T16:00:00Z",
        created_at: "2025-01-20T16:05:00Z"
      },
      {
        id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
        ticker: "TSLA",
        company_name: "Tesla Inc.",
        price: 245.80,
        change: -3.42,
        change_percent: -1.37,
        volume: null,
        market_cap: null,
        timestamp: "2025-01-20T16:00:00Z",
        created_at: "2025-01-20T16:05:00Z"
      }
    ],
    pagination: {
      total: 2400,
      limit: 100,
      offset: 0,
      returned: 2
    }
  };

  const examples = [
    {
      title: 'Get Latest Prices',
      description: 'Fetch the most recent stock prices',
      code: 'curl https://actually-free-api.vercel.app/api/stocks'
    },
    {
      title: 'Get Specific Stock',
      description: 'Get price history for a specific ticker',
      code: 'curl https://actually-free-api.vercel.app/api/stocks?ticker=AAPL'
    },
    {
      title: 'Filter by Date Range',
      description: 'Get stock prices within a date range',
      code: 'curl "https://actually-free-api.vercel.app/api/stocks?ticker=TSLA&start_date=2025-01-01&end_date=2025-01-31"'
    },
    {
      title: 'Get All Tracked Tickers',
      description: 'List all stocks being tracked',
      code: 'curl https://actually-free-api.vercel.app/api/stocks/tickers'
    }
  ];

  const features = [
    {
      title: '90+ Stocks',
      description: 'Major companies from S&P 500, NASDAQ-100, and Dow Jones',
      icon: '📊'
    },
    {
      title: '4 Daily Snapshots',
      description: 'Market open, midday, afternoon, and market close prices',
      icon: '⏰'
    },
    {
      title: '90-Day History',
      description: 'Access up to 90 days of historical stock price data',
      icon: '📅'
    },
    {
      title: 'Real-Time Updates',
      description: 'Prices updated daily from Finnhub API',
      icon: '🔄'
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
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-green-200 to-green-300 bg-clip-text text-transparent"
          >
            Free Stock Prices API
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto"
          >
            Access <span className="font-bold text-green-400">90 days</span> of stock prices for{' '}
            <span className="font-bold text-green-400">90+ major stocks</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-lg text-gray-400 mb-10"
          >
            No API keys • No rate limits • 4 snapshots per day
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
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-lg font-semibold text-lg transition-all shadow-lg shadow-green-500/50 hover:shadow-green-400/60"
            >
              Try It Now
            </motion.a>
            <motion.a
              href="https://github.com/mestrovicjozo/ActuallyFreeAPI#readme"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 border-2 border-green-500/50 bg-green-500/10 backdrop-blur-sm text-green-200 hover:border-green-400 hover:bg-green-500/20 rounded-lg font-semibold text-lg transition-all"
            >
              Documentation
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Sections */}
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
            What You&apos;ll Get
          </h2>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto text-lg">
            Make a simple GET request and receive structured JSON with stock prices, changes, and historical data
          </p>

          <div className="max-w-5xl mx-auto">
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-green-500/30 overflow-hidden shadow-2xl shadow-green-500/20 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20 rounded-2xl blur-xl -z-10"></div>
              <div className="bg-gray-900/80 backdrop-blur-sm px-4 py-3 flex items-center justify-between border-b border-green-500/20">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm text-green-300 font-mono">
                  GET /api/stocks
                </span>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(exampleResponse, null, 2), 999)}
                  className="text-sm text-green-400 hover:text-green-300 transition-colors font-medium"
                >
                  {copiedIndex === 999 ? 'Copied!' : 'Copy'}
                </button>
              </div>

              <div className="p-6 overflow-x-auto max-h-[600px] overflow-y-auto">
                <pre className="text-sm font-mono text-gray-300">
                  <code>{JSON.stringify(exampleResponse, null, 2)}</code>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
            Quick Start
          </h2>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto text-lg">
            Copy and paste these examples to start fetching stock prices instantly
          </p>

          <div className="max-w-4xl mx-auto space-y-4">
            {examples.map((example, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className="group bg-black/40 backdrop-blur-xl rounded-2xl border border-green-500/30 overflow-hidden hover:border-green-400/50 transition-all shadow-lg hover:shadow-green-500/30"
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
                      className="px-3 py-1 text-sm bg-green-500/20 text-green-300 rounded-md hover:bg-green-500/30 transition-colors font-medium border border-green-500/30"
                    >
                      {copiedIndex === i ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto border border-green-500/20">
                    <code>{example.code}</code>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
            Available Endpoints
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                method: 'GET',
                endpoint: '/api/stocks',
                description: 'Get stock prices with optional filtering',
                params: ['ticker', 'start_date', 'end_date', 'limit', 'offset']
              },
              {
                method: 'GET',
                endpoint: '/api/stocks/tickers',
                description: 'Get list of all tracked stock tickers',
                params: ['index (optional)']
              },
              {
                method: 'GET',
                endpoint: '/api/stocks/stats',
                description: 'Get statistics about the stock database',
                params: []
              }
            ].map((endpoint, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className="bg-black/40 backdrop-blur-xl rounded-2xl border border-green-500/30 p-6 hover:border-green-400/50 transition-all shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-md font-mono text-sm font-bold border border-green-500/30">
                    {endpoint.method}
                  </span>
                  <div className="flex-1">
                    <code className="text-green-300 font-mono text-lg">
                      {endpoint.endpoint}
                    </code>
                    <p className="text-gray-300 mt-2 mb-3">
                      {endpoint.description}
                    </p>
                    {endpoint.params.length > 0 && (
                      <div>
                        <span className="text-sm text-gray-400">Parameters:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {endpoint.params.map((param, j) => (
                            <span
                              key={j}
                              className="px-2 py-1 bg-gray-800/50 text-gray-300 rounded text-xs font-mono border border-green-500/20"
                            >
                              {param}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
            Why Use Our Stock API?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className="bg-black/40 backdrop-blur-xl rounded-2xl border border-green-500/30 p-6 hover:border-green-400/50 transition-all shadow-lg hover:shadow-green-500/30"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
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
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-green-500/30 shadow-lg shadow-green-500/10">
            <p className="text-gray-300 mb-4">
              Built with Next.js, Supabase & Vercel
            </p>
            <div className="flex gap-6 justify-center">
              <motion.a
                href="https://github.com/mestrovicjozo/ActuallyFreeAPI"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -1 }}
                className="text-green-400 font-semibold hover:text-green-300 transition-colors"
              >
                GitHub
              </motion.a>
              <span className="text-gray-600">•</span>
              <motion.a
                href="https://github.com/mestrovicjozo/ActuallyFreeAPI/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -1 }}
                className="text-green-400 font-semibold hover:text-green-300 transition-colors"
              >
                Contributing
              </motion.a>
            </div>
            <p className="mt-6 text-sm text-gray-400">
              Making financial data accessible to everyone
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
