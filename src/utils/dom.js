const classRegExp = className => new RegExp(`(^| +)${className}( +|$)`, 'g');

export const addClass = function (el, className) {
  const originalClassName = el.className;
  classRegExp(className).test(originalClassName) || (el.className = `${originalClassName} ${className}`.trim());
  return this;
};

export const removeClass = function (el, className) {
  el.className = el.className.replace(classRegExp(className), ' ').trim();
  return this;
};
