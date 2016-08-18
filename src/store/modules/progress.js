const SET_PROGRESS = 'SET_PROGRESS';

const state = {
  progress: 0
};

const getters = {
  progress: state => state.progress
};

const actions = {
  setProgress({commit}, progress) {
    commit(SET_PROGRESS, progress);
    progress === 100 && setTimeout(() => {
      commit(SET_PROGRESS, 0);
    }, 500);
  }
};

const mutations = {
  [SET_PROGRESS](state, payload) {
    state.progress = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
