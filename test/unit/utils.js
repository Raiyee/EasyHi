export function triggerHTMLEvents (target, event, process) {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(event, true, true)
  if (process) process(e)
  target.dispatchEvent(e)
  return e
}

export function triggerMouseEvents (target, event, process) {
  const e = document.createEvent('MouseEvents')
  e.initMouseEvent(event, true, true)
  if (process) process(e)
  target.dispatchEvent(e)
  return e
}

export function triggerTouchEvents (target, event, process) {
  const e = document.createEvent('UIEvent')
  e.initUIEvent(event, true, true)
  if (process) process(e)
  target.dispatchEvent(e)
  return e
}
