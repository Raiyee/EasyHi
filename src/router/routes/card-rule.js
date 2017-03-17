import {ADMINS, CUSTOMERS} from 'utils'

export default [{
  name: 'cardRule',
  path: '/card-rule/:type(card|stored-card|course)/:id(\\d+)',
  component: () => import('views/CardRule'),
  meta: {
    auth: ADMINS,
    init: {
      url: to => `/card-rule/get-rules/${to.params.type}/${to.params.id}`
    }
  }
}, {
  name: 'mbrCardRule',
  path: '/mbr-card-rule/:type(card|stored-card)/:cardId',
  component: () => import('views/CardRule/MbrCardRule'),
  meta: {
    auth: CUSTOMERS,
    init: {
      url: ({params}) => `/card-rule/get-all-rules/${params.type}/${params.cardId}`
    }
  }
}]
