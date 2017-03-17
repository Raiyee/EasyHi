
import InputSearch from 'components/HiPackages/InputSearch'

import classes from './index.styl'

export default require('./index.pug')({
  data() {
    return {
      classes,
      searchText: null,
      members: this.$route.meta.data
    }
  },
  computed: {
    filteredMembers() {
      const {members, searchText} = this
      return searchText ? members.filter(({memberName, memberMobile}) =>
          [memberName, memberMobile].find(text => text.includes(searchText))) : members
    }
  },
  methods: {
    onEnter(searchText) {
      this.searchText = searchText
    },
    onCancel() {
      this.searchText = null
    }
  },
  components: {
    InputSearch
  }
})
