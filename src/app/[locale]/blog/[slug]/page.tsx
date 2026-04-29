'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { Calendar, ChevronLeft, Share2, Video, User, Clock } from 'lucide-react';

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
  youtube_url?: string;
  category: string;
  created_at: string;
};

export default function BlogPostPage() {
  const params = useParams();
  const locale = useLocale();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', params.slug)
        .single();
      
      if (!error && data) setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [params.slug]);

  if (loading) return <div style={{ paddingTop: '10rem', textAlign: 'center', color: '#999' }}>Yüklənir...</div>;
  if (!post) return <div style={{ paddingTop: '10rem', textAlign: 'center', color: '#999' }}>Məqalə tapılmadı.</div>;

  const title = locale === 'ru' ? post.title_ru || post.title_az : locale === 'en' ? post.title_en || post.title_az : post.title_az;
  const content = locale === 'ru' ? post.content_ru || post.content_az : locale === 'en' ? post.content_en || post.content_az : post.content_az;
  const date = new Date(post.created_at).toLocaleDateString(locale === 'az' ? 'az-AZ' : locale === 'ru' ? 'ru-RU' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const getYoutubeEmbed = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = post.youtube_url ? getYoutubeEmbed(post.youtube_url) : null;
  const readTime = Math.ceil(content.split(' ').length / 200) + ' dəq';

  return (
    <article style={{ paddingTop: '8rem', paddingBottom: '12rem', minHeight: '100vh', background: '#fff' }}>
      <div className="container" style={{ maxWidth: '750px' }}>
        <header style={{ marginBottom: '3.5rem' }}>
          <Link href={`/${locale}/blog`} style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: '#757575', 
            textDecoration: 'none', 
            marginBottom: '3rem', 
            fontSize: '0.9rem',
            fontWeight: 500
          }}>
            <ChevronLeft size={16} /> {locale === 'az' ? 'Bloqa qayıt' : locale === 'ru' ? 'Назад' : 'Back'}
          </Link>

          <h1 style={{ 
            fontFamily: 'Space Grotesk, sans-serif', 
            fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', 
            lineHeight: 1.15, 
            fontWeight: 800, 
            marginBottom: '2rem', 
            color: '#1a1a1a',
            letterSpacing: '-0.04em'
          }}>
            {title}
          </h1>

          {/* Enhanced Author Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '3rem', padding: '1.5rem 0', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img src="/images/logo.jpg" alt="Leyla Zülfüqarlı" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.1rem' }}>
                <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1a1a1a' }}>Leyla Zülfüqarlı</span>
                <span className="badge badge-primary" style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem' }}>Müəllif</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>
                {locale === 'az' ? 'Doktor, Nutrisioloji, Diyetoloq' : locale === 'ru' ? 'Доктор, Нутрициолог, Диетолог' : 'Doctor, Nutriologist, Dietitian'}
              </div>
            </div>
            <div style={{ textAlign: 'right', display: 'none' }}>
              {/* Desktop metadata */}
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem', color: '#94a3b8', fontSize: '0.875rem', fontWeight: 500 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={16} /> {date}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={16} /> {readTime} oxuma
            </div>
          </div>
        </header>

        {post.image_url && (
          <figure style={{ margin: '0 0 3.5rem 0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
            <img src={post.image_url} alt={title} style={{ width: '100%', height: 'auto', display: 'block' }} />
          </figure>
        )}

        <div style={{ 
          fontSize: '1.2rem', 
          lineHeight: 1.8, 
          color: '#2d3748', 
          whiteSpace: 'pre-wrap', 
          fontFamily: 'Inter, system-ui, sans-serif',
          marginBottom: '4.5rem',
          letterSpacing: '-0.01em'
        }}>
          {content}
        </div>

        {videoId && (
          <div style={{ marginBottom: '4.5rem', borderRadius: '16px', overflow: 'hidden', aspectRatio: '16/9', background: '#000', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <footer style={{ borderTop: '1px solid #f0f0f0', paddingTop: '3.5rem', marginTop: '5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
               <span style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600 }}>Kateqoriya:</span>
               <span style={{ 
                  background: '#f8fafc', 
                  padding: '0.4rem 0.9rem', 
                  borderRadius: '100px', 
                  fontSize: '0.8rem', 
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                  border: '1px solid #e2e8f0'
               }}>
                 {post.category}
               </span>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-outline btn-sm" style={{ gap: '0.5rem' }} onClick={() => window.print()}>
                <Share2 size={16} /> Paylaş
              </button>
            </div>
          </div>
          
          {/* Final Author Bio */}
          <div style={{ marginTop: '5rem', background: '#f8fafc', borderRadius: '20px', padding: '2.5rem', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
               <img src="/images/logo.jpg" alt="Leyla Zülfüqarlı" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Leyla Zülfüqarlı</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>
                Doktor, Nutrisioloji, Diyetoloq. Sağlam qidalanma və həyat tərzi üzrə mütəxəssis. 15 ildən artıq təcrübə ilə minlərlə insana sağlamlıq yolunda bələdçilik edir.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}
