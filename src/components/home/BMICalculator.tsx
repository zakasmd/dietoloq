'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import styles from './BMICalculator.module.css';

export default function BMICalculator() {
  const t = useTranslations('bmi');
  const locale = useLocale();
  
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [bmi, setBmi] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    const heightInMeters = height / 100;
    const calculatedBmi = weight / (heightInMeters * heightInMeters);
    setBmi(parseFloat(calculatedBmi.toFixed(1)));

    if (calculatedBmi < 18.5) {
      setCategory(t('categories.underweight'));
      setColor('#3498db');
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 25) {
      setCategory(t('categories.normal'));
      setColor('#2ecc71');
    } else if (calculatedBmi >= 25 && calculatedBmi < 30) {
      setCategory(t('categories.overweight'));
      setColor('#f1c40f');
    } else if (calculatedBmi >= 30 && calculatedBmi < 35) {
      setCategory(t('categories.obese1'));
      setColor('#e67e22');
    } else {
      setCategory(t('categories.obese2'));
      setColor('#e74c3c');
    }
  }, [weight, height, t]);

  const categories = [
    { range: '< 18.5', label: t('categories.underweight'), color: '#3498db' },
    { range: '18.5 - 24.9', label: t('categories.normal'), color: '#2ecc71' },
    { range: '25.0 - 29.9', label: t('categories.overweight'), color: '#f1c40f' },
    { range: '30.0 - 34.9', label: t('categories.obese1'), color: '#e67e22' },
    { range: '> 35.0', label: t('categories.obese2'), color: '#e74c3c' },
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          <motion.div 
            className={styles.content}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="eyebrow">{t('eyebrow')}</span>
            <h2 className={styles.title}>{t('title')}</h2>
            <p className={styles.description}>{t('description')}</p>
            <p className={styles.usage}>{t('usage')}</p>

            <div className={styles.tableCard}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{t('table.range')}</th>
                    <th>{t('table.category')}</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((item, idx) => (
                    <tr key={idx} style={{ color: bmi >= parseFloat(item.range.split('-')[0]) && (item.range.includes('>') ? true : bmi <= parseFloat(item.range.split('-')[1])) ? item.color : 'inherit', opacity: bmi >= parseFloat(item.range.split('-')[0]) && (item.range.includes('>') ? true : bmi <= parseFloat(item.range.split('-')[1])) ? 1 : 0.6 }}>
                      <td>{item.range}</td>
                      <td>{item.label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div 
            className={styles.calculatorCard}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-strong" style={{ padding: '2.5rem', borderRadius: '2rem', height: '100%' }}>
              <div className={styles.inputs}>
                <div className={styles.inputGroup}>
                  <label htmlFor="weight-input" className={styles.labelRow}>
                    <span>{t('weight')} (kg)</span>
                  </label>
                  <div className={styles.inputWrapper}>
                    <input 
                      id="weight-input"
                      type="number" 
                      value={weight === 0 ? '' : weight} 
                      onKeyDown={(e) => {
                        if (['e', 'E', '+', '-'].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val.length > 3) return;
                        const num = parseInt(val);
                        if (!isNaN(num)) {
                          if (num > 250) setWeight(250);
                          else setWeight(num);
                        } else {
                          setWeight(0);
                        }
                      }}
                      className={styles.numberInput}
                      placeholder="0"
                    />
                    <input 
                      type="range" 
                      min="10" 
                      max="250" 
                      value={weight} 
                      onChange={(e) => setWeight(parseInt(e.target.value))}
                      className={styles.rangeInput}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="height-input" className={styles.labelRow}>
                    <span>{t('height')} (cm)</span>
                  </label>
                  <div className={styles.inputWrapper}>
                    <input 
                      id="height-input"
                      type="number" 
                      value={height === 0 ? '' : height} 
                      onKeyDown={(e) => {
                        if (['e', 'E', '+', '-'].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val.length > 3) return;
                        const num = parseInt(val);
                        if (!isNaN(num)) {
                          if (num > 220) setHeight(220);
                          else setHeight(num);
                        } else {
                          setHeight(0);
                        }
                      }}
                      className={styles.numberInput}
                      placeholder="0"
                    />
                    <input 
                      type="range" 
                      min="50" 
                      max="220" 
                      value={height} 
                      onChange={(e) => setHeight(parseInt(e.target.value))}
                      className={styles.rangeInput}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.resultArea}>
                <div className={styles.bmiDisplay}>
                  <div className={styles.bmiCircle} style={{ borderColor: color }}>
                    <span className={styles.bmiValue}>
                      {weight > 0 && height > 0 ? bmi : '--'}
                    </span>
                    <span className={styles.bmiLabel}>BMI</span>
                  </div>
                </div>
                <div className={styles.categoryInfo}>
                  {weight > 0 && height > 0 ? (
                    <>
                      <div className={styles.statusBadge} style={{ backgroundColor: `${color}20`, color: color }}>
                        {category}
                      </div>
                      <p className={styles.advice}>
                        {bmi < 18.5 ? t('advice.underweight') : bmi < 25 ? t('advice.normal') : bmi < 30 ? t('advice.overweight') : t('advice.obese')}
                      </p>
                    </>
                  ) : (
                    <p className={styles.advice}>{t('usage')}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
