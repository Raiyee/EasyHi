import {ROLES} from '../constants'

const SET_ROLES = 'SET_ROLES'

const state = {
  roles: [],
  ROLES
}

const getters = {
  roles: state => state.roles
}

const actions = {
  setRoles({commit}, roles = []) {
    commit(SET_ROLES, roles)
  }
}

const mutations = {
  [SET_ROLES](state, roles) {
    state.roles = roles
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
