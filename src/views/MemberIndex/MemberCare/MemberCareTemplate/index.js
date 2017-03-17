import classes from './index.styl'
import HiTab from 'components/HiTab'

import {mapGetters} from 'vuex'

export default require('./index.pug')({
  data() {
    const templates = []
    const {memberId} = this.$route.params
    const items = [
      {
        cardTypeId: '0',
        cardTypeName: '全部'
      }]

    return {
      classes,
      templates,
      items,
      memberId
    }
  },
  computed: {
    ...mapGetters(['merchantUrlPrefix'])
  },
  created() {
    this.$http.post('/mobile-show/boss-scene-list', {
      categoryCode: 4,
      currPage: 1,
      pageSize: 2000
    }).then(({data}) => {
      this.templates = data.data
    })
  },
  methods: {
    toggleTab(index, code, text, item) {
    },
    toShowEdit(templateId) {
      location.href = `${this.merchantUrlPrefix}mobile/show/preview/${templateId}`
    }
  },
  components: {
    HiTab
  }
})
