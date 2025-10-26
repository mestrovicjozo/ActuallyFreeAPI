'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'News API', icon: '📰' },
    { href: '/stocks', label: 'Stocks API', icon: '📈' },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/50 border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Actually Free API
          </Link>

          <div className="flex gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      isActive
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                        : 'text-gray-300 hover:text-white hover:bg-purple-500/10'
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
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
