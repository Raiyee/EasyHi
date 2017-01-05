import {prototype as vueProp} from 'vue'

import {isString} from './base'
import {obj2Arr} from './common'
import {PICKER_ID, TIP_ID} from './constants'

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

export const picker = props => vueProp.$modal.open({
  id: PICKER_ID,
  component: System.import('components/HiModal/PickerModal'),
  options: DEFAULT_PROPS,
  props: {
    transition: true,
    ...props
  }
})

export const distPicker = props => System.import('components/HiPicker/districts').then(all => {
  const origProvinces = all[100000]
  const provinces = obj2Arr(origProvinces)

  const originCities = all[provinces[0].key]
  const cities = obj2Arr(originCities)

  const originDistricts = all[cities[0].key]
  const districts = obj2Arr(originDistricts)

  console.log(districts)

  return picker(Object.assign(props, {
    pickers: [
      {
        values: provinces
      },
      {
        values: cities
      },
      {
        values: districts
      }
    ]
  }))
})

export const login = () => vueProp.$modal.open({
  component: System.import('components/HiModal/LoginModal'),
  options: DEFAULT_PROPS,
  props: {
    transition: true
  }
})
