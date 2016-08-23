const SET_SIZE = 'SET_SIZE';

const state = {
  height: 0,
  width: 0,
  rem: 1
};

const getters = {
  height: state => state.height,
  width: state => state.width,
  rem: state => state.rem
};

const actions = {
  setSize({commit}, size) {
    commit(SET_SIZE, size);
  }
};

const mutations = {
  [SET_SIZE](state, payload) {
    Object.assign(state, payload);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
