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
      itemIndex: undefined,
      classes: require('./tab.styl')
    }
  },
  computed: {
    ulWidth() {
      let len = this.tabArray.length
      return len <= 2 ? '100%' : 100 / (!this.pageNum ? 3 : Math.min(this.pageNum, len)) * len + '%'
    },
    liWidth() {
      let len = this.tabArray.length
      return len === 1 ? '100%' : len === 2 ? '50%' : 100 / len + '%'
    },
    tabIndex() {
      return this.itemIndex >= 0 ? this.itemIndex : this.index ? this.index : 0
    }
  },
  methods: {
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
