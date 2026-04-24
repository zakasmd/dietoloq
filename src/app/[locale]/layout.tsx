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
      {/* Background blobs for Neon Mint Design */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="blob animate-float-slow"
             style={{ top: '-10%', left: '-5%', width: 500, height: 500,
                      background: 'radial-gradient(circle, hsl(150 100% 50% / 0.45), transparent 70%)' }} />
        <div className="blob animate-float-slow"
             style={{ top: '30%', right: '-10%', width: 600, height: 600,
                      background: 'radial-gradient(circle, hsl(175 90% 45% / 0.35), transparent 70%)',
                      animationDelay: '-6s' }} />
        <div className="blob animate-float-slow"
             style={{ bottom: '-15%', left: '20%', width: 550, height: 550,
                      background: 'radial-gradient(circle, hsl(165 80% 40% / 0.30), transparent 70%)',
                      animationDelay: '-12s' }} />
      </div>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </NextIntlClientProvider>
  );
}
