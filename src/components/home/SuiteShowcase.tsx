'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const services = [
  {
    id: 'acsell',
    name: 'acsell.ai',
    title: 'SELL',
    description: '해외 마켓플레이스 통합 판매',
    color: '#10b981',
    icon: '📈',
  },
  {
    id: 'send4u',
    name: 'send4u.ai',
    title: 'SHIP',
    description: 'AI 물류 최적화 배송',
    color: '#f59e0b',
    icon: '📦',
  },
  {
    id: 'ohmyorder',
    name: 'ohmyorder.com',
    title: 'MANAGE',
    description: '주문/재고 통합 관리',
    color: '#ec4899',
    icon: '📋',
  },
  {
    id: 'market4u',
    name: 'market4u.ai',
    title: 'GROW',
    description: 'AI 마케팅 자동화',
    color: '#06b6d4',
    icon: '🚀',
  },
];

export default function SuiteShowcase() {
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <section className="relative py-16 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading mb-4">
            <span className="text-white">All-in-One</span>{' '}
            <span className="gradient-text">E-commerce Suite</span>
          </h2>
          <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto">
            판매, 배송, 관리, 성장 — 하나의 플랫폼에서 모두 해결
          </p>
        </motion.div>

        {/* Interactive Suite Diagram - Desktop Only */}
        <div className="hidden md:block relative max-w-4xl mx-auto mb-16">
          {/* Center Hub */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="relative mx-auto w-48 h-48 lg:w-64 lg:h-64"
          >
            {/* Rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-500/30"
            />
            
            {/* Center circle */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30">
              <div className="text-center">
                <div className="text-xl lg:text-3xl font-bold font-heading text-white">
                  AI Global
                </div>
                <div className="text-xs lg:text-sm text-white/70 mt-1">
                  Suite
                </div>
              </div>
            </div>

            {/* Orbiting services */}
            {services.map((service, index) => {
              const angle = (index * 90 - 90) * (Math.PI / 180);
              const radius = 120;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  {/* Connection line */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 h-0.5 origin-left"
                    style={{
                      width: radius - 30,
                      backgroundColor: service.color,
                      opacity: 0.3,
                      transform: `rotate(${180 + index * 90}deg)`,
                    }}
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  />
                  
                  {/* Service node */}
                  <motion.a
                    href={`https://${service.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    onHoverStart={() => setActiveService(service.id)}
                    onHoverEnd={() => setActiveService(null)}
                    className="relative block w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center cursor-pointer transition-shadow"
                    style={{
                      backgroundColor: `${service.color}20`,
                      boxShadow: activeService === service.id ? `0 0 30px ${service.color}50` : 'none',
                    }}
                  >
                    <span className="text-xl lg:text-2xl">{service.icon}</span>
                    
                    {/* Pulse effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{ backgroundColor: service.color }}
                      animate={{
                        opacity: [0, 0.3, 0],
                        scale: [1, 1.5, 1.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    />
                  </motion.a>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile: Center Logo */}
        <div className="md:hidden flex justify-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30"
          >
            <div className="text-center">
              <div className="text-lg font-bold font-heading text-white">
                AI Global
              </div>
              <div className="text-xs text-white/70">Suite</div>
            </div>
          </motion.div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {services.map((service, index) => (
            <motion.a
              key={service.id}
              href={`https://${service.name}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.1 }}
              whileHover={{ y: -5 }}
              onHoverStart={() => setActiveService(service.id)}
              onHoverEnd={() => setActiveService(null)}
              className="glass-card p-4 md:p-6 text-center group cursor-pointer"
              style={{
                borderColor: activeService === service.id ? service.color : 'transparent',
                borderWidth: 1,
              }}
            >
              {/* Mobile: Icon */}
              <div 
                className="md:hidden text-3xl mb-2"
              >
                {service.icon}
              </div>
              <div
                className="text-xl md:text-3xl font-bold font-heading mb-1 md:mb-2 transition-colors"
                style={{ color: service.color }}
              >
                {service.title}
              </div>
              <div className="text-xs md:text-sm text-white font-medium mb-1">
                {service.name}
              </div>
              <div className="text-[10px] md:text-xs text-gray-500 hidden sm:block">
                {service.description}
              </div>
            </motion.a>
          ))}
        </div>

        {/* Flow Animation - Responsive */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 md:mt-20 text-center"
        >
          {/* Desktop: Horizontal flow */}
          <div className="hidden sm:inline-flex items-center gap-2 md:gap-4 px-4 md:px-8 py-3 md:py-4 rounded-full bg-white/5 border border-white/10">
            {services.map((service, index) => (
              <div key={service.id} className="flex items-center gap-2 md:gap-4">
                <motion.span
                  className="text-sm md:text-lg font-semibold"
                  style={{ color: service.color }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                >
                  {service.title}
                </motion.span>
                {index < services.length - 1 && (
                  <motion.svg
                    className="w-4 h-4 md:w-5 md:h-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: 2x2 Grid flow */}
          <div className="sm:hidden grid grid-cols-2 gap-2 max-w-xs mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="px-3 py-2 rounded-lg bg-white/5 border border-white/10"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              >
                <span
                  className="text-sm font-semibold"
                  style={{ color: service.color }}
                >
                  {service.title}
                </span>
              </motion.div>
            ))}
          </div>

          <p className="text-gray-500 text-xs md:text-sm mt-4">
            하나의 흐름으로 연결되는 완벽한 이커머스 사이클
          </p>
        </motion.div>
      </div>
    </section>
  );
}
