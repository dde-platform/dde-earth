import { readFileSync } from 'fs';
import path from 'path';
import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import externals from 'rollup-plugin-node-externals';

const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url)).toString(),
);

const plugins = [
  esbuild({
    target: 'node14',
  }),
  externals({ devDeps: false }),
];

export default defineConfig([
  {
    input: 'src/index.ts',
    output: {
      dir: path.dirname(pkg.module),
      format: 'esm',
      sourcemap: true,
      name: pkg.name,
      exports: 'named', // 指定导出模式（自动、默认、命名、无）
      preserveModules: true, // 保留模块结构
      preserveModulesRoot: 'src', // 将保留的模块放在根级别的此路径下
    },
    plugins,
  },
  {
    input: 'src/index.ts',
    output: {
      format: 'umd',
      sourcemap: true,
      file: pkg.main,
      name: 'DDEEarth',
    },
    plugins,
  },
  {
    input: 'src/index.ts',
    output: {
      dir: path.dirname(pkg.types),
      entryFileNames: '[name].d.ts',
      format: 'esm',
    },
    plugins: [dts({ respectExternal: true })],
  },
]);
