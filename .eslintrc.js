module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    semi: [2, 'never'],
    'no-extra-boolean-cast': 0,
    'no-console': 1,
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'space-before-function-paren': 'off'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
