import Login from 'views/Login'

describe('Login', () => {
  it('should mount correctly', () => {
    const login = new Vue({
      ...Login,
      store
    }).$mount()

    login.clearMobile()
    expect(login.loginMobile).to.equal(null)

    login.submit()
  })
})
