'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ChevronRight, Star, Award, Users } from 'lucide-react';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className={styles.hero}>
      {/* Background */}
      <div className={styles.bgMesh} />
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />
      <div className={styles.bgOrb3} />

      <div className="container">
        <div className={styles.inner}>
          {/* Left — Text Content */}
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <motion.div
              className="section-label"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Star size={11} /> {t('badge')}
            </motion.div>

            <motion.h1
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {t('title')}{' '}
              <span className={`${styles.titleHighlight} gradient-text`}>
                {t('titleHighlight')}
              </span>
            </motion.h1>

            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              className={styles.ctaGroup}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link href={`/${locale}/consultation`} className="btn btn-primary btn-lg">
                {t('cta1')} <ChevronRight size={18} />
              </Link>
              <a
                href="https://wa.me/994506684823"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              className={styles.statsRow}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.6 }}
            >
              {(['stat1', 'stat2', 'stat3', 'stat4'] as const).map((key, i, arr) => (
                <div key={key} className={styles.statItem}>
                  <span className={styles.statValue}>{t(key)}</span>
                  <span className={styles.statLabel}>{t(`${key}Label`)}</span>
                  {i < arr.length - 1 && <div className={styles.statDivider} />}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Image */}
          <motion.div
            className={styles.imageWrapper}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Background shape */}
            <div className={styles.imageBg} />
            <div className={styles.imageGlow} />

            {/* Floating Card 1 */}
            <motion.div
              className={`${styles.floatCard} ${styles.floatCard1}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <div className={styles.floatIcon} style={{ background: 'linear-gradient(135deg, #059669, #0D9488)' }}>
                <Award size={14} color="white" />
              </div>
              <div>
                <div className={styles.floatTitle}>8+ il</div>
                <div className={styles.floatSub}>Təcrübə</div>
              </div>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div
              className={`${styles.floatCard} ${styles.floatCard2}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <div className={styles.floatIcon} style={{ background: 'linear-gradient(135deg, #34D399, #059669)' }}>
                <Users size={14} color="white" />
              </div>
              <div>
                <div className={styles.floatTitle}>200+</div>
                <div className={styles.floatSub}>Müştəri</div>
              </div>
            </motion.div>

            <div className={styles.imageContainer}>
              <Image
                src="/images/dietolog-1.jpg"
                alt="Leyla Zülfüqarlı — Peşəkar Diyetoloq"
                width={480}
                height={560}
                priority
                className={styles.heroImage}
                style={{ objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
