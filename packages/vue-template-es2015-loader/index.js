const loaderUtils = require('loader-utils')

const compiler = require('vue-template-compiler')
const transpile = require('vue-template-es2015-compiler')
const genId = require('./gen-id')

// vue compiler module for using transforming `<tag>:<attribute>` to `require`
const defaultTransformToRequire = {
  img: 'src'
}

let transformToRequire = defaultTransformToRequire

const defaultCompileOptions = {
  modules: [{
    postTransformNode(el) {
      for (const tag in transformToRequire) {
        if (el.tag === tag && el.attrs) {
          const attributes = transformToRequire[tag]
          if (typeof attributes === 'string') {
            el.attrs.some(attr => rewrite(attr, attributes))
          } else if (Array.isArray(attributes)) {
            attributes.forEach(item => el.attrs.some(attr => rewrite(attr, item)))
          }
        }
      }
    }
  }]
}

function rewrite(attr, name) {
  if (attr.name === name) {
    let value = attr.value
    const isStatic = value.charAt(0) === '"' && value.charAt(value.length - 1) === '"'
    if (!isStatic) {
      return
    }
    const firstChar = value.charAt(1)
    if (firstChar === '.' || firstChar === '~') {
      if (firstChar === '~') {
        value = '"' + value.slice(2)
      }
      attr.value = `require(${value})`
    }
    return true
  }
}

module.exports = function (content) {
  this.cacheable()

  const isProduction = this.minimize || process.env.NODE_ENV === 'production'
  const isServer = this.options.target === 'node'

  const query = loaderUtils.parseQuery(this.query)
  const vueOptions = this.options.__vueOptions__ = this.options.__vueOptions__ || Object.assign({}, this.options.vue, this.vue, query)

  if (vueOptions.transformToRequire) {
    transformToRequire = Object.assign(
      {},
      defaultTransformToRequire,
      vueOptions.transformToRequire
    )
  }

  const compiled = compiler.compile(content, Object.assign({
    preserveWhitespace: vueOptions.preserveWhitespace
  }, defaultCompileOptions))

  const id = `data-v-${genId(this.resourcePath)}`

  compiled.errors.forEach(error => {
    this.emitError('template syntax error ' + error)
  })

  const shouldHotReload = !isServer && !this.minimize &&
    process.env.NODE_ENV !== 'production'

  const bubleOptions = vueOptions.buble
  let output = transpile(writeRenderCode(compiled, id), bubleOptions)

  // mark with stripped (this enables Vue to use correct runtime proxy detection)
  if (!isProduction && (
      !bubleOptions || !bubleOptions.transforms ||
      bubleOptions.transforms.stripWith !== false
    )) {
    output += `\nrender._withStripped = true`
  }

  if (shouldHotReload) {
    output += writeHotReloadCode(id)
  }

  return output
}

function writeRenderCode(compiled, id) {
  return [
    `var render = ${toFunction(compiled.render)}`,
    `var staticRenderFns = [${compiled.staticRenderFns.map(toFunction).join(',')}]`,
    'module.exports = function (options) {',
    '  options.render = render',
    '  options.staticRenderFns = staticRenderFns',
    '  if (module.hot && api) {',
    `    api.createRecord("${id}", options)`,
    '  }',
    '  return options',
    '}\n'
  ].join('\n')
}

function writeHotReloadCode(id) {
  return [
    '\nvar api = null',
    'if (module.hot) {(function () {',
    '  api = require("vue-hot-reload-api")',
    '  api.install(require("vue"))',
    '  if (!api.compatible) return',
    '  module.hot.accept()',
    '  if (module.hot.data) {',
    `    api.rerender("${id}", { render: render, staticRenderFns: staticRenderFns })`,
    '  }',
    '})()}\n'
  ].join('\n')
}

function toFunction(code) {
  return `function(){${code}}`
}
