import {mapGetters, mapActions} from 'vuex';

export const mobileRegExp = /^1[35789]\d{9}$/;
export const codeRegExp = /[\d]{6}/;

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
    handleInput(type, e) {
      const value = e.target.value;
      const submitClicked = this.submitClicked;
      let subValue;

      switch (type) {
        case ('mobile'):
          subValue = this.loginMobile = value.substr(0, 11);
          this.mobileError = submitClicked && !mobileRegExp.test(subValue);
          break;
        case ('verificationCode'):
          subValue = this.verificationCode = value.substr(0, 6);
          this.codeError = submitClicked && !codeRegExp.test(subValue);
          break;
      }

      return subValue;
    },
    getVerificationCode() {
      if (this.limit) return;

      const mobile = this.loginMobile;

      if (!mobileRegExp.test(mobile)) return (this.mobileError = true);

      this.$http.get('/getVerificationCode', {body: {mobile}}).then(res => {
        this.limit = res.json();
        const intervalId = setInterval(() => {
          --this.limit || clearInterval(intervalId);
        }, 1000);
      });
    },
    submit(e) {
      e.preventDefault();
      this.submitClicked = true;
      const mobile = this.loginMobile;
      const mobileError = this.mobileError = !mobileRegExp.test(mobile);
      const verificationCode = this.verificationCode;
      const codeError = this.codeError = !codeRegExp.test(verificationCode);
      if (mobileError || codeError) return;
      this.$http.get('/verifyCode', {body: {verificationCode, mobile}}).then(res => {
        const error = res.json().error;
        if (error) return alert(error);
        this.setEnv({mobile, authorized: true});
        this.$router.replace(this.$route.query.from || '/');
      });
    }
  }
};
