const compiler = require('vue-loader/lib/template-compiler')

module.exports = function (content) {
  if (!this.options) this.options = {}
  if (!this.options.__vueOptions__) this.options.__vueOptions__ = {}
  return compiler.call(this, content)
}
