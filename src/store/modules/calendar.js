const ADD_STATUSES = 'ADD_STATUSES';

const state = {
  statuses: []
};

const getters = {
  getStatuses: state => state.statuses
};

const actions = {
  addStatuses({commit}, payload) {
    commit(ADD_STATUSES, payload);
  }
};

const mutations = {
  ADD_STATUSES(state, payload) {
    state.statuses.push(payload);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
