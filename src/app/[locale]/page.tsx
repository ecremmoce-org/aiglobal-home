import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CitixHero from '@/components/home/CitixHero';
import ServiceFullpage from '@/components/home/ServiceFullpage';
import CTA from '@/components/home/CTA';

const baseUrl = 'https://www.ecremmoce.io';
const locales = ['ko', 'en', 'ja', 'zh'];

// 언어별 메타데이터
const localeMetadata: Record<string, { title: string; description: string; ogDescription: string }> = {
  ko: {
    title: 'ecremmoce - 글로벌 이커머스 올인원 솔루션',
    description: '전 세계가 당신의 마켓입니다. 판매, 배송, 관리, 성장 — 하나의 플랫폼으로 글로벌 이커머스의 모든 것을 연결합니다.',
    ogDescription: '전 세계가 당신의 마켓입니다. acsell.ai, send4u.ai, ohmyorder.com, market4u.ai',
  },
  en: {
    title: 'ecremmoce - Global E-commerce All-in-One Solution',
    description: 'The world is your market. Selling, shipping, management, growth — connect everything in global e-commerce with one platform.',
    ogDescription: 'The world is your market. acsell.ai, send4u.ai, ohmyorder.com, market4u.ai',
  },
  ja: {
    title: 'ecremmoce - グローバルEコマース オールインワン ソリューション',
    description: '世界があなたのマーケットです。販売、配送、管理、成長 — 1つのプラットフォームでグローバルEコマースのすべてをつなぎます。',
    ogDescription: '世界があなたのマーケットです。acsell.ai, send4u.ai, ohmyorder.com, market4u.ai',
  },
  zh: {
    title: 'ecremmoce - 全球电商一站式解决方案',
    description: '全球都是您的市场。销售、物流、管理、增长 — 一个平台连接全球电商的一切。',
    ogDescription: '全球都是您的市场。acsell.ai, send4u.ai, ohmyorder.com, market4u.ai',
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
      title: meta.title,
      description: meta.ogDescription,
      url: `${baseUrl}/${locale}`,
      locale: locale === 'ko' ? 'ko_KR' : locale === 'en' ? 'en_US' : locale === 'ja' ? 'ja_JP' : 'zh_CN',
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: Object.fromEntries([
        ...locales.map((l) => [l, `${baseUrl}/${l}`]),
        ['x-default', `${baseUrl}/ko`],
      ]),
    },
  };
}

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main className="snap-container hide-scrollbar">
        <CitixHero />
        <ServiceFullpage />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
