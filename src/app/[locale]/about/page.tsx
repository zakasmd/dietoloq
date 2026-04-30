'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Award, Clock, Users, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

export default function AboutPage() {
  const t = useTranslations('about');
  const ct = useTranslations('cta');
  const nav = useTranslations('nav');
  const locale = useLocale();

  const stats = [
    { icon: Clock, val: t('experienceVal'), key: 'experience' },
    { icon: Award, val: t('certificatesVal'), key: 'certificates' },
    { icon: Users, val: t('clientsVal'), key: 'clients' },
  ] as const;

  return (
    <div style={{ paddingTop: '5rem', overflowX: 'hidden', width: '100%' }}>
      {/* ─── Hero ─── */}
      <section style={{ padding: '3rem 0 2.5rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '3rem', alignItems: 'center' }}>
            {/* Image */}
            <motion.div {...fadeUp()} style={{ position: 'relative', width: '100%', maxWidth: '420px', margin: '0 auto' }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 50% 50%, hsl(var(--primary)/0.25), transparent 70%)',
                borderRadius: '50%', filter: 'blur(40px)', zIndex: 0,
              }} />
              <div className="glass" style={{
                borderRadius: 'var(--radius)', overflow: 'hidden',
                position: 'relative', zIndex: 1,
                border: '1px solid hsl(var(--glass-border))',
              }}>
                <Image
                  src="/images/dietolog-1.jpg"
                  alt="Leyla Zülfüqarlı"
                  width={440}
                  height={520}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                />
              </div>

              {/* Badge */}
              <div className="glass" style={{
                position: 'absolute', bottom: '1.5rem', right: '0',
                padding: '0.875rem 1.25rem', borderRadius: 'var(--radius)',
                display: 'flex', alignItems: 'center', gap: '0.75rem', zIndex: 2,
                boxShadow: 'var(--shadow-glass)',
              }}>
                <span style={{ fontSize: '1.5rem' }}>🏅</span>
                <div>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '0.95rem', color: 'hsl(var(--foreground))' }}>{t('certsBadgeTitle')}</div>
                  <div style={{ fontSize: '0.7rem', color: 'hsl(var(--primary))', fontWeight: 500 }}>{t('certsBadgeSub')}</div>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div {...fadeUp(0.15)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
              <div className="eyebrow">❖ {t('title')}</div>
              <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, letterSpacing: '-0.02em', color: 'hsl(var(--foreground))', lineHeight: 1.1 }}>
                {nav('brandName').split(' ')[0]} <span className="text-gradient-mint">{nav('brandName').split(' ').slice(1).join(' ')}</span>
              </h1>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'hsl(var(--foreground)/0.75)' }}>{t('bio1')}</p>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.8', color: 'hsl(var(--foreground)/0.65)' }}>{t('bio2')}</p>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.8', color: 'hsl(var(--foreground)/0.65)' }}>{t('bio3')}</p>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.8', color: 'hsl(var(--foreground)/0.65)' }}>{t('bio4')}</p>

              {/* Stats */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {stats.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.key} className="glass hover-glow" style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      padding: '1rem 1.25rem', borderRadius: 'var(--radius)', flex: '1 1 100px',
                    }}>
                      <Icon size={20} color="hsl(var(--primary))" />
                      <div>
                        <div style={{ fontFamily: 'Space Grotesk,sans-serif', fontWeight: 600, fontSize: '1.25rem', color: 'hsl(var(--primary))' }}>{s.val}</div>
                        <div style={{ fontSize: '0.72rem', color: 'hsl(var(--foreground)/0.65)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t(s.key)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Link href={`/${locale}/consultation`} className="btn btn-primary" style={{ alignSelf: 'center', width: '100%', justifyContent: 'center', boxSizing: 'border-box' }}>
                {ct('button')}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Mission & Services ─── */}
      <section style={{ padding: '2.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '2rem', alignItems: 'start' }}>
            {/* Mission */}
            <motion.div {...fadeUp()} className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius)' }}>
              <h2 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: '1.5rem', fontWeight: 500, color: 'hsl(var(--foreground))', marginBottom: '1rem' }}>
                🎯 {t('missionTitle')}
              </h2>
              <p style={{ color: 'hsl(var(--foreground)/0.75)', lineHeight: '1.8' }}>{t('missionText1')}</p>
              <br />
              <p style={{ color: 'hsl(var(--foreground)/0.65)', lineHeight: '1.8' }}>{t('missionText2')}</p>
            </motion.div>

            {/* Services List */}
            <motion.div {...fadeUp(0.1)} className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius)' }}>
              <h2 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: '1.5rem', fontWeight: 500, color: 'hsl(var(--foreground))', marginBottom: '1.25rem' }}>
                💼 {t('servicesTitle')}
              </h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {(t.raw('servicesList') as string[]).map((s: string, i: number) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem', color: 'hsl(var(--foreground)/0.8)', lineHeight: 1.6 }}>
                    <CheckCircle size={16} color="hsl(var(--primary))" style={{ flexShrink: 0, marginTop: '2px' }} />
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Certificates ─── */}
      <section style={{ padding: '2.5rem 0' }}>
        <div className="container">
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div className="eyebrow" style={{ marginBottom: '1rem' }}>🏆 {t('certsLabel')}</div>
            <h2 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 300, color: 'hsl(var(--foreground))' }}>{t('certsTitle')}</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '1rem', maxWidth: '900px', margin: '0 auto' }}>
            {(t.raw('certsList') as string[]).map((cert: string, i: number) => (
              <motion.div key={i} {...fadeUp(i * 0.08)} className="glass hover-glow" style={{ textAlign: 'center', padding: '1.75rem 1.25rem', borderRadius: 'var(--radius)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🏅</div>
                <p style={{ fontSize: '0.875rem', color: 'hsl(var(--foreground)/0.85)', fontWeight: 500 }}>{cert}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Media & Interviews ─── */}
      <section style={{ padding: '2.5rem 0', background: 'hsl(var(--primary)/0.02)' }}>
        <div className="container">
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="eyebrow" style={{ marginBottom: '1rem' }}>📺 {t('interviewsTitle')}</div>
            <h2 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 300, color: 'hsl(var(--foreground))', marginBottom: '1rem' }}>
              {t('interviewsTitle')}
            </h2>
            <p style={{ color: 'hsl(var(--foreground)/0.65)', maxWidth: '700px', margin: '0 auto' }}>{t('interviewsDesc')}</p>
          </motion.div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', 
            gap: '1rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {(t.raw('interviews') as { title: string, url: string }[]).map((item, i) => (
              <motion.a 
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                {...fadeUp(i * 0.05)}
                className="glass hover-glow"
                style={{ 
                  padding: '1.25rem', 
                  borderRadius: 'var(--radius)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  textDecoration: 'none',
                  transition: 'transform 0.2s ease'
                }}
              >
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '10px', 
                  background: 'hsl(var(--primary)/0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'hsl(var(--primary))' }}>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </div>
                <span style={{ 
                  fontSize: '0.9rem', 
                  color: 'hsl(var(--foreground)/0.85)', 
                  fontWeight: 500,
                  lineHeight: 1.4
                }}>
                  {item.title}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Social ─── */}
      <section style={{ padding: '2.5rem 0' }}>
        <div className="container">
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 300, color: 'hsl(var(--foreground))' }}>{t('socialTitle')}</h2>
            <p style={{ marginTop: '1rem', color: 'hsl(var(--foreground)/0.65)' }}>{t('socialDesc')}</p>
          </motion.div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="https://www.youtube.com/@DiyetoloqLeyla" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.4 2.8 12 2.8 12 2.8s-4.4 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.3.3 4.3s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.5 21.7 12 21.7 12 21.7s4.4 0 6.8-.2c.6-.1 1.9-.1 3-1.2.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.3v-2C23.3 9.1 23 7 23 7zm-13.5 7V10l5.5 2L9.5 14z"/></svg>
              YouTube
            </a>
            <a href="https://www.instagram.com/dietoloqleylazulfuqarli/" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg" style={{ borderColor: '#E1306C', color: '#E1306C' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>
              Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ padding: '2.5rem 0', textAlign: 'center' }}>
        <div className="container">
          <div className="glass" style={{ padding: '2.5rem 1.5rem', borderRadius: 'var(--radius)', background: 'hsl(var(--primary)/0.1)' }}>
            <h2 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 300, color: 'hsl(var(--foreground))', marginBottom: '1rem' }}>{ct('title')}</h2>
            <p style={{ color: 'hsl(var(--foreground)/0.7)', marginBottom: '2rem' }}>{ct('subtitle')}</p>
            <Link href={`/${locale}/consultation`} className="btn btn-primary btn-lg">
              {ct('button')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
