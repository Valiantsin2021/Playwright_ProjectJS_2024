import prettier from 'eslint-config-prettier'
import playwright from 'eslint-plugin-playwright'
import globals from 'globals'

export default [
  {
    plugins: { prettier, playwright },
    files: ['page_objects/**/*.js', 'tests/**/*.js', 'helpers/**/*.js'],
    ignores: ['allure-report/'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser
      }
    },
    rules: {
      'playwright/no-conditional-in-test': 'off',
      'playwright/expect-expect': 'off',
      'playwright/no-focused-test': 'error',
      'playwright/require-soft-assertions': 'warn',
      'no-global-assign': 'warn',
      'no-console': 'off',
      'no-useless-escape': 'off',
      'no-empty-pattern': 'off',
      'no-eval': 'error',
      'no-multi-spaces': 'error',
      'no-new': 'warn',
      'no-return-assign': 'warn',
      'comma-dangle': ['error', 'never'],
      strict: ['error', 'global'],
      'no-new-func': 'error',
      'no-param-reassign': 'warn',
      'prefer-arrow-callback': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'no-invalid-this': 'error',
      'no-implied-eval': 'error',
      eqeqeq: 'error',
      'no-with': 'error',
      'func-call-spacing': ['error', 'never'],
      'max-len': ['off', { code: 200, ignoreComments: true }],
      'new-cap': ['error', { newIsCap: true }],
      'new-parens': 'error',
      quotes: ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-var': 'warn',
      'no-unused-vars': ['warn', { vars: 'local' }],
      'import/no-unresolved': 'off', // k6 is actually golang, can't really import it
      'no-restricted-globals': 'off', // required by k6, e.g. "init" context
      'import/extensions': 'off', // .js ending is ok
      'no-prototype-builtins': 'off'
    }
  }
]
