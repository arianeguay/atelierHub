import type { CodegenConfig } from '@graphql-codegen/cli';

// Root GraphQL Codegen
// - Generates shared schema types into packages/types
// - Generates client operations for Next.js and Angular apps

const config: CodegenConfig = {
  overwrite: true,
  schema: 'apps/api/src/schema/**/*.graphql',
  documents: ['apps/web/src/**/*.{ts,tsx}', 'apps/ops/src/**/*.{ts,tsx}'],
  generates: {
    'packages/types/src/graphql/__generated__/schema-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useTypeImports: true,
        enumsAsTypes: true,
        scalars: { DateTime: 'string' },
      },
    },
    'apps/web/src/graphql/__generated__/': {
      preset: 'client',
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        useTypeImports: true,
        withHooks: true,
        reactApolloVersion: 3,
        addDocBlocks: false,
      },
    },
    'apps/ops/src/graphql/__generated__/types.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-apollo-angular'],
      config: {
        useTypeImports: true,
        addDocBlocks: false,
        withComponent: false,
        withHooks: false,
        withMutationFn: false,
      },
    },
  },
};

export default config;
