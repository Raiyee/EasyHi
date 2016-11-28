import Vue from 'vue'

const MODAL = System.import('../components/HiModal/CommonPrompt')

const MODAL_OPTIONS = {
  backdrop: true,
  show: true,
  destroy: true
}

const MODAL_PROPS = {
  header: false,
  footer: false,
  tipText: '系统消息',
  confirmText: '确定',
  cancelText: '取消',
  type: 0,
  timeout: 2000,
  transition: 'bounce'
}

const mergeObject = (o1, o2) => ({
  component: MODAL,
  options: MODAL_OPTIONS,
  props: Object.assign({}, MODAL_PROPS, o1, o2)
})

export const confirmOn = props => Vue.prototype.$modal.open(mergeObject(props))

export const tipOn = props => Vue.prototype.$modal.open(mergeObject(props, {type: 1}))

export const toastOn = props => Vue.prototype.$modal.open(mergeObject(props, {type: 2}))
