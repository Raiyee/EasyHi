import {isFunction} from '../../src/utils/base'

const EVENTS = [
  'beforeHtmlGeneration',
  'beforeHtmlProcessing',
  'alterAssetTags',
  'afterHtmlProcessing',
  'afterEmit'
]

const camelToHyphen = (camelStr, hyphen) => camelStr.replace(/([^A-Z])([A-Z])/g,
  (match, p1, p2) => p1 + (hyphen || '-') + p2).toLowerCase()

export default class {
  constructor(options) {
    Object.assign(this, options)
  }

  apply(compiler) {
    compiler.plugin('compilation', compilation => {
      EVENTS.forEach(event => {
        compilation.plugin(`html-webpack-plugin-${camelToHyphen(event)}`, (htmlPluginData, callback) => {
          isFunction(this[event]) && this[event](htmlPluginData)
          isFunction(callback) && callback(null, htmlPluginData)
        })
      })
    })
  }
}
