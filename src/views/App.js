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
let resize, winHeight, winWidth;

addEventListener('resize', resize = () => {
  winHeight = docEl.clientHeight;
  winWidth = docEl.clientWidth;
  store.dispatch('setSize', {winHeight, winWidth});
  docEl.style.fontSize = store.getters.fontSize + 'px';
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
