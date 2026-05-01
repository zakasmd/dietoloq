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
  
  // Create a description from the first 160 characters
  const description = content.replace(/[#*`]/g, '').substring(0, 160) + '...';

  return {
    title: `${title} | Dr. Leyla Zülfüqarlı`,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: post.image_url ? [{ url: post.image_url }] : [],
      type: 'article',
      publishedTime: post.created_at,
      authors: ['Dr. Leyla Zülfüqarlı'],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: post.image_url ? [post.image_url] : [],
    },
  };
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);
  return <BlogClientPage post={post} locale={resolvedParams.locale} />;
}
