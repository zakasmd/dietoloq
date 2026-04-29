'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { Calendar, ChevronRight, User, ChevronLeft } from 'lucide-react';

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

  // Pagination logic
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '10rem', background: '#fff' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        <header style={{ marginBottom: '5rem', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 style={{ 
              fontFamily: 'Space Grotesk, sans-serif', 
              fontSize: 'clamp(3rem, 7vw, 5rem)', 
              fontWeight: 800, 
              letterSpacing: '-0.05em', 
              marginBottom: '1rem',
              color: '#1a1a1a'
            }}>
              Blog
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#666', fontWeight: 400, maxWidth: '500px', margin: '0 auto' }}>
              {locale === 'az' ? 'Sağlamlıq, qidalanma və həyat tərzi haqqında peşəkar tövsiyələr' : locale === 'ru' ? 'Профессиональные советы по здоровью и питанию' : 'Professional advice on health, nutrition and lifestyle'}
            </p>
          </motion.div>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#999' }}>Yüklənir...</div>
          ) : currentPosts.length > 0 ? (
            currentPosts.map((post, idx) => {
              const title = locale === 'ru' ? post.title_ru || post.title_az : locale === 'en' ? post.title_en || post.title_az : post.title_az;
              const content = locale === 'ru' ? post.content_ru || post.content_az : locale === 'en' ? post.content_en || post.content_az : post.content_az;
              const excerpt = content.length > 250 ? content.substring(0, 250) + '...' : content;
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
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  style={{ 
                    borderBottom: idx === currentPosts.length - 1 ? 'none' : '1px solid #f0f0f0',
                    paddingBottom: '5rem'
                  }}
                >
                  {/* Author Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      <img src="/images/logo.jpg" alt="Leyla Zülfüqarlı" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1rem', color: '#292929', lineHeight: 1.2 }}>Leyla Zülfüqarlı</div>
                      <div style={{ fontSize: '0.8rem', color: '#757575', fontWeight: 500 }}>
                        {locale === 'az' ? 'Doktor, Nutrisioloji, Diyetoloq' : locale === 'ru' ? 'Доктор, Нутрициолог, Диетолог' : 'Doctor, Nutriologist, Dietitian'}
                      </div>
                    </div>
                    <span style={{ color: '#e0e0e0', margin: '0 0.5rem' }}>·</span>
                    <span style={{ color: '#757575', fontSize: '0.85rem' }}>{date}</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: post.image_url ? '1fr 240px' : '1fr', gap: '2.5rem', alignItems: 'start' }}>
                    <div>
                      <Link href={`/${locale}/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h2 style={{ 
                          fontFamily: 'Space Grotesk, sans-serif', 
                          fontSize: '1.75rem', 
                          fontWeight: 700, 
                          lineHeight: 1.3, 
                          color: '#1a1a1a', 
                          marginBottom: '1rem',
                          letterSpacing: '-0.02em'
                        }}>
                          {title}
                        </h2>
                        <p style={{ 
                          fontSize: '1.05rem', 
                          lineHeight: 1.6, 
                          color: '#555', 
                          marginBottom: '1.5rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {excerpt}
                        </p>
                      </Link>
                      
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ 
                          background: '#f8fafc', 
                          padding: '0.4rem 0.9rem', 
                          borderRadius: '100px', 
                          fontSize: '0.75rem', 
                          fontWeight: 600,
                          color: '#64748b',
                          border: '1px solid #f1f5f9'
                        }}>
                          {post.category}
                        </span>
                        <Link href={`/${locale}/blog/${post.slug}`} style={{ 
                          color: 'var(--color-primary)', 
                          fontWeight: 700, 
                          fontSize: '0.95rem', 
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}>
                          {locale === 'az' ? 'Ətraflı oxu' : locale === 'ru' ? 'Читать далее' : 'Read more'} <ChevronRight size={18} />
                        </Link>
                      </div>
                    </div>
                    
                    {post.image_url && (
                      <Link href={`/${locale}/blog/${post.slug}`} style={{ width: '240px', height: '160px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'block' }}>
                        <img src={post.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="hover-scale" />
                      </Link>
                    )}
                  </div>
                </motion.article>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '5rem', color: '#999' }}>Hələ heç bir məqalə paylaşılmayıb.</div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '4rem' }}>
            <button 
              onClick={() => paginate(currentPage - 1)} 
              disabled={currentPage === 1}
              style={{ 
                background: 'none', border: '1px solid #e2e8f0', borderRadius: '50%', width: 40, height: 40, 
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                opacity: currentPage === 1 ? 0.4 : 1
              }}
            >
              <ChevronLeft size={20} />
            </button>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  style={{
                    width: 40, height: 40, borderRadius: '50%', border: 'none',
                    background: currentPage === i + 1 ? 'var(--gradient-primary)' : 'transparent',
                    color: currentPage === i + 1 ? 'white' : '#64748b',
                    fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease'
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === totalPages}
              style={{ 
                background: 'none', border: '1px solid #e2e8f0', borderRadius: '50%', width: 40, height: 40, 
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                opacity: currentPage === totalPages ? 0.4 : 1
              }}
            >
              <ChevronRight size={20} />
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
