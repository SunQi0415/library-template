import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
// import { eslint } from 'rollup-plugin-eslint';
import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript2';
import { DEFAULT_EXTENSIONS } from '@babel/core';
const isDev = process.env.NODE_ENV !== 'production';

export default {
  input: 'src/index.ts',
  output: {
    file: './dist/bundle.js',
    format: 'umd',
    name: 'library'
  },
  plugins: [
    json(),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    // eslint({
    //   throwOnError: true,
    //   throwOnWarning: true,
    //   include: ['src/**'],
    //   exclude: ['node_modules/**']
    // }),
    typescript({
      compilerOptions: { declaration: true },
      tsconfig: 'tsconfig.json',
      tsconfigOverride: { compilerOptions: { declaration: false } }
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,       // 使plugin-transform-runtime生效
      extensions: [
        ...DEFAULT_EXTENSIONS,
        '.ts',
        '.tsx'
      ]
    }),
    !isDev && terser()
  ]
}