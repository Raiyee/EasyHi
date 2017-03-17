import RuleDetail from './RuleDetail'

import classes from './mbr-card-rule.styl'

export default require('./mbr-card-rule.pug')({
  name: 'mbr-card-rule',
  data() {
    return {
      classes,
      ...this.$route.meta.data
    }
  },
  components: {
    RuleDetail
  }
})
