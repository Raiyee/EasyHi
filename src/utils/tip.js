import Vue from 'vue'

import {isString} from './base'
import {TIP_ID} from './constants'

// do not change the order of array because the index is used to the type of PromptModal!
['toast', 'alert', 'confirm', 'prompt'].forEach((value, type) => {
  module.exports[value] = props => Vue.prototype.$modal.open({
    id: TIP_ID,
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
        confirm: () => Vue.prototype.$modal.close(TIP_ID)
      } : props,
      type
    }
  })
})
