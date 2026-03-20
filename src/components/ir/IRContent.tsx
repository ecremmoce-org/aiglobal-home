'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const irSections = [
  {
    key: 'overview',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: '#6366f1',
  },
  {
    key: 'financials',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: '#10b981',
  },
  {
    key: 'disclosures',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: '#f59e0b',
  },
];

// Mock IR documents
const documents = [
  {
    title: '2024년 3분기 실적 보고서',
    titleEn: 'Q3 2024 Earnings Report',
    date: '2024-11-15',
    type: 'financials',
    size: '2.4 MB',
  },
  {
    title: '2024년 반기 보고서',
    titleEn: 'H1 2024 Report',
    date: '2024-08-15',
    type: 'financials',
    size: '3.1 MB',
  },
  {
    title: '회사 소개서',
    titleEn: 'Company Introduction',
    date: '2024-10-01',
    type: 'overview',
    size: '5.2 MB',
  },
  {
    title: '주요 공시 자료',
    titleEn: 'Key Disclosures',
    date: '2024-09-20',
    type: 'disclosures',
    size: '1.8 MB',
  },
];

export default function IRContent() {
  const t = useTranslations('ir');

  return (
    <section className="relative py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* IR Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {irSections.map((section, index) => (
            <motion.div
              key={section.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-8 group"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${section.color}15`, color: section.color }}
              >
                {section.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {t(`${section.key}.title` as Parameters<typeof t>[0])}
              </h3>
              <p className="text-gray-400">
                {t(`${section.key}.description` as Parameters<typeof t>[0])}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Documents List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold font-heading text-white mb-8">
            자료실
          </h2>

          <div className="glass-card overflow-hidden">
            <div className="divide-y divide-white/5">
              {documents.map((doc, index) => (
                <motion.div
                  key={doc.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium group-hover:text-indigo-400 transition-colors">
                        {doc.title}
                      </h4>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span>{doc.date}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span className="text-sm font-medium">{t('download')}</span>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact for IR */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 glass-card p-10 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            IR 문의
          </h3>
          <p className="text-gray-400 mb-6">
            투자 관련 문의사항이 있으시면 연락주세요.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-300">
            <a href="mailto:ir@aiglobal.kr" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>ir@aiglobal.kr</span>
            </a>
            <a href="tel:+82-2-0000-0000" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+82-2-0000-0000</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

