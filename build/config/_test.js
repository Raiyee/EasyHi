export default config => ({
  compiler_devtool: 'source-map',
  compiler_hash_type: 'chunkhash',
  compiler_html_minify: true,
  compiler_public_path: ''
  // compiler_public_path: `http://${config.server_host || 'localhost'}:${config.server_port}/`
})
