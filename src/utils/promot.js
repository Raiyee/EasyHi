import Vue from 'vue'

['toast', 'tip', 'confirm', 'confirmReason'].forEach((value, type) => {
  module.exports[value] = props => Vue.prototype.$modal.open({
    component: System.import('../components/HiModal/PromptModal'),
    options: {
      backdrop: true,
      show: true,
      destroy: true
    },
    props: Object.assign({transition: true}, props, {type})
  })
})
