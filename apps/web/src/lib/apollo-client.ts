import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

import fetch from 'cross-fetch';

export function makeApolloClient() {
  const uri =
    process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:4000/graphql';
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({ uri, fetch, credentials: 'include' }),
    cache: new InMemoryCache(),
  });
}
