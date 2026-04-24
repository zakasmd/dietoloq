'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  // Try to get locale, fallback to 'az'
  let locale = 'az';
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    locale = useLocale();
  } catch {}

  const texts: Record<string, { code: string; title: string; desc: string; btn: string }> = {
    az: { code: '404', title: 'Səhifə tapılmadı', desc: 'Axtardığınız səhifə mövcud deyil və ya köçürülüb.', btn: 'Ana Səhifəyə Qayıt' },
    ru: { code: '404', title: 'Страница не найдена', desc: 'Запрашиваемая страница не существует или была перемещена.', btn: 'Вернуться на главную' },
    en: { code: '404', title: 'Page Not Found', desc: 'The page you are looking for does not exist or has been moved.', btn: 'Back to Home' },
  };

  const t = texts[locale] || texts.az;

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 50%, #CCFBF1 100%)',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '480px' }}>
        {/* Icon */}
        <div style={{
          width: 80, height: 80,
          background: 'linear-gradient(135deg, #059669, #0D9488)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 2rem',
          boxShadow: '0 12px 32px rgba(5,150,105,0.25)',
        }}>
          <AlertTriangle size={36} color="white" />
        </div>

        {/* 404 */}
        <div style={{
          fontSize: '6rem',
          fontWeight: 900,
          fontFamily: 'var(--font-heading)',
          background: 'linear-gradient(135deg, #059669 0%, #0D9488 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1,
          marginBottom: '1rem',
        }}>
          {t.code}
        </div>

        <h1 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          color: '#0F172A',
          marginBottom: '0.75rem',
        }}>
          {t.title}
        </h1>

        <p style={{
          color: '#475569',
          lineHeight: 1.7,
          marginBottom: '2rem',
          fontSize: '1rem',
        }}>
          {t.desc}
        </p>

        <Link
          href={`/${locale}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'linear-gradient(135deg, #059669, #0D9488)',
            color: 'white',
            padding: '0.875rem 2rem',
            borderRadius: '9999px',
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            fontSize: '0.95rem',
            textDecoration: 'none',
            boxShadow: '0 8px 24px rgba(5,150,105,0.3)',
            transition: 'all 0.2s ease',
          }}
        >
          <Home size={18} />
          {t.btn}
        </Link>
      </div>
    </div>
  );
}
