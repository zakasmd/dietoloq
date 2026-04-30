'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { CheckCircle, Coffee, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const WaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);

const ProductImage = ({ src, alt }: { src: string, alt: string }) => (
  <div style={{ position: 'relative', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
    <div style={{
      position: 'absolute', inset: '10%',
      background: 'radial-gradient(circle at 50% 50%, hsl(var(--primary)/0.4), transparent 70%)',
      borderRadius: '50%', zIndex: 0, filter: 'blur(40px)'
    }} />
    <div className="glass" style={{
      padding: '0.5rem', borderRadius: 'var(--radius-xl)',
      position: 'relative', zIndex: 1, border: '1px solid hsl(var(--glass-border))',
      overflow: 'hidden', background: 'rgba(255,255,255,0.03)'
    }}>
      <Image
        src={src}
        alt={alt}
        width={400}
        height={500}
        style={{ 
          width: '100%', 
          height: 'auto', 
          borderRadius: 'var(--radius)', 
          display: 'block',
          objectFit: 'contain'
        }}
      />
    </div>
  </div>
);

export default function BookPage() {
  const t = useTranslations('book');
  const locale = useLocale();
  const features = ['f1', 'f2', 'f3', 'f4'] as const;

  return (
    <div style={{ paddingTop: '8rem', overflowX: 'hidden', width: '100%', paddingBottom: '10rem' }}>
      <div className="container">
        {/* ─── Header ─── */}
        <header style={{ marginBottom: '5rem', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="eyebrow" style={{ marginBottom: '1rem' }}>🛍️ {t('eyebrow')}</span>
            <h1 className="text-gradient-mint" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, marginBottom: '1.5rem' }}>
              {t('title').replace('Kitab', 'Kitablar və Çaylar')}
            </h1>
            <div className="glass" style={{ padding: '1rem 2rem', borderRadius: '50px', display: 'inline-block', border: '1px solid hsl(var(--primary)/0.2)' }}>
              <p style={{ color: 'hsl(var(--primary))', fontWeight: 600, fontSize: '0.9rem' }}>
                {t('pdfNotice')}
              </p>
            </div>
          </motion.div>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
          
          {/* ─── Section: Books ─── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
            {/* Book 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '4rem', alignItems: 'center' }}>
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <ProductImage src="/images/kitabyeni.jpg" alt={t('title1')} />
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span className="badge badge-primary">{t('bestseller')}</span>
                  <span className="eyebrow">📖 {t('author')}</span>
                </div>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1 }}>{t('title1')}</h2>
                <p style={{ fontSize: '1.1rem', color: 'hsl(var(--muted-foreground))', lineHeight: 1.7 }}>{t('description1')}</p>
                <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {features.map((f) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                      <CheckCircle size={16} className="text-primary" /> {t(`features.${f}`)}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: '1rem' }}>
                  <a href={`https://wa.me/994506684823?text=Salam! ${t('title1')} kitabını sifariş etmək istəyirəm.`} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
                    <WaIcon /> {t('orderWhatsApp')}
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Book 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '4rem', alignItems: 'center' }}>
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', order: locale === 'az' ? 2 : 2 }}>
                <span className="eyebrow">📖 {t('author')}</span>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1 }}>{t('title2')}</h2>
                <p style={{ fontSize: '1.1rem', color: 'hsl(var(--muted-foreground))', lineHeight: 1.7 }}>{t('description2')}</p>
                <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {features.map((f) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                      <CheckCircle size={16} className="text-primary" /> {t(`features2.${f}`)}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: '1rem' }}>
                  <a href={`https://wa.me/994506684823?text=Salam! ${t('title2')} kitabını sifariş etmək istəyirəm.`} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
                    <WaIcon /> {t('orderWhatsApp')}
                  </a>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ order: locale === 'az' ? 1 : 1 }}>
                <ProductImage src="/images/kitab2.png" alt={t('title2')} />
              </motion.div>
            </div>
          </div>

          {/* ─── Section: Teas ─── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <h2 className="text-gradient-mint" style={{ fontSize: '3rem', fontWeight: 800 }}>🍃 {locale === 'az' ? 'Şəfalı Çaylar' : locale === 'ru' ? 'Целебные Чаи' : locale === 'de' ? 'Heiltees' : 'Healing Teas'}</h2>
            </div>

            {/* Tea 1: Relax */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '4rem', alignItems: 'center' }}>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                <ProductImage src="/images/tealakscay.jpg" alt={t('teaTitle1')} />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="eyebrow" style={{ color: 'hsl(var(--primary))' }}>✨ Relax & Calm</div>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 700 }}>{t('teaTitle1')}</h3>
                <p style={{ fontSize: '1.1rem', color: 'hsl(var(--muted-foreground))', lineHeight: 1.7 }}>{t('teaDesc1')}</p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <div className="glass" style={{ padding: '0.75rem 1.25rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Coffee size={18} className="text-primary" /> 100% Natural
                  </div>
                  <div className="glass" style={{ padding: '0.75rem 1.25rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Leaf size={18} className="text-primary" /> Bio-Organic
                  </div>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <a href={`https://wa.me/994506684823?text=Salam! ${t('teaTitle1')} sifariş etmək istəyirəm.`} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                    <WaIcon /> {t('orderBtn')}
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Tea 2: Detox */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '4rem', alignItems: 'center' }}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', order: 2 }}>
                <div className="eyebrow" style={{ color: 'hsl(var(--primary))' }}>🔥 Detox & Energy</div>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 700 }}>{t('teaTitle2')}</h3>
                <p style={{ fontSize: '1.1rem', color: 'hsl(var(--muted-foreground))', lineHeight: 1.7 }}>{t('teaDesc2')}</p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <div className="glass" style={{ padding: '0.75rem 1.25rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle size={18} className="text-primary" /> Metabolism Boost
                  </div>
                  <div className="glass" style={{ padding: '0.75rem 1.25rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Leaf size={18} className="text-primary" /> Detox Formula
                  </div>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <a href={`https://wa.me/994506684823?text=Salam! ${t('teaTitle2')} sifariş etmək istəyirəm.`} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                    <WaIcon /> {t('orderBtn')}
                  </a>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} style={{ order: 1 }}>
                <ProductImage src="/images/detokscay.jpg" alt={t('teaTitle2')} />
              </motion.div>
            </div>
          </div>

        </div>

        {/* ─── Footer CTA ─── */}
        <section style={{ marginTop: '10rem', textAlign: 'center' }}>
          <div className="glass" style={{ padding: '4rem 2rem', borderRadius: '3rem', background: 'hsl(var(--primary)/0.05)', border: '1px solid hsl(var(--primary)/0.1)' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1.5rem' }}>{t('ctaTitle')}</h2>
            <p style={{ fontSize: '1.2rem', color: 'hsl(var(--muted-foreground))', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
              {t('ctaDesc')}
            </p>
            <Link href={`/${locale}/consultation`} className="btn btn-primary btn-xl">
              {t('ctaBtn')}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
