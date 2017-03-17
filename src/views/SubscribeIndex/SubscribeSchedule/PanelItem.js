import classes from './panel-item.styl'

export default require('./panel-item.pug')({
  data() {
    const checked = this.isChecked()
    return {
      classes,
      checked
    }
  },
  props: {
    item: Object,
    checkedItem: Object,
    itemType: String,
    beHide: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isCard() {
      return this.itemType === 'card'
    }
  },
  watch: {
    checkedItem() {
      this.checked = this.isChecked()
    }
  },
  methods: {
    check() {
      if (this.beHide) return
      this.checked = !this.checked
      this.$emit('select', this.item, this.itemType, this.checked)
    },
    isChecked() {
      return this.itemType === 'card' ? ((this.checkedItem && this.checkedItem.mbrCardId) === this.item.mbrCardId)
        : (this.item.expvoucherInstId === (this.checkedItem && this.checkedItem.expvoucherInstId))
    }
  }
})
