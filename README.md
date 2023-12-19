# dde-earth

This is a development template for npm packages that includes a technology stack consisting of `monorepo`, `pnpm`, `turbo`, `changesets`, `rollup`, `eslint`, and more.

## ✨ Features

- [Pnpm](https://github.com/pnpm/pnpm) - package manager
- [Turborepo](https://github.com/vercel/turbo) - an incremental build system
- [Changesets](https://github.com/changesets/changesets) - npm package publisher & changelog generator
- [Rollup](https://github.com/rollup/rollup) - ES module bundler
- [ESLint](https://github.com/eslint/eslint) - find and fix problems in code
- [Prettier](https://github.com/prettier/prettier) - code formatter
- [Husky](https://github.com/typicode/husky) - git hooks (`commit-lint` and `lint-staged` preinstalled)
- [Vitest](https://github.com/vitest-dev/vitest) - a fast test framework

## 💻 Development

- Install dependencies using `pnpm install`
- Run development servers `pnpm dev`
- Run tests `pnpm test`
- Adding changesets using `pnpm changeset`
- Once you decide you want to do a release, you can run `pnpm version`
- Once you are confident that these are correct, and have made any necessary tweaks to changelogs, you can publish your packages using `pnpm release`

## 🐶 Suggestions

- You can install [nextra](https://github.com/shuding/nextra) in the `doc` directory, or choose other document site generation framework like [docusaurus](https://github.com/facebook/docusaurus) or [dumi](https://github.com/umijs/dumi) etc.
- In the `examples` folder, you can place multiple sample websites to showcase the demo of your npm package on the web.
- It is recommended to deploy your static web pages (documentation and examples) using [Vercel](https://vercel.com) or [Cloudflare](https://cloudflare.com).
