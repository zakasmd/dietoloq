'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { createClient } from '@/lib/supabase/client';
import { Eye, EyeOff, Lock, Mail, User, CheckCircle, AlertCircle } from 'lucide-react';
import styles from './LoginPage.module.css';

type LoginForm = { email: string; password: string };
type RegisterForm = { full_name: string; email: string; password: string; confirm: string };

export default function LoginPage() {
  const t = useTranslations('login');
  const tr = useTranslations('register');
  const ct = useTranslations('cta');
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
        setError(locale === 'az' ? 'Email və ya şifrə yanlışdır' : locale === 'ru' ? 'Неверный email или пароль' : 'Invalid email or password');
      } else if (error.message.includes('Email not confirmed')) {
        setError(locale === 'az' ? 'Email təsdiqlənməyib. Zəhmət olmasa email göndərilən linki yoxlayın.' : locale === 'ru' ? 'Email не подтвержден. Пожалуйста, проверьте ссылку, отправленную на email.' : 'Email not confirmed. Please check the link sent to your email.');
      } else {
        setError(locale === 'az' ? 'Giriş zamanı xəta baş verdi. Yenidən cəhd edin.' : locale === 'ru' ? 'Произошла ошибка при входе. Попробуйте еще раз.' : 'An error occurred during login. Please try again.');
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
      setError(locale === 'az' ? 'Şifrə ən azı 6 hərf olmalıdır' : locale === 'ru' ? 'Пароль должен содержать минимум 6 символов' : 'Password must be at least 6 characters');
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
        setError(locale === 'az' ? 'Bu email artıq qeydiyyatdan keçib. Daxil olmağa çalışın.' : locale === 'ru' ? 'Этот email уже зарегистрирован. Попробуйте войти.' : 'This email is already registered. Try to log in.');
      } else if (error.message.includes('invalid') || error.message.includes('Invalid')) {
        setError(locale === 'az' ? 'Düzgün email ünvanı daxil edin (məs: ad@gmail.com)' : locale === 'ru' ? 'Введите правильный адрес электронной почты (например: ad@gmail.com)' : 'Enter a valid email address (e.g. ad@gmail.com)');
      } else if (error.message.includes('rate limit')) {
        setError(locale === 'az' ? 'Çox sayda cəhd. Bir neçə dəqiqə gözləyin.' : locale === 'ru' ? 'Слишком много попыток. Подождите несколько минут.' : 'Too many attempts. Wait a few minutes.');
      } else {
        setError((locale === 'az' ? 'Xəta baş verdi: ' : locale === 'ru' ? 'Произошла ошибка: ' : 'An error occurred: ') + error.message);
      }
    } else {
      // Check if user session exists (email confirmation disabled)
      if (authData.session) {
        router.push('/dashboard');
      } else {
        // Email confirmation required
        setSuccessMsg(locale === 'az' ? 'Qeydiyyat uğurludur! Email göndərildi, zəhmət olmasa emailinizi yoxlayın.' : locale === 'ru' ? 'Регистрация прошла успешно! Письмо отправлено, пожалуйста, проверьте ваш email.' : 'Registration successful! Email sent, please check your email.');
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
          /* REGISTER FORM */
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
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
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
          <Link href={`/${locale}`} className={styles.backLink}>← {t('title')} (Home)</Link>
        </div>
      </div>
    </div>
  );
}
