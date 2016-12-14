import Vue from 'vue'

import {isString} from './base'

export const closeModal = id => Vue.prototype.$modal.close(id)

export const TIP_ID = Symbol('tip');

// do not change the order of array because the index is used to the type of PromptModal!
['toast', 'alert', 'confirm', 'prompt'].forEach((value, type) => {
  module.exports[value] = props => Vue.prototype.$modal.open({
    id: TIP_ID,
    component: System.import('components/HiModal/TipModal'),
    options: {
      backdrop: true,
      show: true,
      destroy: true,
      preserve: true
    },
    props: {
      cancelText: '取消',
      confirmText: '确定',
      tipText: '系统消息',
      transition: true,
      ...isString(props) ? {
        tipText: props,
        confirm: () => closeModal(TIP_ID)
      } : props,
      type
    }
  })
})
