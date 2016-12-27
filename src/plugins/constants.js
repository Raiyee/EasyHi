import {ROLES} from 'utils'

const {COACH, MERCHANT, SERVICE, STAFF} = ROLES

export const PERMISSIONS = [{
  mobiles: [18651868823],
  roles: [COACH],
  currentRole: COACH
}, {
  mobiles: [18168067973],
  roles: [MERCHANT, STAFF],
  currentRole: MERCHANT
}, {
  mobiles: [18551863134],
  roles: [SERVICE, STAFF],
  currentRole: SERVICE
}]
