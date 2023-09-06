/** @type {import('eslint').Linter.Config} */
module.exports = {
  overrides: [
    {
      files: '**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}',
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
      ],
      plugins: ['@typescript-eslint', 'prettier'],
      rules: {
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/ban-types': 'off',
      },
    },
    {
      files: ['.eslintrc.cjs', 'commitlint.config.js', 'rollup.config.{js,ts}'],
      env: {
        node: true,
      },
    },
  ],
  root: true,
};
