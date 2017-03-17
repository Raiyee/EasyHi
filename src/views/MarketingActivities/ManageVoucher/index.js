import {mapGetters} from 'vuex'

import HiTab from 'components/HiTab'
import HiVoucher from 'components/HiVoucher'

import {toast, replaceRoute} from 'utils'

import classes from './index.styl'

const MODAL_ID = 'create-voucher'

const TYPES = ['exp', 'cash']

export default require('./index.pug')({
  data() {
    const {meta: {data: {presentedNum, vouchers}}, params: {type}} = this.$route
    const typeIndex = TYPES.indexOf(type)
    const allVouchers = []
    allVouchers[typeIndex] = vouchers || []
    return {
      classes,
      presentedNum,
      allVouchers,
      typeIndex
    }
  },
  computed: {
    ...mapGetters(['isAdmin']),
    typeText() {
      return (this.typeIndex ? '现金' : '体验') + '券'
    }
  },
  methods: {
    async toggleTab(index) {
      const type = TYPES[index]
      if (!this.allVouchers[index]) {
        this.allVouchers[index] = (await this.$http.get(index ? '/cash-coupon/coupon-data' : '/experience/exp-data',
            {type})).data.vouchers || []
      }
      this.typeIndex = index
      replaceRoute(`/${type}-voucher`)
    },
    async createVoucher() {
      const {typeIndex} = this

      let courses

      if (!typeIndex) {
        courses = (await this.$http.post('/expVoucher/query-course-list')).data
      }

      this.$modal.open({
        id: MODAL_ID,
        component: import('./CreateVoucher'),
        options: {
          show: true,
          destroy: true
        },
        props: {
          courses,
          typeIndex,
          confirm: voucher => {
            this.allVouchers[typeIndex].unshift(voucher)
            this.$modal.close(MODAL_ID, true)
          }
        }
      })
    },
    async presentVoucher(voucherId, index) {
      const self = this
      const {users, highlightUsers} = this.usersData ||
      (this.usersData = (await this.$http('/cash-coupon/get-coupon-users')).data)
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
              voucherId: voucherId
            })
            this.$modal.close()
            toast('赠送成功!')
            self.vouchers[index].presentedNum += presentedNum
            self.presentedNum += presentedNum
          }
        }
      })
    }
  },
  components: {
    HiTab,
    HiVoucher
  }
})
