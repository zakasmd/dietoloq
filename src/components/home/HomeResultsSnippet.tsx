'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HomeResultsSnippet() {
  const t = useTranslations('results');
  
  return (
    <section style={{ padding: '6rem 0', background: 'linear-gradient(to bottom, transparent, hsl(var(--primary)/0.03), transparent)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          {/* Text side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="eyebrow" style={{ marginBottom: '1rem' }}>🏆 {t('eyebrow')}</div>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 300, marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              {t('title')}
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'hsl(var(--foreground)/0.7)', marginBottom: '2.5rem', maxWidth: '480px', lineHeight: 1.6 }}>
              {t('subtitle')}
            </p>
            <Link href="/results" className="btn btn-primary hover-glow" style={{ padding: '1rem 2.5rem', borderRadius: '100px', fontWeight: 500, fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              {t('viewAll')} 
              <span style={{ fontSize: '1.2rem' }}>→</span>
            </Link>
          </motion.div>

          {/* Card side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass hover-glow" style={{ borderRadius: '2rem', overflow: 'hidden', maxWidth: '450px', margin: '0 auto', border: '1px solid hsl(var(--primary)/0.2)', boxShadow: '0 20px 40px -20px hsl(var(--primary)/0.3)' }}>
              <div style={{ width: '100%', aspectRatio: '4/5', background: '#000', position: 'relative' }}>
                <iframe
                  src="https://www.youtube.com/embed/1zQK8Wn1xag"
                  title="Murad Arif Result"
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div style={{ padding: '2rem', background: 'linear-gradient(to bottom, hsl(var(--card)/0.8), hsl(var(--card)))' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'hsl(var(--primary))', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'hsl(var(--primary)/0.1)', padding: '0.4rem 1rem', borderRadius: '100px', display: 'inline-block', marginBottom: '1rem' }}>
                  {t('case3Goal')}
                </span>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem', fontWeight: 400, lineHeight: 1.3, color: 'hsl(var(--foreground))' }}>
                  {t('case3Title')}
                </h3>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
