module.exports = function (browser) {
  browser
    .setWindowPosition(0, 0)
    .frameParent()
    .resizeWindow(375, 667)
    .url('http://local.1stg.me:3000/#/')
    .waitForElementVisible('#app', 5000)
    .assert.elementPresent('body')
    .pause(1000)
}
