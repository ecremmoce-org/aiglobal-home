import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';

const baseUrl = 'https://www.aiglobal.kr';
const locales = ['ko', 'en', 'ja', 'zh'];
const pagePath = '/contact';

const localeMetadata: Record<string, { title: string; description: string; ogTitle: string; ogDescription: string }> = {
  ko: {
    title: '문의하기',
    description: 'AI Global에 문의하세요. 글로벌 이커머스 솔루션에 대한 상담, 파트너십, 기술 지원 등 다양한 문의를 환영합니다.',
    ogTitle: '문의하기 | AI Global',
    ogDescription: 'AI Global에 문의하세요. 글로벌 이커머스 솔루션 상담을 환영합니다.',
  },
  en: {
    title: 'Contact Us',
    description: 'Contact AI Global. We welcome inquiries about global e-commerce solutions, partnerships, technical support and more.',
    ogTitle: 'Contact Us | AI Global',
    ogDescription: 'Contact AI Global. We welcome inquiries about global e-commerce solutions.',
  },
  ja: {
    title: 'お問い合わせ',
    description: 'AI Globalにお問い合わせください。グローバルEコマースソリューションに関するご相談、パートナーシップ、技術サポートなど、様々なお問い合わせを歓迎します。',
    ogTitle: 'お問い合わせ | AI Global',
    ogDescription: 'AI Globalにお問い合わせください。グローバルEコマースソリューションのご相談を歓迎します。',
  },
  zh: {
    title: '联系我们',
    description: '请联系AI Global。我们欢迎关于全球电商解决方案、合作伙伴关系、技术支持等各种咨询。',
    ogTitle: '联系我们 | AI Global',
    ogDescription: '请联系AI Global。我们欢迎关于全球电商解决方案的咨询。',
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

export default async function ContactPage({
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
        <ContactHero />
        <section className="relative py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ContactForm />
              <ContactInfo />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

