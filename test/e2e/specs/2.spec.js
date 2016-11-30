module.exports = function (browser) {
  browser
    .click('.member-menu div')
    .waitForElementVisible('.panel-body', 5000)
    .pause(1000)
    .click('.panel-body li')
}
