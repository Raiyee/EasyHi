['error', 'log', 'warn'].forEach(type => {
  module.exports[type] = text => __PROD__ || typeof console === 'undefined' || console[type](text)
})
