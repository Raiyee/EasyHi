import HiPicker from '../HiPicker'
import ModalItem from './ModalItem'

import {error} from 'utils'

import classes from './picker-modal.styl'

export default require('./picker-modal.pug')({
  props: ['close', 'confirm', 'footer', 'pickers', 'transition', 'visibleCount'],
  data() {
    return {classes}
  },
  methods: {
    closePicker() {
      this.close ? this.close() : this.$modal.close()
    },
    confirmPicker() {
      console.log(this.$refs.picker)

      this.confirm ? this.confirm() : error('you should handle the click event on the confirm btn by yourself!')
    }
  },
  components: {
    HiPicker,
    ModalItem
  }
})
