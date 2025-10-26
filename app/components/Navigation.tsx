'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'News', icon: '📰', activeColor: 'purple' },
    { href: '/stocks', label: 'Stocks', icon: '📈', activeColor: 'green' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gradient-to-b from-black/40 via-black/20 to-transparent border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center group-hover:border-purple-400/50 transition-all">
                <span className="text-2xl">🚀</span>
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Actually Free API
                </h1>
                <p className="text-xs text-gray-500">No auth required</p>
              </div>
            </motion.div>
          </Link>

          {/* Navigation Items */}
          <div className="flex gap-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const colorClasses = isActive
                ? item.activeColor === 'green'
                  ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/50 text-green-300 shadow-lg shadow-green-500/20'
                  : 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 text-purple-300 shadow-lg shadow-purple-500/20'
                : 'bg-black/20 border-white/10 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/5';

              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-5 py-2.5 rounded-xl font-semibold transition-all border backdrop-blur-sm ${colorClasses}`}
                  >
                    <span className="mr-2 text-lg">{item.icon}</span>
                    <span className="hidden sm:inline">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
