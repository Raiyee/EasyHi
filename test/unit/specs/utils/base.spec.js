import {trueType} from 'utils/base'

describe('utils-base', () => {
  it('should get true type', () => {
    expect(trueType(new Date())).to.equal('Date')
  })
})
