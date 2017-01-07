import HiLogin from 'components/HiLogin'

export default require('./index.pug')({
  name: 'login',
  methods: {
    confirm() {
      this.$router.replace(this.$route.query.from || '/')
    }
  },
  components: {
    HiLogin
  }
})
