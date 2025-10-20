'use client';

import { motion } from 'framer-motion';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const features = [
    {
      icon: '⚡',
      title: 'Blazing Fast',
      description: 'Optimized database queries with smart caching for instant responses'
    },
    {
      icon: '🌐',
      title: '21+ Sources',
      description: 'Reuters, Bloomberg, CNBC, WSJ, and top financial outlets'
    },
    {
      icon: '🔓',
      title: 'Truly Free',
      description: 'No authentication, no rate limits, no credit card needed'
    }
  ];

  const examples = [
    {
      title: 'Get Latest News',
      code: 'curl https://actually-free-api.vercel.app/api/news'
    },
    {
      title: 'Search for Stock Symbol',
      code: 'curl https://actually-free-api.vercel.app/api/news?search=AAPL'
    },
    {
      title: 'Filter by Date Range',
      code: 'curl https://actually-free-api.vercel.app/api/news?startDate=2024-01-01&endDate=2024-01-31'
    }
  ];

  const endpoints = [
    {
      method: 'GET',
      path: '/api/news',
      description: 'Fetch news with filtering & pagination'
    },
    {
      method: 'GET',
      path: '/api/sources',
      description: 'List all RSS feed sources'
    },
    {
      method: 'GET',
      path: '/api/stats',
      description: 'API statistics & database info'
    }
  ];

  const sources = [
    'Reuters', 'Bloomberg', 'CNBC', 'WSJ',
    'Yahoo Finance', 'MarketWatch', 'Financial Times', 'Seeking Alpha',
    'Forbes', 'Business Insider', 'Motley Fool', 'Benzinga',
    'IBD', 'Investopedia', 'The Economist'
  ];

  const useCases = [
    { icon: '📊', title: 'Trading Bots', description: 'Power your trading algorithms with real-time financial news' },
    { icon: '📱', title: 'News Apps', description: 'Build financial news aggregators and mobile applications' },
    { icon: '🔔', title: 'Alert Systems', description: 'Monitor stocks and keywords with custom notifications' },
    { icon: '📈', title: 'Research', description: 'Analyze market sentiment and identify news trends' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl md:text-8xl font-black mb-6 tracking-tighter text-black dark:text-white"
          >
            Free Financial
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="block mt-2"
            >
              News API
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-4 max-w-3xl mx-auto"
          >
            Access 30 days of financial news from 21+ major sources.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-2xl md:text-3xl font-bold mb-12 text-black dark:text-white"
          >
            No API keys. No limits. Just free data.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex gap-6 justify-center flex-wrap"
          >
            <motion.a
              href="#quick-start"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-bold text-lg transition-all"
            >
              Get Started
            </motion.a>
            <motion.a
              href="https://github.com/mestrovicjozo/ActuallyFreeAPI#readme"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, backgroundColor: 'black', color: 'white' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 border-4 border-black dark:border-white text-black dark:text-white rounded-2xl font-bold text-lg transition-all dark:hover:bg-white dark:hover:text-black"
            >
              Documentation
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8 mb-32"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative p-10 border-4 border-black dark:border-white rounded-3xl transition-all cursor-pointer overflow-hidden"
            >
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="text-6xl mb-6"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-3xl font-black mb-4 text-black dark:text-white">
                {feature.title}
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.05 }}
                className="absolute inset-0 bg-black dark:bg-white"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Start Section */}
        <motion.div
          id="quick-start"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black mb-16 text-center text-black dark:text-white"
          >
            Quick Start
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            {examples.map((example, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ x: 8, transition: { duration: 0.3 } }}
                className="group border-4 border-black dark:border-white rounded-2xl p-8 transition-all"
              >
                <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
                  {example.title}
                </h3>
                <motion.div
                  whileHover={{ boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}
                  className="bg-black dark:bg-gray-950 text-green-400 p-6 rounded-xl overflow-x-auto font-mono text-sm transition-all"
                >
                  <code>{example.code}</code>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* API Endpoints */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black mb-16 text-center text-black dark:text-white"
          >
            API Endpoints
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {endpoints.map((endpoint, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative p-8 border-4 border-black dark:border-white rounded-3xl transition-all cursor-pointer overflow-hidden"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-block px-5 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black font-black text-sm mb-4"
                >
                  {endpoint.method}
                </motion.div>
                <h3 className="text-2xl font-black mb-3 text-black dark:text-white font-mono break-all">
                  {endpoint.path}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  {endpoint.description}
                </p>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.05 }}
                  className="absolute inset-0 bg-black dark:bg-white"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* News Sources */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black mb-16 text-center text-black dark:text-white"
          >
            News Sources
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
          >
            {sources.map((source, i) => (
              <motion.div
                key={source}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'black',
                  color: 'white',
                  transition: { duration: 0.2 }
                }}
                className="px-6 py-4 border-3 border-black dark:border-white rounded-2xl text-center font-bold text-black dark:text-white transition-all cursor-default dark:hover:bg-white dark:hover:text-black"
              >
                {source}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black mb-16 text-center text-black dark:text-white"
          >
            Use Cases
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-8"
          >
            {useCases.map((useCase, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group p-10 border-4 border-black dark:border-white rounded-3xl transition-all overflow-hidden relative"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="text-5xl mb-5"
                >
                  {useCase.icon}
                </motion.div>
                <h3 className="text-2xl font-black mb-3 text-black dark:text-white">
                  {useCase.title}
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {useCase.description}
                </p>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.05 }}
                  className="absolute inset-0 bg-black dark:bg-white"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center pt-16 border-t-4 border-black dark:border-white"
        >
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
            Built with Next.js, Supabase & Vercel
          </p>
          <div className="flex gap-8 justify-center text-lg">
            <motion.a
              href="https://github.com/mestrovicjozo/ActuallyFreeAPI"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-black dark:text-white font-bold hover:opacity-70 transition-opacity"
            >
              GitHub
            </motion.a>
            <span className="text-gray-500">•</span>
            <motion.a
              href="https://github.com/mestrovicjozo/ActuallyFreeAPI/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-black dark:text-white font-bold hover:opacity-70 transition-opacity"
            >
              Contributing
            </motion.a>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-10 text-base text-gray-600 dark:text-gray-500 font-medium"
          >
            Making financial news accessible to everyone
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
