import classes from './index.styl'

export default require('./index.pug')({
  name: 'Tooltip',
  data() {
    return {
      classes,
      arrowStyle: {}
    }
  },
  props: {
    // hover|click|manual
    mode: {
      type: String,
      default: 'hover'
    },
    value: {
      type: Boolean,
      default: true
    },
    // top|top-left|top-right
    // right|right-top|right-bottom
    // bottom|bottom-left|bottom-right
    // left|left-top|left-bottom
    placement: {
      type: String,
      default: 'top'
    },
    minWidth: {
      type: Number,
      default: 0
    },
    maxWidth: {
      type: Number,
      default: 0
    },
    nowrap: {
      type: Boolean,
      default: true
    },
    arrowWidth: {
      type: Number,
      default: 10
    },
    arrowHeight: {
      type: Number,
      default: 6
    }
  },
  computed: {
    tooltipStyle() {
      const s = {}
      if (this.minWidth > 0) {
        s.minWidth = this.minWidth + 'px'
      }
      if (this.maxWidth > 0) {
        s.maxWidth = this.maxWidth + 'px'
      }
      if (this.nowrap) {
        s.whiteSpace = 'nowrap'
      }
      return s
    },
    outletEl() {
      return this.$el.querySelector('.outlet')
    },
    outletInnerEl() {
      return this.$el.querySelector('.outlet > *')
    },
    tooltipEl() {
      return this.$el.querySelector('.tooltip')
    }
  },
  watch: {
    value(newVal) {
      if (newVal === true && this.mode === 'manual') {
        this.show()
      } else if (newVal === false && (this.mode === 'manual' || this.mode === 'click')) {
        this.hide()
      }
    }
  },
  methods: {
    updateArrowStyle() {
      const s = {}
      const tooltipRect = this.rect(this.tooltipEl)
      // top|bottom
      if (this.placement.indexOf('top') === 0 || this.placement.indexOf('bottom') === 0) {
        if (this.placement.indexOf('top') === 0) {
          s.borderTopColor = 'rgba(0, 0, 0, .6)'
          s.borderLeftColor = 'transparent'
          s.borderRightColor = 'transparent'
          s.borderBottomColor = 'transparent'
          s.borderLeftWidth = this.arrowWidth / 2
          s.borderRightWidth = s.borderLeftWidth + 'px'
          s.borderLeftWidth += 'px'
          s.borderTopWidth = this.arrowHeight + 'px'
          s.borderBottomWidth = '0px'
          s.bottom = (-this.arrowHeight) + 'px'
        } else {
          s.borderTopColor = 'transparent'
          s.borderLeftColor = 'transparent'
          s.borderRightColor = 'transparent'
          s.borderBottomColor = 'rgba(0, 0, 0, .6)'
          s.borderLeftWidth = this.arrowWidth / 2
          s.borderRightWidth = s.borderLeftWidth + 'px'
          s.borderLeftWidth += 'px'
          s.borderTopWidth = '0px'
          s.borderBottomWidth = this.arrowHeight + 'px'
          s.top = (-this.arrowHeight) + 'px'
        }
        if (this.placement.indexOf('left') !== -1) {
          s.left = this.arrowWidth + 'px'
        } else if (this.placement.indexOf('right') !== -1) {
          s.right = this.arrowWidth + 'px'
        } else {
          s.left = ((tooltipRect.width - this.arrowWidth) / 2) + 'px'
        }
        this.arrowStyle = s
        return
      }
      // left
      if (this.placement.indexOf('left') === 0 || this.placement.indexOf('right') === 0) {
        if (this.placement.indexOf('left') === 0) {
          s.borderTopColor = 'transparent'
          s.borderLeftColor = 'rgba(0, 0, 0, .6)'
          s.borderRightColor = 'transparent'
          s.borderBottomColor = 'transparent'
          s.borderLeftWidth = this.arrowHeight + 'px'
          s.borderRightWidth = '0px'
          s.borderTopWidth = this.arrowWidth / 2
          s.borderBottomWidth = s.borderTopWidth + 'px'
          s.borderTopWidth += 'px'
          s.right = (-this.arrowHeight) + 'px'
        } else {
          s.borderTopColor = 'transparent'
          s.borderLeftColor = 'transparent'
          s.borderRightColor = 'rgba(0, 0, 0, .6)'
          s.borderBottomColor = 'transparent'
          s.borderLeftWidth = '0px'
          s.borderRightWidth = this.arrowHeight + 'px'
          s.borderTopWidth = this.arrowWidth / 2
          s.borderBottomWidth = s.borderTopWidth + 'px'
          s.borderTopWidth += 'px'
          s.left = (-this.arrowHeight) + 'px'
        }
        if (this.placement.indexOf('top') !== -1 && tooltipRect.height > 30) {
          s.top = this.arrowWidth + 'px'
        } else if (this.placement.indexOf('bottom') !== -1 && tooltipRect.height > 30) {
          s.bottom = this.arrowWidth + 'px'
        } else {
          s.top = ((tooltipRect.height - this.arrowWidth) / 2) + 'px'
        }
        this.arrowStyle = s
      }
    },
    place() {
      const containerRect = this.$el.getBoundingClientRect()
      const outletInnerRect = this.outletInnerEl.getBoundingClientRect()
      const tooltipRect = this.rect(this.tooltipEl)
      // top|bottom
      if (this.placement.indexOf('top') === 0 || this.placement.indexOf('bottom') === 0) {
        let top
        let left
        if (this.placement.indexOf('top') === 0) {
          top = (outletInnerRect.top - containerRect.top - tooltipRect.height - this.arrowHeight - 5) + 'px'
        } else {
          top = (outletInnerRect.bottom - containerRect.top + this.arrowHeight + 5) + 'px'
        }
        if (this.placement.indexOf('left') !== -1) {
          left = (outletInnerRect.left - containerRect.left) + 'px'
        } else if (this.placement.indexOf('right') !== -1) {
          left = (outletInnerRect.right - containerRect.left - tooltipRect.width) + 'px'
        } else {
          left = (outletInnerRect.left - containerRect.left + (outletInnerRect.width - tooltipRect.width) / 2) + 'px'
        }
        this.tooltipEl.style.top = top
        this.tooltipEl.style.left = left
        return
      }
      // left
      if (this.placement.indexOf('left') === 0 || this.placement.indexOf('right') === 0) {
        let top
        let left
        if (this.placement.indexOf('left') === 0) {
          left = (outletInnerRect.left - containerRect.left - tooltipRect.width - this.arrowHeight - 5) + 'px'
        } else {
          left = (outletInnerRect.right - containerRect.left + this.arrowHeight + 5) + 'px'
        }
        if (this.placement.indexOf('top') !== -1) {
          top = (outletInnerRect.top - containerRect.top) + 'px'
        } else if (this.placement.indexOf('bottom') !== -1) {
          top = (outletInnerRect.bottom - containerRect.top - tooltipRect.height) + 'px'
        } else {
          top = (outletInnerRect.top - containerRect.top + (outletInnerRect.width - tooltipRect.width) / 2) + 'px'
        }
        this.tooltipEl.style.top = top
        this.tooltipEl.style.left = left
      }
    },
    rect(el) {
      let rect = el.getBoundingClientRect()
      if (rect.width !== 0 || rect.height !== 0) {
        return rect
      }
      const style = window.getComputedStyle(el)
      const display = style.getPropertyValue('display')
      const top = style.getPropertyValue('top')
      const left = style.getPropertyValue('left')
      el.style.top = '-1000px'
      el.style.left = '-1000px'
      el.style.display = 'block'
      rect = el.getBoundingClientRect()
      el.style.display = display
      el.style.top = top
      el.style.left = left
      return rect
    },
    show() {
      this.tooltipEl.style.display = 'block'
      this.updateArrowStyle()
      this.place()
    },
    hide() {
      this.tooltipEl.style.display = 'none'
    },
    autoShowWithMode(evt) {
      if (this.mode === 'hover' && evt.type === 'mouseover' ||
        this.mode === 'click' && evt.type === 'click') {
        this.show()
        this.$emit('input', true)
      }
    },
    autoHideWithMode(evt) {
      if (this.mode === 'hover' && evt.type === 'mouseleave') {
        this.hide()
        this.$emit('input', false)
      } else if (this.mode === 'click' && evt.type === 'click' && !this.$el.contains(evt.target)) {
        this.hide()
        this.$emit('input', false)
      }
    }
  },
  mounted() {
    if (this.mode === 'manual' && this.value) {
      this.show()
    }
    document.addEventListener('click', this.autoHideWithMode, false)
  },
  destroyed() {
    document.removeEventListener('click', this.autoHideWithMode, false)
  }
})
