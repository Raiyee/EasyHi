const argv = require('yargs').argv;

module.exports = {
  root: true,
  parser: 'babel-eslint',
  plugins: [
    'standard',
    'babel',
    `vue${argv.fix ? 'fix' : ''}`
  ],
  extends: [
    'standard'
  ],
  globals: {
    __DEV__: false,
    history: false,
    localStorage: false
  },
  rules: {
    'generator-star-spacing': 0,
    semi: [
      2,
      'always'
    ]
  }
};
