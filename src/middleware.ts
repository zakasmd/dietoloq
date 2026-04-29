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

  // Rate limiting for API and Admin routes
  if (pathname.startsWith('/api') || pathname.startsWith('/admin/login')) {
    const now = Date.now();
    const rateData = rateLimitMap.get(ip) || { count: 0, lastRequest: now };

    // Stricter limit for admin login (3 attempts per minute)
    const threshold = pathname.startsWith('/admin/login') ? 3 : RATE_LIMIT_THRESHOLD;

    if (now - rateData.lastRequest > RATE_LIMIT_WINDOW) {
      rateData.count = 1;
      rateData.lastRequest = now;
    } else {
      rateData.count++;
    }

    rateLimitMap.set(ip, rateData);

    if (rateData.count > threshold) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }
  }

  // Server-side security check for Admin
  if (pathname.startsWith('/admin')) {
    // 1. Secret Key Check for Login Page (Security through obscurity + Brute-force protection)
    // To access login, you now need: /admin/login?key=leyla77
    if (pathname === '/admin/login') {
      const secretKey = request.nextUrl.searchParams.get('key');
      const ADMIN_SECRET = 'leyla77'; // You can change this to something more complex
      
      if (secretKey !== ADMIN_SECRET) {
        // If no secret key, return 404 or redirect to home to hide existence
        return NextResponse.redirect(new URL('/', request.url));
      }
      return NextResponse.next();
    }

    // 2. Auth Check for all other Admin pages
    const { createServerClient } = await import('@supabase/ssr');
    
    // Create a special middleware client
    let response = NextResponse.next();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@dietoloq.az';

    if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Add noindex header
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  // Skip for dashboard and api (standard checks)
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/api')) {
    const response = NextResponse.next();
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/api')) {
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
