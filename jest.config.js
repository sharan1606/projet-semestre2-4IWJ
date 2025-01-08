module.exports = {
    transform: {
      "^.+\\.tsx?$": "babel-jest", // Transpile TypeScript files
      "^.+\\.js$": "babel-jest"    // Transpile JavaScript files
    },
    moduleFileExtensions: ['js', 'ts', 'tsx'],
  };
  