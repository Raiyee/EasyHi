# 基本目录结构

![9A4D6B83-75F7-4345-A5A1-773238BAB774.png](http://ww3.sinaimg.cn/large/65e4f1e6gw1f72ay3e57oj20f20imt9z.jpg)

build 目录是编译最终执行代码相关的配置文件和脚本文件

dist 就是最终生成的各种文件的目录，需要运行 `npm run compile`, 默认以 production 也就是生产环境的配置进行编译, 也可以执行 `npm run compile:test` 以测试环境的配置进行编译, 主要区别在于测试环境开启了 sourceMap，生产环境移除了.

server 目录是用于本地开发时使用的服务器配置和入口，也可以用于启动模拟测试和生产环境, compile 后执行 `npm run start` 即可模拟启动对应环境

src 目录就是我们的真正的项目源码

test 本来是 mocha 之类的 js 单元测试框架的配置，不过我们公司测试都不是用这种方式，所以就清空了，不过可以在本地进行一些自己的测试代码（不要提交到项目里），这里只是作为展示，之后会加入 .gitignore

除了目录以外，下面还有很多文件，很多还是以 `.` 开头的，这些都是项目里用到的一些插件需要的配置文件，放在根目录因为这些插件默认就是从根目录开始读取配置

*.babelrc* 是 babel 代码编译的配置，*.editorconfig* 是编辑器基本代码风格的配置，*.eslintignore* 是 `eslint` 校验忽略的配置，*.eslintrc.js* 是 `eslint` 代码校验的配置，*.gitignore* 不必说，*.stylelintrc.js* 是使用 `stylelint` 进行 `css` 相关代码校验的配置，但是由于 `postcss` 不支持解析 `stylus` 所以它也无法校验 `stylus`，因此又有了后面的 *.stylintrc.js*，这是专门用于校验 `stylus` 代码的插件 `stylint` 的配置

es 校验可以执行 `npm run eslint`，有些代码风格可以自动修复，执行 `npm run eslint:fix`

css 校验可以执行 `npm run stylelint`，`stylelint` 对应的自动修复工具 `stylefmt` 并不完善，所以没有使用，而且目前我们项目里用的是 `stylus` 语法，所以实际上 `stylelint` 的校验除了几个单独的 *.css* 文件外是基本没用的，但是在 `npm run stylelint` 脚本里（即 *build/bin/stylelint.js*）里还调用了 `stylint` 对 `stylus` 代码进行校验

`stylus` 语法非常灵活，与 `less/sass(scss)` 的对比可以看 http://efe.baidu.com/blog/revisiting-css-preprocessors/

接下来是一些项目基本文件 *README.md* 和 *package.json* 之类的, 这份 *CONTRIBUTING.md* 相当于代码规范的基础描述.

*nodemon.json* 是自动重载工具 `nodemon` 的配置，用于自动重启服务器（例如对 `webpack` 配置做了变动时虽然做不到热重载，但是 `nodemon` 可以帮我们自动重启）

`stylus` 相关: [官网](http://stylus-lang.com/) [中文文档](http://www.zhangxinxu.com/jq/stylus/)

# 项目源码目录

![2D6CC607-380B-489B-955D-479CB9CC31F9.png](http://ww1.sinaimg.cn/large/65e4f1e6gw1f72b4dfujtj20da0cuaak.jpg)

很明显，我们的项目入口是 *index.js*，*index.ejs* 是项目首页模板，编译的时候会自动将样式文件和脚本文件自动注入进去

ajax 目录的意义也很明显，它是使用 `vue-resource` 进行异步数据拉取的工具，进行初始化和项目通用的拦截器配置，例如处理 404 错误之类

asstes 目录一般放一些不做任何处理的静态资源，暂时没有用到

components 目录是项目中使用到的公共组件存放的位置

mock 目录是初始化模拟数据的配置，目前由于没有后端支持，所以在开发、测试、生产环境都启用了 mock，后期会针对环境或环境变量进行判断是否需要启用 mock

router 目录是初始化路由的配置，目前路由中定义的所有子路由都是异步加载, 同时路由配置中还包括了权限校验的配置

static 目录是将被直接复制到 dist 目录的静态资源, 目前包括 *CNAME*（供 GitHub Pages 识别）和 *favicon.ico* 处理浏览器里的网站小图标

上面的几个目录如 ajax、mock、router 都只有一个 *index.js*，主要目的是为了将配置和实际入口区分开，看的时候也更直观.

store 目录是项目状态管理配置文件，即 `vuex`

styles 目录目前包括项目公用的样式文件，包括一个除 `bootstrap` 外的基础样式文件 *app.styl*、主题色相关样式、全局公用变量 + mixin + function 的 *_variables.styl*

项目中 *app.styl* 和 `bootstrap` 会单独生成两个 css 文件，其他的都是异步加载进来的 js 文件，由 `webpack` 自行处理

views 目录是所有视图层级的组件，即对应一个个页面，在里面可以去引用 components 目录里的公共组件

# 代码详解

## 入口文件 index.js

``` javascript
import Vue from 'vue';

import store from 'store';
import router from 'router';
import App from 'views/App';

import 'ajax';

module.hot && module.hot.accept();

// TODO should inject mock in specific environment or when using argument `mock`
require('mock');

/* eslint no-new: 0 */
new Vue({
  el: '#app',
  store,
  router,
  ...App
});

```

基本上就是套路模式，引入 store、router、ajax 配置，启用热重载，启用 mock, 然后把 `App` 组件挂在到 `#app` 元素上

## App 组件

``` javascript
import {mapGetters} from 'vuex';

import store from 'store';
import router from 'router';

import 'bootstrap.less';
import 'styles/app';

import HiLoading from 'components/HiLoading';
import HiProgress from 'components/HiProgress';

const theme = 'purple';

require('bundle!styles/theme-' + theme);

const docEl = document.documentElement;
let resize, height, width;

addEventListener('resize', resize = () => {
  height = docEl.clientHeight;
  width = docEl.clientWidth;
  docEl.style.fontSize = Math.min(width, 375) / 375 * 16 + 'px';
  store.dispatch('setSize', {height, width});
}, false);

resize();

// 暂时添加一个退出登录的钩子
window._logout_ = () => {
  store.dispatch('setEnv', {authorized: false, mobile: null});
  router.replace({name: router.currentRoute.name, query: {timestamp: +new Date()}});
};

export default {
  computed: {
    ...mapGetters(['progress'])
  },
  render(h) {
    return (
      <div id="app">
        {this.progress ? <HiLoading/> : ''}
        <HiProgress progress={this.progress}/>
        <transition name="bounce">
          <router-view/>
        </transition>
      </div>
    );
  }
};

```

先移除一些处理浏览器窗口变化和处理退出逻辑的代码, 使逻辑更加清晰

``` javascript
import {mapGetters} from 'vuex';

import store from 'store';
import router from 'router';

import 'bootstrap.less';
import 'styles/app';

import HiLoading from 'components/HiLoading';
import HiProgress from 'components/HiProgress';

const theme = 'purple';

require('bundle!styles/theme-' + theme);

export default {
  computed: {
    ...mapGetters(['progress'])
  },
  render(h) {
    return (
      <div id="app">
        {this.progress ? <HiLoading/> : ''}
        <HiProgress progress={this.progress}/>
        <transition name="bounce">
          <router-view/>
        </transition>
      </div>
    );
  }
};

```

又是套路, `App` 是我们整个应用的容器，在这里我们引入 `bootstrap` 和 基础样式 *app.styl*, 然后引入了两个公共组件，`HiLoading` 是实现一个加载中的组件，`HiProgress` 是实现一个顶部加载进度展示的组件, 网上有很多这样的公共组件，这两个就来自 https://github.com/crossjs/plato-components, 不过源码都是 *.vue* ，所以我又转成了 *jsx*.

_vue 1.0_ 的组件开发是使用 *.vue* 文件，虽然通过 `style` 上的 `scoped` 参数支持组件化样式，但是不支持 _CSS Modules_，也就是说它内部的样式也开始可能受到全局样式的影响的，而 _CSS Modules_ 基本可以阻绝组件和全局样式，因此在 _vue 2.0_ 开始支持 *jsx* 后我们开始使用 *jsx* 语法进行模块化开发, 也就是说不用去管什么 `scoped`.

引入样式和组件后就可以使用了，下面是 es6 导出了一个对象，这个对象会被 Vue 自动处理成 Vue 组件.

``` javascript
computed: {
  ...mapGetters(['progress'])
}
```

`mapGetters` 是来自 `vuex` 的工具方法, 这一步是指从 `store` 容器里将 `progress` 映射到 _Vue_ 组件实例上，即在组件内部通过 `this.progress` 就能拿到 `store` 里存入的公共 `progress`.

下面是 `render` 方法，_vue_ 里实现 *jsx* 编译的插件 *babel-plugin-transform-vue-jsx* 要求我们在 `render` 方法里加入一个固定参数 `h`，即时你不用它, 但是想到 _vue_ 既支持模板语法有支持 jsx 也就淡定了![2141E9E2-916D-4AB6-A866-D53127D0B205.gif](http://ww1.sinaimg.cn/large/65e4f1e6gw1f72bawikg0g200m00m741.gif).

*jsx* 和 *html* 很像，但是又不完全一样，它对标签闭合非常严格，类似 *xml*.

`#app` 里第一行判断 `progress` 是否有值且不为 `0` 的时候展示 `HiLoading` 组件，否则就是啥都不展示，相当于 *.vue* 文件中的 `v-if` .

有类似 `v-if` 的就有类似 `v-show` 的，用 `<HiLoading style={{display: this.progress ? '' : 'none'}}/>`

`style` 属性这里不是一个简单的字符串，而是要计算的，所以用 `{}` 包一层表示执行 *js*，又包了一层 `{}` 表示返回一个对象，也就是说 *jsx* 里的 `style` 是一个对象（可以愉快地使用驼峰了）

下面的 `<HiProgress progress={this.progress}/>` 表示组件一直在，我们传入 `progress` 通知 `HiProgress` 组件处理内部逻辑，里面只是简单地判断了设置了一下组件的 `width`，从 `0%` 到 `100%`，再加上内部的 `transition(css)` 就能简单地实现加载进度的展示

组件内的 `<transition><router-view/></transition>` 是 _vue_ 和 _vue-router_ 通用组件, `router-view` 表示当前路由对应的组件, 用 `transition` 包一下表示给内部的组件加入载入和移除时的过渡效果, `name="bounce"` 指定了 过渡的名称和自动查找的 css 类，它会去自动载入 `.bounce-enter`(一帧)，`.bounce-enter-active`，`.bounce-leave`(一帧)，`.bounce-leave-active`，可以在 *styles/app.styl* 里看到我们定义的动画.

很简单的一个动画实现，如果想要更多动画可以用 *animate.css*，然后定义 `on-enter-class`、`on-leave-class` 之类的样式.

`App` 就是全局公用的架子，组件方面以后还会加入 `alert`、`modal` 之类的.

# 路由

``` javascript
import Vue from 'vue';
import VueRouter from 'vue-router';

import store from 'store';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['views/MemberIndex'], resolve)
    }, {
      path: '/login',
      name: 'login',
      component: resolve => require(['views/Login'], resolve)
    }, {
      path: '/member-center',
      name: 'memberCenter',
      component: resolve => require(['views/MemberCenter'], resolve),
      meta: {
        auth: true
      }
    }, {
      path: '*',
      redirect: '/'
    }
  ]
});

router.beforeEach((route, redirect, next) => {
  store.dispatch('setProgress', 50);
  if (route.matched.some(m => m.meta.auth) && !store.getters.authorized) {
    redirect({name: 'login', query: {from: route.name}});
  } else {
    next();
  }
});

router.afterEach((/* route, redirect, next */) => {
  store.dispatch('setProgress', 100);
  window.scrollTo(0, 0);
});

export default router;

```

全是套路, 引入 _vue_、_vue-router_，将 `Router` 注入到 _Vue_，又引入 `store`，方便我们在路由内部读取整个应用的状态信息，例如是否已经登录, 然后实例化一个 `router`，实例化的时候传入 `mode: 'hash'` 表示启动 _hash_ 模式的路由，默认是我们用 _SpringMVC_ 的那种非 _hash_ 模式 _host:port/aa/bb_ 这样.

`routes` 是一个数组，包含一个对象，用 `path` 定义路由路径、`name` 给路由起个名字（为了更好地展示错误，我们项目里要求为每个路由起个名字，最好组件也起个名字），`component` 定义一个路由对应是实际组件.

有两种方式定义 `component`，一种是同步方式直接 `import/require` 组件，另一种是我们现在使用的异步加载模式, 套路：`resolve => require([componentPath], resolve)`, `componentPath` 必须传完整的字符串，不能顶一个变量去拼接，因为 *webpack* 是根据字符串去处理依赖的.

除了上面的三个 _key_ 外，还有一个 `meta`，里面可以设置一些每个路由不同的信息，例如 `memberCenter` 组件里我们定义了 `{auth: true}` 表示进入这个路由需要登录权限（会在之后看到如何使用）

路由里可以使用和 _Backbone_ 类似的 `'/a/:b'` 传入一个 `b` 参数，或者用 `query` 传入其他参数，实际路由 `'/a?b=xxx'`

``` javascript
{
  path: '*',
  redirect: '/'
}
```

表示无法匹配的路由都转到 `/` 路由去.

下面我们用 `beforeEach` 定义在进入每个路由前执行的方法，我们可以在这里实现路由拦截、转发、回退，也基于此我们可以实现路由跳转前的权限校验逻辑.

`store.dispatch('setProgress', 50);` 首先通知 `store` 把进度条宽度设为一半（原来进度条都 TM 是骗人的）.

`route.matched` 里是存储了当前匹配到的路由数组，然后我们去里面查找包含 `meta.auth` 为 `true` 的组件，同时判断 `store` 中的 `authorized` （是否已登录）的值，如果需要登录权限又没有登录，那就转到登录页，并把从哪里来的放到路由参数里(`from`)，否则就可以进入组件了.

进入组件后会执行 `afterEach` ，我们把进度条设置为 `100%`，恢复滚动条到顶部最左部.

一个基本的路由完成.

# View 视图

## Login

``` javascript
import classes from './index.styl';	    // 由于使用了 CSS Modules，所以导入样式时将样式存入 classes 变量
import yoga from './yoga.png';	        // 图片 import 后才能在 jsx 里使用，.vue 里可以直接img src，内部也是转成 import

export default {
  data() {                              // 定义了一些组件的基本属性
      return {
        limit: 0,
        loginMobile: null,
        verificationCode: null,
        mobileError: false,
        codeError: false,
        submitClicked: false
      };
    },
    created() {                         // 表示组件创建完成后的操作
      this.loginMobile = this.mobile;
    },
    computed: {                         // 一般用于从 store 中获取的属性或其他需要基于 data 进行计算的属性
      ...mapGetters(['mobile'])
    },
}
```

我们看到 `created` 里将 `this.loginMobile` 赋值为 `this.mobile`，因为初始化我们从 `store` 里获取 ``，但是后面的变化输入的时候不需要自动保存到 `store` 里，而是在 `submit` 成功的时候才保存到 `store` 里.

我们用了 `mapGetters(['mobile'])` 就表示 `this.mobile` 不能直接设置，因为 `mobile` 的 _setter_ 被 `state` 处理的，必须通过 `store.dispatch` 才能修改.

下面的 `methods` 属性是定义处理事件、逻辑的部分

我们通过 `...mapActions(['setEnv'])` 将 `store` 中的 `setEnv action` 映射到 _vue_ 实例上，也就是使用 `this.setEnv(payload)` 就相当于调用了 `store.dispatch('setEnv', payload)`.

下面还是 `render` 方法，相当于 *.vue* 文件的 `template` 模板部分, 我们将这里使用 _CSS Modules_.

## Login/index.styl

``` stylus
@import "../../styles/_variables"

IMG_WRAP_MARGIN = 40px

.yoga
  size 95px
  margin-top IMG_WRAP_MARGIN
  margin-bottom IMG_WRAP_MARGIN
  relative()
  background-color BACK_COLOR

  > img
    size 90px
    absolute()
    left 50%
    top 50%
    transform translate3d(-50%, -50%, 0)

.form-group
  margin-bottom 25px

  :global(.form-control-static)
    padding-left 50px
    padding-bottom 0

```

没有 `{}`，没有 `:` .

`relative` 是 `stylus` 样式库 `nib` 里定义的一个函数，调用将生成 `position: relative;` 对应地还有 `absolute`, 另外会自动添加 `left:0; top:0;`

函数可以传参，如 `relative(left 10px)` 会生成 `position: relative; left : 10px;`

方法还可以用 css 的方式调用, `relative left 10px`

## CSS Modules

`.yoga` 会被编译成 `.xx__yoga__yy` 这样的看着像乱码的类, 我们可以在 _js_ 里用 `classes.yoga` 获取到, _css_ 里我们有时候会用 `.a-b` 定义类，_js_ 里可以用 `classes.aB` 获取到（定义 _css module_ 的时候加入了驼峰转化）, 如果 _css_ 也有个 `.aB` 的话就需要 `classes['a-b']` 和 `classes.aB` 去区分.

也就是说有冲突的话就要用原始字符串, 没有冲突的话 `classes['a-b'] === classes.aB` .

_css_ 的类默认会转化，但是有时候我们又要用到全局的 `class`，这时可以用 `:global(.className)` 定义一个在外部类范围的全局样式类

或者使用

``` stylus
:global
    .className1
	prop value
    .className2
	prop value
```

定义多个外部类范围内的全局样式, 也就是说 `global` 里面的类我们不需要用 `classes` 去取，直接写字符串即可, 如果在 `global` 里又想用 _CSS Modules_，那可以再在内部加个 `:local`, 使用方式和 `:global` 一致.

顺便提一下，可以在 *build/webpack/index.js* 看到我们定义我们只在处理 *app.styl*、*theme-\*.styl* 文件以外的部分启用 _CSS Modules_.

## render

``` javascript
render(h) {
    return (
      <div class="container">
        <div class={['center-block img-circle', classes.yoga]}>
          <img class="img-circle" src={yoga} alt="瑜伽"/>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-6 col-sm-push-3 col-lg-4 col-lg-push-4">
            <form on-submit={this.submit}>
              <div class={['form-group', classes.formGroup, this.mobileError ? 'has-error' : '']}>
                <div class="input-group">
                  <span class="input-group-addon">
                    <span class="glyphicon glyphicon-phone"/>
                  </span>
                  <input type="number" class="form-control" placeholder="请输入手机号"
                         on-input={this.handleChange.bind(this, 'mobile')} value={this.loginMobile}/>
                  {this.loginMobile ? (<span class="input-group-addon" on-click={this.clearMobile}>
                      <span class="glyphicon glyphicon-remove-sign"/>
                    </span>) : ''}
                </div>
                {this.mobileError ? <p class="form-control-static">请输入正确的手机号码</p> : ''}
              </div>
              <div class={['form-group', classes.formGroup, this.codeError ? 'has-error' : '']}>
                <div class="input-group">
                  <span class="input-group-addon">
                    <span class="glyphicon glyphicon-lock"/>
                  </span>
                  <input type="number" class="form-control" placeholder="请输入验证码"
                         on-input={this.handleChange.bind(this, 'verificationCode')} value={this.verificationCode}/>
                  <span class="input-group-addon theme-color"
                        on-click={this.getVerificationCode}>{this.limit ? this.limit + 's' : '获取验证码'}</span>
                </div>
                {this.codeError ? <p class="form-control-static">请输入正确的验证码</p> : ''}
              </div>
              <button type="submit" class="btn btn-primary btn-responsive center-block">登 录</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
```

用过 _react_ 的话应该很容易理解, 当然有一点儿区别, 比如 _react_ 里应该用 `className` 而不是 _vue jsx_ 里直接用 `class`, _react_ 的事件是用例如 `onClick` 而 _vue jsx_ 是用 `on-click`, 对应 *.vue* 文件里的 `v-on:click (@click)`.

来看下 `<div class={['center-block img-circle', classes.yoga]}>` 这一句代码.

`class` 属性是用 `{}` 包一个 _js_ 数组, `'center-block img-circle'` 这个部分是 _bootstrap_ 公共的样式，`classes.yoga` 是 _CSS Modules_ 类，最终执行会把它们组合起来.

`class` 部分也可以传入一个对象，例如 `<div class={{a:true, b:false}}>xx</div>` , 最终会编译成 `<div class="a">xx</div>`, 要用 CSS Modules 的话就是 `<div class={{[classes.a]:true, [classes.b]:false}}>xx</div>`, 这里用到了 es6 对象计算属性语法.

模板具体内容不详谈.

## 事件处理

_vue1_ 里有 `v-model` 实现双向绑定, _jsx_ 里需要自己去处理绑定属性逻辑，_React_ 本来也有双向绑定 _LinkedStateMixin_，现在也移除了

``` vue
<input type="number" class="form-control" placeholder="请输入手机号"
       on-input={this.handleChange.bind(this, 'mobile')} value={this.loginMobile}/>
```

处理 `input` 时需要自己 `bind(this)`，后面还可以传入一个自定义参数，这个参数在调用时作为第一个参数，第二个才是 _event_

也就是这一块

``` javascript
handleInput(type, e) {
  const value = e.target.value;
  const submitClicked = this.submitClicked;
  let subValue;

  switch (type) {
    case ('mobile'):
      subValue = this.loginMobile = value.substr(0, 11);
      this.mobileError = submitClicked && !mobileRegExp.test(subValue);
      break;
    case ('verificationCode'):
      subValue = this.verificationCode = value.substr(0, 6);
      this.codeError = submitClicked && !codeRegExp.test(subValue);
      break;
  }

  return subValue;
}
```

`value === subValue || (target.value = subValue);` 这里是判断输入的内容是不是被裁剪过，也就是说输入到第 11 位时再输入 `value` 是 12 位，`subValue` 是 11 位

实际上已经设置了 `subValue = this.loginMobile = value.substr(0, 11);` 但是 `input` 部分没有自动裁剪，不知道是 bug 还是 feature…… 所以要自己设置一下

``` javascript
clearMobile(e) {
  const inputEl = e.currentTarget.previousElementSibling;
  inputEl.value = this.loginMobile = null;
  inputEl.focus();
}
```

这里的逻辑也是一样，`this.loginMobile = null` 也没有自动变更 `input` 的值（不过看 _dom_ 它的 `value` 属性倒是变了）

``` javascript
submit(e) {
  e.preventDefault();
  this.submitClicked = true;
  const mobile = this.loginMobile;
  const mobileError = this.mobileError = !mobileRegExp.test(mobile);
  const verificationCode = this.verificationCode;
  const codeError = this.codeError = !codeRegExp.test(verificationCode);
  if (mobileError || codeError) return;
  this.$http.get('/verifyCode', {body: {verificationCode}}).then(res => {
    const error = res.json().error;
    if (error) return alert(error);
    this.setEnv({mobile, authorized: true});
    this.$router.replace({name: this.$route.query.from || 'home'});
  });
}
```

当没有错误的时候发起请求要求判断验证码是否正确（这里可以再加个一个是否已经发过验证码之类的判断，类似的有一个 `submitClicked` 判断是否已经点击过登录按钮，没点击过的话就算输入有问题也不展示错误）

ajax 请求是通过 _Vue-Resource_ 发起的，每个组件内部都可以用 `this.$http` 发起，或者用全局 `Vue.http` 发起（注意引入 `Vue`）

`response` 没有自动转化成 _json_，因为它还包含其他诸如 `status`, `statusText` 之类的信息

es6 语法中使用箭头函数 `=> {}` 调用时内部上下文（即 `this`）是指向外部的，所以我们可以直接在里面用 `this` 获取到 _vue_ 实例而不需要去 `bind(this)`

_vue_ 组件里可以通过 `this.$router` 获取到全局路由对象，`this.$route` 获取到当前路由, 实际上 `this.$router.currentRoute === this.$route`

`router` 有 `push`、`replace`、`forward`、`back`、`go` 等方法， 其中 `push` 相当于 _vue1_ 的 `go`，现在的 `go` 和 `history.go` 一致

`push` 就是跳转新页面，`replace` 是用新页面替代当前页面的历史记录（就是说点返回键回不来了）, `forward` 是前进，`back` 是后退

``` javascript
this.setEnv({mobile, authorized: true});
this.$router.replace({name: this.$route.query.from || 'home'});
```

这个逻辑就是校验正确的时候，设置 `mobile` 到 `store` 里，记住已经登录了（这两个内容会存入 `localStorage`，用了 _vuex-localstorage_）, 然后将当前页面替换成进入登录页的页面, 没有 `from` 参数的话就回到主页, 我们这里都是用的具名路由，我们项目了推荐使用具名路由.

这里还有个问题，没判断是不是从登录页跳过来的，如果是登录页跳过来的应该也调回主页，这块儿逻辑也可以在 `router` 的 `beforeEach` 里判断，也就是说已经登录了就不让跳 `login`

现在我们实际上是没有后端支持的，所以数据都是通过 _Mock.js_ 配置的

# Mock 模拟数据

入口是 *mock/index.js*

``` javascript
const modules = require.context('../views', true, /\/mock\.js$/);
modules.keys().forEach(key => modules(key));
```

意思是载入 *views* 文件夹下包括子文件夹的所有 *mock.js* 文件并执行, 也就是说我们的模拟数据是放在 *views* 下面每个视图文件夹下的 *mock.js* 文件, 目前只有登录页有模拟数据 *Login/mock.js*

``` javascript
import Mock from 'mockjs';

const Random = Mock.Random;
Mock.mock(/\/verifyCode$/, (() => {
  const correctCode = '345678';
  const verificationCache = {};
  return req => {
    const {verificationCode} = JSON.parse(req.body);
    return verificationCache[verificationCode] ||
      (verificationCache[verificationCode] = {
        error: correctCode === verificationCode || Random.boolean() ? null : Random.cword(5, 12)
      });
  };
})());

```

简单到爆，跟发起 _ajax_ 差不多，区别在于 _mock_ 的 `url` 参数可以是正则，还可以插入第二个参数 `rtype` 即 `Mock.mock(rurl, rtype, function(options))`

我们这里没有使用，直接是用的 `Mock.mock( rurl, function(options))`, `function` 部分用了一个立即执行函数生成闭包存储默认正确的字符串和校验缓存, `req.body` 是请求过来的数据们需要我们自己 `parse` 成 _JSON_

如果是绝对正确代码 `'345678'`，返回 `error null`, 如果缓存里有结果，直接返回缓存结果，否则随机生成一个是否校验成功，如果成功 `error` 为 `null`，否则是随机 5-12 位的中文，并存入缓存

_Mock_ 还有模板语法，就是不需要判断 `req` 时直接返回数据，之前做分享时就是这么用的:

``` javascript
Mock.mock(/\/get-items/, function () {
    return Mock.mock(Random.range(1, Random.integer(3, 10)).map(()=>({
        date: '@date(yyyy-MM-dd)',
        dayOfWeek: '周@cword("一二三四五六日")',
        duration: '@datetime(hh:mm)-@datetime(hh:mm)',
        scheduleName: '@cword(5,12)',
        booked: '@integer(1,10)',
        cardName: '@cword(5,11)卡',
        times: '@integer(1,20)',
        id: Random.guid()
    })));
});
```

它的意思是返回一个 3-10 长度的随机数组，数组是一个个对象，它们都是满足符合模板的键值对, 它会自动调用 `Mock.Random` 方法生成数据, 具体可以查看 https://github.com/nuysoft/Mock/wiki/Mock.Random

# store 状态管理

入口是 *store/index.js*

我们后端是 _Java_，所以不大可能支持后端渲染页面，所以默认是没有初始化数据的，所有数据都是从 `localstorage`、`cookie` 或者后端在页面返回 `__INITIALIZE_STATE__` 以及通过 ajax里获取, `__INITIALIZE_STATE__` 暂不考虑

``` javascript
import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';
import plugins from './plugins';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: __DEV__,
  modules,
  plugins
});
```

引入模块化 `state` 和插件

## modules（store/modules.js）

``` javascript
const modulesContext = require.context('./modules/', false, /\.js$/);

export default modulesContext.keys().reduce((modules, key) => {
  modules[key.replace(/(^\.\/)|(\.js$)/g, '')] = modulesContext(key);
  return modules;
}, {});
```

读取 *modules* 文件下所有的 _js_ 文件并载入进来

![D1E02469-CAAE-49BB-BD13-E8C3E2DF178E.png](http://ww4.sinaimg.cn/large/65e4f1e6gw1f72d3kmt89j20a605ojrj.jpg)

最终会变成形如
```
{
	browser:{
		mutations:{},
		actions:{}
	}
}
```

### browser.js

``` javascript
const SET_HEIGHT = 'SET_HEIGHT';
const SET_WIDTH = 'SET_WIDTH';
const SET_SIZE = 'SET_SIZE';

const state = {
  height: 0,
  width: 0
};

const getters = {
  height: state => state.height,
  width: state => state.width
};

const actions = {
  setHeight({commit}, height) {
    commit(SET_HEIGHT, height);
  },
  setWidth({commit}, width) {
    commit(SET_WIDTH, width);
  },
  setSize({commit}, size) {
    commit(SET_SIZE, size);
  }
};

const mutations = {
  [SET_HEIGHT](state, payload) {
    state.height = payload;
  },
  [SET_WIDTH](state, payload) {
    state.width = payload;
  },
  [SET_SIZE](state, payload) {
    Object.assign(state, payload);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
```

里面存储的是浏览器尺寸的一些相关信息，以后根据需要可以再往里面新增别的

`state` 是初始化数据，`getters` 是对应每个属性的 _getter_ 函数，返回 `state` 中的值

`actions` 是用户行为触发或我们主动调用的变化动作，最终我们会在组件里通过 _vuex_ 的 `mapActions` 触发 _action_

一般一个 _action_ 键会对应一个 _mutation_ 键, _mutation_ 是由 _action_ 触发的, _vuex_ 推荐将异步操作放到 _action_ 中，_mutation_ 进行同步操作 (https://www.zhihu.com/question/48759748), 这样可以使每个 _mutation_ 都对应一个确切的 `state`, 方便我们在浏览器 _DEV TOOLS_ 中进行调试、查看 `state` 变化

# 实现 jsx/.vue 使用公用内容

![7909849D-B168-4AEB-B2F0-896A0D7E1F55.png](http://ww1.sinaimg.cn/large/65e4f1e6gw1f72d600aeij20aw07caad.jpg)

两个通用组件 HiLoading 和 HiProgress 以及 Loading 改造成 .vue/jsx 通用的组件了，切换 build/webpack/index.js 里的

``` javascript
extensions: ['', '.vue', '.js', '.styl'],
// extensions: ['', '.js', '.vue', '.styl'],
```

这两行代码就可以选择优先用 *.vue* 模式还是 *jsx* 模式, 后期会通过 _npm script_ 区分两种模式优先级

原理很简单，抽取 *.vue* 和 *jsx* 模式两者之间的公共部分，比如 *Login/index.js* 抽取成 *Login.common.js*，保留 *index.js* 里的 `render` 函数以及其他和 *.vue* 有差异的部分，将有差异的部分再写一份 *index.vue* 文件，里面定义 `template`，相当于 *jsx* 的 `render`，通过 `style src` 引入样式文件，相当于 *jsx* 里的 `import style`

大家可以通过这种方式比较一下 *.vue* 和 *jsx* 写法的差异, `style` 统一使用 `scoped` 模式

# 本机 + 手机开发调试

由于想用微信开发工具在手机上调试样式，所以将 _dev_ 的服务起了个 _host_ 别名 `local.1stg.me` 方便在手机上调试（因为手机上 _localhost_ 一定是指向手机本身的，也就无法在 _localhost_ 上进行调试），请大家把 `local.1stg.me` 都加个自己的 _host_ ，方便一起使用.

也就是说 _dev_ 环境使用 http://local.1stg.me:3000/ 打开
