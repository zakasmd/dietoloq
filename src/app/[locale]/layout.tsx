import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import '@/app/globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

type Locale = 'az' | 'ru' | 'en' | 'de';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    az: 'Dr. Leyla Zülfüqarlı | Həkim diyetoloq, Funksional Tibb, Anti Age',
    ru: 'Д-р Лейла Зульфугарлы | Врач-диетолог, Функциональная медицина, Анти-эйдж',
    en: 'Dr. Leyla Zülfüqarlı | Physician Dietitian, Functional Medicine, Anti-Age',
    de: 'Dr. Leyla Zülfüqarlı | Fachärztin für Diätetik, Funktionelle Medizin, Anti-Aging',
  };
  const descriptions: Record<string, string> = {
    az: 'Həkim diyetoloq, Nutrisioloq, Anti Age mütəxəssisi Dr. Leyla Zülfüqarlı. Azərbaycanda ilk sağlam bəslənmə və diyet kitablarının müəllifidir. 15+ il təcrübə, 12000+ pasient.',
    ru: 'Врач-диетолог, нутрициолог, специалист по антивозрастной медицине д-р Лейла Зульфугарлы. Автор первых в Азербайджане книг по диетологии. 15+ лет опыта, 12000+ пациентов.',
    en: 'Physician Dietitian, Nutritionist, Anti-Age Expert Dr. Leyla Zülfüqarlı. Author of the first nutrition books in Azerbaijan. 15+ years experience, 12,000+ successful patients.',
    de: 'Fachärztin für Diätetik, Ernährungsberaterin, Anti-Age-Expertin Dr. Leyla Zülfüqarlı. Autorin der ersten Ernährungsbücher in Aserbaidschan. 15+ Jahre Erfahrung, 12.000+ Patienten.',
  };
  return {
    title: titles[locale] || titles.az,
    description: descriptions[locale] || descriptions.az,
    openGraph: {
      title: titles[locale] || titles.az,
      description: descriptions[locale] || descriptions.az,
      url: 'https://www.leylazulfuqarli.com',
      siteName: 'Dr. Leyla Zülfüqarlı',
      locale: locale,
      type: 'website',
      images: [
        {
          url: '/images/dietolog-1.jpg',
          width: 1200,
          height: 630,
          alt: titles[locale] || titles.az,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale] || titles.az,
      description: descriptions[locale] || descriptions.az,
      images: ['/images/dietolog-1.jpg'],
    },
    alternates: {
      languages: {
        az: '/az',
        ru: '/ru',
        en: '/en',
        de: '/de',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {/* Static background — no animation loop for performance */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none',
        background: [
          'radial-gradient(ellipse 60% 50% at 10% 5%, hsl(150 80% 30% / 0.35) 0%, transparent 60%)',
          'radial-gradient(ellipse 55% 55% at 85% 85%, hsl(175 85% 35% / 0.30) 0%, transparent 60%)',
          'radial-gradient(ellipse 50% 45% at 50% 50%, hsl(165 50% 5%) 0%, hsl(165 45% 7%) 100%)',
        ].join(','),
      }} />
      <div style={{ position: 'relative', width: '100%', overflowX: 'hidden', overflowY: 'visible', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1, width: '100%', overflowX: 'hidden' }}>{children}</main>
        <Footer />
        <WhatsAppButton />
      </div>
    </NextIntlClientProvider>
  );
}
