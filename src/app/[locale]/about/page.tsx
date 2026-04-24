import Image from 'next/image';
import Link from 'next/link';
import { Award, Clock, Users, BookOpen } from 'lucide-react';

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

const services = [
  'Arıqlama və çəki azaltma üçün fərdi diet proqramları',
  'İdmansız arıqlama metodları üzrə proqram',
  'Sağlam qidalanma konsultasiyası',
  'Anti-ageing və nutrisyon sahəsində məsləhət',
  'Kökəlmək üçün çəki artırma planları',
  'Ramazan və xüsusi dövrlərdə qidalanma',
  'Su qəbulunun düzgün planlaşdırılması',
  'Seminarlar, tədbirlər, media çıxışları',
];

const certificates = [
  'Klinik Nutrisyologiya Sertifikatı',
  'Anti-Ageing Qidalanma Sertifikatı',
  'Hamiləlik Diyetologiyası Sertifikatı',
  'İdmansız Arıqlama Metodu Sertifikatı',
  'Uşaq Qidalanması Sertifikatı',
];

export default function AboutPage() {
  return (
    <div style={{ paddingTop: '5rem' }}>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #faf5ff 0%, #fdf2f8 100%)',
        padding: '5rem 0 4rem',
        borderBottom: '1px solid var(--color-border-light)',
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '4rem', alignItems: 'center' }}>
            {/* Image */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', bottom: '-20px', left: '-20px', right: '20px', top: '20px',
                background: 'linear-gradient(135deg, var(--color-primary-200) 0%, var(--color-primary-100) 100%)',
                borderRadius: 'var(--radius-2xl)',
              }} />
              <Image
                src="/images/dietolog-1.jpg"
                alt="Leyla Zülfüqarlı"
                width={460}
                height={520}
                unoptimized
                style={{ borderRadius: 'var(--radius-2xl)', position: 'relative', zIndex: 1, width: '100%', height: 'auto', objectFit: 'cover', boxShadow: 'var(--shadow-xl)' }}
              />
            </div>

            {/* Text */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <span className="badge badge-primary">Haqqında</span>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>Leyla Zülfüqarlı</h1>
              <div className="divider divider-left" />
              <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--color-text-secondary)' }}>
                Peşəkar diyetoloq kimi 8 ildən artıq təcrübəyə malik olan Leyla xanım, 200-dən çox müştəriyə fərdi, elmi əsaslı qidalanma planları hazırlamışdır. O, yalnız diyet proqramları deyil, həm də müştərilərin həyat tərzi, psixoloji vəziyyəti və sağlamlıq hədəflərini nəzərə alaraq bütöv bir yanaşma tətbiq edir.
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.8', color: 'var(--color-text-secondary)' }}>
                Leyla xanım eyni zamanda sağlam qidalanma mövzusunda kitab müəllifidir, YouTube kanalında və sosial mediada maarifləndirici kontent paylaşır, seminarlar və media çıxışları vasitəsilə geniş auditoriyaya qidalanma üzrə ekspert rəyi təqdim edir.
              </p>

              {/* Stats */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {[
                  { icon: <Clock size={20} color="#8B5CF6" />, val: '8+', label: 'İl Təcrübə' },
                  { icon: <Award size={20} color="#10B981" />, val: '15+', label: 'Sertifikat' },
                  { icon: <Users size={20} color="#F59E0B" />, val: '200+', label: 'Müştəri' },
                ].map((s) => (
                  <div key={s.label} className="card card-body" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flex: 1, minWidth: '120px', padding: '1rem 1.25rem' }}>
                    {s.icon}
                    <div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem' }}>{s.val}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/az/consultation" className="btn btn-primary">Konsultasiya al</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            {/* Mission */}
            <div style={{ background: 'linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-primary-100) 100%)', padding: '2.5rem', borderRadius: 'var(--radius-2xl)' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🎯 Mənim missiyam</h2>
              <p style={{ lineHeight: '1.8' }}>
                Hər insanın fərqli olduğunu bilərək, hər kəsə özünəməxsus qidalanma planı hazırlamaq. Sağlam həyat yaşamaq üçün qida bir həzz, bir həyat tərzi olmalıdır — məhdudiyyət yox.
              </p>
              <br />
              <p style={{ lineHeight: '1.8' }}>
                Müştərimin yalnız çəkisini deyil, sağlamlığını, enerji səviyyəsini, həyat keyfiyyətini yüksəltmək — bu mənim hədəfimdir.
              </p>
            </div>

            {/* What I do */}
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>💼 Müştərilərim üçün nə edirəm?</h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {services.map((s) => (
                  <li key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--color-primary)', fontWeight: 700, marginTop: '2px', flexShrink: 0 }}>✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #fff 100%)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>🏆 Sertifikatlar</span>
            <h2>Təhsil və sertifikatlar</h2>
            <div className="divider" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', maxWidth: '900px', margin: '0 auto' }}>
            {certificates.map((cert) => (
              <div key={cert} className="card card-body" style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>🏅</div>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Sosial media</h2>
            <div className="divider" />
            <p>YouTube kanalı və sosial mediada qidalanma, sağlam həyat mövzularında maarifləndirici kontent</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg" style={{ gap: '0.5rem' }}>
              <YoutubeIcon />
              YouTube Kanalı
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg" style={{ gap: '0.5rem', borderColor: '#E1306C', color: '#E1306C' }}>
              <InstagramIcon />
              Instagram
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>Konsultasiya almağa hazırsınız?</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '2rem' }}>Fərdi planınızı alın, sağlam həyata başlayın</p>
          <Link href="/az/consultation" className="btn btn-white btn-lg">
            Konsultasiya üçün qeydiyyat
          </Link>
        </div>
      </section>
    </div>
  );
}
