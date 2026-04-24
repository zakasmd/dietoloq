'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createClient } from '@/lib/supabase/client';
import { Save, User } from 'lucide-react';

type ProfileForm = { full_name: string; phone: string };

export default function ProfilePage() {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [saved, setSaved] = useState(false);
  const { register, handleSubmit, reset } = useForm<ProfileForm>();

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        if (profile) {
          reset({ full_name: profile.full_name || '', phone: profile.phone || '' });
        }
      }
    };
    load();
  }, [reset]);

  const onSubmit = async (data: ProfileForm) => {
    if (!user) return;
    const supabase = createClient();
    await supabase.from('profiles').upsert({
      id: user.id,
      full_name: data.full_name,
      phone: data.phone,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem' }}>Profil məlumatları</h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Hesab məlumatlarınızı yeniləyin</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Profile Form */}
        <div style={{ background: 'white', borderRadius: 'var(--radius-2xl)', padding: '2rem', boxShadow: 'var(--shadow-card)', border: '1px solid var(--color-border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '1.75rem', fontWeight: 800, fontFamily: 'var(--font-heading)',
            }}>
              {user?.email?.[0].toUpperCase() || 'U'}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>{user?.email}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Hesab</div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
            <div className="form-group">
              <label className="form-label">Ad Soyad</label>
              <input {...register('full_name')} className="form-input" placeholder="Ad Soyad" />
            </div>
            <div className="form-group">
              <label className="form-label">E-mail</label>
              <input className="form-input" value={user?.email || ''} disabled style={{ background: 'var(--color-bg-secondary)', cursor: 'not-allowed' }} />
            </div>
            <div className="form-group">
              <label className="form-label">Telefon</label>
              <input {...register('phone')} className="form-input" placeholder="+994 XX XXX XX XX" />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Save size={16} /> {saved ? '✓ Yadda saxlanıldı!' : 'Yadda saxla'}
            </button>
          </form>
        </div>

        {/* Account Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-primary-100) 100%)', borderRadius: 'var(--radius-2xl)', padding: '1.75rem', border: '1.5px solid var(--color-primary-200)' }}>
            <User size={24} color="var(--color-primary)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Hesabınız aktifdir</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
              Hesabınız uğurla yaradılmışdır. Kurs almaq üçün WhatsApp vasitəsilə müraciət edin.
            </p>
          </div>
          <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '1.5rem', boxShadow: 'var(--shadow-card)', border: '1px solid var(--color-border-light)' }}>
            <h3 style={{ fontSize: '0.95rem', marginBottom: '0.75rem' }}>🔐 Şifrə dəyişmə</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
              Şifrənizi dəyişmək üçün e-mailinizə link göndəriləcək.
            </p>
            <button
              className="btn btn-outline btn-sm"
              onClick={async () => {
                const supabase = createClient();
                await supabase.auth.resetPasswordForEmail(user?.email || '');
                alert('Şifrə sıfırlama linki e-mailinizə göndərildi!');
              }}
            >
              Şifrəni sıfırla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
