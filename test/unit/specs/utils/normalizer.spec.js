import Normalizer from 'utils/normalizer'

describe('Normalizer', () => {
  it('should normalize items', () => {
    const normalizer = new Normalizer()

    const data = normalizer.normalize([{
      id: 1,
      value: 'a'
    }, {
      id: 2,
      value: 'b'
    }])

    expect(data).to.eql({
      result: [1, 2],
      entities: {
        '1': {
          id: 1,
          value: 'a'
        },
        '2': {
          id: 2,
          value: 'b'
        }
      }
    })
  })

  it('should normalize items (single)', () => {
    const normalizer = new Normalizer()

    const data = normalizer.normalize({
      id: 1,
      value: 'a'
    })

    expect(data).to.eql({
      result: [1],
      entities: {
        '1': {
          id: 1,
          value: 'a'
        }
      }
    })
  })

  it('with options', () => {
    const normalizer = new Normalizer({
      key (item) {
        return item.uuid
      },
      value (item) {
        return item.value
      }
    })

    const data = normalizer.normalize([{
      uuid: 1,
      value: 'a'
    }, {
      uuid: 2,
      value: 'b'
    }])

    expect(data).to.eql({
      result: [1, 2],
      entities: {
        '1': 'a',
        '2': 'b'
      }
    })
  })
})
