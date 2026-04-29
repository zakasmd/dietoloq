import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Simple in-memory rate limiter for Edge Middleware (Note: resets on instance restart)
const rateLimitMap = new Map<string, { count: number, lastRequest: number }>();
const RATE_LIMIT_THRESHOLD = 10; // 10 requests
const RATE_LIMIT_WINDOW = 60 * 1000; // per minute

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';

  // Rate limiting for API routes
  if (pathname.startsWith('/api')) {
    const now = Date.now();
    const rateData = rateLimitMap.get(ip) || { count: 0, lastRequest: now };

    if (now - rateData.lastRequest > RATE_LIMIT_WINDOW) {
      rateData.count = 1;
      rateData.lastRequest = now;
    } else {
      rateData.count++;
    }

    rateLimitMap.set(ip, rateData);

    if (rateData.count > RATE_LIMIT_THRESHOLD) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }
  }

  // Skip for dashboard, admin and api (after rate limit check)
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin') || pathname.startsWith('/api')) {
    const response = NextResponse.next();
    
    // Add noindex header for sensitive routes to keep them out of search results 
    // without exposing them in robots.txt
    if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/api')) {
      response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    }
    
    return response;
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
