import {mapGetters} from 'vuex'

import {removeClass} from 'utils'

export default {
  ...require('./index.pug'),
  name: 'member-index',
  data: () => ({
    classes: require('./index.styl')
  }),
  computed: {
    ...mapGetters(['winHeight'])
  },
  methods: {
    animationEnd(e) {
      removeClass(e.target, 'animated')
    }
  }
}
