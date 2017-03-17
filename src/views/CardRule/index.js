import RuleDetail from './RuleDetail'

import {animate, jsonClone, pick} from 'utils'

import classes from './index.styl'

export default require('./index.pug')({
  name: 'card-rule',
  data() {
    const metaData = this.$route.meta.data
    const ruleDetails = jsonClone(metaData.ruleDetails)
    return {
      classes,
      changed: 0,
      ruleDetails,
      effective: true,
      editing: false,
      storedRuleDetails: null,
      rulesTitle: metaData.rulesTitle,
      ...this.$route.params
    }
  },
  methods: {
    edit() {
      this.storedRuleDetails = jsonClone(this.ruleDetails)
      this.editing = true
    },
    cancelEdit() {
      this.ruleDetails = jsonClone(this.storedRuleDetails)
      this.editing = false
      this.effective = true
      this.changed = +!this.changed
    },
    confirmEdit() {
      let errorEl

      this.$refs.ruleDetail.find(vm => {
        if (!vm.error) return
        vm.dirty = true
        errorEl = vm.$el
        return true
      })

      if (errorEl) return animate(document.body, 'scrollTop', errorEl.offsetTop)

      this.$http.post(`/card-rule/set-rules/${this.type}/${this.id}/${+this.effective}`,
        this.ruleDetails
          .map(({detailId, subscribeType, ruleItems}) => ({
            detailId,
            subscribeType,
            ruleItems: ruleItems
              .filter(ruleItem => ruleItem.selected)
              .map(ruleItem => pick(ruleItem, 'itemId', 'itemNum'))
          }))
          .filter(ruleDetail => ruleDetail.ruleItems.length)).then(() => {
            this.$route.meta.data.ruleDetails = this.storedRuleDetails = jsonClone(this.ruleDetails)
            this.editing = false
            this.effective = true
          })
    }
  },
  components: {
    RuleDetail
  }
})
