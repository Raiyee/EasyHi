export const DATE_FORMAT = 'YYYY-MM-DD';

export const weekdays = ['日', '一', '二', '三', '四', '五', '六'].map(value => '周' + value);

const [first, ...rest] = weekdays;
export const isoWeekdays = [...rest, first];
