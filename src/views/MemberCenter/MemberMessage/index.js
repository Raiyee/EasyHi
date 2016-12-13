import classes from './index.styl'

export default require('./index.pug')({
  name: 'memberMessage',
  data() {
    return {
      classes,
      ...this.$route.meta.data
    }
  }
})
