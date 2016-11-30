// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

var spec01 = require('./1.spec')
var spec02 = require('./2.spec')

module.exports = {
  'default e2e tests': function (browser) {
    spec01(browser)
    spec02(browser)
  }
}
