'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type User = { id: string; email: string; full_name: string | null; phone: string | null; role: string; created_at: string };

export default function UsersAdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<{ id: string; title_az: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [grantModal, setGrantModal] = useState<{ userId: string; userName: string; type: 'course' | 'material' } | null>(null);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [materials, setMaterials] = useState<{ id: string; title_az: string }[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [showBulkModal, setShowBulkModal] = useState<'course' | 'material' | null>(null);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const [{ data: profiles }, { data: coursesData }, { data: materialsData }] = await Promise.all([
        supabase.from('profiles').select('*').order('created_at', { ascending: false }),
        supabase.from('courses').select('id, title_az'),
        supabase.from('materials').select('id, title_az'),
      ]);
      setUsers(profiles || []);
      setCourses(coursesData || []);
      setMaterials(materialsData || []);
      setLoading(false);
    };
    load();
  }, []);

  const handleBulkGrant = async () => {
    if (selectedUserIds.length === 0) return;
    const supabase = createClient();
    
    if (showBulkModal === 'course' && selectedCourse) {
      const records = selectedUserIds.map(uid => ({ user_id: uid, course_id: selectedCourse }));
      await supabase.from('user_courses').upsert(records);
      alert('Kurslar verildi!');
    } else if (showBulkModal === 'material' && selectedMaterial) {
      const records = selectedUserIds.map(uid => ({ user_id: uid, material_id: selectedMaterial }));
      await supabase.from('user_materials').upsert(records);
      alert('PDF-lər verildi!');
    }

    setShowBulkModal(null);
    setSelectedUserIds([]);
  };

  const deleteSelectedUsers = async () => {
    if (!confirm(`${selectedUserIds.length} istifadəçini silmək istədiyinizə əminsiniz?`)) return;
    const supabase = createClient();
    const { error } = await supabase.from('profiles').delete().in('id', selectedUserIds);
    if (error) { alert('Xəta: ' + error.message); return; }
    setUsers(prev => prev.filter(u => !selectedUserIds.includes(u.id)));
    setSelectedUserIds([]);
  };

  const toggleSelect = (id: string) => {
    setSelectedUserIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedUserIds.length === users.length) setSelectedUserIds([]);
    else setSelectedUserIds(users.map(u => u.id));
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
              <th style={{ padding: '0.875rem 1.25rem', width: 40 }}>
                <input type="checkbox" checked={selectedUserIds.length === users.length && users.length > 0} onChange={toggleSelectAll} style={{ width: 18, height: 18, cursor: 'pointer' }} />
              </th>
              {['Ad Soyad', 'E-mail', 'Telefon', 'Rol', 'Qeydiyyat', 'Əməliyyat'].map((h) => (
                <th key={h} style={{ padding: '0.875rem 1.25rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user.id} style={{ borderBottom: i < users.length - 1 ? '1px solid var(--color-border-light)' : 'none', background: selectedUserIds.includes(user.id) ? 'var(--color-primary-50)' : 'transparent' }}>
                <td style={{ padding: '1rem 1.25rem' }}>
                  <input type="checkbox" checked={selectedUserIds.includes(user.id)} onChange={() => toggleSelect(user.id)} style={{ width: 18, height: 18, cursor: 'pointer' }} />
                </td>
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
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => setGrantModal({ userId: user.id, userName: user.full_name || user.email, type: 'course' })}
                    >
                      🎓 Kurs ver
                    </button>
                    <button
                      className="btn btn-outline btn-sm"
                      style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
                      onClick={() => setGrantModal({ userId: user.id, userName: user.full_name || user.email, type: 'material' })}
                    >
                      📄 PDF ver
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!users.length && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>İstifadəçi yoxdur</div>
        )}
      </div>

      {/* Bulk Actions Floating Bar */}
      {selectedUserIds.length > 0 && (
        <div style={{ position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', background: 'var(--color-primary)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-full)', boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', gap: '1.5rem', zIndex: 100 }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{selectedUserIds.length} istifadəçi seçilib</span>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-sm" style={{ background: 'white', color: 'var(--color-primary)', border: 'none' }} onClick={() => setShowBulkModal('course')}>Toplu Kurs</button>
            <button className="btn btn-sm" style={{ background: 'white', color: 'var(--color-primary)', border: 'none' }} onClick={() => setShowBulkModal('material')}>Toplu PDF</button>
            <button className="btn btn-sm" style={{ background: '#FECACA', color: '#991B1B', border: 'none' }} onClick={deleteSelectedUsers}>Sil</button>
            <button className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none' }} onClick={() => setSelectedUserIds([])}>Ləğv Et</button>
          </div>
        </div>
      )}

      {/* Bulk Grant Modal */}
      {showBulkModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '1rem' }}>
          <div style={{ background: 'white', borderRadius: 'var(--radius-2xl)', padding: '2rem', width: '100%', maxWidth: '420px' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>{showBulkModal === 'course' ? 'Toplu Kurs Ver' : 'Toplu PDF Ver'}</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
              Seçilmiş <strong>{selectedUserIds.length}</strong> istifadəçiyə {showBulkModal === 'course' ? 'kurs' : 'PDF'} verin.
            </p>
            {showBulkModal === 'course' ? (
              <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} className="form-input form-select" style={{ marginBottom: '1.25rem' }}>
                <option value="">Kurs seçin...</option>
                {courses.map((c) => <option key={c.id} value={c.id}>{c.title_az}</option>)}
              </select>
            ) : (
              <select value={selectedMaterial} onChange={(e) => setSelectedMaterial(e.target.value)} className="form-input form-select" style={{ marginBottom: '1.25rem' }}>
                <option value="">PDF seçin...</option>
                {materials.map((m) => <option key={m.id} value={m.id}>{m.title_az}</option>)}
              </select>
            )}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={handleBulkGrant}>Təsdiqlə</button>
              <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowBulkModal(null)}>Ləğv et</button>
            </div>
          </div>
        </div>
      )}

      {/* Grant Modal (Single) */}
      {grantModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '1rem' }}>
          <div style={{ background: 'white', borderRadius: 'var(--radius-2xl)', padding: '2rem', width: '100%', maxWidth: '420px' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>{grantModal.type === 'course' ? 'Kurs ver' : 'PDF ver'}</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
              <strong>{grantModal.userName}</strong> istifadəçisinə {grantModal.type === 'course' ? 'kurs' : 'PDF'} ver
            </p>
            {grantModal.type === 'course' ? (
              <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} className="form-input form-select" style={{ marginBottom: '1.25rem' }}>
                <option value="">Kurs seçin...</option>
                {courses.map((c) => <option key={c.id} value={c.id}>{c.title_az}</option>)}
              </select>
            ) : (
              <select value={selectedMaterial} onChange={(e) => setSelectedMaterial(e.target.value)} className="form-input form-select" style={{ marginBottom: '1.25rem' }}>
                <option value="">PDF seçin...</option>
                {materials.map((m) => <option key={m.id} value={m.id}>{m.title_az}</option>)}
              </select>
            )}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={async () => {
                const supabase = createClient();
                if (grantModal.type === 'course') {
                  await supabase.from('user_courses').upsert({ user_id: grantModal.userId, course_id: selectedCourse });
                } else {
                  await supabase.from('user_materials').upsert({ user_id: grantModal.userId, material_id: selectedMaterial });
                }
                setGrantModal(null);
                alert('Giriş verildi!');
              }}>Təsdiqlə</button>
              <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setGrantModal(null)}>Ləğv et</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
