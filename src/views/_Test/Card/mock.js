import Mock from 'mockjs'

import {MOCK_CARD, MOCK_CARD_INSTANCE} from 'utils'

Mock.mock(/\/test-cards$/, () => {
  return {
    cardName: MOCK_CARD(),
    mbrCard: MOCK_CARD_INSTANCE(),
    mchCard: MOCK_CARD_INSTANCE()
  }
})
