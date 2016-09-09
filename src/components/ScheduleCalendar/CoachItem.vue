<template>
  <li class="media" :class="classes.media">
    <div class="media-left media-middle">
      <img class="media-object img-circle" :src="imgPath(coachItem.coachPortrait)">
    </div>
    <div class="media-body media-middle">
      <h4 class="media-heading">{{coachItem.coachName}}
        <span class="iconfont"
              :class="`icon-${coachItem.coachGender ? '' : 'fe'}male`"/>
      </h4>
      <span class="iconfont icon-morning"/>
      <span class="iconfont icon-afternoon"/>
      <span class="iconfont icon-evening"/>
    </div>
    <div class="media-right media-middle">
      <button class="btn btn-theme-default">选择时间</button>
    </div>
  </li>
</template>
<script>
  import {mapGetters} from 'vuex'

  import classes from './coach-item'

  import {REQUIRED_BOOLEAN, REQUIRED_NUMBER, REQUIRED_OBJECT} from 'utils/constants'
  import {imgPath} from 'filters/image'

  export default {
    props: {
      coachItem: REQUIRED_OBJECT,
      itemsHeight: REQUIRED_NUMBER,
      last: REQUIRED_BOOLEAN
    },
    data() {
      return {classes}
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
