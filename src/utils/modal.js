import Vue from 'vue'

const MODAL = System.import('../components/HiModal/CommonPrompt')

const MODAL_OPTIONS = {
  backdrop: true,
  show: true,
  destroy: true
}

const MODAL_PROPS = {
  header: '头部信息',
  footer: true,
  tipText: '系统消息',
  confirmText: '确定',
  cancelText: '取消',
  isTip: false,
  isToast: false,
  timeout: 2000,
  transition: 'bounce',
  cancel() {},
  confirm() {},
  remove() {}
}

let mergeProps = (options) => Object.assign({}, MODAL_PROPS, options, {id: 'common-prompt'})

export const confirmOn = (options) => {
  return Vue.prototype.$modal.open({
    component: MODAL,
    options: MODAL_OPTIONS,
    props: mergeProps(options)
  })
}

export const tipOn = (options) => {
  return Vue.prototype.$modal.open({
    component: MODAL,
    options: MODAL_OPTIONS,
    props: Object.assign({}, mergeProps(options), {isTip: true})
  })
}

export const toastOn = (options) => {
  return Vue.prototype.$modal.open({
    component: MODAL,
    options: MODAL_OPTIONS,
    props: Object.assign({}, mergeProps(options), {isToast: true})
  })
}
