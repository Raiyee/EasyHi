import HiVoucher from 'components/HiVoucher'

export default require('./index.pug')({
  name: 'voucher-test',
  data() {
    return {
      vouchers: this.$route.meta.data
    }
  },
  components: {
    HiVoucher
  }
})
