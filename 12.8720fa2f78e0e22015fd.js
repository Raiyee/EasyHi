webpackJsonp([12],{658:function(t,o,n){var e,a;e=n(679);var i=n(722);a=e=e||{},"object"!=typeof e.default&&"function"!=typeof e.default||(a=e=e.default),"function"==typeof a&&(a=a.options),a.render=i.render,a.staticRenderFns=i.staticRenderFns,t.exports=e},679:function(t,o,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var e=n(24),a=void 0;o.default={data:function(){return{options:{backdrop:!1,show:!0,destroy:!0}}},methods:{addModal:function(){a=this.$modal.open({id:a,component:n.e(15).then(n.bind(null,660)),options:this.options,props:{bodyMsg:"Just test body",transition:"bounce"}})},clearModal:function(){this.$modal.clear()},confirmModal:function(){(0,e.confirmOn)({tipText:"测试confirm 模态框",confirmText:"蓝瘦,香菇",confirm:function(){console.log("It is after confirm btn"),this.$modal.close()},cancel:function(){console.log("It is after cancel modal"),this.$modal.close()}})},tipModal:function(){(0,e.tipOn)({tipText:'I am  a confirm <span style="color: red">red</span> modal tip Text',confirm:function(){console.log("It is after tip modal"),this.$modal.close()}})},toastModal:function(){(0,e.toastOn)({tipText:"I am  a confirm modal tip Text",remove:function(){console.log("It is a toast"),this.$modal.close()},timeout:5e3})}}},t.exports=o.default},722:function(t,o){t.exports={render:function(){var t=this;return t._h("div",[t._h("button",{staticClass:"btn btn-theme-primary",on:{click:t.addModal}},["Add modal"])," ",t._h("button",{staticClass:"btn btn-theme-default",on:{click:t.clearModal}},["Clear modal"])," ",t._h("button",{staticClass:"btn btn-theme-default",on:{click:t.confirmModal}},["Confirm modal"])," ",t._h("button",{staticClass:"btn btn-theme-default",on:{click:t.tipModal}},["Tip modal"])," ",t._h("button",{staticClass:"btn btn-theme-default",on:{click:t.toastModal}},["Toast modal"])])},staticRenderFns:[]}}});