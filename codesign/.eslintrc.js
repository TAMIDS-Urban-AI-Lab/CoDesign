// eslint-disable-next-line no-unused-vars
const { rules } = require('eslint-config-prettier');

// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  ignorePatterns: ['/dist/*'],
  rules: {
    'prettier/prettier': ['error', { useTabs: false, tabWidth: 2 }],
    'no-console': 'error',
    'no-debugger': 'error',
    eqeqeq: 'error',
    'prefer-const': 'error',
    'no-unused-vars': 'error'
  },
  overrides: [
    {
      // Test files only
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react']
    }
  ]
};
