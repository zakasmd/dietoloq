'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import styles from './AboutSnippet.module.css';

export default function AboutSnippet() {
  const t = useTranslations('about');
  const locale = useLocale();

  const highlights = [
    { icon: '⏱️', val: '8+', label: t('experience') },
    { icon: '🏅', val: '15+', label: t('certificates') },
    { icon: '👤', val: '200+', label: t('clients') },
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          {/* Image */}
          <motion.div
            className={styles.imageWrapper}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className={styles.imageBg} />
            <div className={styles.imageCard}>
              <Image
                src="/images/dietolog-2.jpg"
                alt="Leyla Zülfüqarlı"
                width={440}
                height={520}
                className={styles.image}
                style={{ objectFit: 'cover', objectPosition: 'top', width: '100%', height: '100%' }}
              />
            </div>

            {/* Cert Badge */}
            <motion.div
              className={styles.certBadge}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <CheckCircle size={16} color="#059669" />
              <div>
                <div className={styles.certTitle}>15+ Sertifikat</div>
                <div className={styles.certSub}>Klinik Nutrisyon</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="section-label">✦ {t('title')}</div>
            <h2 className={styles.title}>Leyla Zülfüqarlı</h2>
            <div className="divider divider-left" />
            <p className={styles.bio}>{t('shortBio')}</p>

            {/* Stats */}
            <div className={styles.statsGrid}>
              {highlights.map((h) => (
                <div key={h.label} className={styles.statCard}>
                  <span className={styles.statIcon}>{h.icon}</span>
                  <span className={styles.statVal}>{h.val}</span>
                  <span className={styles.statLabel}>{h.label}</span>
                </div>
              ))}
            </div>

            <Link href={`/${locale}/about`} className="btn btn-primary">
              {t('readMore')} <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
