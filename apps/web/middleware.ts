import createMiddleware from 'next-intl/middleware';

import { defaultLocale, locales } from './src/i18n';

export default createMiddleware({
  locales: locales as unknown as string[],
  defaultLocale,
});

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
