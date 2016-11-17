const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')

const {compilerHtmlMinify, globals, pkg} = require('../config')
const base = require('./config.base.js')

const config = Object.assign({}, base, {
  plugins: base.plugins.concat([
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // generate output HTML
    new HtmlWebpackPlugin({
      template: 'src/index.template.html',
      hash: false,
      inject: true,
      minify: {
        collapseWhitespace: compilerHtmlMinify,
        minifyJS: compilerHtmlMinify
      }
    })
  ])
})

if (!globals.__DEV__) {
  config.plugins.push(
    new ExtractTextPlugin('styles.[contenthash].css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new SWPrecachePlugin({
      cacheId: 'easyhi-vue',
      filename: 'service-worker.js',
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/]
    })
  )
}

module.exports = config
