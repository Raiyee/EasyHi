<template>
  <div>
    <full-calendar :calendar="calendar" :calendarStatus="calendarStatus"/>
  </div>
</template>
<script>
  import FullCalendar from 'components/FullCalendar';

  import utils from 'utils';

  /**
   * 排期存在 4 种状态
   * 0 -> 无课
   * 1 -> 正常
   * 2 -> 订满
   * 3 -> 有课但已过期
   *
   * @param status      课程状态值, 可能为 0、1、2、3
   * @param date        日期字符串
   * @returns {string}  处理后的课程状态字符串
   */
  const statusText = (status, date) => {
    switch (status) {
      case (0):
        return '无课';
      case (2):
        return '订满';
    }
    return utils.getWeekday(date);
  };

  export default{
    name: 'member-subscribe',
    data() {
      return {
        courseTypeId: null,
        courseTypes: [],
        calendarStatus: [],
        calendar: {
          activeDate: null,
          range: [0, 3]
        }
      };
    },
    created() {
      this.$http.get('/get-schedules').then(res => {
        const data = res.json();
        data.calendarStatus.map(calendar => Object.assign(calendar, {
          statusText: statusText(calendar.status, calendar.date)
        }));
        Object.assign(this, data);
      });
    },
    components: {
      FullCalendar
    }
  };
</script>
<style lang="stylus" src="./index.styl" scoped/>
