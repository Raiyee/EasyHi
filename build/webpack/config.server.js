process.env.VUE_ENV = 'server'

const webpack = require('webpack')
const {globals} = require('../config')
const base = require('./config.base.js')

module.exports = Object.assign({}, base, {
  target: 'node',
  devtool: false,
  entry: './src/server-entry.js',
  output: Object.assign({}, base.output, {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  }),
  plugins: [
    new webpack.DefinePlugin(Object.assign({}, globals, {
      'process.env.VUE_ENV': '"server"',
      __SERVER__: true
    }))
  ]
})
