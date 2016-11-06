<template>
  <div :class="$style.content">
    <form action="javascript:;">
      <div :class="$style.mmContainer">
        <template v-if="noMessage">
          <div :class="$style.noDetail">
            <img src="http://www.66tools.com/WebTools/rImage?p=400">
            <span :class="$style.noMessage">{{ noMessage }}</span>
          </div>
        </template>
        <template v-else>
          <div v-for="mm in msg">
            <div :class="$style.mmPanel">
              <div :class="$style.mmPanelTitle">
                <span :class="[$style.date, 'theme-color']">{{mm.date}}</span>
              </div>
              <div :class="$style.mmPanelContent">
                <ul>
                  <li v-for="ml in mm.messages" :class="[ml.readState ? $style.past :'']">
                    <div :class="$style.mesTitle">
                      <span :class="$style.messageType">{{ ml.type | resetType }}</span>
                      <span :class="$style.time">{{ ml.createTime | formatDate('HH:mm') }}</span>
                    </div>
                    <div :class="$style.mesContent">{{ ml.msgContent }}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </template>
      </div>
    </form>
  </div>
</template>
<script>
  import {resetType, reSetMsg} from './MemberMessage'
  export default {
    name: 'memberMessage',
    data() {
      return {
        msg: reSetMsg(this.$route.meta.data.data.msg),
        noMessage: this.$route.meta.data.data.noMessage
      }
    },
    filters: {
      resetType
    }
  }
</script>
<style src="./member-message.styl" lang="styl" module/>
