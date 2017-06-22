import {mapGetters} from 'vuex'
import {parseUrlTemp} from 'utils'

import classes from './index.styl'

export default require('./index.pug')({
  name: 'member-activities',
  data() {
    return {
      classes,
      activities: this.$route.meta.data
    }
  },
  computed: {
    ...mapGetters(['isAdmin', 'oauthUrlTemplate', 'memberUrlPrefix', 'isEnterprise'])
  },
  methods: {
    goActivityDetail(activity) {
      const {activityId, activityForm, playUrl, goodsType} = activity

      if (playUrl) {
        return (location.href = parseUrlTemp(this.oauthUrlTemplate, playUrl))
      }

      const url = activityForm === 1 ? 'expvoucher/activity-detail/'
        : activityForm === 2 ? 'expvoucher/activity-direct-detail/'
          : goodsType === 2 ? 'storedvaluecard/detail/'
            : goodsType === 1 ? 'sellcard/detail/'
              : 'experience/activity-detail/'

      location.href = this.memberUrlPrefix + url + activityId
    }
  }
})
