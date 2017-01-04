import {prototype as vueProp} from 'vue'

import {isString} from './base'
import {TIP_ID} from './constants'

export const closeModal = id => vueProp.$modal.close(id)

const DEFAULT_PROPS = {
  backdrop: true,
  show: true,
  destroy: true
};

// do not change the order of array because the index is used to the type of PromptModal!
['toast', 'alert', 'confirm', 'prompt'].forEach((value, type) => {
  module.exports[value] = props => vueProp.$modal.open({
    id: TIP_ID,
    component: System.import('components/HiModal/TipModal'),
    options: DEFAULT_PROPS,
    props: {
      cancelText: '取消',
      confirmText: '确定',
      tipText: '系统消息',
      transition: true,
      ...isString(props) ? {
        tipText: props,
        confirm() {
          closeModal(TIP_ID)
        }
      } : props,
      type
    }
  })
})

export const login = () => {
  vueProp.$modal.open({
    component: System.import('components/HiModal/LoginModal'),
    options: DEFAULT_PROPS,
    props: {
      transition: true
    }
  })
}
