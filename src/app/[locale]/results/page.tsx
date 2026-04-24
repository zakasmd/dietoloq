import Link from 'next/link';

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
  return (
    <div style={{ paddingTop: '5rem' }}>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #faf5ff 0%, #fdf2f8 100%)',
        padding: '5rem 0 4rem', textAlign: 'center',
        borderBottom: '1px solid var(--color-border-light)',
      }}>
        <div className="container">
          <span className="badge badge-accent" style={{ marginBottom: '1rem' }}>📊 Nəticələr</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>Real Nəticələr</h1>
          <div className="divider" />
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto' }}>
            Müştərilərimizin real transformasiya hekayələri. Müştəri razılığı ilə paylaşılmışdır.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="section-sm" style={{ background: 'var(--color-white)', borderBottom: '1px solid var(--color-border-light)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {stats.map((s) => (
              <div key={s.label} className="card card-body" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{s.icon}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.val}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #fff 100%)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Transformasiya nəticələri</h2>
            <div className="divider" />
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
              * Məxfilik üçün müştəri adları gizlidir. Şəkillər müştəri icazəsi ilə paylaşılır.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {results.map((r) => (
              <div key={r.id} className="card" style={{ overflow: 'hidden' }}>
                {/* Before/After placeholder */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '200px' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: '0.5rem', borderRight: '2px solid white',
                  }}>
                    <span style={{ fontSize: '2.5rem' }}>🙍</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B7280', background: 'white', padding: '0.2rem 0.75rem', borderRadius: '100px' }}>Əvvəl</span>
                  </div>
                  <div style={{
                    background: 'linear-gradient(135deg, #DDD6FE 0%, #C4B5FD 100%)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  }}>
                    <span style={{ fontSize: '2.5rem' }}>🧘</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#7C3AED', background: 'white', padding: '0.2rem 0.75rem', borderRadius: '100px' }}>Sonra</span>
                  </div>
                </div>

                <div className="card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700 }}>{r.name}</span>
                    <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>{r.goal}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                    {[
                      { label: 'Əvvəl', val: r.before },
                      { label: 'Sonra', val: r.after },
                      { label: 'Nəticə', val: r.lost },
                    ].map((item) => (
                      <div key={item.label} style={{ textAlign: 'center', background: 'var(--color-bg-secondary)', padding: '0.5rem', borderRadius: 10 }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{item.label}</div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: item.label === 'Nəticə' ? 'var(--color-primary)' : 'var(--color-text)' }}>{item.val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>⏱️ {r.duration} ərzində</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer + CTA */}
      <section style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>Siz də nəticə əldə edə bilərsiniz</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            Fərdi planınızı alın, real nəticəni yaşayın
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/az/consultation" className="btn btn-white btn-lg">Konsultasiya al</Link>
            <a href="https://wa.me/994506684823" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">WhatsApp-da yaz</a>
          </div>
        </div>
      </section>
    </div>
  );
}
