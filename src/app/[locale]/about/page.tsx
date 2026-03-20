import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AboutHero from '@/components/about/AboutHero';
import BrandStory from '@/components/about/BrandStory';
import Vision from '@/components/about/Vision';
import Values from '@/components/about/Values';
import History from '@/components/about/History';
import Stats from '@/components/about/Stats';

const baseUrl = 'https://www.aiglobal.kr';
const locales = ['ko', 'en', 'ja', 'zh'];
const pagePath = '/about';

const localeMetadata: Record<string, { title: string; description: string; ogTitle: string; ogDescription: string }> = {
  ko: {
    title: '회사소개',
    description: 'AI Global는 ecommerce를 뒤집어 새로운 가능성을 열어가는 글로벌 이커머스 기술 기업입니다. 2019년 설립 이래 혁신적인 크로스보더 이커머스 솔루션을 제공합니다.',
    ogTitle: '회사소개 | AI Global',
    ogDescription: 'AI Global는 ecommerce를 뒤집어 새로운 가능성을 열어가는 글로벌 이커머스 기술 기업입니다.',
  },
  en: {
    title: 'About Us',
    description: 'AI Global is a global e-commerce technology company that opens new possibilities by flipping ecommerce. Since 2019, we have been providing innovative cross-border e-commerce solutions.',
    ogTitle: 'About Us | AI Global',
    ogDescription: 'AI Global is a global e-commerce technology company that opens new possibilities.',
  },
  ja: {
    title: '会社紹介',
    description: 'AI Globalは、ecommerceを逆転させて新しい可能性を開くグローバルEコマーステクノロジー企業です。2019年の設立以来、革新的なクロスボーダーEコマースソリューションを提供しています。',
    ogTitle: '会社紹介 | AI Global',
    ogDescription: 'AI Globalは、新しい可能性を開くグローバルEコマーステクノロジー企業です。',
  },
  zh: {
    title: '公司介绍',
    description: 'AI Global是一家通过颠覆电商开启新可能性的全球电商科技公司。自2019年成立以来，一直提供创新的跨境电商解决方案。',
    ogTitle: '公司介绍 | AI Global',
    ogDescription: 'AI Global是一家开启新可能性的全球电商科技公司。',
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

export default async function AboutPage({
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
        <AboutHero />
        <BrandStory />
        <Vision />
        <Values />
        <Stats />
        <History />
      </main>
      <Footer />
    </>
  );
}
