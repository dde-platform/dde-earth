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
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
    {
      files: [
        '.eslintrc.cjs',
        'postcss.config.js',
        'tailwind.config.js',
        'commitlint.config.js',
        'rollup.config.{js,mjs}',
      ],
      env: {
        node: true,
      },
    },
  ],
  ignorePatterns: ['dist', 'next-env.d.ts'],
  root: true,
};
