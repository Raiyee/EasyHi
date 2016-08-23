import moment from 'moment';

import {isoWeekdays} from 'utils/constants';

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
export const statusText = (status, date) => {
  switch (status) {
    case (0):
      return '无课';
    case (2):
      return '订满';
  }
  return isoWeekdays[moment(date).isoWeekday() - 1];
};
