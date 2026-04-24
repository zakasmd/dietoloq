import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.4 2.8 12 2.8 12 2.8s-4.4 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.3.3 4.3s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.5 21.7 12 21.7 12 21.7s4.4 0 6.8-.2c.6-.1 1.9-.1 3-1.2.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.3v-2C23.3 9.1 23 7 23 7zm-13.5 7V10l5.5 2L9.5 14z"/>
  </svg>
);

export default function ContactPage() {
  return (
    <div style={{ paddingTop: '5rem' }}>
      <section style={{
        background: 'linear-gradient(135deg, #faf5ff 0%, #fdf2f8 100%)',
        padding: '5rem 0 4rem', textAlign: 'center',
        borderBottom: '1px solid var(--color-border-light)',
      }}>
        <div className="container">
          <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>📞 Əlaqə</span>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>Bizimlə əlaqə saxlayın</h1>
          <div className="divider" />
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto' }}>
            Suallarınızı soruşun, məsləhət alın, konsultasiya planlaşdırın
          </p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'start' }}>
            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h2 style={{ fontSize: '1.5rem' }}>Birbaşa əlaqə</h2>

              {[
                { icon: <Phone size={20} color="#8B5CF6" />, label: 'Telefon', value: '+994 50 668 48 23', href: 'tel:+994506684823' },
                { icon: <Mail size={20} color="#10B981" />, label: 'E-mail', value: 'leyla@dietoloq.az', href: 'mailto:leyla@dietoloq.az' },
                { icon: <MapPin size={20} color="#F59E0B" />, label: 'Ünvan', value: 'Bakı, Azərbaycan', href: null },
              ].map((item) => (
                <div key={item.label} className="card card-body" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem 1.5rem' }}>
                  <div style={{ width: 44, height: 44, background: 'var(--color-bg-secondary)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{item.label}</div>
                    {item.href ? (
                      <a href={item.href} style={{ fontWeight: 600, color: 'var(--color-text)', textDecoration: 'none', fontSize: '0.95rem' }}>{item.value}</a>
                    ) : (
                      <div style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '0.95rem' }}>{item.value}</div>
                    )}
                  </div>
                </div>
              ))}

              {/* Social */}
              <h3 style={{ fontSize: '1rem', marginTop: '0.5rem' }}>Sosial media</h3>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <a href="https://wa.me/994506684823" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ flex: 1, justifyContent: 'center' }}>
                  <MessageCircle size={18} /> WhatsApp
                </a>
                <a href="https://www.instagram.com/dietoloqleylazulfuqarli/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', borderColor: '#E1306C', color: '#E1306C' }}>
                  <InstagramIcon />
                </a>
                <a href="https://www.youtube.com/@DiyetoloqLeyla" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', borderColor: '#FF0000', color: '#FF0000' }}>
                  <YoutubeIcon />
                </a>
              </div>
            </div>

            {/* Quick CTA Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="card card-body" style={{ background: 'linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-primary-100) 100%)', border: '1.5px solid var(--color-primary-200)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>🎯 Konsultasiya almaq istəyirsiniz?</h3>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                  Fərdi qidalanma planınız üçün konsultasiya formumuzu doldurun. 24 saat ərzində sizinlə əlaqə saxlayırıq.
                </p>
                <Link href="/az/consultation" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                  Konsultasiya üçün qeydiyyat
                </Link>
              </div>

              <div className="card card-body" style={{ background: 'linear-gradient(135deg, #F0FDF4 0%, #D1FAE5 100%)', border: '1.5px solid #A7F3D0' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>💬 Sürətli əlaqə</h3>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.25rem', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Sualınız varsa, WhatsApp-da birbaşa yazın. Ən qısa müddətdə cavab alacaqsınız.
                </p>
                <a href="https://wa.me/994506684823" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ width: '100%', justifyContent: 'center' }}>
                  <MessageCircle size={18} /> WhatsApp-da yaz
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
