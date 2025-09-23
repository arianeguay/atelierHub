import type { CodegenConfig } from '@graphql-codegen/cli';

// Root GraphQL Codegen
// - Generates shared schema types into packages/types
// - Client-specific hooks will be added when web/ops apps are scaffolded

const config: CodegenConfig = {
  overwrite: true,
  schema: 'apps/api/src/schema/**/*.graphql',
  generates: {
    'packages/types/src/graphql/__generated__/schema-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useTypeImports: true,
        enumsAsTypes: true,
        scalars: { DateTime: 'string' }
      },
    },
  },
};

export default config;
