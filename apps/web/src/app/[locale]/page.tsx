import Link from 'next/link';

import { gqlFetch } from '../../lib/graphql';

const EVENTS_QUERY = /* GraphQL */ `
  query Events($status: EventStatus) {
    events(filter: { status: $status }) {
      id
      slug
      title_en
      title_fr
      category
    }
  }
`;

export default async function Home({ params }: { params: { locale: string } }) {
  const isFr = params.locale === 'fr';
  const data = await gqlFetch<{ events: any[] }>(
    EVENTS_QUERY,
    { status: 'PUBLISHED' },
    {
      next: { revalidate: 60 },
    },
  );

  return (
    <div>
      <h1>AtelierHub</h1>
      <div className="grid">
        {data.events.map((e) => (
          <div className="card" key={e.id}>
            <h3>{isFr ? e.title_fr : e.title_en}</h3>
            <p>{e.category}</p>
            <Link href={`/${params.locale}/event/${e.slug}`}>{isFr ? 'Voir' : 'View'}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
