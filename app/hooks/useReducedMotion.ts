// anime.js v4 ready
// Hook to respect user's motion preferences

'use client';

import { useEffect, useState } from 'react';

/**
 * Hook that detects if user prefers reduced motion
 * Respects prefers-reduced-motion media query
 * Updates dynamically if user changes system preferences
 *
 * @returns {boolean} true if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if window is defined (SSR safety)
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Legacy browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return prefersReducedMotion;
}

/**
 * Helper function to conditionally apply animations
 * Returns empty object if reduced motion is preferred
 *
 * @param animation - Animation config object
 * @param prefersReducedMotion - Result from useReducedMotion hook
 * @returns Animation config or empty object
 */
export function conditionalAnimation(
  animation: any,
  prefersReducedMotion: boolean
) {
  return prefersReducedMotion ? {} : animation;
}
