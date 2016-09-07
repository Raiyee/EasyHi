<template>
  <li class="media">
    <div class="media-left">
      <img :src="imgPath(coachItem.coachPortrait)">
    </div>
  </li>
</template>
<script>
  import {mapGetters} from 'vuex'

  import {REQUIRED_BOOLEAN, REQUIRED_NUMBER, REQUIRED_OBJECT} from 'utils/constants'
  import {imgPath} from 'filters/image'

  export default {
    props: {
      coachItem: REQUIRED_OBJECT,
      itemsHeight: REQUIRED_NUMBER,
      last: REQUIRED_BOOLEAN
    },
    computed: {
      ...mapGetters(['rem']),
      itemsStyle() {
        if (!this.last) return
//        const itemsLength = this.scheduleItems.length
        const itemsLength = 1
        const pr = Math.floor(this.rem * 10) / 10
        const itemsHeight = this.itemsHeight - (28 + 113 * itemsLength) * pr - itemsLength + 1
        return {
          marginBottom: `${itemsHeight}px`
        }
      }
    },
    methods: {
      imgPath
    }
  }
</script>
