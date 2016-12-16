import {alert, toast, omitObj, resizeImgFile} from 'utils'

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
      const file = e.target.files[0]

      if (!/^image\//i.test(file.type)) return alert('请确保文件为图像类型')

      resizeImgFile(file, result => {
        this.memberPortrait = result
      }, null, 100)
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
