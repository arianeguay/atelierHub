import type { Metadata } from 'next';
import { getMessages } from 'next-intl/server';

import { Providers } from '../../components/providers';

import '../globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AtelierHub',
  description: 'Workshops and events platform',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  const { locale } = params;
  return (
    <html lang={locale}>
      <body>
        <Providers messages={messages}>
          <header className="container header">
            <Link href={`/${locale}`}>AtelierHub</Link>
            <nav style={{ display: 'flex', gap: 12 }}>
              <Link href={`/${locale}`}>Home</Link>
              <Link href={`/${locale}/account`}>Account</Link>
            </nav>
          </header>
          <main className="container">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
