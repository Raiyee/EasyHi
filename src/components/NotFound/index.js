import {mapGetters} from 'vuex'

import NoItem from 'components/NoItem'

export default require('./index.pug')({
  name: 'not-found',
  computed: {
    ...mapGetters(['initialized'])
  },
  components: {
    NoItem
  }
})
