module.exports = {
  preset: 'ts-jest',
  rootDir: '../../',
  roots: ['<rootDir>/shared/single-core', '<rootDir>/packages/jest-single/spec'],
  verbose: true,
  resetMocks: true,
  testEnvironment: 'node',
  
  collectCoverage: true,
  coverageDirectory: 'packages/jest-single/coverage',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/packages/jest-single/tsconfig.json'
    }
  }
};
