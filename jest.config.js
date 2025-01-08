module.exports = {
    preset: 'ts-jest',
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    transformIgnorePatterns: [
      '/node_modules/(?!(@babel|your-module-name))',  // Ne pas ignorer certains modules dans node_modules
    ],
    globals: {
      'ts-jest': {
        useBabelrc: true, // Utilisation du fichier .babelrc pour la configuration
      },
    },
  };
  