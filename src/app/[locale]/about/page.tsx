import { Metadata } from 'next';
import AboutClientPage from './AboutClientPage';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<string, string> = {
    az: 'Haqqında | Dr. Leyla Zülfüqarlı',
    ru: 'О себе | Д-р Лейла Зульфугарлы',
    en: 'About Me | Dr. Leyla Zülfüqarlı',
    de: 'Über mich | Dr. Leyla Zülfüqarlı',
  };

  const descriptions: Record<string, string> = {
    az: 'Dr. Leyla Zülfüqarlı — Həkim diyetoloq, Nutrisioloq, Anti Age mütəxəssisi. 15+ il təcrübə, 12000+ uğurlu pasient nəticəsi.',
    ru: 'Д-р Лейла Зульфугарлы — врач-диетолог, нутрициолог, специалист по антивозрастной медицине. 15+ лет опыта, более 12 000 успешных пациентов.',
    en: 'Dr. Leyla Zülfüqarlı — Physician Dietitian, Nutritionist, Anti-Age Specialist. 15+ years of experience, 12,000+ successful patient transformations.',
    de: 'Dr. Leyla Zülfüqarlı — Fachärztin für Diätetik, Ernährungsberaterin, Anti-Age-Expertin. 15+ Jahre Erfahrung, über 12.000 erfolgreiche Patienten.',
  };

  return {
    title: titles[locale] || titles.az,
    description: descriptions[locale] || descriptions.az,
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <AboutClientPage locale={locale} />;
}
