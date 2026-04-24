'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import styles from './TestimonialSlider.module.css';

const testimonials = [
  {
    name: 'Aynur M.',
    text: 'Leyla xanımın planı ilə 2 ayda 8 kq arıqladım. Heç vaxt aclıq hiss etmədim, enerji səviyyəm çox yüksəldi!',
    rating: 5,
    result: '-8 kq / 2 ay',
    avatar: '👩',
  },
  {
    name: 'Sevinc H.',
    text: 'İdmansız arıqlama metodunu başlanğıcda inanmamışdım, amma 6 həftədə 5 kq itirdim. Çox minnətdaram!',
    rating: 5,
    result: '-5 kq / 6 həftə',
    avatar: '👩‍🦱',
  },
  {
    name: 'Rəna Ə.',
    text: 'Hamiləlik dövründə çox narahat idim. Leyla xanım mənə xüsusi plan hazırladı, özümü çox yaxşı hiss etdim.',
    rating: 5,
    result: 'Hamiləlik planı',
    avatar: '🤰',
  },
  {
    name: 'Könül S.',
    text: 'Anti-ageing qidalanma planından sonra özümü 10 yaş cavan hiss edirəm. Dərim də çox yaxşılaşdı.',
    rating: 5,
    result: 'Anti-ageing proqramı',
    avatar: '👩‍🦳',
  },
  {
    name: 'Lalə T.',
    text: '3 ay ərzində 12 kq arıqladım. Plan tamamilə fərdiləşdirilmişdi, ailəm belə fərqi gördü!',
    rating: 5,
    result: '-12 kq / 3 ay',
    avatar: '👩‍🦰',
  },
];

export default function TestimonialSlider() {
  const t = useTranslations('testimonials');
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

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
          <span className="badge badge-accent" style={{ marginBottom: '1rem' }}>⭐ Rəylər</span>
          <h2>{t('title')}</h2>
          <div className="divider" />
          <p>{t('subtitle')}</p>
        </motion.div>

        <div className={styles.sliderWrapper}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className={styles.card}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <div className={styles.quoteIcon}>"</div>
              <p className={styles.text}>{testimonials[current].text}</p>
              <div className={styles.stars}>
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <div className={styles.author}>
                <span className={styles.avatar}>{testimonials[current].avatar}</span>
                <div>
                  <div className={styles.name}>{testimonials[current].name}</div>
                  <div className={styles.result}>{testimonials[current].result}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className={styles.controls}>
            <button className={styles.navBtn} onClick={prev} aria-label="Əvvəlki">
              <ChevronLeft size={20} />
            </button>
            <div className={styles.dots}>
              {testimonials.map((_, i) => (
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
