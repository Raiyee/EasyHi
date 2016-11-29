import Vue from 'vue'

const MODAL = System.import('../components/HiModal/CommonPrompt')

for (const [key, value] of Object.entries({confirmOn: 0, tipOn: 1, toastOn: 2})) {
  module.exports[key] = props => Vue.prototype.$modal.open({
    component: MODAL,
    options: {
      backdrop: true,
      show: true,
      destroy: true
    },
    props: Object.assign({}, {
      tipText: '系统消息',
      confirmText: '确定',
      cancelText: '取消',
      transition: 'bounce'
    }, props, {
      header: false,
      footer: false,
      type: value
    })
  })
}
