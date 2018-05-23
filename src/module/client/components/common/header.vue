<template>
	<div>
    <div :class="[{'fixed': isFixed}, 'header']">
      <div class="mark">
        <router-link to="/">
          <img src="/static/images/client/logo-sign.png" alt="">
          <strong>智能决策平台</strong>
        </router-link>
      </div>
      <div class="web-nav" @click="openHeaderPopover()" :class="{'on': headerPopover}">
        网站导航 <i class="iconfont icon-unfold"></i>
      </div>
      <ul class="right">
        <li><i class="iconfont icon-search1  "></i> 搜索</li>
        <li><el-badge value="18" class="item"><i class="iconfont icon-notice"></i></el-badge>通知</li>
        <li>
          <el-dropdown trigger="click" >
            <span><i class="iconfont icon-wenhao1"></i> 帮助 <i class="iconfont icon-unfold"></i></span>
            <el-dropdown-menu slot="dropdown"  class="header-dropdown-zindex">
              <el-dropdown-item>页面自定义布局</el-dropdown-item>
              <el-dropdown-item>免费数据的下载方式</el-dropdown-item>
              <el-dropdown-item>数据粒度优化方案</el-dropdown-item>
              <el-dropdown-item>订制专属数据信息</el-dropdown-item>
              <el-dropdown-item>联系我们</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li>
          <el-dropdown trigger="click">
            <span><i class="iconfont icon-people"></i> {{ username }} <i class="iconfont icon-unfold"></i></span>
            <el-dropdown-menu slot="dropdown" class="header-dropdown-zindex">
              <el-dropdown-item class="header-dropdown-menu-item"><div>进入个人中心</div></el-dropdown-item>
              <el-dropdown-item class="header-dropdown-menu-item"><div>更改密码</div></el-dropdown-item>
              <el-dropdown-item class="header-dropdown-menu-item"><div>找回密码</div></el-dropdown-item>
              <el-dropdown-item class="header-dropdown-menu-item"><div  @click="logout()">退出登录</div></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
    <div class="fixed header-el-popover-cont" id="header-el-popover-cont" v-if="headerPopover" :style="{'height':this.headerPopoverHeight + 'px'}">
      <div class="main-cont" :style="{'height':this.headerPopoverHeight + 'px'}">
        <ul class="left">
          <li><h3>最近访问</h3></li>
          <li><a href="/client.html#/home">主页</a></li>
          <li><a href="/news">新闻中心</a></li>
          <li><a href="/client.html#/zhiku/sh">售后服务</a></li>
          <li><a href="/client.html#/news">新闻舆情</a></li>
        </ul>
        <div class="right">
          <h2>
            <a href="/">返回首页</a>
            <a href="#">威尔森洞察</a>
            <a href="/news">新闻中心</a>
          </h2>
          <div>
            <h3 class="bg1"><span class="sol-logo"></span>智策</h3>
            <div class="cont">
              <dl>
                <dt>市场预测</dt>
                <dd><a href="#">车型价量决策支持系统</a></dd>
                <dd><a href="#">车型销量制定与调整</a></dd>
              </dl>
              <dl>
                <dt>车型规划</dt>
                <dd><a href="#">年度车型改款决策支持系统</a></dd>
              </dl>
              <dl>
                <dt>渠道管理</dt>
                <dd><a href="#">渠道布局决策支持系统</a></dd>
              </dl>
              <dl>
                <dt>销量管理</dt>
                <dd><a href="#">销量目标优化决策支持</a></dd>
              </dl>
            </div>
          </div>
          <div>
            <h3 class="bg2"><span class="ana-logo"></span>智库</h3>
            <h4>乘用车市场</h4>
            <div class="cont">
              <dl>
                <dt>市场预测</dt>
                <dd><a href="#">全国车型销量预测</a></dd>
                <dd><a href="#">全国细分市场销量预测与洞察</a></dd>
                <dd><a href="#">车型区域市场销量预测研究报告</a></dd>
                <dd><a href="#">车型价量决策支持系统</a></dd>
                <dd><a href="#">全国车型销量预测系统</a></dd>
                <dd><a href="#">全国细分市场销量预测系统与深入洞察分析报告</a></dd>
                <dd><a href="#">市场预测专项研究</a></dd>
                <dd><a href="#">新车型上市销量预测分析报告</a></dd>
                <dd><a href="#">新车型生命周期销量预测研究报告</a></dd>
              </dl>
              <dl>
                <dt>车型规划</dt>
                <dd><a href="#">产品生命周期管理</a></dd>
                <dd><a href="#">车型配置库</a></dd>
                <dd><a href="#">配置消费者感知价值研究</a></dd>
                <dd><a href="#">配置优化模拟器</a></dd>
                <dd><a href="#">配置重要度研究</a></dd>
                <dd><a href="#">配置装备趋势报告</a></dd>
                <dd><a href="#">新车上市冲击力分析报告</a></dd>
                <dd><a href="#">新车上市导报</a></dd>
                <dd><a href="#">新车上市监测系统</a></dd>
                <dd><a href="#">展会分析报告</a></dd>
              </dl>
              <dl>
                <dt>销量管理</dt>
                <dd><a href="#">销量分析</a></dd>
                <dd><a href="#">销量分析与诊断</a></dd>
                <dd><a href="#">销售比例分析</a></dd>
                <dd><a href="#">销售比例分析系统</a></dd>
              </dl>
              <dl>
                <dt>价格管理</dt>
                <dd><a href="#">价格监测及分析</a></dd>
                <dd><a href="#">网络价格监测及分析</a></dd>
              </dl>
            </div>
            <div class="cont">
              <dl>
                <dt>渠道管理</dt>
                <dd><a href="#">渠道建设分析与诊断</a></dd>
                <dd><a href="#">渠道建设分析系统</a></dd>
              </dl>
              <dl>
                <dt>售后服务</dt>
                <dd><a href="#">配件价格监测（大众品牌）</a></dd>
                <dd><a href="#">配件价格监测（豪华品牌）</a></dd>
                <dd><a href="#">附件销售策略</a></dd>
                <dd><a href="#">配件专项研究</a></dd>
                <dd><a href="#">售后车主忠诚度/流失率研究</a></dd>
                <dd><a href="#">售后服务模式洞察分析报告</a></dd>
              </dl>
              <dl>
                <dt>行业动态</dt>
                <dd><a href="#">汽车金融业务分析</a></dd>
                <dd><a href="#">行业动态分析</a></dd>
                <dd><a href="#">终端景气分析报告</a></dd>
              </dl>
              <dl>
                <dt>消费者洞察</dt>
                <dd><a href="#">购买需求与购买漏斗研究</a></dd>
                <dd><a href="#">燃油车新车主研究</a></dd>
                <dd><a href="#">消费者出行研究</a></dd>
              </dl>
            </div>

            <h4>新能源市场</h4>
            <div class="cont">
              <dl>
                <dt>销量管理</dt>
                <dd><a href="#">新能源销量分析</a></dd>
              </dl>
              <dl>
                <dt>价格管理</dt>
                <dd><a href="#">新能源价格监测及分析</a></dd>
              </dl>
              <dl>
                <dt>售后服务</dt>
                <dd><a href="#">新能源售后服务水平洞察分析报告</a></dd>
              </dl>
              <dl>
                <dt>行业动态</dt>
                <dd><router-link to="/zhiku/ner_hy">新能源行业动态分析</router-link></dd>
                <dd><router-link to="/zhiku/ner_hy">新能源行业月报</router-link></dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import { mapActions, mapState } from 'vuex'
  import { USER_SIGNOUT } from '@/store/user'

  import mixin from '@index/config/mixin.js'
  import bus from '@/config/eventBus.js'

	export default {
  	name: '',
    mixins: [mixin],
    data(){
  	  return{
        popoverShowStyle:false,
        headerPopover:false,
        headerPopoverHeight:''
      }
    },
    props: {
      isFixed: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      '$route': function() {
        this.headerPopover = false;
      },
    },
  	computed: mapState({
      user: state => state.user,
    }),
    methods: {
      openHeaderPopover(){
        this.headerPopoverHeight = document.documentElement.clientHeight - 35;
        this.headerPopover = !this.headerPopover;
      },
      handleDocumentOutClick(){
        let headerPopover = document.getElementById("header-el-popover-cont");
        if (headerPopover){
          if (!headerPopover.contains(event.target)) this.headerPopover = false;
        }
      },
      ...mapActions([USER_SIGNOUT]),
      logout() {
        const that = this;
        this.$confirm('是否退出登录', '提示', {
          lockScroll: false,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.get(this.$interface.LOGOUT, {
            token: this.token
          }, (response) => {
            var oos_login = !!that.$store.state.user.code
            that.USER_SIGNOUT()
            if (oos_login) {
              window.location.href = '/oos_logout'
            } else {
              window.location.href = '/login'
            }
          });
        }).catch(() => {
        });
      },

    },
    mounted: function() {
      var that = this
      bus.$on('updateConfig', function(config) {
        that.showUnread = config[6]
      });
      window.addEventListener('click', this.handleDocumentOutClick);
    },
    destroyed(){
      window.removeEventListener('click', this.handleDocumentOutClick);
    }
	}
</script>

<style lang="scss" type="text/scss">
</style>
