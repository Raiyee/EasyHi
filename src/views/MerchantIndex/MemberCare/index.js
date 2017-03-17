import classes from './index.styl'
import {mapGetters} from 'vuex'
import Dropdown from 'components/HiDropdown'

import {imgPath} from 'utils'

export default require('./index.pug')({
  data() {
    const {memberList, websitePrefix} = this.$route.meta.data
    const members = memberList || []
    const originMembers = memberList || []

    const selections = ['全部关怀', '近期生日会员', '近期满会员日会员']
    return {
      classes,
      members,
      selections: [{
        selections
      }],
      selected: [{
        value: 0,
        text: '全部关怀'
      }],
      originMembers,
      searchCondition: '',
      websitePrefix
    }
  },
  computed: {
    ...mapGetters(['tcode', 'isEnterprise'])
  },
  methods: {
    anniversaryNum(mbrDay, beginTime) {
      return mbrDay.split('.')[0] - beginTime.split('.')[0]
    },
    personIcon(icon, sex) {
      return icon ? imgPath(icon)
        : require(`assets/portrait/member-${sex === 'M' ? 'male' : 'female'}.jpg`)
    },
    toggleActive([code]) {
      this.$http(`/member/member-care-list/${code}`).then(({data: {memberList}}) => {
        this.members = memberList
        this.originMembers = memberList
        this.filter()
      })
    },
    bless(sceneId, userId, memberName) {
      const {tcode, websitePrefix} = this
      if (sceneId) {
        location.href = `${websitePrefix}/${tcode}/tshow/${sceneId}`
        return
      }
      window.localStorage.setItem('memberCareName', memberName)
      window.localStorage.setItem('memberCareId', userId)
      this.$router.push({
        path: `/member-care/member-care-template/${userId}`
      })
    },
    inputSearch(e) {
      this.searchCondition = e.currentTarget.value
      this.filter()
    },
    clearInput() {
      this.searchCondition = ''
      this.members = []
      this.$nextTick(() => {
        this.filter()
        this.$refs.search.focus()
      })
    },
    filter() {
      const target = this.searchCondition
      this.members = this.originMembers.filter(item =>
        item.memberName.includes(target) || item.mobile.includes(target)
      )
    }
  },
  components: {
    Dropdown
  }
})
