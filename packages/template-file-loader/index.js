const cons = require('consolidate')
const loaderUtils = require('loader-utils')
const extname = require('path').extname

module.exports = function (content) {
  this.cacheable && this.cacheable()
  const callback = this.async()
  const opt = loaderUtils.getOptions(this)

  function exportContent(content) {
    callback(null, opt.raw ? content : 'module.exports = ' + JSON.stringify(content))
  }

  // with no engine given, use the file extension as engine
  opt.engine = opt.engine || extname(this.request).substr(1).toLowerCase()

  if (!cons[opt.engine]) {
    return callback(new Error(
      'Template engine \'' + opt.engine + '\' ' +
      'isn\'t available in Consolidate.js'
    ))
  }

  // for relative includes
  opt.filename = this.resourcePath

  cons[opt.engine].render(content, opt, function (err, html) {
    if (err) return callback(err)
    exportContent(html)
  })
}
