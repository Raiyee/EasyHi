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
  env: {
    browser: true
  },
  globals: {
    __DEV__: false
  },
  rules: {
    'babel/generator-star-spacing': 2,
    'eol-last': 2,
    'generator-star-spacing': 0,
    'jsx-quotes': [
      2,
      "prefer-double"
    ],
    'max-depth': 2,
    'max-len': [
      2,
      120,
      2
    ],
    'max-nested-callbacks': 2,
    'max-params': 2,
    semi: [
      2,
      'always'
    ],
    'space-before-function-paren': [
      2,
      {
        anonymous: 'always',
        named: 'never'
      }
    ],
    'object-curly-spacing': 2,
    'array-bracket-spacing': 2,
    'computed-property-spacing': 2
  }
};
