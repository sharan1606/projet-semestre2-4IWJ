export const preset = 'ts-jest';
export const testEnvironment = 'node';
export const transform = {
  '^.+\\.tsx?$': 'ts-jest', // Transforms les fichiers TypeScript
};
export const testMatch = ['**/?(*.)+(spec|test).[tj]s?(x)'];
export const moduleFileExtensions = ['ts', 'tsx', 'js', 'json'];
export const globals = {
  'ts-jest': {
    isolatedModules: true, // Optimisation pour les modules isolés
  },
};
  