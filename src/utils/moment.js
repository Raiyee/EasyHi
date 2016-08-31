import moment from 'moment';

import {DATE_FORMAT, isoWeekdays} from './constants';

/**
 * 获取当周第一天日期
 *
 * @param date        日期值
 * @returns {string}  当周第一天日期字符串
 */
export const firstDayOfWeek = (date = new Date()) => moment(date).isoWeekday(1).format(DATE_FORMAT);

/**
 * 根据日期和周数获取从上一周开始共 count 周的所有日期
 *
 * @param date        日期值
 * @param count       周数
 * @returns {Array}   日期值数组
 */
export const getWeeks = (date = new Date(), count = 3) => {
  const firstDay = moment(date).isoWeekday(-6);
  return new Array(7 * count).fill(0).map((value, index) => firstDay.add(+!!index, 'd').format(DATE_FORMAT));
};

/**
 * 获取日期是周几
 *
 * @param date        日期
 * @returns {string}  周几
 */
export const getWeekday = date => isoWeekdays[moment(date).isoWeekday() - 1];

/**
 * 获取对应格式的日期数据
 *
 * @param date        可供 moment 解析的日期字符串或 Date 实例
 * @param unit        与 moment 一致的时间单位字符串
 * @returns {string}  对应单位的日期数据
 */
export const getDatetime = (date, unit) => moment(date).get(unit);