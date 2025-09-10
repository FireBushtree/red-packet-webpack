module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: [
    '<rootDir>/tests/unit/**/*.test.{js,ts}',
    '<rootDir>/tests/unit/**/*.spec.{js,ts}',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/index.css',
  ],
  setupFilesAfterEnv: [],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  transform: {
    '^.+\\.(js|ts|tsx)$': ['@swc/jest'],
  },
  moduleDirectories: ['node_modules', '<rootDir>/src'],
}
