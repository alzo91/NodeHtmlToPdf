module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier', 'prettier/prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-param-reassing': 'off',
    'import/newline-after-import': ['error', { count: 2 }],
    camelcase: [
      2,
      {
        ignoreDestructuring: true,
        properties: 'never',
        ignoreImports: true,
      },
    ],
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'no-param-reassign': ['error', { props: false }],
  },
};
