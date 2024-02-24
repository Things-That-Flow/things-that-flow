export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'refactor', 'revert', 'style', 'test']],
    'scope-enum': [2, 'always', ['ttflow']],
    'scope-empty': [2, 'never'],
    'subject-case': [0],
    'header-trim': [0]
  }
}
