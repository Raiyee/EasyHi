const HTTP_PREFIX = 'http://'

export default config => {
  const globals = config.globals

  const isPages = globals.__PAGES__

  let oldServerPrefix

  if (!globals.__MOCK__) {
    let imgPathPrefix

    if (isPages) {
      imgPathPrefix = 'd.raiyee.cn/images/'
      oldServerPrefix = 'local.easy-hi.com:8090/yoga-system/'
    } else {
      imgPathPrefix = 'test.img.easy-hi.cn/images/'
      oldServerPrefix = 'test.go.easy-hi.com/yoga-system/'
    }

    globals.IMG_PATH_PREFIX = JSON.stringify(HTTP_PREFIX + imgPathPrefix)
  } else {
    oldServerPrefix = 'test.res.easy-hi.cn/yoga-system-res/'
  }

  globals.OLD_SERVER_PREFIX = JSON.stringify(HTTP_PREFIX + oldServerPrefix)

  return {
    compiler_devtool: 'source-map',
    compiler_hash_type: 'chunkhash',
    compiler_html_minify: true,
    // compiler_public_path: ''
    compiler_public_path: HTTP_PREFIX + `${isPages
      ? config.server_host + ':' + config.server_port : 'test.go.easy-hi.com'}/yoga-vision/`
  }
}
