import {isNaN, toNum} from 'utils/number'

describe('utils-number', () => {
  it('`NaN` is NaN but string is not', () => {
    expect(isNaN(NaN)).to.equal(true)
    expect(isNaN('a')).to.equal(false)
  })

  it('should give a filtered number from string', () => {
    expect(toNum()).to.equal(0)
    expect(toNum('-123abc456def')).to.equal(-123456)
    expect(toNum('123abc.456def')).to.equal(123.456)
  })
})
