import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import plugins from './plugins'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: __DEV__,
  modules,
  plugins
})
