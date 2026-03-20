'use client';

import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// 커스텀 박스 커서 컴포넌트
function BoxCursor({ isLight = false }: { isLight?: boolean }) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 24);
      cursorY.set(e.clientY - 24);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  // 연두색(라임 그린) 계열 색상
  const topFill = isLight ? 'rgba(163,230,53,0.95)' : 'rgba(163,230,53,0.95)';      // lime-400
  const frontFill = isLight ? 'rgba(132,204,22,0.85)' : 'rgba(132,204,22,0.85)';    // lime-500
  const sideFill = isLight ? 'rgba(101,163,13,0.75)' : 'rgba(101,163,13,0.75)';     // lime-600
  const tapeStroke = isLight ? 'rgba(77,124,15,0.9)' : 'rgba(77,124,15,0.9)';       // lime-700
  const tapeStroke2 = isLight ? 'rgba(63,98,18,0.6)' : 'rgba(63,98,18,0.6)';        // lime-800

  return (
    <motion.div
      className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      {/* 상품 박스 모양 커서 - 크기 증가 */}
      <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 박스 윗면 */}
        <path d="M16 2L28 8V10L16 16L4 10V8L16 2Z" fill={topFill} />
        {/* 박스 앞면 */}
        <path d="M4 10L16 16V28L4 22V10Z" fill={frontFill} />
        {/* 박스 옆면 */}
        <path d="M28 10L16 16V28L28 22V10Z" fill={sideFill} />
        {/* 테이프 */}
        <path d="M16 2V16" stroke={tapeStroke} strokeWidth="2" />
        <path d="M10 5L22 11" stroke={tapeStroke2} strokeWidth="1" />
      </svg>
    </motion.div>
  );
}

// 영상별 콘텐츠 데이터 구조
interface HeroLine {
  text: string;
  highlight?: boolean;  // true면 회색, false면 흰색
  gradient?: boolean;   // true면 그라데이션 효과
}

interface HeroContent {
  video: string;
  thumbnail: string;  // 동영상 썸네일 이미지 (SEO용)
  lines: HeroLine[];
}

const heroContents: HeroContent[] = [
  {
    video: '/hero-video-3.mp4',  // 글로벌 네트워크 (첫 번째)
    thumbnail: '/video-thumbnails/hero-video-3-thumb.jpg',
    lines: [
      { text: '전 세계가', highlight: false },
      { text: '당신의', gradient: true },
      { text: '마켓입니다', highlight: false },
    ]
  },
  {
    video: '/hero-video.mp4',  // 물류/창고 (두 번째)
    thumbnail: '/video-thumbnails/hero-video-thumb.jpg',
    lines: [
      { text: 'Building', highlight: false },
      { text: 'an Era', highlight: true },
      { text: 'Where', highlight: true },
      { text: 'Global', highlight: false },
      { text: 'Ecommerce', gradient: true },
      { text: 'Flows', highlight: false },
      { text: 'Seamlessly', highlight: true },
    ]
  },
  {
    video: '/hero-video-2.mp4',  // 드론/물류 (세 번째)
    thumbnail: '/video-thumbnails/hero-video-2-thumb.jpg',
    lines: [
      { text: '연결이', highlight: false },
      { text: '혁신으로', gradient: true },
      { text: '만들어집니다', highlight: false },
    ]
  },
];

// 키워드 박스 컴포넌트
function KeywordBox({ 
  word, 
  subText,
  color, 
  delay,
  isActive,
  onHover 
}: { 
  word: string; 
  subText: string;
  color: string; 
  delay: number;
  isActive: boolean;
  onHover: (active: boolean) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className="relative cursor-pointer group"
    >
      <motion.div
        className="px-6 py-3 md:px-8 md:py-4 border-2 rounded-xl transition-all duration-500"
        style={{ 
          borderColor: isActive ? color : 'rgba(255,255,255,0.1)',
          backgroundColor: isActive ? `${color}10` : 'transparent',
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-center overflow-hidden">
          {word.split('').map((char, i) => (
            <motion.span
              key={i}
              className="text-lg md:text-xl lg:text-2xl font-bold tracking-[0.15em] uppercase transition-all duration-300"
              style={{ 
                color: isActive ? color : 'rgba(255,255,255,0.5)',
              }}
              animate={{
                y: isActive ? [0, -3, 0] : 0,
                opacity: isActive ? 1 : 0.5,
              }}
              transition={{
                delay: isActive ? i * 0.05 : 0,
                duration: 0.3,
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </motion.div>
      
      {/* 서브 텍스트 */}
      <motion.div
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-[10px] tracking-wider" style={{ color }}>
          {subText}
        </span>
      </motion.div>

      {/* 글로우 효과 */}
      <motion.div
        className="absolute inset-0 rounded-xl blur-2xl -z-10 transition-opacity duration-500"
        style={{ 
          backgroundColor: color,
          opacity: isActive ? 0.2 : 0,
        }}
      />
    </motion.div>
  );
}

// 글자 분리 애니메이션 컴포넌트
function AnimatedText({ 
  text, 
  className, 
  delay = 0,
  staggerDelay = 0.03,
}: { 
  text: string; 
  className?: string; 
  delay?: number;
  staggerDelay?: number;
}) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + i * staggerDelay,
            duration: 0.6,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

// 동적 타이틀 컴포넌트 - 영상별 문구 표시
function DynamicTitle({ 
  lines, 
  contentIndex 
}: { 
  lines: HeroLine[]; 
  contentIndex: number;
}) {
  // 영문 콘텐츠 (7줄)는 특별 레이아웃 사용 (2개씩 한 줄)
  if (lines.length === 7) {
    return (
      <div className="text-center space-y-0 md:space-y-1">
        {/* Building an Era */}
        <div className="overflow-hidden">
          <h1 className="text-[8vw] md:text-[6vw] lg:text-[5vw] font-black font-heading leading-[1.1] tracking-tight">
            <AnimatedText text={lines[0].text} className="text-white" delay={0.3} />
            <span className="text-gray-400 ml-2 md:ml-3">
              <AnimatedText text={lines[1].text} delay={0.5} />
            </span>
          </h1>
        </div>

        {/* Where Global */}
        <div className="overflow-hidden">
          <h1 className="text-[8vw] md:text-[6vw] lg:text-[5vw] font-black font-heading leading-[1.1] tracking-tight">
            <AnimatedText text={lines[2].text} className="text-gray-400" delay={0.6} />
            <span className="ml-2 md:ml-3">
              <AnimatedText text={lines[3].text} className="text-white" delay={0.7} />
            </span>
          </h1>
        </div>

        {/* Ecommerce */}
        <div className="overflow-hidden">
          <h1 className="text-[10vw] md:text-[8vw] lg:text-[6vw] font-black font-heading leading-[1.1] tracking-tight">
            <span className="ecommerce-glow text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              <AnimatedText 
                text={lines[4].text} 
                delay={0.9} 
                staggerDelay={0.04}
              />
            </span>
          </h1>
        </div>

        {/* Flows Seamlessly */}
        <div className="overflow-hidden">
          <h1 className="text-[8vw] md:text-[6vw] lg:text-[5vw] font-black font-heading leading-[1.1] tracking-tight">
            <AnimatedText text={lines[5].text} className="text-white" delay={1.3} />
            <span className="text-gray-400 ml-2 md:ml-3">
              <AnimatedText text={lines[6].text} delay={1.5} />
            </span>
          </h1>
        </div>
      </div>
    );
  }

  // 한국어 콘텐츠 등 (3줄)은 각 줄을 개별로 표시
  return (
    <div className="text-center space-y-1 md:space-y-2">
      {lines.map((line, index) => (
        <div key={index} className="overflow-hidden">
          <h1 className={`font-black font-heading leading-[1.1] tracking-tight ${
            line.gradient 
              ? 'text-[12vw] md:text-[10vw] lg:text-[8vw]' 
              : 'text-[10vw] md:text-[8vw] lg:text-[6vw]'
          }`}>
            {line.gradient ? (
              <span className="ecommerce-glow text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                <AnimatedText 
                  text={line.text} 
                  delay={0.3 + index * 0.2} 
                  staggerDelay={0.04}
                />
              </span>
            ) : (
              <AnimatedText 
                text={line.text} 
                className={line.highlight ? 'text-gray-400' : 'text-white'}
                delay={0.3 + index * 0.2} 
              />
            )}
          </h1>
        </div>
      ))}
    </div>
  );
}

function CitixHero() {
  const ref = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeKeyword, setActiveKeyword] = useState<number | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  // 비디오 초기화 및 자동 재생
  useEffect(() => {
    const videos = videoRefs.current.filter(Boolean) as HTMLVideoElement[];
    
    videos.forEach((video, index) => {
      video.onended = () => {
        const nextIndex = (index + 1) % heroContents.length;
        setCurrentVideoIndex(nextIndex);
        const nextVideo = videoRefs.current[nextIndex];
        if (nextVideo) {
          nextVideo.currentTime = 0;
          nextVideo.play().catch(() => {});
        }
      };
    });

    // 첫 번째 비디오 재생
    const firstVideo = videoRefs.current[0];
    if (firstVideo) {
      firstVideo.play().catch(() => {});
    }
  }, []);

  // 비디오 전환 시 재생 제어
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVideoIndex) {
          video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
  }, [currentVideoIndex]);

  // 음소거 상태 변경
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = isMuted;
      }
    });
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const keywords = [
    { word: 'SELL', subText: 'acsell.ai', color: '#10b981' },
    { word: 'SHIP', subText: 'send4u.ai', color: '#f59e0b' },
    { word: 'MANAGE', subText: 'ohmyorder.com', color: '#ec4899' },
    { word: 'GROW', subText: 'market4u.ai', color: '#06b6d4' },
  ];

  const currentContent = heroContents[currentVideoIndex];

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a] snap-start"
    >
      {/* 비디오 배경 - 동적으로 생성 */}
      <div className="absolute inset-0 z-0">
        {heroContents.map((content, index) => (
          <video
            key={content.video}
            ref={(el) => { videoRefs.current[index] = el; }}
            autoPlay={index === 0}
            muted={isMuted}
            playsInline
            poster={content.thumbnail}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              currentVideoIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src={content.video} type="video/mp4" />
          </video>
        ))}

        {/* 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/40 to-[#0a0a0a]/80 z-10" />
        
        {/* 비네트 */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.4) 60%, rgba(10,10,10,0.8) 100%)',
          }}
        />
      </div>

      {/* 그리드 패턴 */}
      <div className="absolute inset-0 opacity-[0.02] z-[2]">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }} />
      </div>

      {/* 비디오 컨트롤 - 인디케이터 + 사운드 버튼 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 right-6 lg:right-10 flex items-center gap-4 z-50"
      >
        {/* 사운드 토글 버튼 */}
        <button
          onClick={toggleMute}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group cursor-pointer"
          aria-label={isMuted ? '사운드 켜기' : '사운드 끄기'}
        >
          {isMuted ? (
            <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white group-hover:text-lime-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>

        {/* 비디오 인디케이터 */}
        {heroContents.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentVideoIndex(index)}
            className={`w-8 h-1 rounded-full transition-all duration-300 ${
              currentVideoIndex === index ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`비디오 ${index + 1}`}
          />
        ))}
      </motion.div>

      {/* 메인 콘텐츠 - 전체 화면 중앙 정렬 */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-20 w-full h-full flex flex-col justify-center items-center px-6 lg:px-12"
      >
        {/* 메인 타이틀 - 영상별 문구 전환 */}
        <div className="mb-10 md:mb-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentVideoIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <DynamicTitle 
                lines={currentContent.lines} 
                contentIndex={currentVideoIndex} 
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 키워드 박스들 - 하단 중앙 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-3 md:gap-5"
        >
          {keywords.map((keyword, i) => (
            <KeywordBox
              key={keyword.word}
              word={keyword.word}
              subText={keyword.subText}
              color={keyword.color}
              delay={2.2 + i * 0.15}
              isActive={activeKeyword === i}
              onHover={(active) => setActiveKeyword(active ? i : null)}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-3">
          <motion.span 
            className="text-[9px] text-gray-600 tracking-[0.4em] uppercase font-medium"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            Scroll
          </motion.span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </motion.div>

      {/* 좌측 세로 텍스트 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 hidden lg:block z-20"
      >
        <span 
          className="text-[9px] text-gray-700 tracking-[0.4em] uppercase font-light"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          All-in-One E-commerce Suite
        </span>
      </motion.div>

      {/* 우측 상단 Live 표시 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute top-28 lg:top-24 right-6 lg:right-10 hidden md:flex items-center gap-3 z-20"
      >
        <motion.div 
          className="w-2 h-2 bg-emerald-500 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-[10px] text-gray-600 tracking-[0.3em] uppercase font-light">Live</span>
      </motion.div>

      {/* 서비스 링크 - 우측 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 0.8 }}
        className="absolute top-1/2 -translate-y-1/2 right-6 lg:right-10 hidden xl:flex flex-col gap-4 z-20"
      >
        {keywords.map((keyword, i) => (
          <motion.a
            key={keyword.subText}
            href={`https://${keyword.subText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-gray-600 hover:text-white transition-all duration-300"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.4 + i * 0.1 }}
          >
            <span className="text-[10px] tracking-wider font-medium text-right">{keyword.subText}</span>
            <span 
              className="w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150"
              style={{ backgroundColor: keyword.color }}
            />
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}


// 설명 섹션 컴포넌트 - 자동 재생 애니메이션 (AI Global 브랜드 표시)
function DescriptionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [phase, setPhase] = useState<'highlight' | 'fadeOut' | 'transform' | 'complete'>('highlight');
  const [currentLine, setCurrentLine] = useState(-1);

  // 애니메이션 상태 초기화 함수
  const resetAnimation = () => {
    setPhase('highlight');
    setCurrentLine(-1);
  };

  // IntersectionObserver로 섹션이 뷰포트에 들어왔는지 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          resetAnimation();
          setTimeout(() => {
            setIsInView(true);
          }, 300);
        } else {
          setIsInView(false);
          resetAnimation();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 자동 재생 애니메이션 시퀀스
  useEffect(() => {
    if (!isInView) return;

    // 1단계: 순차 하이라이트 (각 줄 0.6초 간격)
    if (phase === 'highlight') {
      if (currentLine < 3) {
        const timer = setTimeout(() => {
          setCurrentLine(prev => prev + 1);
        }, currentLine === -1 ? 300 : 600);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setPhase('fadeOut');
        }, 800);
        return () => clearTimeout(timer);
      }
    }

    // 2단계: 페이드아웃 후 변환 단계로
    if (phase === 'fadeOut') {
      const timer = setTimeout(() => {
        setPhase('transform');
      }, 600);
      return () => clearTimeout(timer);
    }

    // 3단계: AI Global 브랜드 표시
    if (phase === 'transform') {
      const timer = setTimeout(() => {
        setPhase('complete');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isInView, phase, currentLine]);

  const lines = [
    { text: 'AI Global', size: 'text-2xl md:text-4xl lg:text-5xl' },
    { text: 'AI 기반 통합 이커머스 솔루션', size: 'text-2xl md:text-4xl lg:text-5xl' },
    { text: '판매부터 배송, 관리, 성장까지', size: 'text-2xl md:text-4xl lg:text-5xl' },
    { text: '글로벌 셀러의 모든 여정을 지원합니다.', size: 'text-xl md:text-3xl lg:text-4xl' },
  ];

  const icons = [
    { 
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      label: 'SELL' 
    },
    { 
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      label: 'SHIP' 
    },
    { 
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      label: 'MANAGE' 
    },
    { 
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      label: 'GROW' 
    },
  ];

  const showTransform = phase === 'transform' || phase === 'complete';

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen bg-white cursor-none snap-start"
    >
      {/* 커스텀 커서 - 흰배경용 */}
      <BoxCursor isLight />
      
      {/* 메인 콘텐츠 - 하이라이트 단계 */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center z-10"
        animate={{
          opacity: showTransform ? 0 : 1,
          y: showTransform ? -50 : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-4xl mx-auto px-6 md:px-12 text-center">
          {/* 텍스트 줄들 - 순차 하이라이트 */}
          <div className="space-y-2">
            {lines.map((line, index) => (
              <motion.p
                key={index}
                className={`${line.size} font-extrabold leading-relaxed tracking-wide`}
                animate={{
                  color: currentLine >= index ? '#581c87' : '#d8b4fe',
                  scale: currentLine === index ? 1.02 : 1,
                  opacity: currentLine >= index ? 1 : 0.4,
                }}
                transition={{ duration: 0.3 }}
              >
                {line.text}
              </motion.p>
            ))}
          </div>

          {/* 하단 키워드 아이콘 */}
          <motion.div 
            className="mt-16 md:mt-20 flex justify-center gap-10 md:gap-16"
            animate={{
              opacity: currentLine >= 3 ? 1 : 0.3,
              y: currentLine >= 3 ? 0 : 20,
            }}
            transition={{ duration: 0.5 }}
          >
            {icons.map((item, index) => (
              <motion.div
                key={item.label}
                className="flex flex-col items-center gap-3"
                animate={{
                  color: currentLine >= 3 ? '#6b21a8' : '#9ca3af',
                  scale: currentLine >= 3 ? 1 : 0.9,
                }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {item.icon}
                <span className="text-xs md:text-sm font-bold tracking-widest">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* AI Global 브랜드 표시 */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center z-20"
        animate={{
          opacity: showTransform ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
        style={{ pointerEvents: showTransform ? 'auto' : 'none' }}
      >
        <div className="flex flex-col items-center gap-6 md:gap-8">
          {/* AI Global 브랜드명 */}
          <motion.div
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-center tracking-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: showTransform ? 1 : 0,
              scale: showTransform ? 1 : 0.8,
              color: '#581c87',
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            AI Global
          </motion.div>
        </div>

        {/* 설명 텍스트 */}
        <motion.p
          className="mt-8 md:mt-12 text-sm md:text-base text-purple-900/60 font-medium tracking-widest"
          animate={{
            opacity: phase === 'complete' ? 1 : 0,
            y: phase === 'complete' ? 0 : 10,
          }}
          transition={{ duration: 0.5 }}
        >
          AI로 글로벌 이커머스의 새로운 가능성을 열다
        </motion.p>
      </motion.div>

      {/* 진행 인디케이터 */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            animate={{
              backgroundColor:
                (i < 4 && currentLine >= i) ||
                (i === 4 && (phase === 'transform' || phase === 'complete'))
                  ? '#7c3aed'
                  : '#d1d5db',
              scale:
                (i < 4 && currentLine === i) ||
                (i === 4 && phase === 'transform')
                  ? 1.5
                  : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </section>
  );
}

// 메인 히어로 컴포넌트 - 두 섹션을 합침
export default function CitixHeroWithDescription() {
  return (
    <>
      <CitixHero />
      <DescriptionSection />
    </>
  );
}
