const ALWAYS = {
  expect: 'always',
  error: true
};

const NEVER = {
  expect: 'never',
  error: true
};

module.exports = {
  reporter: 'stylint-stylish',
  reporterOptions: {
    verbose: true
  },
  noImportant: true,
  semicolons: ALWAYS,
  blocks: false,
  brackets: ALWAYS,
  colons: ALWAYS,
  // TODO 将常用颜色均定义为变量值
  // colors: ALWAYS,
  commaSpace: ALWAYS,
  commentSpace: ALWAYS,
  cssLiteral: NEVER,
  customProperties: [],
  depthLimit: false,
  duplicates: true,
  efficient: ALWAYS,
  exclude: [],
  extendPref: false,
  globalDupe: false,
  groupOutputByFile: true,
  indentPref: false,
  leadingZero: NEVER,
  maxErrors: false,
  maxWarnings: false,
  mixed: false,
  mixins: [],
  namingConvention: false,
  namingConventionStrict: false,
  none: NEVER,
  parenSpace: false,
  placeholders: ALWAYS,
  prefixVarsWithDollar: NEVER,
  quotePref: false,
  stackedProperties: NEVER,
  trailingWhitespace: NEVER,
  universal: false,
  valid: true,
  zeroUnits: NEVER,
  zIndexNormalize: false
};
