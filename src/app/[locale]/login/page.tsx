'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { createClient } from '@/lib/supabase/client';
import { Eye, EyeOff, Lock, Mail, User, CheckCircle, AlertCircle } from 'lucide-react';
import styles from './LoginPage.module.css';

type LoginForm = { email: string; password: string };
type RegisterForm = { full_name: string; email: string; password: string; confirm: string };

export default function LoginPage() {
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isRegister, setIsRegister] = useState(searchParams?.get('tab') === 'register');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const loginForm = useForm<LoginForm>();
  const regForm = useForm<RegisterForm>();

  // Check if user already logged in
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push('/dashboard');
    });
  }, [router]);

  const handleLogin = async (data: LoginForm) => {
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email.trim(),
      password: data.password,
    });
    if (error) {
      if (error.message.includes('Invalid login credentials') || error.message.includes('invalid')) {
        setError('Email və ya şifrə yanlışdır');
      } else if (error.message.includes('Email not confirmed')) {
        setError('Email təsdiqlənməyib. Zəhmət olmasa email göndərilən linki yoxlayın.');
      } else {
        setError('Giriş zamanı xəta baş verdi. Yenidən cəhd edin.');
      }
    } else {
      router.push('/dashboard');
    }
    setLoading(false);
  };

  const handleRegister = async (data: RegisterForm) => {
    if (data.password !== data.confirm) {
      setError('Şifrələr uyğun gəlmir');
      return;
    }
    if (data.password.length < 6) {
      setError('Şifrə ən azı 6 hərf olmalıdır');
      return;
    }
    setLoading(true);
    setError('');
    setSuccessMsg('');
    const supabase = createClient();

    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email.trim(),
      password: data.password,
      options: {
        data: { full_name: data.full_name.trim() },
      },
    });

    if (error) {
      if (error.message.includes('already registered') || error.message.includes('already been registered')) {
        setError('Bu email artıq qeydiyyatdan keçib. Daxil olmağa çalışın.');
      } else if (error.message.includes('invalid') || error.message.includes('Invalid')) {
        setError('Düzgün email ünvanı daxil edin (məs: ad@gmail.com)');
      } else if (error.message.includes('rate limit')) {
        setError('Çox sayda cəhd. Bir neçə dəqiqə gözləyin.');
      } else {
        setError('Xəta baş verdi: ' + error.message);
      }
    } else {
      // Check if user session exists (email confirmation disabled)
      if (authData.session) {
        router.push('/dashboard');
      } else {
        // Email confirmation required
        setSuccessMsg('Qeydiyyat uğurludur! Email göndərildi, zəhmət olmasa emailinizi yoxlayın.');
        setIsRegister(false);
        regForm.reset();
      }
    }
    setLoading(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.bgDecor} />
      <div className={styles.bgDecor2} />

      <div className={styles.card}>
        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoIconWrap}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="white"/>
            </svg>
          </div>
          <div>
            <div className={styles.logoName}>Leyla Zülfüqarlı</div>
            <div className={styles.logoSub}>Diyetoloq Platforması</div>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${!isRegister ? styles.tabActive : ''}`}
            onClick={() => { setIsRegister(false); setError(''); setSuccessMsg(''); }}
          >
            <Lock size={14} /> Daxil ol
          </button>
          <button
            className={`${styles.tab} ${isRegister ? styles.tabActive : ''}`}
            onClick={() => { setIsRegister(true); setError(''); setSuccessMsg(''); }}
          >
            <User size={14} /> Qeydiyyat
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className={styles.errorBox}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Success */}
        {successMsg && (
          <div className={styles.successBox}>
            <CheckCircle size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {!isRegister ? (
          /* LOGIN FORM */
          <form onSubmit={loginForm.handleSubmit(handleLogin)} className={styles.form} noValidate>
            <div className={styles.formTitle}>Hesabınıza daxil olun</div>

            <div className="form-group">
              <label className="form-label">E-mail</label>
              <div className={styles.inputWrapper}>
                <Mail size={16} className={styles.inputIcon} />
                <input
                  {...loginForm.register('email', { required: true })}
                  className="form-input"
                  style={{ paddingLeft: '2.75rem' }}
                  type="text"
                  placeholder="email@example.com"
                  autoComplete="email"
                  autoCapitalize="none"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Şifrə</label>
              <div className={styles.inputWrapper}>
                <Lock size={16} className={styles.inputIcon} />
                <input
                  {...loginForm.register('password', { required: true })}
                  className="form-input"
                  style={{ paddingLeft: '2.75rem', paddingRight: '2.75rem' }}
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPass(!showPass)}
                  aria-label="Şifrəni göstər/gizlə"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
              disabled={loading}
            >
              {loading ? 'Daxil olunur...' : 'Daxil ol'}
            </button>

            <p className={styles.switchText}>
              Hesabınız yoxdur?{' '}
              <button type="button" className={styles.switchBtn} onClick={() => { setIsRegister(true); setError(''); }}>
                Qeydiyyat
              </button>
            </p>
          </form>
        ) : (
          /* REGISTER FORM */
          <form onSubmit={regForm.handleSubmit(handleRegister)} className={styles.form} noValidate>
            <div className={styles.formTitle}>Yeni hesab yaradın</div>

            <div className="form-group">
              <label className="form-label">Ad Soyad</label>
              <div className={styles.inputWrapper}>
                <User size={16} className={styles.inputIcon} />
                <input
                  {...regForm.register('full_name', { required: true, minLength: 2 })}
                  className="form-input"
                  style={{ paddingLeft: '2.75rem' }}
                  placeholder="Ad Soyad"
                  autoComplete="name"
                />
              </div>
              {regForm.formState.errors.full_name && (
                <span className="form-error">Ad ən azı 2 hərf olmalıdır</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">E-mail</label>
              <div className={styles.inputWrapper}>
                <Mail size={16} className={styles.inputIcon} />
                <input
                  {...regForm.register('email', {
                    required: true,
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Düzgün email daxil edin'
                    }
                  })}
                  className="form-input"
                  style={{ paddingLeft: '2.75rem' }}
                  type="text"
                  placeholder="email@example.com"
                  autoComplete="email"
                  autoCapitalize="none"
                />
              </div>
              {regForm.formState.errors.email && (
                <span className="form-error">{regForm.formState.errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Şifrə</label>
              <div className={styles.inputWrapper}>
                <Lock size={16} className={styles.inputIcon} />
                <input
                  {...regForm.register('password', { required: true, minLength: { value: 6, message: 'Ən azı 6 hərf' } })}
                  className="form-input"
                  style={{ paddingLeft: '2.75rem', paddingRight: '2.75rem' }}
                  type={showPass ? 'text' : 'password'}
                  placeholder="Minimum 6 hərf"
                  autoComplete="new-password"
                />
                <button type="button" className={styles.eyeBtn} onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {regForm.formState.errors.password && (
                <span className="form-error">{regForm.formState.errors.password.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Şifrəni təkrarla</label>
              <div className={styles.inputWrapper}>
                <Lock size={16} className={styles.inputIcon} />
                <input
                  {...regForm.register('confirm', { required: true })}
                  className="form-input"
                  style={{ paddingLeft: '2.75rem', paddingRight: '2.75rem' }}
                  type={showConfirmPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                <button type="button" className={styles.eyeBtn} onClick={() => setShowConfirmPass(!showConfirmPass)}>
                  {showConfirmPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
              disabled={loading}
            >
              {loading ? 'Qeydiyyat edilir...' : 'Qeydiyyat ol'}
            </button>

            <p className={styles.switchText}>
              Hesabınız var?{' '}
              <button type="button" className={styles.switchBtn} onClick={() => { setIsRegister(false); setError(''); }}>
                Daxil ol
              </button>
            </p>
          </form>
        )}

        <div className={styles.back}>
          <Link href={`/${locale}`} className={styles.backLink}>← Ana səhifəyə qayıt</Link>
        </div>
      </div>
    </div>
  );
}
