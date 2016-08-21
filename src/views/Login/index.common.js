import {mapGetters, mapActions} from 'vuex';

export const mobileRegExp = /^1[35789]\d{9}$/;
export const codeRegExp = /[\d]{6}/;

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
  }
};
