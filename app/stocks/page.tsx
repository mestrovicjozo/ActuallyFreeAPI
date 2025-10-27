'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function StocksPage() {
  const portfolioStocks = [
    {
      category: 'Quantum Computing',
      description: 'Leading the quantum computing revolution',
      stocks: [
        { ticker: 'QBTS', name: 'D-Wave Quantum', products: ['Quantum Annealing', 'Advantage', 'Leap Cloud'] },
        { ticker: 'IONQ', name: 'IonQ', products: ['Trapped Ion', 'Forte', 'Aria'] },
        { ticker: 'QUBT', name: 'Quantum Computing Inc.', products: ['Reservoir Computer', 'Dirac'] },
        { ticker: 'RGTI', name: 'Rigetti Computing', products: ['Superconducting Quantum', 'Aspen'] }
      ],
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30',
      hoverBorder: 'hover:border-purple-400/50'
    },
    {
      category: 'Tech Giants',
      description: 'The biggest names in technology',
      stocks: [
        { ticker: 'META', name: 'Meta Platforms', products: ['Facebook', 'Instagram', 'WhatsApp', 'Quest'] },
        { ticker: 'NVDA', name: 'NVIDIA', products: ['GeForce', 'RTX', 'CUDA', 'AI Computing'] },
        { ticker: 'MSFT', name: 'Microsoft', products: ['Windows', 'Azure', 'Office 365', 'GitHub'] },
        { ticker: 'AMZN', name: 'Amazon', products: ['AWS', 'Prime', 'Alexa', 'Kindle'] },
        { ticker: 'GOOGL', name: 'Alphabet (Google)', products: ['Search', 'YouTube', 'Android', 'Cloud'] }
      ],
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30',
      hoverBorder: 'hover:border-blue-400/50'
    },
    {
      category: 'Semiconductors & Tech',
      description: 'Hardware and semiconductor innovation',
      stocks: [
        { ticker: 'AMD', name: 'Advanced Micro Devices', products: ['Ryzen', 'Radeon', 'EPYC'] },
        { ticker: 'AVGO', name: 'Broadcom', products: ['VMware', 'Semiconductors'] },
        { ticker: 'ASML', name: 'ASML Holding', products: ['EUV Lithography', 'TwinScan'] },
        { ticker: 'FN', name: 'Fabrinet', products: ['Optical Components', 'Automation'] }
      ],
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-500/20 to-teal-500/20',
      borderColor: 'border-emerald-500/30',
      hoverBorder: 'hover:border-emerald-400/50'
    },
    {
      category: 'AI & Enterprise',
      description: 'Artificial intelligence and enterprise software leaders',
      stocks: [
        { ticker: 'PLTR', name: 'Palantir Technologies', products: ['Gotham', 'Foundry', 'AIP'] },
        { ticker: 'ORCL', name: 'Oracle', products: ['Database', 'Cloud', 'Java'] },
        { ticker: 'IBM', name: 'IBM', products: ['Watson', 'Red Hat', 'Quantum'] },
        { ticker: 'FTNT', name: 'Fortinet', products: ['FortiGate', 'FortiOS'] },
        { ticker: 'FDS', name: 'FactSet Research', products: ['Financial Analytics', 'Workstation'] }
      ],
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-500/20 to-red-500/20',
      borderColor: 'border-orange-500/30',
      hoverBorder: 'hover:border-orange-400/50'
    }
  ];

  const totalStocks = portfolioStocks.reduce((sum, cat) => sum + cat.stocks.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent"
          >
            Portfolio Stock Tracker
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto"
          >
            Tracking <span className="font-bold text-blue-400">{totalStocks} stocks</span> from my{' '}
            <span className="font-bold text-purple-400">AI Playground portfolio</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-lg text-gray-400 mb-8"
          >
            Intelligent news tracking with product, brand, and CEO name recognition
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="inline-block bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-blue-500/20"
          >
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-blue-300">Why these stocks?</span> This API tracks stocks from my personal investment portfolio,
              focusing on quantum computing, AI, and next-generation technology.
            </p>
          </motion.div>
        </motion.div>

        {/* Stock Categories */}
        <div className="space-y-12">
          {portfolioStocks.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + categoryIndex * 0.1 }}
            >
              {/* Category Header */}
              <div className="mb-6">
                <h2 className={`text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                  {category.category}
                </h2>
                <p className="text-gray-400 text-lg">{category.description}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm text-gray-500">{category.stocks.length} stocks tracked</span>
                </div>
              </div>

              {/* Stocks Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.stocks.map((stock, stockIndex) => (
                  <motion.div
                    key={stock.ticker}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.1 + stockIndex * 0.05 }}
                    className={`relative group bg-black/40 backdrop-blur-xl rounded-xl border ${category.borderColor} ${category.hoverBorder} p-5 transition-all shadow-lg hover:shadow-xl`}
                  >
                    {/* Background Gradient Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>

                    {/* Ticker Badge */}
                    <div className="flex items-start justify-between mb-3">
                      <div className={`px-3 py-1 bg-gradient-to-r ${category.gradient} rounded-lg`}>
                        <span className="font-bold text-white text-lg">{stock.ticker}</span>
                      </div>
                      <div className="text-xs text-gray-500 font-mono">
                        ${stock.ticker}
                      </div>
                    </div>

                    {/* Company Name */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">
                      {stock.name}
                    </h3>

                    {/* Products/Technologies */}
                    <div className="space-y-2">
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                        Key Products:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {stock.products.map((product, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-800/50 text-gray-300 rounded text-xs border border-gray-700/50 hover:border-gray-600 transition-colors"
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Smart Tracking Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Intelligent Stock Tracking
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-blue-500/30 p-6 hover:border-blue-400/50 transition-all">
              <div className="text-4xl mb-4">🏷️</div>
              <h3 className="text-xl font-bold text-white mb-2">Product Recognition</h3>
              <p className="text-gray-300 text-sm mb-3">
                Articles mentioning products are automatically tagged:
              </p>
              <div className="space-y-1 text-sm text-gray-400 font-mono">
                <div>iOS → AAPL</div>
                <div>Windows → MSFT</div>
                <div>Instagram → META</div>
                <div>GeForce → NVDA</div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-purple-500/30 p-6 hover:border-purple-400/50 transition-all">
              <div className="text-4xl mb-4">👔</div>
              <h3 className="text-xl font-bold text-white mb-2">CEO Name Tracking</h3>
              <p className="text-gray-300 text-sm mb-3">
                Mentions of CEOs automatically link to their companies:
              </p>
              <div className="space-y-1 text-sm text-gray-400 font-mono">
                <div>Jensen Huang → NVDA</div>
                <div>Mark Zuckerberg → META</div>
                <div>Lisa Su → AMD</div>
                <div>Alex Karp → PLTR</div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-emerald-500/30 p-6 hover:border-emerald-400/50 transition-all">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-white mb-2">Context-Aware Extraction</h3>
              <p className="text-gray-300 text-sm mb-3">
                Smart detection using multiple strategies:
              </p>
              <div className="space-y-1 text-sm text-gray-400">
                <div>• Ticker symbols ($AAPL, NASDAQ:NVDA)</div>
                <div>• Company names & aliases</div>
                <div>• Products & subsidiaries</div>
                <div>• CEO quotes & mentions</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* API Access */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20"
        >
          <h3 className="text-2xl font-bold text-white mb-4 text-center">
            Access These Stocks via API
          </h3>
          <p className="text-gray-300 text-center mb-6">
            Get news articles mentioning any of these stocks with our free API
          </p>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm text-gray-300 border border-blue-500/20">
              <code>GET /api/news?tickers=NVDA,PLTR,QBTS</code>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm text-gray-300 border border-purple-500/20">
              <code>GET /api/stocks</code>
            </div>
          </div>

          <div className="flex gap-4 justify-center mt-6">
            <Link
              href="/"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg font-semibold transition-all shadow-lg"
            >
              View API Docs
            </Link>
            <a
              href="https://github.com/mestrovicjozo/ActuallyFreeAPI"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border-2 border-blue-500/50 bg-blue-500/10 backdrop-blur-sm text-blue-200 hover:border-blue-400 hover:bg-blue-500/20 rounded-lg font-semibold transition-all"
            >
              GitHub
            </a>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm">
            This tracker is based on my personal investment portfolio in quantum computing, AI, and technology stocks.
            <br />
            News articles are automatically tagged when they mention these companies, their products, or their leaders.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
