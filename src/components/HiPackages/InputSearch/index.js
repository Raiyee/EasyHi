import classes from './index.styl'
import {REQUIRED_STRING} from 'utils'

export default require('./index.pug')({
  data() {
    return {
      classes,
      active: false
    }
  },
  props: {
    text: REQUIRED_STRING
  },
  methods: {
    onClick() {
      this.active = true
      this.$nextTick(function () {
        this.$refs.input.focus()
      })
    },
    onCancel() {
      this.active = false
      this.$emit('onCancel')
    },
    onEnter(e) {
      this.$emit('onEnter', e.currentTarget.value)
    }
  }
})
