import moment from 'moment';

export const getDatetime = (date, unit) => moment(date).get(unit);
