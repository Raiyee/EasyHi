const ExtractTextPlugin = require('extract-text-webpack-plugin')
const _debug = require('debug')
const {argv} = require('yargs')

// generate loader string to be used with extract text plugin
const generateLoaders = exports.generateLoaders = (loader, loaders, options= {}) => {
  const sourceLoaders = (loader ? [...loaders, loader] : loaders).map(loader => {
    const hyphen = /\?/.test(loader) ? '&' : '?'
    return loader + (options.sourceMap ? hyphen + 'sourceMap' : '')
  }).join('!')

  const styleLoader = `${options.vue ? 'vue-' : ''}style-loader`

  let extract = options.extract
  if (extract) {
    return (extract.extract ? extract : ExtractTextPlugin).extract(
      {
        fallbackLoader: styleLoader,
        loader: sourceLoaders
      }
    )
  } else {
    return [styleLoader, sourceLoaders].join('!')
  }
}

const baseLoaders = exports.baseLoaders = ['css-loader?-minimize', 'postcss-loader']
const localIdentName = exports.localIdentName = '[name]__[local]___[hash:base64:5]'
const cssModuleSuffix = `&modules&camelCase&importLoaders=1&localIdentName=${localIdentName}`
const [css, postcss] = baseLoaders
const cssModuleLoaders = exports.cssModuleLoaders = [css + cssModuleSuffix, postcss]

const loaderMap = {
  css: '',
  less: 'less-loader',
  sass: 'sass-loader?indentedSyntax',
  scss: 'sass-loader',
  styl: 'stylus-loader',
  stylus: 'stylus-loader'
}
const debug = argv.debug
const debugPrefix = 'hi:webpack:'
const nodeModules = exports.nodeModules = /\bnode_modules\b/

const normalizeExclude = (exclude = []) => {
  return Array.isArray(exclude) ? exclude : [exclude]
}

exports.commonCssLoaders = function (options = {}) {
  options.vue = false

  const exclude = normalizeExclude(options.exclude)
  const loader = []

  for (const key in loaderMap) {
    if (exclude.includes(key)) continue

    const regExp = new RegExp(`\\.${key}$`)
    const value = loaderMap[key]

    loader.push({
      test: regExp,
      loader: generateLoaders(value, baseLoaders, options),
      include: nodeModules
    }, {
      test: regExp,
      loader: generateLoaders(value, cssModuleLoaders, options),
      exclude: nodeModules
    })
  }

  debug && _debug(`${debugPrefix}commonLoaders`)(loader)

  return loader
}

exports.vueCssLoaders = function (options = {}) {
  options.vue = true

  const exclude = normalizeExclude(options.exclude)
  const loader = {}

  for (const key in loaderMap) {
    if (exclude.includes(key)) continue
    loader[key] = generateLoaders(loaderMap[key], baseLoaders, options)
  }

  debug && _debug(`${debugPrefix}vueLoaders`)(loader)

  return loader
}
