'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type User = { id: string; email: string; full_name: string | null; phone: string | null; role: string; created_at: string };

export default function UsersAdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<{ id: string; title_az: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [grantModal, setGrantModal] = useState<{ userId: string; userName: string } | null>(null);
  const [selectedCourse, setSelectedCourse] = useState('');

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const [{ data: profiles }, { data: coursesData }] = await Promise.all([
        supabase.from('profiles').select('*').order('created_at', { ascending: false }),
        supabase.from('courses').select('id, title_az').eq('is_published', true),
      ]);
      setUsers(profiles || []);
      setCourses(coursesData || []);
      setLoading(false);
    };
    load();
  }, []);

  const grantCourse = async () => {
    if (!grantModal || !selectedCourse) return;
    const supabase = createClient();
    await supabase.from('user_courses').upsert({
      user_id: grantModal.userId,
      course_id: selectedCourse,
    });
    setGrantModal(null);
    setSelectedCourse('');
    alert('Kurs verildi!');
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}>Yüklənir...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>İstifadəçilər</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Cəmi: {users.length} istifadəçi</p>
      </div>

      <div style={{ background: 'white', borderRadius: 'var(--radius-2xl)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--color-border-light)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)' }}>
              {['Ad Soyad', 'E-mail', 'Telefon', 'Rol', 'Qeydiyyat', 'Əməliyyat'].map((h) => (
                <th key={h} style={{ padding: '0.875rem 1.25rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user.id} style={{ borderBottom: i < users.length - 1 ? '1px solid var(--color-border-light)' : 'none' }}>
                <td style={{ padding: '1rem 1.25rem', fontWeight: 600, fontSize: '0.875rem' }}>
                  {user.full_name || '—'}
                </td>
                <td style={{ padding: '1rem 1.25rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{user.email || '—'}</td>
                <td style={{ padding: '1rem 1.25rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{user.phone || '—'}</td>
                <td style={{ padding: '1rem 1.25rem' }}>
                  <span style={{
                    padding: '0.2rem 0.625rem', borderRadius: 'var(--radius-full)', fontSize: '0.72rem', fontWeight: 700,
                    background: user.role === 'admin' ? '#FEF3C7' : 'var(--color-primary-100)',
                    color: user.role === 'admin' ? '#D97706' : 'var(--color-primary)',
                  }}>
                    {user.role === 'admin' ? '🛡️ Admin' : '👤 User'}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.25rem', fontSize: '0.775rem', color: 'var(--color-text-muted)' }}>
                  {new Date(user.created_at).toLocaleDateString('az-AZ')}
                </td>
                <td style={{ padding: '1rem 1.25rem' }}>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setGrantModal({ userId: user.id, userName: user.full_name || user.email })}
                  >
                    🎓 Kurs ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!users.length && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>İstifadəçi yoxdur</div>
        )}
      </div>

      {/* Grant Course Modal */}
      {grantModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '1rem' }}>
          <div style={{ background: 'white', borderRadius: 'var(--radius-2xl)', padding: '2rem', width: '100%', maxWidth: '420px' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Kurs ver</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
              <strong>{grantModal.userName}</strong> istifadəçisinə kurs ver
            </p>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="form-input form-select"
              style={{ marginBottom: '1.25rem' }}
            >
              <option value="">Kurs seçin...</option>
              {courses.map((c) => <option key={c.id} value={c.id}>{c.title_az}</option>)}
            </select>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={grantCourse}>Kurs ver</button>
              <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setGrantModal(null)}>Ləğv et</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
