'use client';
// Service Fullpage with background images
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ServiceData {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  features: string[];
  isAI: boolean;
  backgroundImage?: string;
}

const services: ServiceData[] = [
  {
    id: 'acsell',
    name: 'acsell.ai',
    title: 'SELL',
    subtitle: '판매가속화 서비스',
    description: 'AI가 분석한 최적의 상품 전략으로\n글로벌 마켓플레이스를 정복하세요',
    color: '#10b981',
    features: ['상품 자동 번역', '가격 최적화', '재고 동기화', '다채널 관리'],
    isAI: true,
    backgroundImage: '/acsell-ai.jpeg',
  },
  {
    id: 'ohmyorder',
    name: 'ohmyorder.com',
    title: 'MANAGE',
    subtitle: '글로벌 통합 주문관리 서비스',
    description: '흩어진 주문을 하나로 모아\n효율적인 운영을 실현합니다',
    color: '#ec4899',
    features: ['통합 대시보드', '자동 주문 처리', '재고 알림', '리포트 분석'],
    isAI: false,
    backgroundImage: '/omo.jpeg',
  },
  {
    id: 'send4u',
    name: 'send4u.ai',
    title: 'SHIP',
    subtitle: '물류최적화 서비스',
    description: 'AI가 계산한 최적 배송 경로로\n비용은 낮추고 속도는 높입니다',
    color: '#f59e0b',
    features: ['배송비 최적화', '실시간 추적', '통관 자동화', '반품 관리'],
    isAI: true,
    backgroundImage: '/send4u.jpeg',
  },
  {
    id: 'market4u',
    name: 'market4u.ai',
    title: 'GROW',
    subtitle: '마케팅자동화 서비스',
    description: 'AI가 찾아낸 타겟 고객에게\n최적의 메시지를 전달합니다',
    color: '#06b6d4',
    features: ['타겟 분석', '광고 자동화', '성과 최적화', 'ROI 추적'],
    isAI: true,
    backgroundImage: '/market4u.jpeg',
  },
];

function ServiceSection({ service, index }: { service: ServiceData; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [0, 0.3], [index % 2 === 0 ? -100 : 100, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center snap-start overflow-hidden"
      style={{ backgroundColor: '#030308' }}
    >
      {/* 배경 이미지 */}
      {service.backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${service.backgroundImage})`,
          }}
        >
          {/* 최소한의 오버레이 - 배경이 잘 보이도록 */}
          <div className="absolute inset-0 bg-black/20" />
          {/* 그라데이션 오버레이 - 텍스트 가독성을 위해 왼쪽만 어둡게 */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        </div>
      )}

      {/* 배경 글로우 */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] opacity-20"
        style={{ backgroundColor: service.color }}
      />

      {/* 배경 대형 텍스트 */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <span
          className="text-[30vw] font-bold font-heading opacity-[0.03] select-none"
          style={{ color: service.color }}
        >
          {service.title}
        </span>
      </div>

      {/* 중앙 서비스 타이틀 */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* 서비스 설명 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl lg:text-4xl text-white/90 font-medium mb-4"
          >
            {service.subtitle}
          </motion.p>

          {/* 서비스명 */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black font-heading tracking-tight px-4"
            style={{ color: service.color }}
          >
            {service.name}
          </motion.h2>


          {/* CTA 버튼 */}
          <motion.a
            href={`https://www.${service.name}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="inline-flex items-center gap-3 mt-8 px-8 py-4 rounded-full font-semibold text-lg transition-all hover:gap-5 hover:scale-105"
            style={{ 
              backgroundColor: service.color,
              color: '#000'
            }}
          >
            <span>서비스 바로가기</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      {/* 인덱스 표시 */}
      <div className="absolute bottom-10 left-10">
        <span className="text-8xl md:text-9xl font-bold font-heading text-lime-400/30">
          0{index + 1}
        </span>
      </div>

      {/* 서비스 타이틀 (우측) */}
      <div className="absolute bottom-8 right-8 hidden md:block">
        <span
          className="text-sm tracking-[0.3em] uppercase"
          style={{ color: service.color }}
        >
          {service.title}
        </span>
      </div>
    </section>
  );
}

export default function ServiceFullpage() {
  return (
    <>
      {services.map((service, index) => (
        <ServiceSection key={service.id} service={service} index={index} />
      ))}
    </>
  );
}

