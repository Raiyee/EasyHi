webpackJsonp([13],{544:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(612),a=i(r),o=n(712),s=i(o),l={data:function(){return{text:"",classes:s.default}},template:'<div class="container">For example: (Just the part of js)\n<a href="https://jsfiddle.net/JounQin/87sv5beu/embedded/" target="_blank">JsFiddle</a><br>\nMore complex:\n<a href="https://jsfiddle.net/JounQin/aq0yjj7L/embedded" target="_blank">JsFiddle</a>\n<textarea :class="classes.text" v-model="text"/></div>'};t.default=n(778)({name:"website-edit",data:function(){return{built:!1,comps:null,emptyView:l,classes:s.default}},created:function(){this.comps=this.$route.meta.data},methods:{rebuild:function(){if(this.built)return this.comps=null;try{var e=this.$refs.component.$children[0].text,t=Function.call(null,"return "+e);t&&(this.comps=t())}catch(e){this.$util.error(e),alert("请确认输入的内容是合法的模版数组")}},compBuilt:function(e){this.built=!e}},components:{Dynamic:a.default}}),e.exports=t.default},612:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t){var n=4,i=15;if(void 0===t&&(t=0),t+=1,null===e)return"null";if(void 0===e)return"void";if("string"==typeof e||"number"==typeof e||"boolean"==typeof e)return"undefined"==typeof e?"undefined":(0,o.default)(e);if(!Array.isArray(e)){var a=(0,d.default)(e);if(!a.length)return e.constructor&&e.constructor.name&&"Object"!==e.constructor.name?e.constructor.name:"Object";if(t>n)return"{...}";var s="  ".repeat(t-1),l=a.slice(0,i).map(function(n){return(/^([A-Z_$][A-Z0-9_$]*)$/i.test(n)?n:(0,m.default)(n))+": "+r(e[n],t)+";"}).join("\n  "+s);return a.length>=i&&(l+="\n  "+s+"..."),e.constructor&&e.constructor.name&&"Object"!==e.constructor.name?e.constructor.name+" {\n  "+s+l+"\n"+s+"}":"{\n  "+s+l+"\n"+s+"}"}if(!(e.length>0))return"Array";var u=function(){if(t>n)return{v:"[...]"};var a=r(e[0],t);return e.every(function(e){return r(e,t)===a})?{v:a.trim()+"[]"}:{v:"["+e.slice(0,i).map(function(e){return r(e,t)}).join(", ")+(e.length>=i?", ...":"")+"]"}}();return"object"===("undefined"==typeof u?"undefined":(0,o.default)(u))?u.v:void 0}Object.defineProperty(t,"__esModule",{value:!0});var a=n(45),o=i(a),s=n(72),l=i(s),u=n(61),m=i(u),c=n(38),d=i(c),p=n(13),f=i(p),h=n(62),v=i(h),y=n(71),g=i(y),b=n(12),x=function(e){var t=[];if(u=(0,g.default)(e),!u||"function"!=typeof u[v.default]&&!Array.isArray(u))throw new TypeError("Expected _Object$entries to be iterable, got "+r(u));var n=!0,i=!1,a=void 0;try{for(var o,s=u[Symbol.iterator]();!(n=(o=s.next()).done);n=!0){var u,m=(0,l.default)(o.value,2),c=m[0],d=m[1];(0,b.isObject)(d)&&t.push((0,f.default)(d,{name:c}))}}catch(e){i=!0,a=e}finally{try{!n&&s.return&&s.return()}finally{if(i)throw a}}return t},w=function(e){return(0,b.warn)("invalid "+e+" will be ignored!")},_=function(e){return(0,b.warn)("no "+e+" found thus it will be ignored!")},A=function e(t,n){if(t){if((0,b.isObject)(t))t=x(t);else if(!(0,b.isArray)(t))return w("components");if(!t.length)return _("components");var i="",a={},o=0;if(t.forEach(function(t,n){var s=t.name,u=void 0===s?"_"+n:s,m=t.template,c=t.data,d=t.methods,p=t.components;if(!m)return _("template");i+="<"+u+"/>";var f=a[u]={template:m};if((0,b.isObject)(d)){var h={};if(C=(0,g.default)(d),!C||"function"!=typeof C[v.default]&&!Array.isArray(C))throw new TypeError("Expected _Object$entries2 to be iterable, got "+r(C));var y=!0,x=!1,A=void 0;try{for(var M,j=C[Symbol.iterator]();!(y=(M=j.next()).done);y=!0){var C,k=(0,l.default)(M.value,2),F=k[0],I=k[1];h[F]=(0,b.isFunction)(I)?I:Function[(0,b.isArray)(I)?"apply":"call"](null,I)}}catch(e){x=!0,A=e}finally{try{!y&&j.return&&j.return()}finally{if(x)throw A}}f.methods=h}else if(d)return w("methods");c&&(f.data=(0,b.isFunction)(c)?c:function(){return c}),p&&(f.components=e(p,!0)),o++}),o)return n?a:{name:"Dynamic--Root",template:1===o?i:"<div>"+i+"</div>",components:a}}};t.default={name:"dynamic",template:'<comment :is="view"/>',props:{comps:{validator:function(e){return!e||(0,b.isArray)(e)||(0,b.isObject)(e)}},emptyView:{required:!0,validator:function(e){return(0,b.isObject)(e)}}},data:function(){return{view:this.emptyView}},created:function(){this.reBuild()},watch:{comps:function(){this.reBuild()}},methods:{reBuild:function(){var e=A(this.comps);this.view=e||this.emptyView,this.$emit("built",this.view===this.emptyView)}}},e.exports=t.default},641:function(e,t,n){t=e.exports=n(113)(),t.push([e.i,".M3hA4GxChPU83H5M96t1f a{color:#add8e6}.U7XntStLGFwUJDyX04GQ0,._37IfmKMqkIM7ok_xJbW_IX{margin-top:.625rem}._37IfmKMqkIM7ok_xJbW_IX{width:100%;height:31.25rem}","",{version:3,sources:["/../../src/views/_Dynamic/src/views/_Dynamic/index.styl","/../../src/views/_Dynamic/node_modules/stylus-pxtorem/lib/stylus-px2rem/mixins.styl","/../../src/views/_Dynamic/index.styl"],names:[],mappings:"AAAA,yBACE,aAAA,CAKF,gDC0BS,kBAAA,CD1BT,yBC0BS,WAAA,eAAA,CCAR",file:"index.styl",sourcesContent:[".container a\n  color lightblue\n\n.btn\n  margin-top 10px\n\n.text\n  width 100%\n  height 500px\n  margin-top 10px\n",'/**\n    px2rem 自动将 px 转换成 rem\n    兼容报告： http://caniuse.com/#feat=rem\n\n    设置html的字体大小 font-size =10px 那么此时 1rem = 10px\n    小于 12px 或者 75% 的字体大小 rem 确实不支持这种换算\n*/\nhtml-font-size ?= 16px;\n// style-names ?= width height min-height max-height min-width max-width border margin margin-top margin-bottom margin-left margin-right padding padding-left padding-right padding-bottom padding-top line-height;\nstyle-names ?= "min-height" "max-height" "min-width" "max-width" "width" "height" "border" "margin" "margin-top" "margin-bottom" "margin-left" "margin-right" "padding" "padding-left" "padding-right" "padding-bottom" "padding-top" "line-height"\n// value less then ignore_limit will be ignored and return the original value\npx2rem_ignore_limit ?= 1\n\npx2rem(prop,values){\n    values-px = null;\n    values-rem = null;\n    need_normalize = !prop in style-names\n    for value in values {\n        //match(\'-gradient\\(\', \'\'+arguments)\n        if (typeof(value) == \'unit\' && value != 0 && match(\'px$\',\'\'+value)) {\n            if(abs(value) <= px2rem_ignore_limit){\n                value-rem = value;\n            }else if(!need_normalize){\n                value-rem = unit(value / html-font-size,\'rem\');\n            }else{\n                value-rem = unit(value ,\'rem\');\n            }\n            push(values-rem,value-rem)\n        } else {\n            push(values-rem,value)\n        }\n    }\n    {prop} : values-rem;\n}',"/*\n *  Fonts.css -- Cross-platform Chinese fonts solution\n *\n *  Copyright (C) 2013-2015 Zeno Zeng\n *  Released under the MIT license\n *\n *  Github: https://github.com/zenozeng/fonts.css\n */\n@media (min-resolution: 2dppx) {\n}\n@media (min-resolution: 2dppx) {\n}\n@media (min-resolution: 2dppx) {\n}\n@media (min-resolution: 2dppx) {\n}\n@media (min-resolution: 2dppx) {\n}\n@media (min-resolution: 2dppx) {\n}\n@media (min-resolution: 2dppx) {\n}\n.container a {\n  color: #add8e6;\n}\n.btn {\n  margin-top: 0.625rem;\n}\n.text {\n  width: 100%;\n  height: 31.25rem;\n  margin-top: 0.625rem;\n}\n/*# sourceMappingURL=src/views/_Dynamic/index.css.map */"],sourceRoot:"webpack://"}]),t.locals={container:"M3hA4GxChPU83H5M96t1f",container:"M3hA4GxChPU83H5M96t1f",btn:"U7XntStLGFwUJDyX04GQ0",btn:"U7XntStLGFwUJDyX04GQ0",text:"_37IfmKMqkIM7ok_xJbW_IX",text:"_37IfmKMqkIM7ok_xJbW_IX"}},712:function(e,t,n){var i=n(641);"string"==typeof i&&(i=[[e.i,i,""]]);n(114)(i,{});i.locals&&(e.exports=i.locals)},778:function(e,t,n){var i=function(){var e=this,t=(e.$createElement,e._c);return t("div",{class:e.classes.container},[t("div",{staticClass:"text-center"},[t("button",{staticClass:"btn",class:e.classes.btn,on:{click:e.rebuild}},[e._v(e._s(e.built?"Clear":"Rebuild")+" your own view")])]),t("hr"),t("dynamic",{ref:"component",attrs:{comps:e.comps,emptyView:e.emptyView},on:{built:e.compBuilt}})],1)},r=[];e.exports=function(e){return e=e||{},e.render=i,e.staticRenderFns=r,e},i._withStripped=!0}});