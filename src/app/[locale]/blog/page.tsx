import Link from 'next/link';

const posts = [
  {
    slug: 'idmansiz-ariqlamaq-mumkundumu',
    title: 'İdmansız arıqlamaq mümkündümü?',
    excerpt: 'Çoxları arıqlamaq üçün mütləq idman etmək lazım olduğunu düşünür. Ancaq elmi araşdırmalar göstərir ki, düzgün qidalanma 80% əhəmiyyət daşıyır...',
    date: '15 Aprel 2026',
    readTime: '5 dəq',
    category: 'Arıqlama',
    emoji: '🏃',
  },
  {
    slug: 'su-qebulu-neye-gorede',
    title: 'Gündə nə qədər su içməliyik?',
    excerpt: 'Su qəbulu sağlam qidalanmanın ayrılmaz hissəsidir. Bəs düzgün su qəbulu necə planlaşdırılır? Fərdi ehtiyac hesablaması...',
    date: '10 Aprel 2026',
    readTime: '4 dəq',
    category: 'Sağlamlıq',
    emoji: '💧',
  },
  {
    slug: 'ramazan-iftar-sufresi',
    title: 'Ramazan ayında sağlam iftar süfrəsi',
    excerpt: 'Ramazan ayında oruc tutan insanlar üçün iftar və imsak süfrəsinin necə qurulması lazım olduğuna dair tövsiyələr...',
    date: '5 Aprel 2026',
    readTime: '6 dəq',
    category: 'Ramazan',
    emoji: '🌙',
  },
  {
    slug: 'anti-ageing-qidalanma',
    title: 'Yaşlanmaya qarşı qidalanma',
    excerpt: 'Anti-ageing qidalanma dedikdə nə başa düşürük? Yaşlanma əleyhinə hansı qidalar daha effektivdir...',
    date: '28 Mart 2026',
    readTime: '7 dəq',
    category: 'Anti-Ageing',
    emoji: '🌿',
  },
  {
    slug: 'protein-nece-qebul-edilmeli',
    title: 'Protein nə qədər qəbul etməliyik?',
    excerpt: 'Protein qəbulu arıqlama prosesində çox vacibdir. Gündəlik protein normanızı necə hesablayırsınız...',
    date: '20 Mart 2026',
    readTime: '5 dəq',
    category: 'Qidalanma',
    emoji: '💪',
  },
  {
    slug: 'hamilelerde-qidalanma',
    title: 'Hamiləlikdə düzgün qidalanma',
    excerpt: 'Hamiləlik dövrü qidalanma baxımından xüsusi diqqət tələb edir. Ananın və körpənin sağlamlığı üçün...',
    date: '15 Mart 2026',
    readTime: '8 dəq',
    category: 'Hamiləlik',
    emoji: '🤰',
  },
];

const categories = ['Hamısı', 'Arıqlama', 'Sağlamlıq', 'Ramazan', 'Anti-Ageing', 'Qidalanma', 'Hamiləlik'];

export default function BlogPage() {
  return (
    <div style={{ paddingTop: '5rem' }}>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #faf5ff 0%, #fdf2f8 100%)',
        padding: '5rem 0 4rem', textAlign: 'center',
        borderBottom: '1px solid var(--color-border-light)',
      }}>
        <div className="container">
          <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>📝 Blog</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>Məqalələr</h1>
          <div className="divider" />
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto' }}>
            Qidalanma, sağlam həyat və diet mövzularında faydalı məqalələr
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section style={{ background: 'var(--color-white)', padding: '1.5rem 0', borderBottom: '1px solid var(--color-border-light)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map((cat, i) => (
              <button
                key={cat}
                style={{
                  padding: '0.45rem 1rem', borderRadius: 'var(--radius-full)',
                  fontSize: '0.825rem', fontWeight: 600, fontFamily: 'var(--font-heading)',
                  border: i === 0 ? 'none' : '1.5px solid var(--color-border)',
                  background: i === 0 ? 'var(--gradient-primary)' : 'transparent',
                  color: i === 0 ? 'white' : 'var(--color-text-secondary)',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.75rem', justifyContent: 'center' }}>
            {posts.map((post) => (
              <article key={post.slug} className="card" style={{ display: 'flex', flexDirection: 'column', flex: '1 1 300px', maxWidth: '400px' }}>
                {/* Thumbnail */}
                <div style={{
                  height: '180px',
                  background: 'linear-gradient(135deg, var(--color-primary-100) 0%, var(--color-primary-200) 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem',
                  borderRadius: 'var(--radius-2xl) var(--radius-2xl) 0 0',
                }}>
                  {post.emoji}
                </div>

                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '0.75rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>{post.category}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>⏱️ {post.readTime}</span>
                  </div>
                  <h2 style={{ fontSize: '1rem', lineHeight: 1.4, color: 'var(--color-text)' }}>{post.title}</h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.65', flex: 1 }}>{post.excerpt}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border-light)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{post.date}</span>
                    <Link href={`/az/blog/${post.slug}`} style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                      Oxu →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter-style CTA */}
      <section style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>Yeni məqalələri izləyin</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '2rem' }}>
            Instagram və YouTube kanalımızda daha çox məlumat tapın
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn-white btn-lg">📸 Instagram</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="btn btn-white btn-lg">▶️ YouTube</a>
          </div>
        </div>
      </section>
    </div>
  );
}
