import {isArray, isFunction, isObjectLike, error, log, warn} from 'utils'

import * as validators from './validators'

let installed = false

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
    validation[ruleKey] = validator(...ruleVal).call(this, modelVal, model)
  }

  const vModel = this.$v[model]

  Object.assign(vModel, validation)

  vModel.$invalid = Object.values(validation).some(v => !v)
  vModel.$error = vModel.$dirty && vModel.$invalid
}

export default {
  install(Vue, options = {}) {
    if (installed) return error('do not try to install plugin v-validator twice!')

    installed = true

    log('plugin v-validator is installed!')

    Object.assign(validators, options.validators)

    const defineReactive = Vue.util.defineReactive

    Vue.mixin({
      beforeCreate() {
        let validator = this.$options.validator
        if (!validator) return

        if (isFunction(validator)) validator = validator.call(this)

        validator.rules || (validator = {rules: validator})

        let rules = validator.rules
        const auto = !!validator.auto

        if (!isObjectLike(rules)) return warn('rules of validator should be an object')

        defineReactive(this, '$v', {})
        defineReactive(this, '$e', {})

        for (const [model, rule] of Object.entries(rules)) {
          defineReactive(this.$v, model, {
            $dirty: auto,
            $error: false,
            $invalid: false
          })

          const vModel = this.$v[model]

          Object.assign(vModel, {
            $touch: () => {
              if (vModel.$dirty) return

              vModel.$dirty = true
              applyRule.call(this, model, rule)
            },
            $reset: () => {
              if (!vModel.$dirty) return

              vModel.$dirty = false
              applyRule.call(this, model, rule)
            }
          })

          Vue.nextTick(() => {
            this.$watch(model, () => {
              auto && (vModel.$dirty = true)
              applyRule.call(this, model, rule)
            })

            vModel[auto ? '$touch' : '$reset']()
          })
        }
      }
    })
  }
}
