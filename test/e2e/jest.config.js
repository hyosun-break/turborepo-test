const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

// const customJestConfig = {
//   collectCoverage: true,
//   coverageProvider: 'v8',
//   rootDir: '../../',
//   roots: ['./test/e2e'],
//   // 타입스크립트 컴파일
//   // transform: {
//   //   '^.+\\.(ts|tsx)?$': 'ts-jest',
//   // },
//   // 테스트 코드 특정
//   testMatch: ['**/?(*.)+(spec|test).ts'],
//   // 개별 테스트 결과 표시
//   verbose: true,
//   // 프리셋(puppeteer 사용)
//   preset: 'jest-puppeteer',
//   // projects: [
//   //   '<rootDir>/apps/break/jest.config.js',
//   //   '<rootDir>/apps/brg/jest.config.js',
//   // ],
//   projects: ['<rootDir>', '<rootDir>/apps/*'],

//   moduleNameMapper: {
//     '^break-ui/(.*)$': '<rootDir>/packages/break-ui/$1',
//     '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
//   },

//   setupFilesAfterEnv: ['<rootDir>/test/e2e/jest.image.ts'],
//   testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
//   testEnvironment: 'jsdom',
//   transform: {
//     // Use babel-jest to transpile tests with the next/babel preset
//     // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
//     '^.+\\.(js|jsx|ts|tsx)$': [
//       'babel-jest',
//       { presets: ['next/babel', 'jest-puppeteer'] },
//     ],
//   },
//   transformIgnorePatterns: [
//     '/node_modules/',
//     '^.+\\.module\\.(css|sass|scss)$',
//   ],
// };

// module.exports = createJestConfig(customJestConfig);

const customJestConfig = {
  collectCoverage: true,
  coverageProvider: 'v8',
  rootDir: '../../',
  roots: ['./test/e2e'],
  verbose: true,
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^break-ui/(.*)$': '<rootDir>/packages/break-ui/$1',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/test/e2e/jest.image.ts'],
};

module.exports = async (...args) => {
  const fn = createJestConfig(customJestConfig);
  const res = await fn(...args);

  res.transformIgnorePatterns = res.transformIgnorePatterns.map((pattern) => {
    if (pattern === '/node_modules/') {
      return '/node_modules(?!/excluded-module)/';
    }
    return pattern;
  });

  return res;
};
