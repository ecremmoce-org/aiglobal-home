'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const services = [
  {
    key: 'acsell',
    url: 'https://www.acsell.ai',
    color: '#10b981',
    gradient: 'from-emerald-500 to-teal-600',
    features: [
      { icon: '🌐', title: '멀티채널 통합', desc: 'Qoo10, Shopee, Amazon 등 주요 마켓플레이스 한 번에 관리' },
      { icon: '📊', title: '실시간 분석', desc: '판매 데이터 실시간 모니터링 및 인사이트 제공' },
      { icon: '🔄', title: '자동 동기화', desc: '상품, 재고, 가격 정보 자동 동기화' },
      { icon: '📈', title: '성과 리포트', desc: '채널별 성과 비교 및 최적화 제안' },
    ],
  },
  {
    key: 'send4u',
    url: 'https://www.send4u.ai',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-600',
    features: [
      { icon: '🤖', title: 'AI 물류 최적화', desc: 'AI가 최적의 배송 경로와 방법을 추천' },
      { icon: '📦', title: '통합 배송 관리', desc: '여러 물류사 통합 관리 및 비교' },
      { icon: '🔍', title: '실시간 추적', desc: '전 세계 배송 현황 실시간 추적' },
      { icon: '💰', title: '비용 절감', desc: '평균 30% 배송비 절감 효과' },
    ],
  },
  {
    key: 'ohmyorder',
    url: 'https://www.ohmyorder.com',
    color: '#ec4899',
    gradient: 'from-pink-500 to-rose-600',
    features: [
      { icon: '📋', title: '주문 통합', desc: '모든 채널의 주문을 하나의 대시보드에서 관리' },
      { icon: '📦', title: '재고 동기화', desc: '실시간 재고 동기화로 품절 방지' },
      { icon: '👥', title: '고객 관리', desc: '통합 고객 데이터베이스 및 CS 관리' },
      { icon: '⚡', title: '자동화', desc: '주문 처리 자동화로 업무 효율 극대화' },
    ],
  },
  {
    key: 'market4u',
    url: 'https://www.market4u.ai',
    color: '#06b6d4',
    gradient: 'from-cyan-500 to-blue-600',
    features: [
      { icon: '🎯', title: 'AI 타겟팅', desc: 'AI가 분석한 최적의 타겟 고객층 추천' },
      { icon: '📱', title: '멀티채널 마케팅', desc: 'SNS, 검색, 디스플레이 광고 통합 관리' },
      { icon: '📊', title: '트렌드 분석', desc: '글로벌 시장 트렌드 실시간 분석' },
      { icon: '💡', title: '콘텐츠 최적화', desc: 'AI 기반 광고 카피 및 이미지 최적화' },
    ],
  },
];

export default function ServiceDetail() {
  const t = useTranslations('services');

  return (
    <section className="relative py-16">
      <div className="max-w-7xl mx-auto px-6">
        {services.map((service, index) => (
          <motion.div
            key={service.key}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-32 last:mb-0"
          >
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}>
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                {/* Service Badge */}
                <motion.a
                  href={service.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  className="inline-flex items-center gap-2 mb-6 group"
                >
                  <span
                    className="text-2xl font-bold font-heading"
                    style={{ color: service.color }}
                  >
                    {t(`${service.key}.name` as Parameters<typeof t>[0])}
                  </span>
                  <svg
                    className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                    style={{ color: service.color }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </motion.a>

                {/* Title */}
                <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
                  {t(`${service.key}.title` as Parameters<typeof t>[0])}
                </h2>

                {/* Description */}
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  {t(`${service.key}.description` as Parameters<typeof t>[0])}
                </p>

                {/* CTA Button */}
                <motion.a
                  href={service.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r ${service.gradient} shadow-lg`}
                  style={{ boxShadow: `0 10px 40px ${service.color}40` }}
                >
                  <span>서비스 바로가기</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              </div>

              {/* Features Grid */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                {service.features.map((feature, featureIndex) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: featureIndex * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="glass-card p-6 group"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${service.color}15` }}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {feature.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Divider */}
            {index < services.length - 1 && (
              <div className="mt-32 flex justify-center">
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

