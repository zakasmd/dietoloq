'use client';

import { useState } from 'react';
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
      const supabase = createClient();
      const { error } = await supabase.from('consultations').insert([{
        full_name: data.full_name,
        phone: data.phone,
        email: data.email || null,
        age: data.age ? parseInt(data.age) : null,
        goal: data.goal,
        message: data.message || null,
      }]);

      if (error) throw error;
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
            <span className="badge badge-primary">📋 Konsultasiya</span>
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
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
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
              className="btn btn-whatsapp"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {t('whatsappBtn')}
            </a>
          </motion.div>

          {/* Form */}
          <motion.div
            className={styles.formCol}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
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

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={loading}
                  style={{ width: '100%', justifyContent: 'center' }}
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
