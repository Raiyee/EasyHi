import {getWeekday, formatDate, isYesterday, isToday, isTomorrow} from 'utils'

export {getWeekday, formatDate}

export const dateText = (date, format) =>
  isYesterday(date) ? '昨天' : isToday(date) ? '今天' : isTomorrow(date) ? '明天' : formatDate(date, format)
