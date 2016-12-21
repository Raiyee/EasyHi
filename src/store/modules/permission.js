import HTTP from 'http'

import {ROLES, STAFFS} from '../constants'

const {VISITOR} = ROLES

const SET_ROLES = 'SET_ROLES'
const SET_CURRENT_ROLES = 'SET_CURRENT_ROLES'
const INITIALIZE = 'INITIALIZE'

const state = {
  roles: [VISITOR],
  currentRole: VISITOR,
  initialized: false
}

const getters = {
  roles: state => state.roles,
  currentRole: state => state.currentRole,
  isStaff: state => STAFFS.includes(state.currentRole),
  initialized: state => state.initialized
}

const actions = {
  setRoles({commit}, roles = [VISITOR]) {
    commit(SET_ROLES, roles)
  },
  setCurrentRole({commit}, currentRole = VISITOR) {
    commit(SET_CURRENT_ROLES, currentRole)
  },
  resetRole({dispatch}, {roles, currentRole} = {}) {
    dispatch('setRoles', roles)
    dispatch('setCurrentRole', currentRole)
  },
  initialize({commit}, payload) {
    if (state.initialized) return

    return HTTP.post('/initialize', payload)
      .then(({data: {error}}) => {
        if (error) return Promise.reject(error)

        commit(INITIALIZE, true)
      })
  }
}

const mutations = {
  [SET_ROLES](state, roles) {
    state.roles = roles
  },
  [SET_CURRENT_ROLES](state, currentRole) {
    state.currentRole = currentRole
  },
  [INITIALIZE](state) {
    state.initialized = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
