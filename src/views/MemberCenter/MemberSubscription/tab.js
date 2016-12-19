import {mapGetters} from 'vuex'
import {isString} from 'utils'

export default require('./tab.pug')({
  name: 'tab',
  props: {
    float: String,
    width: String,
    index: Number,
    pageNum: {
      type: Number,
      validator(value) {
        return value > 0
      }
    },
    tabArray: {
      type: Array,
      required: true,
      validator(value) {
        return value.length > 0
      }
    }
  },
  data() {
    return {
      translateX: 0,
      translateStart: 0,
      itemIndex: undefined,
      classes: require('./tab.styl')
    }
  },
  computed: {
    ...mapGetters(['winWidth']),
    containerWidth() {
      return this.width.endsWith('px') ? parseInt(this.width) : parseInt(this.width) / 100 * this.winWidth
    },
    ulWidth() {
      let len = this.tabArray.length
      return len <= 2 ? this.containerWidth
        : this.containerWidth / (!this.pageNum ? 3 : Math.min(this.pageNum, len)) * len
    },
    liWidth() {
      let len = this.tabArray.length
      return len === 1 ? '100%' : len === 2 ? '50%' : 100 / len + '%'
    },
    tabIndex() {
      return this.itemIndex >= 0 ? this.itemIndex : this.index ? this.index : 0
    },
    transform() {
      return `translate3d(${this.translateX}px, 0, 0)`
    }
  },
  methods: {
    moveStart() {
      this.translateStart = this.translateX
    },
    moving(e) {
      this.translateX = this.translateStart + e.changedX
    },
    moveEnd(e) {
      let perWidth = this.ulWidth / this.tabArray.length
      let translateDistance
      if (this.translateX >= 0) {
        translateDistance = 0
      } else if (this.translateX <= this.containerWidth - this.ulWidth) {
        translateDistance = this.containerWidth - this.ulWidth
      } else {
        translateDistance = this.translateStart + (
          e.changedX < 0 ? Math.floor((e.changedX + 15) / perWidth) : Math.ceil((e.changedX - 15) / perWidth)
          ) * perWidth
      }
      this.translateX = translateDistance
      console.log(e.changedX, this.translateX)
    },
    clickItem: function (item, index, e) {
      this.itemIndex = index
      this.$emit('changeTab', item, index, e)
    }
  },
  filters: {
    tabNameFilter(tabItem) {
      return isString(tabItem) ? tabItem : tabItem.tabName
    }
  }
})
