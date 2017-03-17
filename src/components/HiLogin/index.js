import {mapGetters, mapActions} from 'vuex'

import {alert} from 'utils'

import classes from './index.styl'

import qs from 'qs'

export default require('./index.pug')({
  name: 'hi-login',
  props: {
    confirmText: {
      type: String,
      default: '登录'
    },
    confirm: Function,
    inviter: null
  },
  data() {
    return {
      classes,
      limit: 0,
      imgCaptcha: null,
      captchaSrc: null,
      loginMobile: '',
      captcha: '',
      showImgCaptcha: false
    }
  },
  computed: {
    ...mapGetters(['mobile', 'tcode', 'merchantLogo'])
  },
  created() {
    this.loginMobile = this.mobile
  },
  methods: {
    ...mapActions(['setEnv', 'resetRole']),
    getImgCaptcha() {
      const url = `/get-captcha?t=${+new Date()}`
      if (__MOCK__) {
        this.$http.post(url)
          .then(({data: captchaSrc}) => {
            this.captchaSrc = captchaSrc
          })
      } else {
        this.captchaSrc = BASE_URL + url
      }
    },
    clearMobile() {
      this.loginMobile = null
      this.$refs.mobile.focus()
    },
    getVerificationCode() {
      const {loginMobile, imgCaptcha} = this.$v

      loginMobile.$touch()

      if (this.limit || loginMobile.$error || imgCaptcha.$error) return

      this.$http.post(`/send-authc-captcha/${this.loginMobile}`, null, {
        headers: {
          'Submit-Captcha': this.imgCaptcha
        }
      }).then(({data}) => {
        const limit = +data

        this.getImgCaptcha()

        if (limit === -1) return alert('操作太频繁，休息一下吧！')

        this.limit = limit
        const intervalId = setInterval(() => {
          --this.limit || clearInterval(intervalId)
        }, 1000)
      }).catch(({status}) => {
        if (status !== 402) return
        this.getImgCaptcha()
        this.showImgCaptcha = true
      })
    },
    submit() {
      const vMobile = this.$v.loginMobile
      const vCode = this.$v.captcha

      vMobile.$touch()
      vCode.$touch()

      if (vMobile.$error || vCode.$error) return

      const mobile = this.loginMobile

      this.$http.post('/login', qs.stringify({
        loginType: 'captcha',
        username: mobile,
        password: this.captcha,
        inviter: this.inviter
      })).then(({data}) => {
        const {code} = data
        if (code !== 'success') return alert('手机号/验证码错误')

        __MOCK__ && require('utils/json').setItems({mobile})

        this.$http.post('/center/' + this.tcode + '/initialize/get-base-data')
          .then(({data}) => {
            this.resetRole(Object.assign({mobile}, data))
            this.confirm && this.confirm()
          })
      })
    }
  },
  validator: {
    loginMobile: {
      mobile: true
    },
    captcha: {
      integer: [4, false]
    },
    imgCaptcha: {
      length: 4
    }
  }
})
