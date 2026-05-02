'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResultsClientPage({ locale }: { locale: string }) {
  const t = useTranslations('results');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const results: Array<{
    id: number;
    title: string;
    goal: string;
    video?: string;
    image?: string;
  }> = [
    { id: 1, title: t('case1Title'), goal: t('case1Goal'), video: 'https://www.youtube.com/embed/Qq0KKjlfw2A' },
    { id: 13, title: t('case13Title'), goal: t('case13Goal'), image: '/images/results/result-6.jpg' },
    { id: 12, title: t('case12Title'), goal: t('case12Goal'), video: 'https://www.youtube.com/embed/59hTYRsYxPE' },
    { id: 2, title: t('case2Title'), goal: t('case2Goal'), video: 'https://www.youtube.com/embed/IJM9V7uJHHo' },
    { id: 3, title: t('case3Title'), goal: t('case3Goal'), video: 'https://www.youtube.com/embed/1zQK8Wn1xag' },
    { id: 4, title: t('case4Title'), goal: t('case4Goal'), video: 'https://www.youtube.com/embed/n_pp1dwXl6Y' },
    { id: 5, title: t('case5Title'), goal: t('case5Goal'), video: 'https://www.youtube.com/embed/eaZbsC4gZko' },
    { id: 6, title: t('case6Title'), goal: t('case6Goal'), video: 'https://www.youtube.com/embed/jTspMwR0xIY' },
    { id: 7, title: t('case7Title'), goal: t('case7Goal'), image: '/images/results/result-1.jpeg' },
    { id: 8, title: t('case8Title'), goal: t('case8Goal'), image: '/images/results/result-2.jpeg' },
    { id: 9, title: t('case9Title'), goal: t('case9Goal'), image: '/images/results/result-3.jpeg' },
    { id: 10, title: t('case10Title'), goal: t('case10Goal'), image: '/images/results/result-4.jpeg' },
    { id: 11, title: t('case11Title'), goal: t('case11Goal'), image: '/images/results/result-5.jpeg' },
    { id: 14, title: t('case14Title'), goal: t('case14Goal'), video: 'https://www.youtube.com/embed/nQ7HvRe-GBQ' },
    { id: 15, title: t('case15Title'), goal: t('case15Goal'), video: 'https://www.youtube.com/embed/V52ahTWVEh0' },
    { id: 17, title: t('case17Title'), goal: t('case17Goal'), video: 'https://www.youtube.com/embed/CcSNdIgvXX8' },
    { id: 18, title: t('case18Title'), goal: t('case18Goal'), video: 'https://www.youtube.com/embed/W1WD9m64SBY' },
    { id: 19, title: t('case19Title'), goal: t('case19Goal'), video: 'https://www.youtube.com/embed/NkaGhIg8oZI' },
    { id: 20, title: t('case20Title'), goal: t('case20Goal'), image: '/images/results/result-7.jpg' },
    { id: 21, title: t('case21Title'), goal: t('case21Goal'), image: '/images/results/result-8.jpg' },
    { id: 22, title: t('case22Title'), goal: t('case22Goal'), video: 'https://www.youtube.com/embed/nskecqwttnQ' },
    { id: 23, title: t('case23Title'), goal: t('case23Goal'), image: '/images/results/result-9.png' },
    { id: 24, title: t('case24Title'), goal: t('case24Goal'), video: 'https://www.youtube.com/embed/jMX0uXtOe-4' },
    { id: 25, title: t('case25Title'), goal: t('case25Goal'), video: 'https://www.youtube.com/embed/6gd380BvCEI' },
    { id: 26, title: t('case26Title'), goal: t('case26Goal'), image: '/images/results/result-10.jpg' },
    { id: 27, title: t('case27Title'), goal: t('case27Goal'), video: 'https://www.youtube.com/embed/8Z86wzx_PvY' },
    { id: 28, title: t('case28Title'), goal: t('case28Goal'), image: '/images/results/result-11.jpg' },
    { id: 29, title: t('case29Title'), goal: t('case29Goal'), image: '/images/results/result-12.jpg' },
    { id: 30, title: t('case30Title'), goal: t('case30Goal'), image: '/images/results/result-13.png' },
    { id: 31, title: t('case31Title'), goal: t('case31Goal'), image: '/images/results/result-14.jpg' },
    { id: 32, title: t('case32Title'), goal: t('case32Goal'), image: '/images/results/result-15.png' },
    { id: 33, title: t('case33Title'), goal: t('case33Goal'), image: '/images/results/result-16.jpg' },
    { id: 34, title: t('case34Title'), goal: t('case34Goal'), image: '/images/results/result-17.jpg' },
    { id: 35, title: t('case35Title'), goal: t('case35Goal'), video: 'https://www.youtube.com/embed/NKuLYHV3Aow' },
    { id: 36, title: t('case36Title'), goal: t('case36Goal'), image: '/images/results/result-18.jpg' },
  ];

  const totalPages = Math.ceil(results.length / itemsPerPage);
  const currentItems = results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const stats = [
    { val: '12000+', label: t('statsClients'), icon: '👥' },
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
            <h1 style={{ fontFamily: 'var(--font-space-grotesk),sans-serif', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, letterSpacing: '-0.02em', color: 'hsl(var(--foreground))', marginBottom: '1rem' }}>
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
                <div style={{ fontFamily: 'var(--font-space-grotesk),sans-serif', fontSize: '1.75rem', fontWeight: 700, color: 'hsl(var(--primary))', marginBottom: '0.25rem' }}>{s.val}</div>
                <div style={{ fontSize: '0.8rem', color: 'hsl(var(--foreground)/0.6)', fontWeight: 500 }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results grid */}
      <section style={{ padding: '0 0 3rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '2rem', alignItems: 'start', minHeight: '600px' }}>
            <AnimatePresence mode="wait">
              {currentItems.map((r, i) => (
                <motion.div
                  key={r.id}
                  className="glass hover-glow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  style={{ borderRadius: 'var(--radius)', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}
                >
                  <div style={{ width: '100%', aspectRatio: '4/5', overflow: 'hidden', position: 'relative', background: '#000', flexShrink: 0 }}>
                    {r.video ? (
                      <iframe
                        src={r.video}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                      />
                    ) : r.image ? (
                      <img 
                        src={r.image} 
                        alt={r.title}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#0b0b0b' }}
                      />
                    ) : null}
                  </div>
                  <div style={{ padding: '1.25rem 1.75rem 1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', background: 'hsl(var(--primary)/0.15)', color: 'hsl(var(--primary))', padding: '0.35rem 0.85rem', borderRadius: 20, fontWeight: 600 }}>{r.goal}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-space-grotesk),sans-serif', fontSize: '1.1rem', fontWeight: 600, color: 'hsl(var(--foreground))', lineHeight: 1.4, margin: 0 }}>
                      {r.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '4rem' }}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="glass"
                style={{ padding: '0.75rem 1.25rem', borderRadius: '1rem', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1, color: 'white' }}
              >
                ←
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={currentPage === i + 1 ? 'btn-primary' : 'glass'}
                  style={{ 
                    width: '3rem', 
                    height: '3rem', 
                    borderRadius: '1rem', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    border: 'none',
                    transition: 'all 0.3s ease',
                    color: 'white',
                    backgroundColor: currentPage === i + 1 ? 'hsl(var(--primary))' : 'rgba(255,255,255,0.1)'
                  }}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="glass"
                style={{ padding: '0.75rem 1.25rem', borderRadius: '1rem', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages ? 0.5 : 1, color: 'white' }}
              >
                →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 0 5rem', textAlign: 'center' }}>
        <div className="container">
          <div className="glass" style={{ padding: '4rem 2rem', borderRadius: 'var(--radius)', background: 'hsl(var(--primary)/0.08)' }}>
            <h2 style={{ fontFamily: 'var(--font-space-grotesk),sans-serif', fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: 300, color: 'hsl(var(--foreground))', marginBottom: '1rem' }}>
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
