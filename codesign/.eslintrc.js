// eslint-disable-next-line no-unused-vars
const { rules } = require('eslint-config-prettier');

// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  ignorePatterns: ['/dist/*'],
  rules: {
    'prettier/prettier': ['error', { useTabs: false, tabWidth: 2 }]
  }
};