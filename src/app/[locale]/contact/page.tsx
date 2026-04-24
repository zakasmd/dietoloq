'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const t = useTranslations('footer');
  const locale = useLocale();

  const contactItems = [
    { icon: Phone, label: 'Telefon', value: '+994 50 668 48 23', href: 'tel:+994506684823', color: 'hsl(var(--primary))' },
    { icon: Mail, label: 'E-mail', value: 'leyla@dietoloq.az', href: 'mailto:leyla@dietoloq.az', color: 'hsl(var(--accent))' },
    { icon: MapPin, label: 'Ünvan', value: 'Bakı, Azərbaycan', href: null, color: 'hsl(var(--secondary))' },
  ];

  return (
    <div style={{ paddingTop: '5rem' }}>
      <section style={{ padding: '5rem 0 4rem', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="eyebrow" style={{ marginBottom: '1rem' }}>📞 Əlaqə</div>
            <h1 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, letterSpacing: '-0.02em', color: 'hsl(var(--foreground))', marginBottom: '1rem' }}>
              Bizimlə əlaqə saxlayın
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'hsl(var(--foreground)/0.7)', maxWidth: '480px', margin: '0 auto' }}>
              Suallarınızı soruşun, məsləhət alın, konsultasiya planlaşdırın
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '0 0 5rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'start' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            >
              <h2 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: '1.5rem', fontWeight: 500, color: 'hsl(var(--foreground))' }}>Birbaşa əlaqə</h2>

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

              <h3 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: '1rem', color: 'hsl(var(--foreground))', marginTop: '0.5rem' }}>Sosial media</h3>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <a href="https://wa.me/994506684823" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  <MessageCircle size={16} /> WhatsApp
                </a>
                <a href="https://www.instagram.com/dietoloqleylazulfuqarli/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', borderColor: '#E1306C', color: '#E1306C' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>
                </a>
                <a href="https://www.youtube.com/@DiyetoloqLeyla" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', borderColor: '#FF0000', color: '#FF0000' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.4 2.8 12 2.8 12 2.8s-4.4 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.3.3 4.3s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.5 21.7 12 21.7 12 21.7s4.4 0 6.8-.2c.6-.1 1.9-.1 3-1.2.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.3v-2C23.3 9.1 23 7 23 7zm-13.5 7V10l5.5 2L9.5 14z"/></svg>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius)', background: 'hsl(var(--primary)/0.08)' }}>
                <h3 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: '1.25rem', fontWeight: 500, color: 'hsl(var(--foreground))', marginBottom: '1rem' }}>
                  🎯 Konsultasiya almaq istəyirsiniz?
                </h3>
                <p style={{ color: 'hsl(var(--foreground)/0.7)', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                  Fərdi qidalanma planınız üçün konsultasiya formumuzu doldurun. 24 saat ərzində sizinlə əlaqə saxlayırıq.
                </p>
                <Link href={`/${locale}/consultation`} className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                  Konsultasiya üçün qeydiyyat
                </Link>
              </div>

              <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius)' }}>
                <h3 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: '1.1rem', fontWeight: 500, color: 'hsl(var(--foreground))', marginBottom: '0.75rem' }}>
                  💬 Sürətli əlaqə
                </h3>
                <p style={{ color: 'hsl(var(--foreground)/0.7)', marginBottom: '1.25rem', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Sualınız varsa, WhatsApp-da birbaşa yazın. Ən qısa müddətdə cavab alacaqsınız.
                </p>
                <a href="https://wa.me/994506684823" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                  <MessageCircle size={18} /> WhatsApp-da yaz
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
