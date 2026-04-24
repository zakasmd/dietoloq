'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Home, AlertTriangle } from 'lucide-react';

export default function LocaleNotFound() {
  const locale = useLocale();

  const texts: Record<string, { title: string; desc: string; btn: string }> = {
    az: { title: 'Səhifə tapılmadı', desc: 'Axtardığınız səhifə mövcud deyil.', btn: 'Ana Səhifəyə Qayıt' },
    ru: { title: 'Страница не найдена', desc: 'Запрашиваемая страница не существует.', btn: 'Вернуться на главную' },
    en: { title: 'Page Not Found', desc: 'The page you are looking for does not exist.', btn: 'Back to Home' },
  };

  const t = texts[locale] || texts.az;

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 50%, #CCFBF1 100%)',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '480px' }}>
        <div style={{
          width: 72, height: 72,
          background: 'linear-gradient(135deg, #059669, #0D9488)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.5rem',
          boxShadow: '0 12px 32px rgba(5,150,105,0.25)',
        }}>
          <AlertTriangle size={32} color="white" />
        </div>

        <div style={{
          fontSize: '5rem', fontWeight: 900,
          fontFamily: 'var(--font-heading)',
          background: 'linear-gradient(135deg, #059669 0%, #0D9488 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1, marginBottom: '1rem',
        }}>404</div>

        <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem' }}>
          {t.title}
        </h1>
        <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>{t.desc}</p>

        <Link href={`/${locale}`} style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'linear-gradient(135deg, #059669, #0D9488)',
          color: 'white', padding: '0.875rem 2rem',
          borderRadius: '9999px',
          fontFamily: 'var(--font-heading)', fontWeight: 600,
          boxShadow: '0 8px 24px rgba(5,150,105,0.3)',
        }}>
          <Home size={18} /> {t.btn}
        </Link>
      </div>
    </div>
  );
}
