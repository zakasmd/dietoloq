import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import BlogClientPage from './BlogClientPage';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

async function getPost(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);
  
  if (!post) {
    return {
      title: 'Məqalə tapılmadı | Dr. Leyla Zülfüqarlı',
    };
  }

  const locale = resolvedParams.locale;
  const title = locale === 'ru' ? post.title_ru || post.title_az : locale === 'en' ? post.title_en || post.title_az : post.title_az;
  const content = locale === 'ru' ? post.content_ru || post.content_az : locale === 'en' ? post.content_en || post.content_az : post.content_az;
  
  // Create a clean description by removing HTML tags and entities
  const cleanDescription = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
    .replace(/&[a-z0-9#]+;/gi, '') // Remove other entities
    .replace(/[#*`]/g, '') // Remove markdown symbols
    .trim()
    .substring(0, 160) + '...';

  const ogImage = post.image_url || '/images/dietolog-1.jpg';

  return {
    title: `${title} | Dr. Leyla Zülfüqarlı`,
    description: cleanDescription,
    openGraph: {
      title: title,
      description: cleanDescription,
      images: [{ url: ogImage }],
      type: 'article',
      publishedTime: post.created_at,
      authors: ['Dr. Leyla Zülfüqarlı'],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: cleanDescription,
      images: [ogImage],
    },
  };
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);
  return <BlogClientPage post={post} locale={resolvedParams.locale} />;
}
