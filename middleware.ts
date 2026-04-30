import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiter (resets on cold start — appropriate for serverless)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 60; // 60 requests per minute per IP

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function isRateLimited(ip: string): { limited: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { limited: false, remaining: RATE_LIMIT_MAX - 1, resetIn: RATE_LIMIT_WINDOW };
  }

  entry.count++;

  if (entry.count > RATE_LIMIT_MAX) {
    return { limited: true, remaining: 0, resetIn: entry.resetTime - now };
  }

  return { limited: false, remaining: RATE_LIMIT_MAX - entry.count, resetIn: entry.resetTime - now };
}

// Evict stale entries periodically to prevent memory leak
function evictStaleEntries() {
  const now = Date.now();
  for (const [ip, entry] of rateLimit) {
    if (now > entry.resetTime) {
      rateLimit.delete(ip);
    }
  }
}

let lastEviction = Date.now();

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only rate-limit API routes
  if (pathname.startsWith('/api/')) {
    const ip = getClientIp(request);

    // Evict stale entries every 5 minutes
    if (Date.now() - lastEviction > 5 * 60 * 1000) {
      evictStaleEntries();
      lastEviction = Date.now();
    }

    const { limited, remaining, resetIn } = isRateLimited(ip);

    if (limited) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil(resetIn / 1000)),
            'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(resetIn / 1000)),
          },
        }
      );
    }

    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', String(RATE_LIMIT_MAX));
    response.headers.set('X-RateLimit-Remaining', String(remaining));
    response.headers.set('X-RateLimit-Reset', String(Math.ceil(resetIn / 1000)));
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
