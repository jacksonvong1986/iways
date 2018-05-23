<template>
  <div>

    <bi-header></bi-header>

    <div class="home">
      <div class="carousel" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.57)">

        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide class="swiper-item">
            <div style="width: auto;">
              <img src="/static/images/index/linshi/1200banner00101.png" alt="">
              <img src="/static/images/index/linshi/1200banner00102.png" alt="">
              <img src="/static/images/index/linshi/1200banner00103.png" alt="">
            </div>
            <h2>如何将脱了线的产销规划拉回正轨？</h2>
            <div class="answer">
              <h3>车型销量目标管理系统  帮助您</h3>
              <p>
                如何制定并分解全国和区域的销量目标，并实时监控市场销售情况的动态变化，对未来市场状况做出准确的预判和预警，及时调整销量目标或销售策略，确保销售目标能顺利完成
              </p>
              <a href="#">了解详情</a>
            </div>
          </swiper-slide>
          <swiper-slide class="swiper-item">
            <div style="width: auto;">
              <img src="/static/images/index/linshi/1200banner00201.png" alt="">
              <img src="/static/images/index/linshi/1200banner00202.png" alt="">
              <img src="/static/images/index/linshi/1200banner00203.png" alt="">
            </div>
            <h2>哪些配置组合会使改款更具竞争力？</h2>
            <div class="answer">
              <h3>年度车型改款系统 帮助您</h3>
              <p>
                辅助厂商产品改款、换代、新品投放市场机会发现，提高改款车型的竞争力
              </p>
              <a href="#">了解详情</a>
            </div>
          </swiper-slide>
          <swiper-slide class="swiper-item">
            <div style="width: auto;">
              <img src="/static/images/index/linshi/1200banner00301.png" alt="">
              <img src="/static/images/index/linshi/1200banner00302.png" alt="">
              <img src="/static/images/index/linshi/1200banner00303.png" alt="">
            </div>
            <h2>还在纠结如何制定官方指导价？</h2>
            <div class="answer">
              <h3>车型定价管理系统 帮助您</h3>
              <p>
                以达成销量目标为目的，依赖量化模型，制定新车上市价格，以及在售车型的促销额度。
              </p>
              <a href="#">了解详情</a>
            </div>
          </swiper-slide>
          <swiper-slide class="swiper-item">
            <div style="width: auto;">
              <img src="/static/images/index/linshi/1200banner00401.png" alt="">
              <img src="/static/images/index/linshi/1200banner00402.png" alt="">
              <img src="/static/images/index/linshi/1200banner00403.png" alt="">
            </div>
            <h2>销量管理中如何提升营销指标</h2>
            <div class="answer">
              <h3>销量目标优化系统 帮助您</h3>
              <p>
                360º扫描诊断营销指标，实时预警，沙盘模拟营销指标调整优化，助力营销决策方案制定。
              </p>
              <a href="#">了解详情</a>
            </div>
          </swiper-slide>
          <swiper-slide class="swiper-item">
            <div style="width: auto;">
              <img src="/static/images/index/linshi/1200banner00501.png" alt="">
              <img src="/static/images/index/linshi/1200banner00502.png" alt="">
              <img src="/static/images/index/linshi/1200banner00503.png" alt="">
            </div>
            <h2>如何致胜于渠道？</h2>
            <div class="answer">
              <h3>渠道布局决策系统  帮助您</h3>
              <p>
                协助厂商科学规划网点布局，掌握渠道动态变化，指导网点拓展人员及时调整网点拓展计划，调整竞争策略，保证渠道布点快人一步
              </p>
              <a href="#">了解详情</a>
            </div>
          </swiper-slide>

          <div class="swiper-pagination"  slot="pagination"></div>
          <button class="swiper-button swiper-button-prev " slot="button-prev"> <i class="iconfont icon-back "></i> </button>
          <button class="swiper-button swiper-button-next" slot="button-next"> <i class="iconfont icon-right"></i> </button>
        </swiper>

      </div>

      <div class="briefly">
        <ul>
          <li>
            <dl>
              <dt>乘用车销量</dt>
              <dd>
                <span><b class="font-red">{{ salesData.wholeSalesData.month_sales | number_format(0) }}</b> <br>  {{ this_month }}月 销量</span>
                <span><i :class="['iconfont', salesData.wholeSalesData.sales_tb > 0 ? 'icon-triangleupfill font-green' : 'icon-triangledownfill']"></i> <font>{{ salesData.wholeSalesData.sales_tb | multiply(100) | number_format(2) }}%</font> <br>（同比）</span>
                <span><i :class="['iconfont', salesData.wholeSalesData.sales_hb > 0 ? 'icon-triangleupfill font-green' : 'icon-triangledownfill']"></i> <font>{{ salesData.wholeSalesData.sales_hb | multiply(100) | number_format(2) }}%</font> <br>（环比）</span>
              </dd>
              <dd>
                <span><b class="font-blue">{{ salesData.wholeSalesData.total | number_format(0) }}</b> <br>  {{ thisYear }}年 累计销量</span>
                <span><i :class="['iconfont', salesData.wholeSalesData.total_tb > 0 ? 'icon-triangleupfill font-green' : 'icon-triangledownfill']"></i> <font>{{ salesData.wholeSalesData.total_tb | number_format(2) }}%</font> <br>（同比）</span>
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>新能源车销量</dt>
              <dd>
                <span><b class="font-red">{{ salesData.wholeNerSalesData.month_sales | number_format(0) }}</b> <br>  {{ this_month }}月 销量</span>
                <span><i :class="['iconfont', salesData.wholeNerSalesData.sales_tb > 0 ? 'icon-triangleupfill font-green' : 'icon-triangledownfill']"></i> <font>{{ salesData.wholeNerSalesData.sales_tb | multiply(100) | number_format(2) }}%</font> <br>（同比）</span>
                <span><i :class="['iconfont', salesData.wholeNerSalesData.sales_hb > 0 ? 'icon-triangleupfill font-green' : 'icon-triangledownfill']"></i> <font>{{ salesData.wholeNerSalesData.sales_hb | multiply(100) | number_format(2) }}%</font> <br>（环比）</span>
              </dd>
              <dd>
                <span><b class="font-blue">{{ salesData.wholeNerSalesData.total | number_format(0) }}</b> <br>  {{ thisYear }}年 累计销量</span>
                <span><i :class="['iconfont', salesData.wholeNerSalesData.total_tb > 0 ? 'icon-triangleupfill font-green' : 'icon-triangledownfill']"></i> <font>{{ salesData.wholeNerSalesData.total_tb | number_format(2) }}%</font> <br>（同比）</span>
              </dd>
            </dl>
          </li>
          <li>
            <h4>
              <span :class="{'on': brfSelected}" @click="brfSelected = true">威尔森洞察</span>
              <span :class="{'on': !brfSelected}"  @click="brfSelected = false">新闻推荐</span>
            </h4>
            <div v-if="brfSelected">
              <img src="/static/images/index/linshi/home_report.png" alt="">
              <dl>
                <dt><a href="#">销量管理报告</a></dt>
                <dd>通过各种分析，了解各市场维度的表现，支持分析与诊断痛点所在。通过各种分析，支持分析与诊断痛点所在。</dd>
              </dl>
              <a href="#" class="more">更多</a>
            </div>
            <div v-else>
              <ol>
                <li><a href="/news/list?tid=1">政策</a><a href="/news/detail?id=5acac3a5a6845f1548aa6cc3" target="_blank" title="打赢“柴油货车治污”这场重大战役">打赢“柴油货车治污”这场重大战役</a> <cite>04-05</cite></li>
                <li><a href="/news/list?tid=1">政策</a><a href="/news/detail?id=5ac57646a6845f0b10ca30cb" target="_blank" title="再续优惠 深圳新能源停车将免费首1小时">再续优惠 深圳新能源停车将免费首1小时</a>  <cite>04-04</cite></li>
                <li><a href="/news/list?tid=2">产品</a><a href="/news/detail?id=5acac863a6845f096c38d89b" target="_blank" title="杰出的性价比 月销前4的国产紧凑级SUV">杰出的性价比 月销前4的国产紧凑级SUV</a>  <cite>04-09</cite></li>
                <li><a href="/news/list?tid=2">技术</a><a href="/news/detail?id=5acabde5a6845f239c57157f" target="_blank" title="搁置8年 长安谋划再推高端车">搁置8年 长安谋划再推高端车</a> <cite>04-09</cite></li>
                <li><a href="/news/list?tid=2">产品</a><a href="/news/detail?id=5acac01ba6845f1548aa6612" target="_blank" title="宝骏730 延边现车价格 7.88万元起售">宝骏730 延边现车价格 7.88万元起售</a>  <cite>04-09</cite></li>
                <li><a href="/news/list?tid=4">市场</a><a href="/news/detail?id=5acabdf2a6845f239c57159a" target="_blank" title="4S店托管模式是否能破解汽车后市场困局？">4S店托管模式是否能破解汽车后市场困局？</a>  <cite>04-09</cite></li>
                <li><a href="/news/list?tid=5">能源</a><a href="/news/detail?id=5acabde9a6845f239c571585" target="_blank" title="新能源补贴退潮 裸泳者弄潮儿立现">新能源补贴退潮 裸泳者弄潮儿立现</a> <cite>04-09</cite></li>
                <li><a href="/news/list?tid=6">信息</a><a href="/news/detail?id=5acac88fa6845f096c38d95c" target="_blank" title="多地推进共享停车立法 利益链条待整合">多地推进共享停车立法 利益链条待整合</a>  <cite>04-09</cite></li>
              </ol>
              <a href="#" class="more">更多</a>
            </div>
          </li>
        </ul>
      </div>

      <div class="i-analytics">
        <h2>
          <font>智库</font>
          <span @click="openAnalytics = true" :class="{'on': openAnalytics}">乘用车市场</span>
          <span @click="openAnalytics = false" :class="{'on': !openAnalytics}">新能源市场</span>
        </h2>
        <ul v-if="openAnalytics">
          <li>
            <div>
              <i class="iconfont icon-shichangyuce"></i>
              <h4>市场预测</h4>
              <p>提供月度销量滚动预测，并量化描述各因素对预测结果的影响</p>
            </div>
            <dl>
              <dt>
                <i class="iconfont icon-shichangyuce"></i>
                <span>市场预测<br><em>提供月度销量滚动预测，并量化描述各因素对预测结果的影响</em></span>
              </dt>
              <dd><a href="#">全国车型销量预测</a></dd>
              <dd><a href="#">全国细分市场销量预测与洞察</a></dd>
              <dd><a href="#">车型区域市场销量预测研究报告</a></dd>
              <dd><a href="#">车型价量决策支持系统</a></dd>
              <dd><a href="#">全国车型销量预测系统 </a></dd>
              <dd><a href="#" class="more">更多</a></dd>
            </dl>
          </li>
          <li>
            <div>
              <i class="iconfont icon-chexingguihua"></i>
              <h4>车型规划</h4>
              <p>产品生命周期、车型配置与优化分析管理</p>
            </div>
            <dl>
              <dt>
                <i class="iconfont icon-chexingguihua" style="font-size: 21px;"></i>
                <span>车型规划<br><em>产品生命周期、车型配置与优化分析管理</em></span>
              </dt>
              <dd><a href="#">产品生命周期管理</a></dd>
              <dd><a href="#">车型配置库</a></dd>
              <dd><a href="#">配置消费者感知价值研究</a></dd>
              <dd><a href="#">配置优化模拟器</a></dd>
              <dd><a href="#">配置重要度研究</a></dd>
              <dd><a href="#" class="more">更多</a></dd>
            </dl>
          </li>
          <li>
            <div>
              <i class="iconfont icon-xiaoliangguanli"></i>
              <h4>销量管理</h4>
              <p>多维分析销量市场表现，诊断销量弱点，发现市场机遇</p>
            </div>
            <dl>
              <dt>
                <i class="iconfont icon-xiaoliangguanli"></i>
                <span>销量管理<br><em>多维分析销量市场表现，诊断销量弱点，发现市场机遇</em></span>
              </dt>
              <dd><a href="#">销量分析</a></dd>
              <dd><a href="#">销量分析与诊断</a></dd>
              <dd><a href="#">销售比例分析</a></dd>
              <dd><a href="#">销售比例分析系统</a></dd>
            </dl>
          </li>
          <li>
            <div>
              <i class="iconfont icon-jiageguanli"></i>
              <h4>价格管理</h4>
              <p>线上和线下价格分析与预警，应对价格竞争，提升价格管理</p>
            </div>
            <dl>
              <dt>
                <i class="iconfont icon-jiageguanli"></i>
                <span>价格管理<br><em>线上和线下价格分析与预警，应对价格竞争，提升价格管理</em></span>
              </dt>
              <dd><a href="#">价格监测及分析</a></dd>
              <dd><a href="#">网络价格监测及分析</a></dd>
            </dl>
          </li>
          <li>
            <div>
              <i class="iconfont icon-qudaoguanli"></i>
              <h4>渠道管理</h4>
              <p>渠道建设与分析渠道建设与分析渠道建设与分析</p>
            </div>
            <dl>
              <dt>
                <i class="iconfont icon-qudaoguanli"></i>
                <span>渠道管理<br><em>渠道建设与分析渠道建设与分析渠道建设与分析</em></span>
              </dt>
              <dd><a href="#">渠道建设分析与诊断</a></dd>
              <dd><a href="#">渠道建设分析系统</a></dd>
            </dl>
          </li>
          <li>
            <div>
              <i class="iconfont icon-shouhoufuwu1"></i>
              <h4>售后服务</h4>
              <p>售后配件价格监测售后配件价格监测售后配件价格监测</p>
            </div>
            <dl>
              <dt>
                <i class="iconfont icon-shouhoufuwu1"></i>
                <span>售后服务<br><em>售后配件价格监测</em></span>
              </dt>
              <dd><a href="#">配件价格监测（大众品牌）</a></dd>
              <dd><a href="#">配件价格监测（豪华品牌）</a></dd>
              <dd><a href="#">附件销售策略</a></dd>
              <dd><a href="#">配件专项研究</a></dd>
              <dd><a href="#">售后车主忠诚度/流失率研究</a></dd>
              <dd><a href="#" class="more">更多</a></dd>
            </dl>
          </li>
          <li>
            <div>
              <i class="iconfont icon-hangyedongtai1"></i>
              <h4>行业动态</h4>
              <p>产业环境，终端动态和汽车金融监测和分析，洞察产业，落地方案</p>
            </div>
            <dl>
              <dt>
                <i class="iconfont icon-hangyedongtai1"></i>
                <span>行业动态<br><em>产业环境，终端动态和汽车金融监测和分析，洞察产业，落地方案</em></span>
              </dt>
              <dd><a href="#">汽车金融业务分析</a></dd>
              <dd><a href="#">行业动态分析</a></dd>
              <dd><a href="#">终端景气分析报告</a></dd>
            </dl>
          </li>
          <li>
            <div>
              <i class="iconfont icon-xiaofeizhedongcha"></i>
              <h4>消费者洞察</h4>
              <p>全方位了解消费者购车理由、用车习惯、使用痛点等信息</p>
            </div>
            <dl>
              <dt>
                <i class="iconfont icon-xiaofeizhedongcha"></i>
                <span>消费者洞察<br><em>全方位了解消费者购车理由、用车习惯、使用痛点等信息</em></span>
              </dt>
              <dd><a href="#">购买需求与购买漏斗研究</a></dd>
              <dd><a href="#">燃油车新车主研究</a></dd>
              <dd><a href="#">消费者出行研究</a></dd>
            </dl>
          </li>
        </ul>
        <ul v-else>
          <li>
            <div>
              <i class="iconfont icon-xiaoliangguanli"></i>
              <h4>销量管理</h4>
              <p>新能源销量分析和政策达标监测预警</p>
            </div>
            <dl>
              <dt>
                <i class="iconfont icon-xiaoliangguanli"></i>
                <span>销量管理<br><em>新能源销量分析和政策达标监测预警</em></span>
              </dt>
              <dd><a href="#">新能源销量分析</a></dd>
            </dl>
          </li>
          <li>
            <div>
              <i class="iconfont icon-jiageguanli"></i>
              <h4>价格管理</h4>
              <p>新能源线上和线下价格分析和预警，应对价格竞争，提升价格管理</p>
            </div>
            <dl>
              <dt>
                <i class="iconfont icon-jiageguanli"></i>
                <span>价格管理<br><em>新能源线上和线下价格分析和预警，应对价格竞争，提升价格管理</em></span>
              </dt>
              <dd><a href="#">新能源价格监测及分析</a></dd>
            </dl>
          </li>
          <li>
            <div>
              <i class="iconfont icon-shouhoufuwu1"></i>
              <h4>售后服务</h4>
              <p>新能源售后服务水平洞察分析报告新能源售后服务水平析报告</p>
            </div>
            <dl>
              <dt>
                <i class="iconfont icon-shouhoufuwu1"></i>
                <span>售后服务<br><em>新能源售后服务水平洞察分析报告新能源售后服务水平析报告</em></span>
              </dt>
              <dd><a href="#">新能源售后服务水平洞察分析报告</a></dd>
            </dl>
          </li>
          <li>
            <div>
              <i class="iconfont icon-hangyedongtai1"></i>
              <h4>行业动态</h4>
              <p>新能源产业政策，终端动态和汽车金融分析，洞察产业，落地方案</p>
            </div>
            <dl>
              <dt>
                <i class="iconfont icon-hangyedongtai1"></i>
                <span>行业动态<br><em>新能源产业政策，终端动态和汽车金融分析，洞察产业，落地方案</em></span>
              </dt>
              <dd><a href="client.html#/zhiku/ner_hy">新能源行业动态分析</a></dd>
              <dd><a href="client.html#/zhiku/ner_hy">新能源行业月报</a></dd>
            </dl>
          </li>
        </ul>

      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">

  import { mapActions, mapState } from 'vuex'
  import { USER_SIGNOUT } from '@/store/user'
  import mixin from '@portal/config/mixin'
  import ScrollBar from '@/components/ScrollBar'
  import BiHeader from '@portal/components/common/header'


  export default {
    name: 'Home',
    mixins: [mixin],
    data(){
      return{
        openAnalytics:true,
        popoverShowStyle:false,
        brfSelected:true,
        headerPopoverHeight: '',
        loading: true,
        topPopover: false,

        swiperOption: {
          notNextTick: true,
          autoplay: {
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
          },
          direction : 'horizontal',
          grabCursor : true,
          setWrapperSize :true,
          autoHeight: true,
          pagination :{
            el: '.swiper-pagination',
            clickable :true,
            bulletClass : 'swiper-bullet',
            bulletActiveClass: 'swiper-bullet-active',
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },

        lastYear: '2017',
        thisYear: '2018',
        manfid: '30',
        manf_name: '东风日产',
        this_year_month: '201802',
        salesData: {
          brandSalesData: {},
          wholeSalesData: {},
          brandNerSalesData: {},
          wholeNerSalesData: {}
        }
      }
    },
    computed: {
      this_month: function() {
          return this.this_year_month ? this.this_year_month.substr(-2).replace(/\b(0+)/gi,"") : '';
      },
    },
    mounted(){
      setTimeout(() => {
        this.loading = false;
      }, 700);
      this.GET_SALES()
    },
    filters: {
        multiply: function (number, multiplier) {
            if (multiplier != 1) {
                number = number * multiplier;
            }
            return number;
        },
        divide: function (number, divisor) {
            if (divisor != 1) {
                number = number / divisor;
            }
            return number;
        },
        number_format: function (number, decimals = 0, separator = ',') {
            if (!number || number == "" || isNaN(number)) {
                number = 0;
            }
            if (number === -1) {
              return '暂无数据'
            }
            number = number.toFixed(decimals);
            if (separator != "") {
                var reg=/\d{1,3}(?=(\d{3})+$)/g;
                number = (number + '').replace(reg, '$&' + separator);
            }
            return number;
        },
    },
    methods:{
      GET_SALES() {
        this.$request.get(this.$interface.GET_SALES, {
          header: {token: 'token'},
          ym: this.this_year_month,
          manfid: this.manfid
        }, (response) => {
          let data = response.data
          this.salesData = {
            brandSalesData: data[0] || {},
            wholeSalesData: data[1] || {},
            brandNerSalesData: data[2] || {},
            wholeNerSalesData: data[3] || {}
          }
        }, this.failure)
      }
    },
    components:{
      ScrollBar,
      BiHeader
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  @import "~@portal/assets/scss/style";
</style>
