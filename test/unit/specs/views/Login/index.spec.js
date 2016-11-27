import Login from 'views/Login'

describe('Login', () => {
  it('should mount correctly', () => {
    const login = new Vue({
      ...Login,
      store
    }).$mount()

    login.handleInput('mobile', {
      target: {value: '1234567891011'}
    })

    login.handleInput('verificationCode', {
      target: {value: '1234567891011'}
    })

    expect(login.loginMobile).to.equal('12345678910')
    expect(login.verificationCode).to.equal('123456')
    expect(login.mobileError).to.equal(false)
    expect(login.codeError).to.equal(false)

    login.clearMobile()
    expect(login.loginMobile).to.equal(null)

    login.submit()
    expect(login.submitClicked).to.equal(true)
    expect(login.mobileError).to.equal(true)

    login.handleInput('mobile', {
      target: {value: '18888888888'}
    })
  })
})
