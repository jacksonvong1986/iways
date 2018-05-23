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
        <template slot="title">按车型区域月份制定</template>
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
            <li class="active">
              <span>3</span>
              <div>
                待进行
                <em></em>
                <small>按车型区域月份制定</small>
              </div>
            </li>
            <li>
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
        <div style="overflow: auto;min-height: 300px;" v-loading="loading">
          <table class="cyc-xl-table_va expand">
            <thead>
            <tr>
              <th width="10%">区域-车型</th>
              <th width="8%">TY-2018<br/> 目标</th>
              <th width="4.3%">Jan</th>
              <th width="4.3%">Feb</th>
              <th width="4.3%">Mar</th>
              <th width="4.3%">Apr</th>
              <th width="4.3%">May</th>
              <th width="4.3%">Jun</th>
              <th width="4.3%">Jul</th>
              <th width="4.3%">Aug</th>
              <th width="4.3%">Sep</th>
              <th width="4.3%">Oct</th>
              <th width="4.3%">Nov</th>
              <th width="4.3%">Dec</th>
              <th width="5%">Q1</th>
              <th width="5%">Q2</th>
              <th width="5%">H1</th>
              <th width="5%">Q3</th>
              <th width="5%">Q4</th>
              <th width="5%">H2</th>
            </tr>
            </thead>
            <tbody v-for="(item, key) in month_targets" v-if="item.previous_level" class="completeListVc">
              <tr>
                <td><i :class="open_status[key] ? 'el-icon-remove on' : 'el-icon-circle-plus'" @click="changeOpenStatus(key)"></i>{{ item.previous_level.metadata.name }}</td>
                <td>
                  <cite style="border:0px;" v-if="item.previous_level.ty != 'NaN'">{{ item.previous_level.ty | number_format }}</cite>
                  <cite style="border: 0px" v-else>暂无数据</cite>
                </td>
                <td v-for="(item2, key2) in item.previous_level.month_target" :class="month_status[key][key2]">
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
                  <cite v-if="key2 + 1 < target_start_month || key == 0" style="border:0px;color: inherit;">{{ month_sales_targets[key][key2]*1 | number_format }}</cite>
                  <cite v-else-if="['complete', 'error'].includes(month_status[key][key2])" @click="focusMonthTarget(key, key2)">{{ month_sales_targets[key][key2]*1 | number_format }}</cite>
                  <input v-else
                  type="text"
                  placeholder="请输入目标数"
                  @blur="blurMonthTarget(key, key2)"
                  @keyup="keyupMonthTarget(key, key2)"
                  v-focus="month_focus[key][key2]"
                  v-model="month_sales_targets[key][key2]">
                </td>
                <td v-for="column in columns">
                  <cite style="border:0px;" v-if=" item.previous_level[column] != 'NaN'">{{  item.previous_level[column] | number_format }}</cite>
                  <cite style="border: 0px" v-else>暂无数据</cite>
                </td>
              </tr>
              <template v-if="open_status[key]">
                <tr class="secondary" v-for="row in rows">
                  <td>{{ item.previous_level[row].metadata }}</td>
                  <td>
                    <template v-if="item.previous_level[row].ty != 'NaN'">{{ item.previous_level[row].ty | multiply(100) | number_format(1) }}%</template>
                    <template v-else>暂无数据</template>
                  </td>
                  <td v-for="(item2, key2) in item.previous_level[row].month_target">
                    <template v-if="item2 != 'NaN'"> {{ item2 | multiply(100) | number_format(1) }}%</template>
                    <template v-else>暂无数据</template>
                  </td>
                  <td v-for="column in columns">
                    <cite style="border:0px;" v-if="item.previous_level[row][column] != 'NaN'">{{ item.previous_level[row][column] | multiply(100) | number_format(1) }}%</cite>
                    <cite style="border: 0px" v-else>暂无数据</cite>
                  </td>
                </tr>
              </template>
              <template v-for="(item2, key2) in item.list" v-if="open_status[key]">
                <tr class="secondary">
                  <td><i :class="open_status2[key][key2] ? 'el-icon-remove on' : 'el-icon-circle-plus'" @click="changeOpenStatus2(key, key2)"></i>{{ item2.metadata.name }}</td>
                  <td>
                    {{ item2.ty | number_format }}
                    <template v-if="item2.ty != 'NaN'">{{ item2.ty | number_format  }}</template>
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
      </bi-panel>
      <span class="cyc-xl-btn" @click="nextStep"><i class="iconfont icon-xiangyou"></i>确认目标并下发</span>
      <router-link :to="{path: 'setvb', query: {uuid: uuid}}" class="cyc-xl-btn_back"><i class="iconfont icon-icon--"></i>修改车型区域目标</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BiBar from '@index/components/bar.vue'
  import BiPanel from '@index/components/panel.vue'
  import mixin from '@index/config/mixin'
  import Vue from 'Vue'

  export default {
    name: '',
    mixins: [mixin],
    data() {
      return {
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
        resplit: this.$route.query.resplit,

        target_start_month: 1,
        rows: ['proportion', 'last_year_proportion', 'target_share', 'last_year_share', 'segment_growth_rate', 'target_growth_rate'],
        columns: ['q1', 'q2', 'h1', 'q3', 'q4', 'h2'],
        loading: true,
      }
    },
    directives: {
      focus: {
        inserted: function (el, {value}) {
          if (value) {
            let val = Number(el.value)
            if (val <= 0) {
              el.value = ''
            }
            el.focus()
          }
        }
      }
    },
    computed: {
      remain_target_total() {
        let remain_target_total = 0
        this.remain_target.map( item => {
          remain_target_total += item
        })
        return remain_target_total
      }
    },
    mounted() {
      let cb = (response) => {
        let data = response.data
        , month_focus = []
        , month_status = []
        , popover_status = []
        , month_sales_targets = []
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
        })
        this.month_sales_targets = month_sales_targets
        this.month_focus = month_focus
        this.month_status = month_status
        this.popover_status = popover_status
      }
      let resplit = this.resplit == undefined ? false : this.resplit
      this.PUT_MONTH_TARGET(resplit, cb)
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
          let sales = []
          item.previous_level.month_target.map( (item2, key2) => {
            if (key2 + 1 < this.target_start_month)return
            sales.push(item2 || '')
          })
          data.push({
            id: item.previous_level.metadata.id,
            sales: sales
          })
        })
        this.month_sales_target_obj = data
      },
      month_sales_targets() {
        let data = []
        for (let key in this.month_sales_target_obj) {
          let item = this.month_sales_target_obj[key]
          let sales = []
          item.sales.map( (item2, key2) => {
            let index = key2 + this.target_start_month - 1 // 跳过过去的月份
            sales.push(Number(this.month_sales_targets[key][index]) || '')
          })
          data.push({
            id: item.id,
            sales: sales
          })
        }
        this.month_sales_target_obj = data
      },
    },
    methods: {
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
      focusMonthTarget(key, key2) {
        this.popover_status = this.popover_status.map( (item, index) => {
          if (key != index)return item
          return item.map( (item2, index2) => {
            return key2 != index2 ? item2 : true
          })
        })
        this.month_status = this.month_status.map( (item, index) => {
          if (key != index)return item
          return item.map( (item2, index2) => {
            return key2 != index2 ? item2 : 'edit'
          })
        })
        this.month_focus = this.month_focus.map( (item, index) => {
          if (key != index)return item
          return item.map( (item2, index2) => {
            return key2 != index2 ? item2 : true
          })
        })
      },
      blurMonthTarget(key, key2){
        let inputVal = Number((this.month_sales_targets[key][key2]+"").replace(/\,/g, ''))

        this.popover_status = this.popover_status.map( (item, index) => {
          if (key != index)return item
          return item.map( (item2, index2) => {
            return key2 != index2 ? item2 : false
          })
        })
        this.month_status = this.month_status.map( (item, index) => {
          if (key != index)return item
          return item.map( (item2, index2) => {
            return key2 != index2 ? item2 : 'complete'
          })
        })
        this.month_focus = this.month_focus.map( (item, index) => {
          if (key != index)return item
          return item.map( (item2, index2) => {
            return key2 != index2 ? item2 : false
          })
        })
        if(inputVal <= 0 || isNaN(inputVal)){
          this.month_sales_targets[key][key2] = 0
        } else {
          this.month_sales_targets[key][key2] = Math.round(inputVal)
        }
      },
      keyupMonthTarget(key){
        this.calRemainTarget(key)
      },
      calRemainTarget(key) {
        let month_total_target = 0
        if (!this.month_sales_targets[key])return
        this.month_sales_targets[key].map((item2, key2) => {
          month_total_target += Number(item2)
        })
        this.remain_target = this.remain_target.map( (item, index) => {
          return key != index ? item : (this.year_sales_target[key] - month_total_target)
        })
      },
      PUT_MONTH_TARGET(resplit, cb=()=>{}) {
        this.loading = true
        this.$request.put(this.$interface.PUT_MONTH_TARGET, {
          header: {token: this.token},
          month_target: this.month_sales_target_obj || [],
          uuid: this.uuid,
          resplit: resplit !== undefined ? resplit : this.resplit
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
      nextStep() {
        /*if(this.remain_target_total != 0){
          let message = this.remain_target_total >= 0 ? this.number_format(this.remain_target_total) + '</strong></div><div><em>未分配全国目标</em></div>':
            this.number_format(this.remain_target_total*-1) + '</strong></div><div><em>已超出全国目标</em></div>'
          this.$confirm('<div>抱歉，您的全国总目标还未分配完成，请继续<br>制定区域总目标。</div><div><strong style="font-size:20px;color:red;">'
            + message, '温馨提示', {
            type: 'error',
            center: true,
            showCancelButton: false,
            showConfirmButton: false,
            dangerouslyUseHTMLString: true
          }).catch(() => {});
          this.model_group_status = true
          return
        }*/
        if (this.remain_target.length) {
          let index = this.remain_target.findIndex( (item,i) => {
            return item != 0
          })
          if (index != -1) {
            this.month_status = this.month_status.map( (item1, index1) => {
              return item1.map( (item2, index2) => {
                return index1 == index ? 'error' : 'complete'
              })
            })
            let region = this.month_targets[index].previous_level.metadata.name,
              diff_value = this.remain_target[index],
              backTxt = index == 0 ? '，请返回上一步重新制定目标' : ''
            let html = '<div>抱歉，目标区域的 '+ region +'</div><div><strong style="font-size:20px;color:red;">'
            + this.number_format(diff_value > 0 ? diff_value : diff_value*-1)
            + '</strong></div><div><em>' + (diff_value > 0 ? '未分配' : '已超过') + '目标</em>'
            + backTxt
            this.$confirm(html, '温馨提示', {
              type: 'error',
              center: true,
              showCancelButton: false,
              showConfirmButton: false,
              dangerouslyUseHTMLString: true
            }).catch(() => {});
            return
          }
        }
        this.PUT_MONTH_TARGET(false, (response) => {
          if (!!response.verify_msg) {
            alert(response.verify_msg)
            return
          }
          this.$router.push({path: '/zhiku/xl/country/target/setvd', query: {uuid: this.uuid}})
        })
      },
    },
    components:{
      BiBar,
      BiPanel,
    }
  }
</script>
