import {reverse, isEmptyStr} from 'utils/string'

describe('utils-string', () => {
  it('should reverse string', () => {
    expect(reverse('abcdefg')).to.equal('gfedcba')
  })

  it('should return true when passing a tab', () => {
    expect(isEmptyStr('\t')).to.equal(true)
  })
})
