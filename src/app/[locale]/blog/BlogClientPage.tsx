'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';

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

export default function BlogClientPage({ posts, locale }: { posts: BlogPost[], locale: string }) {
  const t = useTranslations('blog');
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '10rem', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="eyebrow" style={{ marginBottom: '1rem' }}>✨ {t('eyebrow')}</span>
            <h1 className="text-gradient-mint" style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
              fontWeight: 800, 
              lineHeight: 1.1,
              marginBottom: '1rem'
            }}>
              {t('title')}
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'hsl(var(--muted-foreground))', maxWidth: '500px', margin: '0 auto', lineHeight: 1.5 }}>
              {t('subtitle')}
            </p>
          </motion.div>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {currentPosts.length > 0 ? (
            currentPosts.map((post, idx) => {
              const title = locale === 'ru' ? post.title_ru || post.title_az : locale === 'en' ? post.title_en || post.title_az : post.title_az;
              const content = locale === 'ru' ? post.content_ru || post.content_az : locale === 'en' ? post.content_en || post.content_az : post.content_az;
              
              // Helper to strip HTML tags and decode entities for excerpt
              const stripHtml = (html: string) => {
                if (!html) return '';
                const text = html.replace(/<[^>]*>?/gm, '');
                return text.replace(/&nbsp;/g, ' ')
                           .replace(/&amp;/g, '&')
                           .replace(/&lt;/g, '<')
                           .replace(/&gt;/g, '>')
                           .replace(/&quot;/g, '"')
                           .replace(/&#39;/g, "'");
              };
              
              const plainText = stripHtml(content);
              const excerpt = plainText.length > 200 ? plainText.substring(0, 200) + '...' : plainText;
              
              const d = new Date(post.created_at);
              const monthsAz = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];
              const monthsRu = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
              const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
              
              let date = '';
              if (locale === 'az') date = `${d.getDate()} ${monthsAz[d.getMonth()]} ${d.getFullYear()}`;
              else if (locale === 'ru') date = `${d.getDate()} ${monthsRu[d.getMonth()]} ${d.getFullYear()}`;
              else date = `${d.getDate()} ${monthsEn[d.getMonth()]} ${d.getFullYear()}`;

              return (
                <motion.article 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="glass hover-glow"
                  style={{ 
                    borderRadius: '2rem',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer'
                  }}
                >
                  <Link href={`/${locale}/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }} className="blog-card-padding">
                    <div className="blog-card-grid">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Author Header */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div className="blog-author-image-wrap">
                            <img src="/images/logo.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'hsl(var(--foreground))' }}>Dr. Leyla Zülfüqarlı</span>
                            <span className="text-gradient-mint blog-author-text" style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.1rem' }}>Həkim-Diyetoloq, Nutrisioloq, Funksional Tibb Həkimi, Anti-Age mütəxəssisi</span>
                          </div>
                        </div>

                        <div>
                          <h2 className="blog-title-mobile" style={{ 
                            fontSize: '1.75rem', 
                            fontWeight: 700, 
                            lineHeight: 1.2, 
                            color: 'hsl(var(--foreground))', 
                            marginBottom: '0.75rem',
                            letterSpacing: '-0.02em',
                            overflowWrap: 'break-word',
                            wordBreak: 'break-word'
                          }}>
                            {title}
                          </h2>
                          <p style={{ 
                            fontSize: '1rem', 
                            lineHeight: 1.6, 
                            color: 'hsl(var(--muted-foreground))', 
                            marginBottom: '1rem',
                            overflowWrap: 'break-word',
                            wordBreak: 'break-word',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {excerpt}
                          </p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid hsl(var(--primary)/0.1)', paddingTop: '1.25rem' }}>
                          <div style={{ display: 'flex', gap: '1.5rem', color: 'hsl(var(--muted-foreground))', fontSize: '0.8rem' }}>
                             <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={14} className="text-primary" /> {date}</span>
                             <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{post.category}</span>
                          </div>
                          <span className="btn btn-primary btn-sm" style={{ gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                            {t('read_more')} <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>

                      {post.image_url && (
                        <div className="blog-card-image">
                          <img src={post.image_url} alt="" className="hover-scale" />
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.article>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '6rem' }} className="glass">
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🍃</div>
              <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '1.1rem' }}>{t('no_posts')}</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem', gap: '0.75rem' }}>
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="btn btn-outline" style={{ width: 48, height: 48, padding: 0, justifyContent: 'center' }}>
              <ChevronLeft size={20} />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => paginate(i + 1)} className={`btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline'}`} style={{ width: 48, height: 48, padding: 0, justifyContent: 'center' }}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="btn btn-outline" style={{ width: 48, height: 48, padding: 0, justifyContent: 'center' }}>
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
