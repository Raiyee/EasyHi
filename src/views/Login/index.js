import classes from './index.styl'
import yoga from './yoga.png'

import Login from './index.common'

export default {
  ...Login,
  methods: {
    ...Login.methods,
    handleChange(type, e) {
      const target = e.target
      const subValue = this.handleInput(type, e)
      target.value === subValue || (target.value = subValue)
    },
    clearMobile(e) {
      const inputEl = e.currentTarget.previousElementSibling
      inputEl.value = this.loginMobile = null
      inputEl.focus()
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
              <div class={[classes.formGroup, this.mobileError && 'has-error']}>
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
              <div class={[classes.formGroup, this.codeError && 'has-error']}>
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
    )
  }
}
