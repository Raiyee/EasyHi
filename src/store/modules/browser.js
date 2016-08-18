const SET_HEIGHT = 'SET_HEIGHT';
const SET_WIDTH = 'SET_WIDTH';
const SET_SIZE = 'SET_SIZE';

const state = {
  height: 0,
  width: 0
};

const getters = {
  height: state => state.height,
  width: state => state.width
};

const actions = {
  setHeight({commit}, height) {
    commit(SET_HEIGHT, height);
  },
  setWidth({commit}, width) {
    commit(SET_WIDTH, width);
  },
  setSize({commit}, size) {
    commit(SET_SIZE, size);
  }
};

const mutations = {
  [SET_HEIGHT](state, payload) {
    state.height = payload;
  },
  [SET_WIDTH](state, payload) {
    state.width = payload;
  },
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
