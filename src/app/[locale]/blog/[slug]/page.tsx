'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { Calendar, ChevronLeft, Share2, Video, User } from 'lucide-react';

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

  if (loading) return <div style={{ paddingTop: '10rem', textAlign: 'center' }}>Yüklənir...</div>;
  if (!post) return <div style={{ paddingTop: '10rem', textAlign: 'center' }}>Məqalə tapılmadı.</div>;

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
    <article style={{ paddingTop: '8rem', paddingBottom: '10rem', minHeight: '100vh', background: '#fff' }}>
      <div className="container" style={{ maxWidth: '700px' }}>
        <header style={{ marginBottom: '3rem' }}>
          <Link href={`/${locale}/blog`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#757575', textDecoration: 'none', marginBottom: '2.5rem', fontSize: '0.9rem' }}>
            <ChevronLeft size={16} /> {locale === 'az' ? 'Bloqa qayıt' : locale === 'ru' ? 'Назад' : 'Back'}
          </Link>

          <h1 style={{ 
            fontFamily: 'Space Grotesk, sans-serif', 
            fontSize: 'clamp(2.25rem, 5vw, 3rem)', 
            lineHeight: 1.2, 
            fontWeight: 700, 
            marginBottom: '2rem', 
            color: '#1a1a1a',
            letterSpacing: '-0.03em'
          }}>
            {title}
          </h1>

          {/* Author Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/logo.png" alt="" style={{ width: 28, height: 'auto' }} />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '1rem', color: '#292929' }}>Leyla Zülfüqarlı</div>
              <div style={{ fontSize: '0.85rem', color: '#757575' }}>
                 Doktor, Nutrisioloji, Diyetoloq
              </div>
            </div>
            <div style={{ marginLeft: 'auto', color: '#757575', fontSize: '0.9rem' }}>
              {date}
            </div>
          </div>
        </header>

        {post.image_url && (
          <figure style={{ margin: '0 0 3rem 0', borderRadius: '4px', overflow: 'hidden' }}>
            <img src={post.image_url} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </figure>
        )}

        <div style={{ 
          fontSize: '1.25rem', 
          lineHeight: 1.6, 
          color: '#292929', 
          whiteSpace: 'pre-wrap', 
          fontFamily: 'Inter, sans-serif',
          marginBottom: '4rem'
        }}>
          {content}
        </div>

        {videoId && (
          <div style={{ marginBottom: '4rem', borderRadius: '8px', overflow: 'hidden', aspectRatio: '16/9', background: '#000' }}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <footer style={{ borderTop: '1px solid #eee', paddingTop: '3rem', marginTop: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
               <span style={{ color: '#757575', fontSize: '0.9rem' }}>Kateqoriya:</span>
               <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{post.category}</span>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => window.print()}>
              <Share2 size={16} /> Paylaş
            </button>
          </div>
        </footer>
      </div>
    </article>
  );
}
