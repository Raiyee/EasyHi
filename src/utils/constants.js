export * from 'store/constants'

import {trueType} from './base'

export const DATE_FORMAT = 'YYYY-MM-DD'
export const DATE_FORMAT2 = 'YYYY.MM.DD'
export const HOUR_FORMAT = 'HH:mm'
export const DATETIME_FORMAT = `${DATE_FORMAT2} ${HOUR_FORMAT}`

const firstToSeventh = ['一', '二', '三', '四', '五', '六']

export const weekdays = ['日', ...firstToSeventh].map(value => '周' + value)

export const months = [...firstToSeventh, '七', '八', '九', '十', '十一', '十二'].map(val => val + '月')

const [first, ...rest] = weekdays
export const isoWeekdays = [...rest, first];

[Array, Boolean, Date, Function, Number, RegExp, String, Object].forEach(type => {
  module.exports[`REQUIRED_${trueType(type.prototype).toUpperCase()}`] = {type, required: true}
})

export const EMPTY_FUNC = () => {
}

const wrap = text => `__${text}__`

export const MENUS_ID = wrap('menus')
export const PICKER_ID = wrap('picker')
export const TIP_ID = wrap('tip')

export const EMPTY_IMG = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='

export const MOBILE_REGEX = __PAGES__ ? /^1(2345678910)|([34578]\d{9})$/ : /^1[34578]\d{9}$/

export const DATE_REGEX = /^(19|20)\d{2}[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/

const inBrowser = typeof window !== 'undefined'
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
export const isIE = UA && /msie|trident/.test(UA)
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0
export const isEdge = UA && UA.indexOf('edge/') > 0
export const isAndroid = UA && UA.indexOf('android') > 0
export const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge

export const IS_TBS = /MQQBrowser/i.test(navigator.userAgent)

export const IS_ANDROID_TBS = IS_TBS && isAndroid

export const MAX_IMG_SIZE = 3 * 1024 * 1024

export const MIN_MONEY = 0.01
export const MAX_MONEY = 100000

export DEFAULT_LOGO from 'assets/yoga.jpg'

import memberFemale from 'assets/portrait/member-female.jpg'

export const FEMALE_PORTRAIT_C = memberFemale
export MALE_PORTRAIT_C from 'assets/portrait/member-male.jpg'

export FEMALE_PORTRAIT_B from 'assets/portrait/coach-female.jpg'
export MALE_PORTRAIT_B from 'assets/portrait/coach-male.jpg'

export const DEFAULT_PORTRAIT = FEMALE_PORTRAIT_C
