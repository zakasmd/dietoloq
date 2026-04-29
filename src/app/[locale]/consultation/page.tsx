'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@/lib/supabase/client';
import { CheckCircle, Phone } from 'lucide-react';
import styles from './ConsultationPage.module.css';

const schema = z.object({
  full_name: z.string().min(2, 'Ad ən azı 2 hərf olmalıdır'),
  phone: z.string().min(7, 'Telefon nömrəsi doğru deyil'),
  email: z.string().email('Email düzgün deyil').optional().or(z.literal('')),
  age: z.string().optional(),
  goal: z.string().min(1, 'Məqsədinizi seçin'),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ConsultationPage() {
  const t = useTranslations('consultation');
  const locale = useLocale();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const { sanitizeObject } = await import('@/lib/utils/sanitization');
      const cleanData = sanitizeObject(data);
      
      const supabase = createClient();
      const { error } = await supabase.from('consultations').insert([{
        full_name: cleanData.full_name,
        phone: cleanData.phone,
        email: cleanData.email || null,
        age: cleanData.age ? parseInt(cleanData.age) : null,
        goal: cleanData.goal,
        message: cleanData.message || null,
      }]);

      if (error) throw error;

      // Telegram bildirişi (Server-side API üzərindən)
      const goalLabel = t(`goalOptions.${cleanData.goal}`);
      const msg = `📋 Yeni Konsultasiya Müraciəti\n\n👤 Ad: ${cleanData.full_name}\n📞 Telefon: ${cleanData.phone}${cleanData.email ? `\n📧 Email: ${cleanData.email}` : ''}${cleanData.age ? `\n🎂 Yaş: ${cleanData.age}` : ''}\n🎯 Məqsəd: ${goalLabel}${cleanData.message ? `\n💬 Qeyd: ${cleanData.message}` : ''}`;
      
      fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg }),
      })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          console.error('Telegram notification error:', err.details || err.error);
        }
      })
      .catch((err) => console.error('Telegram fetch failed:', err));

      setSuccess(true);
      reset();
    } catch (err) {
      console.error(err);
      alert(t('error'));
    } finally {
      setLoading(false);
    }
  };

  const goalKeys = ['weightLoss', 'weightGain', 'maintenance', 'detox', 'antiAging', 'other'] as const;

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className="container">
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge badge-primary">📋 {t('eyebrow')}</span>
            <h1 className={styles.title}>{t('title')}</h1>
            <p className={styles.subtitle}>{t('subtitle')}</p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        <div className={styles.inner}>
          {/* Info Cards */}
          <motion.div
            className={styles.infoCol}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📋</div>
              <h3>{t('howItWorks')}</h3>
              <ol className={styles.steps}>
                <li>{t('step1')}</li>
                <li>{t('step2')}</li>
                <li>{t('step3')}</li>
                <li>{t('step4')}</li>
              </ol>
            </div>

            <div className={styles.contactCard}>
              <Phone size={20} color="hsl(var(--primary))" />
              <div>
                <div className={styles.contactLabel}>{t('callDirectly')}</div>
                <a href="tel:+994506684823" className={styles.contactPhone}>+994 50 668 48 23</a>
              </div>
            </div>

            <a
              href="https://wa.me/994506684823"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.625rem',
                width: '100%',
                padding: '1rem 1.5rem',
                background: '#25D366',
                color: 'white',
                borderRadius: '12px',
                fontFamily: 'Space Grotesk, system-ui',
                fontWeight: 700,
                fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(37,211,102,0.35)',
                transition: 'all 0.2s',
                letterSpacing: '-0.01em',
                boxSizing: 'border-box',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t('whatsappBtn')}
            </a>
          </motion.div>

          {/* Form */}
          <motion.div
            className={styles.formCol}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {success ? (
              <div className={styles.successBox}>
                <CheckCircle size={48} color="hsl(var(--primary))" />
                <h3>{t('successTitle')}</h3>
                <p>{t('success')}</p>
                <button className="btn btn-primary" onClick={() => setSuccess(false)}>
                  {t('newRequest')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
                <div className={styles.formGrid}>
                  <div className="form-group">
                    <label className="form-label">{t('fullName')} *</label>
                    <input
                      {...register('full_name')}
                      className="form-input"
                      placeholder="Ad Soyad"
                    />
                    {errors.full_name && <span className="form-error">{errors.full_name.message}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('phone')} *</label>
                    <input
                      {...register('phone')}
                      className="form-input"
                      placeholder="+994 XX XXX XX XX"
                      type="tel"
                    />
                    {errors.phone && <span className="form-error">{errors.phone.message}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('email')}</label>
                    <input
                      {...register('email')}
                      className="form-input"
                      placeholder="email@example.com"
                      type="email"
                    />
                    {errors.email && <span className="form-error">{errors.email.message}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('age')}</label>
                    <input
                      {...register('age')}
                      className="form-input"
                      placeholder="25"
                      type="number"
                      min="10"
                      max="100"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('goal')} *</label>
                  <select {...register('goal')} className="form-input form-select">
                    <option value="">{t('goalPlaceholder')}</option>
                    {goalKeys.map((key) => (
                      <option key={key} value={key}>
                        {t(`goalOptions.${key}`)}
                      </option>
                    ))}
                  </select>
                  {errors.goal && <span className="form-error">{errors.goal.message}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">{t('message')}</label>
                  <textarea
                    {...register('message')}
                    className="form-input form-textarea"
                    placeholder={t('messagePlaceholder')}
                    rows={4}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem', fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))', textAlign: 'center' }}>
                  {locale === 'az' ? (
                    <>Məlumatlarınızı göndərməklə <Link href={`/${locale}/privacy`} style={{ color: 'hsl(var(--primary))', textDecoration: 'underline' }}>Məxfilik Siyasəti</Link> ilə razılaşırsınız.</>
                  ) : locale === 'ru' ? (
                    <>Отправляя свои данные, вы соглашаетесь с <Link href={`/${locale}/privacy`} style={{ color: 'hsl(var(--primary))', textDecoration: 'underline' }}>Политикой конфиденциальности</Link>.</>
                  ) : (
                    <>By submitting your data, you agree to our <Link href={`/${locale}/privacy`} style={{ color: 'hsl(var(--primary))', textDecoration: 'underline' }}>Privacy Policy</Link>.</>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={loading}
                  style={{ width: '100%', justifyContent: 'center', boxSizing: 'border-box' }}
                >
                  {loading ? t('sending') : t('submit')}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
