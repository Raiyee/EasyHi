import {ROLES, ROLE_NAMES, STAFFS} from '../constants'

import utils, {MENU_TYPES, MEMBER_MEMBER} from 'utils'

const {COACH, VISITOR, MANAGER, SERVICE, MERCHANT} = ROLES

const PARSE_PATH = 'PARSE_PATH'
const SET_ROLES = 'SET_ROLES'
const SET_CURRENT_ROLES = 'SET_CURRENT_ROLES'
const SET_MENU_TYPE = 'SET_MENU_TYPE'
const INITIALIZE = 'INITIALIZE'
const SET_MENU_OPEN = 'SET_MENU_OPEN'
const SET_MENU_SHOW = 'SET_MENU_SHOW'

const base = '/'

const INIT_STATE = {
  ctx: base,
  tcode: null,
  base
}

Object.assign(utils, INIT_STATE)

let isStatic

const state = Object.assign({
  roles: [VISITOR],
  currentRole: VISITOR,
  currentRoleName: ROLE_NAMES[VISITOR],
  isAdmin: false,
  menuType: MENU_TYPES[MEMBER_MEMBER],
  menuOpen: true,
  menuShow: true,
  initialized: false,
  merchantName: null,
  oldServer: null
}, INIT_STATE)

const getters = {
  ctx: state => state.ctx,
  tcode: state => state.tcode,
  base: state => state.base,
  roles: state => state.roles,
  currentRole: state => state.currentRole,
  currentRoleName: state => ROLE_NAMES[state.currentRole],
  isStaff: state => STAFFS.includes(state.currentRole),
  isAdmin: state => [MERCHANT, MANAGER, SERVICE].includes(state.currentRole),
  menuType: state => state.menuType,
  menuOpen: state => state.menuOpen,
  menuShow: state => state.menuShow,
  initialized: state => state.initialized,
  oldServer: state => state.oldServer,
  urlPrefix: state => state.oldServer + (getters.isStaff(state) ? 'merchant' : 'member') + `${isStatic ? '.html' : ''}#`
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
  setMenuType({commit}, menuType) {
    commit(SET_MENU_TYPE, menuType)
  },
  setMenuOpen({commit}, menuOpen) {
    commit(SET_MENU_OPEN, menuOpen)
  },
  setMenuShow({commit}, menuShow) {
    commit(SET_MENU_SHOW, menuShow)
  }
}

const mutations = {
  [PARSE_PATH](state, payload) {
    Object.assign(state, payload)
    Object.assign(utils, payload)
  },
  [INITIALIZE](state, {coachAlias, merchantName}) {
    coachAlias && (ROLE_NAMES[COACH] = coachAlias)
    state.initialized = true
    state.merchantName = merchantName
    isStatic = /\/yoga-system-res\//.test(OLD_SERVER_PREFIX)
    state.oldServer = OLD_SERVER_PREFIX + (isStatic ? 'dev/modules/index/html/' : `center/${state.tcode}/index/`)
  },
  [SET_ROLES](state, roles) {
    state.roles = roles
  },
  [SET_CURRENT_ROLES](state, currentRole) {
    state.currentRole = currentRole
    state.currentRoleName = ROLE_NAMES[currentRole]
  },
  [SET_MENU_TYPE](state, menuType) {
    state.menuType = menuType
  },
  [SET_MENU_OPEN](state, menuOpen) {
    state.menuOpen = menuOpen
  },
  [SET_MENU_SHOW](state, menuShow) {
    state.menuShow = menuShow
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
