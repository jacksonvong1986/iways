<template>

  <div>
    <div class="content-top-floor" style="height: 51px;"></div>
    <div class="content-top" id="content-top">
      <div class="pageinfo">
        <bi-title columnTitle="周度销量预警" columnIcon="icon-jisuanqixian" columnText="专业的汽车营销决策工具">
        </bi-title>
        <div class="right-box">
          数据源：
          <el-dropdown style="float: right; height: 30px;" @command="changeDataSource">
            <span class="bi-button" style="width: 115px;">{{ ds_name }}<i class="el-icon-arrow-down el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item command="4">上险数</el-dropdown-item>
              <el-dropdown-item command="5">终端零售量</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="nav">
      <a href="#/tools" class="on">销量预警</a>
      <a href="#/tools/submarket">细分市场</a>
      <a href="#/tools/munfsummary">厂商概况</a>
      <a href="#/tools/modelview">车型概览</a>
    </div>
    <div class="content-main">
      <bi-panel>
        <template slot="title">
          <font>整体市场 - </font><cite class="font-red">{{ warning_month_week }}</cite>
        </template>
        <div class="all-market">
          <div class="top">
              <span class="databox">
                <bi-cell :data="warning_trend" field1="sales" cls="font-blue">
                  <em>{{ this_month }}月零售量</em>
                </bi-cell>
              </span>
            <span class="databox">
                <bi-cell :data="warning_trend" field1="mom" cls="font-red" :special="true">
                  <em>{{ warning_month }}月预测环比</em>
                </bi-cell>
              </span>
            <span class="databox">
                <bi-cell :data="warning_trend" field1="warning" cls="font-red">
                  <em>{{ warning_month }}月预判值</em>
                </bi-cell>
              </span>
            <span class="databox">
                <bi-cell :data="warning_trend" field1="yoy" cls="font-red" :special="true">
                  <em>{{ warning_month }}月预测同比</em>
                </bi-cell>
              </span>
          </div>
          <bi-chart id="chart-va" :option="optionA" style="height:450px;"></bi-chart>
        </div>
      </bi-panel>

      <bi-panel>
        <template slot="title">
          <font>细分市场 - </font><cite class="font-red">{{ warning_month_week }}</cite>
        </template>
        <div class="sub-market">
          <table>
            <thead>
              <tr>
                <th width="15%">乘用车</th>
                <th width="15%">{{ this_month }}月零售量</th>
                <th width="20%">{{ this_month }}月市场份额</th>
                <th width="15%">{{ warning_month }}月预测环比</th>
                <th width="15%">{{ warning_month }}月预判值</th>
                <th width="15%">{{ warning_month }}月预测同比</th>
              </tr>
            </thead>
            <tbody v-for="(item, key) in seg_overview" >
              <tr>
                <td>
                  <template v-if="item.children">
                    <i :class="['iconfont', segExpand[key] ? 'icon-move' : 'icon-add2']" @click="triggerStatus('seg', key)"></i>
                    <a target="_blank" :href="'#/tools/marketdetail?segment_id='+item.id">{{ item.name }}</a>
                  </template>
                  <template v-else>
                    <font class="font-red" target="_blank" href="javascript:void(0)" v-if="key == 0">{{ item.name }}</font>
                    <a target="_blank" :href="'/tools/marketdetail?segment_id='+item.id" v-else>{{ item.name }}</a>
                  </template>
                </td>
                <td><bi-cell :data="item" field1="sales" cls="warning-text"></bi-cell></td>
                <td><div class="progress-box"><bi-progress :percentage="item.per" :color="color_group[item.color]" height="20" ></bi-progress></div></td>
                <td><bi-cell :data="item" field2="mom"></bi-cell></td>
                <td><bi-cell :data="item" field1="warning" cls="font-red warning-text"></bi-cell></td>
                <td><bi-cell :data="item" field2="yoy"></bi-cell></td>
              </tr>
              <tr class="sub-content" v-if="item.children && item.children.length" v-for="(sub_item, k) in item.children" v-show="segShow[key]">
                <td>{{ sub_item.name }}</td>
                <td><bi-cell :data="sub_item" field1="sales" cls="warning-text"></bi-cell></td>
                <td><div class="progress-box"><bi-progress :percentage="sub_item.per" :color="color_group[sub_item.color]" height="20" ></bi-progress></div></td>
                <td><bi-cell :data="sub_item" field2="mom"></bi-cell></td>
                <td><bi-cell :data="sub_item" field1="warning" cls="font-red warning-text"></bi-cell></td>
                <td><bi-cell :data="sub_item" field2="yoy"></bi-cell></td>
              </tr>
            </tbody>
          </table>
        </div>
      </bi-panel>

      <bi-panel>
        <template slot="title">
          <font>厂商概况 - </font><cite class="font-red">{{ warning_month_week }}</cite>
        </template>
        <div class="manuf">
          <table>
            <tr>
              <th width="15%">厂商</th>
              <th width="15%">{{ this_month }}月零售量</th>
              <th width="20%">{{ this_month }}月市场份额</th>
              <th width="15%">{{ warning_month }}月预测环比</th>
              <th width="15%">{{ warning_month }}月预判值</th>
              <th>
                预警
                <el-tooltip placement="bottom" effect="light">
                  <div slot="content" class="warning-explain">
                    <h2>预警说明</h2>
                    <table>
                      <tr>
                        <td width="23.33%">
                          <span style="background-color: rgb(145, 187, 61)"></span>
                        </td>
                        <td width="53.33%">
                          <p>半月环比＞=市场均值</p>
                          <p>预测销量＞=过去3个月销量均值</p>
                        </td>
                        <td width="23.33%">
                          <span style="background-color: rgb(145, 187, 61)">A</span>
                        </td>
                      </tr>
                      <tr>
                        <td width="23.33%">
                          <span style="background-color: rgb(240, 173, 78)"></span>
                        </td>
                        <td width="53.33%">
                          <p>半月环比＞=市场均值</p>
                          <p>预测销量＜过去3个月销量均值</p>
                        </td>
                        <td width="23.33%">
                          <span style="background-color: rgb(240, 173, 78)">B</span>
                        </td>
                      </tr>
                      <tr>
                        <td width="23.33%">
                          <span style="background-color: rgb(252, 158, 107)"></span>
                        </td>
                        <td width="53.33%">
                          <p>半月环比＜市场均值</p>
                          <p>预测销量＞=过去3个月销量均值</p>
                        </td>
                        <td width="23.33%">
                          <span style="background-color: rgb(252, 158, 107)">C</span>
                        </td>
                      </tr>
                      <tr>
                        <td width="23.33%">
                          <span style="background-color:rgb(251, 107, 114)"></span>
                        </td>
                        <td width="53.33%">
                          <p>半月环比＜市场均值</p>
                          <p>预测销量＜过去3个月销量均值</p>
                        </td>
                        <td width="23.33%">
                          <span style="background-color: rgb(251, 107, 114)">D</span>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <i class="tootip-helf">?</i>
                </el-tooltip>
              </th>
            </tr>
            <tbody v-for="(item, key) in mf_overview" :key="key">
              <tr>
                <td>
                  <template v-if="item.children">
                    <i :class="['iconfont', mfExpand[key] ? 'icon-move' : 'icon-add2']" @click="triggerStatus('mf', key)"></i>
                    <a target="_blank" :href="'#/tools/munfdetail?manf_id='+item.id">{{ item.name }}</a>
                  </template>
                  <template v-else>
                    <font class="font-red" target="_blank" href="javascript:void(0)" v-if="key == 0">{{ item.name }}</font>
                    <a target="_blank" :href="'/tools/munfdetail?manf_id='+item.id" v-else>{{ item.name }}</a>
                  </template>
                </td>
                <td><bi-cell :data="item" field1="sales" cls="warning-text"></bi-cell></td>
                <td><bi-cell :data="item" field2="mom"></bi-cell></td>
                <td><bi-cell :data="item" field2="yoy"></bi-cell></td>
                <td><bi-cell :data="item" field1="warning" cls="font-red warning-text"></bi-cell></td>
                <td>
                  <span v-if="key == 0">-</span>
                  <span v-else class="circle" :style="{background:color_group[item.color]}"></span>
                </td>
              </tr>
              <tr class="sub-content" v-if="item.children && item.children.length" v-for="(sub_item, k) in item.children" v-show="mfShow[key]==true" :key="k">
                <td>{{ sub_item.name }}</td>
                <td><bi-cell :data="sub_item" field1="sales" cls="warning-text"></bi-cell></td>
                <td><bi-cell :data="sub_item" field2="mom"></bi-cell></td>
                <td><bi-cell :data="sub_item" field2="yoy"></bi-cell></td>
                <td><bi-cell :data="sub_item" field1="warning" cls="font-red warning-text"></bi-cell></td>
                <td><span class="circle" :style="{background:color_group[sub_item.color]}"></span></td>
              </tr>
            </tbody>
          </table>
          <div class="pagination-box">
            <el-pagination
              background
              layout="prev, pager, next"
              prev-text="上一页"
              next-text="下一页"
              @current-change="getMfOverview"
              :page-size="pageSize"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </bi-panel>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">

  import BiTitle from '@index/components/title.vue'
  import BiPanel from '@index/components/panel.vue'
  import BiSubPanel from '@index/components/subpanel.vue'
  import BiCell from '@index/components/cell.vue'
  import BiProgress from '@index/components/progress.vue'
  import BiChart from '@index/components/echart.vue'

  import echarts from 'echarts'
  import mixin from '@index/config/mixin.js'

  export default {
    name: 'warning',
    mixins: [mixin],
    data() {
      return {
        ds_group: {
            retail: '零售量'
        },
        pageSize: 15,
        total: 0,
        mf_overview_page: 1,
        seg_overview_page: 0,

        baseInfo: {},
        seg_overview: [],
        seg_overview_all: [],
        mf_overview: [],
        warning_trend: {},

        optionA: {},

        marketConcentrationData:{},
        segShow: [],
        segExpand: [],
        mfShow: [],
        mfExpand: [],
      }
    },
    mounted() {
      this.getToken(() => {
        this.getDataSource()
      });
    },
    watch: {
      seg_overview_all: function() {
        this.getMoreSegment();
      }
    },
    methods: {
      changeDataSource: function (ds_id) {
        this.ds_id = ds_id
        this.loadData()
      },
      triggerStatus: function(type, key) {
        var objShow = this[type+'Show']
        , objExpand = this[type+'Expand']
        if (objShow && objExpand) {
          objShow.push('')
          objShow.pop()
          objShow[key] = !objShow[key]
          objExpand[key] = !objExpand[key]
        }
      },
      getMoreSegment: function() {
        if (this.seg_overview_page * this.pageSize < this.seg_overview_all.length) {
          this.seg_overview_page += 1;
          var limit = this.seg_overview_page * this.pageSize;
          this.seg_overview = this.seg_overview_all.slice(0, limit);
          if (limit >= this.seg_overview_all.length) {
              // $('.alertMore').hide();
          }
          for (var x in this.seg_overview) {
            this.segShow[x] = false
            this.segExpand[x] = false
          }
        }
      },
      getDataSource() {
        this.$request.get(this.$interface.GET_DATA_SOURCE, {
          token: this.token
        }, (response) => {
          this.dataSource = response.data[0];
          this.loadData();
        }, this.failure);
      },
      getSegOverview() {
        this.$request.get(this.$interface.GET_SEG_OVERVIEW, {
          token: this.token,
          ds_id: this.ds_id,
          ym: this.this_year_month,
          ymw: this.warning_year_month_week
        }, (response) => {
          this.seg_overview_all = response.data || []
        }, this.failure)
      },
      getMfOverview(page = 1) {
        this.$request.get(this.$interface.GET_MF_OVERVIEW, {
          token: this.token,
          ds_id: this.ds_id,
          ym: this.this_year_month,
          ymw: this.warning_year_month_week,
          page: page,
          rows: this.pageSize
        }, (response) => {
          this.mf_overview = response.data[0]['rows'] || []
          this.total = response.data[0]['records'] || 0
        }, this.failure)
      },
      getWarningTrend() {
        this.$request.get(this.$interface.GET_WARNING_TREND, {
          token: this.token,
          ds_id: this.ds_id,
          ym: this.this_year_month,
          ymw: this.warning_year_month_week,
          rows: Number(this.warning_month) + 12
        }, (response) => {
          this.warning_trend = response.data[0] || {}
          this.optionA = this.getOptionA()
        }, this.failure)
      },
      loadData() {
        this.initParam()
        this.getSegOverview()
        this.getMfOverview()
        this.getWarningTrend()
      },
      initParam() {
        var ds = this.data_source_map();
        if (!ds || ds.size == 0) {
          return false;
        }

        if (this.ds_id && this.this_year_month == ""){
          this.this_year_month = this.end_year_month + "";
        }
        if (this.this_year_month > this.end_year_month && this.this_year_month < this.begin_year_month){
          this.this_year_month = this.end_year_month + "";
        }
        this.warning_year_month_week = this.warning_end_year_month_week + "";
      },
      getOptionA() {
        return getOptionA(this.warning_trend)
      },
    },
    components:{
      BiTitle,
      BiPanel,
      BiSubPanel,
      BiCell,
      BiProgress,
      BiChart
    }
  }

  function getOptionA(data) {

      var legendData = []
      , xAxisData = []
      , groupItems = [
          {key:'sales', text:'销量', type:'bar', color:'#d1e0e7',labelColor:'#92a8b5', index:1, position:'top', shadowColor:'', cb: function(n) {return (n/1000).toFixed(1)}},
          {key:'mom', text:'销量环比', type:'line', color:'#01b3f1',labelColor:'#01b3f1',position:'top', shadowColor:'rgba(0, 180, 243, 0.46)', index:0, cb: function(n) {return (n*100).toFixed(1)}},
          {key:'yoy', text:'销量同比', type:'line', color:'#5ac843',labelColor:'#5ac843',position:'bottom', shadowColor:'rgba(145, 187, 61, 0.7)', index:0, cb: function(n) {return (n*100).toFixed(1)}}
      ];

      var seriesData = []
      , seriesData2 = [];
      var groups = data.sales_list[0];

      for (var x in groupItems) {
          var key = groupItems[x]['key']
          , name = groupItems[x]['text']
          , type = groupItems[x]['type']
          , color = groupItems[x]['color']
          , index = groupItems[x]['index']
          , cb = groupItems[x]['cb']
          , position = groupItems[x]['position']
          ,labelColor = groupItems[x]['labelColor']
          ,shadowColor = groupItems[x]['shadowColor'];

          if (!groups.hasOwnProperty(key)) continue;
          var item = groups[key];
          legendData.push(name);


          var itemData = []
          , itemData2 = [];
          for (var j in item) {
              var row = item[j];
              if (j < item.length - 1) {
                  itemData.push(cb(row));
                  if (j == item.length - 2 && type == 'line') {
                      itemData2.push(cb(row));
                  } else {
                      itemData2.push('');
                  }
              } else {
                  itemData2.push(cb(row));
              }
          }

          seriesData.push({
              name: name,
              type: type,
              yAxisIndex: index,
              symbolSize: 14,
              smooth:true,
              barWidth:30,
              label: {
                  normal: {
                      show: true,
                      position: position,
                      textStyle:{
                          color:labelColor,
                      },
                      formatter:function (params) {
                         if (params['componentSubType'] == 'line') {
                             return params['value'] + '%'
                         }
                      }
                  }
              },
              itemStyle: {
                  normal: {
                      color: color,
                      lineStyle: {
                          color: color,
                          width:4,
                          shadowColor: shadowColor,
                          shadowBlur: 15,
                          shadowOffsetX: 3,
                          shadowOffsetY: 3
                      }
                  }
              },
              data: itemData
          });
          seriesData2.push({
              name: '预警',
              type: type,
              yAxisIndex: index,
              symbolSize: 14,
              smooth:true,
              barWidth:30,
              barGap: type == 'line' ? '' : '-100%',
              label: {
                  normal: {
                      show: true,
                      position: 'top',
                      formatter:function (params) {
                         if (params['componentSubType'] == 'line') {
                             return params['value'] + '%'
                         }
                      }
                  }
              },
              itemStyle: {
                  normal: {
                      color: '#fb6b72',
                      lineStyle: {
                          color: '#fb6b72',
                          type: 'dotted',
                          width:4,
                          shadowColor: shadowColor,
                          shadowBlur: 15,
                          shadowOffsetX: 3,
                          shadowOffsetY: 3
                      }
                  }
              },
              data: itemData2
          });
      }
      legendData.push('预警');
      seriesData2.map(function(data){
          seriesData.push(data);
      });

      for (var i in data.month_list) {
          var item = data.month_list[i];
          if (item['month'] == 1) {
              xAxisData.push(item['month'] + '月\n' + item['year'] + '年');
          } else {
              xAxisData.push(item['month'] + '月');
          }
      }

      var chartVa ={
          backgroundColor: '#fff',
          tooltip:{
              trigger: 'axis',
              // formatter: ' {b} <br> {a0}: {c0}千辆 <br> {a1}: {c1}% <br> {a2}: {c2}%',
              formatter: function (params) {
                  var data = params[0]
                  , data1 = params[1]
                  , data2 = params[2];
                  if (data.seriesName == '预警') {
                      return data.name + ' | ' + data.seriesName
                           + '<br>' + '销量: ' + (isNaN(data.value) ? '0' : data.value) + '千辆'
                           + '<br>' + '销量环比: ' + (isNaN(data1.value) ? '0' : data1.value) + '%'
                           + '<br>' + '销量同比: ' + (isNaN(data2.value) ? '0' : data2.value) + '%'
                  } else {
                      return data.name
                           + '<br>' + data.seriesName + ': ' + (isNaN(data.value) ? '' : data.value) + '千辆'
                           + '<br>' + data1.seriesName + ': ' + (isNaN(data1.value) ? '' : data1.value) + '%'
                           + '<br>' + data2.seriesName + ': ' + (isNaN(data2.value) ? '' : data2.value) + '%';
                   }
              }
          },
          legend: {
              y:'0',
              data: legendData
          },
          grid:{
              x:'自适应',
              y:30,
              y2:50,
              width:'自适应',
              height:'自适应',
              containLabel: true
          },
          xAxis: {
              axisLine: {
                  show: false,
                  lineStyle: {
                      color: '#999'
                  }
              },
              splitLine:{
                  show: false,

              },
              axisLabel: {
                  show: true,
                  rotate: 0,
              },
              axisTick: {
                  show: false,

              },
              data: xAxisData
          },
          yAxis: [{
              type: 'value',
              name: '份额',
              min:'-60',
              position: 'right',
              axisLabel: {
                  show: true,
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
              name: '   销量（千辆）',
              min: 0,
              max: 7000,
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
          dataZoom: [{
              type: 'inside',
              start: 50,
              end: 100,
              zoomLock:true
          }, {
              show: true,
              type: 'slider',
              y: '90%',
              start: 50,
              end: 100
          }],
          series: seriesData
      }
      return chartVa;
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "~@index/assets/scss/common";

  .nav{
    @include clearfix();
    margin: 0 10px 10px;background-color: #34495e;
    a{
      @include font-adjust(16px, 50px, #fff);
      display:block; float:left; width: 15%; height: 50px; cursor: pointer; margin-right: 1px;
      &:hover{background-color: #52b2e2}
      &.on{background-color: #00b4f3}
    }
  }

  .all-market{
    margin-bottom: 10px; padding: 20px;
    .top{
      @include clearfix();
      margin-bottom: 20px;
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
  }

  .sub-market, .manuf{
    padding: 10px 20px;
  }

  table{
    text-align: center;font-size: 12px; margin-bottom: 20px;
    tr{
      border-bottom:1px solid #f5f4fa;color: #535b66;
      //&:nth-child(2){color: #f04048};
      &:nth-child(n+2):hover{background-color: #fcfcfc}
      &.sub-content{
        background-color: #fcfcfe;
        td:nth-child(1){padding-left: 50px;}
      }

    }
    th{
      height: 34px; color: #989898;font-weight: 100;
      &:nth-child(1){ text-align: left; padding-left: 15px;}
    }
    td{
      height: 52px; font-size: 14px;
      &:nth-child(1){
        text-align: left; padding-left: 15px;
        i{
          @include box-Module(inline-block, 16px, 16px, 0 5px 0 0, 0, #0080c1);
          @include font-adjust(12px, 16px, #fff);
          @include radius(1234, 50%);
          cursor: pointer; vertical-align: sub;
          &:hover{background-color: #f04048}
        }
      }
    }
    a{
      color: #0080c1;
      &:hover{color: #f04048;text-decoration: underline;}
    }
    .progress-box{width: 50%; margin: 0 auto}
    .circle{
      @include box-Module(block, 18px, 18px, 0 auto, 0, #75c204);
      @include radius(1234, 50%);
    }
  }

  .warning-explain{
    h2 {
      @include font-adjust(15px, 40px, #555, left, 700);
      border-bottom: 1px solid #eee; padding-left: 15px;
    }
    table {width: 100%;margin: 10px 0}
    tr {height: 60px;border-bottom: 1px solid #eee;}
    span {
      @include box-Module(block, 24px, 24px, 0 auto, #eee);
      @include radius(1234, 50%);
      @include font-adjust(12px, 24px, #fff);
    }
    p {color: #666;}
  }

</style>
