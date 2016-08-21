import {mapGetters, mapActions} from 'vuex';

import classes from './index.styl';
import yoga from './yoga.png';

const mobileRegExp = /^1[35789]\d{9}$/;
const codeRegExp = /[\d]{6}/;

export default {
  data() {
    return {
      limit: 0,
      loginMobile: null,
      verificationCode: null,
      mobileError: false,
      codeError: false,
      submitClicked: false
    };
  },
  created() {
    this.loginMobile = this.mobile;
  },
  computed: {
    ...mapGetters(['mobile'])
  },
  methods: {
    ...mapActions(['setEnv']),
    getVerificationCode() {
      if (this.limit) return;
      this.limit = 60;
      const intervalId = setInterval(() => {
        --this.limit || clearInterval(intervalId);
      }, 1000);
    },
    handleChange(type, e) {
      const target = e.target;
      const value = target.value;
      const submitClicked = this.submitClicked;
      let subValue;

      switch (type) {
        case ('mobile'):
          subValue = this.loginMobile = value.substr(0, 11);
          this.mobileError = submitClicked && !mobileRegExp.test(value);
          break;
        case ('verificationCode'):
          subValue = this.verificationCode = value.substr(0, 6);
          this.codeError = submitClicked && !codeRegExp.test(value);
          break;
      }

      value === subValue || (target.value = subValue);
    },
    clearMobile(e) {
      const inputEl = e.currentTarget.previousElementSibling;
      inputEl.value = this.loginMobile = null;
      inputEl.focus();
    },
    submit(e) {
      e.preventDefault();
      this.submitClicked = true;
      const mobile = this.loginMobile;
      const mobileError = this.mobileError = !mobileRegExp.test(mobile);
      const verificationCode = this.verificationCode;
      const codeError = this.codeError = !codeRegExp.test(verificationCode);
      if (mobileError || codeError) return;
      this.$http.get('/verifyCode', {body: {verificationCode}}).then(res => {
        const error = res.json().error;
        if (error) return alert(error);
        this.setEnv({mobile, authorized: true});
        this.$router.replace({name: this.$route.query.from || 'home'});
      });
    }
  },
  render(h) {
    return (
      <div class="container">
        <div class={['center-block img-circle', classes.yoga]}>
          <img class="img-circle" src={yoga} alt="瑜伽"/>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-6 col-sm-push-3 col-lg-4 col-lg-push-4">
            <form on-submit={this.submit}>
              <div class={['form-group', classes.formGroup, this.mobileError ? 'has-error' : '']}>
                <div class="input-group">
                  <span class="input-group-addon">
                    <span class="glyphicon glyphicon-phone"/>
                  </span>
                  <input type="number" class="form-control" placeholder="请输入手机号"
                         on-input={this.handleChange.bind(this, 'mobile')} value={this.loginMobile}/>
                  {this.loginMobile ? (<span class="input-group-addon" on-click={this.clearMobile}>
                      <span class="glyphicon glyphicon-remove-sign"/>
                    </span>) : ''}
                </div>
                {this.mobileError ? <p class="form-control-static">请输入正确的手机号码</p> : ''}
              </div>
              <div class={['form-group', classes.formGroup, this.codeError ? 'has-error' : '']}>
                <div class="input-group">
                  <span class="input-group-addon">
                    <span class="glyphicon glyphicon-lock"/>
                  </span>
                  <input type="number" class="form-control" placeholder="请输入验证码"
                         on-input={this.handleChange.bind(this, 'verificationCode')} value={this.verificationCode}/>
                  <span class="input-group-addon theme-color"
                        on-click={this.getVerificationCode}>{this.limit ? this.limit + 's' : '获取验证码'}</span>
                </div>
                {this.codeError ? <p class="form-control-static">请输入正确的验证码</p> : ''}
              </div>
              <button type="submit" class="btn btn-primary btn-responsive center-block">登 录</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};
