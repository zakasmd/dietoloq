'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, Leaf, Droplets, Mic, FlaskConical, ArrowRight } from 'lucide-react';
import styles from './ServicesSection.module.css';

const icons = [TrendingDown, TrendingUp, Leaf, Droplets, FlaskConical, Mic];
const colors = [
  { bg: '#ECFDF5', icon: '#059669' },
  { bg: '#CCFBF1', icon: '#0D9488' },
  { bg: '#FFF7ED', icon: '#F59E0B' },
  { bg: '#EFF6FF', icon: '#3B82F6' },
  { bg: '#F0FDF4', icon: '#10B981' },
  { bg: '#EEF2FF', icon: '#6366F1' },
];

const serviceKeys = ['weightLoss', 'weightGain', 'antiAging', 'consultation', 'detox', 'media'] as const;

export default function ServicesSection() {
  const t = useTranslations('services');
  const locale = useLocale();

  return (
    <section className="section" style={{ background: 'var(--color-white)' }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>Xidmətlər</span>
          <h2>{t('title')}</h2>
          <div className="divider" />
          <p>{t('subtitle')}</p>
        </motion.div>

        <div className={styles.grid}>
          {serviceKeys.map((key, i) => {
            const Icon = icons[i];
            const color = colors[i];
            return (
              <motion.div
                key={key}
                className={styles.card}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div
                  className={styles.iconBox}
                  style={{ background: color.bg }}
                >
                  <Icon size={24} color={color.icon} />
                </div>
                <h3 className={styles.cardTitle}>{t(`items.${key}.title`)}</h3>
                <p className={styles.cardDesc}>{t(`items.${key}.desc`)}</p>
                <Link href={`/${locale}/services`} className={styles.cardLink}>
                  {t('learnMore')} <ArrowRight size={14} />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link href={`/${locale}/consultation`} className="btn btn-primary btn-lg">
            {t('learnMore')} <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
