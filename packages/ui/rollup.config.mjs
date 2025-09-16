import babel from '@rollup/plugin-babel';

import dts from 'rollup-plugin-dts';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: './dist/index.js',
      format: 'esm',
    },
    plugins: [
      babel({
        babelHelpers: 'bundled',
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      typescript(),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: './dist/index.d.ts',
      format: 'esm',
    },
    plugins: [dts()],
  },
];
