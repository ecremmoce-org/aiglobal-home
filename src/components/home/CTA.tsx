'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';

export default function CTA() {
  return (
    <section className="relative h-screen flex items-center justify-center snap-start bg-[#030308]">
      {/* 배경 그라디언트 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-indigo-600/15 via-purple-600/10 to-pink-600/15 rounded-full blur-[180px]" />
      </div>

      {/* 그리드 라인 */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* 라벨 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-400 text-xs tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Get in Touch
          </span>
        </motion.div>

        {/* 메인 타이틀 */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-[1.2] mb-8"
        >
          <span className="text-white">글로벌 이커머스의</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">새로운 기준</span>
        </motion.h2>

        {/* 서브텍스트 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed"
        >
          AI가 연결하는 글로벌 이커머스 솔루션,
          <br className="hidden sm:block" />
          지금 ecremmoce와 함께 시작하세요.
        </motion.p>

        {/* CTA 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="group px-8 py-3.5 bg-white text-black font-semibold text-sm rounded-full transition-all hover:bg-gray-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            문의하기
          </Link>
          
          <a
            href="mailto:contact@ecremmoce.io"
            className="flex items-center gap-2 px-6 py-3.5 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <span>contact@ecremmoce.io</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

        {/* 서비스 링크 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-10 border-t border-white/5"
        >
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {[
              { name: 'acsell.ai', color: '#10b981' },
              { name: 'send4u.ai', color: '#f59e0b' },
              { name: 'ohmyorder.com', color: '#ec4899' },
              { name: 'market4u.ai', color: '#06b6d4' },
            ].map((service) => (
              <a
                key={service.name}
                href={`https://www.${service.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
              >
                <span 
                  className="w-2 h-2 rounded-full transition-transform group-hover:scale-125"
                  style={{ backgroundColor: service.color }}
                />
                {service.name}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
}
