import babel from 'rollup-plugin-babel';
import localResolve from 'rollup-plugin-local-resolve';
import { terser } from 'rollup-plugin-terser';
import strip from '@rollup/plugin-strip';

export default {
  input: './src/index.js',
  output: [
    {
      file: './dist/index.js',
      format: 'umd',
      name: 'redext',
      globals: {
        react: 'React'
      }
    },
    {
      file: './dist/cjs/index.js',
      format: 'cjs',
      name: 'redext',
      globals: {
        react: 'React'
      }
    },
    {
      file: './dist/esm/index.mjs',
      format: 'esm',
      name: 'redext',
      globals: {
        react: 'React'
      }
    }
  ],
  external: [
    'react'
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: [
        [
          '@babel/env',
          {
            modules: false
          }
        ],
        '@babel/react'
      ],
      plugins: [
        '@babel/proposal-class-properties'
      ]
    }),
    localResolve(),
    terser(),
    strip()
  ]
}
