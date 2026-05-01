import { Metadata } from 'next';
import ConsultationClientPage from './ConsultationClientPage';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<string, string> = {
    az: 'Konsultasiya | Dr. Leyla Zülfüqarlı',
    ru: 'Консультация | Д-р Лейла Зульфугарлы',
    en: 'Consultation | Dr. Leyla Zülfüqarlı',
    de: 'Beratung | Dr. Leyla Zülfüqarlı',
  };

  const descriptions: Record<string, string> = {
    az: 'Peşəkar diyetoloq Leyla Zülfüqarlı ilə fərdi qidalanma planları üçün konsultasiyaya yazılın. 15+ il təcrübə, 12000+ pasient.',
    ru: 'Запишитесь на консультацию к врачу-диетологу Лейле Зульфугарлы для составления индивидуального плана питания. 15+ лет опыта, 12000+ пациентов.',
    en: 'Book a consultation with dietitian Dr. Leyla Zülfüqarlı for a personalized nutrition plan. 15+ years experience, 12,000+ patients.',
    de: 'Buchen Sie eine Beratung bei der Ernährungsberaterin Dr. Leyla Zülfüqarlı für einen individuellen Ernährungsplan. 15+ Jahre Erfahrung, 12.000+ Patienten.',
  };

  return {
    title: titles[locale] || titles.az,
    description: descriptions[locale] || descriptions.az,
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <ConsultationClientPage locale={locale} />;
}
