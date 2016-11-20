import {isPromise} from 'utils'

const ADD_MODAL = 'ADD_MODAL'
const CLEAR_MODAL = 'CLEAR_MODAL'

const state = {
  modalIds: []
}

const getters = {
  modalIds: state => state.modalIds
}

const actions = {
  addModal({commit}, ...args) {
    commit(ADD_MODAL, ...args)
  },
  clearModal({commit}) {
    commit(CLEAR_MODAL)
  }
}

const mutations = {
  [ADD_MODAL](state, payload) {
    state.modalIds.push(payload)
  },
  [CLEAR_MODAL](state) {
    state.modalIds = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
