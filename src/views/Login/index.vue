<template>
  <div class="container">
    <div class="center-block img-circle" :class="$style.yoga">
      <img class="img-circle" src="./yoga.png" alt="瑜伽"/>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-sm-push-3 col-lg-4 col-lg-push-4">
        <form @submit.prevent="submit">
          <div :class="[$style.formGroup, this.mobileError && 'has-error']">
            <div class="input-group">
                <span class="input-group-addon">
                  <span class="glyphicon glyphicon-phone"/>
                </span>
              <input type="number" class="form-control" placeholder="请输入手机号"
                     @input="handleInput('mobile', $event)" v-model="loginMobile" ref="mobile"/>
              <span v-if="loginMobile" class="input-group-addon" @click="clearMobile">
                <span class="glyphicon glyphicon-remove-sign"/>
              </span>
            </div>
            <p v-if="mobileError" class="form-control-static">请输入正确的手机号码</p>
          </div>
          <div :class="[$style.formGroup, this.codeError && 'has-error']">
            <div class="input-group">
              <span class="input-group-addon">
                <span class="glyphicon glyphicon-lock"/>
              </span>
              <input type="number" class="form-control" placeholder="请输入验证码"
                     @input="handleInput('verificationCode', $event)" v-model="verificationCode"/>
              <span class="input-group-addon theme-color"
                    @click="getVerificationCode">
                {{this.limit ? this.limit + 's' : '获取验证码'}}
              </span>
            </div>
            <p v-if="codeError" class="form-control-static">请输入正确的验证码</p>
          </div>
          <button type="submit" class="btn btn-theme-primary btn-block btn-hg">登 录</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'

  const mobileRegExp = /^1[35789]\d{9}$/
  const codeRegExp = /[\d]{6}/

  export default {
    name: 'login',
    data() {
      return {
        limit: 0,
        loginMobile: null,
        verificationCode: null,
        mobileError: false,
        codeError: false,
        submitClicked: false
      }
    },
    created() {
      this.loginMobile = this.mobile
    },
    computed: {
      ...mapGetters(['mobile'])
    },
    methods: {
      ...mapActions(['setEnv', 'resetRole']),
      clearMobile() {
        this.loginMobile = null
        this.$refs.mobile.focus()
      },
      handleInput(type, e) {
        const value = e.target.value
        const submitClicked = this.submitClicked
        let subValue

        switch (type) {
          case ('mobile'):
            subValue = this.loginMobile = value.substr(0, 11)
            this.mobileError = submitClicked && !mobileRegExp.test(subValue)
            break
          case ('verificationCode'):
            subValue = this.verificationCode = value.substr(0, 6)
            this.codeError = submitClicked && !codeRegExp.test(subValue)
            break
        }

        return subValue
      },
      getVerificationCode() {
        if (this.limit) return

        const mobile = this.loginMobile

        if (!mobileRegExp.test(mobile)) return (this.mobileError = true)

        this.$http.get('/getVerificationCode', {mobile}).then(({data}) => {
          this.limit = data
          const intervalId = setInterval(() => {
            --this.limit || clearInterval(intervalId)
          }, 1000)
        })
      },
      submit() {
        this.submitClicked = true
        const mobile = this.loginMobile
        const mobileError = this.mobileError = !mobileRegExp.test(mobile)
        const verificationCode = this.verificationCode
        const codeError = this.codeError = !codeRegExp.test(verificationCode)
        if (mobileError || codeError) return
        this.$http.get('/verifyCode', {verificationCode, mobile}).then(({data}) => {
          const {error} = data
          if (error) return alert(error)
          this.setEnv({mobile, authorized: true})
          this.resetRole(data)
          this.$router.replace(this.$route.query.from || '/')
        })
      }
    }
  }
</script>
<style src="./index.styl" module/>
