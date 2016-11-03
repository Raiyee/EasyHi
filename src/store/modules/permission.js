import {ROLES, STAFFS} from '../constants'

const {VISITOR} = ROLES

const SET_ROLES = 'SET_ROLES'
const SET_CURRENT_ROLES = 'SET_CURRENT_ROLES'

const state = {
  roles: [VISITOR],
  currentRole: VISITOR
}

const getters = {
  roles: state => state.roles,
  currentRole: state => state.currentRole,
  isStaff: state => STAFFS.includes(state.currentRole)
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
  }
}

const mutations = {
  [SET_ROLES](state, roles) {
    state.roles = roles
  },
  [SET_CURRENT_ROLES](state, currentRole) {
    state.currentRole = currentRole
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
