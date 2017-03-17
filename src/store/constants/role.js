export const MERCHANT = 'MERCHANT'
export const MANAGER = 'MANAGER'
export const SERVICE = 'SERVICE'
export const COACH = 'COACH'
export const ADVISOR = 'ADVISOR'

export const MEMBER = 'MEMBER'
export const VISITOR = 'VISITOR'
export const OTHER = 'OTHER'

export const ROLE_NAMES = {
  [MERCHANT]: '馆主',
  [MANAGER]: '店长',
  [SERVICE]: '客服',
  [COACH]: '教练',
  [ADVISOR]: '会籍',
  [MEMBER]: '会员',
  [VISITOR]: '游客',
  [OTHER]: '其他'
}

export const ADMINS = [MERCHANT, MANAGER]
export const STAFFS = [MERCHANT, MANAGER, SERVICE, COACH, ADVISOR]
export const STAFFS_SA = [MERCHANT, MANAGER, SERVICE, ADVISOR]
export const STAFFS_A = [MERCHANT, MANAGER, ADVISOR]
export const STAFFS_S = [MERCHANT, MANAGER, SERVICE]
export const CONSUMERS = [MEMBER, VISITOR]
