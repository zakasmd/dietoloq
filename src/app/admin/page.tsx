'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import styles from './AdminDashboard.module.css';

export default function AdminPage() {
  const [stats, setStats] = useState({ consultations: 0, users: 0, courses: 0, newConsultations: 0 });

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const [consultRes, userRes, courseRes, newConsRes] = await Promise.all([
        supabase.from('consultations').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('courses').select('*', { count: 'exact', head: true }),
        supabase.from('consultations').select('*', { count: 'exact', head: true }).eq('status', 'new'),
      ]);
      setStats({
        consultations: consultRes.count || 0,
        users: userRes.count || 0,
        courses: courseRes.count || 0,
        newConsultations: newConsRes.count || 0,
      });
    };
    load();
  }, []);

  const cards = [
    { label: 'Yeni Müraciətlər', value: stats.newConsultations, icon: '🔔', color: '#FEF3C7', href: '/admin/consultations', urgent: stats.newConsultations > 0 },
    { label: 'Cəmi Müraciətlər', value: stats.consultations, icon: '📋', color: '#EDE9FE', href: '/admin/consultations', urgent: false },
    { label: 'Qeydiyyatlı İstifadəçi', value: stats.users, icon: '👥', color: '#DCFCE7', href: '/admin/users', urgent: false },
    { label: 'Kurslar', value: stats.courses, icon: '🎓', color: '#DBEAFE', href: '/admin/courses', urgent: false },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.375rem' }}>Admin Dashboard</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Saytın ümumi statistikası</p>
      </div>

      <div className={styles.statsGrid}>
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            style={{
              background: 'white', borderRadius: 'var(--radius-xl)', padding: '1.5rem',
              boxShadow: 'var(--shadow-card)', textDecoration: 'none',
              border: card.urgent ? '2px solid #F59E0B' : '1px solid var(--color-border-light)',
              transition: 'all 0.2s ease', display: 'block',
            }}
          >
            <div style={{ width: 44, height: 44, background: card.color, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', marginBottom: '1rem' }}>
              {card.icon}
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '0.25rem' }}>
              {card.value}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{card.label}</div>
            {card.urgent && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.72rem', color: '#D97706', fontWeight: 700 }}>⚡ Cavab tələb edir</div>
            )}
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ background: 'white', borderRadius: 'var(--radius-2xl)', padding: '1.75rem', boxShadow: 'var(--shadow-card)', border: '1px solid var(--color-border-light)' }}>
        <h2 style={{ fontSize: '1rem', marginBottom: '1.25rem' }}>⚡ Sürətli əməliyyatlar</h2>
        <div className={styles.quickActions}>
          <Link href="/admin/consultations" className="btn btn-primary btn-sm">📋 Müraciətlərə bax</Link>
          <Link href="/admin/courses" className="btn btn-outline btn-sm">🎓 Kurs əlavə et</Link>
          <Link href="/admin/users" className="btn btn-outline btn-sm">👥 İstifadəçilər</Link>
        </div>
      </div>
    </div>
  );
}
