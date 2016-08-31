const ADD_STATUSES = 'ADD_STATUSES';

const state = {
  statuses: []
};

const getters = {
  calendarStatus: state => state.statuses
};

const actions = {
  addStatuses({commit}, payload) {
    commit(ADD_STATUSES, payload);
  }
};

import {getWeekday} from 'utils/moment';

/**
 * 排期存在 4 种状态
 * 0 -> 无课
 * 1 -> 正常
 * 2 -> 订满
 * 3 -> 有课但已过期
 *
 * @param status      课程状态值, 可能为 0、1、2、3
 * @param date        日期字符串
 * @returns {string}  处理后的课程状态字符串
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

const mutations = {
  [ADD_STATUSES](state, payload) {
    state.statuses = payload.map(status => ({
      ...status,
      statusText: statusText(status.status)
    }));
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
