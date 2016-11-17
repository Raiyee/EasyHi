const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')

const {compilerDevTool, compilerHtmlMinify, globals} = require('../config')
const {baseLoaders, cssModuleLoaders, generateLoaders, nodeModules} = require('./utils')

const base = require('./config.base.js')

const {__DEV__}  = globals

const sourceMap = !!compilerDevTool
const styleLoader = 'stylus-loader'
let appLoader, bootstrapLoader

const config = Object.assign({}, base, {
  module: {
    rules: base.module.rules.concat([
      {
        test: /[/\\]app\.styl$/,
        loader: generateLoaders(styleLoader, baseLoaders, {
          sourceMap,
          extract: !__DEV__ && (appLoader = new ExtractTextPlugin('app.[contenthash].css'))
        }),
        exclude: nodeModules
      },
      {
        test: /[/\\]bootstrap\.styl$/,
        loader: generateLoaders(styleLoader, baseLoaders, {
          sourceMap,
          extract: !__DEV__ && (bootstrapLoader = new ExtractTextPlugin('bootstrap.[contenthash].css'))
        }),
        exclude: nodeModules
      },
      {
        test: /[/\\]theme-\w+\.styl$/,
        loader: generateLoaders(styleLoader, baseLoaders, {
          sourceMap
        }),
        exclude: nodeModules
      },
      {
        test: /^(?!.*[/\\](app|bootstrap|theme-\w+)\.styl).*\.styl/,
        loader: generateLoaders(styleLoader, cssModuleLoaders, {
          sourceMap
        }),
        exclude: nodeModules
      },
      {
        test: /\.styl$/,
        loader: generateLoaders(styleLoader, baseLoaders, {
          sourceMap
        }),
        include: nodeModules
      }
    ])
  },
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

if (!__DEV__) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    }),
    new SWPrecachePlugin({
      cacheId: 'easyhi-vue',
      filename: 'service-worker.js',
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/]
    }),
    // 将 bootstrap 和 app 分别导出到单独的文件中, 这里的顺序就是被注入到 HTML 中时加载的顺序
    bootstrapLoader,
    appLoader
  )
}

module.exports = config
