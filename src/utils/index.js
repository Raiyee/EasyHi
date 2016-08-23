import moment from 'moment';

// 使用 require 语法将 constants 导出的所有常量汇合到一个对象中并注入 utils
const utils = {...require('./constants')};

const DATE_FORMAT = utils.DATE_FORMAT;

import {isoWeekdays} from 'utils/constants';

const getWeekday = date => isoWeekdays[moment(date).isoWeekday() - 1];

/**
 * 排期存在 4 种状态
 * 0 -> 无课
 * 1 -> 正常
 * 2 -> 订满
 * 3 -> 有课但已过期
 *
 * @param status  课程状态值, 可能为 0、1、2、3
 * @param date    日期字符串
 */
const statusText = (status, date) => {
  switch (status) {
    case (0):
      return '无课';
    case (2):
      return '订满';
  }
  return getWeekday(date);
};

const getDatetime = (date, unit) => moment(date).get(unit);

Object.assign(utils, {
  trueType(value) {
    return [].slice.call({}.toString.call(value), 8, -1).join('');
  },
  isNaN,
  isInfinity: value => Infinity === value,
  firstDayOfWeek: date => moment(date).isoWeekday(1).format(DATE_FORMAT),
  getWeeks(date = new Date(), count = 3) {
    const firstDay = moment(date).isoWeekday(-6);
    return new Array(7 * count).fill(0).map((value, index) => firstDay.add(+!!index, 'd').format(DATE_FORMAT));
  },
  getWeekday,
  statusText,
  getDatetime
});

for (const type of ['Arguments', 'Array', 'Boolean', 'Date', 'Error', 'Function',
  'Map', 'Number', 'Null', 'Object', 'RegExp', 'Set', 'String', 'Symbol', 'Undefined']) {
  utils[`is${type}`] = value => type === utils.trueType(value);
}

// TODO 暂时将 utils 添加到 window 对象中
window.utils = utils;

export default utils;
