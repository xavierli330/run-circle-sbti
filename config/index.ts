import { defineConfig } from '@tarojs/cli'
import path from 'path'

export default defineConfig({
  projectName: 'run-circle-sbti',
  date: '2026-4-11',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    375: 2,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['@tarojs/plugin-framework-react'],
  defineConstants: {},
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
  },
  copy: { patterns: [], options: {} },
  framework: 'react',
  compiler: {
    type: 'webpack5',
    prebundle: { enable: false },
  },
  mini: {
    postcss: {
      pxtransform: { enable: true, config: {} },
      cssModules: { enable: false, config: { namingPattern: 'module', generateScopedName: '[name]__[local]___[hash:base64:5]' } },
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: { enable: true, config: {} },
      cssModules: { enable: false, config: { namingPattern: 'module', generateScopedName: '[name]__[local]___[hash:base64:5]' } },
    },
  },
})
