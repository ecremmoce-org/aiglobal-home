'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    key: 'acsell',
    url: 'https://www.acsell.ai',
    color: '#10b981',
    gradient: 'from-emerald-500 to-teal-500',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    key: 'send4u',
    url: 'https://www.send4u.ai',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-500',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    key: 'ohmyorder',
    url: 'https://www.ohmyorder.com',
    color: '#ec4899',
    gradient: 'from-pink-500 to-rose-500',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    key: 'market4u',
    url: 'https://www.market4u.ai',
    color: '#06b6d4',
    gradient: 'from-cyan-500 to-blue-500',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function Services() {
  const t = useTranslations('services');
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            <span className="gradient-text">{t('title')}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.key}
              service={service}
              t={t}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: typeof services[0];
  t: ReturnType<typeof useTranslations<'services'>>;
  index: number;
}

function ServiceCard({ service, t, index }: ServiceCardProps) {
  return (
    <motion.a
      href={service.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative glass-card p-8 cursor-pointer overflow-hidden"
    >
      {/* Hover gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />

      {/* Glow effect */}
      <div
        className="absolute -inset-px rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${service.color}20, transparent 50%)`,
        }}
      />

      <div className="relative">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${service.color}15`, color: service.color }}
        >
          {service.icon}
        </div>

        {/* Name */}
        <div className="flex items-center gap-2 mb-2">
          <h3
            className="text-xl font-bold font-heading transition-colors"
            style={{ color: service.color }}
          >
            {t(`${service.key}.name` as Parameters<typeof t>[0])}
          </h3>
          <svg
            className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>

        {/* Title */}
        <h4 className="text-2xl font-semibold text-white mb-3">
          {t(`${service.key}.title` as Parameters<typeof t>[0])}
        </h4>

        {/* Description */}
        <p className="text-gray-400 leading-relaxed">
          {t(`${service.key}.description` as Parameters<typeof t>[0])}
        </p>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
          style={{ backgroundColor: service.color }}
        />
      </div>
    </motion.a>
  );
}

