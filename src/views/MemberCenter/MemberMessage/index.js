export default {
  ...require('./index.pug'),
  name: 'memberMessage',
  data() {
    return {
      classes: require('./index.styl'),
      ...this.$route.meta.data
    }
  }
}
