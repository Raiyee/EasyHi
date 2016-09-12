const constantsContext = require.context('./constants', false, /\.js$/)

export default constantsContext.keys().reduce((constants, key) => Object.assign(constants, constantsContext(key)), {})
