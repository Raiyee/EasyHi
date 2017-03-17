import {on, off} from 'utils'

export default {
  bind(el, {value}, {context}) {
    const app = context.$root.$el
    const winH = window.innerHeight
    on(app, 'scroll', function (e) {
      const oH = el.clientHeight
      const sTop = app.scrollTop
      if (sTop >= oH - winH) {
        value()
      }
    })
  },
  unbind(el, {value}, {context}) {
    const app = context.$root.$el
    off(app, 'scroll')
  }
}
