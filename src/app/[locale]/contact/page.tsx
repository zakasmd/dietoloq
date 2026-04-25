'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const WaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0, display: 'block' }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);
const IgIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, display: 'block' }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>
);
const YtIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0, display: 'block' }}><path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.4 2.8 12 2.8 12 2.8s-4.4 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.3.3 4.3s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.5 21.7 12 21.7 12 21.7s4.4 0 6.8-.2c.6-.1 1.9-.1 3-1.2.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.3v-2C23.3 9.1 23 7 23 7zm-13.5 7V10l5.5 2L9.5 14z"/></svg>
);
const FbIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0, display: 'block' }}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);

export default function ContactPage() {
  const t = useTranslations('contact');
  const locale = useLocale();

  const contactItems = [
    { icon: Phone, label: t('phoneLabel'), value: '+994 50 668 48 23', href: 'tel:+994506684823', color: 'hsl(var(--primary))' },
    { icon: Mail, label: t('emailLabel'), value: 'leyla@dietoloq.az', href: 'mailto:leyla@dietoloq.az', color: 'hsl(var(--accent))' },
    { icon: MapPin, label: t('addressLabel'), value: t('addressValue'), href: null, color: 'hsl(var(--secondary))' },
  ];

  return (
    <div style={{ paddingTop: '5rem' }}>
      <section style={{ padding: '5rem 0 4rem', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="eyebrow" style={{ marginBottom: '1rem' }}>📞 {t('eyebrow')}</div>
            <h1 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, letterSpacing: '-0.02em', color: 'hsl(var(--foreground))', marginBottom: '1rem' }}>
              {t('title')}
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'hsl(var(--foreground)/0.7)', maxWidth: '480px', margin: '0 auto' }}>
              {t('subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '0 0 5rem' }}>
        <div className="container">
          <div className="responsive-grid" style={{ alignItems: 'start', gap: '3rem' }}>
            {/* Left: contact info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            >
              <h2 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: '1.5rem', fontWeight: 500, color: 'hsl(var(--foreground))' }}>
                {t('directContact')}
              </h2>

              {contactItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="glass hover-glow" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem 1.5rem', borderRadius: 'var(--radius)' }}>
                    <div style={{ width: 44, height: 44, background: 'hsl(var(--primary)/0.15)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={20} color={item.color} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'hsl(var(--foreground)/0.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>
                      {item.href ? (
                        <a href={item.href} style={{ fontWeight: 500, color: 'hsl(var(--foreground))', textDecoration: 'none', fontSize: '0.95rem' }}>{item.value}</a>
                      ) : (
                        <div style={{ fontWeight: 500, color: 'hsl(var(--foreground))', fontSize: '0.95rem' }}>{item.value}</div>
                      )}
                    </div>
                  </div>
                );
              })}

              <h3 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: '1rem', color: 'hsl(var(--foreground))', marginTop: '1rem' }}>{t('socialMedia')}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
                <a href="https://wa.me/994506684823" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ justifyContent: 'center', fontSize: '0.85rem', padding: '0.75rem 1rem' }}>
                  <WaIcon /> WhatsApp
                </a>
                <a href="https://www.instagram.com/dietoloqleylazulfuqarli/" target="_blank" rel="noopener noreferrer" className="btn" style={{ justifyContent: 'center', background: '#E1306C', color: 'white', border: 'none', fontSize: '0.85rem', padding: '0.75rem 1rem' }}>
                  <IgIcon /> Instagram
                </a>
                <a href="https://www.facebook.com/diyetoloqleylazulfuqarli/?locale=az_AZ" target="_blank" rel="noopener noreferrer" className="btn" style={{ justifyContent: 'center', background: '#1877F2', color: 'white', border: 'none', fontSize: '0.85rem', padding: '0.75rem 1rem' }}>
                  <FbIcon /> Facebook
                </a>
                <a href="https://www.youtube.com/@DiyetoloqLeyla" target="_blank" rel="noopener noreferrer" className="btn" style={{ justifyContent: 'center', background: '#FF0000', color: 'white', border: 'none', fontSize: '0.85rem', padding: '0.75rem 1rem' }}>
                  <YtIcon /> YouTube
                </a>
              </div>
            </motion.div>

            {/* Right: CTA cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              <div className="glass" style={{ padding: '3rem 2rem', borderRadius: 'var(--radius-xl)', background: 'hsl(var(--primary)/0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>🎯</div>
                <h3 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: '1.5rem', fontWeight: 600, color: 'hsl(var(--foreground))', marginBottom: '1rem', lineHeight: 1.3 }}>
                  {t('consultTitle')}
                </h3>
                <p style={{ color: 'hsl(var(--foreground)/0.7)', marginBottom: '2rem', lineHeight: '1.8', fontSize: '0.95rem', maxWidth: '320px' }}>
                  {t('consultDesc')}
                </p>
                <Link href={`/${locale}/consultation`} className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', display: 'flex', boxSizing: 'border-box', boxShadow: 'var(--glow-mint)' }}>
                  {t('consultBtn')}
                </Link>
              </div>

              <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius)' }}>
                <h3 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: '1.1rem', fontWeight: 500, color: 'hsl(var(--foreground))', marginBottom: '0.75rem' }}>
                  💬 {t('quickTitle')}
                </h3>
                <p style={{ color: 'hsl(var(--foreground)/0.7)', marginBottom: '1.25rem', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  {t('quickDesc')}
                </p>
                <a href="https://wa.me/994506684823" target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem',
                  width: '100%', padding: '0.875rem',
                  background: '#25D366', color: 'white', borderRadius: '10px',
                  fontFamily: 'Space Grotesk,sans-serif', fontWeight: 700, fontSize: '0.95rem',
                  textDecoration: 'none', boxShadow: '0 4px 16px rgba(37,211,102,0.25)',
                  boxSizing: 'border-box',
                }}>
                  <WaIcon /> {t('quickBtn')}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
