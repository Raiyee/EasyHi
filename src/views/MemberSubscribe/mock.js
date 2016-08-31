import Mock from 'mockjs';
import moment from 'moment';

import {DATE_FORMAT, firstDayOfWeek} from 'utils';

const Random = Mock.Random;
Mock.mock(/\/get-schedules$/, () => {
  const today = moment();
  const firstDate = firstDayOfWeek(today, false);
  return Mock.mock({
    calendar: new Array(7 * Random.integer(1, 5)).fill(0).map((value, index) => {
      const date = firstDate.add(+!!index, 'd');
      return {
        date: date.format(DATE_FORMAT),
        status: date.isBefore(today) ? Random.pick([0, 3]) : Random.natural(0, 2)
      };
    })
  });
});
