// We use an explicit public path when the assets are served by webpack
// to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
module.exports =  config => ({
  compilerDevTool: 'eval',
  // compilerPublicPath: '/dist/'
  compilerPublicPath: `http://${config.serverHost || 'localhost'}:${config.serverPort}/dist/`
})
