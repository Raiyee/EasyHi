export const MERCHANT = 'MERCHANT'
export const SERVICE = 'SERVICE'
export const COACH = 'COACH'
export const ADVISOR = 'ADVISOR'
export const MANAGER = 'MANAGER'

export const MEMBER = 'MEMBER'
export const VISITOR = 'VISITOR'
export const OTHER = 'OTHER'

export const PERMISSION = 'PERMISSION'

export const ROLES = {ADVISOR, COACH, MERCHANT, MEMBER, OTHER, SERVICE, VISITOR, MANAGER}
export const ROLE_NAMES = {
  [ADVISOR]: '会籍',
  [COACH]: '教练',
  [MERCHANT]: '馆主',
  [MEMBER]: '会员',
  [OTHER]: '其他',
  [SERVICE]: '客服',
  [VISITOR]: '游客',
  [MANAGER]: '店长'
}

export const STAFFS = [MERCHANT, SERVICE, COACH, ADVISOR, MANAGER]
