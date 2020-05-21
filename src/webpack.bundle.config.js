const path = require('path');
const DtsBundleWebpack = require('dts-bundle-webpack');

module.exports = {
  // Test note:  set to 'development' for debugging, 'production' for actual commits.
  // TODO:  https://stackoverflow.com/questions/44113359/passing-command-line-arguments-to-webpack-config-js
  mode: 'development',
  entry: './src/utils/index.m.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.m\.ts/,
        loader: 'ts-loader',
        exclude: '/node_modules/',
        options: {
          configFile: 'tsconfig.module.json'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.m.ts', '.js']
  },
  output: {
    filename: 'module_bundle.js',
    path: path.resolve(__dirname, '../dist/intermediate')
  },
  plugins: [
    new DtsBundleWebpack({
      name: 'progressive-namespace-to-migration-example',
      main: path.resolve(__dirname, '../dist/intermediate/utils/index.m.d.ts'),
      out: path.resolve(__dirname, '../dist/intermediate/module_bundle.d.ts')
    })
  ]
};