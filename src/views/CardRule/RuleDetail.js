import {mapGetters} from 'vuex'

import RuleItem from './RuleItem'

import classes from './rule-detail.styl'

import {REQUIRED_OBJECT, isObject} from 'utils'

export default require('./rule-detail.pug')({
  name: 'rule-detail',
  props: {
    ruleDetail: {
      ...REQUIRED_OBJECT,
      validator(ruleDetail: {detailId: string, detailName: string, subscribeType: number, ruleItems: Array}) {
        return isObject(ruleDetail)
      }
    },
    editing: Boolean
  },
  data() {
    return {
      classes,
      dirty: false,
      show: false,
      detailNum: null,
      ...this.ruleDetail
    }
  },
  computed: {
    ...mapGetters(['coachAlias', 'isAdmin', 'rem']),
    error() {
      return !this.selectedRuleItems.every(ruleItem => ruleItem.itemNum)
    },
    height() {
      return +this.show && 52 * (this.ruleItems.length || 1) * this.rem + 'px'
    },
    selected: {
      get() {
        return !!this.selectedRuleItems.length
      },
      set(selected) {
        this.ruleItems.forEach(ruleItem => (ruleItem.selected = selected))
      }
    },
    num: {
      get() {
        if (this.detailNum != null) return this.detailNum
        const first = this.selectedRuleItems[0]
        return first && first.itemNum
      },
      set(num) {
        this.detailNum = num
        this.selectedRuleItems.forEach(ruleItem => (ruleItem.itemNum = num))
      }
    },
    selectedRuleItems() {
      return this.ruleItems.filter(ruleItem => ruleItem.selected)
    },
    isAllSame() {
      const selected = this.selectedRuleItems
      if (!selected.length) return false
      const firstItem = selected[0].itemNum
      return selected.every(ruleItem => ruleItem.itemNum === firstItem)
    }
  },
  mounted() {
    this.detailNum = this.num
  },
  methods: {
    toggleShow() {
      this.show = !this.show
    },
    toggleSelect() {
      if (!this.editing || !this.ruleItems.length) return
      this.selected = !this.selected
      this.dirty = false
    },
    toggleItemSelect(index, selected) {
      const ruleItem = this.ruleItems[index]

      this.$set(this.ruleItems, index, {
        ...ruleItem,
        selected
      })

      if (this.selectedRuleItems.length === 1 || this.isAllSame) {
        const firstItem = this.selectedRuleItems[0]
        firstItem && (this.dirty = false) && (this.detailNum = firstItem.itemNum)
      } else if (selected && this.ruleItems.filter(ruleItem => !ruleItem.ruleDetail).length === 1) {
        this.dirty = false
      }
    },
    itemNumChanging(index, itemNum) {
      const ruleItem = this.ruleItems[index]

      this.$set(this.ruleItems, index, {
        ...ruleItem,
        itemNum
      })

      if (this.selectedRuleItems.length === 1 || this.isAllSame) this.detailNum = itemNum
    }
  },
  components: {
    RuleItem
  }
})
