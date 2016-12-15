import {toast, alert, closeModal} from 'utils'

export default require('./index.pug')({
  name: 'member-info',
  data() {
    return {
      classes: require('./index.styl'),
      ...this.$route.meta.data
    }
  },
  methods: {
    changePortrait: function () {
      this.$el.querySelector('input[type="file"]').click()
    },
    previewFile: function (e) {
      let $this = this
      let file = e.target.files[0]
      if (!/image\/\w+/.test(file.type)) {
        alert(null, '请确保文件为图像类型')
        return false
      }

      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        $this.memberPortrait = this.result
      }
    },
    changeGender: function () {
      this.memberGender = !this.memberGender
    },
    saveMember: function () {
      let $member = this.$data
      var $this = this
      this.$http.post('/saveMemberDetail', $member)
        .then(function (res) {
          if (res.data.code === '200') {
            toast({
              tipText: res.data.msg,
              close() {
                $this.$router.push({
                  path: '/member-center'
                })
                closeModal()
              }
            })
          } else {
            alert(res.data.msg)
          }
        })
    }
  }
})
