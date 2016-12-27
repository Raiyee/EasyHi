export const reverse = str => str && str.split('').reverse().join('')

export const isEmptyStr = str => /^\s*$/.test(str)

export const upperCase = str => {
  if (!str) return str
  str = str.toString()
  return str.charAt(0).toUpperCase() + str.slice(1)
}
