webpackJsonp([51],{1093:function(e,i,s){var t=function(){var e=this,i=e.$createElement,s=e._self._c||i;return s("div",{class:e.classes.container},[e.subscribes&&e.subscribes.length>0?[s("div",{class:e.classes.header},[e.subscribes.length>1?s("div",{class:e.classes.headerContent},[s("hr"),s("div",[s("span",[e._v("“")]),s("span",{class:e.classes.maxWidth},[e._v(e._s(e.memberName))]),s("span",[e._v("”要上的课")])]),s("hr")]):s("div",{class:e.classes.success},[s("span",{staticClass:"iconfont icon-solid-circle-hook theme-color"}),s("div",[s("span",[e._v(e._s(e.memberName))]),s("span",[e._v("签到成功")])])])])]:s("hi-empty",{attrs:{text:"该用户今天没有要上的课"}}),s("div",{class:e.classes.body},e._l(e.subscribes,function(i){return s("div",{key:i.subscribeId,class:e.classes.schedule,on:{click:function(s){e.goScheduleDetail(i.scheduleId)}}},[s("div",{staticClass:"media-left"},[e._v(e._s(e._f("formatDate")(i.scheduleStartTime,"HH:mm")))]),s("div",{staticClass:"media-body"},[s("div",[e._v(e._s(i.scheduleName))]),s("div",[e._v("时长: "+e._s(i.scheduleDuration)+"min")]),s("div",[s("span",[s("span",[e._v(e._s(e.coachAlias)+":")]),s("span",{class:e.classes.maxWidth},[e._v(e._s(i.coachName))])]),s("span",[e._v("签到: "+e._s(i.scheduleCheckedNum)+"/"+e._s(i.scheduleBooked))])])]),s("div",{staticClass:"media-right"},[s("div",[e._v(e._s(i.courseTypeName))]),e.subscribes.length>1?s("div",{class:i.subscribeChecked?e.classes.cancel:"theme-color theme-bd",on:{click:function(s){s.stopPropagation(),e.toggleCheckin(i)}}},[e._v(e._s(i.subscribeChecked?"取消":"")+"签到")]):e._e()])])})),s("div",{class:e.classes.btn},[s("div",{staticClass:"theme-color theme-bd",on:{click:e.goCheckinList}},[e._v("回签到列表")]),s("div",{staticClass:"theme-bg",on:{click:e.goSingleCheckin}},[e._v("继续扫码签到")])])],2)},r=[];e.exports=function(e){return e=e||{},e.render=t,e.staticRenderFns=r,e}},538:function(e,i,s){"use strict";function t(e){return function(){var i=e.apply(this,arguments);return new Promise(function(e,s){function t(r,c){try{var n=i[r](c),a=n.value}catch(e){return void s(e)}if(!n.done)return Promise.resolve(a).then(function(e){t("next",e)},function(e){t("throw",e)});e(a)}return t("next")})}}Object.defineProperty(i,"__esModule",{value:!0});var r=Object.assign||function(e){for(var i=1;i<arguments.length;i++){var s=arguments[i];for(var t in s)Object.prototype.hasOwnProperty.call(s,t)&&(e[t]=s[t])}return e},c=s(48),n=s(1),a=s(985),o=function(e){return e&&e.__esModule?e:{default:e}}(a);i.default=s(1093)({name:"qr-code-checkin",data:function(){return r({classes:o.default},this.$route.meta.data)},computed:r({},(0,c.mapGetters)(["coachAlias","merchantUrlPrefix"])),methods:{goScheduleDetail:function(e){location.href=this.merchantUrlPrefix+"merchant-checkin/detail/"+e+"/"+this.$route.params.userId},toggleCheckin:function(){function e(e){return i.apply(this,arguments)}var i=t(regeneratorRuntime.mark(function e(i){var s=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.$http.post("/merchant-checkin/check-single",{subscribeId:i.subscribeId,operatorType:+!i.subscribeChecked+""});case 2:(0,n.toast)({tipText:(i.subscribeChecked?"取消":"签到")+"成功",close:function(){s.changeCheckin(i,i.subscribeChecked),(0,n.closeModal)()}});case 3:case"end":return e.stop()}},e,this)}));return e}(),changeCheckin:function(e,i){var s=e.subscribeId,t=e.scheduleId;this.subscribes.forEach(function(r){s===r.subscribeId&&(r.subscribeChecked=!r.subscribeChecked),t===r.scheduleId&&(r.scheduleCheckedNum+=e.subscribeNum*(i?-1:1))})},goCheckinList:function(){location.href=this.merchantUrlPrefix+"merchant-checkin/list"},goSingleCheckin:function(){var e=this;(0,n.initWxJs)().then(function(){return e.$wx.scanQRCode()})}}}),e.exports=i.default},856:function(e,i,s){i=e.exports=s(60)(!1),i.push([e.i,"._2yDNSglG2mo_zVmnM2t8av{display:block}._1d4cxScD2e0Lx2WLOiMxcU{margin-bottom:.625rem;background-color:#fff;box-shadow:3px 0 10px #e5e5e5}._1ky2YifycvdENGEAYBRWeq{display:-webkit-box;display:flex;padding:0 .625rem;white-space:nowrap}._1ky2YifycvdENGEAYBRWeq>hr{-webkit-box-flex:1;flex:1;margin:0;padding-top:.9375rem;border-top:none;border-bottom:1px solid #e5e5e5}._1ky2YifycvdENGEAYBRWeq>div{-webkit-box-flex:1;flex:1;line-height:1;padding:.5rem .625rem .625rem;text-align:center}._1ky2YifycvdENGEAYBRWeq>div>span{display:inline-block;vertical-align:middle}._3PQciKEJHDlaOOUmhbwa6r{display:block;text-align:center}._3PQciKEJHDlaOOUmhbwa6r>.iconfont{display:block;font-size:4.25rem;padding:1.5625rem 0 .9375rem}._3PQciKEJHDlaOOUmhbwa6r>div{font-size:1.125rem;padding-bottom:1.6875rem;color:#000}._3PQciKEJHDlaOOUmhbwa6r>div>span{display:inline-block;vertical-align:middle}._3PQciKEJHDlaOOUmhbwa6r>div>:first-child{max-width:4.375rem;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}._3clpPsbgjbpLbRljmQzevi{background:#fff;padding:0 .625rem}._3clpPsbgjbpLbRljmQzevi>div:not(:last-child){border-bottom:1px solid #f1f1f1}.dL3nBlKRF6PvdFqoSrFpK{height:5.625rem;padding:1rem 0 .9375rem .625rem}.dL3nBlKRF6PvdFqoSrFpK .media-left{font-size:1.125rem;color:#000;white-space:nowrap}.dL3nBlKRF6PvdFqoSrFpK .media-body>div:first-child{font-size:1rem;color:#000}.dL3nBlKRF6PvdFqoSrFpK .media-body>:last-child>:first-child{display:-webkit-inline-box;display:inline-flex;padding-right:.9375rem}.dL3nBlKRF6PvdFqoSrFpK .media-right{position:relative;white-space:nowrap}.dL3nBlKRF6PvdFqoSrFpK .media-right>:first-child{color:#b7b7b7}.dL3nBlKRF6PvdFqoSrFpK .media-right>:nth-child(2){position:absolute;right:0;bottom:0;line-height:1;padding:.375rem;min-width:4.6875rem;text-align:center;border:1px solid #d0d0d0;border-radius:.9375rem}._3E5DEIFkLAfH4jIBxJ4Mvf{color:gray}._10ro8aFyGGLeg7ch2UqCK1{display:inline-block;max-width:3.125rem;overflow:hidden;vertical-align:middle;white-space:nowrap;text-overflow:ellipsis}._1fqsQ5LX1ySfnGAZfoYOIA{display:-webkit-box;display:flex;margin-top:3.125rem;padding:0 1.0625rem}._1fqsQ5LX1ySfnGAZfoYOIA>div{-webkit-box-flex:1;flex:1;margin:0 .625rem;border:1px solid;text-align:center;font-size:1rem;line-height:1;padding:.5625rem;border-radius:1.0625rem}._1fqsQ5LX1ySfnGAZfoYOIA:last-child{color:#fff}",""]),i.locals={container:"_2yDNSglG2mo_zVmnM2t8av",header:"_1d4cxScD2e0Lx2WLOiMxcU","header-content":"_1ky2YifycvdENGEAYBRWeq",headerContent:"_1ky2YifycvdENGEAYBRWeq",success:"_3PQciKEJHDlaOOUmhbwa6r",body:"_3clpPsbgjbpLbRljmQzevi",schedule:"dL3nBlKRF6PvdFqoSrFpK",cancel:"_3E5DEIFkLAfH4jIBxJ4Mvf","max-width":"_10ro8aFyGGLeg7ch2UqCK1",maxWidth:"_10ro8aFyGGLeg7ch2UqCK1",btn:"_1fqsQ5LX1ySfnGAZfoYOIA"}},985:function(e,i,s){var t=s(856);"string"==typeof t&&(t=[[e.i,t,""]]);var r={};r.transform=void 0;s(152)(t,r);t.locals&&(e.exports=t.locals)}});