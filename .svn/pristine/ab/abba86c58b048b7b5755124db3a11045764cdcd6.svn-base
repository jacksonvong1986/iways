<template>
  <div :class="{ 'left-menu-shrink' : leftMenuShrink , 'left-submenu-popover' : leftSubmenuPopover, 'right-menu-open' : rightPanelOpen }">
    <!-- 左边导航栏 -->
    <bi-left @hrinkLeftMenu="hrinkLeftMenu" @popoverLeftSubmenu="popoverLeftSubmenu" :isFixed="isFixed" ref="leftPanel"></bi-left>
    <!-- 中间内容区 -->
    <bi-header :isFixed="isFixed"></bi-header>
    <div class="main-panel" :class="{'common-panel' : commonProp}">
      <!--<transition name="main">-->
      <keep-alive>     <!--使用keep-alive会将页面缓存-->
        <router-view class="container" @openTheDialog="DialogStatus" @panelStyle="handlePanelStyle" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive> 
      <router-view class="container" @openTheDialog="DialogStatus" @panelStyle="handlePanelStyle" v-if="!$route.meta.keepAlive"></router-view>
      <!--</transition>-->
      <!-- <bi-footer></bi-footer> -->
    </div>
    <!-- 右边设置栏 -->
    <bi-right :isFixed="isFixed" @changeRightPanelStatus="showRightPanelStatus" ref="rightPanel"></bi-right>
  </div>
</template>

<script>
  import Vue from 'vue'
  import BiHeader from '@index/components/common/header.vue'
  import BiLeft   from '@index/components/common/left.vue'
  import BiRight  from '@index/components/common/right.vue'
  import BiFooter from '@index/components/common/footer.vue'

  import mixin from '@index/config/mixin'
  import bus from '@/config/eventBus'
  import Jquery from 'jquery'

  export default {
    name: 'app',
    mixins: [mixin],
    data(){
      return{
        isFixed: false,
        pageScrollExecuteStatus:true,
        scroll: 0,
        rightPanelOpenNumber:'',
        leftMenuShrink: false,
        leftSubmenuPopover: false,
        rightPanelOpen:false,
        commonProp: true
      }
    },
    watch: {
      '$route': function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.isFixed = false;
      },
    },
    destroyed(){
      window.removeEventListener('scroll', this.scrollEvent);
    },
    mounted() {
      window.addEventListener('scroll', this.scrollEvent);

      this.$nextTick(() => {
        bus.$on('updateConfig', (config) => {
          this.leftMenuShrink = config[2]
          if (this.$refs.leftPanel) {
            this.$refs.leftPanel.collapseStatus = this.leftMenuShrink
            if (!!config[3]) {
              this.rightPanelOpen = config[3]
              this.$refs.rightPanel.rightMenuIsOpen = this.rightPanelOpen
              this.$refs.rightPanel.rightMenu.setting = true
            }
          }
        })
      })
    },
    methods:{
      handlePanelStyle(status) {
        this.commonProp = status
      },
      hrinkLeftMenu(status)  {
        this.leftMenuShrink = status === undefined ? !this.leftMenuShrink : status
        bus.$emit('ResizeChart')
      },
      popoverLeftSubmenu(popoverStatus) {
        this.leftSubmenuPopover = popoverStatus
        bus.$emit('ResizeChart')
      },
      showRightPanelStatus: function (num) {
        num > 0 ? this.rightPanelOpen = true
          : this.rightPanelOpen = !this.rightPanelOpen;

        var config = JSON.parse(localStorage.getItem('config'));
        if (!config || !config[2]) {
          this.$refs.leftPanel.leftMenuShrink
          this.leftMenuShrink = this.rightPanelOpen == false && this.$refs.leftPanel.popoverStatus == false ? false : true
          this.$refs.leftPanel.collapseStatus = this.leftMenuShrink
        }
        bus.$emit('ResizeChart')
      },
      scrollEvent(){
        let webScrollVal = document.documentElement.scrollTop || document.body.scrollTop;
        //头部导航，右边导航固定
        if (webScrollVal > 0){
          this.isFixed = true;
        }
      },
      DialogStatus(status){
        let mainPanel = document.getElementsByClassName('main-panel');
        let mainPanelWidth = mainPanel[0]['clientWidth'];
        if (status == true) {
          mainPanel[0].style.width = mainPanelWidth + 'px';
          mainPanel[0].style.position = 'fixed';
          document.body.style.overflowY = 'scroll';
          document.body.style.overflowX = 'hidden';
        }else{
          mainPanel[0].style.width = 'auto';
          mainPanel[0].style.position = 'initial';
        }
      }

    },
    components:{
      BiHeader,
      BiLeft,
      BiRight,
      BiFooter,
    }
  }
</script>

<style lang="scss" type="text/scss" >
  @import "~@index/assets/scss/style";

  #app {
    font-family: "Microsoft YaHei", 微软雅黑;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .main-enter-active{
    transition: all .8s cubic-bezier(0.25, 0.1, 0.25, 0.9);
  }

  .main-leave-active{
    transition: all .8s cubic-bezier(0.25, 0.1, 0.25, 0.9);
  }

  .main-enter, .main-leave{
    transform: translateY(10px);
    opacity: 0;
  }

  .main{
    transition: all .8s cubic-bezier(0.25, 0.1, 0.25, 0.9);
  }

  .common-panel{
    min-height: 1000px;padding-bottom: 20px; min-width: 920px;
  }
</style>
