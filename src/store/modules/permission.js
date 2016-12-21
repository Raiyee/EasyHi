import axios from 'axios'

import {ROLES, STAFFS} from '../constants'

import utils from 'utils'

const {VISITOR} = ROLES

const PARSE_PATH = 'PARSE_PATH'
const SET_ROLES = 'SET_ROLES'
const SET_CURRENT_ROLES = 'SET_CURRENT_ROLES'
const INITIALIZE = 'INITIALIZE'

const base = '/'

const INIT_STATE = {
  ctx: base,
  tcode: null,
  base
}

Object.assign(utils, INIT_STATE)

const state = Object.assign({
  roles: [VISITOR],
  currentRole: VISITOR,
  initialized: false
}, INIT_STATE)

const getters = {
  ctx: state => state.ctx,
  tcode: state => state.tcode,
  base: state => state.base,
  roles: state => state.roles,
  currentRole: state => state.currentRole,
  isStaff: state => STAFFS.includes(state.currentRole),
  initialized: state => state.initialized
}

const actions = {
  parsePath({commit}, path) {
    if (!path.startsWith(CONTEXT)) return

    const tcode = path.split('/').splice(1, 2)[1] || ''

    commit(PARSE_PATH, {
      ctx: CONTEXT,
      tcode,
      base: CONTEXT + '/' + tcode
    })
  },
  initialize({commit}, payload) {
    if (state.initialized) return

    return axios.post('/initialize', payload)
      .then(({data: {error}}) => {
        if (error) return Promise.reject(error)

        commit(INITIALIZE, true)
      })
  },
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
  [PARSE_PATH](state, payload) {
    Object.assign(state, payload)
    Object.assign(utils, payload)
  },
  [INITIALIZE](state) {
    state.initialized = true
  },
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
