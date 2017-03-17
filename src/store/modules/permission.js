import {
  COACH, VISITOR, SERVICE, MERCHANT, ROLE_NAMES, ADMINS, STAFFS,
  STAFFS_SA, STAFFS_A, STAFFS_S, CONSUMERS
} from '../constants'

import utils, {generateGetters, isWechat, deleteItem, imgPath, setItems, DEFAULT_LOGO} from 'utils'

const PARSE_PATH = 'PARSE_PATH'
const SET_ROLES = 'SET_ROLES'
const SET_CURRENT_ROLES = 'SET_CURRENT_ROLES'
const SET_MOBILE = 'SET_MOBILE'
const INITIALIZE = 'INITIALIZE'
const TOGGLE_SUBSCRIBE_TYPE = 'TOGGLE_SUBSCRIBE_TYPE'
const TOGGLE_MENU_OPEN = 'TOGGLE_MENU_OPEN'
const TOGGLE_MENU_SHOW = 'TOGGLE_MENU_SHOW'
const TOGGLE_SKIN = 'TOGGLE_SKIN'

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

const isStatic = /\/yoga-system-res\//.test(OLD_SERVER_PREFIX)
const suffix = (isStatic ? '.html' : '') + (isWechat ? '?route=' : '#')

const state = Object.assign({
  mobile: null,
  authorized: false,
  coachAlias: ROLE_NAMES[COACH],
  roles: [VISITOR],
  currentRole: VISITOR,
  currentRoleName: ROLE_NAMES[VISITOR],
  menuOpen: false,
  menuShow: false,
  initialized: false,
  merchantName: null,
  merchantAddress: null,
  serviceMobile: null,
  theme: null,
  subscribeType: 0,
  oldServer: null,
  isEnterprise: false,
  isOnlinePayment: false,
  checkIn: false
}, INIT_STATE)

const getters = {
  ...generateGetters(['mobile', 'authorized', 'ctx', 'tcode', 'base', 'coachAlias', 'roles', 'currentRole',
    'isEnterprise', 'menuOpen', 'menuShow', 'initialized', 'subscribeType', 'oldServer', 'isOnlinePayment',
    'checkIn', 'merchantLogo', 'merchantName', 'merchantAddress', 'sceneUrlPrefix', 'serviceMobile',
    'style', 'theme', 'oauthUrlTemplate']),
  currRole: state => state.currentRole.toLowerCase(),
  currentRoleName: state => ROLE_NAMES[state.currentRole],
  isAdmin: state => ADMINS.includes(state.currentRole),
  isStaff: state => STAFFS.includes(state.currentRole),
  isStaffSA: state => STAFFS_SA.includes(state.currentRole),
  isStaffS: state => STAFFS_S.includes(state.currentRole),
  isStaffA: state => STAFFS_A.includes(state.currentRole),
  isConsumer: state => CONSUMERS.includes(state.currentRole),
  isMerchant: state => MERCHANT === state.currentRole,
  hasMerchantRole: state => state.roles.includes(MERCHANT),
  isService: state => SERVICE === state.currentRole,
  urlPrefix: state => state.oldServer + (getters.isStaff(state) ? 'merchant' : 'member') + suffix,
  hipayUrlPrefix: state => state.oldServer + 'hipay' + suffix,
  memberUrlPrefix: state => state.oldServer + 'member' + suffix,
  merchantUrlPrefix: state => state.oldServer + 'merchant' + suffix
}

const actions = {
  parsePath({commit}, path) {
    const isVision = path.startsWith(CONTEXT)
    const isSystem = path.startsWith(BASE_URL)

    if (!isVision && !isSystem) return

    if (isVision) {
      const tcode = path.split('/').splice(1, 2)[1] || ''

      commit(PARSE_PATH, {
        ctx: CONTEXT,
        tcode,
        base: CONTEXT + '/' + tcode
      })
    } else if (isSystem) {
      const tcode = path.split('/')[3] || ''

      commit(PARSE_PATH, {
        ctx: BASE_URL,
        tcode,
        base: BASE_URL + '/center/' + tcode + '/index/vision'
      })
    }
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
    __MOCK__ && mobile && setItems({mobile})
  },
  resetRole({dispatch}, {roles, currentRole, mobile} = {}) {
    dispatch('setRoles', roles)
    dispatch('setCurrentRole', currentRole)
    dispatch('setMobile', mobile)
    __MOCK__ && !mobile && deleteItem('mobile')
  },
  toggleMenuOpen({commit}, menuOpen) {
    commit(TOGGLE_MENU_OPEN, menuOpen)
  },
  toggleMenuShow({commit}, menuShow) {
    commit(TOGGLE_MENU_SHOW, menuShow)
  },
  toggleSkin({commit}, skin) {
    commit(TOGGLE_SKIN, skin)
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
  [INITIALIZE](state, {
                 checkIn, coachAlias, isEnterprise, isOnlinePayment, merchantLogo, merchantName, merchantAddress,
                 sceneUrlPrefix, serviceMobile, style, theme, oauthUrlTemplate
               }) {
    coachAlias && (ROLE_NAMES[COACH] = coachAlias) && (state.coachAlias = coachAlias)
    state.checkIn = checkIn
    state.initialized = true
    state.isEnterprise = isEnterprise
    state.isOnlinePayment = isOnlinePayment
    state.merchantName = merchantName
    state.merchantAddress = merchantAddress
    state.merchantLogo = imgPath(merchantLogo, DEFAULT_LOGO)
    state.sceneUrlPrefix = sceneUrlPrefix
    state.serviceMobile = serviceMobile
    state.style = style
    state.theme = theme
    state.oauthUrlTemplate = oauthUrlTemplate
    state.oldServer = OLD_SERVER_PREFIX + (isStatic ? `${__DEV__ ? 'dev' : 'product/default'}/modules/index/html/`
        : `${isWechat ? 'oauth/' : ''}center/${state.tcode}/index/`)
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
  },
  [TOGGLE_SKIN](state, {style, theme}) {
    state.style = style
    state.theme = theme
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
