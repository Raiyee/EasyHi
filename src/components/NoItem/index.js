import classes from './index.styl'

export default require('./index.pug')({
  props: {
    text: String,
    className: String
  },
  data() {
    return {
      classes
    }
  }
})
