'use client';
import { ApolloProvider } from '@apollo/client';
import { NextIntlClientProvider } from 'next-intl';

import { makeApolloClient } from '../lib/apollo-client';

export function Providers({ children, messages }: { children: React.ReactNode; messages: any }) {
  const client = makeApolloClient();
  return (
    <NextIntlClientProvider messages={messages}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </NextIntlClientProvider>
  );
}
