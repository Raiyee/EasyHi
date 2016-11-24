import Vue from 'vue'

let modalOptions = {
  backdrop: true,
  transition: 'bounce',
  show: true,
  destroy: true
}

let mergeProps = (propOptions) => {
  return {
    modalHeader: propOptions.modalHeader || '头部信息',
    tipText: propOptions.tipText || '系统消息',
    confirmBtn: propOptions.confirmBtn || '确定',
    cancelBtn: propOptions.cancelBtn || '取消',
    afterConfirm: propOptions.afterConfirm,
    afterCancel: propOptions.afterCancel
  }
}
export const confirmOn = (options) => {
  return Vue.prototype.$modal.open({
    component: System.import('../views/_Modal/ConfirmModal'),
    options: Object.assign(modalOptions, options.options),
    props: mergeProps(options)
  })
}

export const tipOn = (options) => {
  return Vue.prototype.$modal.open({
    component: System.import('../views/_Modal/ConfirmModal'),
    options: Object.assign(modalOptions, options.options),
    props: Object.assign(mergeProps(options), {isTipModal: true})
  })
}

export const toastOn = (tipText, remove, timeoutMill) => {
  return Vue.prototype.$modal.open({
    component: System.import('../views/_Modal/ConfirmModal'),
    options: modalOptions,
    props: {
      tipText: tipText,
      isToastModal: true,
      timeoutMill: timeoutMill,
      remove: remove
    }
  })
}
