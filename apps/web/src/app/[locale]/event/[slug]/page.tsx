import Link from 'next/link';

import { gqlFetch } from '../../../../lib/graphql';

export const revalidate = 120; // ISR for event pages

const EVENT_QUERY = /* GraphQL */ `
  query Event($slug: String!) {
    event(slug: $slug) {
      id
      slug
      title_en
      title_fr
      description_en
      description_fr
      category
      sessions {
        id
        startsAt
        endsAt
        priceCents
      }
    }
  }
`;

export default async function EventPage({ params }: { params: { locale: string; slug: string } }) {
  const { slug, locale } = params;
  const isFr = locale === 'fr';
  const data = await gqlFetch<{ event: any }>(EVENT_QUERY, { slug }, { next: { revalidate } });
  const e = data.event;
  if (!e) {
    return (
      <div>
        <p>Event not found.</p>
        <Link href={`/${locale}`}>Back</Link>
      </div>
    );
  }
  return (
    <div>
      <h1>{isFr ? e.title_fr : e.title_en}</h1>
      <p>{isFr ? e.description_fr : e.description_en}</p>
      <h3>{isFr ? 'Séances' : 'Sessions'}</h3>
      <ul>
        {e.sessions.map((s: any) => (
          <li key={s.id}>
            {new Date(s.startsAt).toLocaleString(locale)} →{' '}
            {new Date(s.endsAt).toLocaleString(locale)} — ${(s.priceCents / 100).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
