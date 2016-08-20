import {mapActions} from 'vuex';

import classes from './index.styl';
import yoga from './yoga.png';

const mobileRegExp = /^1[35789]\d{9}$/;
const codeRegExp = /[\d]{6}/;

export default {
  data() {
    return {
      limit: 0,
      mobile: null,
      verificationCode: null,
      mobileError: false,
      codeError: false,
      submitClicked: false
    };
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
      let value = target.value;
      // this[type] = target.value;
      switch (type) {
        case ('mobile'):
          value = target.value = this.mobile = value.substr(0, 11);
          this.mobileError = this.submitClicked && !mobileRegExp.test(value);
          break;
        case ('verificationCode'):
          value = target.value = this.verificationCode = value.substr(0, 6);
          this.codeError = this.submitClicked && !codeRegExp.test(value);
          break;
      }
    },
    clearMobile(e) {
      const inputEl = e.currentTarget.previousElementSibling;
      inputEl.value = this.mobile = null;
      inputEl.focus();
    },
    submit(e) {
      e.preventDefault();
      console.log(this.mobile, this.verificationCode);
      this.submitClicked = true;
      this.mobileError = !mobileRegExp.test(this.mobile);
      this.codeError = !codeRegExp.test(this.verificationCode);
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
                  <input type="number" class="form-control" maxlength="11" placeholder="请输入手机号"
                         on-input={this.handleChange.bind(this, 'mobile')} value={this.mobile}/>
                  {this.mobile ? (<span class="input-group-addon" on-click={this.clearMobile}>
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
                  <input type="number" class="form-control" maxlength="6" placeholder="请输入验证码"
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
