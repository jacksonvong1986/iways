<template>

	<div>
    <div v-if="username" :class="{'header-bar-fixed_show': topPopover}"></div>
    <div :class="[{'fixed': topPopover}, 'header-bar', barClass]" v-if="username">
      <h2 >
        <slot name="barLeft">欢迎登录威尔森智能决策平台</slot>
        <div style="float: right;">
          <slot name="barRight">
            <el-dropdown trigger="click">
              <font><i class="iconfont icon-people"></i> {{username}} <i class="iconfont icon-unfold"></i></font>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><span>进入个人中心</span></el-dropdown-item>
                <el-dropdown-item><span>更改密码</span></el-dropdown-item>
                <el-dropdown-item><span>找回密码</span></el-dropdown-item>
                <el-dropdown-item><span  @click="logout()">退出登录</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <font @click="topPopoverOpen">进入主页 <i class="iconfont icon-unfold"></i></font>
            <div v-if="topPopover" class="header-bar-popover-cont fixed" id="headerPopover" :style="{'height':this.headerPopoverHeight + 'px'}">
              <div class="main-cont" :style="{'height':this.headerPopoverHeight + 'px'}">
                <ul class="left">
                  <li><h3>最近访问</h3></li>
                  <li><a href="/client.html#/home">主页</a></li>
                  <li><a href="/news">新闻中心</a></li>
                  <li><a href="/client.html#/zhiku/sh">售后服务</a></li>
                </ul>
                <div class="right">
                  <h3>
                    <a href="/client.html#/home">进入主页</a>
                    <a href="/">威尔森洞察</a>
                    <a href="/news">新闻消息中心</a>
                  </h3>
                  <div>
                    <h4 class="bg1"><span class="sol-logo"></span>智策</h4>
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
                    <h4 class="bg2"><span class="ana-logo"></span>智库</h4>
                    <h5>乘用车市场</h5>
                    <div class="cont">
                      <dl>
                        <dt>市场预测</dt>
                        <dd><a href="#">车型区域市场销量预测分析服务</a></dd>
                        <dd><a href="#">全国车型销量预测系统</a></dd>
                        <dd><a href="#">全国细分市场销量预测系统与深入洞察方案</a></dd>
                        <dd><a href="#">市场预测专项研究服务</a></dd>
                        <dd><a href="#">新车型上市销量预测分析服务</a></dd>
                        <dd><a href="#">新车型生命周期销量预测分析服务</a></dd>
                      </dl>
                      <dl>
                        <dt>车型规划</dt>
                        <dd><a href="#">产品生命周期管理</a></dd>
                        <dd><a href="#">车型配置库</a></dd>
                        <dd><a href="#">全国细分市场销量预测</a></dd>
                        <dd><a href="#">配置优化模拟器</a></dd>
                        <dd><a href="#">配置重要度研究</a></dd>
                        <dd><a href="#">车型产品相关专题研究服务</a></dd>
                      </dl>
                      <dl>
                        <dt>销量管理</dt>
                        <dd><a href="#">销量分析系统</a></dd>
                        <dd><a href="#">销量分析与诊断系统</a></dd>
                        <dd><a href="#">销售比例分析系统</a></dd>
                      </dl>
                      <dl>
                        <dt>价格管理</dt>
                        <dd><a href="#">价格预测及分析系统</a></dd>
                        <dd><a href="#">网络价格监测及分析系统</a></dd>
                      </dl>
                    </div>
                    <div class="cont">
                      <dl>
                        <dt>渠道管理</dt>
                        <dd><a href="#">渠道建设分析系统</a></dd>
                      </dl>
                      <dl>
                        <dt>售后服务</dt>
                        <dd><a href="#">附件销售策略专线研究服务</a></dd>
                        <dd><a href="#">配件价格监测系统（大众品牌）</a></dd>
                        <dd><a href="#">配件价格监测系统（豪华品牌）</a></dd>
                        <dd><a href="#">配件专项研究服务</a></dd>
                        <dd><a href="#">售后车主忠诚度/流失率研究服务</a></dd>
                        <dd><a href="#">售后服务模式洞察分析服务</a></dd>
                      </dl>
                      <dl>
                        <dt>行业动态</dt>
                        <dd><a href="#">汽车金融业务分析系统</a></dd>
                        <dd><a href="#">终端景气分析服务</a></dd>
                        <dd><a href="#">行业动态分析系统</a></dd>
                      </dl>
                      <dl>
                        <dt>消费者洞察</dt>
                        <dd><a href="#">购买需求与购买 漏斗研究服务</a></dd>
                        <dd><a href="#">燃油车新车主研究服务</a></dd>
                        <dd><a href="#">消费者出行研究服务</a></dd>
                      </dl>
                    </div>
                    <h5>新能源市场</h5>
                    <div class="cont">
                      <dl>
                        <dt>销量管理</dt>
                        <dd><a href="#">新能源销量分析系统</a></dd>
                      </dl>
                      <dl>
                        <dt>价格管理</dt>
                        <dd><a href="#">新能源价格监测及分析系统</a></dd>
                      </dl>
                      <dl>
                        <dt>售后服务</dt>
                        <dd><a href="#">售后服务水平洞察分析报告</a></dd>
                      </dl>
                      <dl>
                        <dt>行业动态</dt>
                        <dd><a href="#">NCBS+新能源品牌资产</a></dd>
                        <dd><a href="#">行业动态分析系统</a></dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </slot>
        </div>
      </h2>
    </div>

    <div v-if="scrollFixed" class="header-fixed_show"></div>
    <div :class="[{'fixed':scrollFixed}, 'header', headerClass]">
      <div>
        <slot name="headerLeft">
          <router-link to="/home">
            <img src="/static/images/index/logo.png" alt="">
          </router-link>
          <cite>威尔森智能决策平台 {{ title }}</cite>
        </slot>

        <div style="float: right;">
          <slot name="headerRight">
            <ul>
              <li><router-link class="on" to="/home">首页</router-link></li>
              <li>
                <el-dropdown trigger="click">
                  <span class="dropdown-btn">智策 <i class="iconfont icon-unfold"></i></span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>市场预测</el-dropdown-item>
                    <el-dropdown-item>车型规划</el-dropdown-item>
                    <el-dropdown-item>渠道建设</el-dropdown-item>
                    <el-dropdown-item>销售管理</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
              <li>
                <el-dropdown trigger="click">
                  <span class="dropdown-btn">智库 <i class="iconfont icon-unfold"></i></span>
                  <el-dropdown-menu slot="dropdown" style="max-height: 230px;min-width: 150px; overflow-y: auto; overflow-x: hidden">
                    <el-dropdown-item>市场预测</el-dropdown-item>
                    <el-dropdown-item>车型规划</el-dropdown-item>
                    <el-dropdown-item><a href="#"><span>销量管理</span></a></el-dropdown-item>
                    <el-dropdown-item>价格管理</el-dropdown-item>
                    <el-dropdown-item>渠道管理</el-dropdown-item>
                    <el-dropdown-item><a href="/client.html#/zhiku/sh">售后服务</a></el-dropdown-item>
                    <el-dropdown-item>行业动态</el-dropdown-item>
                    <el-dropdown-item>消费者洞察</el-dropdown-item>
                    <el-dropdown-item :divided="true">销量管理</el-dropdown-item>
                    <el-dropdown-item>价格管理</el-dropdown-item>
                    <el-dropdown-item>售后服务</el-dropdown-item>
                    <el-dropdown-item>行业动态</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
              <li><a href="#">威尔森洞察</a></li>
              <li><router-link to="/news">新闻中心</router-link></li>
            </ul>
            <a class="login-btn" :href="login_url" v-if="!username">登录</a>
            <a class="logout-btn" href="javascript:;"  v-else  @click="logout()">退出</a>
          </slot>
        </div>
      </div>
    </div>

	</div>

</template>

<script type="text/ecmascript-6">
  import { mapActions, mapState } from 'vuex'
  import { USER_SIGNOUT } from '@/store/user'
  import mixin from '@portal/config/mixin'

	export default {
		name: '',
    mixins: [mixin],
		data() {
			return {
        topPopover:false,
        scrollFixed: false,
        pageTitle: '',
        login_url: '/login',
			}
		},
    props:{
      title:{
        type: String,
        default:''
      },
      barClass:{
        type: String,
      },
      headerClass:{
        type: String,
      },
    },
    watch: {
      username() {
        if (this.username){
          this.scrollFixed = false;
          window.addEventListener('scroll', this.headerScroll);
        } else {
          this.scrollFixed = true;
          window.removeEventListener('scroll', this.headerScroll);
        }
      }
    },

    mounted(){
      window.addEventListener('scroll', this.headerScroll);
      window.addEventListener('click', this.handleDocumentOutClick);
      this.getProduct()
      // if (process.env.AJAX_ROOT != '/') {
      //   let domain = process.env.AJAX_ROOT
      //   this.login_url = domain + this.$interface.CAS_LOGIN
      // }
    },
    destroyed(){
      window.removeEventListener('scroll', this.headerScroll);
      window.removeEventListener('click', this.handleDocumentOutClick);
    },
    methods:{
      getThePageTitle(val){
        this.pageTitle = val;
      },
      topPopoverOpen(){
        this.headerPopoverHeight = document.documentElement.clientHeight - 35;
        this.topPopover = !this.topPopover;
      },
      handleDocumentOutClick(){
        let headerPopover = document.getElementById("headerPopover");
        if (headerPopover){
          if (!headerPopover.contains(event.target)) this.topPopover = false;
        }
      },
      headerScroll(){
        //固定头部
        var webScrollVal = document.documentElement.scrollTop || document.body.scrollTop;
        if ( this.username){
          webScrollVal > 34 ? this.scrollFixed = true : this.scrollFixed = false;
        }
        else{
          webScrollVal > 0 ? this.scrollFixed = true : this.scrollFixed = false;
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
            that.USER_SIGNOUT()
            this.username = ''
          });
        }).catch(() => {
        });
      },
      getProduct() {
        this.$request.get(this.$interface.GET_PRODUCT, {
        }, (response) => {
        });
      }
    },
	}
</script>

<style lang="scss" type="text/scss" scoped>
</style>
