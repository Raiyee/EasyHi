export default [{
  path: '/personal-info',
  name: 'personalInfo',
  component: () => import('views/common/PersonalInfo'),
  meta: {
    auth: true,
    init: {
      type: 'get',
      url: '/common/personal-center-info/query'
    }
  }
}, {
  path: '/personal-security',
  name: 'personalSecurity',
  component: () => import('views/common/PersonalInfo/PersonalSecurity'),
  meta: {
    auth: true
  }
}]
