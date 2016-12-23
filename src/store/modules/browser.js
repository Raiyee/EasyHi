const SET_SIZE = 'SET_SIZE'

const state = {
  baseWidth: 375,
  baseFontSize: 16,
  winHeight: 0,
  winWidth: 0,
  rem: 1,
  fontSize: 16,
  logicWidth: 375,
  threshold: 768,
  mode: true
}

const getters = {
  baseWidth: state => state.baseWidth,
  baseFontSize: state => state.baseFontSize,
  winHeight: state => state.winHeight,
  winWidth: state => state.winWidth,
  rem: state => state.rem,
  fontSize: state => state.fontSize,
  logicWidth: state => state.logicWidth,
  threshold: state => state.threshold,
  mode: state => state.mode
}

const actions = {
  setSize({commit}, size) {
    const {winWidth} = size
    const baseWidth = state.baseWidth
    const mode = size.mode = winWidth < state.threshold
    let logicWidth
    size.rem = (logicWidth = size.logicWidth =
        mode ? winWidth : baseWidth) / baseWidth
    size.fontSize = logicWidth * state.baseFontSize / baseWidth
    commit(SET_SIZE, size)
  }
}

const mutations = {
  [SET_SIZE](state, size) {
    Object.assign(state, size)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
