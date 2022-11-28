const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const customJestConfig = {
  rootDir: '../../',
  roots: ['./test/e2e'],
  // 타입스크립트 컴파일
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', 'dist'],
  // 테스트 코드 특정
  testMatch: ['**/?(*.)+(spec|test).ts'],
  // 개별 테스트 결과 표시
  verbose: true,
  // 프리셋(puppeteer 사용)
  preset: 'jest-puppeteer',
  projects: [
    '<rootDir>/apps/break/jest.config.js',
    '<rootDir>/apps/brg/jest.config.js',
  ],

  setupFilesAfterEnv: ['<rootDir>/test/e2e/jest.image.ts'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/packages/tsconfig/react-library.json',
    },
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
