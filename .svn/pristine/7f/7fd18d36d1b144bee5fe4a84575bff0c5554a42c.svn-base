<template>
	<div>
    <div class="content-top-floor" style="height: 50px;"></div>
    <div class="content-top" id="content-top">
      <div class="pageinfo">
        <bi-title :columnText="'当前数据：' + (manf_name ? manf_name : '厂商') + '-' + (ds_name ? ds_name : '数据源') + '-' + (year_month ? year_month : new Date().getFullYear() + '/' + (Number(new Date().getMonth()) + 1))">
          <img :src="modelInfo.submodel_logo ? image_path + modelInfo.submodel_logo : '/static/images/nocar.png'" v-bind:alt="modelInfo.manf_name">
          <font>车型看板-{{ modelInfo.sub_model_name }}</font>
        </bi-title>
        <div class="right-box">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/scene' }">销量目标管理场景</el-breadcrumb-item>
            <el-breadcrumb-item >车型看板-{{ modelInfo.sub_model_name }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
    </div>

    <div class="content-main">
      <draggable class="list-group" element="div" v-model="panels" :options="panelOptions" :move="onMove" @start="onStart" @end="onEnd">
        <transition-group type="transition" :name="'panel-list'" tag="div">
          <bi-panel v-for="element in panels" :key="element.index" v-show="element.show" @closePanel="closePanel(element.index)" :panel_key="element.index" :cls="{'list-group-item':editable}" button-width="210">
            <template v-if="element.index == 1">
              <template slot="title">
                <font>{{ element.name }}-</font><em class="font-blue">{{ this_month }}月</em>
              </template>
              <template slot="operating">
                <span class="scene-btn">
                  <a :class="{ on: modelSalesClass == 1 }" href="javascript:void(0)" @click="getModelSales(1)">{{ modelInfo.segment_name }}</a>
                  <a :class="{ on: modelSalesClass == 2 }" href="javascript:void(0)" @click="getModelSales(2)">{{ modelInfo.sub_segment_name }}</a>
                </span>
              </template>
              <draggable class="sales-status" element="ul" :options="itemOptions[0]" v-loading="loading[0]">
                <li class="left">
                  <abbr class="hot-spots" title="拖动此区域可更改布局">
                    <template v-if="modelSalesClass == 1">
                      <span>{{ modelInfo.segment_name }}</span>
                    </template>
                    <template v-else>
                      <span>{{ modelInfo.sub_segment_name }}</span>
                    </template>
                    <i class="iconfont icon-tuodong over-move"></i>
                  </abbr>
                  <draggable element="div" :options="cellOptions[0]">
                    <bi-cell :data="thisMonthData" field1="whole_bq" field2="whole_yoy" type="default">
                      {{ this_month }}月 乘用车销量（同比增速）
                    </bi-cell>
                    <bi-cell :data="thisMonthData" field1="whole_acc_bq" field2="whole_acc_yoy" type="default">
                      1~{{ this_month }}月 乘用车销量（同比增速）
                    </bi-cell>
                  </draggable>
                </li>
                <li class="center">
                  <abbr class="hot-spots" title="拖动此区域可更改布局" style="height: auto; bottom: 0">
                    <i class="iconfont icon-tuodong over-move"></i>
                  </abbr>
                  <img :src="modelInfo.submodel_logo ? image_path + modelInfo.submodel_logo : '/static/images/nocar.png'" :alt="modelInfo.manf_name" >
                  <p>{{ modelInfo.sub_model_name }}</p>
                </li>
                <li class="right">
                  <abbr class="hot-spots" title="拖动此区域可更改布局"><i class="iconfont icon-tuodong over-move"></i></abbr>
                  <draggable element="div" :options="cellOptions[1]" class="lattice4">
                    <bi-cell :data="thisMonthData" field1="ob_bq" field2="ob_yoy">
                      <em class="font-blue">{{ this_month }}月</em> 销量目标（同比增速）
                    </bi-cell>
                    <bi-cell :data="thisMonthData" field1="bq" field2="yoy">
                      <em class="font-blue">{{ this_month }}月</em> 销量实际（同比增速）
                    </bi-cell>
                    <bi-cell :data="thisMonthData" field1="pass_ratio" type="circle" >
                      <em class="font-blue">{{ this_month }}月</em> 实际完成率
                    </bi-cell>
                    <bi-cell :data="thisMonthData" field1="per" field2="per_yoy" :special="true">
                      <em class="font-blue">{{ this_month }}月</em> 份额实际（同比变化）
                    </bi-cell>
                    <bi-cell :data="thisMonthData" field1="ob_year" field2="ob_year_yoy">
                      <em class="font-blue">{{ this_year }}年</em> 销量目标（环比增速）
                    </bi-cell>
                    <bi-cell :data="thisMonthData" field1="acc_bq" field2="acc_yoy">
                      <em class="font-blue">1~{{ this_month }}月</em> 销量实际（同比增速）
                    </bi-cell>
                    <bi-cell :data="thisMonthData" field1="pass_time" field2="pass_task" type="bar" :color="color_group[thisMonthData.accColor]">
                      <em class="font-blue">1~{{ this_month }}月</em> 实际完成率
                    </bi-cell>
                    <bi-cell :data="thisMonthData" field1="acc_per" field2="acc_per_yoy" :special="true">
                      <em class="font-blue">1~{{ this_month }}月</em> 份额实际（同比变化）
                    </bi-cell>
                  </draggable>
                </li>
              </draggable>
            </template>
            <template v-if="element.index == 2">
              <template slot="title">
                <font>{{ element.name }}-</font><em class="font-blue">{{ warning_month }}月</em>
                <router-link to="/tools/model" class="more-info">查看更多</router-link>
              </template>
              <template slot="others">
                <span class="notice">
                  <i class="iconfont icon-custom-wechat" @click="dialogVisible = true"></i>
                  <i class="iconfont icon-mobile" @click="dialogVisible = true"></i>
                </span>
                <el-dialog
                  title="智能推送"
                  :visible.sync="dialogVisible"
                  width="1000px"
                  :modal-append-to-body = "true"
                  :append-to-body = "true">
                  <div class="notice-content">
                    <h4>智能预警  <font>(当前预警超过临界值，系统已智能推送以下人员)</font></h4>
                    <ul>
                      <li>
                        <i>x</i>
                        <img src="/static/images/linshi/user1.png" alt="">
                        <p>
                          <label>李莉</label>
                          <span>销售部经理</span>
                        </p>
                      </li>
                      <li>
                        <i>x</i>
                        <img src="/static/images/linshi/user3.png" alt="">
                        <p>
                          <label>李勇</label>
                          <span>品牌广告科</span>
                        </p>
                      </li>
                    </ul>
                    <h4>自定义预警 <font>(您还可以发送预警情况到相关人员)</font></h4>
                    <ul>
                      <li>
                        <input type="checkbox">
                        <img src="/static/images/linshi/user5.png" alt="">
                        <p>
                          <label>李永娟</label>
                          <span>计划销售科</span>
                        </p>
                      </li>
                      <li>
                        <input type="checkbox">
                        <img src="/static/images/linshi/user6.png" alt="">
                        <p>
                          <label>钟强</label>
                          <span>网络开发科</span>
                        </p>
                      </li>
                      <li>
                        <input type="checkbox">
                        <img src="/static/images/linshi/user7.png" alt="">
                        <p>
                          <label>韩磊</label>
                          <span>市场营销部经理</span>
                        </p>
                      </li>
                      <li>
                        <input type="checkbox">
                        <img src="/static/images/linshi/user4.png" alt="">
                        <p>
                          <label>林达</label>
                          <span>信息与产品规划科</span>
                        </p>
                      </li>
                    </ul>
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                  </span>
                </el-dialog>
              </template>
              <template slot="operating">
                <span class="scene-btn" v-if="modelInfo.sub_segment_count > 1">
                  <a :class="{ on: modelSalesWarningClass == 1 }" href="javascript:void(0)" @click="getModelSalesWarning(1)">{{ modelInfo.segment_name }}</a>
                  <a :class="{ on: modelSalesWarningClass == 2 }" href="javascript:void(0)" @click="getModelSalesWarning(2)">{{ modelInfo.sub_segment_name }}</a>
                </span>
             </template>
              <draggable class="sales-status warning" element="ul" :options="itemOptions[1]" v-loading="loading[1]">
                <li class='left'>
                  <abbr class="hot-spots" title="拖动此区域可更改布局">
                    <template v-if="modelSalesWarningClass == 1">
                        <span>{{ modelInfo.segment_name }}</span>
                    </template>
                    <template v-else>
                        <span>{{ modelInfo.sub_segment_name }}</span>
                    </template>
                    <i class="iconfont icon-tuodong over-move"></i>
                  </abbr>
                  <draggable element="div" :options="cellOptions[2]">
                    <bi-cell :data="warningMonthData" field1="whole_bq" field2="whole_yoy" type="default">
                      {{ warning_month }}月 乘用车销量预警（同比增速）
                    </bi-cell>
                    <bi-cell :data="warningMonthData" field1="whole_acc_bq" field2="whole_acc_yoy" type="default">
                      1~{{ warning_month }}月 乘用车销量预警（同比增速）
                    </bi-cell>
                  </draggable>
                </li>
                <li class='center'>
                  <abbr class="hot-spots" title="拖动此区域可更改布局" style="height: auto; bottom: 0">
                    <i class="iconfont icon-tuodong over-move"></i>
                  </abbr>
                  <img :src="modelInfo.submodel_logo ? image_path + modelInfo.submodel_logo : '/static/images/nocar.png'" :alt="modelInfo.manf_name" >
                  <p>{{ modelInfo.sub_model_name }}</p>
                </li>
                <li class='right'>
                  <abbr class="hot-spots" title="拖动此区域可更改布局"><i class="iconfont icon-tuodong over-move"></i></abbr>
                  <draggable element="div" :options="cellOptions[3]" class="lattice3">
                    <bi-cell :data="warningMonthData" field1="ob_bq" field2="ob_yoy">
                      <em class="font-red">{{ warning_month }}月</em> 销量目标（同比增速）
                    </bi-cell>
                    <bi-cell :data="warningMonthData" field1="bq" field2="yoy">
                      <em class="font-red">{{ warning_month }}月</em> 销量预警（同比增速）
                    </bi-cell>
                    <bi-cell :data="warningMonthData" field1="pass_ratio" type="circle">
                      <em class="font-red">{{ warning_month }}月</em> 预警完成率
                    </bi-cell>
                    <bi-cell :data="warningMonthData" field1="ob_year" field2="ob_year_mom">
                      <em class="font-red">{{ warning_year }}年</em> 销量目标（环比增速）
                    </bi-cell>
                    <bi-cell :data="warningMonthData" field1="acc_bq" field2="acc_yoy">
                      <em class="font-red">1~{{ warning_month }}月</em> 销量预警（同比增速）
                    </bi-cell>
                    <bi-cell :data="warningMonthData" field1="pass_time" field2="pass_task" type="bar" :color="color_group[warningMonthData.accColor]">
                      <em class="font-red">1~{{ warning_month }}月</em> 预警完成率
                    </bi-cell>
                  </draggable>
                </li>
              </draggable>
            </template>
            <template v-if="element.index == 3">
              <template slot="title">
                <font>{{ element.name }} - </font><em>{{ modelInfo.sub_model_name}}</em>
              </template>
              <template slot="operating">
              </template>
              <div class="regional-market">
                <h5 class="scene-title optional">
                  <a href="javascript:void(0);" class="on" style="color: #333333;font-weight: 100;">11月实际销量</a>
                  <span class="scene-btn">
                    <a v-bind:class="{ on: regionsSalesClass == 0 }" href="javascript:void(0)" @click="getModelRegionSales(0)">本月</a>
                    <a v-bind:class="{ on: regionsSalesClass == 1 }" href="javascript:void(0)" @click="getModelRegionSales(1)">累计</a>
                  </span>
                </h5>
                <table class="scene-table noboder" v-loading="loading[2]">
                  <tr>
                    <th width="11%">区域划分</th>
                    <th width="30%">
                      <font v-if="regionsSalesClass == 0"> {{ this_month }}月销量目标（同比增速）</font>
                      <font v-else> {{ this_year }}年销量目标（同比增速）</font>
                    </th>
                    <th width="25%">
                      <font v-if="regionsSalesClass == 0">   {{ this_month }}月实际销量（同比增速）</font>
                      <font v-else> 1~{{ this_month }}月实际销量（同比增速）</font>
                    </th>
                    <th width="30%">
                      <font v-if="regionsSalesClass == 0">{{ this_month }}月 实际完成率</font>
                      <font v-else>1~{{ this_month }}月 实际完成率</font>
                    </th>
                  </tr>
                  <tr v-for="(item, key) in regionsSalesData">
                    <td><font class="fw700">{{ item.region_name }}</font></td>
                    <td>
                      <bi-cell :data="item" field1="ob_bq" field2="ob_yoy"></bi-cell>
                    </td>
                    <td>
                      <bi-cell :data="item" field1="bq" field2="yoy"></bi-cell>
                    </td>
                    <td>
                      <div style="height: 15px; width: 60%; margin: 0px auto;">
                        <template v-if="regionsSalesClass == 0">
                          <bi-progress :percentage="item.pass_ratio" :color="color_group[item.ratioColor]" height="11" title-width="60">任务进度</bi-progress>
                        </template>
                        <template v-else>
                          <bi-progress v-if="key == 0" :percentage="item.pass_time" color="#00b4f3" height="11"  style="margin-bottom: 5px;" title-width="60">时间进度</bi-progress>
                          <bi-progress :percentage="item.pass_task" :color="color_group[item.taskColor]" height="11"  title-width="60">任务进度</bi-progress>
                        </template>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </template>
            <template v-if="element.index == 4">
              <template slot="title">
                <font>车型指标综合评估  </font>
              </template>
              <div class="model-norm" >
                <div class="round">
                  <router-link :to="{path:'/scene/market', query: query}" target="_blank" title="车型综合" class="round_aa"><font>车型综合</font></router-link>
                  <router-link :to="{path:'/scene/market', query: query}" target="_blank" title="竞争环境" class="round_ba"><font>竞争环境</font></router-link>
                  <router-link :to="{path:'/scene/market', query: query}" target="_blank" title="市场环境" class="round_baca"><font>市场环境</font></router-link>
                  <router-link :to="{path:'/scene/compete', query: query}" target="_blank" title="竞争圈" class="round_bacb"><font>竞争圈</font></router-link>
                  <router-link :to="{path:'/scene/funnel', query: query}" target="_blank" title="销售漏斗" class="round_bacc"><font>销售漏斗</font></router-link>
                  <router-link :to="{path:'/scene/market', query: query}" target="_blank" title="细分市场趋势" class="round_bacada"><font>细分市场趋势</font></router-link>
                  <router-link :to="{path:'/scene/market', query: query}" target="_blank" title="市场集中度" class="round_bacadb"><font>市场集中度</font></router-link>
                  <router-link :to="{path:'/scene/compete', query: query}" target="_blank" title="竞争关系" class="round_bacbda"><font>竞争关系</font></router-link>
                  <router-link :to="{path:'/scene/compete', query: query}" target="_blank" title="竞争格局" class="round_bacbdb"><font>竞争格局</font></router-link>
                  <router-link :to="{path:'/scene/funnel', query: query}" target="_blank" title="线上漏斗" class="round_baccda"><font>线上漏斗</font></router-link>
                  <router-link :to="{path:'/scene/funnel', query: query}" target="_blank" title="线下漏斗" class="round_baccdb"><font>线下漏斗</font></router-link>
                  <router-link :to="{path:'/scene/priceanalysis', query: query}" target="_blank" title="营销指标" class="round_bb"><font>营销指标</font></router-link>
                  <router-link :to="{path:'/scene/priceanalysis', query: query}" target="_blank" title="价格" class="round_bbca"><font>价格</font></router-link>
                  <router-link :to="{path:'/scene/productanalysis', query: query}" target="_blank" title="产品" class="round_bbcb"><font>产品</font></router-link>
                  <router-link :to="{path:'/scene/channelsanalysis', query: query}" target="_blank" title="渠道" class="round_bbcc"><font>渠道</font></router-link>
                  <router-link :to="{path:'/scene/salesanalysis', query: query}" target="_blank" title="推广" class="round_bbcd"><font>推广</font></router-link>
                  <router-link :to="{path:'/scene/priceanalysis', query: query}" target="_blank" title="成交价" class="round_bbcada"><font>成交价</font></router-link>
                  <router-link :to="{path:'/scene/priceanalysis', query: query}" target="_blank" title="终端支持" class="round_bbcadb"><font>终端支持</font></router-link>
                  <router-link :to="{path:'/scene/priceanalysis', query: query}" target="_blank" title="单车利润" class="round_bbcadc"><font>单车利润</font></router-link>
                  <router-link :to="{path:'/scene/productanalysis', query: query}" target="_blank" title="配置分析" class="round_bbcbda"><font>配置分析</font></router-link>
                  <router-link :to="{path:'/scene/productanalysis', query: query}" target="_blank" title="满意度" class="round_bbcbdb"><font>满意度</font></router-link>
                  <router-link :to="{path:'/scene/productanalysis', query: query}" target="_blank" title="上市新车" class="round_bbcbdc"><font>上市新车</font></router-link>
                  <router-link :to="{path:'/scene/productanalysis', query: query}" target="_blank" title="新车预测" class="round_bbcbdd"><font>新车预测</font></router-link>
                  <router-link :to="{path:'/scene/channelsanalysis', query: query}" target="_blank" title="网点数" class="round_bbccda"><font>网点数</font></router-link>
                  <router-link :to="{path:'/scene/channelsanalysis', query: query}" target="_blank" title="网站效率" class="round_bbccdb"><font>网点效率</font></router-link>
                  <router-link :to="{path:'/scene/channelsanalysis', query: query}" target="_blank" title="库存" class="round_bbccdc"><font>库存</font></router-link>
                  <router-link :to="{path:'/scene/salesanalysis', query: query}" target="_blank" title="广宣" class="round_bbcdda"><font>广宣</font></router-link>
                  <router-link :to="{path:'/scene/salesanalysis', query: query}" target="_blank" title="活动" class="round_bbcddb"><font>活动</font></router-link>
                  <div class="line_ba"></div>
                  <div class="line_baca"></div>
                  <div class="line_bacada"></div>
                  <div class="line_bacadb"></div>
                  <div class="line_bacb"></div>
                  <div class="line_bacbda"></div>
                  <div class="line_bacbdb"></div>
                  <div class="line_bacc"></div>
                  <div class="line_baccda"></div>
                  <div class="line_baccdb"></div>
                  <div class="line_bb"></div>
                  <div class="line_bbca"></div>
                  <div class="line_bbcada"></div>
                  <div class="line_bbcadb"></div>
                  <div class="line_bbcadc"></div>
                  <div class="line_bbcb"></div>
                  <div class="line_bbcbda"></div>
                  <div class="line_bbcbdb"></div>
                  <div class="line_bbcbdc"></div>
                  <div class="line_bbcbdd"></div>
                  <div class="line_bbcc"></div>
                  <div class="line_bbccda"></div>
                  <div class="line_bbccdb"></div>
                  <div class="line_bbccdc"></div>
                  <div class="line_bbcd"></div>
                  <div class="line_bbcdda"></div>
                  <div class="line_bbcddb"></div>
                </div>
              </div>
            </template>
          </bi-panel>
        </transition-group>
      </draggable>
    </div>
	</div>
</template>

<script type="text/ecmascript-6">

  import BiTitle from '@index/components/title.vue'
  import BiPanel from '@index/components/panel.vue'
  import BiCell from '@index/components/cell.vue'
  import BiProgress from '@index/components/progress.vue'
  import mixin from '@index/config/mixin.js'
  import bus from '@/config/eventBus.js'
  import Draggable from 'vuedraggable'
  const names = [ '全国销量现状', '全国滚动预警', '区域市场表现', '车型指标综合评估']

	export default {
    name: 'ModelPage',
    mixins: [mixin],
		data() {
			return {
        panels: names.map( (name,index) => {return {name, index: index+1, fixed: false, show: true}; }),
        dialogVisible: false,

        manfs: [],
        modelInfo: {},
        thisMonthData: {},
        warningMonthData: {},
        regionsSalesData: [],

        modelSalesClass: 1,
        modelSalesWarningClass: 1,
        regionsSalesClass: 0,

        query: {},
        loading: new Array(3).fill(0),
			}
		},
    mounted() {
      this.getToken(() => {
          this.getManfs();
          this.initBase();
          this.getDataSource();
      });
      this.onOver()

      var that = this
      bus.$on('updateConfig', function(config) {
        that.editable = config[7]
      })
    },
    watch: {
        modelInfo: function() {
          this.manf_id = this.modelInfo.manf_id || this.manf_id;
          this.modelInfo.sub_segment_name = this.modelInfo.sub_segment_name.replace(
            this.modelInfo.segment_name,
            this.modelInfo.segment_full_name
          );
          this.modelInfo.segment_name = this.modelInfo.segment_full_name;
        }
    },
    methods: {
      getManfs() {
        this.$request.get(this.$interface.GET_MANFS, {
          token: this.token
        }, (response) => {
          this.manfs = response.data;
        }, this.failure);
      },
      getDataSource() {
        this.$request.get(this.$interface.GET_DATA_SOURCE, {
          token: this.token,
          manf_id: this.manf_id
        }, (response) => {
          this.dataSource = response.data[0];
          this.loadData();
        }, this.failure);
      },
      getModelInfo() {
        this.$request.get(this.$interface.GET_MODEL_INFO, {
          token: this.token,
          submodel_id: this.sub_model_id,
        }, (response) => {
          this.modelInfo = response.data[0];
        }, this.failure);
      },
      loadData() {
        this.initParam()
        this.getModelInfo()
        this.getModelSales()
        this.getModelSalesWarning()
        this.getModelRegionSales()
      },
      getModelSales(seg = 1) {
        this.loading[0] = true;
        this.modelSalesClass = seg;
        this.$request.get(this.$interface.GET_MODEL_SALES, {
          token: this.token,
          ds_id: this.ds_id,
          sub_model_id: this.sub_model_id,
          ym_id: this.this_year_month,
          seg: seg, // 细分市场级别,1为一级细分市场,2为二级
        }, (response) => {
          this.thisMonthData = response.data[0];
          this.loading[0] = false;
        }, this.failure);
      },
      getModelSalesWarning(seg = 1) {
        this.loading[1] = true;
        this.modelSalesWarningClass = seg;
        this.$request.get(this.$interface.GET_MODEL_SALES_WARNING, {
          token: this.token,
          ds_id: this.ds_id,
          sub_model_id: this.sub_model_id,
          ym_id: this.this_year_month,
          ymw_id: this.warning_year_month_week,
          seg: seg
        }, (response) => {
          this.warningMonthData = response.data[0];
          this.loading[1] = false;
        }, this.failure);
      },
      getModelRegionSales(acc = 0) {
        this.loading[2] = true;
        this.regionsSalesClass = acc;
        this.$request.get(this.$interface.GET_MODEL_REGIONS_SALES, {
          token: this.token,
          ds_id: this.ds_id,
          sub_model_id: this.sub_model_id,
          ym_id: this.this_year_month,
          acc: acc
        }, (response) => {
          this.regionsSalesData = response.data;
          this.loading[2] = false;
        }, this.failure);
      },
      initBase() {
        var query = this.query = this.$route.query;
        this.ds_id = !!query.ds_id ? query.ds_id : this.ds_id;
        this.sub_model_id = !!query.sub_model_id ? query.sub_model_id : this.sub_model_id;
        this.this_year_month = !!query.ym_id ? query.ym_id : this.this_year_month;
        this.warning_year_month_week = !!query.ymw_id ? query.ymw_id : this.warning_year_month_week;
      },
      initParam() {
        var ds = this.data_source_map();
      },
    },
    components:{
      BiTitle,
      BiPanel,
      BiCell,
      BiProgress,
      Draggable
    }
	}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~@index/assets/scss/mixin";
@import "~@index/assets/scss/media";


// 智能推送消息  */
.notice{
  float: right;
  i{
    font-size: 23px; color: #ccc; line-height: 26px; cursor: pointer;font-weight: 100;
    &:hover{color: #333}
  }
}
.notice-content{
  width: 100%; overflow: hidden; cursor: text;
  h4{
    @include font-adjust(14px, 28px, #f04848, left, 600);
    display: block;
    background-color: #efefef;
    text-indent: 1em;
    margin: 0 0 10px 0;
    font{
      color: #339ace;
    }
  }
  ul{
    width: 2000px;overflow: auto;margin: 0;
  }
  li{
    @include box-Module(block, 120px, 162px, 0 5px 10px, 5px, #fff, 1px solid #eee);position: relative;
    @include transition();
    float: left;
    &:hover{
      @include box-shadow(0px, 0px, 15px, rgba(0,0,0,.15) );
    }
  }
  img{
    width: 100%; display: block;  vertical-align: middle; margin-bottom: 5px;
  }
  i{
    @include box-Module(block, 15px, 15px, 0px, 0px, rgba(0, 0, 0, 0.4));
    @include font-adjust(14px, 14px, #fff);
    position: absolute;right: 6px;top: 5px;cursor: pointer;
    &:hover{background-color: rgba(20, 18, 18, 0.74);}
  }
  input{
    @include box-Module(block, 15px, 15px, 0px, 0px, rgba(0, 0, 0, 0.4));
    @include font-adjust(14px, 14px, #fff);
    position: absolute;right: 6px;top: 5px;cursor: pointer;
  }
  p{
    display: block; width: 100%;line-height: 18px;
  }
  label{
    color: #666;font-size: 13px;
  }
  span{
    font-size: 12px;color: #999;display: block;
  }
}
//智能推送消息 end


// 热点 */
.hot-spots{
  @include box-Module(block, 100%, 40px, 0px, 0px );
  position: absolute;z-index: 1; top: 0;left: 0; border: none;
  &:hover{background: transparent;}
}
.list-group-item .hot-spots {
  cursor: move;
}
.over-move{
  position: absolute; top: 5px; left: 5px;font-size: 18px;display: none;
}
//!end 热点 */

// 场景按钮、表格 */
.scene-btn{
  display: inline-block;width: auto;
  a{
    @include box-Module(block, auto, 22px, 0px, 0px 13px, #555c66);
    @include font-adjust(12px, 22px, #fff);
    float: left;
    &:hover{background-color: #414346}
    &.on{background-color: #329acd}
    &.on:hover{background-color: #47b1e5}
  }
}
.scene-title{
  @include font-adjust(14px, 20px, #003344, left, bold);
  padding: 10px 10px 10px 20px;border-bottom: 1px solid #eee;height: 41px;
  em{@include text-hide();display:inline-block;width: 46%;}
  span{
    float: right;
  }
  &.optional{
    padding: 0 10px 0 25px;line-height: 40px;
    & > a{
      display: inline-block;min-width: 100px;padding: 0 10px;color: #003344;text-align: center;
      &.on{color:#5a9ecd;border-bottom: 2px solid #329acd}
      &:hover{color:#5a9ecd;}
    }
    span{margin:10px 0}
  }
}
.scene-table{
  width: 100%;margin-bottom: 5px;
  &.noboder{border: none}
  tr{
    @include transition(all, .3s);
    &:nth-child(1){background-color: #fdfdff}
    &:nth-child(n + 2):hover{background-color: #f7faff}
    &.has-border{border-bottom: 1px solid #eeeeee}
    &.has-border:last-child{border-bottom: none}
  }
  th{
    @include text-hide();
    @include font-adjust(12px, 32px, #999, center, 100);border-bottom: 1px solid #eee;
  }
  td{
    @include font-adjust(12px, 40px, #666, center, 100);
    @include text-hide();
  }
  img{ max-height: 32px;max-width: 50px;vertical-align: middle;}
}
.scene-bottom{
  @include font-adjust(12px, 20px, #666);
  margin: 0 auto;border-top: 1px solid #eeeeee; padding: 15px 0;
  a{
    @include box-Module(inline-block, 50px, 22px, 0px 5px 0px 0px , 0, #fff, 1px solid #eee);
    @include font-adjust(12px, 20px, #339ace);
    &:hover{border-color: #329acd}
    &.on{background-color: #339ace; color: #ffffff;border-color: #329acd}
  }
}
//!end 场景按钮、表格 */

//销量现状、预警
.sales-status{
  @include clearfix();
  height: 280px; width: auto;
  li {
    @include transition(all, 0.5s, cubic-bezier(0.4, 0, 0.2, 1), 0s);
    float: left; height: 100%;overflow: hidden;
    &.over-on{
      @include box-shadow(0, 0, 10px, rgba(186,204,207,.7));z-index: 1;
      &:hover .over-move{display: block}
    }
  }
  .left{
    position: relative;
    &.over-on{ @include box-shadow(0, 0, 10px, #888);}
    @include box-Module(block, 20%, 100%, 0, 0, #339ace);
    @include font-adjust(14px, 20px, #fff);
    span{
      @include font-adjust(12px, 30px, #dbe4ed);
      @include radius(34, 3px);
      @include box-Module(block, 110px, auto, 0px 0px 0px -55px, 0px, #3285b1);
      border: 1px solid #0b76ae; border-top: none;position: absolute; top:0; left: 50%;
    }
    div .bi-cell{
      &:nth-child(2){border-bottom: none}
    }
  }
  .center{
    width: 16%;padding-top: 80px;text-align: center;position: relative; border-left: 1px solid #eee;border-right: 1px solid #eee;
    img{max-height: 100px;vertical-align: middle; margin-bottom: 20px;}
    p{@include font-adjust(14px, 20px, #0081c2)}
  }
  .right {
    width: 64%; position: relative;border: 1px solid transparent;
    & > div{
      @include clearfix(); border-left-color:#eee;overflow: hidden;
    }
  }
  &.warning {
    .left{
      background: #fc6d73;
      span{color: #f8dedf;background: #e16065;border-color: #e46169}
    }
  }

  .lattice4{
    .bi-cell:nth-child(4n){border-right: none}
    .bi-cell:nth-child(n + 5){border-bottom: none}
  }
  .lattice3{
    .bi-cell:nth-child(3n){border-right: none}
    .bi-cell:nth-child(n + 4){border-bottom: none}
  }
}
.more-info{
  font-size: 13px; color:#339ace;margin: 0 0 0 15px;
  &:hover{color: #f04048; text-decoration: underline}
}

//区域市场
.regional-market{
  table tr{
    border-bottom: 1px solid #eee;
    &:last-child{border-bottom: none}
    &:nth-child(2){
      font{
        color: #f14949;
        &.fw700{font-weight: 700}
      }
      em,cite{
        color: #f14949;
      }
    }
    th{
      line-height: 40px;
    }
    td{
      line-height: 50px;
    }
    font{color: #545c67; font-size: 14px;}
    .bi-cell b{color: #0082c0;font-size: 16px;}
  }
}

@mixin model-line($width, $top, $distance, $level:left, $angle:0){
  width: $width;
  top:$top;
  @if($level == left){
    left:$distance;
  }
  @else{
    right:$distance;
  }
  @if ( $angle != 0 ){
    transform:rotate(#{$angle}deg);
    -o-transform:rotate(#{$angle}deg);
    -moz-transform:rotate(#{$angle}deg);
    -webkit-transform:rotate(#{$angle}deg);
  }
}
@mixin model-round($top, $position, $distance, $bgColor, $bgUrl, $level:center){
  top:$top;
  #{$position}:$distance;
  background:$bgColor url('/static/images/#{$bgUrl}.png') no-repeat center $level;
}
.model-norm{
  width:95%;height:600px;margin:0 auto 20px;position: relative;z-index: 99; overflow: auto; overflow-y: hidden;
  .round{
    height:600px; width:1100px; position:relative;margin: 0 auto;
    a{
      display:block; float:left;border-radius:100%; position:absolute; z-index:3; text-align:center; text-decoration:none;
      &:hover{@include opacity(0.85)}
      &.round_aa{@include model-round(50%, left, 50%, #fb6b72, icona01, 30px); width:120px; height:120px;margin:-60px 0 0 -60px;}
      &.round_aa font{display:block;color:#fff; margin-top:70px;}
      &.round_ba,
      &.round_bb{width:100px; height:100px;margin:-50px 0 0 0;background:#fc9e6b;}
      &.round_ba font,
      &.round_bb font{display:block;color:#fff; margin-top:60px;}
      &.round_ba{@include model-round(50%, left, 30%, #fc9e6b, iconb01, 20px); }
      &.round_bb{@include model-round(50%, right, 30%, #fc9e6b, iconb02, 20px); }
      &.round_baca,
      &.round_bacb,
      &.round_bacc{width:80px; height:80px; background:#91bb3d;}
      &.round_baca font,
      &.round_bacb font,
      &.round_bacc font{display:block;color:#fff; margin-top:45px;}
      &.round_baca{@include model-round(20%, left, 20%, #91bb3d, iconc01, 20px); }
      &.round_bacb{@include model-round(50%, left, 15%, #fb6b72, iconc02, 10px);margin-top:-40px;}
      &.round_bacc{@include model-round(70%, left, 20%, #91bb3d, iconc03, 20px);}
      &.round_bbca,
      &.round_bbcb,
      &.round_bbcc,
      &.round_bbcd{ width:80px; height:80px; background:#fc9e6b;}
      &.round_bbca font,
      &.round_bbcb font,
      &.round_bbcc font,
      &.round_bbcd font{display:block;color:#fff; margin-top:45px;}
      &.round_bbca{@include model-round(10%, right, 20%, #fc9e6b, iconc04, 10px);}
      &.round_bbcb{@include model-round(35%, right, 15%, #fb6b72, iconc05, 10px);}
      &.round_bbcc{@include model-round(60%, right, 18%, #91bb3d, iconc06, 10px);}
      &.round_bbcd{@include model-round(75%, right, 30%, #fb6b72, iconc07, 10px);}
      &.round_bacada,
      &.round_bacadb,
      &.round_bacbda,
      &.round_bacbdb,
      &.round_baccda,
      &.round_baccdb{width:32px; height:32px; background:#91bb3d;}
      &.round_bacada font,
      &.round_bacadb font,
      &.round_bacbda font,
      &.round_bacbdb font,
      &.round_baccda font,
      &.round_baccdb font{position:absolute; width:100px; height:32px; line-height:32px; text-align:right;right:37px;color:#666;}
      &.round_bacada{@include model-round(10%, left, 15%, #91bb3d, icond01, center);}
      &.round_bacadb{@include model-round(20%, left, 10%, #91bb3d, icond02, center);}
      &.round_bacbda{@include model-round(40%, left, 8%,  #fb6b72, icond03, center);}
      &.round_bacbdb{@include model-round(55%, left, 8%,  #fb6b72, icond04, center);}
      &.round_baccda{@include model-round(70%, left, 10%, #91bb3d, icond05, center);}
      &.round_baccdb{@include model-round(85%, left, 12%, #91bb3d, icond06, center);}
      &.round_bbcada,
      &.round_bbcadb,
      &.round_bbcadc,
      &.round_bbcbda,
      &.round_bbcbdb,
      &.round_bbcbdc,
      &.round_bbcbdd,
      &.round_bbccda,
      &.round_bbccdb,
      &.round_bbccdc,
      &.round_bbcdda,
      &.round_bbcddb{width:32px; height:32px; background:#91bb3d;}
      &.round_bbcada font,
      &.round_bbcadb font,
      &.round_bbcadc font,
      &.round_bbcbda font,
      &.round_bbcbdb font,
      &.round_bbcbdc font,
      &.round_bbcbdd font,
      &.round_bbccda font,
      &.round_bbccdb font,
      &.round_bbccdc font,
      &.round_bbcdda font,
      &.round_bbcddb font{position:absolute; width:100px; height:32px; line-height:32px; text-align:left;left:37px;color:#666;}
      &.round_bbcada{@include model-round(5%,  right, 10%, #91bb3d, icond07);}
      &.round_bbcadb{@include model-round(15%, right, 7%,  #91bb3d, icond08);}
      &.round_bbcadc{@include model-round(22%, right, 10%, #91bb3d, icond09);}
      &.round_bbcbda{@include model-round(30%, right, 8%,  #91bb3d, icond10);}
      &.round_bbcbdb{@include model-round(38%, right, 6%,  #91bb3d, icond11);}
      &.round_bbcbdc{@include model-round(48%, right, 6%,  #91bb3d, icond12);}
      &.round_bbcbdd{@include model-round(55%, right, 10%, #91bb3d, icond13);}
      &.round_bbccda{@include model-round(62%, right, 7%,  #91bb3d, icond14);}
      &.round_bbccdb{@include model-round(73%, right, 7%,  #91bb3d, icond15);}
      &.round_bbccdc{@include model-round(78%, right, 12%, #91bb3d, icond16);}
      &.round_bbcdda{@include model-round(85%, right, 18%, #91bb3d, icond17);}
      &.round_bbcddb{@include model-round(90%, right, 25%, #91bb3d, icond18);}
    }
    div{
      height:0px;border-bottom: 1px solid #ddd; position:absolute; z-index:2;
      &.line_ba{@include model-line(80px, 50%, 38%, left);border-bottom: 4px solid #ddd;}
      &.line_bb{@include model-line(80px, 50%, 38%,right);border-bottom: 4px solid #ddd;}
      &.line_baca{@include model-line(120px, 38%, 24%, left, 45);border-bottom: 2px solid #ddd;}
      &.line_bacb{@include model-line(120px, 50%, 20%, left);border-bottom: 2px solid #ddd;}
      &.line_bacc{@include model-line(120px, 64%, 24%, left, -45);border-bottom: 2px solid #ddd;}
      &.line_bacada{@include model-line(100px, 18%, 15%, left, 45);}
      &.line_bacadb{@include model-line(100px, 24%, 12%, left, 10);}
      &.line_bacbda{@include model-line(100px, 45%, 8%, left, 30);}
      &.line_bacbdb{@include model-line(100px, 55%, 8%, left, -30);}
      &.line_baccda{@include model-line(100px, 75%, 12%, left, 15);}
      &.line_baccdb{@include model-line(100px, 83%, 13%, left, -30);}
      &.line_bbca{@include model-line(150px, 32%, 22%, right, -60);}
      &.line_bbcb{@include model-line(120px, 45%, 20%, right, -20);}
      &.line_bbcc{@include model-line(120px, 60%, 22%, right, 40);}
      &.line_bbcd{@include model-line(120px, 67%, 28%, right, 85);}
      &.line_bbcada{@include model-line(100px, 10%, 12%, right, -20);}
      &.line_bbcadb{@include model-line(130px, 16%, 9%, right, 5);}
      &.line_bbcadc{@include model-line(100px, 22%, 12%, right, 20);}
      &.line_bbcbda{@include model-line(100px, 36%, 10%, right, -20);}
      &.line_bbcbdb{@include model-line(100px, 40%, 8%, right);}
      &.line_bbcbdc{@include model-line(100px, 47%, 8%, right, 20);}
      &.line_bbcbdd{@include model-line(100px, 51%, 10%, right, 45);}
      &.line_bbccda{@include model-line(120px, 64%, 9%, right);}
      &.line_bbccdb{@include model-line(120px, 71%, 9%, right, 20);}
      &.line_bbccdc{@include model-line(100px, 76%, 12%, right, 40);}
      &.line_bbcdda{@include model-line(120px, 85%, 20%, right, 10);}
      &.line_bbcddb{@include model-line(100px, 88%, 25%, right, 40);}
    }
  }
}

.panel-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}


</style>
