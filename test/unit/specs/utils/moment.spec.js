import moment from 'moment'
import {firstDayOfWeek, lastDayOfWeek, getWeekday, getDatetime, formatDate, weekDates} from 'utils/moment'

describe('utils-moment', () => {
  it('should get correct day', () => {
    expect(firstDayOfWeek('2016-11-11')).to.equal('2016-11-07')
    expect(lastDayOfWeek('2016-11-11')).to.equal('2016-11-13')
    expect(firstDayOfWeek('2016-11-11', false) instanceof moment).to.equal(true)
    expect(getWeekday('2016-11-11')).to.equal('周五')
    expect(getDatetime('2016-11-11', 'y')).to.equal(2016)
  })

  it('should format date correctly', () => {
    expect(formatDate('2016-11')).to.equal('2016-11-01')
    expect(formatDate('2016-11-11', 'YYYY')).to.equal('2016')
  })

  it('should get all dates in one week', () => {
    expect(weekDates('2016-11-11')).to.deep.equal([
      '2016-11-07',
      '2016-11-08',
      '2016-11-09',
      '2016-11-10',
      '2016-11-11',
      '2016-11-12',
      '2016-11-13'
    ])
  })
})
