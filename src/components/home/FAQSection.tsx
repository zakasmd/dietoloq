'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import styles from './FAQSection.module.css';

export default function FAQSection() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = t.raw('items') as { q: string; a: string }[];

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
          <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>FAQ</span>
          <h2>{t('title')}</h2>
          <div className="divider" />
        </motion.div>

        <div className={styles.faqList}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              className={`${styles.faqItem} ${openIndex === i ? styles.open : ''}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <button
                className={styles.question}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span>{item.q}</span>
                <span className={`${styles.chevron} ${openIndex === i ? styles.chevronOpen : ''}`}>
                  <ChevronDown size={20} />
                </span>
              </button>
              <div
                style={{
                  display: 'grid',
                  gridTemplateRows: openIndex === i ? '1fr' : '0fr',
                  transition: 'grid-template-rows 0.3s ease-in-out',
                }}
              >
                <div className={styles.answer}>
                  <div className={styles.answerInner}>{item.a}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
