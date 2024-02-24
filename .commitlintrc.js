export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'refactor', 'revert', 'style', 'test']],
    'scope-enum': [2, 'always', ['ttflow']],
    'subject-full-stop': [2, 'never', '.'],
    'subject-case': [0]
  }
}
