<template lang="pug" src="./index.pug"/>
<script>
  import HiRate from 'components/HiReview/HiRate'
  import OperatorMenu from 'components/HiMenu/OperatorMenu'
  import HiReview from 'components/HiReview'

  import {mapGetters} from 'vuex'
  import {confirm, alert, toast, remove, prompt, datePicker, timePicker, TIP_ID} from 'utils'

  export default {
    name: 'merchant-coach-detail',
    data() {
      return {
        scale: 12 / 14,
        close: true,
        opening: false,
        ...this.$route.meta.data
      }
    },
    computed: {
      ...mapGetters(['coachAlias', 'merchantUrlPrefix']),
      reviewNum() {
        return this.coachReviews.length
      },
      reviewVisibleNum() {
        return this.coachReviews.filter(({reviewVisible}) => reviewVisible).length
      }
    },
    methods: {
      changeState() {
        this.close = !this.close
      },
      updateItem() {
        location.href = this.merchantUrlPrefix + 'merchant-coach/edit/' + this.coachId
      },
      deleteItem() {
        const $this = this
        confirm({
          tipText: '确定要删除该' + $this.coachAlias + '吗?',
          confirm: () => this.deleteCoach()
        })
      },
      async deleteCoach(confirmed) {
        const {data: {code, desc}} = await this.$http.post('/merchant-coach/delete-coach', {
          coachId: this.coachId,
          userId: this.userId,
          confirmed
        })

        switch (code) {
          case ALERT:
            return alert(desc)
          case CONFIRM:
            return confirm({
              tipText: desc,
              confirm: () => this.deleteCoach(true)
            })
          default:
            location.href = this.merchantUrlPrefix + 'merchant-coach/coach-list'
        }
      },
      async addRestTime(restTime, options = {}) {
        const {date, start, end} = restTime
        const startTime = date + ' ' + start
        const endTime = date + ' ' + end
        const {data: {code, desc, data}} = await this.$http.post('/merchant-coach/add-rest-time', {
          coachId: this.coachId,
          startTime: startTime,
          endTime: endTime,
          ...options
        })

        switch (code) {
          case ALERT:
            return alert(desc)
          case CONFIRM:
            return confirm({
              tipText: desc,
              confirm: () => this.addRestTime(restTime, {...options, ignoreSchedules: true})
            })
          case PROMPT:
            return prompt({
              tipText: desc,
              placeholder: '在此填写取消课程的原因以告知会员 (50字以内), 或直接点击“确定”',
              confirm: promptText => this.addRestTime(restTime, {
                ...options,
                ignoreActiveSchedules: true,
                reason: promptText
              })
            })
          default:
            this.$modal.close()
            toast({
              tipText: '添加临时休息时间成功',
              close: () => {
                const restTime = {restId: data, restRange: [startTime, endTime]}
                this.restTimes.push(restTime)
                this.restTimes.sort((x, y) => x.restRange[0] > y.restRange[0] ? 1 : -1)
                this.$modal.close(TIP_ID)
              }
            })
        }
      },
      selectRestTime() {
        let date
        datePicker({
          close: () => {
            this.opening = false
            this.$modal.close()
          },
          confirm: result => {
            date = result
            this.opening = true
            this.$modal.close()
          }
        }, [], {
          destroyed: () => {
            if (!this.opening) return
            timePicker({
              pickerTabs: true,
              confirm: (start, end) => start >= end ? alert('开始时间不能小于结束时间')
                : this.addRestTime({date, start, end})
            })
          }
        })
      },
      deleteRestTime(restId) {
        confirm({
          tipText: '是否确定删除该休息时间?',
          confirm: () => this.confirmDeleteRestTime(restId)
        })
      },
      async confirmDeleteRestTime(restId) {
        const {data: {code, desc}} = await this.$http.post('/merchant-coach/delete-rest-time/' + restId)
        if (code !== SUCCESS) return toast(desc)
        remove(this.restTimes, restTime => restTime.restId === restId)
        this.$modal.close()
      }
    },
    components: {
      HiRate,
      OperatorMenu,
      HiReview
    }
  }
</script>
<style lang="stylus" src="./index.styl" module/>
