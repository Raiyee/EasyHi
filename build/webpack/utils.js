import ExtractTextPlugin from 'extract-text-webpack-plugin';
import debug from 'debug';

// generate loader string to be used with extract text plugin
function generateLoaders(loaders, options) {
  const sourceLoaders = loaders.map(loader => {
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

const debugPrefix = 'koa:webpack:';

module.exports = {
  commonCssLoaders(options) {
    // should change `baseLoaders` because `vueCssLoaders` will use the original `baseLoaders`
    const baseLoader = Array.from(baseLoaders);
    const loader = [];

    for (const [key, value] of Object.entries(loaders)) {
      loader.push({
        test: new RegExp(`\\.${key}\$`),
        loader: generateLoaders(value ? baseLoader.concat(value) : baseLoader, options),
        include: /node_modules/
      });
    }

    baseLoader[0] += '&camelCase&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]';

    for (let [key, value] of Object.entries(loaders)) {
      loader.push({
        test: new RegExp(`\\.${key}\$`),
        loader: generateLoaders(value ? baseLoader.concat(value) : baseLoader, options),
        exclude: /node_modules/
      });
    }

    debug(`${debugPrefix}commonLoaders`)(loader);

    return loader;
  },
  vueCssLoaders: function (options = {}) {
    options = {...options, ...{vue: true}};
    const baseLoader = Array.from(baseLoaders);
    const loader = {};

    for (const [key, value] of Object.entries(loaders)) {
      loader[key] = generateLoaders(value ? baseLoader.concat(value) : baseLoader, options);
    }

    debug(`${debugPrefix}vueLoaders`)(loader);

    return loader;
  }
};
