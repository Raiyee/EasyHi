/**
 * 获取输入值的真实类型
 *
 * @param value       需要判断的值
 * @returns {string}  类型字符串
 */
export const trueType = value => [].slice.call({}.toString.call(value), 8, -1).join('');

const trueTypeFunc = type => value => type === trueType(value);

/**
 * 一些类型判断方法, 例: utils.Array(1)
 */
['Arguments', 'Array', 'Boolean', 'Date', 'Error', 'Function', 'Map',
  'Null', 'Object', 'RegExp', 'Set', 'String', 'Symbol', 'Undefined']
  .forEach(type => (module.exports[`is${type}`] = trueTypeFunc(type)));

const isNumberFunc = trueTypeFunc('Number');

/**
 * 判断是否是 NaN, 与原生 isNaN 不同, 例如 String 类型传入为 false
 *
 * @param value       验证值
 * @returns {boolean} 是否是 NaN 值
 */
export const isNaN = value => isNumberFunc(value) && isNaN(value);

/**
 * 判断是否是数字, 不包括 NaN 值
 *
 * @param value       验证值
 * @returns {boolean} 是否是纯数字
 */
export const isNumber = value => isNumber(value) && !isNaN(value);
