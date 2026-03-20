import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ServicesHero from '@/components/services/ServicesHero';
import ServiceDetail from '@/components/services/ServiceDetail';

const baseUrl = 'https://www.ecremmoce.io';
const locales = ['ko', 'en', 'ja', 'zh'];
const pagePath = '/services';

const localeMetadata: Record<string, { title: string; description: string; ogTitle: string; ogDescription: string }> = {
  ko: {
    title: '서비스',
    description: 'acsell.ai(해외판매 가속화), send4u.ai(해외배송 최적화), ohmyorder.com(주문통합관리), market4u.ai(AI마케팅) - 글로벌 이커머스의 모든 것을 연결합니다.',
    ogTitle: '서비스 | ecremmoce',
    ogDescription: 'acsell.ai, send4u.ai, ohmyorder.com, market4u.ai - 글로벌 이커머스의 모든 것을 연결합니다.',
  },
  en: {
    title: 'Services',
    description: 'acsell.ai (Accelerate overseas sales), send4u.ai (Optimize international shipping), ohmyorder.com (Unified order management), market4u.ai (AI Marketing) - Connecting everything in global e-commerce.',
    ogTitle: 'Services | ecremmoce',
    ogDescription: 'acsell.ai, send4u.ai, ohmyorder.com, market4u.ai - Connecting everything in global e-commerce.',
  },
  ja: {
    title: 'サービス',
    description: 'acsell.ai（海外販売加速）、send4u.ai（海外配送最適化）、ohmyorder.com（注文統合管理）、market4u.ai（AIマーケティング）- グローバルEコマースのすべてをつなぎます。',
    ogTitle: 'サービス | ecremmoce',
    ogDescription: 'acsell.ai, send4u.ai, ohmyorder.com, market4u.ai - グローバルEコマースのすべてをつなぎます。',
  },
  zh: {
    title: '服务',
    description: 'acsell.ai（加速海外销售）、send4u.ai（优化海外物流）、ohmyorder.com（订单统一管理）、market4u.ai（AI营销）- 连接全球电商的一切。',
    ogTitle: '服务 | ecremmoce',
    ogDescription: 'acsell.ai, send4u.ai, ohmyorder.com, market4u.ai - 连接全球电商的一切。',
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
    keywords: ['acsell.ai', 'send4u.ai', 'ohmyorder.com', 'market4u.ai', '해외판매', '해외배송', '주문관리', 'AI마케팅', '글로벌셀러'],
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

export default async function ServicesPage({
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
        <ServicesHero />
        <ServiceDetail />
      </main>
      <Footer />
    </>
  );
}

