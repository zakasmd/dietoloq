import { Metadata } from 'next';
import ServicesClientPage from './ServicesClientPage';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<string, string> = {
    az: 'Xidmətlər | Dr. Leyla Zülfüqarlı',
    ru: 'Услуги | Д-р Лейла Зульфугарлы',
    en: 'Services | Dr. Leyla Zülfüqarlı',
    de: 'Dienstleistungen | Dr. Leyla Zülfüqarlı',
  };

  const descriptions: Record<string, string> = {
    az: 'Diyetoloq Leyla Zülfüqarlı tərəfindən təklif olunan peşəkar xidmətlər: Arıqlama, çəki artımı, anti-aging, detoks və fərdi qidalanma proqramları.',
    ru: 'Профессиональные услуги диетолога Лейлы Зульфугарлы: похудение, набор веса, анти-эйдж, детокс и индивидуальные программы питания.',
    en: 'Professional dietitian services by Dr. Leyla Zülfüqarlı: Weight loss, weight gain, anti-aging, detox, and personalized nutrition programs.',
    de: 'Professionelle Dienstleistungen der Ernährungsberaterin Dr. Leyla Zülfüqarlı: Abnehmen, Zunehmen, Anti-Aging, Detox und individuelle Ernährungspläne.',
  };

  return {
    title: titles[locale] || titles.az,
    description: descriptions[locale] || descriptions.az,
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <ServicesClientPage locale={locale} />;
}
