import App from 'views/App'

describe('App', () => {
  it('should mount app correctly', () => {
    App.beforeCreate = function () {
      this.$route.meta.keepAlive = false
    }

    const app = new Vue({
      ...App,
      store,
      router
    }).$mount()
    expect(app.transition).to.equal('bounce')
    expect(app.keepAlive).to.equal(false)
  })
})
