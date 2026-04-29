import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/client';

const BASE_URL = 'https://leylazulfuqarli.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient();
  
  // Static pages
  const staticPages = [
    '',
    '/az',
    '/ru',
    '/en',
    '/az/about',
    '/az/services',
    '/az/blog',
    '/az/contact',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Dynamic Blog Posts
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, created_at');

  const blogPages = (posts || []).flatMap((post) => [
    {
      url: `${BASE_URL}/az/blog/${post.slug}`,
      lastModified: new Date(post.created_at),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/ru/blog/${post.slug}`,
      lastModified: new Date(post.created_at),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/en/blog/${post.slug}`,
      lastModified: new Date(post.created_at),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]);

  return [...staticPages, ...blogPages];
}
