'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Lock, Mail, Eye, EyeOff, AlertCircle, ShieldCheck } from 'lucide-react';

// Only this specific admin email can access the admin panel
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@dietoloq.az';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = createClient();

      // First check if this email is the admin email
      if (email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        setError('Bu email admin paneline giriş üçün icazəli deyil.');
        setLoading(false);
        return;
      }

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (authError) {
        if (authError.message.includes('Invalid login credentials')) {
          setError('Email və ya şifrə yanlışdır.');
        } else {
          setError('Giriş xətası: ' + authError.message);
        }
        setLoading(false);
        return;
      }

      if (data.session) {
        // Store admin session marker
        sessionStorage.setItem('admin_authenticated', 'true');
        router.push('/admin');
        router.refresh();
      }
    } catch {
      setError('Gözlənilməz xəta baş verdi.');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '16px',
            background: 'linear-gradient(135deg, hsl(150 100% 72%), hsl(175 85% 60%))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.25rem',
          }}>
            <ShieldCheck size={30} color="hsl(165 60% 8%)" />
          </div>
          <h1 style={{
            fontFamily: 'Space Grotesk, system-ui',
            fontSize: '1.5rem', fontWeight: 700,
            color: 'white', letterSpacing: '-0.02em',
            marginBottom: '0.375rem',
          }}>
            Admin Panel
          </h1>
          <p style={{
            fontFamily: 'Inter, system-ui',
            fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)',
          }}>
            Yalnız administrator girişi
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '2.5rem',
        }}>
          {error && (
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: '0.625rem',
              padding: '0.875rem 1rem',
              background: 'rgba(239,68,68,0.12)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '10px',
              marginBottom: '1.5rem',
              color: '#FCA5A5',
              fontFamily: 'Inter, system-ui', fontSize: '0.85rem',
            }}>
              <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Email */}
            <div>
              <label style={{
                display: 'block',
                fontFamily: 'Inter, system-ui', fontSize: '0.8rem', fontWeight: 600,
                color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem',
              }}>
                Admin E-mail
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{
                  position: 'absolute', left: '0.875rem', top: '50%',
                  transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)',
                  pointerEvents: 'none',
                }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="admin@dietoloq.az"
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    padding: '0.75rem 1rem 0.75rem 2.75rem',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '10px',
                    color: 'white',
                    fontFamily: 'Inter, system-ui', fontSize: '0.9rem',
                    outline: 'none',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'hsl(150 100% 72% / 0.6)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{
                display: 'block',
                fontFamily: 'Inter, system-ui', fontSize: '0.8rem', fontWeight: 600,
                color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem',
              }}>
                Şifrə
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{
                  position: 'absolute', left: '0.875rem', top: '50%',
                  transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)',
                  pointerEvents: 'none',
                }} />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    padding: '0.75rem 2.75rem 0.75rem 2.75rem',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '10px',
                    color: 'white',
                    fontFamily: 'Inter, system-ui', fontSize: '0.9rem',
                    outline: 'none',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'hsl(150 100% 72% / 0.6)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute', right: '0.875rem', top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center',
                    padding: 0,
                  }}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '0.875rem',
                background: loading ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, hsl(150 100% 72%), hsl(175 85% 60%))',
                color: loading ? 'rgba(255,255,255,0.5)' : 'hsl(165 60% 8%)',
                border: 'none', borderRadius: '10px', cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'Space Grotesk, system-ui', fontWeight: 700, fontSize: '0.95rem',
                transition: 'all 0.2s',
              }}
            >
              {loading ? 'Yüklənir...' : 'Daxil ol'}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <a
              href="/az"
              style={{
                fontFamily: 'Inter, system-ui', fontSize: '0.82rem',
                color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
              }}
            >
              ← Sayta qayıt
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
