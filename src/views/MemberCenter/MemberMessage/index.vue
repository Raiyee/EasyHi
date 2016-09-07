<template>
  <div class="content">
    <form action="javascript:;">
      <div class="mm-container">
        <div v-if="noMessage">
          <div class="no-detail">
            <img src="http://www.66tools.com/WebTools/rImage?p=400">
            <span class="no-message">{{ noMessage }}</span>
          </div>
        </div>
        <div v-else>
          <div v-for="mm in msg">
            <div class="mm-panel">
              <div class="mm-panel-title">
                <span class="date theme-color">{{mm.date}}</span>
              </div>
              <div class="mm-panel-content">
                <ul>
                  <li v-for="ml in mm.messages" :class="{past:ml.readState}">
                    <div class="mes-title">
                      <span class="message-type">{{ ml.type }}</span>
                      <span class="time">{{ ml.createTime | formatDate('HH:mm') }}</span>
                    </div>
                    <div class="mes-content">{{ ml.msgContent }}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
  import {reSetMsg} from './MemberMessage'
  export default {
    name: 'memberMessage',
    beforeCreate() {
      this.msg = reSetMsg(this.$route.meta.data.data.msg)
      this.noMessage = this.$route.meta.data.data.noMessage
    }
  }
</script>

<style lang='stylus' src='./member-message.styl'/>
