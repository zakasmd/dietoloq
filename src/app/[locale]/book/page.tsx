'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { CheckCircle, MessageCircle, ShoppingBag, BookOpen } from 'lucide-react';

export default function BookPage() {
  const t = useTranslations('book');
  const locale = useLocale();

  const features = ['f1', 'f2', 'f3', 'f4'] as const;

  return (
    <div style={{ paddingTop: '5rem' }}>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 80%, #CCFBF1 100%)',
        padding: '5rem 0',
        borderBottom: '1px solid var(--color-primary-100)',
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }}>
            {/* Book Image */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              {/* Glow */}
              <div style={{
                position: 'absolute', inset: '20px',
                background: 'radial-gradient(circle, rgba(5,150,105,0.15) 0%, transparent 70%)',
                borderRadius: '50%', filter: 'blur(20px)',
              }} />
              {/* Badge */}
              <div style={{
                position: 'absolute', top: '-10px', right: '10px', zIndex: 2,
                background: 'var(--gradient-primary)', color: 'white',
                padding: '0.5rem 1rem', borderRadius: '0 var(--radius-xl) var(--radius-xl) var(--radius-xl)',
                fontSize: '0.82rem', fontWeight: 700, fontFamily: 'var(--font-heading)',
                boxShadow: '0 4px 16px rgba(5,150,105,0.3)',
              }}>
                {t('badge')}
              </div>
              <div style={{
                position: 'relative', zIndex: 1,
                borderRadius: 'var(--radius-2xl)',
                overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(5,150,105,0.2), 0 10px 30px rgba(0,0,0,0.12)',
                border: '2px solid rgba(5,150,105,0.15)',
                maxWidth: '360px',
                width: '100%',
              }}>
                <Image
                  src="/images/kitab.png"
                  alt={t('title')}
                  width={360}
                  height={360}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  priority
                />
              </div>
            </div>

            {/* Text */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="section-label">📖 {t('author')}</div>
              <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2, fontWeight: 800 }}>
                {t('title')}
              </h1>
              <div className="divider divider-left" />
              <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                {t('description')}
              </p>

              {/* Features */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {features.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                    <CheckCircle size={17} color="var(--color-primary)" strokeWidth={2.5} />
                    {t(`features.${f}`)}
                  </li>
                ))}
              </ul>

              {/* Buy Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                <a
                  href="https://wa.me/994506684823?text=Salam!%20Kitab%20sifar%C4%B1%C5%9F%20etm%C9%99k%20ist%C9%99yir%C9%99m."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-lg"
                  style={{ justifyContent: 'center' }}
                >
                  <MessageCircle size={18} />
                  {t('orderWhatsApp')}
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Detox Tea Section */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div className="section-label" style={{ display: 'inline-flex', marginBottom: '1.5rem' }}>🍵 Detoks Paketi</div>
            <h2 style={{ marginBottom: '1rem' }}>Kitab + Detoks Çayı Paketi</h2>
            <div className="divider" />
            <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginTop: '1rem', lineHeight: 1.8 }}>
              "Köklüyün sirri - Arıqlığın açarı" kitabını xüsusi detoks çayı ilə birlikdə əldə edin.
              Bu paket orqanizmi təmizləmək və arıqlama prosesini sürətləndirmək üçün ideal həldir.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginTop: '2.5rem' }}>
              {[
                { emoji: '📖', title: 'Bestseller Kitab', desc: 'İdmansız arıqlama metodunun bütün sirləri' },
                { emoji: '🍵', title: 'Detoks Çayı', desc: 'Orqanizmi təmizləyən xüsusi çay qarışığı' },
                { emoji: '📋', title: 'Qidalanma Planı', desc: 'Kitabla birgə istifadə üçün fərdi plan' },
              ].map((item) => (
                <div key={item.title} className="card card-body" style={{ textAlign: 'center', padding: '1.5rem' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{item.emoji}</div>
                  <h4 style={{ marginBottom: '0.5rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.85rem' }}>{item.desc}</p>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/994506684823?text=Salam!%20Kitab%20+%20Detoks%20Çayı%20paketi%20sifariş%20etmək%20istəyirəm."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
              style={{ marginTop: '2rem', display: 'inline-flex' }}
            >
              <MessageCircle size={18} />
              Detoks Paketi Sifariş et
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--gradient-primary)', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>Fərdi konsultasiya da almaq istəyirsiniz?</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '2rem' }}>
            Kitabla birlikdə fərdi diet planı alın
          </p>
          <Link href={`/${locale}/consultation`} className="btn btn-white btn-lg">
            Konsultasiyaya qeydiyyat
          </Link>
        </div>
      </section>
    </div>
  );
}
