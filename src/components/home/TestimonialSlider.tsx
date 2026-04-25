'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import styles from './TestimonialSlider.module.css';

// Removed hardcoded testimonials

export default function TestimonialSlider() {
  const t = useTranslations('testimonials');
  const nav = useTranslations('nav');
  const items = t.raw('items') as Array<{ name: string; text: string; result: string; avatar: string }>;
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? items.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === items.length - 1 ? 0 : c + 1));

  if (!items || items.length === 0) return null;

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge badge-accent" style={{ marginBottom: '1rem' }}>⭐ {nav('reviewsBadge')}</span>
          <h2>{t('title')}</h2>
          <div className="divider" />
          <p>{t('subtitle')}</p>
        </motion.div>

        <div className={styles.sliderWrapper}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current}
              className={`glass ${styles.card}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{ willChange: 'transform, opacity' }}
            >
              <div className={styles.quoteIcon}>"</div>
              <p className={styles.text}>{items[current].text}</p>
              <div className={styles.stars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="hsl(var(--primary))" color="hsl(var(--primary))" />
                ))}
              </div>
              <div className={styles.author}>
                <span className={styles.avatar}>{items[current].avatar}</span>
                <div>
                  <div className={styles.name}>{items[current].name}</div>
                  <div className={styles.result}>{items[current].result}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className={styles.controls}>
            <button className={styles.navBtn} onClick={prev} aria-label="Əvvəlki">
              <ChevronLeft size={20} />
            </button>
            <div className={styles.dots}>
              {items.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Rəy ${i + 1}`}
                />
              ))}
            </div>
            <button className={styles.navBtn} onClick={next} aria-label="Növbəti">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
