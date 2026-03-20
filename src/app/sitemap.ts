import { MetadataRoute } from 'next';
import { pressReleases } from '@/data/pressReleases';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.ecremmoce.io';
  // 모든 지원 언어 포함 (routing.ts와 동기화)
  const locales = ['ko', 'en', 'ja', 'zh'];
  const defaultLocale = 'ko';
  
  // 기본 페이지들
  const staticPages = ['', '/about', '/services', '/news', '/contact'];
  
  // 정적 페이지 라우트 생성
  const staticRoutes = locales.flatMap((locale) =>
    staticPages.map((page) => {
      const isHomePage = page === '';
      return {
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: isHomePage ? 'weekly' as const : 'monthly' as const,
        priority: isHomePage ? 1 : (locale === defaultLocale ? 0.9 : 0.8),
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${page}`])
          ),
        },
      };
    })
  );

  // 뉴스 상세 페이지들
  const newsRoutes = locales.flatMap((locale) =>
    pressReleases.map((news) => ({
      url: `${baseUrl}/${locale}/news/${news.id}`,
      lastModified: new Date(news.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/news/${news.id}`])
        ),
      },
    }))
  );

  return [...staticRoutes, ...newsRoutes];
}

