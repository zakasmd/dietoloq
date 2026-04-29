'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { createClient } from '@/lib/supabase/client';
import { Eye, EyeOff, Lock, Mail, User, CheckCircle, AlertCircle } from 'lucide-react';
import styles from './LoginPage.module.css';

type LoginForm = { email: string; password: string };
type RegisterForm = { full_name: string; email: string; password: string; confirm: string };

function LoginContent() {
  const t = useTranslations('login');
  const tr = useTranslations('register');
  const nav = useTranslations('nav');
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


  // NOTE: We intentionally do NOT auto-redirect when session exists.
  // This prevents the infinite "Yüklənir..." loop when user presses browser back.
  // Users who are logged in and visit /login will just see the login form.

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
        setError(locale === 'az' ? 'Email və ya şifrə yanlışdır' : locale === 'ru' ? 'Неверный email или пароль' : 'Invalid email or password');
      } else if (error.message.includes('Email not confirmed')) {
        setError(locale === 'az' ? 'Email təsdiqlənməyib. Zəhmət olmasa emailinizi yoxlayın.' : locale === 'ru' ? 'Email не подтверждён. Проверьте письмо.' : 'Email not confirmed. Check your inbox.');
      } else {
        setError(locale === 'az' ? 'Giriş zamanı xəta baş verdi.' : locale === 'ru' ? 'Ошибка входа. Попробуйте снова.' : 'Login error. Please try again.');
      }
    } else {
      router.push('/dashboard');
    }
    setLoading(false);
  };

  const handleRegister = async (data: RegisterForm) => {
    if (data.password !== data.confirm) {
      setError(locale === 'az' ? 'Şifrələr uyğun gəlmir' : locale === 'ru' ? 'Пароли не совпадают' : 'Passwords do not match');
      return;
    }
    if (data.password.length < 6) {
      setError(locale === 'az' ? 'Şifrə ən azı 6 hərf olmalıdır' : locale === 'ru' ? 'Пароль минимум 6 символов' : 'Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    setError('');
    setSuccessMsg('');
    const { sanitizeInput } = await import('@/lib/utils/sanitization');
    const cleanFullName = sanitizeInput(data.full_name);
    
    const supabase = createClient();
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email.trim(),
      password: data.password,
      options: { data: { full_name: cleanFullName } },
    });
    if (error) {
      if (error.message.includes('already registered')) {
        setError(locale === 'az' ? 'Bu email artıq qeydiyyatdan keçib.' : locale === 'ru' ? 'Этот email уже зарегистрирован.' : 'This email is already registered.');
      } else {
        setError((locale === 'az' ? 'Xəta: ' : locale === 'ru' ? 'Ошибка: ' : 'Error: ') + error.message);
      }
    } else {
      if (authData?.session) {
        router.push('/dashboard');
      } else {
        setSuccessMsg(locale === 'az' ? 'Qeydiyyat uğurludur! İndi daxil ola bilərsiniz.' : locale === 'ru' ? 'Регистрация успешна! Теперь вы можете войти.' : 'Registration successful! You can now log in.');
        setIsRegister(false);
        regForm.reset();
      }
    }
    setLoading(false);
  };

  return (
    <div className={styles.page}>
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
            <div className={styles.logoSub}>{t('title')} / {tr('title')}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${!isRegister ? styles.tabActive : ''}`}
            onClick={() => { setIsRegister(false); setError(''); setSuccessMsg(''); }}
          >
            <Lock size={14} /> {t('title')}
          </button>
          <button
            className={`${styles.tab} ${isRegister ? styles.tabActive : ''}`}
            onClick={() => { setIsRegister(true); setError(''); setSuccessMsg(''); }}
          >
            <User size={14} /> {tr('title')}
          </button>
        </div>

        {error && (
          <div className={styles.errorBox}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className={styles.successBox}>
            <CheckCircle size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {!isRegister ? (
          <form onSubmit={loginForm.handleSubmit(handleLogin)} className={styles.form} noValidate>
            <div className={styles.formTitle}>{t('subtitle')}</div>

            <div className="form-group">
              <label className="form-label">{t('email')}</label>
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
              <label className="form-label">{t('password')}</label>
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
                <button type="button" className={styles.eyeBtn} onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', fontSize: '1rem', fontWeight: 600 }}
              disabled={loading}
            >
              {loading ? '...' : t('submit')}
            </button>

            <p className={styles.switchText}>
              {t('noAccount')}{' '}
              <button type="button" className={styles.switchBtn} onClick={() => { setIsRegister(true); setError(''); }}>
                {t('register')}
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={regForm.handleSubmit(handleRegister)} className={styles.form} noValidate>
            <div className={styles.formTitle}>{tr('subtitle')}</div>

            <div className="form-group">
              <label className="form-label">{tr('fullName')}</label>
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
              <label className="form-label">{tr('email')}</label>
              <div className={styles.inputWrapper}>
                <Mail size={16} className={styles.inputIcon} />
                <input
                  {...regForm.register('email', {
                    required: true,
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Düzgün email daxil edin' }
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
              <label className="form-label">{tr('password')}</label>
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
              <label className="form-label">{tr('confirmPassword')}</label>
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
              className="btn btn-primary btn-lg"
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', fontSize: '1rem', fontWeight: 600 }}
              disabled={loading}
            >
              {loading ? '...' : tr('submit')}
            </button>

            <p className={styles.switchText}>
              {tr('haveAccount')}{' '}
              <button type="button" className={styles.switchBtn} onClick={() => { setIsRegister(false); setError(''); }}>
                {tr('login')}
              </button>
            </p>
          </form>
        )}

        <div className={styles.back}>
          <Link href={`/${locale}`} className={styles.backLink}>← {nav('home')}</Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'hsl(var(--primary))', fontFamily: 'Space Grotesk,sans-serif' }}>Yüklənir...</div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
