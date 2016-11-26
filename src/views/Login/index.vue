<template>
  <div class="container">
    <div class="center-block img-circle" :class="$style.yoga">
      <img class="img-circle" src="./yoga.png" alt="瑜伽"/>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-sm-push-3 col-lg-4 col-lg-push-4">
        <form @submit="submit">
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
  import Login from './index.common'

  export default {
    extends: Login,
    methods: {
      clearMobile() {
        this.loginMobile = null
        this.$refs.mobile.focus()
      }
    }
  }
</script>
<style src="./index.styl" module/>
