'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Reveal, Stagger, StaggerItem } from './components/Reveal';
import { Magnetic } from './components/Magnetic';
import { CountUp } from './components/CountUp';

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
  const heroRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, reduce ? 1 : 0.4]);
  const glowY = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 80]);

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
  const allFeeds = Object.entries(rssFeedsByCategory).flatMap(([cat, feeds]) =>
    feeds.map(f => ({ ...f, category: cat }))
  );

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
      title: 'Zero Auth',
      description: 'No keys. No signup. No billing surface. Just hit the endpoint.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: '24+ Premium Feeds',
      description: 'Reuters, Bloomberg, CNBC, WSJ, FT — aggregated continuously.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      ),
    },
    {
      title: 'Ticker Extraction',
      description: 'NLP-powered symbol detection on every article. Filter by AAPL.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
    },
    {
      title: '30-Day Archive',
      description: 'Historical financial news with date range queries built in.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen overflow-clip">
      {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative pt-40 pb-32 px-6"
      >
        {/* Floating brand orb (parallax) */}
        <motion.div
          style={{ y: glowY }}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-32 -translate-x-1/2 w-[680px] h-[680px] rounded-full"
        >
          <div className="absolute inset-0 rounded-full bg-brand/[0.08] blur-3xl" />
          <div className="absolute inset-12 rounded-full bg-brand/[0.05] blur-2xl" />
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass mb-10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-zinc-300 font-medium font-mono">
              Live · Always Free
            </span>
            <span className="text-zinc-600">/</span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 font-mono">
              {loading ? '—' : `${articleCount?.toLocaleString()} articles`}
            </span>
          </motion.div>

          {/* Display headline — broken across two distinct lines for editorial weight */}
          <h1 className="text-display mb-10 max-w-[18ch]">
            <BlurInWord text="Financial" delay={0.05} />{' '}
            <BlurInWord text="news," delay={0.12} />
            <br />
            <span className="relative inline-block">
              <BlurInWord text="actually" delay={0.22} className="text-zinc-100" />{' '}
              <span className="relative inline-block">
                <BlurInWord text="free." delay={0.30} className="text-shimmer italic" />
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                  style={{ transformOrigin: 'left' }}
                  className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-brand via-brand/70 to-transparent rounded-full"
                />
              </span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-[1.7] font-body mb-12"
          >
            A REST API for financial news from {totalFeeds} premium sources —
            Reuters, Bloomberg, the Wall Street Journal. No keys. No quotas.
            <span className="text-zinc-200"> Just data, returned as JSON.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-wrap items-center gap-3"
          >
            <Magnetic
              as="a"
              href="#quickstart"
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-zinc-950 rounded-full font-semibold text-sm overflow-hidden shadow-[0_8px_32px_-8px_rgba(191,217,255,0.55)]"
            >
              <span className="relative z-10">Get Started</span>
              <svg className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </Magnetic>

            <Magnetic
              as="a"
              href="https://github.com/mestrovicjozo/ActuallyFreeAPI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-zinc-200 font-semibold text-sm glass hover:bg-zinc-800/50 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              View Source
            </Magnetic>

            <a
              href="#quickstart"
              className="ml-2 hidden md:inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors font-mono uppercase tracking-[0.18em]"
            >
              <span>or scroll</span>
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >↓</motion.span>
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════ MARQUEE OF SOURCES ═══════════════════════════════ */}
      <Reveal as="section" className="relative py-10 border-y border-zinc-800/60 bg-zinc-950/40">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="overflow-hidden">
          <ul className="marquee-track gap-12 whitespace-nowrap motion-reduce:animate-none">
            {[...allFeeds, ...allFeeds].map((f, i) => (
              <li
                key={i}
                aria-hidden={i >= allFeeds.length}
                className="inline-flex items-center gap-2.5 text-sm font-medium text-zinc-500 shrink-0"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${categoryDotColors[f.category]}`} />
                {f.name}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* ═══════════════════════════════ STATS ═══════════════════════════════ */}
      <Reveal as="section" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            <StaggerItem className="relative pl-6 border-l border-zinc-800/80">
              <p className="text-stat-xl text-zinc-100 min-h-[1em] flex items-center">
                {loading || articleCount == null ? (
                  <span className="inline-flex items-center gap-2" aria-label="Loading article count" role="status">
                    <span className="count-dot" />
                    <span className="count-dot" style={{ animationDelay: '160ms' }} />
                    <span className="count-dot" style={{ animationDelay: '320ms' }} />
                  </span>
                ) : (
                  <CountUp value={articleCount} />
                )}
              </p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-mono">
                Articles indexed
              </p>
            </StaggerItem>
            <StaggerItem className="relative pl-6 border-l border-zinc-800/80">
              <p className="text-stat-xl text-zinc-100">{totalFeeds}</p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-mono">
                Premium sources
              </p>
            </StaggerItem>
            <StaggerItem className="relative pl-6 border-l border-zinc-800/80">
              <p className="text-stat-xl text-zinc-100">{Object.keys(rssFeedsByCategory).length}</p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-mono">
                Categories
              </p>
            </StaggerItem>
            <StaggerItem className="relative pl-6 border-l border-brand/60">
              <p className="text-stat-xl text-brand italic">$0</p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-brand/80 font-mono">
                Per request, forever
              </p>
            </StaggerItem>
          </Stagger>
        </div>
      </Reveal>

      {/* ═══════════════════════════════ QUICK START ═══════════════════════════════ */}
      <section id="quickstart" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-brand font-mono mb-3">
                  01 / Quick Start
                </p>
                <h2 className="text-statement text-zinc-100 max-w-[20ch]">
                  Copy. Paste. <span className="italic text-zinc-400">Ship.</span>
                </h2>
              </div>
              <p className="text-zinc-400 max-w-sm font-body">
                Four endpoints. One curl command. Useful data inside ten seconds.
              </p>
            </div>
          </Reveal>

          <Stagger className="grid md:grid-cols-2 gap-4">
            {examples.map((example, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                  className="group hairline rounded-2xl glass overflow-hidden h-full"
                >
                  <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-mono text-zinc-600">0{i + 1}</span>
                        <p className="text-sm font-semibold text-zinc-100 font-heading tracking-tight">
                          {example.title}
                        </p>
                      </div>
                      <p className="text-xs text-zinc-500 font-body">{example.description}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(example.code, i)}
                      className="shrink-0 px-3 py-1.5 text-[10px] uppercase tracking-wider rounded-full glass-strong text-zinc-300 hover:text-brand transition-colors font-mono"
                    >
                      {copiedIndex === i ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="px-5 pb-5">
                    <div className="px-4 py-3 rounded-lg bg-zinc-950/70 border border-zinc-800/60 overflow-x-auto">
                      <code className="text-sm font-mono text-brand whitespace-nowrap">
                        <span className="text-zinc-600 select-none">$ </span>{example.code}
                      </code>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══════════════════════════════ JSON RESPONSE ═══════════════════════════════ */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-brand font-mono mb-3">
                  02 / Response Shape
                </p>
                <h2 className="text-statement text-zinc-100 max-w-[20ch]">
                  Clean JSON. <span className="italic text-zinc-400">No surprises.</span>
                </h2>
              </div>
              <p className="text-zinc-400 max-w-sm font-body">
                Article metadata, pre-extracted ticker symbols, deterministic pagination.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="hairline rounded-2xl overflow-hidden glass-strong">
              <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800/60">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  </div>
                  <div className="flex items-center gap-2 ml-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                      GET
                    </span>
                    <span className="text-xs font-mono text-zinc-300">api.actually-free-api.vercel.app/api/news</span>
                    <span className="cursor-blink text-emerald-400 font-mono">▍</span>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(exampleResponse, null, 2), 999)}
                  className="text-[10px] uppercase tracking-wider text-zinc-400 hover:text-brand transition-colors font-mono"
                >
                  {copiedIndex === 999 ? '✓ Copied' : 'Copy JSON'}
                </button>
              </div>

              <div className="p-6 overflow-x-auto max-h-[460px] overflow-y-auto bg-zinc-950/70">
                <pre className="text-sm font-mono leading-7">
                  {JSON.stringify(exampleResponse, null, 2).split('\n').map((line, i) => (
                    <div key={i} className="hover:bg-zinc-800/30 px-2 -mx-2 rounded transition-colors">
                      <JsonLine line={line} />
                    </div>
                  ))}
                </pre>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════ SOURCES ═══════════════════════════════ */}
      <section id="sources" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-brand font-mono mb-3">
                  03 / The Network
                </p>
                <h2 className="text-statement text-zinc-100 max-w-[20ch]">
                  {totalFeeds} sources. <span className="italic text-zinc-400">One stream.</span>
                </h2>
              </div>
              <p className="text-zinc-400 max-w-sm font-body">
                Premium financial outlets, polled continuously and de-duplicated.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex flex-wrap gap-2 mb-10">
              <FilterPill
                active={activeCategory === null}
                onClick={() => setActiveCategory(null)}
                label={`All · ${totalFeeds}`}
              />
              {Object.entries(categoryLabels).map(([key, label]) => (
                <FilterPill
                  key={key}
                  active={activeCategory === key}
                  onClick={() => setActiveCategory(activeCategory === key ? null : key)}
                  label={`${label} · ${rssFeedsByCategory[key as keyof typeof rssFeedsByCategory]?.length || 0}`}
                />
              ))}
            </div>
          </Reveal>

          <Stagger stagger={0.04} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(rssFeedsByCategory)
              .filter(([category]) => activeCategory === null || activeCategory === category)
              .flatMap(([category, feeds]) =>
                feeds.map((feed, idx) => (
                  <StaggerItem key={`${category}-${idx}`}>
                    <motion.div
                      whileHover={{ y: -2, borderColor: 'rgba(191,217,255,0.35)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      className="flex items-center gap-3 p-4 rounded-xl border border-zinc-800/70 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors h-full"
                    >
                      <div className={`w-2 h-2 rounded-full shrink-0 ${categoryDotColors[category] || 'bg-zinc-400'}`} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-zinc-100 truncate">{feed.name}</p>
                        <p className="text-[11px] text-zinc-500 mt-0.5 font-mono uppercase tracking-wider">
                          {categoryLabels[category] || category}
                        </p>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))
              )}
          </Stagger>
        </div>
      </section>

      {/* ═══════════════════════════════ ENDPOINTS ═══════════════════════════════ */}
      <section id="endpoints" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-brand font-mono mb-3">
                  04 / Endpoints
                </p>
                <h2 className="text-statement text-zinc-100 max-w-[20ch]">
                  Three routes. <span className="italic text-zinc-400">That's it.</span>
                </h2>
              </div>
              <p className="text-zinc-400 max-w-sm font-body">
                Read-only HTTP. Cached at the edge. Public, deterministic, boring.
              </p>
            </div>
          </Reveal>

          <Stagger className="space-y-3">
            {endpoints.map((ep, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 p-6 rounded-2xl glass hairline hover:bg-zinc-900/50 transition-colors"
                >
                  <div className="flex items-center gap-3 shrink-0 sm:w-[280px]">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                      GET
                    </span>
                    <code className="text-base font-mono text-zinc-100 tracking-tight">{ep.path}</code>
                  </div>
                  <p className="text-sm text-zinc-400 font-body flex-1">{ep.description}</p>
                  <span className="hidden sm:inline-block text-zinc-600 group-hover:text-brand transition-colors text-xl">→</span>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══════════════════════════════ FEATURES ═══════════════════════════════ */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="mb-16">
              <p className="text-[11px] uppercase tracking-[0.2em] text-brand font-mono mb-3">
                05 / Why
              </p>
              <h2 className="text-statement text-zinc-100 max-w-[16ch]">
                Built for developers who'd rather <span className="italic text-zinc-400">just ship.</span>
              </h2>
            </div>
          </Reveal>

          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="hairline group p-7 rounded-2xl glass h-full"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand/10 border border-brand/25 flex items-center justify-center mb-6 text-brand group-hover:bg-brand/15 transition-colors">
                    {f.icon}
                  </div>
                  <h3 className="text-base font-semibold text-zinc-100 mb-2 font-heading tracking-tight">
                    {f.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed font-body">{f.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══════════════════════════════ CTA ═══════════════════════════════ */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="relative hairline rounded-3xl glass-strong p-12 md:p-16 overflow-hidden">
              <div aria-hidden className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-brand/15 blur-3xl" />
              <div aria-hidden className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-brand/10 blur-3xl" />

              <div className="relative">
                <p className="text-[11px] uppercase tracking-[0.2em] text-brand font-mono mb-4">
                  Ready when you are
                </p>
                <h2 className="text-statement text-zinc-100 max-w-[16ch] mb-8">
                  Stop paying for <span className="italic text-zinc-400">public data.</span>
                </h2>
                <div className="flex flex-wrap gap-3">
                  <Magnetic
                    as="a"
                    href="#quickstart"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-zinc-950 rounded-full font-semibold text-sm shadow-[0_8px_32px_-8px_rgba(191,217,255,0.55)]"
                  >
                    Start Building
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Magnetic>
                  <Magnetic
                    as="a"
                    href="https://github.com/mestrovicjozo/ActuallyFreeAPI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-zinc-200 font-semibold text-sm border border-zinc-700 hover:border-zinc-500 transition-colors"
                  >
                    Read the Source
                  </Magnetic>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════ FOOTER ═══════════════════════════════ */}
      <footer className="border-t border-zinc-800/60 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-brand flex items-center justify-center">
              <span className="text-zinc-950 font-heading font-extrabold text-[8px] leading-none">AF</span>
            </div>
            <span className="text-sm text-zinc-300 font-body">ActuallyFreeAPI</span>
            <span className="text-xs text-zinc-600 font-mono ml-2">v1.0</span>
          </div>

          <div className="flex items-center gap-7 text-sm">
            <a href="https://github.com/mestrovicjozo/ActuallyFreeAPI" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-100 transition-colors">GitHub</a>
            <a href="https://github.com/mestrovicjozo/ActuallyFreeAPI#readme" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-100 transition-colors">Docs</a>
            <a href="#quickstart" className="text-zinc-500 hover:text-zinc-100 transition-colors">API</a>
          </div>

          <p className="text-xs text-zinc-600 font-mono uppercase tracking-wider">
            Next.js · Supabase · Edge
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ─────────────────────────────────── helpers ─────────────────────────────────── */

function BlurInWord({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 24, filter: 'blur(14px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-block ${className}`}
    >
      {text}
    </motion.span>
  );
}

function FilterPill({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-xs font-medium transition-all active:scale-[0.96] font-mono uppercase tracking-wider ${
        active
          ? 'bg-brand/15 text-brand border border-brand/40'
          : 'border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-600'
      }`}
    >
      {label}
    </button>
  );
}

function JsonLine({ line }: { line: string }) {
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
