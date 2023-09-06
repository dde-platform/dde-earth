import nextra from 'nextra';

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  staticImage: true,
  flexsearch: {
    codeblocks: false,
  },
  defaultShowCopyCode: true,
});

export default withNextra({
  i18n: {
    locales: ['en-US', 'zh-CN'],
    defaultLocale: 'en-US',
  },
  redirects: () => {
    return [
      {
        source: '/docs',
        destination: '/docs/getting-started',
        statusCode: 301,
      },
      {
        source: '/docs',
        destination: '/docs/getting-started',
        statusCode: 302,
      },
      {
        source: '/examples',
        destination: '/examples/basic',
        statusCode: 302,
      },
    ];
  },
  reactStrictMode: true,
});
