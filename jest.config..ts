module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 100000,
  rootDir: __dirname,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
