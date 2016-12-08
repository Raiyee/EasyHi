module.exports = function (content) {
  if (!this.options) this.options = {}
  if (!this.options.__vueOptions__) this.options.__vueOptions__ = {}
  return require('vue-loader/lib/template-compiler').call(this, content)
}
