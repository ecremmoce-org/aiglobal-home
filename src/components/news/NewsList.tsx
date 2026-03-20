'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { pressReleases } from '@/data/pressReleases';

const categories = ['all', 'press', 'partnership', 'award'] as const;

const categoryColors: Record<string, string> = {
  press: 'bg-emerald-500/20 text-emerald-400',
  partnership: 'bg-indigo-500/20 text-indigo-400',
  award: 'bg-amber-500/20 text-amber-400',
};

export default function NewsList() {
  const t = useTranslations('news');
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('all');

  // 최신순으로 정렬
  const sortedNews = [...pressReleases].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filteredNews = activeCategory === 'all' 
    ? sortedNews 
    : sortedNews.filter(news => news.category === activeCategory);

  return (
    <section className="relative py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-lime-500 text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {t(`categories.${category}` as Parameters<typeof t>[0])}
            </button>
          ))}
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news, index) => (
            <motion.article
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={`/news/${news.id}`} className="block glass-card overflow-hidden h-full cursor-pointer">
                {/* Thumbnail Image */}
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                
                <div className="p-6">
                  {/* Category & Date */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[news.category]}`}>
                      {t(`categories.${news.category}` as Parameters<typeof t>[0])}
                    </span>
                    <span className="text-gray-500 text-sm">{news.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-lime-400 transition-colors line-clamp-2">
                    {news.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                    {news.excerpt}
                  </p>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-sm text-lime-400 group-hover:gap-3 transition-all">
                    <span>{t('readMore')}</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <p className="text-gray-500">{t('noNews')}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
