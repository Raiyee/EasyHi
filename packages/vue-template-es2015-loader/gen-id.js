const hash = require('hash-sum')
const cache = Object.create(null)

module.exports = function genId(file) {
  return cache[file] || (cache[file] = hash(file))
}
