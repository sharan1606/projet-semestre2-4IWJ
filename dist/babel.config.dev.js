"use strict";

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-typescript' // Assurez-vous que Babel supporte TypeScript
  ],
  plugins: ['@babel/plugin-transform-modules-commonjs' // Pour transformer les modules ES en CommonJS si nécessaire
  ]
};