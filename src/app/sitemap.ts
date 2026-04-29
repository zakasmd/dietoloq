import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.leylazulfuqarli.com';
  const locales = ['az', 'ru', 'en'];
  const paths = [
    '',
    '/about',
    '/services',
    '/results',
    '/blog',
    '/contact',
    '/consultation',
    '/book',
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of paths) {
      sitemap.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '/blog' ? 'daily' : 'monthly',
        priority: path === '' ? 1.0 : 0.8,
      });
    }
  }

  return sitemap;
}
