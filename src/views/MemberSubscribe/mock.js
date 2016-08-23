import Mock from 'mockjs';
import moment from 'moment';

const Random = Mock.Random;
Mock.mock(/\/get-schedules$/, () => {
  const firstDate = moment('2016-08-22');
  return Mock.mock({
    calendarStatus: new Array(7 * Random.integer(1, 5)).fill(0).map((value, index) => {
      const status = Random.natural(0, 2);
      return {
        date: firstDate.add(+!!index, 'd').format('YYYY-MM-DD'),
        status
      };
    })
  }
  );
});
