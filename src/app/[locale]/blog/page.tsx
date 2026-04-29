'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { Calendar, ChevronRight, ChevronLeft, Clock } from 'lucide-react';

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
    <div style={{ 
      paddingTop: '8rem', 
      paddingBottom: '10rem', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fdf2f8 0%, #faf5ff 50%, #f0f9ff 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 70%)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)', zIndex: 0 }} />

      <div className="container" style={{ maxWidth: '1000px', position: 'relative', zIndex: 1 }}>
        <header style={{ marginBottom: '5rem', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>✍️ Blog</span>
            <h1 style={{ 
              fontFamily: 'Space Grotesk, sans-serif', 
              fontSize: 'clamp(3rem, 7vw, 4.5rem)', 
              fontWeight: 800, 
              letterSpacing: '-0.04em', 
              marginBottom: '1rem',
              background: 'linear-gradient(to right, #1a1a1a, #4a4a4a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Məqalələr
            </h1>
            <div className="divider" style={{ margin: '0 auto 1.5rem' }} />
            <p style={{ fontSize: '1.2rem', color: 'hsl(var(--foreground)/0.6)', maxWidth: '550px', margin: '0 auto' }}>
              Diyetoloq Leyla Zülfüqarlı tərəfindən hazırlanmış qidalanma və sağlamlıq məsləhətləri.
            </p>
          </motion.div>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#999' }}>Yüklənir...</div>
          ) : currentPosts.length > 0 ? (
            currentPosts.map((post, idx) => {
              const title = locale === 'ru' ? post.title_ru || post.title_az : locale === 'en' ? post.title_en || post.title_az : post.title_az;
              const content = locale === 'ru' ? post.content_ru || post.content_az : locale === 'en' ? post.content_en || post.content_az : post.content_az;
              const excerpt = content.length > 200 ? content.substring(0, 200) + '...' : content;
              const date = new Date(post.created_at).toLocaleDateString(locale === 'az' ? 'az-AZ' : locale === 'ru' ? 'ru-RU' : 'en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              });

              return (
                <motion.article 
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="glass hover-glow"
                  style={{ 
                    padding: '2.5rem',
                    borderRadius: 'var(--radius-3xl)',
                    border: '1px solid rgba(255,255,255,0.5)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.03)'
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: post.image_url ? '1fr 280px' : '1fr', gap: '3rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      {/* Author Header */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                          <img src="/images/logo.jpg" alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1a1a1a' }}>Leyla Zülfüqarlı</span>
                          <span style={{ fontSize: '0.7rem', color: 'hsl(var(--primary))', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Doktor, Nutrisioloji, Diyetoloq</span>
                        </div>
                      </div>

                      <div>
                        <Link href={`/${locale}/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                          <h2 style={{ 
                            fontFamily: 'Space Grotesk, sans-serif', 
                            fontSize: '1.75rem', 
                            fontWeight: 700, 
                            lineHeight: 1.25, 
                            color: '#1a1a1a', 
                            marginBottom: '0.75rem',
                            letterSpacing: '-0.02em',
                            transition: 'color 0.2s'
                          }} className="title-hover">
                            {title}
                          </h2>
                        </Link>
                        <p style={{ 
                          fontSize: '1rem', 
                          lineHeight: 1.6, 
                          color: 'hsl(var(--foreground)/0.7)', 
                          marginBottom: '1.5rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {excerpt}
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '1.5rem', color: 'hsl(var(--foreground)/0.4)', fontSize: '0.8rem', fontWeight: 500 }}>
                           <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={14} /> {date}</span>
                           <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={14} /> 5 dəq</span>
                        </div>
                        <Link href={`/${locale}/blog/${post.slug}`} className="btn btn-primary btn-sm" style={{ padding: '0.6rem 1.25rem', borderRadius: '100px' }}>
                          {locale === 'az' ? 'Ətraflı oxu' : locale === 'ru' ? 'Читать далее' : 'Read more'}
                        </Link>
                      </div>
                    </div>

                    {post.image_url && (
                      <Link href={`/${locale}/blog/${post.slug}`} style={{ width: '100%', aspectRatio: '1/1', borderRadius: 'var(--radius-2xl)', overflow: 'hidden', display: 'block' }}>
                        <img src={post.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="hover-scale" />
                      </Link>
                    )}
                  </div>
                </motion.article>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '5rem' }} className="glass">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍃</div>
              <p style={{ color: '#999' }}>Hələ heç bir məqalə paylaşılmayıb.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem', gap: '0.75rem' }}>
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="btn btn-outline" style={{ borderRadius: '50%', width: 50, height: 50, padding: 0, justifyContent: 'center' }}>
              <ChevronLeft size={20} />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => paginate(i + 1)} className={`btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline'}`} style={{ borderRadius: '50%', width: 50, height: 50, padding: 0, justifyContent: 'center' }}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="btn btn-outline" style={{ borderRadius: '50%', width: 50, height: 50, padding: 0, justifyContent: 'center' }}>
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
