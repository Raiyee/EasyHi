const EMPTY_FUNC = () => {}

['error', 'log', 'warn'].forEach(log => module.exports[log] = __PROD__ ? EMPTY_FUNC : console[log])
