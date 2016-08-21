import MemberIndex from './index.common';
import classes from './index.styl';

export default {
  ...MemberIndex,
  render(h) {
    return (
      <div class={['container', classes.container]} style={{height: this.height + 'px'}}>
        <div class={['pic', classes.pic1]}></div>
        <div class={['pic', classes.pic2]}></div>
        <div class="slogan">
          <div class="slogan-header">
            <input class={classes['slogan-title']} title="请输入标题" value="遇见瑜伽" readonly/>
            <div class={classes.line}></div>
          </div>
          <div class={['center-block', classes['slogan-body']]}>
            <textarea class={classes['slogan-text']} title="请输入内容" readonly>当心得到控制，平静下来时，剩下的便是灵魂</textarea>
          </div>
        </div>
        <div class="member-menu">
          <div class={['pull-left animated', classes.outsideCircle]} on-animationend={this.animationEnd}>
            <div class="inside-circle"
                 on-click={this.scale}>
              <span class="glyphicon glyphicon-book menu-icon"/>
              <span class="menu-text">预订课程</span>
            </div>
            <div class={classes.insideCircleReplace}></div>
          </div>
          <div class={['pull-right animated', classes.outsideCircle]} on-animationend={this.animationEnd}>
            <router-link to={{name: 'memberCenter'}}
                         class="inside-circle">
              <span class="glyphicon glyphicon-user menu-icon"/>
              <span class="menu-text">个人中心</span>
            </router-link>
            <div class={classes.insideCircleReplace}></div>
          </div>
        </div>
      </div>
    );
  }
};
