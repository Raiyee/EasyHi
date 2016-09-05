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
    state.toasts.$remove(payload)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
