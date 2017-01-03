import {mapGetters, mapActions} from 'vuex'

import classes from './index.styl'

export default require('./index.pug')({
  name: 'member-index',
  data() {
    return {
      classes,
      ...this.$route.meta.data
    }
  },
  created() {
    this.toggleMenuInactive('MINE')
  },
  destroyed() {
    this.toggleMenuInactive(null)
  },
  computed: {
    ...mapGetters(['mobile'])
  },
  methods: {
    ...mapActions(['toggleMenuInactive'])
  }
})
