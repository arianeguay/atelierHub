import { gqlFetch } from '../../../lib/graphql';

const ME_QUERY = /* GraphQL */ `
  query Me {
    me {
      id
      email
      name
      role
      locale
    }
  }
`;

export default async function AccountPage({ params }: { params: { locale: string } }) {
  const data = await gqlFetch<{ me: any }>(ME_QUERY, undefined, { cache: 'no-store' });
  if (!data?.me) {
    return (
      <div>
        <h1>{params.locale === 'fr' ? 'Compte' : 'Account'}</h1>
        <p>{params.locale === 'fr' ? 'Non connecté.' : 'Not logged in.'}</p>
      </div>
    );
  }
  return (
    <div>
      <h1>{params.locale === 'fr' ? 'Compte' : 'Account'}</h1>
      <p>Email: {data.me.email}</p>
      <p>Name: {data.me.name}</p>
      <p>Role: {data.me.role}</p>
      <p>Locale: {data.me.locale}</p>
    </div>
  );
}
