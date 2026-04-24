'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%)',
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

        <h1 style={{
          fontSize: '1.75rem',
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          color: '#0F172A',
          marginBottom: '0.75rem',
        }}>Xəta baş verdi</h1>

        <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
          Bir problem yarandı. Yenidən cəhd edin.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={reset}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'linear-gradient(135deg, #059669, #0D9488)',
              color: 'white', padding: '0.875rem 1.75rem',
              borderRadius: '9999px', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-heading)', fontWeight: 600,
              boxShadow: '0 8px 24px rgba(5,150,105,0.3)',
            }}
          >
            <RefreshCw size={16} /> Yenidən cəhd et
          </button>

          <Link href="/az" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'white', color: '#059669',
            padding: '0.875rem 1.75rem', borderRadius: '9999px',
            border: '2px solid #059669',
            fontFamily: 'var(--font-heading)', fontWeight: 600,
          }}>
            Ana Səhifə
          </Link>
        </div>
      </div>
    </div>
  );
}
