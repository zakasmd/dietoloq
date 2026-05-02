'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Phone, Mail } from 'lucide-react';
import styles from './AdminConsultations.module.css';

interface Consultation {
  id: string;
  full_name: string;
  phone: string;
  email?: string;
  age?: number;
  goal?: string;
  message?: string;
  status: string;
  created_at: string;
}

const statusConfig: any = {
  new: { label: 'Yeni', bg: '#FEF3C7', color: '#92400E', icon: '✨' },
  contacted: { label: 'Əlaqə saxlanıldı', bg: '#DBEAFE', color: '#1E40AF', icon: '📞' },
  done: { label: 'Tamamlandı', bg: '#DCFCE7', color: '#166534', icon: '✅' },
};

const goalLabels: any = {
  weight_loss: 'Arıqlama',
  weight_gain: 'Kökəlmə',
  healthy_living: 'Sağlam həyat',
  other: 'Digər',
};

export default function ConsultationsAdminPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => { fetchConsultations(); }, []);

  const fetchConsultations = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('consultations')
      .select('*')
      .order('created_at', { ascending: false });
    setConsultations(data || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const supabase = createClient();
    await supabase.from('consultations').update({ status }).eq('id', id);
    setConsultations((prev) => prev.map((c) => c.id === id ? { ...c, status } : c));
  };

  const filtered = filter === 'all' ? consultations : consultations.filter((c) => c.status === filter);

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}>Yüklənir...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className={styles.header}>
        <div>
          <h1 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Konsultasiya Müraciətləri</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Cəmi: {consultations.length} müraciət</p>
        </div>
        <div className={styles.filters}>
          {['all', 'new', 'contacted', 'done'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                padding: '0.4rem 0.875rem', borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem', fontWeight: 600, border: 'none', cursor: 'pointer',
                background: filter === s ? 'var(--gradient-primary)' : 'white',
                color: filter === s ? 'white' : 'var(--color-text-secondary)',
                boxShadow: 'var(--shadow-sm)', fontFamily: 'var(--font-heading)',
              }}
            >
              {s === 'all' ? 'Hamısı' : statusConfig[s]?.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        {filtered.map((c) => {
          const status = statusConfig[c.status] || statusConfig.new;
          return (
            <div
              key={c.id}
              className={styles.card}
              style={{ border: c.status === 'new' ? '1.5px solid #FCD34D' : '1px solid var(--color-border-light)' }}
            >
              <div className={styles.cardContent}>
                <div style={{ flex: 1, minWidth: '250px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{c.full_name}</h3>
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: '0.3rem',
                      padding: '0.2rem 0.625rem', borderRadius: 'var(--radius-full)',
                      fontSize: '0.72rem', fontWeight: 700,
                      background: status.bg, color: status.color,
                    }}>
                      {status.icon} {status.label}
                    </span>
                    {c.goal && <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>{goalLabels[c.goal] || c.goal}</span>}
                  </div>

                  <div className={styles.contactInfo} style={{ marginBottom: c.message ? '0.75rem' : 0 }}>
                    <a href={`tel:${c.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.875rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>
                      <Phone size={14} /> {c.phone}
                    </a>
                    {c.email && (
                      <a href={`mailto:${c.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
                        <Mail size={14} /> {c.email}
                      </a>
                    )}
                    {c.age && <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>🎂 {c.age} yaş</span>}
                  </div>

                  {c.message && (
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', background: 'var(--color-bg-secondary)', padding: '0.625rem 0.875rem', borderRadius: 10, lineHeight: '1.6', marginTop: '0.5rem' }}>
                      💬 {c.message}
                    </p>
                  )}

                  <div style={{ marginTop: '0.5rem', fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                    📅 {new Date(c.created_at).toLocaleDateString('az-AZ', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className={styles.actions} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexShrink: 0 }}>
                  <a href={`https://wa.me/${c.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm">
                    WhatsApp
                  </a>
                  <select
                    value={c.status}
                    onChange={(e) => updateStatus(c.id, e.target.value)}
                    style={{ padding: '0.4rem 0.625rem', borderRadius: 8, border: '1.5px solid var(--color-border)', fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
                  >
                    <option value="new">Yeni</option>
                    <option value="contacted">Əlaqə saxlanıldı</option>
                    <option value="done">Tamamlandı</option>
                  </select>
                </div>
              </div>
            </div>
          );
        })}

        {!filtered.length && (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: 'var(--radius-2xl)', color: 'var(--color-text-muted)' }}>
            Bu kateqoriyada müraciət yoxdur
          </div>
        )}
      </div>
    </div>
  );
}
