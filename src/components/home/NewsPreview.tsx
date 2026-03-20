'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';

// Mock news data - will be replaced with Supabase data
const mockNews = [
  {
    id: 1,
    category: 'notice',
    title: 'ecremmoce 2024 글로벌 파트너십 확대',
    titleEn: 'ecremmoce 2024 Global Partnership Expansion',
    date: '2024-12-01',
    excerpt: '동남아시아 및 일본 시장에서의 새로운 파트너십을 통해 글로벌 네트워크를 확장합니다.',
  },
  {
    id: 2,
    category: 'press',
    title: 'AI 기반 물류 최적화 솔루션 출시',
    titleEn: 'Launch of AI-powered Logistics Optimization Solution',
    date: '2024-11-15',
    excerpt: 'send4u.ai의 새로운 AI 엔진으로 배송 비용을 평균 30% 절감할 수 있습니다.',
  },
  {
    id: 3,
    category: 'update',
    title: 'acsell.ai 2.0 버전 업데이트',
    titleEn: 'acsell.ai Version 2.0 Update',
    date: '2024-11-01',
    excerpt: '더욱 강력해진 멀티채널 관리 기능과 실시간 분석 대시보드를 만나보세요.',
  },
];

const categoryColors: Record<string, string> = {
  notice: 'bg-indigo-500/20 text-indigo-400',
  press: 'bg-emerald-500/20 text-emerald-400',
  update: 'bg-amber-500/20 text-amber-400',
};

export default function NewsPreview() {
  const t = useTranslations('news');
  const common = useTranslations('common');

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              <span className="gradient-text">{t('title')}</span>
            </h2>
            <p className="text-gray-400 text-lg">
              {t('subtitle')}
            </p>
          </div>
          <Link
            href="/news"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors group"
          >
            <span>{common('viewAll')}</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockNews.map((news, index) => (
            <motion.article
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={`/news/${news.id}`} className="block glass-card p-6 h-full">
                {/* Category & Date */}
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[news.category]}`}>
                    {t(`categories.${news.category}` as Parameters<typeof t>[0])}
                  </span>
                  <span className="text-gray-500 text-sm">{news.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-indigo-400 transition-colors line-clamp-2">
                  {news.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-400 text-sm line-clamp-2">
                  {news.excerpt}
                </p>

                {/* Read More */}
                <div className="mt-4 flex items-center gap-2 text-sm text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{t('readMore')}</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

