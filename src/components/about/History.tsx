'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const timeline = [
  {
    year: '2025',
    events: [
      { month: '12', title: 'send4u.ai 서비스 출시', titleEn: 'send4u.ai Service Launch' },
      { month: '12', title: 'market4u.ai 서비스 출시', titleEn: 'market4u.ai Service Launch' },
      { month: '12', title: 'ohmyorder.ai 서비스 출시', titleEn: 'ohmyorder.ai Service Launch' },
      { month: '11', title: 'SEND4U Alliance 협약식', titleEn: 'SEND4U Alliance Agreement Ceremony' },
      { month: '08', title: 'acsell.ai 서비스 출시', titleEn: 'acsell.ai Service Launch' },
    ],
  },
  {
    year: '2024',
    events: [
      { month: '09', title: '해외 판매 특화서비스 글로벌 행사 진행 (큐텐JP, 알리익스프레스)', titleEn: 'Global Sales Event (Qoo10 JP, AliExpress)' },
      { month: '', title: 'IP-R&D 전략지원 사업 선정 (상품등록, 주문, 출고, 재고관리, 수출신고)', titleEn: 'IP-R&D Strategic Support Project Selection' },
    ],
  },
  {
    year: '2023',
    events: [
      { month: '11', title: 'ohmyorder.com 서비스 출시', titleEn: 'ohmyorder.com Service Launch' },
      { month: '08', title: 'Series A 투자 유치', titleEn: 'Series A Funding' },
      { month: '07', title: '중국 최대 B2C 이커머스 플랫폼 Tmall 총판 계약', titleEn: 'China B2C Tmall Distribution Contract' },
      { month: '', title: 'Alibaba.com 세계 대회 참가 (항저우 알리바바 본사)', titleEn: 'Alibaba.com Global Competition (Hangzhou HQ)' },
      { month: '', title: '동남아 최대 쇼핑몰 Lazada 공식 서비스 파트너 등록', titleEn: 'Lazada Official Service Partner Registration' },
      { month: '', title: 'AcSELL (토탈 OMS) 서비스 런칭', titleEn: 'AcSELL (Total OMS) Service Launch' },
      { month: '', title: '이노비즈 A등급 인증 획득', titleEn: 'Innobiz A-Grade Certification' },
      { month: '', title: '예체능 전문가 매칭 플랫폼 월드클래스 MOU 체결', titleEn: 'WorldClass Platform MOU' },
    ],
  },
  {
    year: '2022',
    events: [
      { month: '09', title: 'Seed 투자 유치', titleEn: 'Seed Funding' },
      { month: '', title: 'Alibaba.com Top Revenue상 수상', titleEn: 'Alibaba.com Top Revenue Award' },
      { month: '', title: 'Alibaba.com 공식 채널 파트너사 선정', titleEn: 'Alibaba.com Official Channel Partner' },
      { month: '', title: 'ISO/IEC 27001:2013 인증 (정보보안경영시스템)', titleEn: 'ISO/IEC 27001:2013 Certification' },
      { month: '', title: '자본금 증자 (16.7억)', titleEn: 'Capital Increase (1.67B KRW)' },
      { month: '', title: '신한 오픈이노베이션 선정산 부문 선발 (5기 Member)', titleEn: 'Shinhan Open Innovation Selection' },
      { month: '02', title: '한국할랄협회 MOU 체결', titleEn: 'Korea Halal Association MOU' },
    ],
  },
  {
    year: '2021',
    events: [
      { month: '', title: 'NAVER 공식 풀필먼트 파스토와 업무제휴 및 시스템 연동', titleEn: 'NAVER Fulfillment Fassto Partnership' },
      { month: '', title: '중소기업진흥공단 P2P 사업 (11번가, 지마켓 협업)', titleEn: 'SME P2P Business (11st, Gmarket)' },
      { month: '', title: '상품관리 AwesomeSwag & 주문관리 OhMyOrder 런칭', titleEn: 'AwesomeSwag & OhMyOrder Launch' },
      { month: '', title: '특허등록 (상품의 해외 판매를 위한 추천 상품 선정 및 판매 서비스 제공 방법, 장치 및 컴퓨터 프로그램)', titleEn: 'Patent Registration (Product Recommendation System)' },
    ],
  },
  {
    year: '2020',
    events: [
      { month: '', title: 'P2P분산거래 유통 플랫폼 개발 (KIAT산하 한국무역정보통신(KTNET))', titleEn: 'P2P Distribution Platform Development (KTNET)' },
      { month: '', title: 'SABBUN(사뿐-여성화 브랜드) 주문 수집 ERP 시스템 개발', titleEn: 'SABBUN ERP System Development' },
      { month: '', title: '쇼피 집하센터 입고/선적 관리 시스템 TWS Master 런칭', titleEn: 'Shopee TWS Master System Launch' },
    ],
  },
  {
    year: '2019',
    events: [
      { month: '', title: '온라인 수출 기업화 사업 수행 (동남아 최대 이커머스 플랫폼 SHOPEE와 중소벤처기업진흥공단)', titleEn: 'Online Export Business (SHOPEE Partnership)' },
      { month: '', title: 'NFA(NAVER 풀필먼트) 파스토와 파트너십 체결 및 솔루션 공급', titleEn: 'NFA Fassto Partnership & Solution Supply' },
      { month: '', title: '상품관리 솔루션 EMS, 주문관리 솔루션 ESS 런칭', titleEn: 'EMS & ESS Solutions Launch' },
      { month: '06', title: '이크레모스 창업', titleEn: 'ecremmoce Founded' },
    ],
  },
];

export default function History() {
  const t = useTranslations('about.history');

  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading">
            <span className="gradient-text">{t('title')}</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-purple-500/50 to-pink-500/50 hidden md:block" />

          {timeline.map((yearGroup, yearIndex) => (
            <div key={yearGroup.year} className="mb-16 last:mb-0">
              {/* Year Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex justify-center mb-8"
              >
                <div className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg">
                  {yearGroup.year}
                </div>
              </motion.div>

              {/* Events */}
              <div className="space-y-6">
                {yearGroup.events.map((event, eventIndex) => (
                  <motion.div
                    key={`${yearGroup.year}-${event.month}-${eventIndex}`}
                    initial={{ opacity: 0, x: eventIndex % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: eventIndex * 0.1 }}
                    className={`flex items-center gap-4 ${
                      eventIndex % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Content */}
                    <div className={`flex-1 ${eventIndex % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="glass-card p-6 inline-block">
                        <span className="text-sm text-indigo-400 font-medium">
                          {yearGroup.year}.{event.month}
                        </span>
                        <h3 className="text-lg font-semibold text-white mt-1">
                          {event.title}
                        </h3>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="hidden md:flex w-4 h-4 rounded-full bg-indigo-500 border-4 border-[#050508] relative z-10" />

                    {/* Spacer */}
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

