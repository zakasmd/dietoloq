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

  if (loading) return <div style={{ paddingTop: '10rem', textAlign: 'center', color: 'hsl(var(--primary))' }}>Yüklənir...</div>;
  if (!post) return <div style={{ paddingTop: '10rem', textAlign: 'center', color: 'hsl(var(--muted-foreground))' }}>Məqalə tapılmadı.</div>;

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
    <div style={{ paddingTop: '10rem', paddingBottom: '12rem', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <Link href={`/${locale}/blog`} className="btn btn-outline btn-sm" style={{ marginBottom: '3rem' }}>
          <ChevronLeft size={18} /> {locale === 'az' ? 'Bloqa qayıt' : locale === 'ru' ? 'Назад' : 'Back'}
        </Link>

        <motion.article 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass"
          style={{ 
            padding: '5rem', 
            borderRadius: 'var(--radius-3xl)',
            border: '1px solid hsl(var(--primary)/0.15)',
            boxShadow: 'var(--shadow-glass)'
          }}
        >
          <header style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginBottom: '2.5rem' }}>
              <span className="eyebrow" style={{ fontSize: '0.7rem' }}>{post.category}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem', fontWeight: 600 }}>
                <Calendar size={16} className="text-primary" /> {date}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem', fontWeight: 600 }}>
                <Clock size={16} className="text-primary" /> {readTime}
              </div>
            </div>

            <h1 className="text-gradient-mint" style={{ 
              fontSize: 'clamp(3rem, 7vw, 5rem)', 
              lineHeight: 1.05, 
              fontWeight: 800, 
              marginBottom: '3rem',
              letterSpacing: '-0.04em'
            }}>
              {title}
            </h1>

            {/* Premium Author Card */}
            <div className="glass-strong" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '2rem', borderRadius: '24px', border: '1px solid hsl(var(--primary)/0.2)' }}>
              <div style={{ width: 70, height: 70, borderRadius: '50%', border: '3px solid hsl(var(--primary)/0.4)', padding: '3px' }}>
                <img src="/images/logo.jpg" alt="Leyla Zülfüqarlı" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'hsl(var(--foreground))', marginBottom: '0.2rem' }}>Leyla Zülfüqarlı</div>
                <div className="text-gradient-mint" style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Doktor, Nutrisioloji, Diyetoloq</div>
              </div>
            </div>
          </header>

          {post.image_url && (
            <div style={{ marginBottom: '5rem', borderRadius: '32px', overflow: 'hidden', boxShadow: 'var(--glow-mint)' }}>
              <img src={post.image_url} alt={title} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          )}

          <div style={{ 
            fontSize: '1.25rem', 
            lineHeight: 1.8, 
            color: 'hsl(var(--foreground)/0.9)', 
            whiteSpace: 'pre-wrap', 
            fontFamily: 'Inter, system-ui, sans-serif',
            marginBottom: '6rem'
          }}>
            {content}
          </div>

          {videoId && (
            <div style={{ marginBottom: '6rem', borderRadius: '32px', overflow: 'hidden', aspectRatio: '16/9', background: '#000', boxShadow: 'var(--glow-mint)', border: '1px solid hsl(var(--primary)/0.2)' }}>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          <footer style={{ borderTop: '1px solid hsl(var(--primary)/0.1)', paddingTop: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
               <span style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem', fontWeight: 700 }}>PAYLAŞIN:</span>
               <button className="btn btn-outline" style={{ width: 50, height: 50, borderRadius: '50%', padding: 0, justifyContent: 'center' }} onClick={() => window.print()}>
                 <Share2 size={20} />
               </button>
            </div>
            <Link href={`/${locale}/blog`} className="btn btn-primary">
               Digər Məqalələr
            </Link>
          </footer>
        </motion.article>
      </div>
    </div>
  );
}
