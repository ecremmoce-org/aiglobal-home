# ECREMMOCE Home - AI Agent Context

> 회사 홈페이지 (다국어 지원)

## Project Context

**Business Goal**: ECREMMOCE 기업 소개 및 서비스 안내 웹사이트

**Core Functions**:
- 다국어 지원 (한국어, 영어, 일본어, 중국어)
- 회사 소개
- 서비스 안내
- 뉴스/보도자료
- 문의 폼

**Tech Stack**:
- Runtime: Next.js 16.0.8 (App Router)
- React: 19.2.1
- i18n: next-intl
- Database: Supabase (문의 데이터)
- UI: TailwindCSS 4
- Animation: Framer Motion
- Deploy: Vercel Seoul (icn1)

## Operational Commands

```bash
# Development
npm run dev              # 개발 서버 (포트 3005)
npm run dev:3000         # 기본 포트 3000으로 실행
npm run lint             # ESLint 검사

# Build & Deploy
npm run build            # 프로덕션 빌드
npm run start            # 프로덕션 서버 (포트 3005)
```

## Golden Rules

### Immutable Constraints

1. **NEVER** commit API keys or secrets to code
2. **NEVER** hardcode text - use i18n messages
3. **ALWAYS** provide all 4 language translations
4. **ALWAYS** use semantic HTML for SEO

### Do's

- Use `src/` directory structure
- Use next-intl for all text content
- Use TailwindCSS for styling
- Follow App Router with i18n routing
- Optimize images and videos

### Don'ts

- Don't use inline text strings
- Don't skip language translations
- Don't use large unoptimized media
- Don't create inline styles

## Directory Structure

```
src/
├── app/
│   ├── [locale]/           # 다국어 라우트
│   │   ├── about/          # 회사 소개
│   │   ├── contact/        # 문의
│   │   ├── news/           # 뉴스
│   │   ├── services/       # 서비스
│   │   ├── layout.tsx
│   │   └── page.tsx        # 홈
│   ├── robots.ts           # SEO
│   └── sitemap.ts          # SEO
├── components/
│   ├── about/              # 회사 소개 컴포넌트
│   ├── contact/            # 문의 컴포넌트
│   ├── home/               # 홈 컴포넌트
│   ├── layout/             # 레이아웃 컴포넌트
│   ├── news/               # 뉴스 컴포넌트
│   ├── services/           # 서비스 컴포넌트
│   └── ui/                 # 공통 UI
├── data/
│   └── pressReleases.ts    # 보도자료 데이터
├── i18n/
│   ├── navigation.ts       # 다국어 네비게이션
│   ├── request.ts          # next-intl 설정
│   └── routing.ts          # 라우팅 설정
└── lib/
    └── supabase.ts

messages/                    # 다국어 메시지
├── ko.json                  # 한국어
├── en.json                  # 영어
├── ja.json                  # 일본어
└── zh.json                  # 중국어
```

## Internationalization (i18n)

### Setup
```typescript
// src/i18n/routing.ts
export const locales = ['ko', 'en', 'ja', 'zh'] as const;
export const defaultLocale = 'ko';
```

### Usage
```tsx
import { useTranslations } from 'next-intl';

export default function Component() {
  const t = useTranslations('home');
  return <h1>{t('title')}</h1>;
}
```

### Adding Translations
```json
// messages/ko.json
{
  "home": {
    "title": "ECREMMOCE에 오신 것을 환영합니다",
    "description": "글로벌 이커머스 솔루션"
  }
}
```

⚠️ **모든 4개 언어 파일에 동일한 키 추가 필수**

## Environment Variables

```
# Supabase (문의 폼용)
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## SEO Configuration

### robots.ts
```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://ecremmoce.com/sitemap.xml',
  };
}
```

### sitemap.ts
```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['ko', 'en', 'ja', 'zh'];
  const pages = ['', '/about', '/services', '/news', '/contact'];
  // Generate URLs for all locale/page combinations
}
```

## Media Guidelines

### Images
- 위치: `public/` 또는 `images/`
- 형식: WebP 우선, fallback으로 JPG/PNG
- 최대 크기: 500KB 이하 권장

### Videos
- 위치: `mov/` 또는 `public/`
- 형식: MP4 (H.264)
- 썸네일: `public/video-thumbnails/`

## Component Patterns

### Home Page
```tsx
// src/components/home/
<HeroSection />        // 히어로 영상
<ServicesSection />    // 서비스 소개
<NewsSection />        // 최신 뉴스
<ContactSection />     // 문의
```

### Layout
```tsx
// src/components/layout/
<Header />             // 네비게이션 + 언어 선택
<main>{children}</main>
<Footer />             // 푸터
```

## Maintenance Policy

When code patterns diverge from this document, propose updates. Ensure all 4 language files remain synchronized.
