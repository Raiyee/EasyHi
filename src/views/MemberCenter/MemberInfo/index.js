import {alert, toast, omitObj} from 'utils'

import classes from './index.styl'

export default require('./index.pug')({
  name: 'member-info',
  data() {
    return {
      classes,
      ...this.$route.meta.data
    }
  },
  methods: {
    changePortrait: function () {
      this.$refs.file.click()
    },
    previewFile: function (e) {
      const self = this
      const file = e.target.files[0]

      if (!/image\/\w+/.test(file.type)) {
        alert(null, '请确保文件为图像类型')
        return
      }

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        self.memberPortrait = this.result
      }
    },
    changeGender: function () {
      this.memberGender = !this.memberGender
    },
    saveMember: function () {
      this.$http.post('/saveMemberDetail', omitObj(this.$data, 'classes'))
        .then(res => {
          toast({
            tipText: res.data,
            close() {
              this.$router.push({
                path: '/member-center'
              })
              this.$modal.close()
            }
          })
        })
    }
  }
})
