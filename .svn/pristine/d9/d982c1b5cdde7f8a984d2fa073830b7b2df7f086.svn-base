<template>
	<div>
    <div class="content-top-floor"></div>
    <div class="content-top" id="content-top">
      <div class="pageinfo">
        <bi-title :columnText="'当前数据：' + (manf_name ? manf_name : '厂商') + '-' + (ds_name ? ds_name : '数据源') + '-' + (year_month ? year_month : new Date().getFullYear() + '/' + (Number(new Date().getMonth()) + 1))">
          <img :src="modelInfo.submodel_logo ? image_path + modelInfo.submodel_logo : '/static/images/nocar.png'" v-bind:alt="modelInfo.manf_name">
          <font>市场环境-{{ modelInfo.sub_model_name }}</font>
        </bi-title>
        <div class="right-box">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/scene' }">销量目标管理场景</el-breadcrumb-item>
            <el-breadcrumb-item >市场环境-{{ modelInfo.sub_model_name }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <bi-tabs type="slide">
        <bi-tabs-item targetId="cont1" selected="true" >厂商销量目标看板</bi-tabs-item>
        <bi-tabs-item targetId="cont2" selected="" >车型列表看板</bi-tabs-item>
      </bi-tabs>
    </div>

    <div class="content-main">
      <div id="cont1">
        <bi-panel button-width="200">
          <template slot="title">
            <font>细分市场趋势</font>
          </template>
          <template slot="operating">
            <span class="scene-btn">
              <template v-if="modelInfo.sub_segment_count > 1">
                <a v-bind:class="{ on: segmentTrendClass == 1 }" href="javascript:void(0)" @click="getSegmentsTrend(1)">{{ modelInfo.segment_name }}</a>
                <a v-bind:class="{ on: segmentTrendClass == 2 }" href="javascript:void(0)" @click="getSegmentsTrend(2)">{{ modelInfo.sub_segment_name }}</a>
              </template>
            </span>
          </template>
          <bi-sub-panel width="70%" style="border-right: 1px solid #eeeeee;">
            <template slot="title">
              <font><em class="font-blue-c">{{ segmentTrendClass == 1 ? modelInfo.segment_name : modelInfo.sub_segment_name }}</em> 短期份额趋势</font>
            </template>
            <div class="main-wraper" v-loading="loading[1]">
              <p class="outline">
                <font>短期份额趋势判断：</font>
                <em :style="{backgroundColor:color_group[segmentTrendData.color]}">{{ segmentTrendData.trend  }}</em>
                <el-tooltip placement="bottom" effect="light">
                  <div slot="content">
                    1、ways根据乘联会发布的目标，按<br>
                    一定算法进行折算；<br>
                    2、若客户能够提供准确目标数据，<br>
                    分析价值将会更高。
                  </div>
                  <i>?</i>
                </el-tooltip>
              </p>
              <div>
                <span class="databox">
                  <bi-cell :data="segmentTrendData" field1="per" field2="per_yoy" :special="true">
                    <em>{{ this_month }}月 实际份额/同比变化</em>
                  </bi-cell>
                </span>
                <span class="databox">
                  <bi-cell :data="segmentTrendData" field1="acc_per" field2="acc_per_yoy" :special="true">
                    <em>1~{{ this_month }}月 累计实际份额/同比变化</em>
                  </bi-cell>
                </span>
                <span class="databox">
                  <bi-cell :data="segmentTrendData" field1="xq" field2="xq_yoy" cls="font-red">
                    <em>{{ warning_month }}月销量预警 预测销量/同比增量</em>
                  </bi-cell>
                </span>
                <span class="databox">
                  <bi-cell :data="segmentTrendData" field1="xq_per" field2="xq_per_yoy" :special="true" cls="font-red">
                    <em>{{ warning_month }}月份额预警预测份额/同比变化</em>
                  </bi-cell>
                </span>
              </div>
              <bi-chart id="main_a" :option="optionA" style="height: 330px;"></bi-chart>
            </div>
          </bi-sub-panel>
          <bi-sub-panel width="30%">
            <template slot="title">
              <font>
                <em class="font-blue-c">{{ segmentTrendClass == 1 ? modelInfo.segment_name : modelInfo.sub_segment_name }}</em> {{ segmentTrendClass == 1 ? '占整体' : '占细分'}}市场份额
              </font>
            </template>
            <div class="trend-right main-wraper" v-show="segmentTrendClass == 1" v-loading="loading[1]">
              <h6>{{this_year}}年1~ {{this_month}}月累计份额</h6>
              <span class="databox">
                <bi-cell :data="segmentTrendData" field1="acc_per" field2="acc_per_yoy" :special="true" cls="font-pink">
                  <font>累计份额/同比变化</font>
                </bi-cell>
              </span>
              <bi-chart id="main_b" :option="optionB" styles="width:300px"></bi-chart>
            </div>
            <div class="trend-right" v-show="segmentTrendClass == 2" v-loading="loading[1]">
              <bi-chart id="main_b2" :option="optionB2" styles="width:300px"></bi-chart>
            </div>
          </bi-sub-panel>
        </bi-panel>
      </div>
      <div id="cont2">
        <bi-panel button-width="200" >
          <template slot="title">
            <font>市场集中度</font>
          </template>
          <template slot="operating">
           <span class="scene-btn">
              <template  v-if="modelInfo.sub_segment_count > 1">
                <a v-bind:class="{ on: marketConcentrationClass == 1 }" href="javascript:void(0)" @click="getMarketConcentration(1)">{{ modelInfo.segment_name }}</a>
                <a v-bind:class="{ on: marketConcentrationClass == 2 }" href="javascript:void(0)" @click="getMarketConcentration(2)">{{ modelInfo.sub_segment_name }}</a>
              </template>
            </span>
          </template>
          <bi-sub-panel width="50%" style="border-right: 1px solid #eee">
            <template slot="title">
              <font>竞争环境</font>
            </template>
            <div class="focus-left main-wraper" v-loading="loading[0]">
              <p class="outline">
                <font>{{ marketConcentrationClass == 1 ? modelInfo.segment_name : modelInfo.sub_segment_name }} 竞争环境：</font>
                <em v-if="marketConcentrationData.new_count > 0" :style="{backgroundColor:color_group[marketConcentrationData.environment_color]}">{{ marketConcentrationData.environment_word }}</em>
                <em v-else :style="{backgroundColor:color_group['red']}">下降</em>
                <el-tooltip placement="bottom" effect="light">
                  <div slot="content">
                    1、ways根据乘联会发布的目标，按<br>
                    一定算法进行折算；<br>
                    2、若客户能够提供准确目标数据，<br>
                    分析价值将会更高。
                  </div>
                  <i>?</i>
                </el-tooltip>
              </p>
              <div>
                <span class="databox">
                  <bi-cell :data="marketConcentrationData" field1="sub_model_count" field2="new_count" cls="font-red">
                    <em>{{ this_month }}月 车型数量/新增车</em>
                  </bi-cell>
                </span>
                <span class="databox">
                  <bi-cell :data="marketConcentrationData" field1="avg_bq" field2="avg_bq_mom" cls="font-red">
                    <em>{{ this_month }}月 单车平均销量/环比</em>
                  </bi-cell>
                </span>
              </div>
              <bi-chart id="main_c" :option="optionC"></bi-chart>
            </div>
          </bi-sub-panel>
          <bi-sub-panel width="50%">
            <template slot="title">
              <font>{{ marketConcentrationData.ranking_word }}市场</font>
            </template>
            <div class="focus-right main-wraper" v-loading="loading[0]">
              <p class="outline">
                <font>{{ modelInfo.sub_model_name }} 所处 {{ marketConcentrationData.ranking_word }}市场 ：</font>
                <em :style="{backgroundColor:color_group[marketConcentrationData.color]}">{{ marketConcentrationData.market_word }}</em>
                <el-tooltip placement="bottom" effect="light">
                  <div slot="content">
                    1、ways根据乘联会发布的目标，按<br>
                    一定算法进行折算；<br>
                    2、若客户能够提供准确目标数据，<br>
                    分析价值将会更高。
                  </div>
                  <i>?</i>
                </el-tooltip>
              </p>
              <div>
                <span class="databox">
                  <bi-cell :data="marketConcentrationData" field1="bq20" field2="bq20_mom" cls="font-red">
                    <em>{{ this_month }}月 {{ marketConcentrationData.ranking_word }} 车型销量/环比增速</em>
                  </bi-cell>
                </span>
                <span class="databox">
                    <bi-cell :data="marketConcentrationData" field1="per20" field2="per20_mom" :special="true" cls="font-red">
                      <em>{{ this_month }}月 {{ marketConcentrationData.ranking_word }} 车型份额/环比变化</em>
                    </bi-cell>
                </span>
                <span class="databox">
                    <bi-cell :data="marketConcentrationData" field1="ranking" field2="ranking_per" cls="font-red">
                      <em>{{ this_month }}月 {{ modelInfo.sub_model_name }} 排名/百分位</em>
                    </bi-cell>
                </span>
              </div>
              <bi-chart id="main_d" :option="optionD"></bi-chart>
            </div>
          </bi-sub-panel>
        </bi-panel>
      </div>
    </div>
	</div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import BiTitle from '@index/components/title.vue'
  import BiPanel from '@index/components/panel.vue'
  import BiSubPanel from '@index/components/subpanel.vue'
  import BiCell from '@index/components/cell.vue'
  import BiChart from '@index/components/echart.vue'
  import echarts from 'echarts'
  import mixin from '@index/config/mixin.js'
  import bus from '@/config/eventBus.js'
  import BiTabs from '@index/components/tabs'
  Vue.use(BiTabs);

	export default {
		name: 'Market',
    mixins: [mixin],
		data() {
			return {
        modelInfo: {},
        segmentTrendData: {},
        marketConcentrationData: {},

        marketConcentrationClass: 1,
        segmentTrendClass: 1,

        optionA: {},
        optionB: {},
        optionB2: {},
        optionC: {},
        optionD: {},
        loading: new Array(2).fill(0),
			}
		},
    computed: {
      last_year: function() {
        return this.this_year - 1;
      },
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
        this.getModelInfo()
        this.getMarketConcentration()
        this.getSegmentsTrend()
      },
      getMarketConcentration(seg = 1) {
        this.loading[0] = true;
        this.marketConcentrationClass = seg;
        this.$request.get(this.$interface.GET_MARKET_CONCENTRATION, {
          token: this.token,
          ds_id: this.ds_id,
          sub_model_id: this.sub_model_id,
          ym_id: this.this_year_month,
          seg: seg,
          size: 12
        }, (response) => {
          this.marketConcentrationData = response.data[0];
          this.optionC = getOptionC(this, this.marketConcentrationData.sub_model_list);
          this.optionD = getOptionD(this, this.marketConcentrationData.sub_model_list);
          this.loading[0] = false;
        }, this.failure);
      },
      getSegmentsTrend(seg = 1) {
        this.loading[1] = true;
        this.segmentTrendClass = seg;
        this.$request.get(this.$interface.GET_SEGMENTS_TREND, {
          token: this.token,
          ds_id: this.ds_id,
          sub_model_id: this.sub_model_id,
          ym_id: this.this_year_month,
          ymw_id: this.warning_year_month_week,
          seg: seg,
          size: 12
        }, (response) => {
          this.segmentTrendData = response.data[0];
          this.optionA = this.getOptionA()
          if (this.segmentTrendClass == 1) {
            this.optionB = this.getOptionB();
          }
          if (this.segmentTrendClass == 2){
            this.optionB2 = this.getOptionB2();
          }
          this.loading[1] = false;
        }, this.failure);
      },
      initBase() {
        var query = this.query = this.$route.query;
        this.ds_id = !!query.ds_id ? query.ds_id : this.ds_id;
        this.sub_model_id = !!query.sub_model_id ? query.sub_model_id : this.sub_model_id;
        this.this_year_month = !!query.ym_id ? query.ym_id : this.this_year_month;
        this.warning_year_month_week = !!query.ymw_id ? query.ymw_id : this.warning_year_month_week;
      },
      getOptionA() {
        return getOptionA(this, this.segmentTrendData.sales_list)
      },
      getOptionB() {
        return getOptionB(this, this.segmentTrendData);
      },
      getOptionB2() {
        return getOptionB2(this, this.segmentTrendData.sub_segment_list);
      },
    },
    components:{
      BiTitle,
      BiPanel,
      BiSubPanel,
      BiCell,
      BiChart
    }
	}

  var getOptionA = function(vm, data = []) {
    var xAxisData = []
      , yAxisBarData1 = []
      , yAxisBarData2 = []
      , yAxisLineData1 = []
      , yAxisLineData2 = []
      , yAxisLineDotData = []
      , last_year = vm.last_year
      , this_year = vm.this_year;
    if (data) {
      for(var x in data) {
        xAxisData.push(data[x]['month'] + '月');
        yAxisBarData1.push(data[x]['tq']===-1?'':((data[x]['tq'])/10000).toFixed(2));
        yAxisBarData2.push(data[x]['bq']===-1?'':((data[x]['bq'])/10000).toFixed(2));
        yAxisLineData1.push(data[x]['tq_per']===-1?'':((data[x]['tq_per'])*100).toFixed(2));
        yAxisLineData2.push(data[x]['per']===-1?'':((data[x]['per'])*100).toFixed(2));
        yAxisLineDotData.push(data[x]['trendY']===-1?'':((data[x]['trendY'])*100).toFixed(2));
      }
    }
    var legendData = [last_year + '销量', this_year + '销量', last_year + '份额', this_year + '份额', '趋势'];
    var legendSelected = {};
    legendSelected[last_year + '销量'] = true;
    legendSelected[this_year + '销量'] = true;
    legendSelected[last_year + '份额'] = true;
    legendSelected[this_year + '份额'] = true;
    legendSelected['趋势'] = true;

    var optionA = {
      tooltip: {
        trigger: 'axis',
        formatter: function (params, ticket, callback) {
          var res = params[0].name;
          for (var i = 0, l = params.length; i < l; i++) {
            if (params[i].seriesType === 'line') {
              res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + '%';
            } else {
              res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value + '万' : '-') + '';
            }
          }
          return res;
        }
      },
      grid: {
        x: '自适应',
        width:'自适应',
        height:'自适应',
        containLabel: true
      },
      legend: {
        y: '20',
        data: legendData,
        selected: legendSelected
      },
      xAxis: [{
        type: 'category',
        splitLine:{
          show: false,
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          show: true,
          rotate: 0,
        },
        axisTick: {
          show: true,
          lineStyle: {
              color: '#999'
          }
        },
        data: xAxisData
      }],
      yAxis: [
      {
        type: 'value',
        name: '份额',
        position: 'right',
        min:0,
        axisLabel: {
          show: false,
          formatter: '{value} %'
        },
        splitLine:{
          show:false
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#999'
          }
        }
      },
      {
        type: 'value',
        name: '销量（万）',
        min:0,
        position: 'left',
        axisLabel: {
          formatter: '{value} '
        },
        splitLine:{
          lineStyle: {
              color: '#f2f2f2',
          }
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
          lineStyle: {
              color: '#999'
          }
        }
      }],
      series: [{
        name: last_year + '份额',
        type: 'line',
        roam: false,
        yAxisIndex: 0,
        symbolSize:'9',
        smooth:true,
        label: {
          normal: {
            show: false,
            position: 'top',
            formatter:function (params) {
              return params.value + '%'
            }
          },
        },
        itemStyle: {
          normal: {
            color: '#5ac841',
            lineStyle: {
              color: '#5ac841'
            }
          }
        },
        lineStyle: {
          normal: {
            color: '#5ac841',
            width: 4,
          }
        },
        data: yAxisLineData1
      },
      {
        name: this_year + '份额',
        type: 'line',
        yAxisIndex: 0,
        symbolSize:'9',
        smooth:true,
        label: {
          normal: {
            show: false,
            position: 'top',
            lineStyle: {
              color: '#82a4a5'
            },
            formatter:function (params) {
              return params.value + '%'
            }
          }
        },
        itemStyle: {
          normal: {
            color: '#02b4f4',
            lineStyle: {
                color: '#02b4f4'
            }
          }
        },
        lineStyle: {
          normal: {
            color: '#02b4f4',
            width: 3,
            shadowColor: 'rgba(0,0,0,0.4)',
            shadowBlur: 10,
            shadowOffsetY: 10
          }
        },
        data: yAxisLineData2
      },
      {
        name: '趋势',
        type: 'line',
        yAxisIndex: 0,
        symbolSize:'1',
        label: {
          normal: {
            show: false,
            position: 'top',
            formatter:function (params) {
              return params.value + '%'
            }
          }
        },
        itemStyle: {
          normal: {
            color: '#fb6b72',
            lineStyle: {
              color: '#fb6b72',
              type: 'dotted'
            }
          }
        },
        lineStyle: {
          normal: {
            color: '#fb6b72',
            width: 3,
            shadowColor: 'rgba(0,0,0,0.4)',
            shadowBlur: 10,
            shadowOffsetY: 10
          }
        },
        data: yAxisLineDotData
      },
      {
        name: last_year + '销量',
        type: 'bar',
        yAxisIndex: 1,
        itemStyle: {
            normal: {
                color: '#5cc841',
            }
        },
        label: {
          normal: {
            show: false,
            position: 'top',
            textStyle : {
              color: '#5cc841'
            }
          }
        },
        data: yAxisBarData1
      },
      {
        name: this_year + '销量',
        type: 'bar',
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            color: '#00b4f3',
          }
        },
        label: {
          normal: {
            show: false,
            position: 'top',
          }
        },
        data: yAxisBarData2
      }]
    };
    return optionA;
  }
  var getOptionB = function(vm, data = []) {
    var per = (data.per * 100).toFixed(1);
    var otherPer = 100 - parseInt(per);
    var optionB = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        show:false
      },
      series: [
        {
          name:'中型轿车占整体市场份额',
          type:'pie',
          hoverAnimation: false,
          legendHoverLink:false,
          radius: ['35%', '44%'],
          color: ['#e7408e', '#19ace0'],
          center:['50%','50%'],
          label: {
            normal: {
                position: 'inner'
            }
          },
          labelLine: {
            normal: {
              show: false
            },
          },
          tooltip: {
            show:false,
          },
          data:[
            {value:per, name:''},
            {value:otherPer, name:''},
          ]
        },
        {
          name:'中型轿车占整体市场份额',
          type:'pie',
          radius: ['42%', '60%'],
          color: ['#ff3e99', '#00b4f3'],
          center:['50%','50%'],
          label: {
            normal: {
              formatter: '{b}\n{d}%'
            },
          },
          data:[
            {value:per, name:'份额'},
            {value:otherPer, name:'其它'},
          ]
        }
      ]
    };
    return optionB;
  }
  var getOptionB2 = function(vm, data = []) {
    var seriesData = [];
    if (data) {
      for(var x in data) {
        seriesData.push({value:(data[x]['bq_acc']), name: data[x]['sub_segment_name']});
      }
    }
    var optionB2 = {
      tooltip : {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
      },
      series : [
        {
          type:'pie',
          radius : '55%',
          center:['50%','50%'],
          data:seriesData
        }
      ]
    };
    return optionB2;
  }
  var getOptionC = function(vm, data = []) {
    var xAxisData = []
      , yAxisBarData = []
      , yAxisLineData = []
      , yAxisLineDotData = []
      , leftMaxValue = 200
      , rightMaxValue = 10000;
    if (data) {
      for(var x in data) {
        xAxisData.push(data[x]['month'] + '月');
        yAxisBarData.push(data[x]['sub_model_count']);
        yAxisLineData.push(data[x]['avg_bq'].toFixed(0));
        yAxisLineDotData.push(data[x]['avg_trend'].toFixed(0));
      }
    }
    var optionC = {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        x:'自适应',
        width:'自适应',
        containLabel: true
      },
      legend: {
          y: 'bottom',
          data: ['车型数量', '单车平均销量', '趋势'],
          selected: {
              '车型数量': true,
              '单车平均销量': true,
              '趋势': true,
          }
      },
      xAxis: [{
          type: 'category',
          splitLine:{
              show: false,

          },
          axisLine: {
              show: false,
              lineStyle: {
                  color: '#999'
              }
          },
          axisLabel: {
              show: true,
              rotate: 0,
          },
          axisTick: {
              show: true,
              lineStyle: {
                  color: '#999'
              }
          },
          data: xAxisData
      }],
      yAxis: [{
          type: 'value',
          name: '',
          min: 0,
          max: rightMaxValue,
          position: 'right',
          axisLabel: {
              formatter: '{value}'
          },
          splitLine:{
              show:false
          },
          axisTick: {
              show: false,
          },
          axisLine: {
              show: false,
              lineStyle: {
                  color: '#999'
              }
          }
      }, {
          type: 'value',
          name: '',
          min: 0,
          max: leftMaxValue,
          position: 'left',
          splitLine:{
              show:true
          },
          axisTick: {
              show: false,
          },
          axisLine: {
              show: false,
              lineStyle: {
                  color: '#999'
              }
          }
      }],
      series: [{
          name: '单车平均销量',
          type: 'line',
          symbolSize:'9',
          smooth:true,
          label: {
              normal: {
                  show: false,
                  position: 'top',
              }
          },
          itemStyle: {
              normal: {
                  color: '#2e5ebe',
              }
          },
          lineStyle: {
              normal: {
                  color: '#2e5ebe',
                  width: 4,
              }
          },
          data: yAxisLineData
      }, {
          name: '趋势',
          type: 'line',
          xAxisIndex: 0,
          symbolSize:'1',
          label: {
              normal: {
                  show: false,
                  position: 'top',
              }
          },
          itemStyle: {
              normal: {
                  color: '#fb6b72',
                  lineStyle: {
                      color: '#fb6b72',
                      type: 'dotted'
                  }
              }
          },
          lineStyle: {
              normal: {
                  color: '#fb6b72',
                  width: 3,
                  shadowColor: 'rgba(0,0,0,0.4)',
                  shadowBlur: 10,
                  shadowOffsetY: 10
              }
          },
          data: yAxisLineDotData
      }, {
          name: '车型数量',
          type: 'bar',
          yAxisIndex: 1,
          itemStyle: {
              normal: {
                  color: '#00b4f3',
              }
          },
          label: {
              normal: {
                  show: true,
                  position: 'top'
              }
          },
          data: yAxisBarData
      }]
    }
    return optionC;
  }
  var getOptionD = function(vm, data = []) {
    var xAxisData = []
        , yAxisBarData = []
        , yAxisLineData = []
        , yAxisLineDotData = [];
    if (data) {
        for(var x in data) {
            xAxisData.push(data[x]['month'] + '月');
            yAxisBarData.push(data[x]['bq20']);
            yAxisLineData.push((data[x]['per20']*100).toFixed(1));
            yAxisLineDotData.push((data[x]['per_trend']*100).toFixed(1));
        }
    }
    var ranking_word = vm.marketConcentrationData.ranking_word;
    var optionD = {
      tooltip: {
        trigger: 'axis',
        formatter: function(params, ticket, callback) {
          var res = params[0].name;
          for (var i = 0, l = params.length; i < l; i++) {
            if (params[i].seriesType === 'line') {
              res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + '%';
            } else {
              res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + '';
            }
          }
          return res;
        }
      },
      grid: {
          x: '自适应',
          width:'自适应',
          containLabel: true
      },
      legend: {
          y: 'bottom',
          data: [ranking_word + '车型销量', ranking_word + '车型份额', '趋势'],
      },
      xAxis: [{
        type: 'category',
        splitLine:{
          show: false,

        },
        axisLine: {
          show: false,
          lineStyle: {
              color: '#999'
          }
        },
        axisLabel: {
          show: true,
          rotate: 0,
        },
        axisTick: {
          show: true,
          lineStyle: {
              color: '#999'
          }
        },
        data: xAxisData
      }],
      yAxis: [{
        type: 'value',
        name: '',
        position: 'right',
        axisLabel: {
          formatter: '{value} %'
        },
        splitLine:{
          show:false
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
          lineStyle: {
              color: '#999'
          }
        }
      }, {
        type: 'value',
        name: '',
        min: 0,
        max: 1000000,
        position: 'left',
        splitLine:{
          show:true
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
          lineStyle: {
              color: '#999'
          }
        }
      }],
      series: [{
        name: ranking_word + '车型份额',
        type: 'line',
        symbolSize:'9',
        smooth:true,
        label: {
          normal: {
            show: false,
            position: 'top',
            formatter:function (params) {
                return params.value + '%'
            }
          }
        },
        itemStyle: {
          normal: {
            color: '#5ac841',
          }
        },
        lineStyle: {
          normal: {
            color: '#5ac841',
            width: 4,
          }
        },
        data: yAxisLineData
      }, {
        name: '趋势',
        type: 'line',
        xAxisIndex: 0,
        symbolSize:'1',
        label: {
          normal: {
            show: false,
            position: 'top',
          }
        },
        itemStyle: {
          normal: {
            color: '#fb6b72',
            lineStyle: {
              color: '#fb6b72',
              type: 'dotted'
            }
          }
        },
        lineStyle: {
          normal: {
            color: '#fb6b72',
            width: 3,
            shadowColor: 'rgba(0,0,0,0.4)',
            shadowBlur: 10,
            shadowOffsetY: 10
          }
        },
        data: yAxisLineDotData
      }, {
          name: ranking_word + '车型销量',
          type: 'bar',
          yAxisIndex: 1,
          itemStyle: {
              normal: {
                  color: '#5ac841',
              }
          },
          label: {
              normal: {
                  show: true,
                  position: 'top'
              }
          },
          data: yAxisBarData
      }]
    }
    return optionD;
  }
</script>

<style lang="scss" type="text/scss" scoped>

@import "~@index/assets/scss/mixin";

//场景按钮
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

.outline{
  @include box-Module(block, 100%, 40px, 0px 0px 20px, 10px 20px, #fcfcfc, 1px solid #f0f0f0);
  @include font-adjust(14px, 20px, #000, left);
  font, i{float: left}
  em{
    @include box-Module(inline-block, 40px, 20px, 0 5px 0 0, 0, #fc6b72);
    @include radius(1234, 2px);
    color: #fff;text-align: center;float: left
  }
  i{
    @include box-Module(inline-block, 16px, 16px, 2px 0 0 3px, 0, #379bcc);
    @include font-adjust(12px, 16px, #fff);
    @include radius(1234, 100%);
    cursor: pointer;
    &:hover{background-color: #f04048}
  }
}

.databox{
  @include box-Module(block, calc(25% - 8px), auto, 0px 10px 0px 0px, 20px 0px 10px, #fff, 1px solid #f6f5fb );
  @include font-adjust(12px, 20px, #69696b);
  float: left;
  &:last-child{margin-right: 0}
  &:hover{
    @include box-shadow(3px, 3px, 4px, #ccc);
    @include transition(all, .35s);
    background-color: #339ace; border-color: #339ace; color: #fff;
    b, em{color: #fff;@include transition(all, .35s);}
  }
  b{font-size: 16px; font-weight: 100;}
  em{color: #aaa}
}

.main-wraper{
  @include clearfix();
  overflow-x: hidden;
  overflow-y: hidden;
}
.trend-right{
  padding-top: 10px;
  .databox{width: 100%}
  & > p {@include font-adjust(12px, 20px, #003344); }
}
.focus-left{
  .databox{width: calc(50% - 10px)}
}
.focus-right{
  .databox{width: calc(33.33% - 7px)}
}
.clearfix{
  clear:both;
}
</style>
