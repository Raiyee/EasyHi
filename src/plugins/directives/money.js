import {isBlankStr, on, off, toNum, error, MAX_MONEY} from 'utils'

export default {
  bind(el, {expression}, {context}) {
    if (el.tagName.toLowerCase() !== 'input') return error('v-money should only used on input element')

    el.type = 'number'
    el.value = context[expression]

    on(el, 'focus', el.focus = () => {
      setTimeout(() => {
        el.type = 'text'
      }, 500)
      el.inputing = true
    })

    on(el, 'blur', el.blur = () => {
      const money = el.value
      el.type = 'number'
      el.value = isBlankStr(money) ? '' : +money
      el.inputing = false
      delete el.inputing
    })

    on(el, 'input', el.input = () => {
      let money = el.value
      let moneyNum = toNum(money, false)

      const length = money.length

      if (money.startsWith('0') && length === 2) {
        const second = money[1]
        second === '.' || (el.value = +second)
      } else {
        moneyNum = isBlankStr(moneyNum) ? '' : ~~(+(moneyNum * 100).toFixed(0)) / 100

        if (moneyNum > MAX_MONEY) {
          moneyNum = moneyNum.toString().substr(0, 6)
          moneyNum = moneyNum > MAX_MONEY ? +moneyNum.substr(0, 5) : +moneyNum
        } else {
          const pointIndex = money.indexOf('.')
          if (pointIndex + 1 && pointIndex + 3 < length) {
            money = el.value = money.substr(0, pointIndex + 3)
          }
        }
        +money === moneyNum || (money = el.value = moneyNum)
      }

      context[expression] = isBlankStr(money) ? '' : +money
    })

    context.$watch(expression, value => {
      if (el.inputing) return
      el.value = value
    })
  },
  unbind(el) {
    off(el, 'focus', el.focus)
    off(el, 'blur', el.blur)
    off(el, 'input', el.input)
  }
}
