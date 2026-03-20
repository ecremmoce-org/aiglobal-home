'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { type PressRelease } from '@/data/pressReleases';

const categoryColors: Record<string, string> = {
  press: 'bg-emerald-500/20 text-emerald-400',
  partnership: 'bg-indigo-500/20 text-indigo-400',
  award: 'bg-amber-500/20 text-amber-400',
};

interface NewsDetailProps {
  news: PressRelease;
}

export default function NewsDetail({ news }: NewsDetailProps) {
  const t = useTranslations('news');

  return (
    <article className="relative min-h-screen py-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent" />
      
      <div className="relative max-w-4xl mx-auto px-6">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link 
            href="/news" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <svg 
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>목록으로 돌아가기</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          {/* Category & Date */}
          <div className="flex items-center gap-4 mb-6">
            <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${categoryColors[news.category]}`}>
              {t(`categories.${news.category}` as Parameters<typeof t>[0])}
            </span>
            <span className="text-gray-500">{news.date}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            {news.title}
          </h1>
        </motion.header>

        {/* Featured Images */}
        {news.images && news.images.length > 0 ? (
          // 여러 이미지가 있는 경우
          <div className="space-y-6 mb-10">
            {news.images.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative w-full rounded-2xl overflow-hidden glass-card flex justify-center items-center bg-white/5 p-4"
              >
                <Image
                  src={img}
                  alt={`${news.title} - ${index + 1}`}
                  width={800}
                  height={600}
                  className="object-contain max-h-[70vh] w-auto h-auto rounded-lg"
                  priority={index === 0}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          // 단일 이미지
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative w-full rounded-2xl overflow-hidden mb-10 glass-card flex justify-center items-center bg-white/5 p-4"
          >
            <Image
              src={news.image}
              alt={news.title}
              width={800}
              height={600}
              className="object-contain max-h-[70vh] w-auto h-auto rounded-lg"
              priority
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          {/* Excerpt / Summary */}
          <div className="glass-card p-8 rounded-2xl mb-10">
            <p className="text-xl text-gray-300 leading-relaxed">
              {news.excerpt}
            </p>
          </div>

          {/* Full Content if available */}
          {news.content && (
            <div className="text-gray-300 leading-relaxed whitespace-pre-line">
              {news.content}
            </div>
          )}
        </motion.div>

        {/* Source & External Link */}
        {news.externalLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 glass-card p-6 rounded-2xl"
          >
            {/* Source Info */}
            {news.source && (
              <div className="flex items-center gap-2 mb-4 text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <span>출처: <strong className="text-white">{news.source}</strong></span>
              </div>
            )}
            
            {/* External Link Button */}
            <a
              href={news.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 bg-lime-500 hover:bg-lime-400 text-black font-semibold rounded-xl transition-colors group"
            >
              <span>{news.source ? `${news.source}에서 원문 보기` : '원문 기사 보기'}</span>
              <svg 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </motion.div>
        )}

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="my-16 border-t border-white/10"
        />

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-8 py-4 glass-card hover:bg-white/10 transition-colors rounded-xl text-white font-medium"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span>전체 보도자료 보기</span>
          </Link>
        </motion.div>
      </div>
    </article>
  );
}

