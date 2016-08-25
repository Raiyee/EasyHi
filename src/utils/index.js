import moment from 'moment';

// 使用 require 语法将 constants 导出的所有常量汇合到一个对象中并注入 utils
const utils = {...require('./constants')};

const DATE_FORMAT = utils.DATE_FORMAT;

import {isoWeekdays} from 'utils/constants';

const trueTypeFunc = type => value => type === utils.trueType(value);

const isNumber = trueTypeFunc('Number');

Object.assign(utils, {
  /**
   * 获取输入值的真实类型
   *
   * @param value       需要判断的值
   * @returns {string}  类型字符串
   */
  trueType(value) {
    return [].slice.call({}.toString.call(value), 8, -1).join('');
  },
  /**
   * 判断是否是 NaN, 与原生 isNaN 不同, 例如 String 类型传入为 false
   *
   * @param value       验证值
   * @returns {boolean} 是否是 NaN 值
   */
  isNaN: value => isNumber(value) && isNaN(value),
  /**
   * 判断是否是数字, 不包括 NaN 值
   *
   * @param value       验证值
   * @returns {boolean} 是否是纯数字
   */
  isNumber: value => isNumber(value) && !isNaN(value),
  /**
   * 获取当周第一天日期
   *
   * @param date        日期值
   * @returns {string}  当周第一天日期字符串
   */
  firstDayOfWeek: date => moment(date).isoWeekday(1).format(DATE_FORMAT),
  /**
   * 根据日期和周数获取从上一周开始共 count 周的所有日期
   *
   * @param date        日期值
   * @param count       周数
   * @returns {Array}   日期值数组
   */
  getWeeks(date = new Date(), count = 3) {
    const firstDay = moment(date).isoWeekday(-6);
    return new Array(7 * count).fill(0).map((value, index) => firstDay.add(+!!index, 'd').format(DATE_FORMAT));
  },
  /**
   * 获取日期是周几
   *
   * @param date        日期
   * @returns {string}  周几
   */
  getWeekday: date => isoWeekdays[moment(date).isoWeekday() - 1],
  /**
   * 获取对应格式的日期数据
   *
   * @param date        可供 moment 解析的日期字符串或 Date 实例
   * @param unit        与 moment 一致的时间单位字符串
   * @returns {string}  对应单位的日期数据
   */
  getDatetime: (date, unit) => moment(date).get(unit)
});

/**
 * 一些类型判断方法, 例: utils.Array(1)
 */
['Arguments', 'Array', 'Boolean', 'Date', 'Error', 'Function', 'Map',
  'Null', 'Object', 'RegExp', 'Set', 'String', 'Symbol', 'Undefined']
  .forEach(type => (utils[`is${type}`] = trueTypeFunc(type)));

// TODO 暂时将 utils 添加到 window 对象中
window.utils = utils;

export default utils;
