import HiLogin from 'components/HiLogin'

export default {
  name: 'login',
  render() {
    return <HiLogin confirm={() => this.$router.replace(this.$route.query.from || '/')}/>
  }
}
