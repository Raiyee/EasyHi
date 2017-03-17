import ModalItem from 'components/HiModal/ModalItem'

import {mapActions} from 'vuex'
import {stringify} from 'qs'

import {alert, REQUIRED_FUNCTION} from 'utils'

import classes from './mobile-modal.styl'

export default require('./mobile-modal.pug')({
  props: {
    confirm: REQUIRED_FUNCTION,
    mobile: {
      type: String,
      validate: mobile => /^\d{11}$/.test(mobile)
    }
  },
  data() {
    return {
      classes,
      captcha: '',
      error: false,
      intervalId: null,
      limit: 0
    }
  },
  created() {
    this.sendCaptcha()
  },
  destroyed() {
    clearInterval(this.intervalId)
  },
  methods: {
    ...mapActions(['setMobile']),
    async sendCaptcha() {
      const {data: {code, data, desc}} = await this.$http.post(`/common/personal-center-info/validate-mobile`,
        stringify({
          newMobile: this.mobile
        }))
      if (+code) {
        this.$modal.close()
        return alert(desc)
      }
      this.limit = data
      this.intervalId = setInterval(() => {
        this.limit ? this.limit-- : clearInterval(this.intervalId)
      }, 1000)
    },
    async confirmModal() {
      const vCaptcha = this.$v.captcha
      vCaptcha.$touch()
      if (vCaptcha.$error) return
      const {data: {code, desc}} = await this.$http.post('/common/personal-center-info/confirm-mobile',
        stringify({
          captcha: this.captcha
        }))
        ;
      (this.error = !!+code) ? alert(desc) : this.confirm()
    }
  },
  components: {
    ModalItem
  },
  validator: {
    captcha: {
      integer: 4
    }
  }
})
