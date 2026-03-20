import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/',
    '/(ko|en|ja|zh)',
    '/(ko|en|ja|zh)/:path*'
  ]
};
