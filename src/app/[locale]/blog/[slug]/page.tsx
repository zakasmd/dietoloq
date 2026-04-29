'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { Calendar, ChevronLeft, Share2, Video, Clock } from 'lucide-react';

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

  return (
    <div style={{ 
      paddingTop: '8rem', 
      paddingBottom: '12rem', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fdf2f8 0%, #faf5ff 50%, #f0f9ff 100%)'
    }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <Link href={`/${locale}/blog`} className="btn btn-outline btn-sm" style={{ marginBottom: '3rem', padding: '0.5rem 1rem', borderRadius: '100px' }}>
          <ChevronLeft size={16} /> {locale === 'az' ? 'Bloqa qayıt' : locale === 'ru' ? 'Назад' : 'Back'}
        </Link>

        <motion.article 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass"
          style={{ 
            padding: '4rem', 
            borderRadius: 'var(--radius-3xl)',
            border: '1px solid rgba(255,255,255,0.6)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.05)'
          }}
        >
          <header style={{ marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
              <span className="badge badge-primary">{post.category}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.85rem', fontWeight: 600 }}>
                <Calendar size={14} /> {date}
              </div>
            </div>

            <h1 style={{ 
              fontFamily: 'Space Grotesk, sans-serif', 
              fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
              lineHeight: 1.1, 
              fontWeight: 800, 
              marginBottom: '2.5rem', 
              color: '#1a1a1a',
              letterSpacing: '-0.04em'
            }}>
              {title}
            </h1>

            {/* Author Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem', background: 'rgba(255,255,255,0.4)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.5)' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '3px solid white' }}>
                <img src="/images/logo.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1a1a1a' }}>Leyla Zülfüqarlı</div>
                <div style={{ fontSize: '0.85rem', color: 'hsl(var(--primary))', fontWeight: 700 }}>Doktor, Nutrisioloji, Diyetoloq</div>
              </div>
            </div>
          </header>

          {post.image_url && (
            <div style={{ marginBottom: '4rem', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
              <img src={post.image_url} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          )}

          <div style={{ 
            fontSize: '1.25rem', 
            lineHeight: 1.8, 
            color: '#334155', 
            whiteSpace: 'pre-wrap', 
            fontFamily: 'Inter, system-ui, sans-serif',
            marginBottom: '5rem'
          }}>
            {content}
          </div>

          {videoId && (
            <div style={{ marginBottom: '5rem', borderRadius: '24px', overflow: 'hidden', aspectRatio: '16/9', background: '#000', boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          <footer style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
               <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>Paylaş:</span>
               <button className="btn btn-outline btn-sm" style={{ width: 40, height: 40, borderRadius: '50%', padding: 0, justifyContent: 'center' }} onClick={() => window.print()}>
                 <Share2 size={16} />
               </button>
            </div>
            <Link href={`/${locale}/blog`} className="btn btn-primary btn-sm">
               Daha çox oxu
            </Link>
          </footer>
        </motion.article>
      </div>
    </div>
  );
}
