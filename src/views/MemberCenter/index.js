import classes from './index.styl'

export default {
  ...require('./index.pug'),
  name: 'member-center',
  data() {
    return Object.assign({}, this.$route.meta.data, {classes})
  }
}
