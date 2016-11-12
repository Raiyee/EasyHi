import Dynamic from './Dynamic'

let installed = false

const VueDynamic = {
  install(Vue, options) {
    if (installed) return
    installed = true
    Vue.component(options.name || 'Dynamic', Dynamic)
  }
}

window.Vue && window.Vue.use(VueDynamic)

export default VueDynamic
