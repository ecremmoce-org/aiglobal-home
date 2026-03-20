import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsHero from '@/components/news/NewsHero';
import NewsList from '@/components/news/NewsList';

const baseUrl = 'https://www.ecremmoce.io';
const locales = ['ko', 'en', 'ja', 'zh'];
const pagePath = '/news';

const localeMetadata: Record<string, { title: string; description: string; ogTitle: string; ogDescription: string }> = {
  ko: {
    title: '뉴스룸',
    description: 'ecremmoce의 최신 소식, 보도자료, 파트너십, 수상 및 인증 소식을 확인하세요.',
    ogTitle: '뉴스룸 | ecremmoce',
    ogDescription: 'ecremmoce의 최신 소식, 보도자료, 파트너십, 수상 및 인증 소식',
  },
  en: {
    title: 'Newsroom',
    description: 'Check out the latest news, press releases, partnerships, awards and certifications from ecremmoce.',
    ogTitle: 'Newsroom | ecremmoce',
    ogDescription: 'Latest news, press releases, partnerships, awards and certifications from ecremmoce',
  },
  ja: {
    title: 'ニュースルーム',
    description: 'ecremmoceの最新ニュース、プレスリリース、パートナーシップ、受賞・認証情報をご確認ください。',
    ogTitle: 'ニュースルーム | ecremmoce',
    ogDescription: 'ecremmoceの最新ニュース、プレスリリース、パートナーシップ、受賞・認証情報',
  },
  zh: {
    title: '新闻中心',
    description: '查看ecremmoce的最新消息、新闻稿、合作伙伴关系、获奖及认证信息。',
    ogTitle: '新闻中心 | ecremmoce',
    ogDescription: 'ecremmoce的最新消息、新闻稿、合作伙伴关系、获奖及认证信息',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = localeMetadata[locale] || localeMetadata.ko;

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: `${baseUrl}/${locale}${pagePath}`,
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

export default async function NewsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main className="pt-20">
        <NewsHero />
        <NewsList />
      </main>
      <Footer />
    </>
  );
}

