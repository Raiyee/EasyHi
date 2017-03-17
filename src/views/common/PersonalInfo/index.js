import {mapGetters} from 'vuex'

import Qrious from 'vue-qrious'

import {alert, toast, illustrate, regionPicker, datePicker,
  isBeforeNow, omit, resizeImgFile} from 'utils'

import classes from './index.styl'

export default require('./index.pug')({
  name: 'personal-info',
  data() {
    return {
      classes,
      showQrCode: false,
      ...this.$route.meta.data
    }
  },
  computed: {
    ...mapGetters(['currRole', 'isStaff', 'hasMerchantRole', 'tcode', 'currentRole'])
  },
  methods: {
    previewFile(e) {
      resizeImgFile(e.target.files[0], result => (this.portrait = result), null, 100)
    },
    pickDate() {
      datePicker({
        confirm: birthday => {
          if (!isBeforeNow(birthday)) return alert('请选择正确的生日!')
          this.birthday = birthday
          this.$modal.close()
        }
      }, this.birthday)
    },
    pickRegion() {
      const self = this
      regionPicker({
        confirm() {
          [self.province, self.city, self.district] = this.result.map(region => region[0])
          self.address = this.result.map(region => region[1]).join(' ')
          self.$modal.close()
        }
      }, [this.province, this.city, this.district])
    },
    toggleQrCode() {
      illustrate({
        tipText: `<div class="${classes.qrcodeContent}"><img src="${this.$refs.qrious.src}"/>` +
        `<div>此二维码可用于邀请好友或上课签到</div></div>`,
        class: classes.qrcode
      })
    },
    async saveInfo() {
      if (!this.name) return alert('请输入用户名!')
      if (this.$v.$invalid) return alert('参数错误!')

      const {data: {code, desc}} = await this.$http.post('/common/personal-center-info/update',
        omit(this.$data, 'classes', 'qrcodeUrl'));

      +code ? alert(desc) : toast({
        tipText: '修改成功！',
        close: () => {
          this.$router.push(`/${this.currRole}-index`)
          this.$modal.close()
        }
      })
    }
  },
  validator: {
    name: {
      maxLength: 12
    },
    profile: {
      maxLength: 50
    }
  },
  components: {
    Qrious
  }
})
