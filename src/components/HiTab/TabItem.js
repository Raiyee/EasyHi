import {isObject, REQUIRED_BOOLEAN, REQUIRED_NUMBER} from 'utils'

export default {
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
    const {item} = this
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
  render() {
    return <li onClick={() => this.$emit('tapItem', this.index, ...this.params)}>{this.text}</li>
  }
}
