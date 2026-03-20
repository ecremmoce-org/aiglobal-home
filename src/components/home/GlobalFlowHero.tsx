'use client';

import { useTranslations } from 'next-intl';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { useEffect, useRef, useState } from 'react';
import MagneticButton from '@/components/ui/MagneticButton';

// 주요 글로벌 거점 좌표 (x%, y%)
const nodes = [
  { id: 'korea', x: 78, y: 35, label: 'Korea', isMain: true },
  { id: 'japan', x: 83, y: 38, label: 'Japan' },
  { id: 'china', x: 72, y: 40, label: 'China' },
  { id: 'sea', x: 70, y: 55, label: 'SEA' },
  { id: 'usa', x: 18, y: 38, label: 'USA' },
  { id: 'eu', x: 48, y: 30, label: 'Europe' },
];

// 연결선 (from -> to)
const connections = [
  { from: 'korea', to: 'japan' },
  { from: 'korea', to: 'china' },
  { from: 'korea', to: 'sea' },
  { from: 'korea', to: 'usa' },
  { from: 'korea', to: 'eu' },
  { from: 'japan', to: 'usa' },
  { from: 'china', to: 'eu' },
  { from: 'sea', to: 'eu' },
];

// 데이터 파티클 컴포넌트
function DataParticle({ from, to, delay, color }: { from: { x: number; y: number }; to: { x: number; y: number }; delay: number; color: string }) {
  return (
    <motion.circle
      r="3"
      fill={color}
      filter="url(#glow)"
      initial={{ cx: `${from.x}%`, cy: `${from.y}%`, opacity: 0 }}
      animate={{
        cx: [`${from.x}%`, `${to.x}%`],
        cy: [`${from.y}%`, `${to.y}%`],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        repeatDelay: 2,
        ease: 'easeInOut',
      }}
    />
  );
}

export default function GlobalFlowHero() {
  const t = useTranslations('hero');
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    const controls = animate(count, 150, { duration: 3, delay: 1 });
    const unsubscribe = rounded.on('change', (v) => setDisplayCount(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, rounded]);

  const getNode = (id: string) => nodes.find((n) => n.id === id);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030308]">
      {/* 배경 그라디언트 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#030308] to-transparent" />
      </div>

      {/* 글로벌 맵 SVG */}
      <div className="absolute inset-0 flex items-center justify-center opacity-60">
        <svg
          viewBox="0 0 100 60"
          className="w-full h-full max-w-[1400px]"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* 글로우 필터 */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            {/* 그라디언트 */}
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
            </linearGradient>

            <radialGradient id="nodeGlow">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 연결선 */}
          {connections.map((conn, i) => {
            const fromNode = getNode(conn.from);
            const toNode = getNode(conn.to);
            if (!fromNode || !toNode) return null;

            return (
              <g key={i}>
                {/* 연결선 */}
                <motion.line
                  x1={`${fromNode.x}%`}
                  y1={`${fromNode.y}%`}
                  x2={`${toNode.x}%`}
                  y2={`${toNode.y}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="0.15"
                  strokeOpacity="0.4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: i * 0.1 }}
                />
                
                {/* 양방향 데이터 파티클 */}
                <DataParticle
                  from={fromNode}
                  to={toNode}
                  delay={i * 0.5}
                  color="#6366f1"
                />
                <DataParticle
                  from={toNode}
                  to={fromNode}
                  delay={i * 0.5 + 1.5}
                  color="#06b6d4"
                />
              </g>
            );
          })}

          {/* 노드들 */}
          {nodes.map((node) => (
            <g key={node.id}>
              {/* 노드 글로우 */}
              <motion.circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={node.isMain ? 4 : 2}
                fill="url(#nodeGlow)"
                animate={{
                  r: node.isMain ? [4, 6, 4] : [2, 3, 2],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* 노드 코어 */}
              <motion.circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={node.isMain ? 1.5 : 0.8}
                fill={node.isMain ? '#6366f1' : '#8b5cf6'}
                filter="url(#glow)"
                whileHover={{ scale: 1.5 }}
                onHoverStart={() => setActiveNode(node.id)}
                onHoverEnd={() => setActiveNode(null)}
                style={{ cursor: 'pointer' }}
              />

              {/* AI 라벨 */}
              {node.isMain && (
                <motion.text
                  x={`${node.x}%`}
                  y={`${node.y - 4}%`}
                  textAnchor="middle"
                  fill="#6366f1"
                  fontSize="2"
                  fontWeight="bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  AI HUB
                </motion.text>
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* 플로팅 AI 인디케이터 */}
      <div className="absolute top-1/4 left-10 md:left-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
          className="glass-card px-4 py-2 text-xs"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-400">AI Optimization</span>
          </div>
          <div className="text-white font-mono mt-1">Active</div>
        </motion.div>
      </div>

      <div className="absolute bottom-1/3 right-10 md:right-20">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8 }}
          className="glass-card px-4 py-2 text-xs"
        >
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Countries Connected</span>
          </div>
          <div className="text-2xl font-bold gradient-text">{displayCount}+</div>
        </motion.div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          {/* 타이틀 */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 leading-tight">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="block text-white"
            >
              AI가 연결하는
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="block gradient-text"
            >
              글로벌 커머스의 흐름
            </motion.span>
          </h1>

          {/* 서브타이틀 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8"
          >
            판매부터 배송, 관리, 마케팅까지<br />
            <span className="text-white">4개의 AI 서비스</span>가 하나로 연결됩니다
          </motion.p>

          {/* 서비스 아이콘 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-4 md:gap-6 mb-10"
          >
            {[
              { name: 'acsell.ai', color: '#10b981', label: 'SELL' },
              { name: 'send4u.ai', color: '#f59e0b', label: 'SHIP' },
              { name: 'ohmyorder', color: '#ec4899', label: 'MANAGE' },
              { name: 'market4u.ai', color: '#06b6d4', label: 'GROW' },
            ].map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: `${service.color}20`, border: `1px solid ${service.color}40` }}
                >
                  {service.name.includes('.ai') && (
                    <span className="text-[10px] opacity-60">AI</span>
                  )}
                </div>
                <span className="text-[10px] md:text-xs font-medium" style={{ color: service.color }}>
                  {service.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton
              href="/services"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
            >
              <span>Suite 시작하기</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </MagneticButton>
            <MagneticButton
              href="/about"
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
            >
              <span>자세히 알아보기</span>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-gray-600 uppercase tracking-widest">Scroll to explore</span>
          <div className="w-5 h-8 rounded-full border border-gray-700 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1 rounded-full bg-indigo-500"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

