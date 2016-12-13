export default require('./index.pug')({
  props: {
    text: String,
    className: String
  },
  data() {
    return {
      classes: require('./index.styl')
    }
  }
})
