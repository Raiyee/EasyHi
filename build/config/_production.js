const HTTPS_PREFIX = 'https://'

export default config => {
  const globals = config.globals

  if (!globals.__MOCK__) {
    globals.IMG_PATH_PREFIX = JSON.stringify(process.env.IMG_PATH_PREFIX || HTTPS_PREFIX + 'res1.easy-hi.cn/images')
  }

  return {
    compiler_devtool: false,
    compiler_hash_type: 'chunkhash',
    compiler_html_minify: true,
    compiler_public_path: process.env.PUBLIC_PATH || HTTPS_PREFIX + 'app.easy-hi.com/yoga-vision'
  }
}
