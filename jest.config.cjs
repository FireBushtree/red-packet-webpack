module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: [
    '<rootDir>/test/unit/**/*.test.{js,ts}',
    '<rootDir>/test/unit/**/*.spec.{js,ts}',
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
