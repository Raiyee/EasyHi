import {mapGetters} from 'vuex';

import store from 'store';

import 'bootstrap.less';
import 'styles/app';

import HiLoading from 'components/HiLoading';
import HiProgress from 'components/HiProgress';

const docEl = document.documentElement;
let resize, height, width;

addEventListener('resize', resize = () => {
  height = docEl.clientHeight;
  width = docEl.clientWidth;
  docEl.style.fontSize = Math.min(width, 375) / 375 * 16 + 'px';
  store.dispatch('setSize', {height, width});
}, false);

resize();

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
