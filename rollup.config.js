import babel from 'rollup-plugin-babel';
import localResolve from 'rollup-plugin-local-resolve';
import { uglify } from 'rollup-plugin-uglify';
import strip from '@rollup/plugin-strip';

export default {
  input: './src/index.js',
  output: {
    file: './dist/index.js',
    format: 'umd',
    name: 'index',
    globals: {
      react: 'React',
    }
  },
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
    uglify(),
    strip()
  ]
}
