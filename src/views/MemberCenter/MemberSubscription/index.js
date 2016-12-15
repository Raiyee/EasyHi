export default require('./index.pug')({
  name: 'memberSubscription',
  props: {
    direction: String,
    width: String,
    tagArray: {
      type: Array,
      required: true
    },
    tagInfo: Function
  },
  data() {
    return {
      classes: require('./index.styl'),
      ...this.$route.meta.data
    }
  },
  computed: {
    ulWidth() {
      let len = this.tagArray.length
      return len <= 2 ? '100%' : 100 / 3 * len + '%'
    },
    liWidth() {
      let len = this.tagArray.length
      return len == 1 ? '100%' : len == 2 ? '50%' : 100 / len + '%'
    }
  },
  methods: {
    testClick() {
      console.log(1)
    }
  },
  filters: {
  }
})
