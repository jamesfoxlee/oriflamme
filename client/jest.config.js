module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
  },
<<<<<<< HEAD
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./src/setupTests.ts"],
=======
  testEnvironment:"jsdom",
  setupFilesAfterEnv:["./src/setupTests.ts"]
>>>>>>> 0e46ef68244994f884b63bcb04c04a486ca03248
};
