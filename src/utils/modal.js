import {prototype as vueProp} from 'vue'
import moment from 'moment'

import {isString} from './base'
import {emptyArr} from './array'
import {isNumber} from './number'
import {leftPad} from './string'
import {obj2Arr} from './common'
import {jsonClone} from './json'
import {IS_ANDROID_TBS, PICKER_ID, TIP_ID} from './constants'
import {log} from './console'

export const openModal = modal => vueProp.$modal.open(modal)
export const closeModal = (id, destroy) => vueProp.$modal.close(id, destroy)
export const toggleModal = (id, show = true) => openModal({id, options: {show}})

const DEFAULT_OPTIONS = {
  backdrop: 'static',
  show: true,
  destroy: true
};

// do not change the order of array because the index is used to the type of PromptModal!
['toast', 'alert', 'confirm', 'prompt', 'illustrate'].forEach((value, type) => {
  module.exports[value] = props => vueProp.$modal.open({
    id: TIP_ID,
    component: import('components/HiModal/TipModal'),
    options: type < 4 ? DEFAULT_OPTIONS : {
      ...DEFAULT_OPTIONS,
      backdrop: true
    },
    props: {
      cancelText: '取消',
      confirmText: '确定',
      tipText: '系统消息',
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

export const picker = (props, options, id = PICKER_ID) => vueProp.$modal.open({
  id,
  component: import('components/HiModal/PickerModal'),
  options: Object.assign({}, DEFAULT_OPTIONS, options),
  props
})

export const regionPicker = (function () {
  const CODE = 'code'
  const TEXT = 'text'

  const getRegionIndex = (regions, originRegions, defaultRegion) => {
    let regionIndex = 0

    if (isNumber(defaultRegion) && regions[defaultRegion]) {
      regionIndex = defaultRegion
    } else if (originRegions[defaultRegion]) {
      // code in region object is key, so it is string, defaultCode could be a number or a string either
      regionIndex = regions.findIndex(region => +region[CODE] === +defaultRegion)
    } else if (defaultRegion) {
      regionIndex = regions.findIndex(region => region[TEXT] === defaultRegion)
    }

    return regionIndex + 1 && regionIndex
  }

  let timeout

  return (props, defaults = [], options) => import('components/HiPicker/regions-with-addon').then(regions => {
    isString(defaults) && (defaults = defaults.split(' '))

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

    return picker({
      ...props,
      pickers,
      pickerDivider: false,
      pickerMask: true,
      pickerChanged(index, code) {
        if (index === 2) return

        switch (index) {
          case (0):
            originCities = regions[code]
            cities = obj2Arr(originCities, CODE, TEXT)

            Object.assign(this.pickers[1], {
              values: cities,
              defaultIndex: 0
            })

            originDistricts = regions[cities[0][CODE]]
            break
          case (1):
            originDistricts = regions[code]
            break
        }

        districts = obj2Arr(originDistricts, CODE, TEXT)

        Object.assign(this.pickers[2], {
          values: districts,
          defaultIndex: 0
        })

        if (!IS_ANDROID_TBS) return

        clearTimeout(timeout)
        timeout = setTimeout(() => {
          log('hacking Android TBS!')
          const regionModal = vueProp.$modal.getModalRef(PICKER_ID).$el
          document.body.appendChild(regionModal)
          document.getElementById('modal').appendChild(regionModal)
        }, 0)
      }
    }, options)
  })
}())

export const datePicker = (function () {
  const date = new Date()
  const currYear = date.getFullYear()
  const currMonth = date.getMonth() + 1
  const currDate = date.getDate()

  const years = emptyArr(101).map((val, index) => currYear - 50 + index)
  const months = emptyArr(12).map((val, index) => leftPad(index + 1, 2, 0))

  const lastDate = (year, month) => moment().year(year).month(month).endOf('month').date()

  const generateDates = (year, month) =>
    emptyArr(lastDate(year, month - 1)).map((val, index) => leftPad(index + 1, 2, 0))

  const getDefaultIndex = (vals, def) => {
    const defIndex = vals.findIndex(val => +val === +def)
    return defIndex + 1 && defIndex
  }

  const getResult = ctx => [ctx.result[0][1], ctx.result[1][1], ctx.result[2][1]].join('-')

  return (props, defaults = [], options) => {
    defaults = defaults.length ? defaults : [currYear, currMonth, currDate]

    if (isString(defaults) && defaults.length) (defaults = defaults.split('-'))

    let year = defaults[0] || years[0]
    let month = defaults[1] || months[0]
    let dates = generateDates(year, month)

    const pickers = [{
      defaultIndex: getDefaultIndex(years, year),
      values: years
    }, {
      defaultIndex: getDefaultIndex(months, month),
      values: months
    }, {
      defaultIndex: getDefaultIndex(dates, defaults[2]),
      values: dates
    }]

    const {confirm, pickerTabs} = props

    let pickersIndex = 0
    const results = []
    let pickers2

    if (props.confirm) {
      props.confirm = function () {
        results.length || results.push(getResult(this))
        pickerTabs && results[0] && !results[1] && (results[1] = results[0])
        this::confirm(...results, ...arguments)
      }
    }

    return picker({
      ...props,
      pickers,
      pickerMask: true,
      pickerTabs: pickerTabs && {
        items: ['起始时间', '结束时间']
      },
      pickerChanged(index, currIndex, value) {
        const {pickerLists: pickers} = this

        switch (index) {
          case (0):
            year = value
            break
          case (1):
            month = value
            break
        }

        pickers[index].defaultIndex = currIndex

        if (index !== 2) {
          dates = generateDates(year, month)

          Object.assign(pickers[2], {
            values: dates,
            defaultIndex: Math.min(this.resulting[2][0], dates.length - 1)
          })
        }

        results[pickersIndex] = getResult(this)
      },
      tabChanged(index) {
        results[0] || (results[0] = getResult(this))
        pickersIndex = index
        this.pickerLists = index ? (pickers2 || (pickers2 = jsonClone(pickers))) : pickers
      }
    }, options)
  }
}())

export const timePicker = (function () {
  const hours = emptyArr(24).map((val, index) => leftPad(index, 2, 0))
  const minutes = emptyArr(60).map((val, index) => leftPad(index, 2, 0))

  const getResult = ctx => [ctx.result[0][1], ctx.result[1][1]].join(':')

  return (props, defaults) => {
    const pickers = [{
      values: hours,
      textAlign: 'center'
    }, {
      values: minutes,
      textAlign: 'center'
    }]

    const {confirm, pickerTabs} = props

    let pickersIndex = 0
    const results = []
    let pickers2

    if (props.confirm) {
      props.confirm = function () {
        results.length || results.push(getResult(this))
        pickerTabs && results[0] && !results[1] && (results[1] = results[0])
        this::confirm(...results, ...arguments)
      }
    }

    return picker({
      ...props,
      pickers,
      pickerMask: true,
      pickerTabs: pickerTabs && {
        items: ['起始时间', '结束时间']
      },
      pickerChanged(index, currIndex, value) {
        const {pickerLists: pickers} = this

        pickers[index].defaultIndex = currIndex

        if (index !== 1) {
          Object.assign(pickers[1], {
            defaultIndex: this.resulting[1][0]
          })
        }

        results[pickersIndex] = getResult(this)
      },
      tabChanged(index) {
        results[0] || (results[0] = getResult(this))
        pickersIndex = index
        this.pickerLists = index ? (pickers2 || (pickers2 = jsonClone(pickers))) : pickers
      }
    })
  }
}())

export const login = props => vueProp.$modal.open({
  id: 'login',
  component: import('components/HiModal/LoginModal'),
  options: DEFAULT_OPTIONS,
  props
})
