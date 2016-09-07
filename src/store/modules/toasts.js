const ADD_TOAST = 'ADD_TOAST'
const DELETE_TOAST = 'DELETE_TOAST'

const state = {
  toasts: []
}

const getters = {
  toasts: state => state.toasts
}

const actions = {
  addToast({commit}, toast) {
    if (typeof toast === 'string') {
      toast = {
        name: 'Error',
        message: toast
      }
    }
    toast._id = Date.now()
    commit(ADD_TOAST, toast)
    setTimeout(() => {
      commit(DELETE_TOAST, toast)
    }, toast.timeout || 3000)
  }
}

const mutations = {
  [ADD_TOAST](state, payload) {
    state.toasts.push(payload)
  },

  [DELETE_TOAST](state, payload) {
    const index = state.toasts.findIndex(toast => toast === payload)
    if (index !== -1) {
      state.toasts.splice(index, 1)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
