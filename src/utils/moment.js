import {emptyArr} from './array'

import _moment from 'moment'

import {DATE_FORMAT, DATE_FORMAT2, isoWeekdays, months} from './constants'

export const moment = (first, ...rest) => _moment(first || [], ...rest)

/**
 * 获取指定日期当周周几的日期
 *
 * @param date                日期值
 * @param dayOfWeek           周几
 * @param format              是否进行格式化，默认 true
 * @returns {string|moment}   日期字符串或 moment 实例
 */
export const dayOfWeek = (date, dayOfWeek, format = true) => {
  const mDate = moment(date).isoWeekday(dayOfWeek)
  return format ? mDate.format(DATE_FORMAT) : mDate
}

/**
 * 获取指定日期当周第一天日期
 *
 * @param date        日期值
 * @param format      是否将日期格式化, 否则返回 moment 实例
 * @returns {string}  当周第一天日期字符串
 */
export const firstDayOfWeek = (date, format) => dayOfWeek(date, 1, format)

/**
 * 获取指定日期当周最后一天日期
 *
 * @param date        日期值
 * @param format      是否将日期格式化, 否则返回 moment 实例
 * @returns {string}  当周最后一天日期字符串
 */
export const lastDayOfWeek = (date, format) => dayOfWeek(date, 7, format)

/**
 * 获取日期是周几
 *
 * @param date        日期
 * @param getDateText 是否转化为昨天、今天、明天
 * @returns {string}  周几
 */
export const getWeekday = (date, getDateText) => getDateText && dateText(date, false) ||
  isoWeekdays[moment(date).isoWeekday() - 1]

/**
 * 获取对应格式的日期数据
 *
 * @param date        可供 moment 解析的日期值
 * @param unit        与 moment 一致的时间单位字符串
 * @returns {string}  对应单位的日期数据
 */
export const getDatetime = (date, unit) => moment(date).get(unit)

/**
 * 格式化日期字符串
 *
 * @param date        可供 moment 解析的日期值
 * @param format      与 moment 一致的格式化参数
 */
export const formatDate = (date, format = DATE_FORMAT) => moment(date).format(format)

/**
 * 格式化日期字符串
 *
 * @param date        可供 moment 解析的日期值
 * @param offset      提供 与提供日期 相差之后的具体月份
 */
export const monthText = (date, offset = 0) => months[moment(date).add(offset, 'M').get('M')]

export const commonMonths = date => [{
  monthIndex: null,
  monthText: '所有时间'
}, {
  monthIndex: 0,
  monthText: '本月'
}, ...emptyArr(3).map((val, index) => {
    const monthIndex = -index - 1
    return {
      monthIndex,
      monthText: monthText(date, monthIndex)
    }
  }), {
  monthIndex: -4,
  monthText: '三个月前'
}]

/**
 * 获取一周日期
 *
 * @param date        日期
 * @param weeks       获取周数，默认为 1
 * @param format      格式化参数，默认为 DATE_FORMAT
 * @returns {Array}   当周日期数据
 */
export const weekDates = (date, weeks = 1, format = DATE_FORMAT) => {
  const monday = firstDayOfWeek(date, false)
  return new Array(7 * weeks).fill(0).map((date, index) => monday.add(+!!index, 'd').format(format))
}

export const timeLeft = seconds => {
  const second = seconds % 60
  const minute = ~~(seconds / 60) % 60
  const hour = ~~(seconds / 60 / 60) % 24
  const day = ~~(seconds / 60 / 60 / 24)

  return day ? day + '天' + hour + '时'
    : hour ? hour + '时' + minute + '分'
      : minute ? minute + '分' + second + '秒'
        : second + '秒'
}

export const combineDuration = (duration = [], format = DATE_FORMAT2, hyphen = '-') =>
  moment(duration[0]).format(format) + hyphen + moment(duration[1]).format(format)

const utils = {}

;['Yesterday', 'Today', 'Tomorrow'].forEach((day, index) => {
  utils[`is${day}`] = module.exports[`is${day}`] =
    date => moment().add(index - 1, 'd').format(DATE_FORMAT) === moment(date).format(DATE_FORMAT)
})

export const isAfterNow = date => moment(date).isAfter()
export const isBeforeNow = date => moment(date).isBefore()
export const isAfterToday = date => moment(date).isAfter(moment().format(DATE_FORMAT))
export const isBeforeToday = date => moment(date).isBefore(moment().format(DATE_FORMAT))

export const groupWithDate = (arr, key) => {
  const result = {}
  arr.sort((obj1, obj2) => -moment(obj1[key]).diff(obj2[key])).forEach(obj => {
    const date = formatDate(obj[key])
    result[date] ? result[date].push(obj) : (result[date] = [obj])
  })
  return result
}

export const dateText = (date, format) =>
  utils.isYesterday(date) ? '昨天' : utils.isToday(date) ? '今天' : utils.isTomorrow(date) ? '明天'
    : format === false ? format : formatDate(date, format)
