import {isArrayLike, isArrayLikeObject} from 'utils/array'

describe('utils-array-isArrayLike', () => {
  it('should return true when passing an array or an argument or really arrayLike-object', () => {
    expect(isArrayLike([])).to.equal(true)
    expect(isArrayLike(arguments)).to.equal(true)
    expect(isArrayLike({length: 2})).to.equal(true)
  })

  it('should return false when passing a common object or function .etc', function () {
    expect(isArrayLike({})).to.equal(false)
    expect(isArrayLike(isArrayLike)).to.equal(false)
    expect(isArrayLike({length: 0.1})).to.equal(false)
  })
})

describe('utils-array-isArrayLike', () => {
  it('should return true when passing `argument`', function () {
    expect(isArrayLike(arguments)).to.equal(true)
  })
})
