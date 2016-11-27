<template>
  <li class="media" :class="$style.media">
    <div class="media-left media-middle">
      <img class="media-object img-circle" :src="coachItem.coachPortrait | imgPath">
    </div>
    <div class="media-body media-middle">
      <h4 class="media-heading">{{coachItem.coachName}}
        <span class="iconfont"
              :class="`icon-${coachItem.coachGender ? '' : 'fe'}male`"/>
      </h4>
      <template v-if="active">
        <span @click="toggleChecked(false)">
          <span class="iconfont icon-radio" :class="checked ? 'inactive' : 'theme-color'"/> 60min
        </span>
        <span @click="toggleChecked(true)">
          <span class="iconfont icon-radio" :class="checked ? 'theme-color' : 'inactive'"/> 120min
        </span>
      </template>
      <template v-else>
        <span v-if="coachItem.min060.morning.length" class="iconfont icon-morning"/>
        <span v-if="coachItem.min060.afternoon.length" class="iconfont icon-afternoon"/>
        <span v-if="coachItem.min060.evening.length" class="iconfont icon-evening"/>
      </template>
    </div>
    <div class="media-right media-middle">
      <button class="btn btn-theme-default"
              @click="toggleActive">
        {{ active ? '收起' : '选择时间' }}
      </button>
    </div>
    <div v-if="hasItems" :class="$style.timeItems" :style="style">
      <ol class="list-unstyled">
        <li v-for="(times, key) of activeItems"
            v-if="times.length"
            :class="$style[key]">
          <span class="iconfont" :class="`icon-${key}`"/>
          <ol class="list-unstyled clearfix">
            <li v-for="time of times">
              <div :class="[$style.timeItem, {active: time === activeTime}]"
                   @click="toggleTime(time)">
                <span>{{time}}</span>
                <span v-show="time === activeTime" class="iconfont icon-check"/>
                <span>开始</span>
              </div>
            </li>
          </ol>
        </li>
      </ol>
      <div class="text-center">
        <button class="btn btn-theme-primary" @click="orderSchedule">预订</button>
      </div>
    </div>
    <div v-else :class="$style.timeItems" :style="style">
      <div :class="$style.noItem">没有可以预订的时间</div>
    </div>
  </li>
</template>
<script>
  import {mapGetters} from 'vuex'

  import {REQUIRED_OBJECT} from 'utils'

  export default {
    props: {
      activeCoachId: String,
      coachItem: REQUIRED_OBJECT
    },
    data() {
      return {
        checked: false,
        activeTime: null
      }
    },
    computed: {
      ...mapGetters(['rem']),
      hasItems() {
        for (const value of Object.values(this.activeItems)) {
          if (value.length) return true
        }
      },
      active() {
        return this.coachItem.coachId === this.activeCoachId
      },
      activeItems() {
        return this.coachItem[`min${this.checked ? '120' : '060'}`]
      },
      height() {
        const rem = this.rem

        if (!this.hasItems) return 90 * rem

        let height = 20 + 15 + 36 + 25
        for (const value of Object.values(this.activeItems)) {
          height += value.length && (Math.ceil(value.length / 4) * 65 + 10)
        }
        return height * rem
      },
      style() {
        return this.active && {
          height: `${this.height}px`
        }
      }
    },
    methods: {
      toggleActive() {
        this.$emit('toggleActiveCoach', this.active ? null : this.coachItem.coachId)
      },
      toggleChecked(checked) {
        this.checked = checked
      },
      toggleTime(time) {
        this.activeTime = time === this.activeTime ? null : time
      },
      orderSchedule(e) {
      }
    }
  }
</script>
<style src="./coach-item" module/>
