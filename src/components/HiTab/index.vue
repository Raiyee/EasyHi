<template lang="pug">
  div(:class="[$style.container, {'shadow-bottom': shadow, clearfix: $slots.default}]")
    div(:class="[$style.content, {'pull-left': $slots.default}]", :style="{width}", ref="container")
      ul.theme-color(:style="{width: itemsWidth + 'px', transform}",
      v-touch="{methods: true, enable: touchEnable}",
      ref="ulContainer")
        tab-item(v-for="(item, index) in items",
        :style="{width: itemWidth + 'px'}",
        :item="item",
        :index="index",
        :key="index",
        :valueKey="valueKey",
        :textKey="textKey",
        :touchEnable="touchEnable",
        @tapItem="toggleItem")
      .theme-bd(:class="$style.border",
      :style="{transform: borderTransform, width: itemWidth + 'px'}")
    slot
</template>
<script>
  import {mapGetters} from 'vuex'

  import TabItem from './TabItem'

  import {isObject, isUndefined, toNum, REQUIRED_ARRAY} from 'utils'

  export default {
    name: 'hi-tab',
    props: {
      items: {
        ...REQUIRED_ARRAY,
        validator(value) {
          return value.length > 0
        }
      },
      width: [String, Number],
      defaultIndex: {
        type: Number,
        default: 0
      },
      valueKey: {
        type: String,
        default: 'value'
      },
      textKey: {
        type: String,
        default: 'text'
      },
      auto: {
        type: Boolean,
        default: true
      },
      showNum: {
        type: Number,
        default: 4,
        validator(value) {
          return value > 0
        }
      },
      shadow: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        translateX: 0,
        translateStart: 0,
        currIndex: this.defaultIndex,
        touchEnable: this.items.length > this.showNum
      }
    },
    computed: {
      ...mapGetters(['appWidth', 'dpi']),
      transform() {
        return `translate3d(${this.translateX}px, 0, 0)`
      },
      containerWidth() {
        const tabWidth = (this.width || '100%').toString()
        const widthNum = toNum(tabWidth)
        const containerWidth = tabWidth.endsWith('%') ? widthNum / 100 * this.appWidth : widthNum
        return containerWidth - 20
      },
      itemsWidth() {
        const len = this.items.length
        return this.containerWidth / Math.min(this.showNum, len) * len
      },
      itemWidth() {
        return this.itemsWidth / this.items.length
      },
      borderTranslateX() {
        return +(this.translateX + this.itemWidth * this.currIndex).toFixed(2)
      },
      borderTransform() {
        return `translate3d(${this.borderTranslateX}px, 0, 0)`
      }
    },
    watch: {
      defaultIndex(defaultIndex) {
        this.currIndex = defaultIndex
        this.resetTranslateX()
      }
    },
    mounted() {
      this.resetTranslateX()
    },
    methods: {
      resetTranslateX() {
        if (this.items.length <= 3) return
        this.translateX = -this.itemWidth * Math.min(this.defaultIndex, this.items.length - this.showNum)
      },
      moveStart() {
        this.translateStart = this.translateX
      },
      moving(e) {
        this.translateX = this.translateStart + e.changedX
      },
      moveEnd(e) {
        const perWidth = this.itemsWidth / this.items.length
        const changedX = e.changedX
        let toChangeX = 0
        if (Math.abs(changedX) > 15) {
          toChangeX = Math[changedX > 0 ? 'ceil' : 'floor'](changedX / perWidth)
        }
        const translateX = this.translateStart + toChangeX * perWidth
        this.translateX = Math.min(Math.max(translateX, this.containerWidth - this.itemsWidth), 0)

        if (!this.auto) return

        const {showNum, borderTranslateX} = this

        let index
        // 当currIndex 不在可视区域内触发
        if (borderTranslateX < 0) index = 0
        else if (borderTranslateX >= showNum * perWidth) index = showNum - 1

        if (isUndefined(index)) return
        const currIndex = Math.round(index - this.translateX / perWidth)
        const item = this.items[currIndex]
        const object = isObject(item)
        const params = [item]
        object && params.unshift(item[this.valueKey], item[this.textKey])
        this.toggleItem(currIndex, ...params)
      },
      toggleItem: function (index) {
        if (this.currIndex === index) return
        this.currIndex = index
        this.$emit('toggleTab', ...arguments)
      }
    },
    components: {
      TabItem
    }
  }
</script>
<style lang="stylus" module>
  .container
    background-color $reverse-color

  .content
    overflow hidden
    margin-bottom -1px
    padding 0 10px

    ul
      padding 0
      margin-bottom 0
      transition transform .5s

      li
        text-align center
        display inline-block
        vertical-align middle
        overflow ellipsis
        padding 10px

  .border
    border-bottom 1px solid
    transition transform .5s
</style>
