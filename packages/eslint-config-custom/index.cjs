// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier', 'simple-import-sort'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'prettier/prettier': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // React 관련 모듈
          ['^react', '^react-dom', '^@testing-library/react', '^react/(.*)$'],
          // Third party modules
          ['^@?\\w'],
          // Next.js 관련 모듈
          ['^next/(.*)$', '^next$'],
          // Libs
          ['^@/libs/shared/(.*)$', '^@/libs/(?!shared/)(.*)$'],
          // 기타 내부 import
          ['^@/public/(.*)$', '^types$', '^[./]']
        ]
      }
    ],
    // 기존 import/order 규칙을 비활성화
    'import/order': 'off'
  }
}
