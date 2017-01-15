import {COACH, VISITOR, SERVICE, MERCHANT, ROLE_NAMES, ADMINS, STAFFS, CONSUMERS} from '../constants'

import utils, {generateGetters} from 'utils'

const PARSE_PATH = 'PARSE_PATH'
const SET_ROLES = 'SET_ROLES'
const SET_CURRENT_ROLES = 'SET_CURRENT_ROLES'
const SET_MOBILE = 'SET_MOBILE'
const INITIALIZE = 'INITIALIZE'
const TOGGLE_SUBSCRIBE_TYPE = 'TOGGLE_SUBSCRIBE_TYPE'
const TOGGLE_MENU_OPEN = 'TOGGLE_MENU_OPEN'
const TOGGLE_MENU_SHOW = 'TOGGLE_MENU_SHOW'

let base = ''

const INIT_STATE = {
  ctx: base,
  tcode: null,
  base
}

Object.assign(utils, INIT_STATE, {
  replaceRoute(route) {
    history.replaceState(null, null, '#' + route)
  }
})

const state = Object.assign({
  mobile: null,
  authorized: false,
  coachAlias: ROLE_NAMES[COACH],
  roles: [VISITOR],
  currentRole: VISITOR,
  currentRoleName: ROLE_NAMES[VISITOR],
  isEnterprise: false,
  menuOpen: false,
  menuShow: false,
  initialized: false,
  merchantName: null,
  subscribeType: 0,
  oldServer: null,
  isOnlinePayment: false,
  checkIn: 0
}, INIT_STATE)

const getters = {
  ...generateGetters(['mobile', 'authorized', 'ctx', 'tcode', 'base',
    'coachAlias', 'roles', 'currentRole', 'isEnterprise', 'menuOpen', 'menuShow',
    'initialized', 'subscribeType', 'oldServer', 'isOnlinePayment', 'checkIn']),
  currRole: state => state.currentRole.toLowerCase(),
  currentRoleName: state => ROLE_NAMES[state.currentRole],
  isAdmin: state => ADMINS.includes(state.currentRole),
  isStaff: state => STAFFS.includes(state.currentRole),
  isConsumer: state => CONSUMERS.includes(state.currentRole),
  isMerchant: state => MERCHANT === state.currentRole,
  isService: state => SERVICE === state.currentRole
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
    commit(INITIALIZE, payload)
  },
  toggleSubscribeType({commit}, subscribeType) {
    commit(TOGGLE_SUBSCRIBE_TYPE, subscribeType)
  },
  setRoles({commit}, roles = [VISITOR]) {
    commit(SET_ROLES, roles)
  },
  setCurrentRole({commit}, currentRole = VISITOR) {
    commit(SET_CURRENT_ROLES, currentRole)
  },
  setMobile({commit}, mobile) {
    commit(SET_MOBILE, mobile)
  },
  resetRole({dispatch}, {roles, currentRole, mobile} = {}) {
    dispatch('setRoles', roles)
    dispatch('setCurrentRole', currentRole)
    dispatch('setMobile', mobile)
  },
  toggleMenuOpen({commit}, menuOpen) {
    commit(TOGGLE_MENU_OPEN, menuOpen)
  },
  toggleMenuShow({commit}, menuShow) {
    commit(TOGGLE_MENU_SHOW, menuShow)
  }
}

const mutations = {
  [PARSE_PATH](state, payload) {
    base = payload.base
    Object.assign(state, payload)
    Object.assign(utils, payload)
  },
  [SET_MOBILE](state, mobile) {
    state.authorized = !!(state.mobile = mobile)
  },
  [INITIALIZE](state, {coachAlias, isEnterprise, isOnlinePayment, merchantName, checkIn}) {
    coachAlias && (ROLE_NAMES[COACH] = coachAlias) && (state.coachAlias = coachAlias)
    state.initialized = true
    state.isEnterprise = isEnterprise
    state.isOnlinePayment = isOnlinePayment
    state.merchantName = merchantName
    state.checkIn = checkIn
  },
  [TOGGLE_SUBSCRIBE_TYPE](state, subscribeType) {
    state.subscribeType = subscribeType
  },
  [SET_ROLES](state, roles) {
    state.roles = roles
  },
  [SET_CURRENT_ROLES](state, currentRole) {
    state.currentRole = currentRole
    state.currentRoleName = ROLE_NAMES[currentRole]
  },
  [TOGGLE_MENU_OPEN](state, menuOpen) {
    state.menuOpen = menuOpen
  },
  [TOGGLE_MENU_SHOW](state, menuShow) {
    state.menuShow = menuShow
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
