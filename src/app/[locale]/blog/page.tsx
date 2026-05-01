import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import BlogClientPage from './BlogClientPage';

type Props = {
  params: Promise<{ locale: string }>;
};

async function getPosts() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });
  return data || [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<string, string> = {
    az: 'Blog | Dr. Leyla Zülfüqarlı',
    ru: 'Блог | Д-р Лейла Зульфугарлы',
    en: 'Blog | Dr. Leyla Zülfüqarlı',
    de: 'Blog | Dr. Leyla Zülfüqarlı',
  };

  const descriptions: Record<string, string> = {
    az: 'Sağlam qidalanma, diyetologiya və faydalı məsləhətlər haqqında ən son məqalələr. Dr. Leyla Zülfüqarlıdan peşəkar tövsiyələr.',
    ru: 'Последние статьи о здоровом питании, диетологии и полезные советы. Профессиональные рекомендации от д-ра Лейлы Зульфугарлы.',
    en: 'The latest articles on healthy nutrition, dietetics, and useful tips. Professional recommendations from Dr. Leyla Zülfüqarlı.',
    de: 'Die neuesten Artikel über gesunde Ernährung, Diätetik und nützliche Tipps. Professionelle Empfehlungen von Dr. Leyla Zülfüqarlı.',
  };

  return {
    title: titles[locale] || titles.az,
    description: descriptions[locale] || descriptions.az,
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const posts = await getPosts();
  return <BlogClientPage posts={posts} locale={locale} />;
}
