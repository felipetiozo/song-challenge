module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2020: true,
    mocha: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 11,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error'],
    'prettier/prettier': 'error',
    'func-names': ['error', 'always'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  ignorePatterns: ['node_modules', 'dist'],
}
