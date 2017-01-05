export * from 'store/constants'

import {trueType} from './base'

export const DATE_FORMAT = 'YYYY-MM-DD'
export const HOUR_FORMAT = 'HH:mm'

export const weekdays = ['日', '一', '二', '三', '四', '五', '六'].map(value => '周' + value)

const [first, ...rest] = weekdays
export const isoWeekdays = [...rest, first];

[Array, Boolean, Date, Function, Number, RegExp, String, Object].forEach(type => {
  module.exports[`REQUIRED_${trueType(type.prototype).toUpperCase()}`] = {type, required: true}
})

export const EMPTY_FUNC = () => {}

export const PICKER_ID = Symbol('picker')
export const TIP_ID = Symbol('tip')

export const EMPTY_IMG = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='

export const MOBILE_REGEX = /^1[35789]\d{9}$/

export const DATE_REGEX = /^(19|20)\d{2}[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/
