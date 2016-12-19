import Lazy from './lazy'

let installed = false

export default (Vue, options = {}) => {
  if (installed) return Vue.util.warn('you should not install v-lazy twice!')

  installed = true

  const lazy = new Lazy(options)
  const isVueNext = Vue.version.split('.')[0] === '2'

  Vue.prototype.$lazy = lazy

  Vue.directive('lazy', isVueNext ? {
    bind: lazy.add.bind(lazy),
    update: lazy.update.bind(lazy),
    componentUpdated: lazy.lazyLoadHandler.bind(lazy),
    unbind: lazy.remove.bind(lazy)
  } : {
    bind: lazy.lazyLoadHandler.bind(lazy),
    update(newValue, oldValue) {
      Object.assign(this.$refs, this.$els)
      lazy.add(this.el, {
        modifiers: this.modifiers || {},
        arg: this.arg,
        value: newValue,
        oldValue: oldValue
      }, {
        context: this
      })
    },
    unbind() {
      lazy.remove(this.el)
    }
  })
}
