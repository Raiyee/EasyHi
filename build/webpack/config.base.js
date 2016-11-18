const path = require('path')
const webpack = require('webpack')
const debug = require('debug')('hi:webpack:base')

const {paths, compilerDevTool, compilerPublicPath, compilerVendor} = require('../config')
const {localIdentName, vueCssLoaders} = require('./utils')

debug('Create webpack configuration.')

const sourceMap = !!compilerDevTool

module.exports = {
  devtool: compilerDevTool,
  entry: {
    app: './src/client-entry.js',
    vendor: compilerVendor
  },
  output: {
    path: paths.dist(),
    publicPath: compilerPublicPath,
    filename: `[name].[chunkhash].js`,
    chunkFilename: `[id].[chunkhash].js`
  },
  resolve: {
    modules: [paths.src(), 'node_modules'],
    extensions: ['.js', '.vue', '.styl'],
    enforceExtension: false
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: vueCssLoaders({
            sourceMap
          }),
          autoprefixer: false,
          cssModules: {
            camelCase: true,
            localIdentName
          }
        }
      }, {
        test: /\.js$/,
        loader: 'buble-loader',
        exclude: /node_modules/,
        options: {
          objectAssign: 'Object.assign'
        }
      }, {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  }
}
