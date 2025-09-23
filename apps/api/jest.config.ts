import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  verbose: true,
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/apps/api/tsconfig.app.json',
      },
    ],
  },
  roots: ['<rootDir>/apps/api/src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
};

export default config;
