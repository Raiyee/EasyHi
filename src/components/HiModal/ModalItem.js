import {isBlankStr, warn, error} from 'utils'
import classes from './modal-item.styl'

export default require('./modal-item.pug')({
  name: 'modal-item',
  props: {
    id: [Number, String],
    header: [Boolean, String],
    footer: Boolean,
    transition: [Boolean, String],
    close: Function,
    confirm: Function,
    confirmText: String,
    cancelText: String
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
      this.confirm ? this.confirm(...arguments)
        : error('you should handle the click event on the confirm btn by yourself!')
    }
  }
})
