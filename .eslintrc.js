module.exports = {
  root: true,
  plugins: [
    'flowtype'
  ],
  extends: ['1stg/vue', 'plugin:flowtype/recommended'],
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
  rules: {
    'no-mixed-operators': 0,
    'flowtype/no-types-missing-file-annotation': 0
  }
}
