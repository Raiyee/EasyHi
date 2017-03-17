import {mapGetters, mapActions} from 'vuex'

import {alert, confirm, toast} from 'utils'

import classes from './personal-security.styl'

export default require('./personal-security.pug')({
  data() {
    return {
      classes,
      editing: false,
      newMobile: ''
    }
  },
  computed: {
    ...mapGetters(['mobile', 'hasMerchantRole'])
  },
  deactivated() {
    this.newMobile = ''
    this.editing = false
  },
  methods: {
    ...mapActions(['setMobile', 'resetRole']),
    edit() {
      this.editing = !this.hasMerchantRole
    },
    clearMobile() {
      this.newMobile = ''
      this.$refs.mobile.focus()
    },
    validateMobile() {
      if (this.$v.newMobile.$error) return

      if (this.mobile === this.newMobile) return alert('手机号码与原手机号相同，请重新输入!')

      const {newMobile} = this

      this.$modal.open({
        id: 'mobile-modal',
        options: {
          destroy: true,
          show: true,
          backdrop: true
        },
        props: {
          mobile: newMobile,
          confirm: () => {
            this.setMobile(newMobile)
            this.$modal.close()
            this.editing = false
          }
        },
        component: import('./MobileModal')
      })
    },
    logout() {
      confirm({
        tipText: '确定退出登录?',
        confirm: async() => {
          const {data: {code, desc}} = await this.$http.post('/membercenter/log-out')
          if (+code) return toast(desc)
          this.resetRole()
          this.$router.push('/')
        }
      })
    }
  },
  validator: {
    auto: true,
    rules: {
      newMobile: {
        mobile: true
      }
    }
  }
})
