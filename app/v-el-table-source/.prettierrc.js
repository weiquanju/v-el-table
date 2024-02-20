const options = {
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  endOfLine: 'auto',
  trailingComma: 'all',
  parser: 'typescript',
  proseWrap: 'never',
  printWidth: 150,
}
module.exports = {
  ...options,
  vueIndentScriptAndStyle: true,
  overrides: [
    {
      files: ['*.vue', '*.ts', '*.tsx'],
      options: {
        ...options,
      },
    },
  ],
}
