import MemberIndex from './index.common'
import $style from './index.styl'

export default {
  ...MemberIndex,
  render(h) {
    return (
      <div class={[$style.content]} style={{height: this.winHeight + 'px'}}>
        <div class={['pic', $style.pic1]}></div>
        <div class={['pic', $style.pic2]}></div>
        <div class="slogan">
          <div class="slogan-header">
            <input class={$style['slogan-title']} title="请输入标题" value="遇见瑜伽" readonly/>
            <div class={$style.line}></div>
          </div>
          <div class={['center-block', $style['slogan-body']]}>
            <textarea class={$style['slogan-text']} title="请输入内容" readonly>当心得到控制，平静下来时，剩下的便是灵魂</textarea>
          </div>
        </div>
        <div class="member-menu">
          <div class={['pull-left animated', $style.outsideCircle]} on-animationend={this.animationEnd}>
            <router-link to="/member-subscribe"
                         class="inside-circle">
              <span class="glyphicon glyphicon-book menu-icon"/>
              <span class="menu-text">预订课程</span>
            </router-link>
            <div class={$style.insideCircleReplace}></div>
          </div>
          <div class={['pull-right animated', $style.outsideCircle]} on-animationend={this.animationEnd}>
            <router-link to="/member-center"
                         class="inside-circle">
              <span class="glyphicon glyphicon-user menu-icon"/>
              <span class="menu-text">个人中心</span>
            </router-link>
            <div class={$style.insideCircleReplace}></div>
          </div>
        </div>
      </div>
    )
  }
}
