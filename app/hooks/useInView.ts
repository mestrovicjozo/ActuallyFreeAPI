// anime.js v4 ready
// Intersection Observer hook for lazy animations

'use client';

import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions extends IntersectionObserverInit {
  triggerOnce?: boolean; // Animate only once when entering viewport
}

/**
 * Hook that detects when an element enters the viewport
 * Useful for lazy-loading animations and content
 *
 * @param options - IntersectionObserver options
 * @returns { ref, isInView, entry } - Ref to attach, visibility state, and observer entry
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
) {
  const { triggerOnce = true, threshold = 0.1, ...observerOptions } = options;

  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([observerEntry]) => {
        setEntry(observerEntry);

        if (observerEntry.isIntersecting) {
          setIsInView(true);

          // Disconnect if triggerOnce is enabled
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          // Allow toggling if triggerOnce is false
          setIsInView(false);
        }
      },
      {
        threshold,
        ...observerOptions
      }
    );

    observer.observe(element);

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [threshold, triggerOnce, observerOptions]);

  return { ref, isInView, entry };
}

/**
 * Hook for detecting multiple elements entering viewport
 * Useful for staggered animations of list items
 *
 * @param count - Number of items to track
 * @param options - IntersectionObserver options
 * @returns Array of { ref, isInView } for each item
 */
export function useMultiInView<T extends HTMLElement = HTMLDivElement>(
  count: number,
  options: UseInViewOptions = {}
) {
  const items = Array.from({ length: count }, () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useInView<T>(options);
  });

  return items;
}
