import Lazy from './lazy'
import LazyComponent from './lazy-component'

export default {
  /**
   * install function
   * @param  {Vue} Vue
   * @param  {object} options  lazyload options
   */
  install(Vue, options = {}) {
    const lazy = new (Lazy(Vue))(options)
    const isVueNext = Vue.version.split('.')[0] === '2'

    Vue.prototype.$lazy = lazy

    if (options.lazyComponent) {
      Vue.component('lazy', LazyComponent(lazy))
    }

    if (isVueNext) {
      Vue.directive('lazy', {
        bind: lazy.add.bind(lazy),
        update: lazy.update.bind(lazy),
        componentUpdated: lazy.lazyLoadHandler.bind(lazy),
        unbind: lazy.remove.bind(lazy)
      })
    } else {
      Vue.directive('lazy', {
        bind: lazy.lazyLoadHandler.bind(lazy),
        update(newValue, oldValue) {
          Object.assign(this.vm.$refs, this.vm.$els)
          lazy.add(this.el, {
            modifiers: this.modifiers || {},
            arg: this.arg,
            value: newValue,
            oldValue: oldValue
          }, {
            context: this.vm
          })
        },
        unbind() {
          lazy.remove(this.el)
        }
      })
    }
  }
}
