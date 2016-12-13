import classes from './index.styl'

export default require('./index.pug')({
  name: 'hi-progress',
  props: {
    className: {
      type: String,
      default: ''
    },
    progress: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      classes
    }
  }
})
