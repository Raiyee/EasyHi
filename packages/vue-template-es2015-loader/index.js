const compiler = require('vue-template-compiler')
const transpile = require('vue-template-es2015-compiler')

module.exports = function (content) {
  const compiled = compiler.compile(content)

  if (compiled.errors.length) throw compiled.errors

  return transpile(`module.exports = {
      render: ${toFunction(compiled.render)},
      staticRenderFns: [${compiled.staticRenderFns.map(toFunction).join(',')}]
    };`)
}

function toFunction(code) {
  return `function(){${code}}`
}
