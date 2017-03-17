import HiPicker from '../HiPicker'
import HiTab from '../HiTab'
import ModalItem from './ModalItem'

import {error, PICKER_ID} from 'utils'

import classes from './picker-modal.styl'

export default require('./picker-modal.pug')({
  name: 'picker-modal',
  props: ['backdrop', 'close', 'confirm', 'footer', 'pickers', 'pickerChanged', 'pickerDivider',
    'pickerMask', 'pickerTabs', 'pickerTitle', 'tabChanged', 'visibleCount'],
  data() {
    return {classes}
  },
  methods: {
    closePicker() {
      const {picker} = this.$refs
      this.close ? this.close.apply(picker, ...picker.result, arguments) : this.$modal.close(PICKER_ID)
    },
    confirmPicker() {
      const {picker} = this.$refs
      this.confirm ? this.confirm.apply(picker, ...picker.result, arguments)
        : error('you should handle the click event on the confirm btn by yourself!')
    },
    itemChanged() {
      this.pickerChanged && this.pickerChanged.apply(this.$refs.picker, arguments)
    },
    toggleTab() {
      this.tabChanged && this.tabChanged.apply(this.$refs.picker, arguments)
    }
  },
  components: {
    HiPicker,
    HiTab,
    ModalItem
  }
})
