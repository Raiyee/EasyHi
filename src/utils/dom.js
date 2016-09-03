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

const abs = Math.abs;

export const scrollTop = (el, top, duration, callback) => {
  duration = duration || 500;
  let origin = el.scrollTop;
  let requestId;
  const step = 1000 * (top - origin) / duration / 60;
  const scrollAnimate = () => {
    if (abs(top - origin) <= abs(step / 2)) {
      return cancelAnimationFrame(requestId) || callback && callback();
    }
    el.scrollTop = origin += step;
    requestId = requestAnimationFrame(scrollAnimate);
  };
  requestId = requestAnimationFrame(scrollAnimate);
};
