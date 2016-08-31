const classRegExp = className => new RegExp(`(^|\\s+)${className.toString().trim()}(\\s+|$)`, 'g');

export const hasClass = (el, className) => classRegExp(className).test(el.className);

export const addClass = function (el, className) {
  hasClass(el, className) || (el.className = `${el.className} ${className}`.trim());
  return this;
};

export const removeClass = function (el, className) {
  el.className = el.className.replace(classRegExp(className), ' ').trim();
  return this;
};
