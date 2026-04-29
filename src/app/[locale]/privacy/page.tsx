'use client';

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
  const locale = useLocale();

  const content = {
    az: {
      title: "Məxfilik Siyasəti",
      update: "Son yenilənmə: 29 Aprel 2024",
      intro: "Leyla Zülfüqarlı platforması olaraq şəxsi məlumatlarınızın gizliliyinə böyük önəm veririk. Bu sənəd məlumatların necə toplanması və qorunması haqqındadır.",
      sections: [
        {
          h: "1. Toplanan Məlumatlar",
          p: "Konsultasiya formları vasitəsilə ad, soyad və telefon nömrəniz toplanır. Həmçinin, Google Analytics vasitəsilə sayt daxilindəki davranışlarınız anonim şəkildə izlənilə bilər."
        },
        {
          h: "2. İstifadə Məqsədi",
          p: "Toplanan məlumatlar yalnız sizinlə əlaqə saxlamaq, xidmətlərimizi təkmilləşdirmək və sizə daha yaxşı təcrübə təqdim etmək üçün istifadə olunur."
        },
        {
          h: "3. Məlumatların Qorunması",
          p: "Sizin şəxsi məlumatlarınız Supabase bulud infrastrukturunda təhlükəsiz şəkildə saxlanılır və heç bir halda üçüncü tərəflərə satılmır və ya ötürülmür."
        }
      ]
    },
    ru: {
      title: "Политика конфиденциальности",
      update: "Последнее обновление: 29 апреля 2024 г.",
      intro: "Мы, платформа Лейлы Зульфугарлы, придаем большое значение конфиденциальности ваших личных данных. Этот документ описывает, как данные собираются и защищаются.",
      sections: [
        {
          h: "1. Собранные данные",
          p: "Ваше имя, фамилия и номер телефона собираются через формы консультации. Также ваше поведение на сайте может отслеживаться анонимно через Google Analytics."
        },
        {
          h: "2. Цель использования",
          p: "Собранные данные используются только для связи с вами, улучшения наших услуг и предоставления вам лучшего опыта."
        },
        {
          h: "3. Защита данных",
          p: "Ваши личные данные надежно хранятся в облачной инфраструктуре Supabase и ни при каких обстоятельствах не продаются и не передаются третьим лицам."
        }
      ]
    },
    en: {
      title: "Privacy Policy",
      update: "Last updated: April 29, 2024",
      intro: "As the Leyla Zülfüqarlı platform, we attach great importance to the privacy of your personal data. This document describes how data is collected and protected.",
      sections: [
        {
          h: "1. Collected Data",
          p: "Your name, surname and phone number are collected through consultation forms. Also, your behavior within the site can be monitored anonymously through Google Analytics."
        },
        {
          h: "2. Purpose of Use",
          p: "The collected data is used only to contact you, improve our services and provide you with a better experience."
        },
        {
          h: "3. Data Protection",
          p: "Your personal data is securely stored in the Supabase cloud infrastructure and is not sold or transferred to third parties under any circumstances."
        }
      ]
    }
  };

  const active = content[locale as keyof typeof content] || content.az;

  return (
    <div style={{ paddingTop: '10rem', paddingBottom: '12rem', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass"
          style={{ padding: '4rem', borderRadius: '2.5rem', border: '1px solid hsl(var(--primary)/0.15)' }}
        >
          <h1 className="text-gradient-mint" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>{active.title}</h1>
          <p style={{ color: 'hsl(var(--muted-foreground))', marginBottom: '3rem', fontSize: '0.9rem' }}>{active.update}</p>
          
          <p style={{ fontSize: '1.2rem', lineHeight: 1.7, marginBottom: '3rem', color: 'hsl(var(--foreground))' }}>{active.intro}</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {active.sections.map((section, idx) => (
              <div key={idx}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'hsl(var(--primary))' }}>{section.h}</h2>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'hsl(var(--muted-foreground))' }}>{section.p}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
