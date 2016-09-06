<template>
  <li class="media">
    <div class="media-body">
      <h4 class="media-heading">
        {{ scheduleStartTime | formatDate('HH:mm') }}
        {{ scheduleName }}
      </h4>
      <div class="media-content">
        时长：{{ scheduleDuration }}min
        <br>
        老师：{{ scheduleCoach }}
        <br>
        <template v-if="scheduleRemaining">
          <span class="icon-character theme-bg">预</span>
          还可预订{{ scheduleRemaining }}人
        </template>
        <template v-else>
          <span class="icon-character remark-bg">满</span>
          已订满
        </template>
        <template v-if="scheduleBooked">
            <span class="icon-character"
                  :class="{'theme-bg': scheduleRemaining, 'remark-bg': !scheduleRemaining}">我</span>
          已预订{{ scheduleBooked }}人
        </template>
      </div>
    </div>
    <div class="media-right media-middle">
      <img class="media-object img-circle" :src="imgPath(coursePicUrl)">
    </div>
  </li>
</template>
<script>
  import {REQUIRED_NUMBER, REQUIRED_STRING} from 'utils/constants'
  import {imgPath} from 'filters/image'

  export default{
    props: {
      coursePicUrl: REQUIRED_STRING,
      scheduleBooked: REQUIRED_NUMBER,
      scheduleCoach: REQUIRED_STRING,
      scheduleStartTime: REQUIRED_NUMBER,
      scheduleEndTime: REQUIRED_NUMBER,
      scheduleName: REQUIRED_STRING,
      scheduleRemaining: REQUIRED_NUMBER
    },
    computed: {
      scheduleDuration() {
        return (this.scheduleEndTime - this.scheduleStartTime) / 1000 / 60
      }
    },
    methods: {
      imgPath
    }
  }
</script>
