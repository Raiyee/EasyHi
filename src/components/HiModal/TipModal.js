import ModalItem from 'components/HiModal/ModalItem'

import classes from './tip-modal.styl'

export default require('./tip-modal.pug')({
  name: 'prompt',
  props: {
    tipText: String,
    confirm: Function,
    close: Function,
    confirmText: String,
    cancelText: String,
    type: Number,
    timeout: Number,
    transition: [Boolean, String],
    promptText: String,
    placeholder: String
  },
  data() {
    return {
      classes,
      text: this.promptText
    }
  },
  mounted() {
    this.type || setTimeout(() => {
      this.closeModal()
    }, this.timeout || 2000)
  },
  methods: {
    closeModal() {
      this.close ? this.close.apply(this, arguments) : this.$modal.close()
    },
    confirmModal() {
      this.confirm ? this.confirm.apply(this, this.type === 3 ? [this.text, ...arguments] : arguments)
        : this.$util.error('you should handle the click event on the confirm btn by yourself!')
    }
  },
  components: {
    ModalItem
  }
})
