module.exports = config => ({
  compilerDevTool: 'source-map',
  compilerHtmlMinify: true,
  // compilerPublicPath: '/dist/'
  compilerPublicPath: `http://${config.serverHost || 'localhost'}:${config.serverPort}/`
})
