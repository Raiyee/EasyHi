const HTTP_PREFIX = 'http://'

export default config => {
  const globals = config.globals

  const isPages = config.globals.__PAGES__

  if (!globals.__MOCK__) {
    let imgPathPrefix

    if (globals.__PAGES__) {
      imgPathPrefix = 'd.raiyee.cn/images/'
    } else {
      imgPathPrefix = 'test.img.easy-hi.cn/images/'
    }

    globals.IMG_PATH_PREFIX = JSON.stringify(HTTP_PREFIX + imgPathPrefix)
  }

  return {
    compiler_devtool: 'source-map',
    compiler_hash_type: 'chunkhash',
    compiler_html_minify: true,
    // compiler_public_path: ''
    compiler_public_path: HTTP_PREFIX + `${isPages
      ? config.server_host + ':' + config.server_port : 'test.go.easy-hi.com'}/yoga-vision/`
  }
}
