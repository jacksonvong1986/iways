<template>
  <div class="cyc-xl-targetDetail">
    <bi-bar columnTitle="制定目标详情">
      <template slot="button">
        <span class="mgr20 mgl10">时间：{{ year_month }}</span>
        <span class="mgr20">管理维度：{{ dimension_name }}</span>
        <span class="mgr20">管理类型：{{ manage_type }}</span>
      </template>
      <template slot="right">
        <el-breadcrumb separator="/">
          <span class="bread-legend">当前位置：</span>
          <el-breadcrumb-item> 销量目标管理</el-breadcrumb-item>
          <el-breadcrumb-item> 省份 - 目标详情</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
    </bi-bar>

    <div class="content">

      <bi-panel :operating="false" >
        <template slot="title">目标制定人信息</template>
        <div class="cyc-xl-user">
          <img :src="userInfo.logo_url ? userInfo.logo_url : '/static/images/default-user.png'" alt="">
          <ul>
            <li>
              所属组：<span>{{ userInfo.group_name || '未知' }}</span>
              角色：<span>{{ userInfo.role_name || '未知' }}</span>
              姓名：<span>{{ userInfo.nickname || '未知' }}</span>
            </li>
            <li>
              帐户：<span>{{ userInfo.username || '未知' }}</span>
              手机：<span>{{ userInfo.phone || '未知' }}</span>
            </li>
          </ul>
        </div>
      </bi-panel>

      <bi-panel :operating="false" >
        <template slot="title">&nbsp;</template>
        <div slot="others">
          <span :class="['cyc-xl-step-btn', isAllShow == true ? 'on' : '']" @click="showWays(0)">按全部预览</span>
          <span :class="['cyc-xl-step-btn', isAllShow == false ? 'on' : '']" @click="showWays(1)">按图表预览</span>
        </div>
        <div style="overflow: auto" v-if="isAllShow">
          <table class="cyc-xl-table_va expand">
            <thead>
            <tr>
              <th width="10%">区域-车型</th>
              <th>TY-2018<br/> 目标</th>
              <th>Jan</th>
              <th>Feb</th>
              <th>Mar</th>
              <th>Apr</th>
              <th>May</th>
              <th>Jun</th>
              <th>Jul</th>
              <th>Aug</th>
              <th>Sep</th>
              <th>Oct</th>
              <th>Nov</th>
              <th>Dec</th>
              <th width="5%">Q1</th>
              <th width="5%">Q2</th>
              <th width="5%">H1</th>
              <th width="5%">Q3</th>
              <th width="5%">Q4</th>
              <th width="5%">H2</th>
            </tr>
            </thead>
            <tbody v-for="(item, key) in province_month_targets" v-if="item.previous_level">
            <tr>
              <td>
                <i :class="open_status[key] ? 'el-icon-remove on' : 'el-icon-circle-plus'" @click="changeOpenStatus(key)"></i>
                {{ item.previous_level.metadata.name }}
              </td>
              <td>
                <cite style="border:0px;" v-if="item.previous_level.ty != 'NaN'">{{ item.previous_level.ty | number_format }}</cite>
                <cite style="border: 0px" v-else>暂无数据</cite>
              </td>
              <td v-for="(item2, key2) in item.previous_level.month_target">
                <cite style="border:0px;" v-if="month_sales_targets[key][key2] != 'NaN'">{{ month_sales_targets[key][key2] | number_format }}</cite>
                <cite style="border: 0px" v-else>暂无数据</cite>
              </td>
              <td v-for="column in columns">
                <cite style="border:0px;" v-if="item.previous_level[column] != 'NaN'">{{ item.previous_level[column] | number_format }}</cite>
                <cite style="border: 0px" v-else>暂无数据</cite>
              </td>
            </tr>
            <template v-if="open_status[key]">
              <tr class="secondary" v-for="row in rows">
                <td>
                  {{ item.previous_level[row].metadata }}
                </td>
                <td>
                  <template v-if="item.previous_level[row].ty != 'NaN'">{{ item.previous_level[row].ty | multiply(100) | number_format(1) }}%</template>
                  <template v-else>暂无数据</template>
                </td>
                <td v-for="(item2, key2) in item.previous_level[row].month_target">
                  <template v-if="item2 != 'NaN'">{{ item2 | multiply(100) | number_format(1) }}%</template>
                  <template v-else>暂无数据</template>
                </td>
                <td v-for="column in columns">
                  <cite style="border:0px;" v-if="item.previous_level[row][column] != 'NaN'">{{ item.previous_level[row][column] | multiply(100) | number_format(1) }}%</cite>
                  <cite v-else>暂无数据</cite>
                </td>
              </tr>
            </template>
            <template v-for="(item2, key2) in item.list" v-if="open_status[key]">
              <tr class="secondary">
                <td><i :class="open_status2[key][key2] ? 'el-icon-remove on' : 'el-icon-circle-plus'" @click="changeOpenStatus2(key, key2)"></i>{{ item2.metadata.name }}</td>
                <td>
                  <template v-if="item2.ty != 'NaN'">{{ item2.ty  | number_format }}</template>
                  <template v-else>暂无数据</template>
                </td>
                <td v-for="(item3, key3) in item2.month_target">
                  <template v-if="item3 != 'NaN'">{{ item3 | number_format }}</template>
                  <template v-else>暂无数据</template>
                </td>
                <td v-for="column in columns">
                  <template v-if="item2[column] != 'NaN'"> {{item2[column] | number_format}}</template>
                  <template v-else>暂无数据</template>
                </td>
              </tr>
              <template v-if="open_status2[key][key2]">
                <tr class="secondary" v-for="row in rows">
                  <td style="padding-left:70px;">{{ item2[row].metadata }}</td>
                  <td>
                    <template v-if="item2[row].ty != 'NaN'">{{ item2[row].ty | multiply(100) | number_format(1) }}%</template>
                    <template v-else>暂无数据</template>
                  </td>
                  <td v-for="(item3, key2) in item2[row].month_target">
                    <template v-if="item3 != 'NaN'"> {{ item3 | multiply(100) | number_format(1) }}%</template>
                    <template v-else>暂无数据</template>
                  </td>
                  <td v-for="column in columns">
                    <template v-if="item2[row][column] != 'NaN'">{{item2[row][column]| multiply(100) | number_format(1) }}%</template>
                    <template v-else>暂无数据</template>
                  </td>
                </tr>
              </template>
            </template>
            </tbody>
          </table>
        </div>

        <div v-else>
          <div class="cyc-xl-chartshow" v-for="(item, key) in province_month_targets">
            <h2>{{ item.previous_level.metadata.name }}</h2>
            <el-row>
              <el-col :span="12" class="hasborder">
                <h4>{{ item.previous_level.metadata.name }}-目标走势</h4>
                <bi-chart :id="'chartA'+key" :option="chart_bar_options[key]||{}" class="chart"></bi-chart>
              </el-col>
              <el-col :span="12">
                <h4>{{ item.previous_level.metadata.name }}-目标比例</h4>
                <bi-chart :id="'chartB'+key" :option="chart_pie_options[key]||{}" class="chart"></bi-chart>
              </el-col>
            </el-row>
          </div>
        </div>

      </bi-panel>

    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import BiBar from '@index/components/bar.vue'
  import BiChart from '@index/components/echart.vue'
  import BiPanel from '@index/components/panel.vue'
  import BiEmpty from '@index/components/empty.vue'
  import mixin from '@index/config/mixin'
  import sales from './_mixin'
  import echarts from 'echarts'
  import Vue from 'Vue'

  export default {
    name: '',
    mixins: [mixin, sales],
    data() {
      return {
        isAllShow: true,

        serial_number: this.$route.query.serial_number || '',
        month_targets: [],
        month_sales_targets: [],
        open_status: [],
        open_status2: [],
        rows: ['proportion', 'last_year_proportion', 'target_share', 'last_year_share', 'segment_growth_rate', 'target_growth_rate'],
        columns: ['q1', 'q2', 'h1', 'q3', 'q4', 'h2'],

        chart_bar_options: [],
        chart_pie_options: [],
        target_start_month: 1,
        userInfo: {},
        province_month_targets:[],
        province_id: ''
      }
    },
    watch: {
      month_targets() {
        let data = []
        this.month_targets.map( (item, key) => {
          this.open_status.push(false)
          this.open_status2.push([])
          item.list.map( (item2, key2) => {
            this.open_status2[key].push(false)
          })
        })
        // 构建图表
        let chart_bar_axis_data = []
        let chart_bar_series_data = []
        let chart_pie_series_data = []
        let chart_pie_series_data_temp = []

        for (let i = 1; i <= 12; i++) {
          chart_bar_axis_data.push(i + '月')
        }
        this.month_targets.map( (item, key) => {
          chart_bar_series_data[key] = item.previous_level.month_target
        })

        let chart_pie_data = {}
        let chart_pie_data_region = {}
        this.month_targets.map( (item, key) => {
          if (item.previous_level.metadata.id == this.province_id){
            chart_pie_data = {value: item.previous_level.ty, name: item.previous_level.metadata.name}
            chart_pie_series_data_temp.push(chart_pie_data)
          }
          if (item.previous_level.metadata.id == this.region_id){
            chart_pie_data_region = {value: item.previous_level.ty, name: item.previous_level.metadata.name}
          }
        })
        chart_pie_series_data_temp.push({
          value: parseInt(chart_pie_data_region.value) - parseInt(chart_pie_data.value), name: '其它'
        })

        chart_pie_series_data_temp.map( (item, key) => {
          if (key == 0) {
            chart_pie_series_data[key] = chart_pie_series_data_temp
          } else {
            let other_item = {value: chart_pie_series_data_temp[0].value - item.value, name: '其他'}
            chart_pie_series_data[key] = [item, other_item]
          }
        })
        this.chart_bar_axis_data = chart_bar_axis_data
        this.chart_bar_series_data = chart_bar_series_data
        this.chart_pie_series_data = chart_pie_series_data
      }
    },
    mounted(){
      this.region_id = this.dimension_id.split('@')[0] || ''
      this.province_id = this.dimension_id.split('@')[1] || ''
      let cb = (response) => {
        let data = response.data
        , month_sales_targets = []
        this.target_start_month = response.target_start_month || 1
        data.map((item, i) => {
          let row = item.previous_level.month_target || ''
          month_sales_targets[i] = []
          row.map( (item2, j) => {
            month_sales_targets[i][j] = item2
          })
        })
        this.month_sales_targets = month_sales_targets
      }
      this.GET_TARGET_DETAIL(cb)
      this.GET_TARGET_LOG()
    },
    methods:{
      changeOpenStatus(key) {
        Vue.set(this.open_status, key, !this.open_status[key])
      },
      changeOpenStatus2(key, key2) {
        this.open_status2 = this.open_status2.map((item, index) => {
          if ( index == key ) {
            Vue.set(this.open_status2[index], key2, !this.open_status2[index][key2])
          }
          return this.open_status2[index]
        })
      },
      showWays(ways){
        if (ways == 0){
          this.isAllShow = true
        }else{
          this.isAllShow = false;
          this.$nextTick(()=>{
            this.initChart();
          })
        }
      },
      initChart(){
        let that = this
        that.month_targets.map( (item, key) => {
          let optionA = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'line'
              }
            },
            xAxis: {
              type: 'category',
              data: that.chart_bar_axis_data
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: that.chart_bar_series_data[key],
              type: 'bar',
              itemStyle: {
                normal:{
                  color: function (params){
                    let index = that.target_start_month - 1
                    , colorList = []
                    that.chart_bar_series_data[key].map( (item, key) => {
                      key < index ? colorList.push('rgb(42,170,227)') : colorList.push('rgb(164,205,238)')
                    })
                    return colorList[params.dataIndex];
                  }
                },
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }]
          };
          that.chart_bar_options.push(optionA)

          let optionB = {
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)",
            },
            series: [
              {
                name:'目标比例',
                type:'pie',
                hoverAnimation: false,
                legendHoverLink:false,
                radius: ['31%', '35%'],
                color: ['#915872', '#3077b7', '#9a8169'],
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
                data: that.chart_pie_series_data[key].map( item => { return {value: item.value, name: ''}})
              },
              {
                name:'目标比例',
                type:'pie',
                radius: ['35%', '65%'],
                color: ['#d74e67', '#0092ff', '#eba954'],
                label: {
                  normal: {
                    formatter: '{b}\n{d}%'
                  },
                },
                data: that.chart_pie_series_data[key].map( item => { return {value: item.value, name: item.name}})
              }
            ]
          };
          that.chart_pie_options.push(optionB)
        })
      },
      GET_TARGET_DETAIL(cb=()=>{}) {
        this.$request.get(this.$interface.GET_TARGET_DETAIL, {
          header: {token: this.token},
          serial_number: this.serial_number
        }, (response) => {
          let data = response.data || {}
          this.month_targets = data
          this.province_month_targets = this.month_targets.filter( item => {
            if(item.previous_level.metadata.id == this.province_id) return item;
          })
          typeof cb == 'function' ? cb(response) : ''
        }, this.failure)
      },
      GET_TARGET_LOG(cb=()=>{}) {
        if (!this.serial_number)return
        this.$request.get(this.$interface.GET_TARGET_LOG, {
          header: {token: this.token},
          serial_number: this.serial_number
        }, (response) => {
          let userInfo = response.data[0] || {}
          this.userInfo = userInfo.author
        }, this.failure)
      }
    },
    components:{
      BiBar,
      BiPanel,
      BiChart
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>

</style>
