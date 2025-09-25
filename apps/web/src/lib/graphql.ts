type Variables = Record<string, any> | undefined;

export async function gqlFetch<T>(query: string, variables?: Variables, init?: RequestInit) {
  const uri =
    process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:4000/graphql';
  const res = await fetch(uri, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(init?.headers || {}),
    },
    body: JSON.stringify({ query, variables }),
    // Allow server components to forward cookies automatically
    credentials: 'include',
    cache: init?.cache,
    next: (init as any)?.next,
  } as any);
  if (!res.ok) throw new Error('Failed to fetch GraphQL');
  const json = (await res.json()) as { data?: T; errors?: any };
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data as T;
}
