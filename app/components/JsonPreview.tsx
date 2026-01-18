// anime.js v4 ready
// Optimized JSON preview component with syntax highlighting

'use client';

import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';

interface JsonPreviewProps {
  data: any;
  title?: string;
  maxHeight?: string;
}

/**
 * JSON Preview Component
 * Displays formatted JSON with syntax highlighting and copy functionality
 * Memoizes JSON formatting for performance
 */
export default function JsonPreview({
  data,
  title = "GET /api/news",
  maxHeight = "600px"
}: JsonPreviewProps) {
  const [copied, setCopied] = useState(false);

  // Memoize formatted JSON to prevent re-processing on every render
  // Only recomputes when data changes
  const formattedJson = useMemo(() => {
    return JSON.stringify(data, null, 2);
  }, [data]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md">
        {/* Terminal-style header */}
        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm text-[#0066FF] font-mono font-semibold">
            {title}
          </span>
          <motion.button
            onClick={copyToClipboard}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm text-[#0066FF] hover:text-[#0052CC] transition-colors font-medium"
            aria-label="Copy JSON to clipboard"
          >
            {copied ? 'Copied!' : 'Copy'}
          </motion.button>
        </div>

        {/* JSON Content with scroll */}
        <div
          className="p-6 overflow-x-auto overflow-y-auto bg-gray-50"
          style={{ maxHeight }}
        >
          <pre className="text-sm font-mono text-gray-800">
            <code>{formattedJson}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
