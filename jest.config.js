module.exports = {
  preset: 'ts-jest', // Utilise ts-jest pour les transformations de TypeScript
  testEnvironment: 'node', // Spécifie l'environnement d'exécution (node)
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transforms les fichiers TypeScript
  },
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'], // Recherche les fichiers de test (.ts ou .tsx)
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'], // Extensions de fichiers à gérer
  globals: {
    'ts-jest': {
      isolatedModules: true, // Optimisation pour les modules isolés
    },
  },
};