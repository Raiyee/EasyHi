import classes from './index.styl'
import {confirm, toast} from 'utils'
import {mapGetters} from 'vuex'

export default require('./index.pug')({
  name: 'voucher-detail',
  data() {
    const {meta: {data}, params: {voucherId}} = this.$route
    return {
      ...data,
      classes,
      voucherId
    }
  },
  computed: {
    ...mapGetters(['merchantName'])
  },
  methods: {
    deleteVoucher() {
      confirm({
        tipText: '确认删除此券',
        confirm: async () => {
          await this.$http(`/${this.miniConsume
            ? 'cash-coupon/delete-coupon' : 'expVoucher/delete-expvoucher-template'}/${this.voucherId}`)
          this.$router.replace(`/${this.miniConsume ? 'cash' : 'exp'}-voucher`)
        }
      })
    },
    async presentVoucher() {
      const {users, highlightUsers} = this.usersData ||
      (this.usersData = (await this.$http('/cash-coupon/get-coupon-users')).data)
      const self = this
      this.$modal.open({
        id: 'users-modal',
        component: import('components/HiSelector/UserSelector'),
        options: {
          destroy: true,
          show: true
        },
        props: {
          headerText: '请选择会员/访客',
          highlightText: '两周内到期会员',
          single: false,
          highlightUsers,
          users,
          icons: [{
            condition: 'hasCashVoucher',
            iconClass: 'icon-cash-voucher2'
          }, {
            condition: 'isVisitor',
            iconClass: 'icon-visitor'
          }],
          async confirm() {
            const {selected} = this
            const presentedNum = selected.length
            if (!presentedNum) return toast('选择不能为空')

            await this.$http.post('/cash-coupon/give-cash-coupon', {
              users: selected,
              voucherId: self.voucherId
            })

            this.$modal.close()
            toast('赠送成功!')

            self.presentedNum += presentedNum
          }
        }
      })
    }
  }
})
