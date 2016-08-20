import createPersist from 'vuex-localstorage';

import {
  ONE_WEEK
} from '../constants';

const ENV_KEY = 'ENV_KEY';
const SET_ENV = 'SET_ENV';

const persist = createPersist(ENV_KEY, {
  authorized: false,
  mobile: null
}, {
  expires: ONE_WEEK
});

const state = persist.get();

const getters = {
  authorized: state => state.authorized,
  mobile: state => state.mobile
};

const actions = {
  setEnv({commit}, payload) {
    commit(SET_ENV, payload);
  }
};

const mutations = {
  [SET_ENV](state, payload) {
    Object.assign(state, payload);
    persist.set(state);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
