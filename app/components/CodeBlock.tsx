// anime.js v4 ready
// Optimized code block component with copy functionality

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { slideInFromLeft } from '@/app/utils/animations';
import { useInView } from '@/app/hooks/useInView';

interface CodeBlockProps {
  title: string;
  description: string;
  code: string;
  index?: number;
}

/**
 * Code Block Component
 * Displays code examples with copy functionality and lazy animations
 */
export default function CodeBlock({
  title,
  description,
  code,
  index = 0
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#0066FF] transition-all shadow-sm hover:shadow-md"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {title}
            </h3>
            <p className="text-sm text-gray-600">
              {description}
            </p>
          </div>
          <motion.button
            onClick={copyToClipboard}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1 text-sm bg-[#0066FF]/10 text-[#0066FF] rounded-md hover:bg-[#0066FF]/20 transition-colors font-medium border border-[#0066FF]/20"
            aria-label={`Copy ${title} code`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </motion.button>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto border border-gray-200">
          <code className="text-sm font-mono text-gray-800 whitespace-pre">
            {code}
          </code>
        </div>
      </div>
    </motion.div>
  );
}
