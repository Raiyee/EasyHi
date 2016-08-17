import ExtractTextPlugin from 'extract-text-webpack-plugin';
import _debug from 'debug';
import {argv} from 'yargs';

// generate loader string to be used with extract text plugin
function generateLoaders(loader, loaders, options) {
  const sourceLoaders = (loader ? loaders.concat(loader) : loaders).map(loader => {
    const hyphen = /\?/.test(loader) ? '&' : '?';
    return loader + (options.sourceMap ? hyphen + 'sourceMap' : '');
  }).join('!');

  const styleLoader = `${options.vue ? 'vue-' : ''}style`;

  if (options.extract) {
    return ExtractTextPlugin.extract({
      fallbackLoader: styleLoader,
      loader: sourceLoaders
    });
  } else {
    return [styleLoader, sourceLoaders].join('!');
  }
}

const baseLoaders = ['css?-minimize', 'postcss'];
const loaders = {
  css: '',
  less: 'less',
  sass: 'sass?indentedSyntax',
  scss: 'sass',
  styl: 'stylus',
  stylus: 'stylus'
};

const debug = argv.debug;
const debugPrefix = 'koa:webpack:';

module.exports = {
  commonCssLoaders(options) {
    const [first, rest] = baseLoaders;
    // should not change `baseLoaders` because `vueCssLoaders` will use the original `baseLoaders` too
    // eslint-disable-next-line max-len
    const baseLoader = [`${first}&camelCase&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]`].concat(rest);
    const nodeModules = /node_modules/;
    const loader = [];

    for (const [key, value] of Object.entries(loaders)) {
      const regExp = new RegExp(`\\.${key}\$`);

      loader.push({
        test: regExp,
        loader: generateLoaders(value, baseLoaders, options),
        include: nodeModules
      }, {
        test: regExp,
        loader: generateLoaders(value, baseLoader, options),
        exclude: nodeModules
      });
    }

    debug && _debug(`${debugPrefix}commonLoaders`)(loader);

    return loader;
  },
  vueCssLoaders: function (options = {}) {
    options = {...options, ...{vue: true}};
    const loader = {};

    for (const [key, value] of Object.entries(loaders)) {
      loader[key] = generateLoaders(value, baseLoaders, options);
    }

    debug && _debug(`${debugPrefix}vueLoaders`)(loader);

    return loader;
  }
};
