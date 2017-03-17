import {mapGetters} from 'vuex'

export default require('./rule-item.pug')({
  name: 'rule-item',
  props: {
    itemName: String,
    itemNum: [Number, String],
    selected: Boolean,
    dirty: Boolean,
    detailType: Boolean,
    editing: Boolean,
    index: Number
  },
  computed: {
    ...mapGetters(['isAdmin']),
    num: {
      get() {
        return this.itemNum
      },
      set(num) {
        return this.$emit('itemNumChanging', this.index, num)
      }
    }
  },
  methods: {
    toggleItemSelect() {
      this.editing && this.$emit('toggleItemSelect', this.index, !this.selected)
    }
  }
})
