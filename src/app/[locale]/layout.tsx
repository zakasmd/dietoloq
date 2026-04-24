import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import '@/app/globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

type Locale = 'az' | 'ru' | 'en';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    az: 'Leyla Zülfüqarlı | Peşəkar Dietoloq',
    ru: 'Лейла Зюльфюгарлы | Профессиональный Диетолог',
    en: 'Leyla Zülfüqarlı | Professional Dietitian',
  };
  const descriptions: Record<string, string> = {
    az: 'Peşəkar dietoloq Leyla Zülfüqarlı ilə fərdi qidalanma planları, konsultasiya və kurslar. 8+ il təcrübə, 200+ müştəri.',
    ru: 'Профессиональный диетолог Лейла Зюльфюгарлы — индивидуальные планы питания, консультации и курсы. 8+ лет опыта, 200+ клиентов.',
    en: 'Professional dietitian Leyla Zülfüqarlı — personalized nutrition plans, consultations and courses. 8+ years experience, 200+ clients.',
  };
  return {
    title: titles[locale] || titles.az,
    description: descriptions[locale] || descriptions.az,
    alternates: {
      languages: {
        az: '/az',
        ru: '/ru',
        en: '/en',
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
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </NextIntlClientProvider>
  );
}
