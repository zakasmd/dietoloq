'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';

export default function ResultsPage() {
  const t = useTranslations('results');
  const locale = useLocale();

  const results: Array<{
    id: number;
    name: string;
    before: string;
    after: string;
    lost: string;
    duration: string;
    goal: string;
    img?: string;
    video?: string;
  }> = [
    { id: 1, name: 'S.T.', before: '160 kq', after: '130 kq', lost: '-30 kq', duration: `4 ${t('monthLabel')}`, goal: t('goalLoss'), img: '/images/results/result-2.jpg.jpg' },
    { id: 2, name: 'A.K.', before: '94 kq', after: '79 kq', lost: '-15 kq', duration: `2.5 ${t('monthLabel')}`, goal: t('goalLoss'), img: '/images/results/result-1.jpg.jpg' },
    { id: 3, name: 'A.M.', before: '78 kq', after: '65 kq', lost: '-13 kq', duration: `3 ${t('monthLabel')}`, goal: t('goalLoss'), video: 'https://www.youtube.com/embed/ZnHr1I7SIAE' },
    { id: 4, name: 'S.H.', before: '92 kq', after: '80 kq', lost: '-12 kq', duration: `10 ${t('weekLabel')}`, goal: t('goalLoss') },
    { id: 5, name: 'R.Ə.', before: '55 kq', after: '62 kq', lost: '+7 kq', duration: `2 ${t('monthLabel')}`, goal: t('goalGain') },
    { id: 6, name: 'K.S.', before: '85 kq', after: '70 kq', lost: '-15 kq', duration: `4 ${t('monthLabel')}`, goal: t('goalLoss') },
  ];

  const stats = [
    { val: '1000+', label: t('statsClients'), icon: '👥' },
    { val: '100%', label: t('statsSatisfy'), icon: '⭐' },
    { val: '-8 kq', label: t('statsLoss'), icon: '📉' },
    { val: `2 ${t('weekLabel')}`, label: t('statsTime'), icon: '⏱️' },
  ];

  return (
    <div style={{ paddingTop: '5rem' }}>
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
                {r.video ? (
                  <div style={{ margin: '-1.75rem -1.75rem 1.25rem', aspectRatio: '9/16', overflow: 'hidden', position: 'relative' }}>
                    <iframe 
                      src={r.video} 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowFullScreen
                      style={{ width: '100%', height: '100%', border: 'none' }}
                    />
                  </div>
                ) : r.img ? (
                  <div style={{ margin: '-1.75rem -1.75rem 1.25rem', aspectRatio: '9/16', overflow: 'hidden', position: 'relative', backgroundColor: '#000' }}>
                    <img src={r.img} alt="Before After Result" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                ) : null}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'var(--gradient-mint)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Space Grotesk,sans-serif', fontWeight: 700, fontSize: '0.85rem', color: 'hsl(var(--primary-foreground))'
                  }}>
                    {r.name}
                  </div>
                  <span style={{ fontSize: '0.75rem', background: 'hsl(var(--primary)/0.15)', color: 'hsl(var(--primary))', padding: '0.25rem 0.75rem', borderRadius: 20, fontWeight: 600 }}>{r.goal}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ textAlign: 'center', padding: '0.75rem', background: 'hsl(var(--foreground)/0.04)', borderRadius: 10 }}>
                    <div style={{ fontSize: '0.7rem', color: 'hsl(var(--foreground)/0.5)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('beforeLabel')}</div>
                    <div style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: '1.1rem', fontWeight: 600, color: 'hsl(var(--foreground))' }}>{r.before}</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '0.75rem', background: 'hsl(var(--primary)/0.08)', borderRadius: 10, border: '1px solid hsl(var(--primary)/0.2)' }}>
                    <div style={{ fontSize: '0.7rem', color: 'hsl(var(--primary)/0.7)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('afterLabel')}</div>
                    <div style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: '1.1rem', fontWeight: 600, color: 'hsl(var(--primary))' }}>{r.after}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid hsl(var(--foreground)/0.06)' }}>
                  <span style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: '1.25rem', fontWeight: 700, color: 'hsl(var(--primary))' }}>{r.lost}</span>
                  <span style={{ fontSize: '0.8rem', color: 'hsl(var(--foreground)/0.5)' }}>{r.duration}</span>
                </div>
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
