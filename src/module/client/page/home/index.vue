<template>
  <div class="content-main home">

    <div class="notice">
      <ul>
        <li class="cont-item">
          <el-carousel trigger="click" height="185px" arrow="never">
            <el-carousel-item>
              <h2>智能预警 - 车型销量制定与调整</h2>
              <dl>
                <dt><a href="#">车型销量制定与调整</a></dt>
                <dd>
                  <bi-progress type="circle" percentage="0.3" color="#f99d6a" circle-width="46" circle-text-size="13"></bi-progress>
                </dd>
                <dd title="车型销量目标完成率仅占70%市场">车型销量目标完成率仅占70%市场</dd>
              </dl>
              <dl>
                <dt><a href="#">销量管理</a></dt>
                <dd>
                  <bi-progress type="circle" percentage="0.5" color="#fb6c72" circle-width="46" circle-text-size="13"></bi-progress>
                </dd>
                <dd title="3个区域威胁竞品数量增加百分之五十">3个区域威胁竞品数量增加百分之五十</dd>
              </dl>
              <dl>
                <dt><a href="#">售后服务</a></dt>
                <dd>
                  <bi-progress type="circle" percentage="0.5" color="#91bb3d" circle-width="46" circle-text-size="13" :show-text="false" circleText="3款"></bi-progress>
                </dd>
                <dd title="购车消费者用户对3款车型售后服务不认同">购车消费者用户对3款车型售后服务不认同</dd>
              </dl>
            </el-carousel-item>
            <el-carousel-item>
              <h2>智能预警 - 销量管理</h2>
              <dl>
                <dt><a href="#">车型销量制定与调整</a></dt>
                <dd>
                  <bi-progress type="circle" percentage="0.3" color="#70db93" circle-width="46" circle-text-size="13"></bi-progress>
                </dd>
                <dd title="车型销量目标完成率仅占70%市场">车型销量目标完成率仅占70%市场</dd>
              </dl>
              <dl>
                <dt><a href="#">销量管理</a></dt>
                <dd>
                  <bi-progress type="circle" percentage="0.5" color="#e6a23c" circle-width="46" circle-text-size="13"></bi-progress>
                </dd>
                <dd title="3个区域威胁竞品数量增加百分之五十">3个区域威胁竞品数量增加百分之五十</dd>
              </dl>
              <dl>
                <dt><a href="#">售后服务</a></dt>
                <dd>
                  <bi-progress type="circle" percentage="0.5" color="#e47833" circle-width="46" circle-text-size="13" :show-text="false" circleText="3款"></bi-progress>
                </dd>
                <dd title="购车消费者用户对3款车型售后服务不认同">购车消费者用户对3款车型售后服务不认同</dd>
              </dl>
            </el-carousel-item>
            <el-carousel-item>
              <h2>智能预警 - 售后服务</h2>
              <dl>
                <dt><a href="#">车型销量制定与调整</a></dt>
                <dd>
                  <bi-progress type="circle" percentage="0.3" color="#d9d919" circle-width="46" circle-text-size="13"></bi-progress>
                </dd>
                <dd title="车型销量目标完成率仅占70%市场">车型销量目标完成率仅占70%市场</dd>
              </dl>
              <dl>
                <dt><a href="#">销量管理</a></dt>
                <dd>
                  <bi-progress type="circle" percentage="0.5" color="#339ace" circle-width="46" circle-text-size="13"></bi-progress>
                </dd>
                <dd title="3个区域威胁竞品数量增加百分之五十">3个区域威胁竞品数量增加百分之五十</dd>
              </dl>
              <dl>
                <dt><a href="#">售后服务</a></dt>
                <dd>
                  <bi-progress type="circle" percentage="0.5" color="#f04048" circle-width="46" circle-text-size="13" :show-text="false" circleText="3款"></bi-progress>
                </dd>
                <dd title="购车消费者用户对3款车型售后服务不认同">购车消费者用户对3款车型售后服务不认同</dd>
              </dl>
            </el-carousel-item>
          </el-carousel>
        </li>

        <li class="cont-item">
          <h3>
            <span :class="{'on': noticeSelected}"  @click="noticeSelected = true">待办事项</span>
            <span :class="{'on': !noticeSelected}" @click="noticeSelected = false">公告</span>
          </h3>
          <div class="upcoming" v-if="noticeSelected">
            <p>亲爱的丽仪经理 《配件价格监测系统》将在 2018年2月6日 到期，请即时续费。</p>
            <router-link to="#" class="more">查看更多</router-link>
          </div>
          <div class="inform" v-else>
            <a href="#">2月2日DSS平台更名为智能决策操作平台了</a>
            <a href="#">1月31日全国车型销量预测系统发布上线了</a>
            <a href="#">1月30日全国细分市场销量预测发布上线了</a>
            <a href="#">1月30日全国细分市场销量预测发布上线了</a>
          </div>
        </li>
      </ul>
    </div>

    <div class="product">
      <h2>
        我的关注
        <span class="right" @click="dialogVisible = true"><em class="iconfont icon-baogaoshuxie"></em> 订制关注</span>
      </h2>
      <el-dialog title="定制我的关注" :visible.sync="dialogVisible" width="1200px"  :center="true" :append-to-body="true" :fullscreen="true" :lock-scroll="false" @open="isOpenDialogVisible(true)" @close="isOpenDialogVisible(false)">
        <div class="my-attention-dialog">
          <div class="clear">
            <el-card class="product-box-card">
              <div slot="header" class="product-box-car-header">
                <span>市场预测趋势图</span>
                <span style="float: right"><el-checkbox v-model="checked"></el-checkbox></span>
              </div>
              <div class="product-box-card-main">
                <img src="/static/images/client/linshi/img07.png" alt="">
              </div>
            </el-card>
            <el-card class="product-box-card">
              <div slot="header" class="product-box-car-header">
                <span>销量分析与诊断系统</span>
                <span style="float: right"><el-checkbox v-model="checked"></el-checkbox></span>
              </div>
              <div class="product-box-card-main">
                <img src="/static/images/client/linshi/img08.png" alt="">
              </div>
            </el-card>
            <el-card class="product-box-card">
              <div slot="header" class="product-box-car-header">
                <span>售后服务-车型总体配件价格比较</span>
                <span style="float: right"><el-checkbox v-model="checked"></el-checkbox></span>
              </div>
              <div class="product-box-card-main">
                <img src="/static/images/client/linshi/img07.png" alt="">
              </div>
            </el-card>
            <el-card class="product-box-card">
              <div slot="header" class="product-box-car-header">
                <span>销量分析与诊断系统</span>
                <span style="float: right"><el-checkbox v-model="checked"></el-checkbox></span>
              </div>
              <div class="product-box-card-main">
                <img src="/static/images/client/linshi/img08.png" alt="">
              </div>
            </el-card>
            <el-card class="product-box-card">
              <div slot="header" class="product-box-car-header">
                <span>市场预测趋势图</span>
                <span style="float: right"><el-checkbox v-model="checked"></el-checkbox></span>
              </div>
              <div class="product-box-card-main">
                <img src="/static/images/client/linshi/img07.png" alt="">
              </div>
            </el-card>
            <el-card class="product-box-card">
              <div slot="header" class="product-box-car-header">
                <span>销量分析与诊断系统</span>
                <span style="float: right"><el-checkbox v-model="checked"></el-checkbox></span>
              </div>
              <div class="product-box-card-main">
                <img src="/static/images/client/linshi/img08.png" alt="">
              </div>
            </el-card>
          </div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </div>
        <div slot="footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <div>
        <el-card class="product-box-card">
          <div slot="header" class="product-box-car-header">
            <span>销量走势情况</span>
          </div>
          <bi-echart class="product-box-card-main" :option="optionA" id="chart_va"></bi-echart>
        </el-card>
        <el-card class="product-box-card">
          <div slot="header" class="product-box-car-header">
            <span>份额走势情况</span>
          </div>
          <bi-echart class="product-box-card-main" :option="optionB" id="chart_vb"></bi-echart>
        </el-card>
        <el-card class="product-box-card">
          <div slot="header" class="product-box-car-header">
            <span>价格走势情况</span>
          </div>
          <bi-echart class="product-box-card-main" :option="optionC" id="chart_vc"></bi-echart>
        </el-card>
      </div>
    </div>

    <ul class="data">
      <li class="left-content">
        <dl>
          <dt>乘用车销量</dt>
          <dd>
            <h4>{{ manf_name }}</h4>
            <div class="month">
              <span class="center"><strong :title="number_format(salesData.brandSalesData.month_sales)">{{ salesData.brandSalesData.month_sales | number_format(0) }}</strong>  {{ this_month }}月 销量 </span>
              <span class="small"> <em><i :class="['iconfont', salesData.brandSalesData.sales_tb > 0 ? 'icon-triangleupfill font-green' : 'icon-triangledownfill']"></i> {{ salesData.brandSalesData.sales_tb | multiply(100) | number_format(2) }}%</em> 同比</span>
              <span class="small"> <em><i :class="['iconfont', salesData.brandSalesData.sales_hb > 0 ? 'icon-triangleupfill font-green' : 'icon-triangledownfill']"></i></i> {{ salesData.brandSalesData.sales_hb  | multiply(100) | number_format(2) }}%</em> 环比</span>
            </div>
            <div class="year">
              <span class="big"><strong :title="number_format(salesData.brandSalesData.total)">{{ salesData.brandSalesData.total | number_format(0) }}</strong>{{ thisYear }}年 累计销量 </span>
              <span class="small"> <em><i :class="['iconfont', salesData.brandSalesData.total_tb > 0 ? 'icon-triangleupfill font-green' : 'icon-triangledownfill']"></i> {{ salesData.brandSalesData.total_tb | multiply(100) | number_format(2) }}%</em> 同比</span>
            </div>
            <h4>整体市场</h4>
            <div class="month bd0">
              <span class="center"><strong :title="number_format(salesData.wholeSalesData.month_sales)">{{ salesData.wholeSalesData.month_sales | number_format(0) }}</strong>{{ this_month }}月 销量 </span>
              <span class="small"> <em><i :class="['iconfont', salesData.wholeSalesData.sales_tb > 0 ? 'icon-triangleupfill font-green' : 'icon-triangledownfill']"></i> {{ salesData.wholeSalesData.sales_tb | multiply(100) | number_format(2) }}%</em> 同比</span>
              <span class="small"> <em><i :class="['iconfont', salesData.wholeSalesData.sales_hb > 0 ? 'icon-triangleupfill font-green' : 'icon-triangledownfill']"></i> {{ salesData.wholeSalesData.sales_hb | multiply(100) | number_format(2) }}%</em> 环比</span>
            </div>
            <div class="year bd0">
              <span class="big"><strong :title="number_format(salesData.wholeSalesData.total)">{{ salesData.wholeSalesData.total | number_format(0) }}</strong>{{ thisYear }}年 累计销量</span>
              <span class="small"> <em><i :class="['iconfont', salesData.wholeSalesData.total_tb > 0 ? 'icon-triangleupfill font-green' : 'icon-triangledownfill']"></i> {{ salesData.wholeSalesData.total_tb | number_format(2) }}%</em> 同比</span>
            </div>
          </dd>
        </dl>
      </li>
      <li class="center-content">
        <dl>
          <dt>新能源车销量</dt>
          <dd>
            <h4>{{ manf_name }}</h4>
            <div class="month">
              <span class="center"><strong :title="number_format(salesData.brandNerSalesData.month_sales)">{{ salesData.brandNerSalesData.month_sales | number_format(0) }}</strong>  {{ this_month }}月 销量 </span>
              <span class="small"> <em><i :class="['iconfont', salesData.brandNerSalesData.sales_tb > 0 ? 'icon-triangleupfill font-green' : 'icon-triangledownfill']"></i> {{ salesData.brandNerSalesData.sales_tb | multiply(100) | number_format(2) }}%</em> 同比</span>
              <span class="small"> <em><i :class="['iconfont', salesData.brandNerSalesData.sales_hb > 0 ? 'icon-triangleupfill font-green' : 'icon-triangledownfill']"></i> {{ salesData.brandNerSalesData.sales_hb  | multiply(100) | number_format(2) }}%</em> 环比</span>
            </div>
            <div class="year">
              <span class="big"><strong :title="number_format(salesData.brandNerSalesData.total)">{{ salesData.brandNerSalesData.total | number_format(0) }}</strong>{{ thisYear }}年 累计销量 </span>
              <span class="small"> <em><i :class="['iconfont', salesData.brandNerSalesData.total_tb > 0 ? 'icon-triangleupfill font-green' : 'icon-triangledownfill']"></i> {{ salesData.brandNerSalesData.total_tb | multiply(100) | number_format(2) }}%</em> 同比</span>
            </div>
            <h4>整体市场</h4>
            <div class="month bd0">
              <span class="center"><strong :title="number_format(salesData.wholeNerSalesData.month_sales)">{{ salesData.wholeNerSalesData.month_sales | number_format(0) }}</strong>{{ this_month }}月 销量 </span>
              <span class="small"> <em><i :class="['iconfont', salesData.wholeNerSalesData.sales_tb > 0 ? 'icon-triangleupfill font-green' : 'icon-triangledownfill']"></i> {{ salesData.wholeNerSalesData.sales_tb | multiply(100) | number_format(2) }}%</em> 同比</span>
              <span class="small"> <em><i :class="['iconfont', salesData.wholeNerSalesData.sales_hb > 0 ? 'icon-triangleupfill font-green' : 'icon-triangledownfill']"></i> {{ salesData.wholeNerSalesData.sales_hb | multiply(100) | number_format(2) }}%</em> 环比</span>
            </div>
            <div class="year bd0">
              <span class="big"><strong :title="number_format(salesData.wholeNerSalesData.total)">{{ salesData.wholeNerSalesData.total | number_format(0) }}</strong>{{ thisYear }}年 累计销量</span>
              <span class="small"> <em><i :class="['iconfont', salesData.wholeNerSalesData.total_tb > 0 ? 'icon-triangleupfill font-green' : 'icon-triangledownfill']"></i> {{ salesData.wholeNerSalesData.total_tb | number_format(2) }}%</em> 同比</span>
            </div>
          </dd>
        </dl>
      </li>
      <li class="right-content">
        <h4>新闻推荐 <router-link to="news">更多</router-link></h4>
        <ul>
          <li><a href="/client.html#/news/detail?id=5acac019a6845f1548aa660b" target="_blank" title="开着销冠王 寻找北京五大网红充电站">开着销冠王 寻找北京五大网红充电站</a> <cite>04-09</cite></li>
          <li><a href="/client.html#/news/detail?id=5acac0b0a6845f1548aa671d" target="_blank"title="2018年，农村户口买车有什么补贴政策吗？">2018年，农村户口买车有什么补贴政策吗？</a> <cite>04-08</cite></li>
          <li><a href="/client.html#/news/detail?id=5acac01ca6845f1548aa6613" target="_blank" title="进口车即将涨价 这几款豪华柴油SUV不可错过">进口车即将涨价 这几款豪华柴油SUV不可错过</a> <cite>04-09</cite></li>
          <li><a href="/client.html#/news/detail?id=5acac836a6845f1a604bf5d1" target="_blank" title="宝骏“爆款”效应再现！宝骏530入市20天销量破万">宝骏“爆款”效应再现！宝骏530入市20天销量破万</a> <cite>04-09</cite></li>
          <li><a href="/client.html#/news/detail?id=5acabdf1a6845f239c571597" target="_blank" title="奇瑞3月销量同比增长19.5% 电动车增幅超586%">奇瑞3月销量同比增长19.5% 电动车增幅超586%</a> <cite>04-09</cite></li>
          <li><a href="/client.html#/news/detail?id=5acabde5a6845f239c571580" target="_blank" title="车企布局共享出行 争夺战升级">车企布局共享出行 争夺战升级</a> <cite>04-09</cite></li>
          <li><a href="/client.html#/news/detail?id=5acac88fa6845f096c38d95c" target="_blank" title="多地推进共享停车立法 利益链条待整合">多地推进共享停车立法 利益链条待整合</a> <cite>04-09</cite></li>
          <li><a href="/client.html#/news/detail?id=5acabdeba6845f239c57158c" target="_blank" title="媒体：许家印或已投资贾跃亭造车">媒体：许家印或已投资贾跃亭造车</a> <cite>04-09</cite></li>
        </ul>
      </li>
    </ul>

    <div class="solution">
      <h2>智策</h2>
      <ul>
        <li>
          <img src="/static/images/client/linshi/1200banner001.png" alt="">
          <h3>车型销量目标管理</h3>
          <p title="制定销量目标并监督执行，并及时根据市场的变化调整销量目标，调整销售策略确保销售目标实现">制定销量目标并监督执行，并及时根据市场的变化调整销量目标，调整销售策略确保销售目标实现</p>
          <a href="#" class="on">进入场景</a>
        </li>
        <li>
          <img src="/static/images/client/linshi/1200banner002.png"  alt="">
          <h3>车型定价管理</h3>
          <p title="以达成销量目标为目的，依赖量化模型，制定新车上市价格，以及在售车型的促销额度">以达成销量目标为目的，依赖量化模型，制定新车上市价格，以及在售车型的促销额度</p>
          <a href="#" class="on">进入场景</a>
        </li>
        <li>
          <img src="/static/images/client/linshi/1200banner003.png" alt="">
          <h3>渠道布局决策</h3>
          <p title="全景渠道数据助力网络布局，智能地图辅助精细化网格运营">全景渠道数据助力网络布局，智能地图辅助精细化网格运营</p>
          <a href="#" class="on">进入场景</a>
        </li>
        <li>
          <img src="/static/images/client/linshi/1200banner004.png" alt="">
          <em class="yellow">购买中</em>
          <h3>销量目标优化</h3>
          <p title="360º扫描诊断营销指标，实时预警，沙盘模拟营销指标调整优化，助力营销决策方案制定。">360º扫描诊断营销指标，实时预警，沙盘模拟营销指标调整优化，助力营销决策方案制定。</p>
          <a href="#">了解详情</a>
        </li>
        <li>
          <img src="/static/images/client/linshi/1200banner005.png" alt="">
          <em class="greed">新产品</em>
          <h3>年度车型改款</h3>
          <p title="辅助厂商产品改款、换代、新品投放市场机会发现。">辅助厂商产品改款、换代、新品投放市场机会发现。</p>
          <a href="#">了解详情</a>
        </li>
      </ul>
    </div>

    <div class="analytics">
      <h2>
        <font>智库</font>
        <span :class="{on: selectedAnalytics}"  @click="selectedAnalytics = true">乘用车市场</span>
        <span :class="{on: !selectedAnalytics}" @click="selectedAnalytics = false">新能源市场</span>
      </h2>
      <ul v-if="selectedAnalytics">
        <li v-for="(item, key) in analyticsMenu[0]['sub']" :key="key" :class="{expend: key == expendAnalytics}" @mouseleave="expendAnalyticsMore">
          <div>
            <h4>
              {{item.title}}<br>
              <em>{{item.sum}}</em>
            </h4>
            <ol>
              <li v-for="item2 in item.sub"><router-link :to="item2.url" :title="item2.title"><i class="iconfont" :class="item2.icon"></i>  {{ item2.title }}</router-link></li>
            </ol>
            <template v-if="item.sub.length > 3">
              <span class="more" @click="expendAnalyticsMore(key)">更多</span>
              <span class="hide" @click="expendAnalyticsMore">收起</span>
            </template>
          </div>
        </li>
      </ul>
      <ul v-else>
        <li v-for="(item, key) in analyticsMenu[1]['sub']" :key="key" :class="{expend: key == expendAnalytics}" @mouseleave="expendAnalyticsMore">
          <div>
            <h4>
              {{item.title}}<br>
              <em>{{item.sum}}</em>
            </h4>
            <ol>
              <li v-for="item2 in item.sub"><router-link :to="item2.url" :title="item2.title"><i class="iconfont" :class="item2.icon"></i>  {{ item2.title }}</router-link></li>
            </ol>
            <template v-if="item.sub.length > 3">
              <span class="more" @click="expendAnalyticsMore(key)">更多</span>
              <span class="hide" @click="expendAnalyticsMore">收起</span>
            </template>
          </div>
        </li>
      </ul>
    </div>

    <!-- end -->
  </div>
</template>

<script type="text/ecmascript-6">
  import BiProgress from '@index/components/progress.vue'
  import BiEchart from '@index/components/echart.vue'
  import mixin from '@index/config/mixin.js';
  import echarts from 'echarts'

  export default {
    name: 'IndexPage',
    mixins: [mixin],
    data() {
      return {
        thisMonthData: {},
        selectedAnalytics:true,
        expendAnalytics: -1,
        dialogVisible:false,
        checked:false,
        noticeSelected:true,

        analyticsMenu:[
          {
            title: '乘用车销量',
            sub:[
              {
                title: '市场预测',
                icon: 'icon-quanshiquyuduibifenxi',
                sum: '全国车型和细分市场预测与洞察市场预测与洞察',
                sub:[
                  { title: '全国车型销量预测', icon:'icon-quanshiquyuduibifenxi',  url:'' },
                  { title: '全国细分市场销量预测与洞察', icon:'icon-yuceyinqing', url:'' },
                  { title: '车型区域市场销量预测研究报告', icon:'icon-system-statu', url:'' },
                  { title: '车型价量决策支持系统', icon:'icon-xitongcaozuorizhi', url:'' },
                  { title: '全国车型销量预测系统', icon:'icon-tubiaoyucebiao', url:'' },
                  { title: '全国细分市场销量预测系统与深入洞察分析报告', icon:'icon-qianjingyuce',  url:'' },
                  { title: '市场预测专项研究', icon:'icon-plus-datareport', url:'' },
                  { title: '新车型上市销量预测分析报告', icon:'icon-baogaochaxun', url:'' },
                  { title: '新车型生命周期销量预测研究报告', icon:'icon-baogaochaxun', url:'' },
                ]
              },
              {
                title: '车型规划',
                icon: 'icon-chexian',
                sum: '产品生命周期车型配置与优化分析',
                sub:[
                  { title: '产品生命周期管理', icon:'icon-monitanghua', url:'' },
                  { title: '车型配置库', icon:'icon-file',  url:'' },
                  { title: '配置消费者感知价值研究', icon:'icon-profile_light',  url:'' },
                  { title: '配置优化模拟器', icon:'icon-zhongqi',  url:'' },
                  { title: '配置重要度研究', icon:'icon-baokuanbangdan',  url:'' },
                  { title: '配置装备趋势报告', icon:'icon-zhuangxiang',  url:'' },
                  { title: '新车上市冲击力分析报告', icon:'icon-upstage',  url:'' },
                  { title: '新车上市导报', icon:'icon-text',  url:'' },
                  { title: '新车上市监测系统', icon:'icon-leida',  url:'' },
                  { title: '展会分析报告', icon:'icon-biaoshilei_yuanchengjiance',  url:'' },
                ]
              },
              {
                title: '销量管理',
                icon: 'icon-newshot',
                sum: '了解市场维度，诊断痛点所在',
                sub:[
                  { title: '销量分析', icon:'icon-system-statu', url:'' },
                  { title: '销量分析与诊断', icon:'icon-plus-datareport', url:'' },
                  { title: '销售比例分析', icon:'icon-xitongcaozuorizhi', url:'' },
                  { title: '销售比例分析系统', icon:'icon-yuceyinqing',  url:'' },
                ]
              },
              {
                title: '价格管理',
                icon: 'icon-sponsor',
                sum: '提供线上与线下之价格监测',
                sub:[
                  { title: '价格监测及分析', icon:'icon-shiyongbaogao', url:'' },
                  { title: '网络价格监测及分析', icon:'icon-changjingfenxi', url:'' },
                ]
              },
              {
                title: '渠道管理',
                icon: 'icon-map',
                sum: '渠道建设与分析渠道建设与分析',
                sub:[
                  { title: '渠道建设分析与诊断', icon:'icon-map', url:'' },
                  { title: '渠道建设分析系统', icon:'icon-xitongxingneng', url:'' },
                ]
              },
              {
                title: '售后服务',
                icon: 'icon-repair',
                sum: '售后配件价格监测售后配件价格监测',
                sub:[
                  { title: '配件价格监测（大众品牌）', icon:'icon-accessory', url:'' },
                  { title: '配件价格监测（豪华品牌）', icon:'icon-link1', url:'' },
                  { title: '附件销售策略', icon:'icon-policy', url:'' },
                  { title: '配件专项研究', icon:'icon-circle', url:'' },
                  { title: '售后车主忠诚度/流失率研究', icon:'icon-dijiaqushi', url:'' },
                  { title: '售后服务模式洞察分析报告', icon:'icon-kehudongcha', url:'' },
                ]
              },
              {
                title: '行业动态',
                icon: 'icon-searchlist',
                sum: '全国车型和细分市场预测与洞察',
                sub:[
                  { title: '汽车金融业务分析', icon:'icon-xiangao', url:'' },
                  { title: '行业动态分析', icon:'icon-searchlist', url:'' },
                  { title: '终端景气分析报告', icon:'icon-xitongxingneng', url:'' },
                ]
              },
              {
                title: '消费者洞察',
                icon: 'icon-friendfamous',
                sum: '行业终端动态与汽车金融业务分析行态',
                sub:[
                  { title: '购买需求与购买漏斗研究', icon:'icon-jiaoyiloudou', url:'' },
                  { title: '燃油车新车主研究', icon:'icon-people_list_light', url:'' },
                  { title: '消费者出行研究', icon:'icon-cheliang', url:'' },
                ]
              },
            ]
          },
          {
            title: '新能源市场',
            sub:[
              {
                title: '销量管理',
                icon: 'icon-newshot',
                sum: '新能源销量分析系统 (含双积分计算）',
                sub:[
                  { title: '新能源销量分析 ', icon:'icon-newshot', url: '/zhiku/ner_xl' },
                ]
              },
              {
                title: '价格管理',
                icon: 'icon-sponsor',
                sum: '新能源价格监测及分析系统',
                sub:[
                  { title: '新能源价格监测及分析', icon:'icon-sponsor', url:'' },
                ]
              },
              {
                title: '售后服务',
                icon: 'icon-shouhou',
                sum: '新能源售后服务水平洞察分析报告',
                sub:[
                  { title: '新能源售后服务水平洞察分析报告', icon:'icon-shouhou', url:'' },
                ]
              },
              {
                title: '行业动态',
                icon: 'icon-searchlist',
                sum: '新能源行业动态分析',
                sub:[
                  { title: '新能源行业动态分析', icon:'icon-searchlist', url:'/zhiku/ner_hy' },
                  { title: '新能源行业月报', icon:'icon-calendar', url:'/zhiku/ner_hy' },
                ]
              },
            ]
          }
        ],
        lastYear: '2017',
        thisYear: '2018',
        manfid: '30',
        manf_name: '东风日产',
        this_year_month: '201804',
        salesTrendChartData: {
          xAxisData: [],
          seriesData: [],
        },
        salesShareChartData: {
          xAxisData: [],
          seriesData: [],
        },
        salesPVStatusChartData: {
          xAxisData: [],
          seriesData: [],
          field: 'tp_index',
          name: ' tp换基',
        },
        optionA: {},
        optionB: {},
        optionC: {},
        salesData: {
          brandSalesData: {},
          wholeSalesData: {},
          brandNerSalesData: {},
          wholeNerSalesData: {}
        }
      }
    },
    methods: {
      isOpenDialogVisible(status){
        this.$emit('openTheDialog', status);
      },
      expendAnalyticsMore(num){
        if (num != null || num != '' || num != undefined) this.expendAnalytics = num;
      },
      GET_SALES_TREND() {
        this.$request.get(this.$interface.GET_SALES_TREND, {
          header: {token: this.token},
          lastYear: this.lastYear,
          thisYear: this.thisYear,
          manfid: this.manfid
        }, (response) => {
          let data = response.data[0]
          , lastyear_sales = []
          , thisyear_sales = []
          for (var x in data.lastyear_list) {
            let item = data.lastyear_list[x]
            this.salesTrendChartData.xAxisData.push(item.month + '月')
            lastyear_sales.push(item.month_sales || null)

            let item2 = data.thisyear_list[x] || {}
            thisyear_sales.push(item2.month_sales || null)
          }
          this.salesTrendChartData.seriesData.push({
            data: lastyear_sales,
            name: this.lastYear + '年',
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                color: "#00b4f3",
                barBorderRadius: 0,
                label: {
                  "show": true,
                  "position": "top",
                }
              }
            },
          })
          this.salesTrendChartData.seriesData.push({
            data: thisyear_sales,
            name: this.thisYear + '年',
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                color: "#d2e0e9",
                barBorderRadius: 0,
                label: {
                  "show": true,
                  "position": "top",
                }
              }
          },
          })
          this.optionA = getChartA(this.salesTrendChartData)
        }, this.failure);
      },
      GET_SALES_SHARE() {
        this.$request.get(this.$interface.GET_SALES_SHARE, {
          header: {token: this.token},
          lastYear: this.lastYear,
          thisYear: this.thisYear,
          manfid: this.manfid
        }, (response) => {
          let data = response.data[0]
          , lastyear_share = []
          , thisyear_share = []
          for (var x in data.last_year) {
            let item = data.last_year[x]
            this.salesShareChartData.xAxisData.push(item.month + '月')
            lastyear_share.push(item.share || '')

            let item2 = data.this_year[x] || {}
            thisyear_share.push(item2.share || '')
          }
          this.salesShareChartData.seriesData.push({
            data: lastyear_share,
            name: this.lastYear + '年',
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                color: "#00b4f3",
                barBorderRadius: 0,
                label: {
                  "show": true,
                  "position": "top",
                  formatter: function (obj) {
                    return (obj.data * 100).toFixed(2) + '%';
                  }
                }
              }
            },
          })
          this.salesShareChartData.seriesData.push({
            data: thisyear_share,
            name: this.thisYear + '年',
            type: 'line',
            itemStyle: {
              normal: {
                color: "#d2e0e9",
                barBorderRadius: 0,
                label: {
                  "show": true,
                  "position": "top",
                  formatter: function (obj) {
                    return (obj.data * 100).toFixed(2) + '%';
                  }
                }
              }
            },
          })
          this.optionB = getChartB(this.salesShareChartData)
        }, this.failure);
      },
      GET_PV_STATUS() {
        this.$request.get(this.$interface.GET_PV_STATUS, {
          header: {token: this.token},
          lastYear: this.lastYear,
          thisYear: this.thisYear
        }, (response) => {
          let data = response.data[0]
          , lastyear_data = []
          , thisyear_data = []
          , field = this.salesPVStatusChartData.field
          for (var x in data.last_year) {
            let item = data.last_year[x]
            this.salesPVStatusChartData.xAxisData.push(item.month + '月')
            lastyear_data.push(item[field] || '')

            let item2 = data.this_year[x] || {}
            thisyear_data.push(item2[field] || '')
          }
          this.salesPVStatusChartData.seriesData.push({
            data: lastyear_data,
            name: this.lastYear + '年',
            type: 'line',
            itemStyle: {
              normal: {
                color: "#00b4f3",
                barBorderRadius: 0,
                label: {
                  "show": true,
                  "position": "top",
                  formatter: function (obj) {
                    return (obj.data * 100).toFixed(2) + '%';
                  }
                }
              }
            },
          })
          this.salesPVStatusChartData.seriesData.push({
            data: thisyear_data,
            name: this.thisYear + '年',
            type: 'line',
            itemStyle: {
              normal: {
                color: "#d2e0e9",
                barBorderRadius: 0,
                label: {
                  "show": true,
                  "position": "bottom",
                  formatter: function (obj) {
                    return (obj.data * 100).toFixed(2) + '%';
                  }
                }
              }
            },
          })
          this.optionC = getChartC(this.salesPVStatusChartData)
        }, this.failure);
      },
      GET_SALES() {
        this.$request.get(this.$interface.GET_SALES, {
          header: {token: this.token},
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
    mounted() {
      this.getToken(() => {
        this.GET_SALES_TREND()
        this.GET_SALES_SHARE()
        this.GET_PV_STATUS()
        this.GET_SALES()
      });
    },
    components:{
      BiProgress,
      BiEchart
    }
  }

  var getChartA = function (data) {
    var option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          "type": "shadow",
          textStyle: {
            color: "#fff"
          }
        },
      },
      grid: {
        top: 15,
        bottom:35,
        left:10,
        right:10,
      },
      xAxis: {
        type: 'category',
        data: data.xAxisData,
        axisLine: {
          lineStyle: {
            color: '#90979c'
          }
        },
      },
      yAxis: {
        show: false,
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#90979c'
          }
        },
        axisLabel : {
          formatter: function(value) {
            return parseFloat(value / 10000).toFixed(1) + '万'
          }
        }
      },
      series: data.seriesData
    };

    return option
  }
  var getChartB = function (data) {
    var option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          "type": "shadow",
          textStyle: {
            color: "#fff"
          }
        },
        formatter: function(params) {
          var html = (params[0].name || '') + '<br>'
          for (let x in params) {
            let item = params[x]
            html += item.marker + item.seriesName + ': ' + parseFloat(item.value * 100).toFixed(2) + '%<br>'
          }
          return html
        }
      },
      grid: {
        top: 15,
        bottom:35,
        left:10,
        right:10,
      },
      xAxis: {
        type: 'category',
        data: data.xAxisData,
        axisLine: {
          lineStyle: {
            color: '#90979c'
          }
        },
      },
      yAxis: {
        show: false,
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#90979c'
          }
        },
        axisLabel : {
          formatter: function(value) {
            return parseFloat(value * 100).toFixed(2) + '%'
          }
        }
      },
      series: data.seriesData
    };

    return option
  }
  var getChartC = function (data) {
    var option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          "type": "shadow",
          textStyle: {
            color: "#fff"
          }
        },
        formatter: function(params) {
          var html = (params[0].name || '') + '(' + data.name + ')<br>'
          for (let x in params) {
            let item = params[x]
            html += item.marker + item.seriesName + ': ' + parseFloat(item.value * 100).toFixed(2) + '%<br>'
          }
          return html
        }
      },
      grid: {
//        x: '自适应',
//        y: '自适应',
        top: 15,
        bottom:35,
        left:10,
        right:10,
      },
      xAxis: {
        type: 'category',
        data: data.xAxisData,
        axisLine: {
          lineStyle: {
            color: '#90979c'
          }
        },
      },
      yAxis: {
        show: false,
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#90979c'
          }
        },
//        axisLabel : {
//          formatter: function(value) {
//            return parseFloat(value * 100).toFixed(0) + '%'
//          }
//        }
      },
      series: data.seriesData
    };

    return option
  }
</script>

<style lang="scss" type="text/scss" >
</style>
