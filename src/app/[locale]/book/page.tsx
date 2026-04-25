'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);

export default function BookPage() {
  const t = useTranslations('book');
  const locale = useLocale();
  const features = ['f1', 'f2', 'f3', 'f4'] as const;

  return (
    <div style={{ paddingTop: '5rem' }}>
      {/* ─── Hero / Intro ─── */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '3rem', alignItems: 'center' }}>
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ position: 'relative', width: '100%', maxWidth: '400px', margin: '0 auto' }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 50% 50%, hsl(var(--primary)/0.2), transparent 70%)',
                borderRadius: '50%', zIndex: 0,
              }} />
              <div className="glass" style={{
                padding: '1rem', borderRadius: 'var(--radius-xl)',
                position: 'relative', zIndex: 1, border: '1px solid hsl(var(--glass-border))'
              }}>
                <div style={{
                  position: 'absolute', top: '-10px', right: '10px', zIndex: 3,
                  background: '#EF4444', color: 'white', fontWeight: 700,
                  padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                  transform: 'rotate(5deg)'
                }}>
                  {t('bestseller')}
                </div>
                <Image
                  src="/images/kitab.png"
                  alt="Köklüyün sirri - Arıqlığın açarı"
                  width={350}
                  height={450}
                  style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius)', display: 'block' }}
                />
              </div>
            </motion.div>

            {/* Text & Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}
            >
              <div className="eyebrow">📖 {t('author')}</div>
              <h1 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', lineHeight: 1.2, fontWeight: 300, letterSpacing: '-0.02em', color: 'hsl(var(--foreground))' }}>
                {t('title')}
              </h1>
              <p style={{ fontSize: '1rem', color: 'hsl(var(--foreground)/0.75)', lineHeight: 1.8 }}>
                {t('description')}
              </p>

              {/* Features */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {features.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.9rem', color: 'hsl(var(--foreground)/0.8)' }}>
                    <CheckCircle size={17} color="hsl(var(--primary))" />
                    {t(`features.${f}`)}
                  </li>
                ))}
              </ul>

              {/* Buy Button */}
              <a
                href="https://wa.me/994506684823?text=Salam!%20Kitab%20sifariş%20etmək%20istəyirəm."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
                style={{ justifyContent: 'center', alignSelf: 'flex-start' }}
              >
                <WaIcon /> {t('orderWhatsApp')}
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detox Tea Section */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}
          >
            <div className="eyebrow" style={{ marginBottom: '1.5rem' }}>🍵 Detoks Paketi</div>
            <h2 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: 300, color: 'hsl(var(--foreground))', marginBottom: '1.25rem' }}>
              Kitab + Detoks Çayı Paketi
            </h2>
            <p style={{ fontSize: '1rem', color: 'hsl(var(--foreground)/0.7)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              &quot;Köklüyün sirri - Arıqlığın açarı&quot; kitabını xüsusi detoks çayı ilə birlikdə əldə edin.
              Bu paket orqanizmi təmizləmək və arıqlama prosesini sürətləndirmək üçün ideal həldir.
            </p>

            <div className="responsive-grid" style={{ marginBottom: '2.5rem' }}>
              {[
                { emoji: '📖', title: 'Bestseller Kitab', desc: 'İdmansız arıqlama metodunun bütün sirləri' },
                { emoji: '🍵', title: 'Detoks Çayı', desc: 'Orqanizmi təmizləyən xüsusi çay qarışığı' },
                { emoji: '📋', title: 'Qidalanma Planı', desc: 'Kitabla birgə istifadə üçün fərdi plan' },
              ].map((item) => (
                <div key={item.title} className="glass hover-glow" style={{ textAlign: 'center', padding: '2rem 1.5rem', borderRadius: 'var(--radius)' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{item.emoji}</div>
                  <h4 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: '1rem', fontWeight: 500, color: 'hsl(var(--foreground))', marginBottom: '0.5rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'hsl(var(--foreground)/0.7)' }}>{item.desc}</p>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/994506684823?text=Salam!%20Kitab%20+%20Detoks%20Çayı%20paketi%20sifariş%20etmək%20istəyirəm."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
              style={{ display: 'inline-flex' }}
            >
              <WaIcon /> Detoks Paketi Sifariş et
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 0 5rem', textAlign: 'center' }}>
        <div className="container">
          <div className="glass" style={{ padding: '4rem 2rem', borderRadius: 'var(--radius)', background: 'hsl(var(--primary)/0.08)' }}>
            <h2 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: 300, color: 'hsl(var(--foreground))', marginBottom: '1rem' }}>
              Fərdi konsultasiya da almaq istəyirsiniz?
            </h2>
            <p style={{ color: 'hsl(var(--foreground)/0.7)', marginBottom: '2rem' }}>Kitabla birlikdə fərdi diet planı alın</p>
            <Link href={`/${locale}/consultation`} className="btn btn-primary btn-lg">
              Konsultasiyaya qeydiyyat
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
