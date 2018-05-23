<template>

	<div>
    <div class="content-top-floor" style="height: 51px;"></div>
    <div class="content-top" id="content-top">
      <div class="pageinfo">
        <bi-title columnTitle="周度销量预警" columnIcon="icon-jisuanqixian" columnText="专业的汽车营销决策工具">
        </bi-title>
        <div class="right-box">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/tools' }">周度销量预警</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/tools/modelview' }">车型</el-breadcrumb-item>
            <el-breadcrumb-item >{{ warning_trend.name }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
    </div>

    <div class="content-main">
      <div class="summary">
        <h2>
          <img src="" alt="">
          {{ parent_info.name }} | {{ warning_trend.name }} - <font class="font-red">{{ warning_month_week }}</font>
          <font class="right-text">数据源：{{ ds_name }}</font>
        </h2>
        <div class="cont">
          <span class="databox">
            <bi-cell :data="warning_trend" field1="sales" cls="font-blue">
              <em>{{ this_month }}月 零售量</em>
            </bi-cell>
          </span>
          <span class="databox">
            <bi-cell :data="warning_trend" field1="mom" cls="font-red" :special="true">
              <em>{{ warning_month }}月 预测环比</em>
            </bi-cell>
          </span>
          <span class="databox">
            <bi-cell :data="warning_trend" field1="warning" cls="font-blue">
              <em>{{ warning_month }}月 预判值</em>
            </bi-cell>
          </span>
          <span class="databox">
            <bi-cell :data="warning_trend" field1="yoy" cls="font-red" :special="true">
              <em>{{ warning_month }}月 预测同比</em>
            </bi-cell>
          </span>
        </div>
      </div>

      <bi-panel title-type="border">
        <template slot="title">
          <font>销量</font>
        </template>
        <div class="sales">
          <div class="button-box">
            <el-popover placement="bottom" trigger="click" title="请选择" v-model="selectOnClass['sales']">
              <span class="bi-button" slot="reference"><em>+</em> 对比车型</span>
              <div class="popover-cont">
                <el-checkbox-group class="checkbox-ground" v-model="checked_models['sales']" @change="checkModels('sales')">
                  <el-checkbox class="check-box" v-for="(item,key) in warning_trend.sales_list" v-if="item.id != 0" :label="item.id" :key="item.id">{{ item.name }}</el-checkbox>
                </el-checkbox-group>
                <p>
                  <span @click="checkModelsSubmit('sales')">确定</span>
                  <span @click="selectOnClass['sales']=false">取消</span>
                </p>
              </div>
            </el-popover>
          </div>
          <bi-chart id="chart_sales" :option="option['sales']" style="height:350px;"></bi-chart>
        </div>
      </bi-panel>

      <el-row :gutter="10">
        <el-col :span="12">
          <bi-panel title-type="border">
            <template slot="title">
              <font>同比</font>
            </template>
            <div class="sales">
              <div class="button-box">
                <el-popover placement="bottom" trigger="click" title="请选择" v-model="selectOnClass['yoy']">
                  <span class="bi-button" slot="reference"><em>+</em> 对比车型</span>
                  <div class="popover-cont">
                    <el-checkbox-group class="checkbox-ground" v-model="checked_models['yoy']" @change="checkModels('yoy')">
                      <el-checkbox class="check-box" v-for="(item,key) in warning_trend.sales_list" v-if="item.id != 0" :label="item.id" :key="item.id">{{ item.name }}</el-checkbox>
                    </el-checkbox-group>
                    <p>
                      <span @click="checkModelsSubmit('yoy')">确定</span>
                      <span @click="selectOnClass['yoy']=false">取消</span>
                    </p>
                  </div>
                </el-popover>
              </div>
              <bi-chart id="chart_yoy" :option="option['yoy']" style="height:350px;"></bi-chart>
            </div>
          </bi-panel>
        </el-col>
        <el-col :span="12">
          <bi-panel title-type="border">
            <template slot="title">
              <font>环比</font>
            </template>
            <div class="sales">
              <div class="button-box">
                <el-popover placement="bottom" trigger="click" title="请选择" v-model="selectOnClass['mom']">
                  <span class="bi-button" slot="reference"><em>+</em> 对比车型</span>
                  <div class="popover-cont">
                    <el-checkbox-group class="checkbox-ground" v-model="checked_models['mom']" @change="checkModels('mom')">
                      <el-checkbox class="check-box" v-for="(item,key) in warning_trend.sales_list" v-if="item.id != 0" :label="item.id" :key="item.id">{{ item.name }}</el-checkbox>
                    </el-checkbox-group>
                    <p>
                      <span @click="checkModelsSubmit('mom')">确定</span>
                      <span @click="selectOnClass['mom']=false">取消</span>
                    </p>
                  </div>
                </el-popover>
              </div>
              <bi-chart id="chart_mom" :option="option['mom']" style="height:350px;"></bi-chart>
            </div>
          </bi-panel>
        </el-col>
      </el-row>

      <bi-panel>
        <template slot="title">
          <font>区域概况 </font>
        </template>
        <div class="area">
          <table>
            <tr>
              <th width="15%">区域</th>
              <th width="15%">{{ this_month }}月零售量</th>
              <th width="20%">{{ warning_month }}月预测环比</th>
              <th width="15%">{{ warning_month }}月预判值</th>
              <th width="15%">{{ warning_month }}月预测同比</th>
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
            <tr v-for="(item,key) in region_overview">
              <td>{{ item.name }}</td>
              <td><bi-cell :data="item" field1="sales" cls="warning-text"></bi-cell></td>
              <td><bi-cell :data="item" field2="mom" :special="true"></bi-cell></td>
              <td><bi-cell :data="item" field1="warning" cls="font-red"></bi-cell></td>
              <td><bi-cell :data="item" field2="yoy" :special="true"></bi-cell></td>
              <td>
                <span v-if="key!=0" class="circle" :style="{background:color_group[item.color]}"></span>
                <font v-else>-</font>
              </td>
            </tr>
          </table>
          <div class="pagination-box">
            <el-pagination
            background
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            @current-change="getRegionOverview"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="records">
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
  import BiCell from '@index/components/cell.vue'
  import BiChart from '@index/components/echart.vue'

  import mixin from '@index/config/mixin.js'

	export default {
		name: 'modelDetail',
    mixins: [mixin],
		data() {
			return {
        sub_model_id: this.$route.query.sub_model_id,
        pageSize: 15,
        currentPage: 1,
        records: 0,

        warning_trend: {},
        region_overview: [],
        parent_info: {extend:'',name:''},

        checked_models: {
          'sales': [this.$route.query.sub_model_id],
          'yoy': [this.$route.query.sub_model_id],
          'mom': [this.$route.query.sub_model_id],
        },
        selectOnClass: {
          sales: false,
          yoy: false,
          mom: false
        },
        option: {
          sales: {},
          yoy: {},
          mom: {},
        },
        maxSeries: 3,
			}
		},
    mounted() {
      if (!this.sub_model_id){
        this.$router.push({path:'/tools/modelview'})
        return
      }
      this.getToken(() => {
        this.getDataSource()
      });
    },
    methods: {
      checkModels: function(type, manf_id) {
        if (this.checked_models[type].length > this.maxSeries) {
          this.checked_models[type].splice(0, 1);
        }
      },
      checkModelsSubmit: function(type) {
        this.option[type] = getOption(this, this.warning_trend, type)
        this['selectOnClass'][type] = false;
      },
      getDataSource() {
        this.$request.get(this.$interface.GET_DATA_SOURCE, {
          token: this.token
        }, (response) => {
          this.dataSource = response.data[0];
          this.loadData();
        }, this.failure);
      },
      getWarningTrend() {
        this.$request.get(this.$interface.GET_WARNING_TREND, {
          token: this.token,
          ds_id: this.ds_id,
          ym: this.this_year_month,
          ymw: this.warning_year_month_week,
          sub_model_id: this.sub_model_id,
          rows: Number(this.warning_month) + 12
        }, (response) => {
          var that = this
          var warning_trend = response.data;
          this.warning_trend = warning_trend ? warning_trend[0] : [];
          for (var x in this.warning_trend.sales_list) {
              var item = this.warning_trend.sales_list[x];
              if (item.id != this.sub_model_id)continue;
              ['sales', 'yoy', 'mom'].map(function(key){
                  that.checked_models[key].push(item.id);
              });
          }
          this.parent_info = this.warning_trend.parent_info;
          this.option = getOption(this, this.warning_trend);
        }, this.failure)
      },
      getRegionOverview(page = 1) {
        this.$request.get(this.$interface.GET_REGION_OVERVIEW, {
          token: this.token,
          ds_id: this.ds_id,
          ym: this.this_year_month,
          ymw: this.warning_year_month_week,
          sub_model_id: this.sub_model_id,
          page: page,
          rows: this.pageSize
        }, (response) => {
          this.region_overview = response.data[0] && response.data[0]['rows'] ? response.data[0]['rows'] : [];
          this.records = response.data[0] && response.data[0]['records'] ? response.data[0]['records'] : [];
          this.currentPage = page
        }, this.failure)
      },
      loadData: function() {
        this.initParam()
        this.getWarningTrend()
        this.getRegionOverview()
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
    },
    components:{
      BiTitle,
      BiPanel,
      BiCell,
      BiChart
    }
	}

  var getOption = function(vm, data, index) {
    // X轴列表
    var xAxisData = [];
    for (var i in data.month_list) {
        var item = data.month_list[i];
        if (item['month'] == 1) {
            xAxisData.push(item['month'] + '月\n' + item['year'] + '年');
        } else {
            xAxisData.push(item['month'] + '月');
        }
    }

    // 按需求分成三个图表
    var groupItems = [
        {key:'sales', text:'销量', type:'line', target: 'chartVa', symbolSize:14, yName: '销量（辆）', line:{width:4,shadowBlur:25,shadowOX:3,shadowOY:3}, cb: function(n) {return n;}},
        {key:'yoy', text:'销量同比', type:'line', target: 'chartVb', symbolSize:8, yName: '同比（%）', line:{width:2,shadowBlur:0,shadowOX:0,shadowOY:0}, cb: function(n) {return (n*100).toFixed(1)}},
        {key:'mom', text:'销量环比', type:'line', target: 'chartVc', symbolSize:8,  yName: '环比（%）', line:{width:2,shadowBlur:0,shadowOX:0,shadowOY:0}, cb: function(n) {return (n*100).toFixed(1)}},
    ]
    , options = {}
    , model_groups = data.sales_list;

    for (var x in groupItems) {

      var key = groupItems[x]['key']
      , group = groupItems[x]['text']
      , type = groupItems[x]['type']
      , target = groupItems[x]['target']
      , yName = groupItems[x]['yName']
      , cb = groupItems[x]['cb']
      , colorArr = ['#01b3f1', '#fc9e6b', '#fb6b72', '#d1e0e7']
      , colorCounter = 0
      , symbolSize = groupItems[x]['symbolSize']
      , line = groupItems[x]['line']

      , legendSelected = {}
      , legendData = []
      , seriesData = []
      , seriesData2 = [];
      for (var i in model_groups) {

        var groups = model_groups[i]
        , group_id = groups['id'] + ""
        , item = groups[key]
        , name = groups['name']
        , color = colorArr[colorCounter++];

        // 原来是过滤选择的车型
        if ( !groups.hasOwnProperty(key) ) continue;

        vm.$helper.inArray(group_id, vm.checked_models[key]) == -1 ? '' : legendData.push(name);
        legendSelected[name] = vm.$helper.inArray(group_id, vm.checked_models[key]) == -1 ? false : true;

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
                itemData.push('')
            }
        }

        seriesData.push({
            name: name,
            type: type,
            symbolSize: symbolSize,
            smooth:true,
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter:function (params) {
                       if (params['componentSubType'] == 'line') {
                           return params['value'];
                       }
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: color,
                    lineStyle: {
                        color: color,
                        width:line['width'],
                    }
                }
            },
            data: itemData
        });
        if (legendSelected[name] == true) {
            legendSelected[name + '预警'] = true;
            seriesData2.push({
                name: name + '预警',
                type: type,
                symbolSize: symbolSize,
                smooth:true,
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter:function (params) {
                           if (params['componentSubType'] == 'line') {
                               return params['value']
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
                            width:line['width'],
                        }
                    }

                },
                data: itemData2
            });
        } else {
            legendSelected[name + '预警'] = false;
        }
    }
    seriesData2.map(function(data){
        seriesData.push(data);
    });

    // 配置图表选项
    options[key] = {
        backgroundColor: '#fff',
        tooltip:{
            trigger: 'axis',
            formatter: function (params) {
                var html = ''
                , seriesName = params[0].seriesName
                , name = params[0].name
                , numbers = params.length
                , length = itemData.length
                , seriesSize = model_groups.length
                , dataIndex = params[0].dataIndex;

                if (dataIndex != length - 1) {
                    html += name;
                    for (var i in params) {
                        if (params[i].seriesName.indexOf('预警') >= 0) continue;
                        html += '<br>' + params[i].marker + params[i].seriesName + ': ' + params[i].value
                    }
                } else { // 最后一条预警
                    html += name + ' | 预警';
                    for (var i in params) {
                        if (params[i].seriesName.indexOf('预警') < 0) continue;
                        var seriesIndex = params[i].seriesIndex - seriesSize;
                        if (params[seriesIndex].seriesName.indexOf('预警') >= 0) continue;
                        html += '<br>' + params[seriesIndex].marker + params[seriesIndex].seriesName + ': ' + params[i].value
                    }
                }
                return html;
            }
        },
        legend: {
            y:0,
            selectedMode: false,
            selected: legendSelected,
            data: legendData
        },
        grid:{
            x:"5%",
            y:44,
            width:'97%',
            height:230
        },
        xAxis: {
            axisLine: {
                show: true,
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
            },
            data: xAxisData
        },
        yAxis: [{
            type: 'value',
            name: '  ' + yName,
            position: 'left',
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
            },
            axisLabel: {
                formatter: '{value}'
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
    if (index && index == key)
      return options[key]
    }
    return options
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "~@index/assets/scss/mixin";
  .summary{
    margin-bottom: 10px; background-color: #fff;
    h2{
      @include font-adjust(25px, 82px, #36485e, left);
      padding:0 20px 0 25px;background-color: #fff;border-bottom: 1px solid #eee;
      i{font-size: 25px}
      .right-text{
        float: right;font-size: 12px; color: #999;
      }
    }
    img{max-width: 60px;max-height: 45px;vertical-align: middle;}
    .cont{
      padding: 20px; @include clearfix();
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
  .sales{
    padding: 26px 20px 20px; position: relative;
  }
  .button-box{
    position: absolute; top:0; right: 20px;
    .bi-button{
      height: 26px; line-height: 26px;
      em{font-size: 15px; margin-right: 5px; font-weight: 700; cursor: pointer}
    }
  }

  .popover-cont{
    .checkbox-ground{
      max-height: 250px; overflow: auto;display: block;
    }
    .check-box{
      margin:0 0 10px 0;display: block;
    }
    p{
      @include clearfix();
      border-top: 1px solid #eee; padding-top: 15px; margin-top: 10px;
      span{
        @include box-Module(block, calc(50% - 5px), 22px);
        @include font-adjust(12px, 24px, #fff);
        float: left; background-color: #ccc; cursor: pointer;
        &:nth-child(1){
          margin-right: 10px; background-color: #339ace;
          &:hover{background-color: #3dafe9}
        }
        &:nth-child(2):hover{background-color: #45484c}
      }
    }
  }
  .area{
    padding: 20px;
    table tr:nth-child(1){border-top: 1px solid #f5f4fa; background-color: #fcfcfe}
    table tr:nth-child(2){color: #f04048};
  }
  table{
    text-align: center;font-size: 12px; margin-bottom: 20px;
    tr{
      border-bottom:1px solid #f5f4fa;color: #535b66;

      &:nth-child(n+2):hover{background-color: #fcfcfc}
      &:nth-child(1) th:nth-child(1),
      td:nth-child(1) {
        text-align: left; padding-left: 15px;
        i{
          font-size: 15px; margin-right: 10px; cursor: pointer; color: #0080c1;
          &:hover{color: #f04048}
        }
      }
      &.sub-content{
        background-color: #fcfcfe;
        td:nth-child(1){padding-left: 50px;}
      }

    }
    th{
      height: 34px; color: #989898;font-weight: 100;
    }
    td{
      height: 52px; font-size: 14px;
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
