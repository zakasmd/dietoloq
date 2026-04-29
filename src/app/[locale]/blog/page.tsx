'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';

type BlogPost = {
  id: string;
  title_az: string;
  title_ru?: string;
  title_en?: string;
  content_az: string;
  slug: string;
  image_url?: string;
  category: string;
  created_at: string;
  emoji?: string;
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

export default function BlogPage() {
  const t = useTranslations('blog');
  const locale = useLocale();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div style={{ paddingTop: '5rem', overflowX: 'hidden' }}>
      {/* Hero */}
      <section style={{ padding: '5rem 0 3rem', textAlign: 'center' }}>
        <div className="container">
          <motion.div {...fadeUp()}>
            <div className="eyebrow" style={{ marginBottom: '1rem' }}>✍️ {t('eyebrow')}</div>
            <h1 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 300, letterSpacing: '-0.02em', color: 'hsl(var(--foreground))', marginBottom: '1.25rem' }}>
              {t('title')}
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'hsl(var(--foreground)/0.65)', maxWidth: '600px', margin: '0 auto' }}>
              {t('subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts Grid */}
      <section style={{ padding: '0 0 8rem' }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'hsl(var(--foreground)/0.5)' }}>Yüklənir...</div>
          ) : posts.length > 0 ? (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
              gap: '2rem' 
            }}>
              {posts.map((post, idx) => {
                const title = locale === 'ru' ? post.title_ru || post.title_az : locale === 'en' ? post.title_en || post.title_az : post.title_az;
                const date = new Date(post.created_at).toLocaleDateString(locale === 'az' ? 'az-AZ' : locale === 'ru' ? 'ru-RU' : 'en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                });

                return (
                  <motion.article 
                    key={post.id} 
                    {...fadeUp(idx * 0.1)}
                    className="glass hover-glow"
                    style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}
                  >
                    <Link href={`/${locale}/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <div style={{ position: 'relative', height: '220px', overflow: 'hidden', background: 'hsl(var(--primary)/0.05)' }}>
                        {post.image_url ? (
                          <img 
                            src={post.image_url} 
                            alt={title} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                            className="post-image"
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
                            {post.emoji || '📝'}
                          </div>
                        )}
                        <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                          <span className="badge" style={{ background: 'white', color: 'black' }}>{post.category}</span>
                        </div>
                      </div>

                      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <div style={{ fontSize: '0.8rem', color: 'hsl(var(--foreground)/0.5)', marginBottom: '0.75rem', fontWeight: 600 }}>{date}</div>
                        <h2 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.3, marginBottom: '1rem' }}>
                          {title}
                        </h2>
                        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--primary))', fontWeight: 600, fontSize: '0.9rem' }}>
                          {locale === 'az' ? 'Ətraflı oxu' : locale === 'ru' ? 'Читать далее' : 'Read more'} →
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '5rem', border: '1px dashed hsl(var(--foreground)/0.2)', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍃</div>
              <p style={{ color: 'hsl(var(--foreground)/0.6)' }}>Hələ heç bir məqalə paylaşılmayıb.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
