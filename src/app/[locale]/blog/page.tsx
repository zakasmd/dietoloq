'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { Calendar, ChevronRight, User } from 'lucide-react';

type BlogPost = {
  id: string;
  title_az: string;
  title_ru?: string;
  title_en?: string;
  content_az: string;
  content_ru?: string;
  content_en?: string;
  slug: string;
  image_url?: string;
  category: string;
  created_at: string;
};

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
        .order('created_at', { ascending: false })
        .limit(10); // Show more but limit is easy to adjust
      
      if (!error && data) setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '10rem', background: '#fff' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <header style={{ marginBottom: '5rem', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 style={{ 
              fontFamily: 'Space Grotesk, sans-serif', 
              fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
              fontWeight: 700, 
              letterSpacing: '-0.04em', 
              marginBottom: '1rem',
              color: '#1a1a1a'
            }}>
              Blog
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#666', fontWeight: 400 }}>
              {locale === 'az' ? 'Sağlamlıq və qidalanma haqqında ən son yazılar' : locale === 'ru' ? 'Последние статьи о здоровье и питании' : 'Latest articles about health and nutrition'}
            </p>
          </motion.div>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#999' }}>Yüklənir...</div>
          ) : posts.length > 0 ? (
            posts.map((post, idx) => {
              const title = locale === 'ru' ? post.title_ru || post.title_az : locale === 'en' ? post.title_en || post.title_az : post.title_az;
              const content = locale === 'ru' ? post.content_ru || post.content_az : locale === 'en' ? post.content_en || post.content_az : post.content_az;
              const excerpt = content.length > 180 ? content.substring(0, 180) + '...' : content;
              const date = new Date(post.created_at).toLocaleDateString(locale === 'az' ? 'az-AZ' : locale === 'ru' ? 'ru-RU' : 'en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });

              return (
                <motion.article 
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src="/logo.png" alt="" style={{ width: 18, height: 'auto' }} />
                    </div>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#292929' }}>Leyla Zülfüqarlı</span>
                    <span style={{ color: '#757575', fontSize: '0.9rem' }}>·</span>
                    <span style={{ color: '#757575', fontSize: '0.9rem' }}>{date}</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: post.image_url ? '1fr 200px' : '1fr', gap: '2rem', alignItems: 'start' }}>
                    <div>
                      <Link href={`/${locale}/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h2 style={{ 
                          fontFamily: 'Space Grotesk, sans-serif', 
                          fontSize: '1.5rem', 
                          fontWeight: 700, 
                          lineHeight: 1.25, 
                          color: '#292929', 
                          marginBottom: '0.75rem',
                          letterSpacing: '-0.01em'
                        }}>
                          {title}
                        </h2>
                        <p style={{ 
                          fontSize: '1rem', 
                          lineHeight: 1.5, 
                          color: '#757575', 
                          marginBottom: '1.5rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {excerpt}
                        </p>
                      </Link>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ background: '#f2f2f2', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.8rem', color: '#757575' }}>{post.category}</span>
                        <Link href={`/${locale}/blog/${post.slug}`} style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
                          {locale === 'az' ? 'Ətraflı oxu' : locale === 'ru' ? 'Читать далее' : 'Read more'}
                        </Link>
                      </div>
                    </div>
                    {post.image_url && (
                      <div style={{ width: '200px', height: '134px', borderRadius: '4px', overflow: 'hidden' }}>
                        <img src={post.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '5rem', color: '#999' }}>Hələ heç bir məqalə paylaşılmayıb.</div>
          )}
        </div>
      </div>
    </div>
  );
}
