['error', 'log', 'warn'].forEach(type => (module.exports[type] = () => __DEV__ && console && console[type]))
