/**
 * Created by shuxun on 16/8/28.
 */
/**
 * Created by shuxun on 16/8/28.
 */
import Mock from 'mockjs';

const Random = Mock.Random;

export default [
  {
    componentId: '1',
    componentName: '首页',
    template: `
<div class="component-wrap" style="position:relative;">
  <div class="element-box function-element editable"
       style="width:100%;height: 200px;overflow: hidden;position: relative;">
    <div class="slick">
      <div>
        <img style="width:100%;height:100%;" src="https://placem.at/places?w=375&h=200">
      </div>
    </div>
  </div>
</div>
`,
    componentType: '1',
    iconfontClass: 'icon-shouye',
    state: '1',
    updateTime: '',
    data: {
      banners: [
        {
          imgId: '176090445257887744',
          imgUrl: 'website/banner_default_1.jpg',
          componentType: '1',
          imgIndex: 1,
          bannerId: '8',
          state: '1',
          createTime: '',
          imgSize: ''
        },
        {
          imgId: '176090445257887745',
          imgUrl: 'website/banner_default_2.jpg',
          componentType: '1',
          imgIndex: 2,
          bannerId: '9',
          state: '1',
          createTime: '',
          imgSize: ''
        }
      ]
    },
    createTime: '2016-08-16 11:13:23.0'
  },
  {
    componentId: '2',
    componentName: '场馆介绍',
    template: `<div class="component-wrap" style="position: relative; padding: 0 0.5rem">
  <div class="element-box text-element"
       style="text-align: center; position: relative; height: 3.125rem; top: 1.8125rem; font-size: 1rem">
    <span>场馆介绍</span>
  </div>
  <div class="element-box text-element"
       style="text-align: center; position: relative; height: 1.875rem; font-size: .8125rem; color: #808080">
    <span>Venue introduction</span>
  </div>
  <div class="element-box drop-element" style="position: relative">
    <div class="drop-element-content text-element drop-off" 
         style="text-align: center; width: 100%; height: 4.125rem; font-size: .875rem; line-height: 1.25rem;
                padding: .4375rem; position: relative; overflow: hidden"
         drop-id="drop_01" drop-height="34">
      <span>{{ introduce }}</span>
    </div>
    <div class="drop-element-button text-element drop-off"
         style="text-align: left; height: 4.0625rem; line-height: 4.0625rem; font-size: .8125rem;
                padding: 0 .4375rem; position: relative; top: 0.3125rem"
         drop-id="drop_01">
      <i class="iconfont"></i>显示更多
    </div>
  </div>
</div>
`,
    componentType: '2',
    iconfontClass: 'icon-changguanjieshao',
    state: '1',
    updateTime: '',
    data: {
      'introduce': Random.csentence(200)
    },
    createTime: '2016-08-16 11:13:23.0'
  },
  {
    componentId: '4',
    componentName: '教练',
    template: `
<div class="component-wrap" style="position: relative">
  <div class="component-inner">
    <div class="element-box text-element"
         style="text-align: center; position: relative; height: 3.125rem; top: 1.8125rem; font-size: 1rem">
      <span>教练</span>
    </div>
    <div class="element-box text-element"
         style="text-align: center; position: relative; height: 1.875rem; font-size: 0.8125rem; color: #808080">
      <span>Coach</span>
    </div>
    <div class="element-box drop-element"
         style="text-align: center; position: relative; padding: 0 0.9375rem">
      <div class="drop-element-content text-element drop-off"
           style="text-align: left; width: 100%; height: 25.1875rem; position: relative; overflow: hidden"
           drop-id="drop_03" drop-height="403">
        <div style="height: 5.625rem; position: relative; margin-top: 0.625rem">
          <div style="float: left; width: 5rem; height: 5rem;
                        background-image: url('https://placem.at/places?w=80&h=80')"></div>
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
        <div style="height: 5.625rem; position: relative; margin-top: 0.625rem">
          <div
            style="float: left; width: 5rem; height: 5rem; 
            background-image: url('https://placem.at/places?w=80&h=80')"></div>
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
        <div style="height: 5.625rem; position: relative; margin-top: 0.625rem">
          <div
            style="float: left; width: 5rem; height: 5rem; 
            background-image: url('https://placem.at/places?w=80&h=80')"></div>
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
        <div style="height: 5.625rem; position: relative; margin-top: 0.625rem">
          <div
            style="float: left; width: 5rem; height: 5rem; 
            background-image: url('https://placem.at/places?w=80&h=80')"></div>
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
           style="text-align: left; width: 100%; height: 4.0625rem; 
           line-height: 4.0625rem; font-size: 0.8125rem; position: relative; top: 0.3125rem"
           drop-id="drop_03">
        <i class="iconfont"></i>
      </div>
    </div>
  </div>
</div>
`,
    componentType: '4',
    iconfontClass: 'icon-kechengjieshao',
    state: '1',
    updateTime: '',
    data: {
      coaches: [
        {
          coachId: '175015599738398720',
          userId: '156515357503291392',
          coachName: '冯雨',
          mobile: '',
          createTime: '',
          updateTime: '',
          sex: 'M',
          wxNo: '',
          skills: '',
          achievements: '',
          icon: '',
          state: '',
          brief: '',
          mobileVisible: '',
          whetherSubSelf: '',
          cardDeduTimes: '',
          abstract: ''
        },
        {
          coachId: '173721499552577536',
          userId: '173721499546286080',
          coachName: '晓晓',
          mobile: '',
          createTime: '',
          updateTime: '',
          sex: 'F',
          wxNo: '',
          skills: '',
          achievements: '',
          icon: '',
          state: '',
          brief: '这是...的简介',
          mobileVisible: '',
          whetherSubSelf: '',
          cardDeduTimes: '',
          abstract: ''
        }
      ]
    },
    createTime: '2016-08-16 11:13:23.0'
  },
  {
    componentId: '6',
    componentName: '联系我们',
    template: `
<div>
  <div class="component-wrap" style="position: relative; background-color: #efefef; padding: 0 0.9375rem 1.25rem">
    <div class="component-inner">
      <div class="element-box text-element"
           style="text-align: center; position: relative; 
           height: 3.125rem; top: 1.8125rem; font-size: 1rem">
        <span>联系我们</span>
      </div>
      <div class="element-box text-element"
           style="text-align: center; position: relative; 
           height: 1.25rem; font-size: 0.8125rem; color: #808080">
        <span>Contact Us</span>
      </div>
      <div class="element-box text-element"
           style="text-align: left; position: relative; 
           line-height: 1.25rem; font-size: 0.875rem; clear: both; overflow: auto">
        <span style="float: left; width: 4rem; display: block">馆&emsp;&emsp;主:</span>
        <span style="float: left; width: 17.1875rem; display: block; 
        padding-left: 0.3125rem">孟海华领军人才创业园领军人才创业园领军人才创业园领军人才创业园领军人才创业园</span>
      </div>
      <div class="element-box text-element"
           style="text-align: left; position: relative; 
           line-height: 1.25rem; font-size: 0.875rem; clear: both; overflow: auto">
        <span style="float: left; width: 4rem; display: block">联系电话:</span>
        <span style="float: left; width: 17.1875rem; display: block; padding-left: 0.3125rem">18888888888</span>
      </div>
      <div class="element-box text-element"
           style="text-align: left; position: relative; 
           line-height: 1.25rem; font-size: 0.875rem; clear: both; overflow: auto">
        <span style="float: left; width: 4rem; display: block">营业时间:</span>
        <span style="float: left; width: 17.1875rem; display: block; padding-left: 0.3125rem">09:00--21:00</span>
      </div>
      <div class="element-box text-element"
           style="text-align: left; position: relative; 
           line-height: 1.25rem; font-size: 0.875rem; clear: both; overflow: auto">
        <span style="float: left; width: 4rem; display: block">地&emsp;&emsp;址:</span>
        <span style="float: left; width: 17.1875rem; display: block; padding-left: 0.3125rem">
          领军人才创业园领军人才创业园领军人才创业园领军人才创业园领军人才创业园
        </span>
      </div>
      <div class="element-box sharp-element"
           style="text-align: left; position: relative; 
           height: 1px; background-color: #1a1a1a; width: auto; margin-top: 1.0625rem">
      </div>
      <div class="element-box text-element"
           style="text-align: center; position: relative; 
           height: 3.125rem; top: 1.875rem; color: #808080; font-size: 0.8125rem">
        <span>微信号:</span>
        <span>asdfasdfasfa</span>
      </div>
      <div class="element-box img-element"
           style="text-align: center; position: relative; 
           width: 9.375rem; height: 9.375rem; left: 5.8125rem">
        <div style="width: 9.375rem; height: 9.375rem; 
        background: url('https://placem.at/places?w=150&h=150')"></div>
      </div>
    </div>
  </div>
  <div class="component-wrap" style="position: relative; 
  background-color: #323232; padding: 0.625rem 0.9375rem">
    <div class="component-inner">
      <div class="element-box text-element"
           style="text-align: center; position: 
           relative; height: 1.25rem; line-height: 1.25rem; font-size: 0.75rem; color: #ffffff">
        <span>@2016 静慧瑜伽工作室版权所有</span>
      </div>
      <div class="element-box text-element"
           style="text-align: center; position: 
           relative; height: 1.25rem; line-height: 1.25rem; font-size: 0.75rem; color: #ffffff">
        <span>由弈起嗨提供服务支持</span>
      </div>
    </div>
  </div>
</div>`,
    componentType: '6',
    iconfontClass: 'icon-lianxiwomen',
    state: '1',
    updateTime: '',
    data: {
      merchantInfo: {
        merchantName: '1测试',
        mobile: '12345678',
        createTime: '',
        appid: '',
        wxNo: '123456',
        token: '',
        merchantOwnerName: '测试CEO',
        province: '320000',
        city: '320100',
        area: '320104',
        address: '江苏南京市秦淮区南京领军人才创业园',
        merchantDesc: '产业互\n联网',
        logo: '12345678910/merchant/175143681908887552.png',
        icon: '12345678910/expVoucher/153252150050639872.jpg',
        longitude: '118.817221',
        latitude: '32.007969',
        wxName: '测试微信号',
        appsecret: '',
        title: 'ABCDEF',
        qrcode: '12345678910/merchant/143063327189540864.jpg.430x430',
        provinceName: '',
        cityName: '',
        areaName: '',
        businessHour: '08:00-21:00',
        servPackIds: '',
        merchantConfig: '',
        articleMessages: '',
        msgHandlers: '',
        ext: ''
      }
    },
    createTime: '2016-08-16 14:29:18.0'
  }
];
