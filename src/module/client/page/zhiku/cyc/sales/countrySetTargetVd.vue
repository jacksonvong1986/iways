<template>

  <div>
    <bi-bar columnTitle="目标制定">
      <template slot="button">
        <span class="mgr20 mgl10">时间：2018/03</span>
        <span class="mgr20">管理维度：全国</span>
        <span class="mgr20">管理类型：零售量</span>
      </template>
      <template slot="right">
        <el-breadcrumb separator="/">
          <span class="bread-legend">当前位置：</span>
          <el-breadcrumb-item :to="{ path: '/' }">概览主页</el-breadcrumb-item>
          <el-breadcrumb-item> 销量目标管理</el-breadcrumb-item>
          <el-breadcrumb-item> 目标制定</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
    </bi-bar>

    <div class="content">
      <bi-panel :operating="false" >
        <template slot="title">预览结果并下发</template>
        <div class="cyc-xl-step">
          <ul class="step-bar">
            <li class="end">
              <span><i class="iconfont icon-check"></i></span>
              <div>
                已完成
                <em></em>
                <small>请输入全国总目标</small>
              </div>
            </li>
            <li class="end">
              <span><i class="iconfont icon-check"></i></span>
              <div>
                已完成
                <em></em>
                <small>按区域车型制定目标</small>
              </div>
            </li>
            <li class="end">
              <span><i class="iconfont icon-check"></i></span>
              <div>
                已完成
                <em></em>
                <small>按车型区域月份制定</small>
              </div>
            </li>
            <li class="active">
              <span>4</span>
              <div>
                待进行
                <small>预览结果并下发任务</small>
              </div>
            </li>
          </ul>
        </div>
      </bi-panel>
      <bi-panel :operating="false" >
        <template slot="title">目标制定人信息</template>
        <div class="cyc-xl-user">
          <img src="/static/images/default-user.png" alt="">
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
        <div style="overflow: auto;min-height: 300px;" v-if="isAllShow" v-loading="loading">
          <table class="cyc-xl-table_va expand">
            <thead>
            <tr>
              <th width="9%">区域-车型</th>
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
            <tbody v-for="(item, key) in month_targets" v-if="item.previous_level">
              <tr class="">
                <td><i :class="open_status[key] ? 'el-icon-remove on' : 'el-icon-circle-plus'" @click="changeOpenStatus(key)"></i>{{ item.previous_level.metadata.name }}</td>
                <td>
                  <cite style="border:0px;">{{ item.previous_level.ty*1 | number_format }}</cite>
                </td>
                <td v-for="(item2, key2) in item.previous_level.month_target">
                  <el-popover
                    v-model="popover_status[key][key2]"
                    :visible-arrow="true"
                    popper-class="cyc-xl-table_box_tips"
                    placement="top"
                    trigger="click">
                    <div :class="['cyc-xl-table_tips', {'error': remain_target[key] < 0}]">
                      <template v-if="remain_target[key] >= 0">
                        未分配总目标：{{remain_target[key] | number_format}}
                      </template>
                      <template v-else>
                        已超出总目标：{{remain_target[key]*-1 | number_format}}
                      </template>
                    </div>
                  </el-popover>
                  <cite style="border:0px;">{{ month_sales_targets[key][key2]*1 | number_format }}</cite>
                </td>
                <td v-for="column in columns">
                  <cite style="border:0px;">{{ item.previous_level[column] | number_format }}</cite>
                </td>
              </tr>
              <template v-if="open_status[key]">
                <tr class="secondary" v-for="row in rows">
                  <td>{{ item.previous_level[row].metadata }}</td>
                  <td>{{ item.previous_level[row].ty | multiply(100) | number_format(1) }}%</td>
                  <td v-for="(item2, key2) in item.previous_level[row].month_target">{{ item2 | multiply(100) | number_format(1) }}%</td>
                  <td v-for="column in columns">
                    <cite style="border:0px;">{{ item.previous_level[row][column] | multiply(100) | number_format(1) }}%</cite>
                  </td>
                </tr>
              </template>
              <template v-for="(item2, key2) in item.list" v-if="open_status[key]">
                <tr class="secondary">
                  <td><i :class="open_status2[key][key2] ? 'el-icon-remove on' : 'el-icon-circle-plus'" @click="changeOpenStatus2(key, key2)"></i>{{ item2.metadata.name }}</td>
                  <td>{{ item2.ty }}</td>
                  <td v-for="(item3, key3) in item2.month_target">{{ item3 | number_format }}</td>
                </tr>
                <template v-if="open_status2[key][key2]">
                  <tr class="secondary" v-for="row in rows">
                    <td style="padding-left:70px;">{{ item2[row].metadata }}</td>
                    <td>{{ item2[row].ty | multiply(100) | number_format(1) }}%</td>
                    <td v-for="(item3, key2) in item2[row].month_target">{{ item3 | multiply(100) | number_format(1) }}%</td>
                  </tr>
                </template>
              </template>
            </tbody>
          </table>
        </div>

        <div v-else>
          <div class="cyc-xl-chartshow" v-for="(item, key) in month_targets">
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

      <span @click="nextStep" class="cyc-xl-btn">确认目标并下发</span>
      <router-link :to="{path: 'setvc', query: {uuid: uuid}}" class="cyc-xl-btn_back"><i class="iconfont icon-icon--"></i>按车型区域月份制定目标</router-link>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import BiBar from '@index/components/bar.vue'
  import BiChart from '@index/components/echart.vue'
  import BiPanel from '@index/components/panel.vue'
  import mixin from '@index/config/mixin'
  import Vue from 'Vue'

  export default {
    name: '',
    mixins: [mixin],
    data() {
      return {
        isAllShow: true,
        loading: true,
        uuid: this.$route.query.uuid || '',
        month_targets: [],
        month_sales_targets: [],
        month_sales_target_obj: [],
        year_sales_target: [],
        open_status: [],
        open_status2: [],
        popover_status: [],
        month_status: [],
        month_focus: [],
        remain_target: [],
        remain_target_total: 0,
        target_start_month: 1,
        rows: ['proportion', 'last_year_proportion', 'target_share', 'last_year_share', 'segment_growth_rate', 'target_growth_rate'],
        columns: ['q1', 'q2', 'h1', 'q3', 'q4', 'h2'],
        serial_number: '',
        userInfo: {},

        chart_bar_options: [],
        chart_pie_options: [],
        target_start_month: 1,
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

        this.month_targets.map( (item, key) => {
          chart_pie_series_data_temp.push({value: item.previous_level.ty, name: item.previous_level.metadata.name})
        })
        chart_pie_series_data_temp.map( (item, key) => {
          if (key == 0) {
            chart_pie_series_data[key] = chart_pie_series_data_temp.filter( (item2, key2) => { return (key2 != 0) })
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
      let cb = (response) => {
        let data = response.data
        , month_focus = []
        , month_status = []
        , popover_status = []
        , month_sales_targets = []
        , remain_target_total = 0
        this.target_start_month = response.target_start_month
        data.map((item, i) => {
          let row = item.previous_level.month_target || ''
          , month_total_target = 0
          month_sales_targets[i] = []
          month_focus[i] = []
          month_status[i] = []
          popover_status[i] = []
          this.year_sales_target[i] = item.previous_level.ty
          row.map( (item2, j) => {
            month_sales_targets[i][j] = item2
            month_focus[i][j] = false
            month_status[i][j] = 'complete'
            popover_status[i][j] = false
            month_total_target += Number(item2)
          })
          this.remain_target[i] = this.year_sales_target[i] - month_total_target
          remain_target_total += this.remain_target[i]
        })
        this.month_sales_targets = month_sales_targets
        this.month_focus = month_focus
        this.month_status = month_status
        this.popover_status = popover_status
        this.remain_target_total = remain_target_total
      }
      this.PUT_MONTH_TARGET(cb)
      this.GET_USER_INFO()
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
            animation: key == 0 ? true:false,
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
            animation: key == 0 ? true:false,
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
      nextStep() {
        this.POST_TARGET((data) => {
          if (!!data.serial_number) {
            this.$router.push({path: '/zhiku/xl/country/target/setve', query: {serial_number: data.serial_number}})
          }
        })
      },
      PUT_MONTH_TARGET(cb=()=>{}) {
        this.loading = true
        this.$request.put(this.$interface.PUT_MONTH_TARGET, {
          header: {token: this.token},
          month_target: [],
          uuid: this.uuid
        }, (response) => {
          this.loading = false
          let data = response.data
          this.month_targets = data
          typeof cb == 'function' ? cb(response) : ''
        }, (response) => {
          if (response.result_code == "400" && response.result_msg == "Bad Request: 目标草稿已过期或不存在") {
            sessionStorage.removeItem('iways_uuid')
            this.$router.push({path: '/zhiku/xl/country/target/setva'})
          } else {
            this.failure(response)
          }
        })
      },
      POST_TARGET(cb) {
        this.$request.post(this.$interface.POST_TARGET, {
          header: {
            token: this.token,
            ContentType: 'application/x-www-form-urlencoded'
          },
          uuid: this.uuid
        }, (response) => {
          let data = response.data[0]
          typeof cb == 'function' ? cb(data) : ''
        }, this.failure)
      },
      GET_USER_INFO(cb) {
        this.$request.get(this.$interface.GET_USER_INFO, {
          header: {token: this.token},
          ids: [this.$store.state.user.user_id],
        }, (response) => {
          let data = response.data[0] || {}
          this.userInfo = data || {}
        }, this.failure)
      },
    },
    components:{
      BiBar,
      BiPanel,
      BiChart,
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>

</style>
