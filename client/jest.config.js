module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
  },

  testEnvironment:"jsdom",
  setupFilesAfterEnv:["./src/setupTests.ts"]

};
