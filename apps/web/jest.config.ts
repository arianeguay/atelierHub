import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  verbose: true,
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/apps/web/tsconfig.json',
      },
    ],
  },
  roots: ['<rootDir>/apps/web'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
};

export default config;
