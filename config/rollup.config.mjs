import { readFileSync } from 'fs';
import { builtinModules } from 'module';
import path from 'path';
import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

const cwd = process.cwd();
const pkg = JSON.parse(readFileSync(path.join(cwd, 'package.json'), 'utf8'));

const plugins = [
  esbuild({
    target: 'node14',
  }),
];

const external = [
  ...builtinModules,
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

export default defineConfig([
  {
    input: './src/index.ts',
    output: {
      dir: path.dirname(pkg.module),
      format: 'esm',
      sourcemap: true,
      preserveModules: true, // 保留模块结构
    },
    external,
    plugins,
  },
  {
    input: './src/index.ts',
    output: {
      dir: path.dirname(pkg.main),
      format: 'commonjs',
      sourcemap: true,
      preserveModules: true, // 保留模块结构
    },
    external,
    plugins,
  },
  {
    input: './src/index.ts',
    output: {
      format: 'umd',
      sourcemap: true,
      file: pkg.unpkg,
      name: 'DDEEarth',
      globals: {
        cesium: 'Cesium',
        'dde-earth': 'DDEEarth',
      },
    },
    external,
    plugins,
  },
  {
    input: './src/index.ts',
    output: {
      dir: path.dirname(pkg.types),
      entryFileNames: '[name].d.ts',
      format: 'esm',
    },
    external,
    plugins: [dts({ respectExternal: true })],
  },
]);
