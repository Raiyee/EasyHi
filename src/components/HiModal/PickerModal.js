import HiPicker from '../HiPicker'
import ModalItem from './ModalItem'

import classes from './picker-modal.styl'

export default require('./picker-modal.pug')({
  props: ['close', 'confirm', 'footer', 'pickers', 'transition', 'visibleCount'],
  data() {
    return {classes}
  },
  components: {
    HiPicker,
    ModalItem
  }
})
