<template>
  <li>
    {{date}}
    <ol class="list-unstyled">
      <li v-for="scheduleItem of scheduleItems">
        <img :src="imgPath(scheduleItem.coursePicUrl)">
      </li>
    </ol>
  </li>
</template>
<script>
  import {imgPath} from 'filters/image';

  export default{
    props: {
      date: {
        type: String,
        required: true
      },
      scheduleItems: {
        type: Array,
        required: true
      }
    },
    methods: {
      imgPath
    }
  };
</script>
