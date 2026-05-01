import { Metadata } from 'next';
import BookClientPage from './BookClientPage';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<string, string> = {
    az: 'Kitablar və Çaylar | Dr. Leyla Zülfüqarlı',
    ru: 'Книги и Чаи | Д-р Лейла Зульфугарлы',
    en: 'Books and Teas | Dr. Leyla Zülfüqarlı',
    de: 'Bücher und Tees | Dr. Leyla Zülfüqarlı',
  };

  const descriptions: Record<string, string> = {
    az: 'Dr. Leyla Zülfüqarlıdan sağlam bəslənmə kitabları və şəfalı bitki çayları. Sağlamlıq yolunda ilk addımı bizim məhsullarla atın.',
    ru: 'Книги о здоровом питании и лечебные травяные чаи от д-ра Лейлы Зульфугарлы. Сделайте первый шаг к здоровью с нашими продуктами.',
    en: 'Healthy nutrition books and healing herbal teas by Dr. Leyla Zülfüqarlı. Take the first step towards health with our products.',
    de: 'Bücher über gesunde Ernährung und heilende Kräutertees von Dr. Leyla Zülfüqarlı. Machen Sie den ersten Schritt zur Gesundheit mit unseren Produkten.',
  };

  return {
    title: titles[locale] || titles.az,
    description: descriptions[locale] || descriptions.az,
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <BookClientPage locale={locale} />;
}
