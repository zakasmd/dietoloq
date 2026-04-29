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
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          width: '90%',
          maxWidth: '500px',
        }}
      >
        <div className="glass-strong" style={{ 
          padding: '1.5rem', 
          borderRadius: '1.5rem', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1.5rem',
          border: '1px solid hsl(var(--primary)/0.3)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
        }}>
          <div style={{ background: 'hsl(var(--primary)/0.1)', padding: '0.75rem', borderRadius: '1rem', color: 'hsl(var(--primary))' }}>
            <ShieldCheck size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.4, color: 'hsl(var(--foreground))' }}>
              {content[locale as keyof typeof content] || content.az}
            </p>
          </div>
          <button 
            onClick={accept}
            className="btn btn-primary btn-sm"
            style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
          >
            {btnText[locale as keyof typeof content] || btnText.az}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
