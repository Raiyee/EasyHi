webpackJsonp([10],{652:function(t,e,n){var s,i;s=n(675);var o=n(714);i=s=s||{},"object"!=typeof s.default&&"function"!=typeof s.default||(i=s=s.default),"function"==typeof i&&(i=i.options),i.render=o.render,i.staticRenderFns=o.staticRenderFns,t.exports=s},675:function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(24),o=n(702),r=s(o),a={data:function(){return{text:"",classes:r.default}},template:'<div class="container">For example: (Just the part of js)\n<a href="https://jsfiddle.net/JounQin/87sv5beu/embedded/">JsFiddle</a><br>\nMore complex:\n<a href="https://jsfiddle.net/JounQin/aq0yjj7L/embedded">JsFiddle</a>\n<textarea :class="classes.text" v-model="text"/></div>'};e.default={name:"website-edit",data:function(){return{built:!1,comps:null,emptyView:a,classes:r.default}},created:function(){this.comps=this.$route.meta.data},methods:{rebuild:function(){if(this.built)return this.comps=null;try{var t=this.$refs.component.$children[0].text,e=Function.call(null,"return "+t);e&&(this.comps=e())}catch(t){(0,i.error)(t),alert("请确认输入的内容是合法的模版数组")}},compBuilt:function(t){this.built=!t}}},t.exports=e.default},689:function(t,e,n){e=t.exports=n(97)(),e.push([t.i,".U7XntStLGFwUJDyX04GQ0,._37IfmKMqkIM7ok_xJbW_IX{margin-top:.625rem}._37IfmKMqkIM7ok_xJbW_IX{width:100%;height:31.25rem}",""]),e.locals={btn:"U7XntStLGFwUJDyX04GQ0",btn:"U7XntStLGFwUJDyX04GQ0",text:"_37IfmKMqkIM7ok_xJbW_IX",text:"_37IfmKMqkIM7ok_xJbW_IX"}},702:function(t,e,n){var s=n(689);"string"==typeof s&&(s=[[t.i,s,""]]);n(645)(s,{});s.locals&&(t.exports=s.locals)},714:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return e("div",[e("div",{staticClass:"text-center"},[e("button",{staticClass:"btn",class:t.classes.btn,on:{click:t.rebuild}},[t._s(t.built?"Clear":"Rebuild")+" your own view"])])," ",e("hr")," ",e("dynamic",{ref:"component",attrs:{comps:t.comps,emptyView:t.emptyView},on:{built:t.compBuilt}})])},staticRenderFns:[]}}});