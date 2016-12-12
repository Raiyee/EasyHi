import {mapGetters} from 'vuex'

export default {
  ...require('./index.pug'),
  name: 'member-center',
  data() {
    return {
      classes: require('./index.styl'),
      ...this.$route.meta.data
    }
  },
  computed: {
    ...mapGetters(['mobile'])
  }
}
