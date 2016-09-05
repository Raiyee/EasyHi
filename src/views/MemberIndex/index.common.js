import {mapGetters} from 'vuex'

export default {
  name: 'member-index',
  computed: {
    ...mapGetters(['winHeight'])
  },
  methods: {
    animationEnd(e) {
      const target = e.target
      target.className = target.className.replace(/(^| +)animated($| +)/, ' ').trim()
    },
    scale(e) {
      e.currentTarget.nextElementSibling.className += ' animated'
    }
  }
}
