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
    <transition name="bounce">
      <div v-show="active" :class="classes.timeItems">
        <ol class="list-unstyled">
          <li v-for="(times, key) of activeItems"
              v-if="times.length"
              :class="classes[key]">
            <span class="iconfont" :class="`icon-${key}`"/>
            <ol class="list-unstyled clearfix">
              <li v-for="time of times"
                  @click="toggleTime(time)">
                <div :class="[classes.timeItem, {active: time === activeTime}]">
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
    </transition>
  </li>
</template>
<script>
  import classes from './coach-item'

  import {REQUIRED_OBJECT} from 'utils/constants'
  import {imgPath} from 'filters/image'

  export default {
    props: {
      coachItem: REQUIRED_OBJECT
    },
    data() {
      return {
        classes,
        active: false,
        checked: false,
        activeTime: null
      }
    },
    computed: {
      activeItems() {
        return this.coachItem[`min${this.checked ? '120' : '060'}`]
      }
    },
    methods: {
      imgPath,
      toggleActive() {
        this.active = !this.active
      },
      toggleChecked(checked) {
        this.checked = checked
      },
      toggleTime(time) {
        this.activeTime = time === this.activeTime ? null : time
      },
      orderSchedule(e) {
        this.$emit(e, this.activeTime)
      }
    }
  }
</script>
