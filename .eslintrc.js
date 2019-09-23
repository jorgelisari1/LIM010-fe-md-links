module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    firebase: 'readonly',
  },
  plugins: ['jest'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prefer-destructuring': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'linebreak-style': 0,
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
      "no-console": "off",
      "no-restricted-syntax": [
          "error",
          {
              "selector": "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
              "message": "Unexpected property on console object was called"
          }
      ]
  
  },
};
