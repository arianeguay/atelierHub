import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  verbose: true,
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/apps/ops/tsconfig.app.json',
      },
    ],
  },
  roots: ['<rootDir>/apps/ops/src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'html'],
};

export default config;
