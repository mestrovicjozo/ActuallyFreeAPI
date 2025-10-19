export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Free Financial News API
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Access up to 30 days of financial news from 25+ major RSS feeds, completely free.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#quick-start"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Get Started
            </a>
            <a
              href="https://github.com/mestrovicjozo/ActuallyFreeAPI#readme"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
            >
              View Documentation
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">🆓</div>
            <h3 className="text-xl font-semibold mb-2">100% Free</h3>
            <p className="text-gray-600 dark:text-gray-400">
              No API keys, no rate limits, no credit card required. Just use it.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">📰</div>
            <h3 className="text-xl font-semibold mb-2">25+ Sources</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Aggregates from Reuters, Bloomberg, CNBC, WSJ, and many more.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="text-xl font-semibold mb-2">Powerful Search</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Filter by date, source, and search keywords or stock symbols.
            </p>
          </div>
        </div>

        {/* Quick Start Section */}
        <div id="quick-start" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6">Quick Start</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Get Latest News</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>curl https://your-domain.vercel.app/api/news</code>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Search for Stock Symbol</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>curl https://your-domain.vercel.app/api/news?search=AAPL</code>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Filter by Date Range</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>curl https://your-domain.vercel.app/api/news?startDate=2024-01-01&endDate=2024-01-31</code>
              </div>
            </div>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6">API Endpoints</h2>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold mb-1">
                <span className="text-green-600 dark:text-green-400">GET</span> /api/news
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Fetch news articles with filtering and pagination
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-500">
                Query params: startDate, endDate, search, source, page, limit
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-semibold mb-1">
                <span className="text-green-600 dark:text-green-400">GET</span> /api/sources
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get list of all RSS feed sources
              </p>
            </div>

            <div className="border-l-4 border-pink-500 pl-4">
              <h3 className="text-lg font-semibold mb-1">
                <span className="text-green-600 dark:text-green-400">GET</span> /api/stats
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get API statistics and database info
              </p>
            </div>
          </div>
        </div>

        {/* News Sources */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6">News Sources</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Reuters', 'Bloomberg', 'CNBC', 'Wall Street Journal',
              'Yahoo Finance', 'MarketWatch', 'Financial Times', 'Seeking Alpha',
              'Forbes', 'Barrons', 'Motley Fool', 'Benzinga',
              'IBD', 'Investopedia', 'The Economist', '+ 10 more'
            ].map((source) => (
              <div
                key={source}
                className="bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded text-center text-sm font-medium"
              >
                {source}
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6">Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">📊 Trading Bots</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get real-time financial news to inform your trading algorithms
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">📱 News Apps</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Build financial news aggregators and mobile apps
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">🔔 Alert Systems</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Monitor specific stocks or keywords and send notifications
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">📈 Research</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Analyze market sentiment and news trends over time
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500 dark:text-gray-400">
          <p>Built with Next.js and Supabase. Deployed on Vercel.</p>
          <p className="mt-2">
            <a
              href="https://github.com/mestrovicjozo/ActuallyFreeAPI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              View on GitHub
            </a>
            {' • '}
            <a
              href="https://github.com/mestrovicjozo/ActuallyFreeAPI/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Contributing
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
