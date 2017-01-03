const modulesContext = require.context('.', false, NON_INDEX_REGEX)

const utils = modulesContext.keys().reduce((modules, key) => Object.assign(modules, modulesContext(key)), {})

// TODO 暂时将 utils 添加到 window 对象中
window.utils = utils

export default utils
