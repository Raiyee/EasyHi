import Mock from 'mockjs';
import {firstDayOfWeek} from 'utils/moment';

const Random = Mock.Random;
Mock.mock(/\/get-schedules$/, () => {
  const firstDate = firstDayOfWeek(null, false);
  return Mock.mock({
    calendar: new Array(7 * Random.integer(1, 5)).fill(0).map((value, index) => {
      const status = Random.natural(0, 2);
      return {
        date: firstDate.add(+!!index, 'd').format('YYYY-MM-DD'),
        status
      };
    })
  });
});
