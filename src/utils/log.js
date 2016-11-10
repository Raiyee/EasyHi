const EMPTY_FUNC = () => {}

// eslint-disable-next-line no-return-assign
['error', 'log', 'warn'].forEach(log => module.exports[log] = __DEV__ ? console[log] : EMPTY_FUNC)
