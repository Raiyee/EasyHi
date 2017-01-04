import Login from 'components/HiLogin'

export default {
  template: '<Login confirmName="登录" :confirmBehavior="confirmBehavior"></Login>',
  methods: {
    confirmBehavior() {
      this.$router.replace(this.$route.query.from || '/')
    }
  },
  components: {
    Login
  }
}
