['error', 'log', 'warn'].forEach(type => {
  // eslint-disable-next-line no-console
  module.exports[type] = (...args) => __PROD__ || typeof console === 'undefined' || console[type](...args)
})
