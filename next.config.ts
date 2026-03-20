import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // 이전 WordPress 사이트 URL들을 새 사이트로 리다이렉트
  async redirects() {
    return [
      // 날짜 기반 URL (이전 블로그/뉴스 포스트) -> 뉴스 페이지로
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/',
        destination: '/ko/news',
        permanent: true,
      },
      {
        source: '/:year(\\d{4})/:month(\\d{2})/',
        destination: '/ko/news',
        permanent: true,
      },
      // 카테고리, 태그, 작성자 페이지
      {
        source: '/category/:slug*',
        destination: '/ko/news',
        permanent: true,
      },
      {
        source: '/tag/:slug*',
        destination: '/ko/news',
        permanent: true,
      },
      {
        source: '/author/:slug*',
        destination: '/ko/about',
        permanent: true,
      },
      // 이전 영문 페이지들
      {
        source: '/en/career-2/:path*',
        destination: '/en/contact',
        permanent: true,
      },
      {
        source: '/en/business-2/:path*',
        destination: '/en/services',
        permanent: true,
      },
      {
        source: '/en/news-2/:path*',
        destination: '/en/news',
        permanent: true,
      },
      {
        source: '/en/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/',
        destination: '/en/news',
        permanent: true,
      },
      // 한글 URL (회사소개)
      {
        source: '/%ED%9A%8C%EC%82%AC%EC%86%8C%EA%B0%9C/',
        destination: '/ko/about',
        permanent: true,
      },
      {
        source: '/회사소개/',
        destination: '/ko/about',
        permanent: true,
      },
      // 이전 뉴스 상세 페이지 (숫자만 있는 경우)
      {
        source: '/news/:id(\\d+)',
        destination: '/ko/news/:id',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
