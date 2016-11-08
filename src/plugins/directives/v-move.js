export const move = function () {
  const EVENT = {
    start: 'mousedown touchstart',
    move: 'mousemove touchmove',
    end: 'mouseup touchend'
  }

  return {
    bind(el, binding, vnode){
    },
    inserted(el, binding, vnode){
    },
    update(el, binding, vnode, oldVnode){
    },
    componentUpdated(el, binding, vnode, oldVnode){
    },
    unbind(el, binding, vnode){
    }
  }
}()
