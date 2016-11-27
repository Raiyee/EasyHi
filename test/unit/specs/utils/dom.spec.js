import {addClass, removeClass, animate, getTranslate, getTranslate3d} from 'utils/dom'

describe('utils-dom', () => {
  const div = document.createElement('div')

  beforeEach(() => {
    div.className = ''
  })

  it('should add and remove className on element', () => {
    addClass(div, 'clazz clazz')
    expect(div.className).to.equal('clazz')
    addClass(div, 'clazz2')
    removeClass(div, 'clazz')
    expect(div.className).to.equal('clazz2')
  })

  it('should run callback after 500ms', () => {
    let x = 0, y = 0
    animate(div, 'scrollTop', {
      callback(){
        x = 1
      }
    })

    animate(div, {
      type: 'scrollTop',
      callback(){
        y = 1
      }
    })
    expect(x).to.equal(0)
    expect(y).to.equal(0)
    setTimeout(() => {
      expect(x).to.equal(1)
      expect(y).to.equal(1)
    }, 500)
  })

  it('should get zero on common element', () => {
    expect(getTranslate(div)).to.deep.equal({x: 0, y: 0})
    expect(getTranslate3d(div)).to.deep.equal({x: 0, y: 0, z: 0})
  })
})
