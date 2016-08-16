import ExtractTextPlugin from 'extract-text-webpack-plugin';

// generate loader string to be used with extract text plugin
function generateLoaders (loaders, options) {
  const sourceLoaders = loaders.map(function (loader) {
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
  stylus: 'stylus'
};

module.exports = {
  styleLoaders (options) {
    const [...baseLoader] = baseLoaders;
    const loader = [];

    Object.keys(loaders).forEach(key => {
      let value = loaders[key];

      loader.push({
        test: new RegExp(`\\.${key}\$`),
        loader: generateLoaders(value ? baseLoader.concat(value) : baseLoader, options),
        include: /node_modules/
      });
    });

    baseLoader[0] += '&camelCase&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]';

    Object.keys(loaders).forEach(key => {
      let value = loaders[key];

      loader.push({
        test: new RegExp(`\\.${key}\$`),
        loader: generateLoaders(value ? baseLoader.concat(value) : baseLoader, options),
        exclude: /node_modules/
      });
    });

    return loader;
  },
  cssLoaders: function (options = {}) {
    const [...baseLoader] = baseLoaders;
    const loader = {};

    Object.keys(loaders).forEach(key => {
      let value = loaders[key];
      loader[key] = generateLoaders(value ? baseLoader.concat(value) : baseLoader, options);
    });

    return loader;
  }
};
