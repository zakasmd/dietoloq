'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { Calendar, ChevronLeft, Video, Clock, Share2 } from 'lucide-react';

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

// Custom Social Icons (since lucide version is missing them)
const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3l-1.5 5.5Z"/></svg>
);
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

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
  
  const d = new Date(post.created_at);
  const monthsAz = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];
  const monthsRu = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
  const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  let date = '';
  if (locale === 'az') date = `${d.getDate()} ${monthsAz[d.getMonth()]} ${d.getFullYear()}`;
  else if (locale === 'ru') date = `${d.getDate()} ${monthsRu[d.getMonth()]} ${d.getFullYear()}`;
  else date = `${d.getDate()} ${monthsEn[d.getMonth()]} ${d.getFullYear()}`;

  const getYoutubeEmbed = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = post.youtube_url ? getYoutubeEmbed(post.youtube_url) : null;
  const readTime = Math.ceil(content.split(' ').length / 200) + ' dəq';

  // Share handlers
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareOnFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  const shareOnWhatsapp = () => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + shareUrl)}`, '_blank');

  return (
    <div style={{ paddingTop: '10rem', paddingBottom: '12rem', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <Link href={`/${locale}/blog`} className="btn btn-outline btn-sm" style={{ marginBottom: '3rem', borderRadius: '100px' }}>
          <ChevronLeft size={18} /> {locale === 'az' ? 'Bloqa qayıt' : locale === 'ru' ? 'Назад' : 'Back'}
        </Link>

        <motion.article 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass"
          style={{ 
            padding: 'clamp(2rem, 5vw, 5rem)', 
            borderRadius: '2.5rem',
            border: '1px solid hsl(var(--primary)/0.15)',
            boxShadow: 'var(--shadow-glass)'
          }}
        >
          <header style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
              <span className="eyebrow" style={{ fontSize: '0.7rem' }}>{post.category}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem', fontWeight: 600 }}>
                <Calendar size={16} className="text-primary" /> {date}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem', fontWeight: 600 }}>
                <Clock size={16} className="text-primary" /> {readTime} oxuma
              </div>
            </div>

            <h1 className="text-gradient-mint" style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
              lineHeight: 1.1, 
              fontWeight: 800, 
              marginBottom: '3rem',
              letterSpacing: '-0.04em',
              overflowWrap: 'break-word',
              wordBreak: 'break-word'
            }}>
              {title}
            </h1>

            {/* Premium Author Card */}
            <div className="glass-strong" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem 2rem', borderRadius: '2rem', border: '1px solid hsl(var(--primary)/0.2)', width: 'fit-content' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', border: '3px solid hsl(var(--primary)/0.4)', padding: '3px', overflow: 'hidden' }}>
                <img src="/images/logo.jpg" alt="Leyla Zülfüqarlı" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'hsl(var(--foreground))', marginBottom: '0.1rem' }}>Leyla Zülfüqarlı</div>
                <div className="text-gradient-mint" style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Doktor, Nutrisioloji, Diyetoloq</div>
              </div>
            </div>
          </header>

          {post.image_url && (
            <div style={{ marginBottom: '4rem', borderRadius: '2rem', overflow: 'hidden', boxShadow: 'var(--glow-mint)', border: '1px solid hsl(var(--primary)/0.1)' }}>
              <img src={post.image_url} alt={title} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          )}

          <div style={{ 
            fontSize: '1.25rem', 
            lineHeight: 1.8, 
            color: 'hsl(var(--foreground)/0.9)', 
            whiteSpace: 'pre-wrap', 
            fontFamily: 'Inter, system-ui, sans-serif',
            marginBottom: '6rem',
            overflowWrap: 'break-word',
            wordBreak: 'break-word'
          }}>
            {content}
          </div>

          {videoId && (
            <div style={{ marginBottom: '6rem', borderRadius: '2rem', overflow: 'hidden', aspectRatio: '16/9', background: '#000', boxShadow: 'var(--glow-mint)', border: '1px solid hsl(var(--primary)/0.2)' }}>
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

          <footer style={{ borderTop: '1px solid hsl(var(--primary)/0.1)', paddingTop: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
               <span style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem', fontWeight: 700 }}>PAYLAŞIN:</span>
               <div style={{ display: 'flex', gap: '0.75rem' }}>
                 <button onClick={shareOnWhatsapp} className="btn btn-outline" style={{ width: 44, height: 44, borderRadius: '50%', padding: 0, justifyContent: 'center', borderColor: '#25D366', color: '#25D366' }}>
                   <WhatsAppIcon />
                 </button>
                 <button onClick={shareOnFacebook} className="btn btn-outline" style={{ width: 44, height: 44, borderRadius: '50%', padding: 0, justifyContent: 'center', borderColor: '#1877F2', color: '#1877F2' }}>
                   <FacebookIcon />
                 </button>
                 <Link href="https://instagram.com/leylazulfuqarli" target="_blank" className="btn btn-outline" style={{ width: 44, height: 44, borderRadius: '50%', padding: 0, justifyContent: 'center', borderColor: '#E4405F', color: '#E4405F' }}>
                   <InstagramIcon />
                 </Link>
               </div>
            </div>
            <Link href={`/${locale}/blog`} className="btn btn-primary" style={{ borderRadius: '100px' }}>
               Digər Məqalələr
            </Link>
          </footer>
        </motion.article>
      </div>
    </div>
  );
}
