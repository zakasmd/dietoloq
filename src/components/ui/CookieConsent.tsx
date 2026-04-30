'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShow(false);
  };

  const content = {
    az: "Biz saytda təcrübənizi təkmilləşdirmək üçün kuki (cookie) fayllarından istifadə edirik.",
    ru: "Мы используем файлы cookie для улучшения вашего взаимодействия с сайтом.",
    en: "We use cookies to improve your experience on our website."
  };

  const btnText = { az: "Qəbul et", ru: "Принять", en: "Accept" };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="cookie-banner"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          width: 'calc(100% - 2rem)',
          maxWidth: '550px',
        }}
      >
        <div className="glass-strong" style={{ 
          padding: '0.875rem 1.25rem', 
          borderRadius: '1.25rem', 
          display: 'flex', 
          flexDirection: 'row',
          alignItems: 'center', 
          gap: '1rem',
          border: '1px solid hsl(var(--primary)/0.3)',
          boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
        }}>
          <style jsx>{`
            @media (max-width: 640px) {
              .glass-strong {
                padding: 0.625rem 1rem !important;
                gap: 0.75rem !important;
                border-radius: 1rem !important;
              }
              .cookie-icon {
                display: none !important;
              }
              .cookie-text {
                font-size: 0.75rem !important;
                line-height: 1.3 !important;
              }
              .cookie-btn {
                padding: 0.4rem 0.8rem !important;
                font-size: 0.75rem !important;
                min-width: fit-content;
              }
            }
          `}</style>
          <div className="cookie-icon" style={{ background: 'hsl(var(--primary)/0.1)', padding: '0.6rem', borderRadius: '0.75rem', color: 'hsl(var(--primary))', flexShrink: 0 }}>
            <ShieldCheck size={20} />
          </div>
          <div style={{ flex: '1' }}>
            <p className="cookie-text" style={{ fontSize: '0.85rem', lineHeight: 1.4, color: 'hsl(var(--foreground))', margin: 0 }}>
              {content[locale as keyof typeof content] || content.az}
            </p>
          </div>
          <button 
            onClick={accept}
            className="btn btn-primary btn-sm cookie-btn"
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem', whiteSpace: 'nowrap', borderRadius: '0.75rem' }}
          >
            {btnText[locale as keyof typeof content] || btnText.az}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
