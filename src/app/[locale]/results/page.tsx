'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';

const results = [
  { id: 1, name: 'A.M.', before: '78 kq', after: '65 kq', lost: '-13 kq', duration: '3 ay', goal: 'Arıqlama' },
  { id: 2, name: 'S.H.', before: '92 kq', after: '80 kq', lost: '-12 kq', duration: '10 həftə', goal: 'Arıqlama' },
  { id: 3, name: 'R.Ə.', before: '55 kq', after: '62 kq', lost: '+7 kq', duration: '2 ay', goal: 'Çəki artırma' },
  { id: 4, name: 'K.S.', before: '85 kq', after: '70 kq', lost: '-15 kq', duration: '4 ay', goal: 'Arıqlama' },
  { id: 5, name: 'L.T.', before: '74 kq', after: '62 kq', lost: '-12 kq', duration: '3 ay', goal: 'Arıqlama' },
  { id: 6, name: 'N.M.', before: '68 kq', after: '58 kq', lost: '-10 kq', duration: '8 həftə', goal: 'Arıqlama' },
];

const stats = [
  { val: '200+', label: 'Uğurlu müştəri', icon: '👥' },
  { val: '95%', label: 'Məmnuniyyət dərəcəsi', icon: '⭐' },
  { val: '-8 kq', label: 'Ortalama çəki itkisi', icon: '📉' },
  { val: '2 həftə', label: 'İlk nəticə müddəti', icon: '⏱️' },
];

export default function ResultsPage() {
  const locale = useLocale();

  return (
    <div style={{ paddingTop: '5rem' }}>
      <section style={{ padding: '5rem 0 4rem', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="eyebrow" style={{ marginBottom: '1rem' }}>📊 Nəticələr</div>
            <h1 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, letterSpacing: '-0.02em', color: 'hsl(var(--foreground))', marginBottom: '1rem' }}>
              Real Nəticələr
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'hsl(var(--foreground)/0.7)', maxWidth: '520px', margin: '0 auto' }}>
              Müştərilərimizin real transformasiya hekayələri
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '0 0 4rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.25rem' }}>
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="glass hover-glow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{ textAlign: 'center', padding: '2rem 1rem', borderRadius: 'var(--radius)' }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{s.icon}</div>
                <div className="text-gradient-mint" style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: '2rem', fontWeight: 700 }}>{s.val}</div>
                <div style={{ fontSize: '0.8rem', color: 'hsl(var(--foreground)/0.7)', marginTop: '0.25rem' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section style={{ padding: '0 0 5rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 300, color: 'hsl(var(--foreground))', marginBottom: '0.5rem' }}>
              Transformasiya nəticələri
            </h2>
            <p style={{ color: 'hsl(var(--foreground)/0.5)', fontSize: '0.875rem' }}>
              * Məxfilik üçün müştəri adları gizlidir
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
            {results.map((r, i) => (
              <motion.div
                key={r.id}
                className="glass hover-glow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                style={{ borderRadius: 'var(--radius)', overflow: 'hidden' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '160px' }}>
                  <div style={{ background: 'hsl(var(--muted))', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', borderRight: '2px solid hsl(var(--border)/0.3)' }}>
                    <span style={{ fontSize: '2rem' }}>🙍</span>
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'hsl(var(--foreground)/0.7)', background: 'hsl(var(--background)/0.5)', padding: '0.2rem 0.75rem', borderRadius: '100px' }}>Əvvəl</span>
                  </div>
                  <div style={{ background: 'hsl(var(--primary)/0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '2rem' }}>🧘</span>
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'hsl(var(--primary))', background: 'hsl(var(--primary)/0.15)', padding: '0.2rem 0.75rem', borderRadius: '100px' }}>Sonra</span>
                  </div>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontFamily: 'Space Grotesk,sans-serif', fontWeight: 600, color: 'hsl(var(--foreground))' }}>{r.name}</span>
                    <span style={{ background: 'hsl(var(--primary)/0.15)', color: 'hsl(var(--primary))', fontSize: '0.7rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '100px' }}>{r.goal}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.5rem' }}>
                    {[{ label: 'Əvvəl', val: r.before }, { label: 'Sonra', val: r.after }, { label: 'Nəticə', val: r.lost }].map((item) => (
                      <div key={item.label} style={{ textAlign: 'center', background: 'hsl(var(--muted)/0.5)', padding: '0.5rem', borderRadius: 10 }}>
                        <div style={{ fontSize: '0.65rem', color: 'hsl(var(--foreground)/0.5)' }}>{item.label}</div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: item.label === 'Nəticə' ? 'hsl(var(--primary))' : 'hsl(var(--foreground))' }}>{item.val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'hsl(var(--foreground)/0.6)' }}>⏱️ {r.duration} ərzində</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 0 5rem', textAlign: 'center' }}>
        <div className="container">
          <div className="glass" style={{ padding: '4rem 2rem', borderRadius: 'var(--radius)', background: 'hsl(var(--primary)/0.08)' }}>
            <h2 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: 300, color: 'hsl(var(--foreground))', marginBottom: '1rem' }}>
              Siz də nəticə əldə edə bilərsiniz
            </h2>
            <p style={{ color: 'hsl(var(--foreground)/0.7)', marginBottom: '2rem' }}>Fərdi planınızı alın, real nəticəni yaşayın</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href={`/${locale}/consultation`} className="btn btn-primary btn-lg">Konsultasiya al</Link>
              <a href="https://wa.me/994506684823" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
