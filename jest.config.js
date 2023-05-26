/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsConfig: 'tsconfig.test.json',
      },
    ],
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
