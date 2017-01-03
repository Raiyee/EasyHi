const modulesContext = require.context('.', false, NON_INDEX_REGEX)

export default {
  mode: 'history',
  routes: modulesContext.keys().reduce((modules, key) => modules.concat(modulesContext(key)), [])
}
