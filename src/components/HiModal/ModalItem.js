import {isBlankStr, warn, error} from 'utils'
import classes from './modal-item.styl'

export default require('./modal-item.pug')({
  name: 'modal-item',
  props: {
    id: [Number, String],
    header: [Boolean, String],
    disabled: Boolean,
    footer: Boolean,
    border: {
      type: Boolean,
      default: true
    },
    full: Boolean,
    transition: [Boolean, String],
    close: Function,
    confirm: Function,
    confirmText: String,
    cancelText: String,
    beforeEnter: Function,
    afterEnter: Function,
    enterCancelled: Function,
    beforeLeave: Function,
    afterLeave: Function,
    leaveCancelled: Function
  },
  data: () => ({classes}),
  computed: {
    label() {
      const header = this.header
      return isBlankStr(header) ? '&nbsp;' : header
    }
  },
  methods: {
    closeModal() {
      this.close ? this.close(...arguments)
        : this.$modal.close(this.id || warn('there is no modal id found, then the current modal will be close!'))
    },
    confirmModal() {
      if (this.footer && this.disabled) return
      this.confirm ? this.confirm(...arguments)
        : error('you should handle the click event on the confirm btn by yourself!')
    }
  }
})
