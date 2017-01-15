import {isObject, REQUIRED_BOOLEAN, REQUIRED_NUMBER} from 'utils'

export default require('./tab-item.pug')({
  name: 'tab-item',
  props: {
    item: {
      type: [String, Object],
      required: true
    },
    index: REQUIRED_NUMBER,
    valueKey: true,
    textKey: true,
    touchEnable: REQUIRED_BOOLEAN
  },
  data() {
    const item = this.item
    const object = isObject(item)
    const value = object ? item[this.valueKey] : this.index
    const text = object ? item[this.textKey] : item

    const params = [item]
    object && params.unshift(value, text)
    return {
      params,
      value,
      text
    }
  },
  methods: {
    onClick() {
      this.touchEnable || this.onTap()
    },
    onTap() {
      this.$emit('tapItem', this.index, ...this.params)
    }
  }
})
