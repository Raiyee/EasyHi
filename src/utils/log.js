const hasConsole = __DEV__ && typeof console !== 'undefined';

['error', 'log', 'warn'].forEach(type => (module.exports[type] = text => hasConsole && console[type](text)))
