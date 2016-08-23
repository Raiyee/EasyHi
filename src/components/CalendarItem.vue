<template>
  <li class="calendar-item"
      :class="{'bg-item': !date, disabled: disabled}"
      :style="{marginLeft: marginLeft + 'px', width: itemWidth + 'px'}"
      @click="toggleActive">
    <div v-if="date">
      <div>
        {{date | getDatetime('date')}}
        <br>
        {{status | statusText(date)}}
      </div>
    </div>
    <div v-else class="theme-bg">&nbsp;</div>
  </li>
</template>
<script>
  import {mapGetters} from 'vuex';

  import {getDatetime} from 'filters/moment';
  import {statusText} from 'filters/schedule';

  export default{
    props: {
      date: String,
      status: Number,
      index: Number
    },
    data() {
      return {};
    },
    computed: {
      ...mapGetters(['width', 'rem']),
      marginLeft() {
        if (this.index % 7) return (this.itemWidth * 375 - 55 * this.width) / 6 / 375;
        return 0;
      },
      disabled() {
        return [0, 3].includes(this.status);
      },
      itemWidth() {
        return (this.width * 375 - 20 * this.width) / 7 / 375;
      }
    },
    filters: {
      getDatetime,
      statusText
    },
    methods: {
      toggleActive() {
        this.$emit('click', this.disabled, this.index);
      }
    }
  };
</script>
<style lang="stylus" src="./calendar-item" scoped/>
