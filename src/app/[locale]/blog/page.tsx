'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { Calendar, ChevronRight, ChevronLeft, Clock, ArrowRight } from 'lucide-react';

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

const POSTS_PER_PAGE = 3;

export default function BlogPage() {
  const t = useTranslations('blog');
  const locale = useLocale();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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

  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ paddingTop: '10rem', paddingBottom: '12rem', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <header style={{ marginBottom: '6rem', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="eyebrow" style={{ marginBottom: '1.5rem' }}>✨ {t('eyebrow')}</span>
            <h1 className="text-gradient-mint" style={{ 
              fontSize: 'clamp(3.5rem, 8vw, 6rem)', 
              fontWeight: 800, 
              lineHeight: 0.9,
              marginBottom: '1.5rem'
            }}>
              {t('title')}
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'hsl(var(--muted-foreground))', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
              {t('subtitle')}
            </p>
          </motion.div>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '6rem', color: 'hsl(var(--primary)/0.5)' }}>Yüklənir...</div>
          ) : currentPosts.length > 0 ? (
            currentPosts.map((post, idx) => {
              const title = locale === 'ru' ? post.title_ru || post.title_az : locale === 'en' ? post.title_en || post.title_az : post.title_az;
              const content = locale === 'ru' ? post.content_ru || post.content_az : locale === 'en' ? post.content_en || post.content_az : post.content_az;
              const excerpt = content.length > 250 ? content.substring(0, 250) + '...' : content;
              const date = new Date(post.created_at).toLocaleDateString(locale === 'az' ? 'az-AZ' : locale === 'ru' ? 'ru-RU' : 'en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              });

              return (
                <motion.article 
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.1 }}
                  className="glass hover-glow"
                  style={{ 
                    borderRadius: '2.5rem',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer'
                  }}
                >
                  <Link href={`/${locale}/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '3.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: post.image_url ? '1fr 320px' : '1fr', gap: '4rem', alignItems: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {/* Author Header */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{ width: 50, height: 50, borderRadius: '50%', border: '2px solid hsl(var(--primary)/0.3)', padding: '2px', overflow: 'hidden' }}>
                            <img src="/images/logo.jpg" alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'hsl(var(--foreground))' }}>Leyla Zülfüqarlı</span>
                            <span className="text-gradient-mint" style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Doktor, Nutrisioloji, Diyetoloq</span>
                          </div>
                        </div>

                        <div>
                          <h2 style={{ 
                            fontSize: '2.25rem', 
                            fontWeight: 700, 
                            lineHeight: 1.15, 
                            color: 'hsl(var(--foreground))', 
                            marginBottom: '1rem',
                            letterSpacing: '-0.03em',
                            overflowWrap: 'break-word',
                            wordBreak: 'break-word'
                          }}>
                            {title}
                          </h2>
                          <p style={{ 
                            fontSize: '1.1rem', 
                            lineHeight: 1.7, 
                            color: 'hsl(var(--muted-foreground))', 
                            marginBottom: '2rem',
                            overflowWrap: 'break-word',
                            wordBreak: 'break-word',
                            display: '-webkit-box',
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {excerpt}
                          </p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid hsl(var(--primary)/0.1)', paddingTop: '1.5rem' }}>
                          <div style={{ display: 'flex', gap: '2rem', color: 'hsl(var(--muted-foreground))', fontSize: '0.85rem' }}>
                             <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={16} className="text-primary" /> {date}</span>
                             <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>{post.category}</span>
                          </div>
                          <span className="btn btn-primary btn-sm" style={{ gap: '0.5rem' }}>
                            {locale === 'az' ? 'Davamını oxu' : locale === 'ru' ? 'Читать полностью' : 'Read full story'} <ArrowRight size={16} />
                          </span>
                        </div>
                      </div>

                      {post.image_url && (
                        <div style={{ width: '100%', aspectRatio: '4/5', borderRadius: '2rem', overflow: 'hidden', boxShadow: 'var(--glow-mint)' }}>
                          <img src={post.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="hover-scale" />
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.article>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '8rem' }} className="glass">
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🍃</div>
              <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '1.2rem' }}>Hələ heç bir məqalə paylaşılmayıb.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6rem', gap: '1rem' }}>
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="btn btn-outline" style={{ width: 56, height: 56, padding: 0, justifyContent: 'center' }}>
              <ChevronLeft size={24} />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => paginate(i + 1)} className={`btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline'}`} style={{ width: 56, height: 56, padding: 0, justifyContent: 'center' }}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="btn btn-outline" style={{ width: 56, height: 56, padding: 0, justifyContent: 'center' }}>
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
