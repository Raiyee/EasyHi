import createLogger from 'vuex/logger'

const plugins = [
  store => {
    // 实现进度条、错误提示
    store.subscribe(({meta = {}, payload}) => {
      switch (meta.promise) {
        case 'pending':
          store.dispatch('setProgress', 60)
          break
        case 'success':
          store.dispatch('setProgress', 100)
          break
        case 'error':
          store.dispatch('setProgress', 100)
          store.dispatch('addToast', payload)
          break
        default:
        // setProgress(0)
      }
    })
  }
]

if (__DEV__) {
  plugins.unshift(createLogger())
}

export default plugins
