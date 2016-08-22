# 基本目录结构

![9A4D6B83-75F7-4345-A5A1-773238BAB774.png](http://ww3.sinaimg.cn/large/65e4f1e6gw1f72ay3e57oj20f20imt9z.jpg)

build 目录是编译最终执行代码相关的配置文件和脚本文件

dist 就是最终生成的各种文件的目录，需要运行 npm run compile, 默认以 production 也就是生产环境的配置进行编译, 也可以执行 npm run compile:test 以测试环境的配置进行编译, 主要区别在于测试环境开启了 sourceMap，生产环境移除了.

server 目录是用于本地开发时使用的服务器配置和入口，也可以用于启动模拟测试和生产环境, compile 后执行 npm run start 即可模拟启动对应环境

src 目录就是我们的真正的项目源码

test 本来是 mocha 之类的 js 单元测试框架的配置，不过我们公司测试都不是用这种方式，所以就清空了，不过可以在本地进行一些自己的测试代码（不要提交到项目里），这里只是作为展示，之后会加入 .gitignore

除了目录以外，下面还有很多文件，很多还是以 . 开头的，这些都是项目里用到的一些插件需要的配置文件，放在根目录因为这些插件默认就是从根目录开始读取配置

.babelrc 是 babel 代码编译的配置，.editorconfig 是编辑器基本代码风格的配置，.eslintignore 是 eslint 校验忽略的配置，.eslintrc.js 是 eslint 代码校验的配置，.gitignore 不说了，.stylelintrc.js 是使用 stylelint 进行 css 相关代码校验的配置，但是由于 postcss 不支持解析 stylus 所以它也无法校验 stylus，因此又有了后面的 .stylintrc.js，这是专门用于校验 stylus 代码的插件 stylint 的配置

es 校验可以执行 npm run eslint，有些代码风格可以自动修复，执行 npm run eslint:fix

css 校验可以执行 npm run stylelint，stylelint 对应的自动修复工具 stylefmt 并不完善，所以没有使用，而且目前我们项目里用的是 stylus 语法，所以实际上 stylelint 的校验除了几个单独的 .css 文件外是基本没用的，但是在 npm run stylelint 脚本里（即 build/bin/stylelint.js）里还调用了 stylint 对 stylus 代码进行校验

stylus 语法非常灵活，与 less/sass(scss) 的对比可以看 http://efe.baidu.com/blog/revisiting-css-preprocessors/

接下来是一些项目基本文件 README.md 和 package.json 之类的，今天分享我待会儿会整理到 CONTRIBUTING.md 里，也就相当于代码规范的描述

nodemon.json 是自动重载工具 nodemon 的配置，用于自动重启服务器（例如对 webpack 配置做了变动时虽然做不到热重载，但是 nodemon 可以帮我们自动重启）

stylus 相关: [官网](http://stylus-lang.com/) [中文文档](http://www.zhangxinxu.com/jq/stylus/)

# 项目源码目录

![2D6CC607-380B-489B-955D-479CB9CC31F9.png](http://ww1.sinaimg.cn/large/65e4f1e6gw1f72b4dfujtj20da0cuaak.jpg)

很明显，我们的项目入口是 index.js，index.ejs 是项目首页模板，编译的时候会自动将样式文件和脚本文件自动注入进去

ajax 目录的意义也很明显，它是使用 vue-resource 进行异步数据拉取的工具，进行初始化和项目通用的拦截器配置，例如处理404错误之类

asstes 目录一般放一些不做任何处理的静态资源，暂时没有用到

components 目录是项目中使用到的公共组件存放的位置

mock 目录是初始化模拟数据的配置，目前由于没有后端支持，所以在开发、测试、生产环境都启用了 mock，后期会针对环境或环境变量进行判断是否需要启用 mock

router 目录是初始化路由的配置，目前路由中定义的所有子路由都是异步加载, 同时路由配置中还包括了权限校验的配置

static 目录是将被直接复制到 dist 目录的静态资源, 目前包括 CNAME（供 GitHub Pages 识别）和 favicon.ico 处理浏览器里的网站小图标

上面的几个目录如 ajax、mock、router 都只有一个 index.js，主要目的是为了将配置和实际入口区分开，看的时候也更直观.

store 目录是项目状态管理配置文件，即 vuex

styles 目录目前包括项目公用的样式文件，包括一个除 bootstrap 外的基础样式文件 app.styl、主题色相关样式、全局公用变量+mixin+function 的 _variables.styl

项目中 app.styl 和 bootstrap 会单独生成两个 css 文件，其他的都是异步加载进来的 js 文件，由 webpack 自行处理

views 目录是所有视图层级的组件，即对应一个个页面，在里面可以去引用 components 目录里的公共组件

# 代码详解

## 入口文件 index.js

![0A74A8F3-20C3-4AD7-B68E-E69F0CC98CDF.png](http://ww3.sinaimg.cn/large/65e4f1e6gw1f72b6vd7dvj20wo0he763.jpg)

基本上就是套路模式，引入 store、router、ajax 配置，启用热重载，启用 mock, 然后把 App 组件挂在到 #app 元素上

## App 组件

![1D922B98-7AF7-4294-8FE8-59937F2AAFC4.png](http://ww4.sinaimg.cn/large/65e4f1e6gw1f72b7f2knnj20x013k79r.jpg)

先移除一些处理浏览器窗口变化和处理退出逻辑的代码, 使逻辑更加清晰

![2F41E6D2-9571-45BF-8BAD-3B4AB8DDFCF2.png](http://ww4.sinaimg.cn/large/65e4f1e6gw1f72b7w3lugj20iu0j0wgh.jpg)

又是套路, App 是我们整个应用的容器，在这里我们引入 bootstrap 和 基础样式 app.styl, 然后引入了两个公共组件，HiLoading 是实现一个加载中的组件，HiProgress 是实现一个顶部加载进度展示的组件, 网上有很多这样的公共组件，这两个就来自 https://github.com/crossjs/plato-components, 不过源码都是 .vue ，所以我又转成了 jsx.

vue 1.0 的组件开发是使用 .vue 文件，虽然通过 style 上的 scoped 参数支持组件化样式，但是不支持 CSS Modules，也就是说它内部的样式也开始可能受到全局样式的影响的，而 CSS Modules 基本可以阻绝组件和全局样式，因此在 vue 2.0 开始支持 jsx 后我们开始使用 jsx 语法进行模块化开发, 也就是说不用去管什么 scoped.

引入样式和组件后就可以使用了，下面是 es6 导出了一个对象，这个对象会被 Vue 自动处理成 Vue 组件.

```
computed: {
  ...mapGetters(['progress'])
}
```

mapGetters 是来自 vuex 的工具方法, 这一步是指从 store 容器里将 progress 映射到 Vue 组件实例上，即在组件内部通过 this.progress 就能拿到 store 里存入的公共 progress.

下面是 render 方法，vue 里实现 jsx 编译的插件 babel-plugin-transform-vue-jsx 要求我们在 render 方法里加入一个固定参数 h，即时你不用它, 但是想到 vue 既支持模板语法有支持 jsx 也就淡定了![2141E9E2-916D-4AB6-A866-D53127D0B205.gif](http://ww1.sinaimg.cn/large/65e4f1e6gw1f72bawikg0g200m00m741.gif).

jsx 和 html 很像，但是又不完全一样，它对标签闭合非常严格，类似 xml.

`#app` 里第一行判断 progress 是否有值且不为 0 的时候展示 HiLoading 组件，否则就是啥都不展示，相当于 .vue 文件中的 `v-if` .

有类似 `v-if` 的就有类似 v-show 的，用 `<HiLoading style={{display: this.progress ? '' : 'none'}}/>`

style 属性这里不是一个简单的字符串，而是要计算的，所以用 {} 包一层表示执行 js，又包了一层 {} 表示返回一个对象，也就是说 jsx 里的 style 是一个对象（可以愉快地使用驼峰了）

下面的 `<HiProgress progress={this.progress}/>` 表示组件一直在，我们传入 progress 通知 HiProgress 组件处理内部逻辑，里面只是简单地判断了设置了一下组件的 width，从 0% 到 100%，再加上内部的 transition(css) 就能简单地实现加载进度的展示

组件内的 `<transition><router-view/></transition>` 是 vue 和 vue-router 通用组件, router-view 表示当前路由对应的组件, 用 transition 包一下表示给内部的组件加入载入和移除时的过渡效果, name="bounce" 指定了 过渡的名称和自动查找的 css 类，它会去自动载入 .bounce-enter(一帧)，.bounce-enter-active，..bounce-leave(一帧)，..bounce-leave-active，可以在 styles/app.styl 里看到我们定义的动画.

很简单的一个动画实现，如果想要更多动画可以用 animate.css，然后定义 on-enter-class、on-leave-class 之类的样式.

App 就是全局公用的架子，组件方面以后还会加入 alert、modal 之类的.

# 路由

![9F91521A-7DC2-4182-865D-BD9CDB0A9FA6.png](http://ww1.sinaimg.cn/large/65e4f1e6gw1f72besorj2j215i15a0xw.jpg)

全是套路, 引入 vue、vue-router，将 Router 注入到 Vue，又引入 store，方便我们在路由内部读取整个应用的状态信息，例如是否已经登录, 然后实例化一个 router，实例化的时候传入 mode: 'hash' 表示启动 hash 模式的路由，默认是我们用 SpringMVC 的那种非 hash 模式 host:port/aa/bb 这样.

routes 是一个数组，包含一个对象，用 path 定义路由路径、name 给路由起个名字（为了更好地展示错误，我们项目里要求为每个路由起个名字，最好组件也起个名字），component 定义一个路由对应是实际组件.

有两种方式定义 component，一种是同步方式直接 import/require 组件，另一种是我们现在使用的异步加载模式, 套路：`resolve => require([componentPath], resolve)`, componentPath 必须传完整的字符串，不能顶一个变量去拼接，因为 webpack 是根据字符串去处理依赖的.

除了上面的三个 key 外，还有一个 meta，里面可以设置一些每个路由不同的信息，例如 memberCenter 组件里我们定义了 {auth: true} 表示进入这个路由需要登录权限（会在之后看到如何使用）

路由里可以使用和 Backbone 类似的 '/a/:b' 传入一个 b 参数，或者用 query 传入其他参数，实际路由 '/a?b=xxx'

```
{
  path: '*',
  redirect: '/'
}
```

表示无法匹配的路由都转到 / 路由去.

下面我们用 beforeEach 定义在进入每个路由前执行的方法，我们可以在这里实现路由拦截、转发、回退，也基于此我们可以实现路由跳转前的权限校验逻辑.

`store.dispatch('setProgress', 50);` 首先通知 store 把进度条宽度设为一半（原来进度条都 TM 是骗人的）.

`route.matched` 里是存储了当前匹配到的路由数组，然后我们去里面查找包含 `meta.auth` 为 true 的组件，同时判断 `store` 中的 `authorized` （是否已登录）的值，如果需要登录权限又没有登录，那就转到登录页，并把从哪里来的放到路由参数里(from)，否则就可以进入组件了.

进入组件后会执行 afterEach ，我们把进度条设置为100%，恢复滚动条到顶部最左部.

一个基本的路由完成.

# View 视图

## Login

```
import classes from './index.styl';	// 由于使用了 CSS Modules，所以导入样式时将样式存入 classes 变量
import yoga from './yoga.png';	// 图片 import 后才能在 jsx 里使用，.vue 里可以直接img src，内部也是转成 import

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

我们看到 created 里将 this.loginMobile 赋值为 this.mobile，因为初始化我们从 store 里获取 mobile，但是后面的变化输入的时候不需要自动保存到 store 里，而是在 submit 成功的时候才保存到 store 里.

我们用了 mapGetters(['mobile']) 就表示 this.mobile 不能直接设置，因为 mobile 的 setter 被 state 处理的，必须通过 store dispatch 才能修改.

下面的 methods 属性是定义处理事件、逻辑的部分

我们通过 ...mapActions(['setEnv']) 将 store 中的 setEnv action 映射到 vue 实例上，也就是使用 this.setEnv(payload) 就相当于调用了 store.dispatch('setEnv', payload).

下面还是 render 方法，相当于 .vue 文件的 template 模板部分, 我们将这里使用 CSS Modules.

## Login/index.styl

![DC546541-450C-470B-AA91-A0A86C3BD4FD.png](http://ww4.sinaimg.cn/large/65e4f1e6gw1f72bmbphk7j20ge0ke0uj.jpg)

没有 {}，没有: .

relative 是 styl 样式库 nib 里定义的一个函数，调用将生成 position: relative; 对应地还有 absolute, 另外会自动添加 left:0; top:0;

函数可以传参，如 relative(left 10px) 会生成 position: relative; left : 10px;

方法还可以用 css 的方式调用, relative left 10px

## CSS Modules

.yoga 会被编译成 .xx__yoga__yy 这样的看着像乱码的类, 我们可以在 js 里用 classes.yoga 获取到, css 里我们有时候会用 .a-b 定义类，js 里可以用 classes.aB 获取到（定义 css module 的时候加入了驼峰转化）, 如果 css 也有个 .aB 的话就需要 classes['a-b'] 和 classes.aB 去区分.

也就是说有冲突的话就要用原始字符串, 没有冲突的话 classes['a-b'] === classes.aB .

css 的类默认会转化，但是有时候我们又要用到全局的 class，这时可以用 :global(.className) 定义一个在外部类范围的全局样式类

或者使用

```
:global
    .className1
	prop value
    .className2
	prop value
```

定义多个外部类范围内的全局样式, 也就是说 global 里面的类我们不需要用 classes 去取，直接写字符串即可, 如果在 global 里又想用 CSS Modules，那可以再在内部加个 :local, 使用方式和 :global 一致.

顺便提一下，可以看 build/webpack/index.js 看到我们定义我们只在处理 app.styl、theme-*.styl 文件以外的部分启用 CSS Modules.

## render

![E0616D4C-0FFA-4DA7-857F-0AE677C11414.png](http://ww1.sinaimg.cn/large/65e4f1e6gw1f72bpon1s8j21b60yethg.jpg)

用过 react 的话应该很容易理解, 当然有一点儿区别, 比如 react 里应该用 className 而不是 vue jsx 里直接用 class, react 的事件是用例如 onClick 而 vue jsx 是用 on-click, 对应 .vue 文件里的 v-on:click (@click).

来看下 `<div class={['center-block img-circle', classes.yoga]}>` 这一句代码.

class 属性是用 {} 包一个 js 数组, 'center-block img-circle' 这个部分是 bootstrap 公共的样式，classes.yoga 是 CSS Modules 类，最终执行会把它们组合起来.

class 部分也可以传入一个对象，例如 `<div class={{a:true, b:false}}>xx</div>` , 最终会编译成 `<div class="a">xx</div>`, 要用 CSS Modules 的话就是 `<div class={{[classes.a]:true, [classes.b]:false}}>xx</div>`, 这里用到了 es6 对象计算属性语法.

模板具体内容不详谈.

## 事件处理

vue1 里有 v-model 实现双向绑定, jsx 里需要自己去处理帮订属性逻辑，React 本来也有双向绑定 LinkedStateMixin，现在也移除了
