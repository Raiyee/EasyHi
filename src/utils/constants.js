export const DATE_FORMAT = 'YYYY-MM-DD';

export const weekdays = ['日', '一', '二', '三', '四', '五', '六'].map(value => '周' + value);

const [first, ...rest] = weekdays;
export const isoWeekdays = [...rest, first];

export const REQUIRED_ARRAY = {
  type: Array,
  required: true
};

export const REQUIRED_NUMBER = {
  type: Number,
  required: true
};

export const REQUIRED_OBJECT = {
  type: Object,
  required: true
};

export const REQUIRED_STRING = {
  type: String,
  required: true
};
