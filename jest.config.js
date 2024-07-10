module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testMatch: ['**/__tests__/**/*.test.ts'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    collectCoverageFrom: ['src/**/*.ts', '!src/types.ts', '!src/config.ts'],
    coverageThreshold: {
      global: {
        branches: 85,
        functions: 85,
        lines: 85,
        statements: 85,
      },
    },
  };