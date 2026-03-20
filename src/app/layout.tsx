import type { Metadata } from "next";
import { Syne } from 'next/font/google';
import Script from 'next/script';
import "./globals.css";

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aiglobal.kr'),
  title: {
    default: "AI Global - 글로벌 이커머스 올인원 솔루션",
    template: "%s | AI Global"
  },
  description: "판매, 배송, 관리, 성장 — 하나의 플랫폼으로 글로벌 이커머스의 모든 것을 연결합니다. acsell.ai, send4u.ai, ohmyorder.com, market4u.ai",
  keywords: [
    "AI Global", "에이아이글로벌", "이커머스", "해외판매", "글로벌커머스", "크로스보더",
    "해외배송", "주문관리", "AI마케팅", "셀러솔루션", "acsell", "send4u", "ohmyorder", "market4u",
    "Qoo10", "Shopee", "Amazon", "글로벌셀러", "역직구", "직구", "물류최적화"
  ],
  authors: [{ name: "AI Global", url: "https://www.aiglobal.kr" }],
  creator: "AI Global",
  publisher: "주식회사 에이아이글로벌",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "AI Global - 글로벌 이커머스 올인원 솔루션",
    description: "판매, 배송, 관리, 성장 — 글로벌 이커머스의 모든 것을 하나로. 전 세계가 당신의 마켓입니다.",
    url: "https://www.aiglobal.kr",
    siteName: "AI Global",
    locale: "ko_KR",
    alternateLocale: "en_US",
    type: "website",
    images: [
      {
        url: "/video-thumbnails/hero-video-3-thumb.jpg",
        width: 1280,
        height: 720,
        alt: "AI Global - 글로벌 이커머스 올인원 솔루션",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Global - 글로벌 이커머스 올인원 솔루션",
    description: "판매, 배송, 관리, 성장 — 글로벌 이커머스의 모든 것을 하나로.",
    images: ["/video-thumbnails/hero-video-3-thumb.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "F1BuZae_H8matgRMk1xZLH6jTQgb_OBcWE1CowyoSaQ",
  },
  alternates: {
    canonical: "https://www.aiglobal.kr/ko",
    languages: {
      'ko': 'https://www.aiglobal.kr/ko',
      'en': 'https://www.aiglobal.kr/en',
      'ja': 'https://www.aiglobal.kr/ja',
      'zh': 'https://www.aiglobal.kr/zh',
      'x-default': 'https://www.aiglobal.kr/ko',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`dark ${syne.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
        {/* JSON-LD 구조화된 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AI Global",
              "alternateName": "에이아이글로벌",
              "url": "https://www.aiglobal.kr",
              "logo": "https://www.aiglobal.kr/video-thumbnails/hero-video-3-thumb.jpg",
              "description": "글로벌 이커머스 올인원 솔루션을 제공하는 기술 기업",
              "foundingDate": "2019",
              "founder": {
                "@type": "Person",
                "name": "정창원"
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "강서로 385, 8층 805-61호",
                "addressLocality": "강서구",
                "addressRegion": "서울특별시",
                "addressCountry": "KR"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "aiglobal1@naver.com",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://www.acsell.ai",
                "https://www.send4u.ai",
                "https://www.ohmyorder.com",
                "https://www.market4u.ai"
              ],
              "offers": [
                {
                  "@type": "Offer",
                  "name": "acsell.ai",
                  "description": "해외판매 가속화 서비스"
                },
                {
                  "@type": "Offer",
                  "name": "send4u.ai",
                  "description": "해외배송 최적화 서비스"
                },
                {
                  "@type": "Offer",
                  "name": "ohmyorder.com",
                  "description": "해외주문 통합관리 서비스"
                },
                {
                  "@type": "Offer",
                  "name": "market4u.ai",
                  "description": "AI 마케팅 서비스"
                }
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "AI Global",
              "url": "https://www.aiglobal.kr",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.aiglobal.kr/ko/news?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        {/* 동영상 구조화된 데이터 - Google 동영상 색인용 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": "AI Global - 글로벌 이커머스 올인원 솔루션 소개",
              "description": "전 세계가 당신의 마켓입니다. AI Global은 판매, 배송, 관리, 성장을 하나의 플랫폼으로 연결하는 글로벌 이커머스 솔루션입니다.",
              "thumbnailUrl": [
                "https://www.aiglobal.kr/video-thumbnails/hero-video-3-thumb.jpg"
              ],
              "uploadDate": "2024-01-01T00:00:00+09:00",
              "duration": "PT30S",
              "contentUrl": "https://www.aiglobal.kr/hero-video-3.mp4",
              "embedUrl": "https://www.aiglobal.kr/ko",
              "publisher": {
                "@type": "Organization",
                "name": "AI Global",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.aiglobal.kr/video-thumbnails/hero-video-3-thumb.jpg",
                  "width": 1280,
                  "height": 720
                }
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": "AI Global - Global Ecommerce Flows Seamlessly",
              "description": "Building an Era Where Global Ecommerce Flows Seamlessly. AI Global connects selling, shipping, management, and growth in one platform.",
              "thumbnailUrl": [
                "https://www.aiglobal.kr/video-thumbnails/hero-video-thumb.jpg"
              ],
              "uploadDate": "2024-01-01T00:00:00+09:00",
              "duration": "PT30S",
              "contentUrl": "https://www.aiglobal.kr/hero-video.mp4",
              "embedUrl": "https://www.aiglobal.kr/en",
              "publisher": {
                "@type": "Organization",
                "name": "AI Global",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.aiglobal.kr/video-thumbnails/hero-video-thumb.jpg",
                  "width": 1280,
                  "height": 720
                }
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": "AI Global - 연결이 혁신으로 만들어집니다",
              "description": "연결이 혁신으로 만들어집니다. AI Global의 물류 및 배송 솔루션을 통해 글로벌 이커머스를 경험하세요.",
              "thumbnailUrl": [
                "https://www.aiglobal.kr/video-thumbnails/hero-video-2-thumb.jpg"
              ],
              "uploadDate": "2024-01-01T00:00:00+09:00",
              "duration": "PT30S",
              "contentUrl": "https://www.aiglobal.kr/hero-video-2.mp4",
              "embedUrl": "https://www.aiglobal.kr/ko",
              "publisher": {
                "@type": "Organization",
                "name": "AI Global",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.aiglobal.kr/video-thumbnails/hero-video-2-thumb.jpg",
                  "width": 1280,
                  "height": 720
                }
              }
            })
          }}
        />
      </head>
      <body className="noise-bg antialiased min-h-screen">
        {children}
        
        {/* 채널톡 스크립트 */}
        <Script id="channel-talk" strategy="afterInteractive">
          {`
            (function(){var w=window;if(w.ChannelIO){return w.console.error("ChannelIO script included twice.")}var ch=function(){ch.c(arguments)};ch.q=[];ch.c=function(args){ch.q.push(args)};w.ChannelIO=ch;function l(){if(w.ChannelIOInitialized){return}w.ChannelIOInitialized=true;var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";var x=document.getElementsByTagName("script")[0];if(x.parentNode){x.parentNode.insertBefore(s,x)}}if(document.readyState==="complete"){l()}else{w.addEventListener("DOMContentLoaded",l);w.addEventListener("load",l)}})();

            ChannelIO('boot', {
              "pluginKey": "0e0a096d-765d-496d-b543-9505f56e2376"
            });
          `}
        </Script>
      </body>
    </html>
  );
}
