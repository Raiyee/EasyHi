import Vue, {prototype as vueProp} from 'vue'

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

export const regionPicker = props => System.import('components/HiPicker/regions').then(regions => {
  const CODE = 'code'
  const TEXT = 'text'

  const origProvinces = regions[100000]
  const provinces = obj2Arr(origProvinces, CODE, TEXT)

  let originCities = regions[provinces[0][CODE]]
  let cities = obj2Arr(originCities, CODE, TEXT)

  let originDistricts = regions[cities[0][CODE]]
  let districts = obj2Arr(originDistricts, CODE, TEXT)

  const pickers = [{
    valueKey: CODE,
    values: provinces
  }, {
    valueKey: CODE,
    values: cities
  }, {
    valueKey: CODE,
    values: districts
  }]

  return picker(Object.assign({}, props, {
    pickerReset: true,
    pickerDivider: false,
    pickers,
    pickerChanged(index, code) {
      if (index === 2) return

      switch (index) {
        case (0):
          originCities = regions[code]
          cities = obj2Arr(originCities, CODE, TEXT)

          pickers[1] = {
            valueKey: CODE,
            values: cities
          }

          originDistricts = regions[cities[0][CODE]]
          break
        case (1):
          originDistricts = regions[code]
          break
      }

      districts = obj2Arr(originDistricts, CODE, TEXT)

      this.changingIndex = index

      Vue.set(pickers, 2, {
        valueKey: CODE,
        values: districts
      })
    }
  }))
})

export const login = () => vueProp.$modal.open({
  component: System.import('components/HiModal/LoginModal'),
  options: DEFAULT_PROPS,
  props: {
    transition: true
  }
})
