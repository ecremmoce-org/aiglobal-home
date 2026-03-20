'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const contactMethods = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'address',
    value: '서울특별시 강서구 강서로 385, 8층 805-61호',
    href: 'https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B0%95%EC%84%9C%EA%B5%AC%20%EA%B0%95%EC%84%9C%EB%A1%9C%20385',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'email',
    value: 'contact@aiglobal.kr',
    href: 'mailto:contact@aiglobal.kr',
  },
];

export default function ContactInfo() {
  const t = useTranslations('contact');

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Contact Info Card */}
      <div className="glass-card p-8">
        <h3 className="text-2xl font-bold text-white mb-6">
          {t('info.title')}
        </h3>

        <div className="space-y-6">
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.label}
              href={method.href}
              target={method.label === 'address' ? '_blank' : undefined}
              rel={method.label === 'address' ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 5 }}
              className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                {method.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  {t(`info.${method.label}` as Parameters<typeof t>[0])}
                </p>
                <p className="text-white">{method.value}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="glass-card overflow-hidden">
        <div className="aspect-video bg-[#0a0a0f] relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.5!2d126.8491!3d37.5595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9e3a0a0a0a0a%3A0x0!2z7ISc7Jq47Yq567OE7IucIOqwlOyEnOq1rCDqsJXshJzroZwgMzg1!5e0!3m2!1sko!2skr!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          />
          {/* Location label overlay */}
          <div className="absolute bottom-4 left-4 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm z-10">
            <p className="text-sm text-white font-medium">주식회사 에이아이글로벌</p>
            <p className="text-xs text-gray-400">서울특별시 강서구 강서로 385</p>
          </div>
        </div>
      </div>

      {/* Business Hours */}
      <div className="glass-card p-8">
        <h3 className="text-lg font-semibold text-white mb-4">영업 시간</h3>
        <div className="space-y-2 text-gray-400">
          <div className="flex justify-between">
            <span>월요일 - 금요일</span>
            <span className="text-white">09:00 - 18:00</span>
          </div>
          <div className="flex justify-between">
            <span>토요일 - 일요일</span>
            <span className="text-gray-500">휴무</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

