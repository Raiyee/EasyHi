import classes from './index.styl'

export default require('./index.pug')({
  data() {
    return {
      classes,
      active: false
    }
  },
  methods: {
    toggleActive() {
      this.active = !this.active
    },
    updateItem() {
      this.$emit('updateItem')
    },
    deleteItem() {
      this.$emit('deleteItem')
    }
  }
})
