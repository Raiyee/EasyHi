import {addClass, removeClass, one} from 'utils'

import '!style-loader!css-loader!stylus-loader!./picker-slot.styl'

import draggable from './draggable'
import translateUtil from './translate'

import emitter from './emitter'

const rotateElement = function (element, angle) {
  if (!element) return
  const transformProperty = translateUtil.transformProperty
  element.style[transformProperty] = element.style[transformProperty]
      .replace(/rotateX\(.+?deg\)/gi, '') + ` rotateX(${angle}deg)`
}

const ITEM_HEIGHT = 36
const VISIBLE_ITEMS_ANGLE_MAP = {
  3: -45,
  5: -20,
  7: -15
}
export default require('./picker-slot.pug')({
  name: 'picker-slot',
  props: {
    values: {
      type: Array,
      default() {
        return []
      }
    },
    value: {},
    visibleItemCount: {
      type: Number,
      default: 5
    },
    valueKey: String,
    rotateEffect: {
      type: Boolean,
      default: false
    },
    divider: {
      type: Boolean,
      default: false
    },
    textAlign: {
      type: String,
      default: 'center'
    },
    flex: {},
    className: {},
    content: {}
  },
  data() {
    return {
      currentValue: this.value,
      mutatingValues: this.values,
      dragging: false,
      animationFrameId: null
    }
  },
  mixins: [emitter],
  computed: {
    flexStyle() {
      return {
        'flex': this.flex,
        '-webkit-box-flex': this.flex,
        '-moz-box-flex': this.flex,
        '-ms-flex': this.flex
      }
    },
    classNames() {
      const PREFIX = 'picker-slot-'
      let resultArray = []
      if (this.rotateEffect) {
        resultArray.push(PREFIX + 'absolute')
      }
      let textAlign = this.textAlign || 'center'
      resultArray.push(PREFIX + textAlign)
      if (this.divider) {
        resultArray.push(PREFIX + 'divider')
      }
      if (this.className) {
        resultArray.push(this.className)
      }
      return resultArray.join(' ')
    },
    contentHeight() {
      return ITEM_HEIGHT * this.visibleItemCount
    },
    valueIndex() {
      return this.mutatingValues.indexOf(this.currentValue)
    },
    dragRange() {
      const values = this.mutatingValues
      const visibleItemCount = this.visibleItemCount
      return [-ITEM_HEIGHT * (values.length - Math.ceil(visibleItemCount / 2)),
        ITEM_HEIGHT * Math.floor(visibleItemCount / 2)]
    }
  },
  methods: {
    value2Translate(value) {
      const values = this.mutatingValues
      const valueIndex = values.indexOf(value)
      const offset = Math.floor(this.visibleItemCount / 2)
      if (valueIndex !== -1) {
        return (valueIndex - offset) * -ITEM_HEIGHT
      }
    },
    translate2Value(translate) {
      translate = Math.round(translate / ITEM_HEIGHT) * ITEM_HEIGHT
      const index = -(translate - Math.floor(this.visibleItemCount / 2) * ITEM_HEIGHT) / ITEM_HEIGHT
      return this.mutatingValues[index]
    },
    updateRotate: function (currentTranslate, pickerItems) {
      if (this.divider) return
      const dragRange = this.dragRange
      const wrapper = this.$refs.wrapper
      if (!pickerItems) {
        pickerItems = wrapper.querySelectorAll('.picker-item')
      }
      if (currentTranslate === undefined) {
        currentTranslate = translateUtil.getElementTranslate(wrapper).top
      }
      const itemsFit = Math.ceil(this.visibleItemCount / 2)
      const angleUnit = VISIBLE_ITEMS_ANGLE_MAP[this.visibleItemCount] || -20;

      [].forEach.call(pickerItems, (item, index) => {
        const itemOffsetTop = index * ITEM_HEIGHT
        const translateOffset = dragRange[1] - currentTranslate
        const itemOffset = itemOffsetTop - translateOffset
        const percentage = itemOffset / ITEM_HEIGHT
        let angle = angleUnit * percentage
        if (angle > 180) angle = 180
        if (angle < -180) angle = -180
        rotateElement(item, angle)
        if (Math.abs(percentage) > itemsFit) {
          addClass(item, 'picker-item-far')
        } else {
          removeClass(item, 'picker-item-far')
        }
      })
    },
    planUpdateRotate: function () {
      const el = this.$refs.wrapper

      if (!el) return

      cancelAnimationFrame(this.animationFrameId)
      this.animationFrameId = requestAnimationFrame(() => {
        this.updateRotate()
      })
      one(el, translateUtil.transitionEndProperty, () => {
        this.animationFrameId = null
        cancelAnimationFrame(this.animationFrameId)
      })
    },
    initEvents() {
      const el = this.$refs.wrapper
      let dragState = {}
      let velocityTranslate, prevTranslate, pickerItems
      draggable(el, {
        start: (event) => {
          cancelAnimationFrame(this.animationFrameId)
          this.animationFrameId = null
          dragState = {
            range: this.dragRange,
            start: new Date(),
            startLeft: event.pageX,
            startTop: event.pageY,
            startTranslateTop: translateUtil.getElementTranslate(el).top
          }
          pickerItems = el.querySelectorAll('.picker-item')
        },
        drag: (event) => {
          this.dragging = true
          dragState.left = event.pageX
          dragState.top = event.pageY
          const deltaY = dragState.top - dragState.startTop
          const translate = dragState.startTranslateTop + deltaY
          translateUtil.translateElement(el, null, translate)
          velocityTranslate = translate - prevTranslate || translate
          prevTranslate = translate
          if (this.rotateEffect) {
            this.updateRotate(prevTranslate, pickerItems)
          }
        },
        end: () => {
          this.dragging = false
          const momentumRatio = 7
          const currentTranslate = translateUtil.getElementTranslate(el).top
          const duration = new Date() - dragState.start
          let momentumTranslate
          if (duration < 300) {
            momentumTranslate = currentTranslate + velocityTranslate * momentumRatio
          }
          const dragRange = dragState.range
          this.$nextTick(() => {
            let translate
            if (momentumTranslate) {
              translate = Math.round(momentumTranslate / ITEM_HEIGHT) * ITEM_HEIGHT
            } else {
              translate = Math.round(currentTranslate / ITEM_HEIGHT) * ITEM_HEIGHT
            }
            translate = Math.max(Math.min(translate, dragRange[1]), dragRange[0])
            translateUtil.translateElement(el, null, translate)
            this.currentValue = this.translate2Value(translate)
            if (this.rotateEffect) {
              this.planUpdateRotate()
            }
          })
          dragState = {}
        }
      })
    },
    doOnValueChange() {
      const value = this.currentValue
      const wrapper = this.$refs.wrapper
      translateUtil.translateElement(wrapper, null, this.value2Translate(value))
    },
    doOnValuesChange() {
      const el = this.$el
      const items = el.querySelectorAll('.picker-item');

      [].forEach.call(items, (item, index) => {
        translateUtil.translateElement(item, null, ITEM_HEIGHT * index)
      })

      if (this.rotateEffect) {
        this.planUpdateRotate()
      }
    }
  },
  mounted() {
    // this.ready = true
    this.$emit('input', this.currentValue)
    if (!this.divider) {
      this.initEvents()
      this.doOnValueChange()
    }
    if (this.rotateEffect) {
      this.doOnValuesChange()
    }
  },
  watch: {
    values(val) {
      this.mutatingValues = val
    },
    mutatingValues(val) {
      if (this.valueIndex === -1) {
        this.currentValue = (val || [])[0]
      }
      if (this.rotateEffect) {
        this.$nextTick(() => {
          this.doOnValuesChange()
        })
      }
    },
    currentValue(val) {
      this.doOnValueChange()
      if (this.rotateEffect) {
        this.planUpdateRotate()
      }
      this.$emit('input', val)
      this.dispatch('picker', 'slotValueChange', this)
    }
  }
})
