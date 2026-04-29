'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { Calendar, Tag, ChevronLeft, Share2, Video, User } from 'lucide-react';

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
    <div style={{ paddingTop: '5rem', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <Link href={`/${locale}/blog`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--primary))', textDecoration: 'none', marginBottom: '2rem', fontSize: '0.9rem', fontWeight: 600 }}>
          <ChevronLeft size={16} /> {locale === 'az' ? 'Bloqa qayıt' : locale === 'ru' ? 'Назад в блог' : 'Back to blog'}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-primary">{post.category}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'hsl(var(--foreground)/0.5)', fontSize: '0.85rem' }}>
              <Calendar size={14} /> {date}
            </div>
          </div>

          <h1 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, fontWeight: 300, marginBottom: '2.5rem', color: 'hsl(var(--foreground))' }}>
            {title}
          </h1>

          {/* Author Card (Top) */}
          <div className="glass" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem', borderRadius: 'var(--radius-xl)', marginBottom: '3rem' }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <img src="/logo.png" alt="Logo" style={{ width: '35px', height: 'auto' }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'hsl(var(--foreground))' }}>Leyla Zülfüqarlı</div>
              <div style={{ fontSize: '0.85rem', color: 'hsl(var(--foreground)/0.6)' }}>Doktor, Nutrisioloji, Diyetoloq</div>
            </div>
          </div>

          {post.image_url && !videoId && (
            <div style={{ marginBottom: '3rem', borderRadius: 'var(--radius-2xl)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)' }}>
              <img src={post.image_url} alt={title} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          )}

          <div style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'hsl(var(--foreground)/0.85)', whiteSpace: 'pre-wrap', marginBottom: '3rem' }}>
            {content}
          </div>

          {videoId && (
            <div style={{ marginBottom: '3rem', borderRadius: 'var(--radius-2xl)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)', aspectRatio: '16/9' }}>
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

          {/* Footer Author Card */}
          <div style={{ borderTop: '1px solid hsl(var(--foreground)/0.1)', paddingTop: '3rem', marginTop: '4rem', marginBottom: '6rem' }}>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                 <img src="/logo.png" alt="Logo" style={{ width: '60px', height: 'auto' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 600 }}>Leyla Zülfüqarlı</h3>
                <p style={{ color: 'hsl(var(--foreground)/0.6)', marginBottom: '1.25rem' }}>
                   Doktor, Nutrisioloji, Diyetoloq. Sağlam qidalanma və həyat tərzi üzrə mütəxəssis.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn btn-outline btn-sm" onClick={() => window.print()}><Share2 size={14} /> Paylaş</button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
