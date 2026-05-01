'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, Clock } from 'lucide-react';

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

// Custom Social Icons
const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.012 2c-5.508 0-9.988 4.48-9.988 9.988 0 1.76.46 3.412 1.26 4.852l-1.284 4.692 4.812-1.26c1.408.768 3.012 1.208 4.712 1.208 5.508 0 9.988-4.48 9.988-9.988C22 6.48 17.52 2 12.012 2zm4.7 13.52c-.22.612-1.284 1.144-1.776 1.208-.456.06-1.04.092-1.644-.104-.376-.124-.852-.288-1.464-.544-2.612-1.092-4.304-3.752-4.436-3.928-.132-.176-1.072-1.428-1.072-2.724 0-1.296.672-1.932.912-2.196.24-.264.524-.332.7-.332s.352.004.504.012c.16.008.376-.06.588.452.22.532.748 1.824.812 1.956.064.132.108.288.02.464-.088.176-.132.288-.264.444-.132.156-.276.348-.396.468-.132.132-.272.276-.116.544.156.268.692 1.144 1.488 1.848.8.712 1.472 1.052 1.74 1.184.268.132.424.112.58-.068.156-.18.664-.772.844-1.036.18-.264.36-.22.608-.132.248.088 1.572.74 1.84 1.876.04.148.04.436-.14.736z" />
  </svg>
);
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

export default function BlogClientPage({ post, locale }: { post: BlogPost | null, locale: string }) {
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

  const [copied, setCopied] = useState(false);

  const shareOnWhatsapp = () => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + window.location.href)}`, '_blank');
  const shareOnFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');

  const shareOnInstagram = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url
        });
      } catch (err) {
        console.error('Sharing failed', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        alert('Linki kopyalamaq mümkün olmadı');
      }
    }
  };

  return (
    <div style={{ paddingTop: '10rem', paddingBottom: '12rem', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <Link href={`/${locale}/blog`} className="btn btn-outline btn-sm" style={{ marginBottom: '2.5rem', borderRadius: '100px' }}>
          <ChevronLeft size={16} /> {locale === 'az' ? 'Bloqa qayıt' : locale === 'ru' ? 'Назад' : 'Back'}
        </Link>

        <motion.article 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="glass"
          style={{ 
            padding: 'clamp(1.5rem, 4vw, 4rem)', 
            borderRadius: '2rem',
            border: '1px solid hsl(var(--primary)/0.15)',
            boxShadow: 'var(--shadow-glass)'
          }}
        >
          <header style={{ marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <span className="eyebrow" style={{ fontSize: '0.65rem' }}>{post.category}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'hsl(var(--muted-foreground))', fontSize: '0.85rem', fontWeight: 600 }}>
                <Calendar size={14} className="text-primary" /> {date}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'hsl(var(--muted-foreground))', fontSize: '0.85rem', fontWeight: 600 }}>
                <Clock size={14} className="text-primary" /> {readTime} oxuma
              </div>
            </div>

            <h1 className="text-gradient-mint blog-title-mobile" style={{ 
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', 
              lineHeight: 1.15, 
              fontWeight: 800, 
              marginBottom: '2.5rem',
              letterSpacing: '-0.03em',
              overflowWrap: 'break-word',
              wordBreak: 'break-word'
            }}>
              {title}
            </h1>

            {/* Premium Author Card */}
            <div className="glass-strong blog-author-badge">
              <div className="blog-author-image-wrap">
                <img src="/images/logo.jpg" alt="Leyla Zülfüqarlı" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'hsl(var(--foreground))', marginBottom: '0.1rem' }}>Dr. Leyla Zülfüqarlı</div>
                <div className="text-gradient-mint blog-author-text" style={{ fontWeight: 800, textTransform: 'uppercase' }}>Həkim-Diyetoloq, Nutrisioloq, Funksional Tibb Həkimi, Anti-Age mütəxəssisi</div>
              </div>
            </div>
          </header>

          {post.image_url && (
            <div style={{ marginBottom: '3.5rem', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: 'var(--glow-mint)', border: '1px solid hsl(var(--primary)/0.1)' }}>
              <img src={post.image_url} alt={title} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          )}

          <div 
            className="blog-content-area"
            style={{ 
              fontSize: '1.15rem', 
              lineHeight: 1.8, 
              color: 'hsl(var(--foreground)/0.9)', 
              fontFamily: 'Inter, system-ui, sans-serif',
              marginBottom: '5rem',
              overflowWrap: 'break-word',
              wordBreak: 'break-word'
            }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <style jsx global>{`
            .blog-content-area strong {
              font-weight: 700;
              color: hsl(var(--foreground));
            }
            .blog-content-area h1, .blog-content-area h2, .blog-content-area h3 {
              font-family: var(--font-space-grotesk), sans-serif;
              margin-top: 2rem;
              margin-bottom: 1rem;
              color: hsl(var(--foreground));
              line-height: 1.2;
            }
            .blog-content-area h1 { font-size: 2rem; }
            .blog-content-area h2 { font-size: 1.75rem; }
            .blog-content-area h3 { font-size: 1.5rem; }
            .blog-content-area ul, .blog-content-area ol {
              margin-bottom: 1.5rem;
              padding-left: 1.5rem;
            }
            .blog-content-area li {
              margin-bottom: 0.5rem;
            }
            .blog-content-area a {
              color: hsl(var(--primary));
              text-decoration: underline;
              text-underline-offset: 4px;
            }
            .blog-content-area p {
              margin-bottom: 1.5rem;
            }
          `}</style>

          {videoId && (
            <div style={{ marginBottom: '5rem', borderRadius: '1.5rem', overflow: 'hidden', aspectRatio: '16/9', background: '#000', boxShadow: 'var(--glow-mint)', border: '1px solid hsl(var(--primary)/0.2)' }}>
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

          <footer style={{ borderTop: '1px solid hsl(var(--primary)/0.1)', paddingTop: '3.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
               <span style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.85rem', fontWeight: 700 }}>PAYLAŞIN:</span>
               <div style={{ display: 'flex', gap: '0.5rem' }}>
                 <button onClick={shareOnWhatsapp} className="btn btn-outline" style={{ width: 40, height: 40, borderRadius: '50%', padding: 0, justifyContent: 'center', borderColor: '#25D366', color: '#25D366' }}>
                   <WhatsAppIcon />
                 </button>
                 <button onClick={shareOnFacebook} className="btn btn-outline" style={{ width: 40, height: 40, borderRadius: '50%', padding: 0, justifyContent: 'center', borderColor: '#1877F2', color: '#1877F2' }}>
                   <FacebookIcon />
                 </button>
                 <button onClick={shareOnInstagram} className="btn btn-outline" style={{ width: 40, height: 40, borderRadius: '50%', padding: 0, justifyContent: 'center', borderColor: '#E4405F', color: '#E4405F', position: 'relative' }}>
                   <InstagramIcon />
                   {copied && (
                     <div style={{ position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-50%)', background: '#333', color: '#fff', fontSize: '10px', padding: '4px 8px', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                       Link kopyalandı
                     </div>
                   )}
                 </button>
               </div>
            </div>
            <Link href={`/${locale}/blog`} className="btn btn-primary btn-sm" style={{ borderRadius: '100px' }}>
               Digər Məqalələr
            </Link>
          </footer>
        </motion.article>
      </div>
    </div>
  );
}
