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
      index: Number,
      baseWidth: Number,
      itemWidth: Number,
      divisor: Number
    },
    data() {
      return {};
    },
    computed: {
      ...mapGetters(['width', 'threshold']),
      marginLeft() {
        const width = this.width;
        return width < this.threshold && this.index % 7
          ? (this.baseWidth - 55 * 7 * width) / (6 * this.divisor) : 0;
      },
      disabled() {
        return [0, 3].includes(this.status);
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
