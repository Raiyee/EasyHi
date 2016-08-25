<template>
  <div>
    <div class="component-wrap" style="position:relative;">
      <div class="element-box function-element editable"
           style="width:100%;height: 200px;overflow: hidden;position: relative;">
        <div class="slick">
          <div><img style="width:100%;height:100%;"
                    src="https://placem.at/places?w=375&h=200"></div>
        </div>
      </div>
    </div>
    <div class="component-wrap" style="position: relative; padding: 0 0.5rem">
      <div class="element-box text-element"
           style="text-align: center; opacity: 1; position: relative; height: 3.125rem; top: 1.8125rem; font-size: 1rem">
        <span>场馆介绍</span>
      </div>
      <div class="element-box text-element"
           style="text-align: center; opacity: 1; position: relative; height: 1.875rem; font-size: 0.8125rem; color: #808080">
        <span>Venue introduction</span>
      </div>
      <div class="element-box drop-element" style="position: relative">
        <div class="drop-element-content text-element drop-off" style="text-align: center; width: 100%; height: 4.125rem;
        opacity: 1; font-size: 0.875rem; line-height: 1.25rem; padding: 0.4375rem; position: relative; overflow: hidden"
             drop-id="drop_01" drop-height="34">
          <span>{{ data.introduce }}</span>
        </div>
        <div class="drop-element-button text-element drop-off"
             style="text-align: left; height: 4.0625rem; line-height: 4.0625rem; font-size: 0.8125rem; opacity: 1; padding: 0 0.4375rem; position: relative; top: 0.3125rem"
             drop-id="drop_01">
          <i class="iconfont"></i>显示更多
        </div>
      </div>
    </div>
    <div class="component-wrap" style="position: relative">
      <div class="component-inner">
        <div class="element-box text-element"
             style="text-align: center; opacity: 1; position: relative; height: 3.125rem; top: 1.8125rem; font-size: 1rem">
          <span>教练</span>
        </div>
        <div class="element-box text-element"
             style="text-align: center; opacity: 1; position: relative; height: 1.875rem; font-size: 0.8125rem; color: #808080">
          <span>Coach</span>
        </div>
        <div class="element-box drop-element"
             style="text-align: center; opacity: 1; position: relative; padding: 0 0.9375rem">
          <div class="drop-element-content text-element drop-off"
               style="text-align: left; width: 100%; height: 25.1875rem; opacity: 1; position: relative; overflow: hidden"
               drop-id="drop_03" drop-height="403">
            <div style="height: 5.625rem; position: relative; margin-top: 0.625rem">
              <div
                style="float: left; width: 5rem; height: 5rem; background-image: url('https://placem.at/places?w=80&h=80')"></div>
              <div style="float: left; width: 16.0625rem; height: 5rem; padding-left: 0.375rem">
                <div style="height: 1.5625rem">
                  <span>太极瑜伽1</span>
                </div>
                <div style="height: 3.4375rem; overflow: hidden">
                  <span>致力于做南京最专业的瑜伽理疗课程，最系统的瑜伽会员课程，以及最舒适的瑜伽养生课程</span>
                </div>
              </div>
            </div>
            <div style="height: 1px; background-color: #dfdfdf; width: 100%"></div>
          </div>
          <div class="drop-element-button text-element drop-off"
               style="text-align: left; width: 100%; height: 4.0625rem; line-height: 4.0625rem; font-size: 0.8125rem; opacity: 1; position: relative; top: 0.3125rem"
               drop-id="drop_03">
            <i class="iconfont"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="component-wrap" style="position: relative; background-color: #efefef; padding: 0 0.9375rem 1.25rem">
      <div class="component-inner">
        <div class="element-box text-element"
             style="text-align: center; opacity: 1; position: relative; height: 3.125rem; top: 1.8125rem; font-size: 1rem">
          <span>联系我们</span>
        </div>
        <div class="element-box text-element"
             style="text-align: center; opacity: 1; position: relative; height: 1.25rem; font-size: 0.8125rem; color: #808080">
          <span>Contact Us</span>
        </div>
        <div class="element-box text-element"
             style="text-align: left; opacity: 1; position: relative; line-height: 1.25rem; font-size: 0.875rem; clear: both; overflow: auto">
          <span style="float: left; width: 4rem; display: block">馆&emsp;&emsp;主:</span>
          <span style="float: left; width: 17.1875rem; display: block; padding-left: 0.3125rem">孟海华领军人才创业园领军人才创业园领军人才创业园领军人才创业园领军人才创业园</span>
        </div>
        <div class="element-box text-element"
             style="text-align: left; opacity: 1; position: relative; line-height: 1.25rem; font-size: 0.875rem; clear: both; overflow: auto">
          <span style="float: left; width: 4rem; display: block">联系电话:</span>
          <span style="float: left; width: 17.1875rem; display: block; padding-left: 0.3125rem">18888888888</span>
        </div>
        <div class="element-box text-element"
             style="text-align: left; opacity: 1; position: relative; line-height: 1.25rem; font-size: 0.875rem; clear: both; overflow: auto">
          <span style="float: left; width: 4rem; display: block">营业时间:</span>
          <span style="float: left; width: 17.1875rem; display: block; padding-left: 0.3125rem">09:00--21:00</span>
        </div>
        <div class="element-box text-element"
             style="text-align: left; opacity: 1; position: relative; line-height: 1.25rem; font-size: 0.875rem; clear: both; overflow: auto">
          <span style="float: left; width: 4rem; display: block">地&emsp;&emsp;址:</span>
          <span style="float: left; width: 17.1875rem; display: block; padding-left: 0.3125rem">
            领军人才创业园领军人才创业园领军人才创业园领军人才创业园领军人才创业园
          </span>
        </div>
        <div class="element-box sharp-element"
             style="text-align: left; opacity: 1; position: relative; height: 1px; background-color: #1a1a1a; width: auto; margin-top: 1.0625rem">
        </div>
        <div class="element-box text-element"
             style="text-align: center; opacity: 1; position: relative; height: 3.125rem; top: 1.875rem; color: #808080; font-size: 0.8125rem">
          <span>微信号:</span>
          <span>asdfasdfasfa</span>
        </div>
        <div class="element-box img-element"
             style="text-align: center; opacity: 1; position: relative; width: 9.375rem; height: 9.375rem; left: 5.8125rem">
          <div style="width: 9.375rem; height: 9.375rem; background: url('https://placem.at/places?w=150&h=150')"></div>
        </div>
      </div>
    </div>
    <div class="component-wrap" style="position: relative; background-color: #323232; padding: 0.625rem 0.9375rem">
      <div class="component-inner">
        <div class="element-box text-element"
             style="text-align: center; opacity: 1; position: relative; height: 1.25rem; line-height: 1.25rem; font-size: 0.75rem; color: #ffffff">
          <span>@2016 静慧瑜伽工作室版权所有</span>
        </div>
        <div class="element-box text-element"
             style="text-align: center; opacity: 1; position: relative; height: 1.25rem; line-height: 1.25rem; font-size: 0.75rem; color: #ffffff">
          <span>由弈起嗨提供服务支持</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
</style>
<script>
  export default {
    data() {
      return {
        data: {
          introduce: null
        }
      };
    },
    created() {
      this.$http.get('/get-webiste-edit').then(ret => {
        Object.assign(this, ret.json());
      });
    }
  };
</script>
<style lang="styl" src="./index.styl" scoped/>

