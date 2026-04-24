'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Award, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.4 2.8 12 2.8 12 2.8s-4.4 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.3.3 4.3s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.5 21.7 12 21.7 12 21.7s4.4 0 6.8-.2c.6-.1 1.9-.1 3-1.2.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.3v-2C23.3 9.1 23 7 23 7zm-13.5 7V10l5.5 2L9.5 14z"/>
  </svg>
);

export default function AboutPage() {
  const t = useTranslations('about');
  const ct = useTranslations('cta');
  const locale = useLocale();

  const stats = [
    { icon: <Clock size={20} color="var(--color-primary)" />, val: '8+', key: 'experience' },
    { icon: <Award size={20} color="var(--color-primary)" />, val: '15+', key: 'certificates' },
    { icon: <Users size={20} color="var(--color-primary)" />, val: '200+', key: 'clients' },
  ] as const;

  return (
    <div style={{ paddingTop: '5rem' }}>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%)',
        padding: '5rem 0 4rem',
        borderBottom: '1px solid var(--color-primary-100)',
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '4rem', alignItems: 'center' }}>
            {/* Image */}
            <motion.div
              style={{ position: 'relative' }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div style={{
                position: 'absolute', bottom: '-20px', left: '-20px', right: '20px', top: '20px',
                background: 'linear-gradient(135deg, var(--color-primary-200) 0%, var(--color-primary-100) 100%)',
                borderRadius: 'var(--radius-2xl)',
              }} />
              <Image
                src="/images/dietolog-1.jpg"
                alt="Leyla Zülfüqarlı"
                width={460}
                height={520}
                unoptimized
                style={{ borderRadius: 'var(--radius-2xl)', position: 'relative', zIndex: 1, width: '100%', height: 'auto', objectFit: 'cover', boxShadow: 'var(--shadow-xl)' }}
              />
            </motion.div>

            {/* Text */}
            <motion.div
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="section-label">✦ {t('title')}</div>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>Leyla Zülfüqarlı</h1>
              <div className="divider divider-left" />
              <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--color-text-secondary)' }}>
                {t('bio1')}
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.8', color: 'var(--color-text-secondary)' }}>
                {t('bio2')}
              </p>

              {/* Stats */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {stats.map((s) => (
                  <div key={s.key} className="card card-body" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flex: 1, minWidth: '110px', padding: '1rem 1.25rem' }}>
                    {s.icon}
                    <div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-text)' }}>{s.val}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{t(s.key)}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link href={`/${locale}/consultation`} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                {ct('button')}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Services */}
      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            {/* Mission */}
            <div style={{ background: 'linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-primary-100) 100%)', padding: '2.5rem', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--color-primary-200)' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🎯 {t('missionTitle')}</h2>
              <p style={{ lineHeight: '1.8' }}>{t('missionText1')}</p>
              <br />
              <p style={{ lineHeight: '1.8' }}>{t('missionText2')}</p>
            </div>

            {/* Services */}
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>💼 {t('servicesTitle')}</h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {(t.raw('servicesList') as string[]).map((s: string, i: number) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--color-primary)', fontWeight: 700, marginTop: '2px', flexShrink: 0 }}>✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #ECFDF5 0%, #fff 100%)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-label" style={{ display: 'inline-flex', marginBottom: '1rem' }}>🏆 {t('certsLabel')}</div>
            <h2>{t('certsTitle')}</h2>
            <div className="divider" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', maxWidth: '900px', margin: '0 auto' }}>
            {(t.raw('certsList') as string[]).map((cert: string, i: number) => (
              <div key={i} className="card card-body" style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>🏅</div>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="section-header">
            <h2>{t('socialTitle')}</h2>
            <div className="divider" />
            <p>{t('socialDesc')}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="https://www.youtube.com/@DiyetoloqLeyla" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg" style={{ gap: '0.5rem' }}>
              <YoutubeIcon />
              YouTube
            </a>
            <a href="https://www.instagram.com/dietoloqleylazulfuqarli/" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg" style={{ gap: '0.5rem', borderColor: '#E1306C', color: '#E1306C' }}>
              <InstagramIcon />
              Instagram
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--gradient-primary)', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>{ct('title')}</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '2rem' }}>{ct('subtitle')}</p>
          <Link href={`/${locale}/consultation`} className="btn btn-white btn-lg">
            {ct('button')}
          </Link>
        </div>
      </section>
    </div>
  );
}
