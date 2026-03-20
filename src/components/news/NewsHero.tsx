'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function NewsHero() {
  const t = useTranslations('news');

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6">
            <span className="gradient-text">{t('title')}</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

