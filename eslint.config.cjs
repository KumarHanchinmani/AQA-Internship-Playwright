const js = require('@eslint/js');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const prettier = require('eslint-plugin-prettier');
const globals = require('globals');

module.exports = [
  js.configs.recommended,

  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
      globals: {
        ...globals.node, // ✅ THIS FIXES `process`
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },

  {
    ignores: ['node_modules', 'playwright-report', 'test-results', 'dist'],
  },
];
