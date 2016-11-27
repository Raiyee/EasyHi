import {parseJsonLoop, setItem, deleteItem} from 'utils/json'

describe('utils-json-parseJson', () => {
  const json = '{"x":1,"y":{"m":2},"z":"{\\"n\\":3}"}'

  it('should parse json to an object', () => {
    expect(parseJsonLoop(json)).to.deep.equal({
      x: 1,
      y: {
        m: 2
      },
      z: {
        n: 3
      }
    })
  })

  it('should parse only one level', () => {
    expect(parseJsonLoop(json, 1)).to.deep.equal({
      x: 1,
      y: {
        m: 2
      },
      z: '{"n":3}'
    })
  })
})

describe('utils-json-localStorage', () => {
  it('should add a localStorage item and return an object', () => {
    expect(setItem('name', {x: 1, y: {m: 2}})).to.deep.equal({x: 1, y: {m: 2}})
    expect(localStorage.getItem('name')).to.equal('{"x":1,"y":{"m":2}}')
  })

  it('should remove a localStorage item', () => {
    setItem('name', {x: 1, y: {m: 2}})
    deleteItem('name')
    expect(localStorage.getItem('name')).to.equal(null)
  })
})
