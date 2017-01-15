module.exports = {
  root: true,
  parser: 'babel-eslint',
  plugins: [
    'babel',
    'flowtype',
    'standard'
  ],
  extends: [
    'standard',
    'plugin:flowtype/recommended'
  ],
  env: {
    browser: true
  },
  globals: {
    __DEV__: false,
    __TESTING__: false,
    __PROD__: false,
    __MOCK__: false,
    CONTEXT: false,
    IMG_PATH_PREFIX: false,
    NON_INDEX_REGEX: false
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  rules: {
    'array-bracket-spacing': 2,
    'babel/object-curly-spacing': 2,
    'computed-property-spacing': 2,
    'eol-last': 2,
    'generator-star-spacing': 2,
    'max-depth': 2,
    'max-len': [
      2,
      120,
      2
    ],
    'max-nested-callbacks': 2,
    'max-params': [2, 5],
    'space-before-function-paren': [
      2,
      {
        anonymous: 'always',
        named: 'never'
      }
    ],
    'object-curly-spacing': 0
  }
}
