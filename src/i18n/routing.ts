import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['az', 'ru', 'en', 'de'],
  defaultLocale: 'az',
  localeDetection: false,
  pathnames: {
    '/': '/',
    '/about': '/about',
    '/services': '/services',
    '/results': '/results',
    '/blog': '/blog',
    '/contact': '/contact',
    '/consultation': '/consultation',
    '/book': '/book',
    '/login': '/login',
    '/register': '/register',
  },
});
