module.exports = {
  moduleFileExtensions: ['js', 'json'],
  rootDir: '.',
  testRegex: ['.spec.js$', '.test.js$'],
  coverageDirectory: '__tests__/coverage',
  collectCoverageFrom: [
    'src/**'
  ],
  testEnvironment: 'node'
};
