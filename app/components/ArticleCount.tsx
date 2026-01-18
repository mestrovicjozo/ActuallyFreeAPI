// anime.js v4 ready
// Optimized article count component with proper error handling

'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { scaleIn, springScale } from '@/app/utils/animations';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';

export default function ArticleCount() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const controller = new AbortController();

    // Use relative URL to work in both dev and production
    fetch('/api/stats', { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setCount(data.totalArticles || 0);
        setLoading(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error('Failed to fetch stats:', err);
          setError(true);
          setCount(0); // Fallback
          setLoading(false);
        }
      });

    // Cleanup: abort fetch on unmount
    return () => controller.abort();
  }, []);

  // Respect reduced motion preferences
  const containerAnimation = prefersReducedMotion ? {} : scaleIn;
  const numberAnimation = prefersReducedMotion
    ? {}
    : { ...springScale, transition: { ...springScale.transition, delay: 0.6 } };

  return (
    <motion.div
      {...containerAnimation}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="mb-16 text-center"
    >
      <div className="inline-block bg-white rounded-2xl border border-gray-200 px-8 py-6 shadow-md">
        <p className="text-gray-600 text-lg mb-2">Currently Available</p>
        <div className="flex items-baseline gap-3 justify-center min-h-[60px]">
          {loading ? (
            // Loading state with spinner - maintains width
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12">
                {/* Spinning circle */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 rounded-full border-4 border-gray-200 border-t-[#0066FF]"
                />
              </div>
              <span className="text-2xl font-bold text-[#0066FF] animate-pulse">Loading...</span>
            </div>
          ) : error ? (
            // Error state with fallback message
            <div className="flex items-center gap-3">
              <span className="text-4xl">⚠️</span>
              <span className="text-2xl text-gray-500">Updating...</span>
            </div>
          ) : (
            // Success state with animated number
            <>
              <motion.span
                {...numberAnimation}
                className="text-5xl md:text-6xl font-bold text-[#0066FF]"
              >
                {count?.toLocaleString() || '0'}
              </motion.span>
              <span className="text-5xl md:text-6xl font-bold text-gray-900">articles</span>
            </>
          )}
        </div>
        {error && (
          <p className="text-xs text-gray-500 mt-2">
            Unable to fetch live count
          </p>
        )}
      </div>
    </motion.div>
  );
}
