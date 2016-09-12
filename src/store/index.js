import Vue, {util} from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import plugins from './plugins'

Vue.use(Vuex)

const INITIALIZE_STATE = window.__INITIALIZE_STATE__ || {}

__DEV__ || delete window.__INITIALIZE_STATE__

const MODULES = Object.keys(modules)

for (const [key, value] of Object.entries(INITIALIZE_STATE)) {
  if (!MODULES.includes(key)) {
    util.warn(`There is no module named '${key}' in store, it will be ignored and PLEASE check it!`)
    continue
  }
  Object.assign(modules[key].state, value)
}

export default new Vuex.Store({
  strict: __DEV__,
  modules,
  plugins
})
