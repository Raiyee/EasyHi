module.exports = {
  root: true,
  parser: 'babel-eslint',
  plugins: [
    'babel',
    'flowtype',
    'standard',
    'vue'
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
    __TEST__: false,
    __TESTING__: false,
    __PAGES__: false,
    __PROD__: false,
    __MOCK__: false,
    BASE_URL: false,
    CONTEXT: false,
    IMG_PATH_PREFIX: false,
    NON_INDEX_REGEX: false,
    OLD_SERVER_PREFIX: false,
    SUCCESS: false,
    ALERT: false,
    CONFIRM: false,
    REDIRECT: false,
    RELOAD: false,
    PROMPT: false,
    REMIND: false
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
    'flowtype/no-types-missing-file-annotation': 0,
    'generator-star-spacing': 2,
    'max-depth': 2,
    'max-len': [
      2,
      120,
      2
    ],
    'max-nested-callbacks': 2,
    'max-params': [2, 5],
    'no-mixed-operators': 0,
    'object-curly-spacing': 0,
    'standard/no-callback-literal': 0,
    'prefer-const': [2, {
      destructuring: 'all'
    }],
    'space-before-function-paren': [
      2,
      {
        anonymous: 'always',
        named: 'never'
      }
    ]
  }
}
