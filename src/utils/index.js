// 使用 require 语法将 constants 导出的所有常量汇合到一个对象中
const constants = require('./constants');

export default {
  ...constants
};
