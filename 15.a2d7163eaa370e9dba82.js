webpackJsonp([15],{142:function(t,e,i){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=i(188),n=o(r);e.default=i(351)({name:"login",methods:{confirm:function(){this.$router.replace(this.$route.query.from||"/")}},components:{HiLogin:n.default}}),t.exports=e.default},188:function(t,e,i){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o])}return t},n=i(6),a=i(199),s=o(a);e.default=i(203)({name:"hi-login",data:function(){return{classes:s.default,limit:0,loginMobile:null,verificationCode:null}},props:{confirmText:{type:String,default:"登录"},confirm:Function},created:function(){this.loginMobile=this.mobile},computed:r({},(0,n.mapGetters)(["mobile"])),methods:r({},(0,n.mapActions)(["setEnv","resetRole"]),{clearMobile:function(){this.loginMobile=null,this.$refs.mobile.focus()},getVerificationCode:function(){var t=this,e=this.$v.loginMobile;e.$touch(),this.limit||e.$error||this.$http.post("/getVerificationCode",{mobile:this.loginMobile}).then(function(e){var i=e.data;t.limit=i;var o=setInterval(function(){--t.limit||clearInterval(o)},1e3)})},submit:function(){var t=this,e=this.$v.loginMobile,o=this.$v.verificationCode;if(e.$touch(),o.$touch(),!e.$error&&!o.$error){var r=this.loginMobile;this.$http.post("/verifyCode",{verificationCode:this.verificationCode,mobile:r}).then(function(e){var o=e.data,n=o.error;if(n)return t.$util.alert(n);i(35).setItems({mobile:r}),t.resetRole(Object.assign({mobile:r},o)),t.confirm&&t.confirm()})}}}),validator:{loginMobile:{mobile:!0},verificationCode:{length:6}}}),t.exports=e.default},191:function(t,e,i){e=t.exports=i(12)(),e.push([t.i,"._3aHgG0pizNBNW_T7ELBe55 form{padding:0 .625rem;margin:0 auto}@media (min-width:768px){._3aHgG0pizNBNW_T7ELBe55 form{width:50%}}._2r3U2zyxfCd3yGLjwRvrl-{width:5.9375rem;height:5.9375rem;margin-top:2.5rem;margin-bottom:2.5rem;position:relative;background-color:#e5e5e5}._2r3U2zyxfCd3yGLjwRvrl->img{width:5.625rem;height:5.625rem;position:absolute;left:50%;top:50%;-webkit-transform:translate3d(-50%,-50%,0);transform:translate3d(-50%,-50%,0)}.ud3vOW23iR0QH7uCwlskk{margin-bottom:1.5625rem}.ud3vOW23iR0QH7uCwlskk .form-control-static{padding-left:3.125rem;padding-bottom:0}",""]),e.locals={container:"_3aHgG0pizNBNW_T7ELBe55",yoga:"_2r3U2zyxfCd3yGLjwRvrl-","form-group":"ud3vOW23iR0QH7uCwlskk",formGroup:"ud3vOW23iR0QH7uCwlskk"}},199:function(t,e,i){var o=i(191);"string"==typeof o&&(o=[[t.i,o,""]]);i(13)(o,{});o.locals&&(t.exports=o.locals)},202:function(t,e,i){t.exports=i.p+"yoga.b124d4aa1794ed4ac0ec0be1879afdaa.jpg"},203:function(t,e,i){var o=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{class:t.classes.container},[o("div",{staticClass:"center-block img-circle",class:t.classes.yoga},[o("img",{staticClass:"img-circle",attrs:{src:i(202),alt:"瑜伽"}})]),o("form",{attrs:{action:"javascript:;"},on:{submit:function(e){e.preventDefault(),t.submit(e)}}},[o("div",{class:[t.classes.formGroup,t.$v.loginMobile.$error&&"has-error"]},[o("div",{staticClass:"input-group input-group-primary"},[t._m(0),o("input",{directives:[{name:"model",rawName:"v-model",value:t.loginMobile,expression:"loginMobile"}],ref:"mobile",staticClass:"form-control",attrs:{type:"number",placeholder:"请输入手机号"},domProps:{value:t.loginMobile},on:{focus:t.$v.loginMobile.$reset,blur:[t.$v.loginMobile.$touch,function(e){t.$forceUpdate()}],input:function(e){e.target.composing||(t.loginMobile=e.target.value)}}}),t.loginMobile?o("span",{staticClass:"input-group-addon",on:{click:t.clearMobile}},[o("span",{staticClass:"glyphicon glyphicon-remove-sign"})]):t._e()]),t.$v.loginMobile.$error?o("p",{staticClass:"form-control-static"},[t._v("请输入正确的手机号码")]):t._e()]),o("div",{class:[t.classes.formGroup,t.$v.verificationCode.$error&&"has-error"]},[o("div",{staticClass:"input-group input-group-primary"},[t._m(1),o("input",{directives:[{name:"model",rawName:"v-model",value:t.verificationCode,expression:"verificationCode"}],staticClass:"form-control",attrs:{type:"number",placeholder:"请输入验证码"},domProps:{value:t.verificationCode},on:{focus:t.$v.verificationCode.$reset,blur:[t.$v.verificationCode.$touch,function(e){t.$forceUpdate()}],input:function(e){e.target.composing||(t.verificationCode=e.target.value)}}}),o("span",{staticClass:"input-group-addon theme-color",on:{click:t.getVerificationCode}},[t._v(t._s(this.limit?this.limit+"s":"获取验证码"))])]),t.$v.verificationCode.$error?o("p",{staticClass:"form-control-static"},[t._v("请输入正确的验证码")]):t._e()]),o("button",{staticClass:"btn btn-theme-primary btn-block btn-hg",attrs:{type:"submit"}},[t._v(t._s(t.confirmText))])])])},r=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("span",{staticClass:"input-group-addon"},[i("span",{staticClass:"glyphicon glyphicon-phone"})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("span",{staticClass:"input-group-addon"},[i("span",{staticClass:"glyphicon glyphicon-lock"})])}];t.exports=function(t){return t=t||{},t.render=o,t.staticRenderFns=r,t}},351:function(t,e,i){var o=function(){var t=this,e=t.$createElement;return(t._self._c||e)("hi-login",{attrs:{confirm:t.confirm}})},r=[];t.exports=function(t){return t=t||{},t.render=o,t.staticRenderFns=r,t}}});