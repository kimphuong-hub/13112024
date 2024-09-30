module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
    'prettier'
  ],
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'react/react-in-jsx-scope': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
