import classes from './index.styl'

export default {
  ...require('./index.pug'),
  name: 'memberCenterIndex',
  data() {
    return Object.assign({}, this.$route.meta.data, {classes})
  },
  methods: {
    memberMessage: function () {
      this.$router.push('/member-message')
    }
  }
}
