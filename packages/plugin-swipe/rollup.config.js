import postcss from "rollup-plugin-postcss";

import { createConfig } from "../../shared/rollup.config.mjs";

const buildUI = !!process.env.BUILD_UI;

// Configure postcss to handle .scss and CSS Modules. When BUILD_UI is set we
// extract the compiled CSS to a file; otherwise we keep CSS modules inlined so
// JS imports return the mapping object and Rollup won't try to parse SCSS as JS.
const postcssPlugin = postcss({
  extensions: [".css", ".scss"],
  modules: {
    // scoped class name for modules
    generateScopedName: buildUI
      ? "[name]__[local]___[hash:base64:5]"
      : "[name]__[local]___[hash:base64:5]",
  },
  use: [
    [
      "sass",
      {
        // dart-sass options
      },
    ],
  ],
  extract: buildUI ? "dist/styles.css" : false,
  minimize: buildUI,
  sourceMap: !buildUI,
});

const baseConfig = createConfig();

// Prepend postcss plugin to every generated build config so that style imports
// (scss/css modules) are handled for JS, CJS and types builds alike.
baseConfig.forEach((conf) => {
  if (!conf) return;
  conf.plugins = [postcssPlugin, ...(conf.plugins || [])];
});

const config = baseConfig;

export default config;
