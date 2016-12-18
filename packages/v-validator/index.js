import {isArray, isFunction, isObjectLike, error, log, warn} from 'utils'

import * as validators from './validators'

let installed = false

export default {
  install(Vue, options = {}) {
    if (installed) return error('do not try to install plugin v-validator twice!')

    installed = true

    log('plugin v-validator is installed!')

    Object.assign(validators, options.validators)

    const defineReactive = Vue.util.defineReactive

    const applyRule = function (model, rule) {
      const modelVal = this[model]
      const validation = {}
      for (let [ruleKey, ruleVal] of Object.entries(rule)) {
        if (isFunction(ruleVal)) {
          validation[ruleKey] = ruleVal.call(this, modelVal)
          continue
        }

        const validator = validators[ruleKey]

        if (!isFunction(validator)) {
          warn(`there is no validator named ${ruleKey}, it will be ignored!`)
          continue
        }

        ruleVal = isArray(ruleVal) ? ruleVal : [ruleVal]
        validation[ruleKey] = validator(...ruleVal).call(this, modelVal)
      }

      const vModel = this.$v[model]

      Object.assign(vModel, validation)

      vModel.$invalid = Object.values(validation).some(v => !v)
      vModel.$error = vModel.$dirty && vModel.$invalid
    }

    Vue.mixin({
      beforeCreate() {
        let validator = this.$options.validator
        if (!validator) return

        validator.rules || (validator = {rules: validator})

        let rules = validator.rules

        if (isFunction(rules)) rules = rules.call(this)
        if (!isObjectLike(rules)) return warn('rules of validator should be an object')

        defineReactive(this, '$v', {})
        defineReactive(this, '$e', {})

        for (const [model, rule] of Object.entries(rules)) {
          defineReactive(this.$v, model, {
            $dirty: !!validator.auto,
            $error: false,
            $invalid: false
          })

          Vue.nextTick(() => {
            this.$watch(model, () => {
              this.$v[model].$dirty = true
              applyRule.call(this, model, rule)
            })

            applyRule.call(this, model, rule)
          })
        }
      }
    })
  }
}
