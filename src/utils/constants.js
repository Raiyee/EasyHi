import {trueType} from './base'

export const DATE_FORMAT = 'YYYY-MM-DD'

export const weekdays = ['日', '一', '二', '三', '四', '五', '六'].map(value => '周' + value)

const [first, ...rest] = weekdays
export const isoWeekdays = [...rest, first];

[Array, Boolean, Date, Function, Number, RegExp, String, Object].forEach(type => {
  module.exports[`REQUIRED_${trueType(type.prototype).toUpperCase()}`] = {
    type,
    required: true
  }
})

export const EMPTY_FUNC = () => {
}
