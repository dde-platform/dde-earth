import json from '@rollup/plugin-json';
import { readFileSync } from 'fs';
import { builtinModules } from 'module';
import path from 'path';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

const cwd = process.cwd();

export function getPkg() {
  return JSON.parse(readFileSync(path.join(cwd, 'package.json'), 'utf8'));
}

const pkg = getPkg();

export function getPlugins() {
  return [
    esbuild({
      minify: true,
    }),
    json(),
  ];
}

const plugins = getPlugins();

export function getExternals() {
  return [
    ...builtinModules,
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ];
}

const external = getExternals();

const onwarn = (warning) => {
  throw Object.assign(new Error(), warning);
};

export function createConfig(replace = {}) {
  const config = [
    pkg.module
      ? {
          input: './src/index.ts',
          output: {
            dir: path.dirname(pkg.module),
            format: 'es',
            sourcemap: true,
            preserveModules: true, // 保留模块结构
          },
          external,
          plugins,
          onwarn,
        }
      : undefined,
    pkg.main
      ? {
          input: './src/index.ts',
          output: {
            dir: path.dirname(pkg.main),
            format: 'cjs',
            sourcemap: true,
            preserveModules: true, // 保留模块结构
          },
          external,
          plugins,
          onwarn,
        }
      : undefined,
    pkg.unpkg
      ? {
          input: './src/index.ts',
          output: {
            format: 'umd',
            sourcemap: true,
            file: pkg.unpkg,
            name: 'DDE',
            inlineDynamicImports: true,
            globals: {
              cesium: 'Cesium',
              'dde-earth': 'DDE',
            },
          },
          external,
          plugins,
        }
      : undefined,
    {
      input: './src/index.ts',
      output: {
        dir: path.dirname(pkg.types),
        entryFileNames: '[name].d.ts',
        format: 'esm',
      },
      external,
      plugins: [dts({ respectExternal: true }), json()],
      onwarn,
    },
  ];

  Object.entries(replace).map(([type, conf]) => {
    const index = config.findIndex((item) => item.output.format === type);
    if (index !== -1) {
      config[index] = typeof conf === 'function' ? conf(config[index]) : conf;
    } else {
      config.push(typeof conf === 'function' ? conf() : conf);
    }
  });

  return config.filter((item) => !!item);
}
