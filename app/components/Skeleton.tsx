// anime.js v4 ready
// Reusable skeleton loading component

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

/**
 * Skeleton Loading Component
 * Displays animated placeholder during content loading
 *
 * @param className - Additional Tailwind classes
 * @param variant - Shape variant (text, circular, rectangular)
 * @param width - Custom width
 * @param height - Custom height
 */
export default function Skeleton({
  className = '',
  variant = 'rectangular',
  width,
  height
}: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%]';

  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  };

  const style = {
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && { height: typeof height === 'number' ? `${height}px` : height })
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      role="status"
      aria-label="Loading..."
    />
  );
}

/**
 * SkeletonGroup - Multiple skeleton lines
 */
interface SkeletonGroupProps {
  lines?: number;
  className?: string;
}

export function SkeletonGroup({ lines = 3, className = '' }: SkeletonGroupProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-4"
          width={`${100 - (i * 10)}%`}
        />
      ))}
    </div>
  );
}
