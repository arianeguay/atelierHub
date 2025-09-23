// Shared types across apps
// GraphQL schema types will be generated into this package under src/graphql/__generated__ by codegen later.

export type Locale = 'en' | 'fr';

export enum UserRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  CUSTOMER = 'CUSTOMER',
}

export interface Pagination {
  limit?: number;
  offset?: number;
}

export interface SeoMeta {
  title?: string;
  description?: string;
  image?: string;
}

export const pkg = 'types';
