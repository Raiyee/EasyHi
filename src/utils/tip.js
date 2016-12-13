import Vue from 'vue'

import {isString} from './base'

export const closeModal = () => Vue.prototype.$modal.close();

// do not change the order of array because the index is used to the type of PromptModal!
['toast', 'alert', 'confirm', 'prompt'].forEach((value, type) => {
  module.exports[value] = props => Vue.prototype.$modal.open({
    component: System.import('components/HiModal/TipModal'),
    options: {
      backdrop: true,
      show: true,
      destroy: true
    },
    props: {
      cancelText: '取消',
      confirmText: '确定',
      tipText: '系统消息',
      transition: true,
      ...isString(props) ? {
        tipText: props,
        confirm: closeModal
      } : props,
      type
    }
  })
})
