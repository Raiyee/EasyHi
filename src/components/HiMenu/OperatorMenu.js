import classes from './operator-menu.styl'

export default require('./operator-menu.pug')({
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
