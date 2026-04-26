'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createClient } from '@/lib/supabase/client';
import { Save, User, CheckCircle, Mail, Phone } from 'lucide-react';

type ProfileForm = { full_name: string; phone: string };

export default function ProfilePage() {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pwSent, setPwSent] = useState(false);
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
        } else {
          // Pre-fill from auth metadata
          reset({
            full_name: session.user.user_metadata?.full_name || '',
            phone: session.user.user_metadata?.phone || '',
          });
        }
      }
    };
    load();
  }, [reset]);

  const onSubmit = async (data: ProfileForm) => {
    if (!user) return;
    setSaving(true);
    const supabase = createClient();
    await supabase.from('profiles').upsert({
      id: user.id,
      full_name: data.full_name.trim(),
      phone: data.phone.trim(),
      updated_at: new Date().toISOString(),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPw, setChangingPw] = useState(false);
  const [pwError, setPwError] = useState('');

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      setPwError('Şifrə ən azı 6 simvol olmalıdır');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError('Şifrələr eyni deyil');
      return;
    }
    setChangingPw(true);
    setPwError('');
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setChangingPw(false);
    
    if (error) {
      setPwError('Xəta baş verdi: ' + error.message);
    } else {
      setPwSent(true);
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPwSent(false), 3000);
    }
  };
  const avatarLetter = (user?.email?.[0] || 'U').toUpperCase();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '900px' }}>

      {/* Page header */}
      <div>
        <h1 style={{
          fontFamily: 'Space Grotesk, system-ui',
          fontSize: '1.5rem', fontWeight: 700,
          color: '#0F172A', letterSpacing: '-0.02em',
          marginBottom: '0.375rem',
        }}>
          Profil
        </h1>
        <p style={{ fontFamily: 'Inter, system-ui', fontSize: '0.9rem', color: '#64748B' }}>
          Hesab məlumatlarınızı idarə edin
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '1.5rem', alignItems: 'start' }}>

        {/* Profile Form Card */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 1px 4px rgba(15,23,42,0.08)',
          border: '1px solid #E2E8F0',
        }}>
          {/* Avatar row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid #F1F5F9' }}>
            <div style={{
              width: 60, height: 60, borderRadius: '50%',
              background: 'linear-gradient(135deg, hsl(150 100% 72%), hsl(175 85% 60%))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'hsl(165 60% 8%)',
              fontFamily: 'Space Grotesk, system-ui',
              fontSize: '1.5rem', fontWeight: 800,
              flexShrink: 0,
            }}>
              {avatarLetter}
            </div>
            <div>
              <div style={{ fontFamily: 'Space Grotesk, system-ui', fontWeight: 700, fontSize: '1rem', color: '#0F172A' }}>
                {user?.email}
              </div>
              <div style={{ fontFamily: 'Inter, system-ui', fontSize: '0.75rem', color: '#059669', fontWeight: 600, marginTop: '0.2rem' }}>
                ● Aktiv hesab
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontFamily: 'Inter, system-ui', fontSize: '0.8rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.4rem' }}>
                  Ad Soyad
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }} />
                  <input
                    {...register('full_name')}
                    style={{
                      width: '100%', boxSizing: 'border-box',
                      padding: '0.65rem 0.875rem 0.65rem 2.5rem',
                      borderRadius: '8px', border: '1.5px solid #E5E7EB',
                      fontFamily: 'Inter, system-ui', fontSize: '0.9rem',
                      color: '#1F2937', background: 'white',
                      outline: 'none', transition: 'border-color 0.2s',
                    }}
                    placeholder="Ad Soyad"
                    onFocus={(e) => e.target.style.borderColor = '#059669'}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                  />
                </div>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ fontFamily: 'Inter, system-ui', fontSize: '0.8rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.4rem' }}>
                  Telefon
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }} />
                  <input
                    {...register('phone')}
                    style={{
                      width: '100%', boxSizing: 'border-box',
                      padding: '0.65rem 0.875rem 0.65rem 2.5rem',
                      borderRadius: '8px', border: '1.5px solid #E5E7EB',
                      fontFamily: 'Inter, system-ui', fontSize: '0.9rem',
                      color: '#1F2937', background: 'white',
                      outline: 'none', transition: 'border-color 0.2s',
                    }}
                    placeholder="+994 XX XXX XX XX"
                    onFocus={(e) => e.target.style.borderColor = '#059669'}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                  />
                </div>
              </div>
            </div>

            <div>
              <label style={{ fontFamily: 'Inter, system-ui', fontSize: '0.8rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.4rem' }}>
                E-mail
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }} />
                <input
                  value={user?.email || ''}
                  disabled
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    padding: '0.65rem 0.875rem 0.65rem 2.5rem',
                    borderRadius: '8px', border: '1.5px solid #E5E7EB',
                    fontFamily: 'Inter, system-ui', fontSize: '0.9rem',
                    color: '#6B7280', background: '#F9FAFB',
                    cursor: 'not-allowed',
                  }}
                />
              </div>
              <p style={{ fontFamily: 'Inter, system-ui', fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.3rem' }}>
                Email dəyişdirilə bilməz
              </p>
            </div>

            <button
              type="submit"
              disabled={saving}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: saved ? '#059669' : 'linear-gradient(135deg, hsl(150 100% 72%), hsl(175 85% 60%))',
                color: saved ? 'white' : 'hsl(165 60% 8%)',
                border: 'none', borderRadius: '10px', cursor: saving ? 'not-allowed' : 'pointer',
                fontFamily: 'Space Grotesk, system-ui', fontWeight: 700, fontSize: '0.9rem',
                transition: 'all 0.2s',
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saved ? (
                <><CheckCircle size={16} /> Yadda saxlanıldı!</>
              ) : (
                <><Save size={16} /> {saving ? 'Saxlanır...' : 'Yadda saxla'}</>
              )}
            </button>
          </form>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Account status */}
          <div style={{
            background: 'white', borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 1px 4px rgba(15,23,42,0.08)',
            border: '1px solid #E2E8F0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: '8px', background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={18} color="#059669" />
              </div>
              <h3 style={{ fontFamily: 'Space Grotesk, system-ui', fontWeight: 700, fontSize: '0.95rem', color: '#0F172A' }}>
                Hesabınız aktifdir
              </h3>
            </div>
            <p style={{ fontFamily: 'Inter, system-ui', fontSize: '0.84rem', color: '#64748B', lineHeight: 1.6 }}>
              Hesabınız uğurla yaradılmışdır. Kurs almaq üçün WhatsApp vasitəsilə müraciət edin.
            </p>
            <a
              href="https://wa.me/994506684823"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                marginTop: '1rem',
                padding: '0.6rem 1.25rem',
                background: '#25D366', color: 'white',
                borderRadius: '8px',
                fontFamily: 'Inter, system-ui', fontWeight: 600, fontSize: '0.85rem',
                textDecoration: 'none',
              }}
            >
              WhatsApp
            </a>
          </div>

          {/* Password reset */}
          <div style={{
            background: 'white', borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 1px 4px rgba(15,23,42,0.08)',
            border: '1px solid #E2E8F0',
          }}>
            <h3 style={{ fontFamily: 'Space Grotesk, system-ui', fontWeight: 700, fontSize: '0.95rem', color: '#0F172A', marginBottom: '0.625rem' }}>
              🔐 Şifrə dəyişmə
            </h3>
            <p style={{ fontFamily: 'Inter, system-ui', fontSize: '0.84rem', color: '#64748B', lineHeight: 1.6, marginBottom: '1rem' }}>
              Yeni şifrənizi daxil edərək dərhal dəyişdirə bilərsiniz.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input
                type="password"
                placeholder="Yeni şifrə (ən azı 6 simvol)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '0.65rem 0.875rem',
                  borderRadius: '8px', border: '1.5px solid #E5E7EB',
                  fontFamily: 'Inter, system-ui', fontSize: '0.9rem',
                  color: '#1F2937', background: 'white',
                  outline: 'none', transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#059669'}
                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              />
              <input
                type="password"
                placeholder="Yeni şifrəni təkrarla"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '0.65rem 0.875rem',
                  borderRadius: '8px', border: '1.5px solid #E5E7EB',
                  fontFamily: 'Inter, system-ui', fontSize: '0.9rem',
                  color: '#1F2937', background: 'white',
                  outline: 'none', transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#059669'}
                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              />
              {pwError && <div style={{ color: '#EF4444', fontSize: '0.8rem', fontFamily: 'Inter' }}>{pwError}</div>}
              
              {pwSent ? (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.625rem 1rem',
                  background: '#F0FDF4', borderRadius: '8px',
                  fontFamily: 'Inter, system-ui', fontSize: '0.84rem',
                  color: '#059669', fontWeight: 600,
                }}>
                  <CheckCircle size={15} /> Şifrəniz uğurla dəyişdirildi!
                </div>
              ) : (
                <button
                  onClick={handleChangePassword}
                  disabled={changingPw || !newPassword || !confirmPassword}
                  style={{
                    padding: '0.625rem 1.25rem',
                    background: changingPw || !newPassword || !confirmPassword ? '#E5E7EB' : 'linear-gradient(135deg, hsl(150 100% 72%), hsl(175 85% 60%))',
                    color: changingPw || !newPassword || !confirmPassword ? '#9CA3AF' : 'hsl(165 60% 8%)',
                    border: 'none',
                    borderRadius: '8px', cursor: changingPw || !newPassword || !confirmPassword ? 'not-allowed' : 'pointer',
                    fontFamily: 'Space Grotesk, system-ui', fontWeight: 700, fontSize: '0.85rem',
                    transition: 'all 0.2s',
                    width: 'fit-content'
                  }}
                >
                  {changingPw ? 'Dəyişdirilir...' : 'Şifrəni yenilə'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
