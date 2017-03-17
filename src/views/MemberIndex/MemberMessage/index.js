import classes from './index.styl'

export default require('./index.pug')({
  name: 'member-message',
  data() {
    return {
      classes,
      ...this.$route.meta.data
    }
  }
})
