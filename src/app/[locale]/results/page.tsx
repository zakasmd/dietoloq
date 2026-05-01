import { Metadata } from 'next';
import ResultsClientPage from './ResultsClientPage';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<string, string> = {
    az: 'Nəticələr | Dr. Leyla Zülfüqarlı',
    ru: 'Результаты | Д-р Лейла Зульфугарлы',
    en: 'Results | Dr. Leyla Zülfüqarlı',
    de: 'Ergebnisse | Dr. Leyla Zülfüqarlı',
  };

  const descriptions: Record<string, string> = {
    az: 'Pasiyentlərimizin uğur hekayələri və real transformasiya nəticələri. 12000+ uğurlu nəticə və sağlam qidalanma transformasiyası.',
    ru: 'Истории успеха наших пациентов и результаты реальных трансформаций. Более 12 000 успешных результатов и преображений.',
    en: 'Our patients\' success stories and real transformation results. 12,000+ successful results and healthy nutrition transformations.',
    de: 'Erfolgsgeschichten unserer Patienten und echte Transformationsergebnisse. Über 12.000 erfolgreiche Ergebnisse.',
  };

  return {
    title: titles[locale] || titles.az,
    description: descriptions[locale] || descriptions.az,
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <ResultsClientPage locale={locale} />;
}
