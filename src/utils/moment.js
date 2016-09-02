import _moment from 'moment';

const moment = (first, ...rest) => _moment(first || [], ...rest);

import {DATE_FORMAT, isoWeekdays} from './constants';

export const dayOfWeek = (date, dayOfWeek, format = true) => {
  const mDate = moment(date).isoWeekday(dayOfWeek);
  return format ? mDate.format(DATE_FORMAT) : mDate;
};

/**
 * 获取当周第一天日期
 *
 * @param date        日期值
 * @param format      是否将日期格式化, 否则返回 moment 实例
 * @returns {string}  当周第一天日期字符串
 */
export const firstDayOfWeek = (date, format) => dayOfWeek(date, 1, format);

/**
 * 获取当周最后一天日期
 *
 * @param date        日期值
 * @param format      是否将日期格式化, 否则返回 moment 实例
 * @returns {string}  当周最后一天日期字符串
 */
export const lastDayOfWeek = (date, format) => dayOfWeek(date, 7, format);

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
 * @param date        可供 moment 解析的日期值
 * @param unit        与 moment 一致的时间单位字符串
 * @returns {string}  对应单位的日期数据
 */
export const getDatetime = (date, unit) => moment(date).get(unit);

/**
 * 格式化日期字符串
 *
 * @param date        可供 moment 解析的日期值
 * @param format      与 moment 一致的格式化参数
 */
export const formatDate = (date, format) => moment(date).format(format);

export const weekdays = date => {
  const monday = firstDayOfWeek(date, false);
  return new Array(7).fill(0).map((date, index) => monday.add(+!!index, 'd').format(DATE_FORMAT));
};
