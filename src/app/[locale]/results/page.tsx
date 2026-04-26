'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';

export default function ResultsPage() {
  const t = useTranslations('results');
  const locale = useLocale();

  const results: Array<{
    id: number;
    title: string;
    goal: string;
    video: string;
  }> = [
    { id: 1, title: t('case1Title'), goal: t('case1Goal'), video: 'https://www.youtube.com/embed/Qq0KKjlfw2A' },
    { id: 2, title: t('case2Title'), goal: t('case2Goal'), video: 'https://www.youtube.com/embed/IJM9V7uJHHo' },
    { id: 3, title: t('case3Title'), goal: t('case3Goal'), video: 'https://www.youtube.com/embed/1zQK8Wn1xag' },
    { id: 4, title: t('case4Title'), goal: t('case4Goal'), video: 'https://www.youtube.com/embed/n_pp1dwXl6Y' },
    { id: 5, title: t('case5Title'), goal: t('case5Goal'), video: 'https://www.youtube.com/embed/eaZbsC4gZko' },
    { id: 6, title: t('case6Title'), goal: t('case6Goal'), video: 'https://www.youtube.com/embed/jTspMwR0xIY' },
  ];

  const stats = [
    { val: '1000+', label: t('statsClients'), icon: '👥' },
    { val: '100%', label: t('statsSatisfy'), icon: '⭐' },
    { val: '-8 kq', label: t('statsLoss'), icon: '📉' },
    { val: `2 ${t('weekLabel')}`, label: t('statsTime'), icon: '⏱️' },
  ];

  return (
    <div style={{ paddingTop: '5rem', overflowX: 'hidden', width: '100%' }}>
      <section style={{ padding: '5rem 0 4rem', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="eyebrow" style={{ marginBottom: '1rem' }}>📊 {t('eyebrow')}</div>
            <h1 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, letterSpacing: '-0.02em', color: 'hsl(var(--foreground))', marginBottom: '1rem' }}>
              {t('title')}
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'hsl(var(--foreground)/0.7)', maxWidth: '520px', margin: '0 auto' }}>
              {t('subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '0 0 4rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', justifyContent: 'center' }}>
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="glass hover-glow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ padding: '1.5rem', borderRadius: 'var(--radius)', textAlign: 'center' }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{s.icon}</div>
                <div style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: '1.75rem', fontWeight: 700, color: 'hsl(var(--primary))', marginBottom: '0.25rem' }}>{s.val}</div>
                <div style={{ fontSize: '0.8rem', color: 'hsl(var(--foreground)/0.6)', fontWeight: 500 }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results grid */}
      <section style={{ padding: '0 0 5rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '2rem', alignItems: 'start' }}>
            {results.map((r, i) => (
              <motion.div
                key={r.id}
                className="glass hover-glow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{ padding: '1.75rem', borderRadius: 'var(--radius)', overflow: 'hidden' }}
              >
                {r.video && (
                  <div style={{ margin: '-1.75rem -1.75rem 1.25rem', aspectRatio: '9/16', overflow: 'hidden', position: 'relative', background: '#000' }}>
                    <iframe 
                      src={r.video} 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowFullScreen
                      style={{ width: '100%', height: '100%', border: 'none' }}
                    />
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', background: 'hsl(var(--primary)/0.15)', color: 'hsl(var(--primary))', padding: '0.35rem 0.85rem', borderRadius: 20, fontWeight: 600 }}>{r.goal}</span>
                </div>
                <h3 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: '1.2rem', fontWeight: 600, color: 'hsl(var(--foreground))', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                  {r.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 0 5rem', textAlign: 'center' }}>
        <div className="container">
          <div className="glass" style={{ padding: '4rem 2rem', borderRadius: 'var(--radius)', background: 'hsl(var(--primary)/0.08)' }}>
            <h2 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: 300, color: 'hsl(var(--foreground))', marginBottom: '1rem' }}>
              {t('ctaTitle')}
            </h2>
            <p style={{ color: 'hsl(var(--foreground)/0.7)', marginBottom: '2rem' }}>{t('ctaSubtitle')}</p>
            <Link href={`/${locale}/consultation`} className="btn btn-primary btn-lg">{t('ctaButton')}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
