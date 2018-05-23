<template>

	<div>
    <div class="bg-black" :class="{'header-bar-fixed_show': topPopover}"></div>
    <div :class="[{'fixed': topPopover}, 'header-bar', 'bg-black']">
      <h2 >
        <router-link to="/home"><font class="margin0">首页</font></router-link>
        <el-dropdown trigger="click">
          <font> 智策 <i class="iconfont icon-unfold"></i></font>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>市场预测</el-dropdown-item>
            <el-dropdown-item>车型规划</el-dropdown-item>
            <el-dropdown-item>渠道建设</el-dropdown-item>
            <el-dropdown-item>销售管理</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="click">
          <font> 智库 <i class="iconfont icon-unfold"></i></font>
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
        <router-link to="/"><font>威尔森洞察</font></router-link>
        <router-link to="/news"><font class="on">新闻中心</font></router-link>

        <div style="float: right;" v-if="username">
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
                    <a href="/news">新闻中心</a>
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
        </div>
        <div style="float: right;" v-else>
          <router-link to="/login"><font class="margin0">登录</font></router-link>
        </div>
      </h2>
    </div>
    <div class="header hasborder">
      <div>
        <router-link to="/home">
          <img src="/static/images/index/logo.png" alt="">
        </router-link>
        <cite>威尔森智能决策平台 - 新闻中心</cite>

        <div style="float: right;">
          <div class="search-class_va"><input type="text" placeholder="新闻关键词搜索" v-model="keyword"><font @click="searchData()">搜索</font></div>
        </div>
      </div>
    </div>

    <div :class="{'news-bar-fixed_show': scrollFixed}"></div>
    <div :class="[{'fixed': scrollFixed},'news-bar']">
      <div v-if="news_types.length > 0">
        <ul>
          <li class="mgl0"><router-link to="/news" :class="{'on':type_id==0}">新闻首页</router-link></li>
          <li v-for="(item, key) in news_types" v-if="item._id == type_id && key > 10" ><router-link :to="'/news/list?tid='+item._id" class="on">{{ item.type_name }}</router-link></li>
          <li v-for="(item, key) in news_types" :key="item._id"><router-link :to="'/news/list?tid='+item._id" :class="{'on':item._id==type_id}">{{ item.type_name }}</router-link></li>
        </ul>
        <el-popover
          ref="popoverMore"
          placement="bottom-end"
          popper-class="news-bar-popover-more"
          width="400"
          trigger="click"
          v-model="popoverMoreVisible"
          @show="PopoverMoreStatus = true"
          @hide="PopoverMoreStatus = false">
          <div class="news-bar-popover">
          <span v-for="(item, key) in news_types" :key="item._id">
            <router-link :to="'/news/list?tid='+item._id" :class="{'on':item._id==type_id}">{{ item.type_name }}</router-link>
          </span>
          </div>
        </el-popover>
        <span  v-popover:popoverMore :class="[{'on': PopoverMoreStatus}, 'popover-btn']">更多 <i class="iconfont icon-unfold"></i></span>
      </div>
    </div>

    <!-- 新闻主体内容 -->
    <router-view></router-view>

	</div>

</template>

<script type="text/ecmascript-6">
  import { mapActions, mapState } from 'vuex'
  import { USER_SIGNOUT } from '@/store/user'
  import mixin from '@portal/config/mixin'

  import BiHeader from '@portal/components/common/header'
  import bus from '@/config/eventBus'

	export default {
		name: '',
    mixins: [mixin],
		data() {
			return {
        topPopover:false,
        scrollFixed: false,

        baseInfo: {},
        news_types: [],
        type_id: this.$route.query.tid || 0,
        popoverMoreVisible: false,
        PopoverMoreStatus: false,
        keyword: this.$route.query.wd || '',
			}
		},
    mounted() {
      this.getBaseInfo();
      window.addEventListener('scroll', this.headerScroll);
      window.addEventListener('click', this.handleDocumentOutClick);
      let that = this
      bus.$on('getNewsType', (type_id) => {
        that.type_id= type_id
      })
    },
    watch: {
      $route() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        this.type_id = this.$route.query.tid || 0;
        this.popoverMoreVisible = false;
      }
    },
    destroyed(){
      window.removeEventListener('scroll', this.headerScroll);
      window.removeEventListener('click', this.handleDocumentOutClick);
    },
    methods: {
      getBaseInfo() {
        this.$request.get(this.$interface.GET_NEWS_BASE_INFO, {
          token: 'token'
        }, (response) => {
          this.baseInfo = response.data[0]
          this.news_types = this.baseInfo.news_type.map((item) => {return item})
        }, this.failure)
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
          webScrollVal > 120 ? this.scrollFixed = true : this.scrollFixed = false;
        }
        else{
          webScrollVal > 85 ? this.scrollFixed = true : this.scrollFixed = false;
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
      selectNewsType(type_id) {
        if (!type_id)return;
        this.type_id = type_id
      },
      searchData() {
        if (this.keyword.length > 100)return
        this.$router.push({path: '/news/list', query: {wd: this.keyword}})
      },

    },
    components:{
    }
	}
</script>

<style lang="scss" type="text/scss" scoped>

</style>
