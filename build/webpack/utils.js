import ExtractTextPlugin from 'extract-text-webpack-plugin'
import _debug from 'debug'
import {argv} from 'yargs'

// generate loader string to be used with extract text plugin
export const generateLoaders = (loader, loaders, options = {}) => {
  const sourceLoaders = (loader ? [...loaders, loader] : loaders).map(loader => {
    const hyphen = /\?/.test(loader) ? '&' : '?'
    return loader + (options.sourceMap ? hyphen + 'sourceMap' : '')
  }).join('!')

  const styleLoader = `${options.vue ? 'vue-' : ''}style`

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

export const baseLoaders = ['css?-minimize', 'postcss']
export const localIdentName = '[name]__[local]___[hash:base64:5]'
const cssModuleSuffix = `&modules&camelCase&importLoaders=1&localIdentName=${localIdentName}`
const [css, postcss] = baseLoaders
export const cssModuleLoaders = [css + cssModuleSuffix, postcss]

const loaderMap = {
  css: '',
  less: 'less',
  sass: 'sass?indentedSyntax',
  scss: 'sass',
  styl: 'stylus',
  stylus: 'stylus'
}
const debug = argv.debug
const debugPrefix = 'koa:webpack:'
export const nodeModules = /\bnode_modules\b/

const normalizeExclude = (exclude = []) => Array.isArray(exclude) ? exclude : [exclude]

export default {
  commonCssLoaders(options = {}) {
    options.vue = false

    const exclude = normalizeExclude(options.exclude)
    const loader = []

    for (const [key, value] of Object.entries(loaderMap)) {
      if (exclude.includes(key)) continue

      const regExp = new RegExp(`\\.${key}$`)

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
  },
  vueCssLoaders: function (options = {}) {
    options.vue = true

    const exclude = normalizeExclude(options.exclude)
    const loader = {}

    for (const [key, value] of Object.entries(loaderMap)) {
      if (exclude.includes(key)) continue
      loader[key] = generateLoaders(value, baseLoaders, options)
    }

    debug && _debug(`${debugPrefix}vueLoaders`)(loader)

    return loader
  }
}
