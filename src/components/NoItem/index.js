import classes from './index.styl'

export default require('./index.pug')({
  name: 'no-item',
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
