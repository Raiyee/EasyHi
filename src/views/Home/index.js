import {mapGetters} from 'vuex'

import EditPanel from './EditPanel'

import classes from './index.styl'

import {ensure, removeClass, cutByteStr} from 'utils'

const DEFAULT_SLOGAN_TITLE = '遇见瑜伽'

const DEFAULT_SLOGAN_CONTENT = '当心得到控制，平静下来时，剩下的便是灵魂'

export default require('./index.pug')({
  name: 'home',
  data: () => ({
    classes,
    editing: false,
    show: true,
    sloganTitle: DEFAULT_SLOGAN_TITLE,
    sloganContent: DEFAULT_SLOGAN_CONTENT,
    color: true,
    mask: true,
    img1: '',
    img2: '',
    editingSloganTitle: DEFAULT_SLOGAN_TITLE,
    editingSloganContent: DEFAULT_SLOGAN_CONTENT,
    editingColor: true,
    editingMask: true,
    editingImg1: '',
    editingImg2: ''
  }),
  computed: {
    ...mapGetters(['isStaffS', 'currRole', 'isConsumer', 'merchantUrlPrefix']),
    resultImg1() {
      return (this.editing && this.editingImg1) || this.img1
    },
    resultImg2() {
      return (this.editing && this.editingImg2) || this.img2
    }
  },
  watch: {
    editingSloganTitle(val) {
      this.changeSloganTitle(val)
    },
    editingSloganContent(val) {
      this.changeSloganContent(val)
    }
  },
  async created() {
    const {sloganTitle, sloganContent, mask, color, backImgs} =
      (await this.$http.post(`/member-index/queryMemberIndex`)).data
    this.sloganTitle = this.editingSloganTitle = sloganTitle
    this.sloganContent = this.editingSloganContent = sloganContent
    this.mask = this.editingMask = mask
    this.color = this.editingColor = color
    this.img1 = this.editingImg1 = backImgs[0]
    this.img2 = this.editingImg2 = backImgs[1]
  },
  mounted() {
    this.animate()
  },
  updated() {
    this.animate()
  },
  methods: {
    animate() {
      const circles = [this.$refs.circle0, this.$refs.circle1]
      ensure(circles, 'animationend', (e, el) => {
        removeClass(e ? e.target : el, 'animated')
      }, 1600)
    },
    goto(index) {
      if (this.editing) return
      if (!index) {
        return this.$router.push('/subscribe-index')
      }

      if (this.isConsumer) {
        return this.$router.push('/member-index')
      }
      location.href = this.merchantUrlPrefix + `${this.currRole}/index`
    },
    editPanel() {
      this.editing = true
    },
    togglePanel(show) {
      this.show = show
    },
    changeSloganTitle(val) {
      if (this.$refs.sloganTitle) {
        this.$refs.sloganTitle.value = this.editingSloganTitle = cutByteStr(val, 12)
        this.$refs.sloganTitle.focus()
      }
    },
    changeSloganContent(val) {
      if (this.$refs.sloganContent) {
        this.$refs.sloganContent.value = this.editingSloganContent = cutByteStr(val, 80)
        this.$refs.sloganContent.focus()
      }
    },
    toggleImg(index, data) {
      index - 1 ? (this.editingImg2 = data) : (this.editingImg1 = data)
    },
    reInitImg(index) {
      if (index - 1) {
        this.editingImg2 = this.img2
      } else {
        this.editingImg1 = this.img1
      }
    },
    toggleColor() {
      this.editingColor = !this.editingColor
    },
    toggleMask() {
      this.editingMask = !this.editingMask
    },
    close() {
      this.editing = false
    },
    async confirm() {
      const data = {
        sloganTitle: this.editingSloganTitle || this.sloganTitle,
        sloganContent: this.editingSloganContent || this.sloganContent,
        backImgs: [this.editingImg1, this.editingImg2],
        mask: this.editingMask,
        color: this.editingColor
      }
      await this.$http.post('/member-index/save-index-info', data)
      this.editing = false
      this.sloganTitle = data.sloganTitle
      this.sloganContent = data.sloganContent
      this.img1 = data.backImgs[0]
      this.img2 = data.backImgs[1]
      this.mask = data.mask
      this.color = data.color
    }
  },
  components: {
    EditPanel
  }
})
