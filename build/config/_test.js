export default config => ({
  compiler_devtool: 'source-map',
  compiler_public_path: `http://${config.server_host || 'localhost'}:${config.server_port}/`
});
