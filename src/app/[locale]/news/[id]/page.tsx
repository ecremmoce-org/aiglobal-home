import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsDetail from '@/components/news/NewsDetail';
import { pressReleases } from '@/data/pressReleases';

const baseUrl = 'https://www.aiglobal.kr';
const locales = ['ko', 'en', 'ja', 'zh'];

// 정적 생성을 위한 params 생성
export function generateStaticParams() {
  return pressReleases.map((news) => ({
    id: news.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const news = pressReleases.find((n) => n.id.toString() === id);

  if (!news) {
    return {
      title: '뉴스를 찾을 수 없습니다',
    };
  }

  const pagePath = `/news/${id}`;

  return {
    title: news.title,
    description: news.excerpt,
    openGraph: {
      title: `${news.title} | AI Global`,
      description: news.excerpt,
      url: `${baseUrl}/${locale}${pagePath}`,
      type: 'article',
      publishedTime: news.date,
      images: news.image ? [{ url: `${baseUrl}${news.image}` }] : undefined,
      locale: locale === 'ko' ? 'ko_KR' : locale === 'en' ? 'en_US' : locale === 'ja' ? 'ja_JP' : 'zh_CN',
    },
    alternates: {
      canonical: `${baseUrl}/${locale}${pagePath}`,
      languages: Object.fromEntries([
        ...locales.map((l) => [l, `${baseUrl}/${l}${pagePath}`]),
        ['x-default', `${baseUrl}/ko${pagePath}`],
      ]),
    },
  };
}

export default async function NewsDetailPage({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const news = pressReleases.find((n) => n.id.toString() === id);

  if (!news) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        <NewsDetail news={news} />
      </main>
      <Footer />
    </>
  );
}





