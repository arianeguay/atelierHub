import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { en_common, en_events, fr_common, fr_events } from '@atelierhub/translations';

export const locales = ['en', 'fr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();
  const messages = {
    common: locale === 'fr' ? fr_common : en_common,
    events: locale === 'fr' ? fr_events : en_events,
  } as const;
  return { messages };
});
