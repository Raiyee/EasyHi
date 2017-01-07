import Vue, {prototype as vueProp} from 'vue'

import {isObject, isString} from './base'
import {isNumber} from './number'
import {obj2Arr} from './common'
import {IS_ANDROID_TBS, PICKER_ID, REGION_PICKER_ID, TIP_ID} from './constants'
import {log} from './console'

export const closeModal = (id, destroy) => vueProp.$modal.close(id, destroy)

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

export const picker = (props, options, id) => vueProp.$modal.open({
  id: id || PICKER_ID,
  component: System.import('components/HiModal/PickerModal'),
  options: Object.assign({}, DEFAULT_PROPS, options),
  props: {
    transition: true,
    ...props
  }
})

export const regionPicker = (function () {
  const CODE = 'code'
  const TEXT = 'text'
  const NOT_DESTROY = {destroy: false}

  const getRegionIndex = (regions, originRegions, defaultRegion) => {
    if (!isObject(defaultRegion)) return 0

    let regionIndex = 0

    const {defaultIndex, defaultCode, defaultText} = defaultRegion

    if (isNumber(defaultIndex) && regions[defaultIndex]) {
      regionIndex = defaultIndex
    } else if (originRegions[defaultCode]) {
      // code in region object is key, so it is string, defaultCode could be a number or a string either
      regionIndex = regions.findIndex(region => +region[CODE] === +defaultCode)
    } else if (defaultText) {
      regionIndex = regions.findIndex(region => region[TEXT] === defaultText)
    }

    return regionIndex >= 0 ? regionIndex : 0
  }

  const modalIndex = () => vueProp.$modal.getModalIndex(REGION_PICKER_ID)

  let timeout

  return (props, defaults = []) => System.import('components/HiPicker/regions').then(regions => {
    if (modalIndex() >= 0) return picker(null, NOT_DESTROY, REGION_PICKER_ID)

    const origProvinces = regions[100000]
    const provinces = obj2Arr(origProvinces, CODE, TEXT)
    const provinceIndex = getRegionIndex(provinces, origProvinces, defaults[0])

    let originCities = regions[provinces[provinceIndex][CODE]]
    let cities = obj2Arr(originCities, CODE, TEXT)
    const cityIndex = getRegionIndex(cities, originCities, defaults[1])

    let originDistricts = regions[cities[cityIndex][CODE]]
    let districts = obj2Arr(originDistricts, CODE, TEXT)
    const districtIndex = getRegionIndex(districts, originDistricts, defaults[2])

    const pickers = [{
      valueKey: CODE,
      values: provinces,
      defaultIndex: provinceIndex
    }, {
      valueKey: CODE,
      values: cities,
      defaultIndex: cityIndex
    }, {
      valueKey: CODE,
      values: districts,
      defaultIndex: districtIndex
    }]

    return picker(Object.assign({}, props, {
      pickerDivider: false,
      pickers,
      pickerChanged(index, code) {
        if (index === 2) return

        switch (index) {
          case (0):
            originCities = regions[code]
            cities = obj2Arr(originCities, CODE, TEXT)

            Vue.set(pickers, 1, {
              valueKey: CODE,
              values: cities
            })

            originDistricts = regions[cities[0][CODE]]
            break
          case (1):
            originDistricts = regions[code]
            break
        }

        districts = obj2Arr(originDistricts, CODE, TEXT)

        Vue.set(pickers, 2, {
          valueKey: CODE,
          values: districts
        })

        if (!IS_ANDROID_TBS) return

        clearTimeout(timeout)
        timeout = setTimeout(() => {
          log('hacking Android TBS!')
          const regionModal = vueProp.$modal.$refs.modal[modalIndex()].$el
          document.body.appendChild(regionModal)
          document.getElementById('modal').appendChild(regionModal)
        }, 0)
      },
      confirm() {
        this.changingIndex = null
        props.confirm && props.confirm.apply(this, arguments)
      }
    }), NOT_DESTROY, REGION_PICKER_ID)
  })
}())

export const login = () => vueProp.$modal.open({
  component: System.import('components/HiModal/LoginModal'),
  options: DEFAULT_PROPS,
  props: {
    transition: true
  }
})
