import {mapGetters} from 'vuex'

import {deleteItem, on} from 'utils'
import {PERMISSION} from 'store/constants'

import store from 'store'

import 'styles/bootstrap'
import 'styles/app'

import HiLoading from 'components/HiLoading'
import HiProgress from 'components/HiProgress'

const theme = ['blue', 'green', 'purple', 'red'][~~(Math.random() * 4)]

System.import('styles/theme-' + theme)

const docEl = document.documentElement
const resize = () => {
  store.dispatch('setSize', {winHeight: docEl.clientHeight, winWidth: docEl.clientWidth})
  docEl.style.fontSize = store.getters.fontSize + 'px'
}

let resizeTimeoutId

on(window, 'resize', () => {
  clearTimeout(resizeTimeoutId)
  resizeTimeoutId = setTimeout(resize, 300)
})

resize()

// 暂时添加一个退出登录的钩子
window._logout_ = () => {
  store.dispatch('setEnv', {authorized: false, mobile: null})
  store.dispatch('resetRole')
  deleteItem(PERMISSION)
  location.reload()
}

export default {
  computed: {
    ...mapGetters(['progress'])
  },
  render(h) {
    let keepAlive = this.$route.meta.keepAlive
    keepAlive = keepAlive == null || keepAlive
    return (
      <div id="app">
        {this.progress ? <HiLoading/> : ''}
        <HiProgress progress={this.progress}/>
        <transition name="bounce">
          <keep-alive>
            {keepAlive ? <router-view/> : ''}
          </keep-alive>
        </transition>
        <transition name="bounce">
          {keepAlive ? '' : <router-view/>}
        </transition>
      </div>
    )
  }
}
