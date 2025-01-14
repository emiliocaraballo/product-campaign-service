module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { 
      "varsIgnorePattern": "^(Inject|.*Entity|.*Module)$",
    }],
  },
  overrides: [
    {
      files: ['infrastructure/**/*.{ts,js}','infrastructure/**/**/*.{ts,js}'], // Archivos en la capa de infraestructura
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
