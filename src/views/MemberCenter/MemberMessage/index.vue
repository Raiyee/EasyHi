<template>
  <div :class="classes.content">
    <form action="javascript:;">
      <div :class="classes.mmContainer">
        <template v-if="noMessage">
          <div :class="classes.noDetail">
            <img src="http://www.66tools.com/WebTools/rImage?p=400">
            <span :class="classes.noMessage">{{ noMessage }}</span>
          </div>
        </template>
        <template v-else>
          <div v-for="mm in msg">
            <div :class="classes.mmPanel">
              <div :class="classes.mmPanelTitle">
                <span :class="[classes.date, 'theme-color']">{{mm.date}}</span>
              </div>
              <div :class="classes.mmPanelContent">
                <ul>
                  <li v-for="ml in mm.messages" :class="[ml.readState ? classes.past :'']">
                    <div :class="classes.mesTitle">
                      <span :class="classes.messageType">{{ ml.type | resetType }}</span>
                      <span :class="classes.time">{{ ml.createTime | formatDate('HH:mm') }}</span>
                    </div>
                    <div :class="classes.mesContent">{{ ml.msgContent }}</div>
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
  import classes from './member-message.styl'
  export default {
    name: 'memberMessage',
    data() {
      return {
        classes: classes,
        msg: reSetMsg(this.$route.meta.data.data.msg),
        noMessage: this.$route.meta.data.data.noMessage
      }
    },
    filters: {
      resetType
    }
  }
</script>

