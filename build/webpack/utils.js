import ExtractTextPlugin from 'extract-text-webpack-plugin'
import _debug from 'debug'
import {argv} from 'yargs'

// generate loader string to be used with extract text plugin
export const generateLoaders = (loader, loaders, options = {}) => {
  const sourceLoaders = (loader ? [...loaders, loader] : loaders).map(loader => {
    const hyphen = /\?/.test(loader) ? '&' : '?'
    return loader + (options.sourceMap ? hyphen + 'sourceMap' : '')
  }).join('!')

  const styleLoader = `${options.vue ? 'vue-' : ''}style-loader`

  let extract = options.extract
  return extract ? (extract.extract ? extract : ExtractTextPlugin).extract({
    fallbackLoader: styleLoader,
    loader: sourceLoaders
  }) : [styleLoader, sourceLoaders].join('!')
}

export const baseLoaders = ['css-loader?-minimize', 'postcss-loader']
export const localIdentName = '[name]__[local]___[hash:base64:5]'
const cssModuleSuffix = `&modules&camelCase&importLoaders=2&localIdentName=${localIdentName}`
const [css, postcss] = baseLoaders
export const cssModuleLoaders = [css + cssModuleSuffix, postcss]

const loaderMap = {
  css: '',
  less: 'less-loader',
  sass: 'sass-loader?indentedSyntax',
  scss: 'sass-loader',
  styl: 'stylus-loader',
  stylus: 'stylus-loader'
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

    debug && _debug(`${debugPrefix}commonCssLoaders`)(loader)

    return loader
  },
  vueCssLoaders(options = {}) {
    options.vue = true

    const exclude = normalizeExclude(options.exclude)
    const loader = {}

    for (const [key, value] of Object.entries(loaderMap)) {
      if (exclude.includes(key)) continue
      loader[key] = generateLoaders(value, baseLoaders, options)
    }

    debug && _debug(`${debugPrefix}vueCssLoaders`)(loader)

    return loader
  }
}
