'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { TrendingDown, TrendingUp, Leaf, Droplets, Mic, CheckCircle, FlaskConical } from 'lucide-react';

const serviceKeys = ['weightLoss', 'weightGain', 'antiAging', 'consultation', 'detox', 'media'] as const;

const serviceConfig = [
  { icon: TrendingDown, color: '#059669', bg: '#ECFDF5', popular: true },
  { icon: TrendingUp, color: '#0D9488', bg: '#CCFBF1', popular: false },
  { icon: Leaf, color: '#F59E0B', bg: '#FFF7ED', popular: false },
  { icon: Droplets, color: '#3B82F6', bg: '#EFF6FF', popular: false },
  { icon: FlaskConical, color: '#10B981', bg: '#F0FDF4', popular: false },
  { icon: Mic, color: '#6366F1', bg: '#EEF2FF', popular: false },
];

const featureMap: Record<string, string[]> = {
  weightLoss: ['Fərdi kalori hesablaması', 'Həftəlik menyu planı', 'Su qəbulu planı', 'Nəticə izlənməsi'],
  weightGain: ['Yüksək kalorili plan', 'Protein optimallaşdırma', 'Müntəzəm izləmə', 'Fərdi yanaşma'],
  antiAging: ['Antioxidant plan', 'Dəri sağlamlığı', 'Hormon balansı', 'Gənclik qidalanması'],
  consultation: ['Su qəbulu planı', 'Qidalanma vərdişi', 'Diet nəzarəti', 'Yönləndirilmə'],
  detox: ['Detoks çayı', 'Həftəlik proqram', 'Bədən təmizliyi', 'Qidalanma planı'],
  media: ['Korporativ seminar', 'Media çıxışı', 'Online məruzə', 'Q&A sessiyası'],
};

export default function ServicesPage() {
  const t = useTranslations('services');
  const locale = useLocale();

  return (
    <div style={{ paddingTop: '5rem' }}>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%)',
        padding: '5rem 0 4rem',
        textAlign: 'center',
        borderBottom: '1px solid var(--color-primary-100)',
      }}>
        <div className="container">
          <div className="section-label" style={{ display: 'inline-flex', marginBottom: '1rem' }}>💼 {t('title')}</div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>{t('title')}</h1>
          <div className="divider" />
          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', maxWidth: '540px', margin: '0 auto' }}>
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.75rem' }}>
            {serviceKeys.map((key, index) => {
              const cfg = serviceConfig[index];
              const Icon = cfg.icon;
              return (
                <div
                  key={key}
                  className="card"
                  style={{
                    position: 'relative',
                    border: cfg.popular ? '2px solid var(--color-primary)' : '1px solid var(--color-border-light)',
                  }}
                >
                  {cfg.popular && (
                    <div style={{
                      position: 'absolute', top: '-1px', right: '1.5rem',
                      background: 'var(--gradient-primary)', color: 'white',
                      padding: '0.3rem 0.85rem', borderRadius: '0 0 12px 12px',
                      fontSize: '0.72rem', fontWeight: 700, fontFamily: 'var(--font-heading)',
                    }}>
                      ⭐ Populyar
                    </div>
                  )}
                  <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      <div style={{
                        width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                        background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon size={24} color={cfg.color} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.05rem', marginBottom: '0.2rem' }}>{t(`items.${key}.title`)}</h3>
                        <span style={{ fontSize: '0.775rem', color: cfg.color, fontWeight: 600, fontFamily: 'var(--font-heading)' }}>
                          {t('learnMore')}
                        </span>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: '1.65' }}>
                      {t(`items.${key}.desc`)}
                    </p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {featureMap[key].map((f) => (
                        <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--color-text-secondary)' }}>
                          <CheckCircle size={14} color="var(--color-primary)" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div style={{ marginTop: 'auto' }}>
                      <Link href={`/${locale}/consultation`} className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                        {t('learnMore')}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--gradient-primary)', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>Hansı xidmət sizin üçündür?</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '2rem' }}>Pulsuz ilk konsultasiyada birgə müzakirə edək</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`/${locale}/consultation`} className="btn btn-white btn-lg">Konsultasiya al</Link>
            <a href="https://wa.me/994506684823" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">WhatsApp</a>
          </div>
        </div>
      </section>
    </div>
  );
}
