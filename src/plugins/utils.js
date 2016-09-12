import Vue from 'vue'

export const inject = (context, type) => {
  const values = context.keys().reduce((values, key) => Object.assign(values, context(key)), {})
  Object.keys(values).forEach(key => Vue[type](key, values[key]))
  return values
}
