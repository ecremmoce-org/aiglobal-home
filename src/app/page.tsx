import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import type { Metadata } from 'next';

// 루트 페이지 메타데이터 - canonical을 기본 언어로 설정
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.aiglobal.kr/ko',
    languages: {
      'ko': 'https://www.aiglobal.kr/ko',
      'en': 'https://www.aiglobal.kr/en',
      'ja': 'https://www.aiglobal.kr/ja',
      'zh': 'https://www.aiglobal.kr/zh',
      'x-default': 'https://www.aiglobal.kr/ko',
    },
  },
};

export default async function RootPage() {
  // Accept-Language 헤더를 확인하여 적절한 언어로 리다이렉트
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  
  // 지원하는 언어 확인
  let targetLocale = 'ko'; // 기본값
  
  if (acceptLanguage.includes('en')) {
    targetLocale = 'en';
  } else if (acceptLanguage.includes('ja')) {
    targetLocale = 'ja';
  } else if (acceptLanguage.includes('zh')) {
    targetLocale = 'zh';
  }
  
  redirect(`/${targetLocale}`);
}
