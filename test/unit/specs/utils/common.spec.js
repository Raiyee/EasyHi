import {pickObj, omitObj, pickArr, omitArr} from 'utils/common'

describe('utils-common-pickObj', () => {
  it('should return a new object when passing null', () => {
    expect(pickObj(null)).to.deep.equal({})
  })

  it('should pick keys from object', () => {
    expect(pickObj({x: 1, y: 2}, 'x')).to.deep.equal({
      x: 1
    })
  })
})

describe('utils-common-omitObj', () => {
  it('should omit keys from object', () => {
    expect(omitObj({x: 1, y: 2}, 'x')).to.deep.equal({
      y: 2
    })
  })
})

describe('utils-common-pickArr', () => {
  it('should return a new array when passing null', () => {
    expect(pickArr()).to.deep.equal([])
  })

  it('should pick a sub-array from array', () => {
    expect(pickArr([1, 2, 3], [1, 2])).to.deep.equal([2, 3])
  })
})

describe('utils-common-omitArr', () => {
  it('should omit indexes from array', () => {
    expect(omitArr([1, 2, 3], [1, 2])).to.deep.equal([1])
  })
})
