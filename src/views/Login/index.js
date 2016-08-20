import classes from './index.styl';
import yoga from './yoga.png';

export default {
  methods: {
    submit(e) {
      e.preventDefault();
    }
  },
  render(h) {
    return (
      <div class="container">
        <div class={['center-block img-circle', classes.yoga]}>
          <img class="img-circle" src={yoga} alt="瑜伽"/>
        </div>
        <form on-submit={this.submit}>
          <div class="form-group">
            <div class="input-group">
            <span class="input-group-addon">
              <span class="glyphicon glyphicon-phone"/>
            </span>
              <input type="number" class="form-control" placeholder="请输入手机号"/>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
            <span class="input-group-addon">
              <span class="glyphicon glyphicon-lock"/>
            </span>
              <input type="password" class="form-control" placeholder="请输入验证码"/>
              <span class="input-group-addon theme-color">获取验证码</span>
            </div>
          </div>
          <button type="submit" class="btn btn-default center-block">Submit</button>
        </form>
      </div>
    );
  }
};
