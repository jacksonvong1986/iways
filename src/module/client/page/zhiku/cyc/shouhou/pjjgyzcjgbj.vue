<template>

  <div class="cyc-shouhou-main">
    <bi-bar columnTitle="配件价格与整车价格比较" columnIcon="icon-shouhou">
      <template slot="button">
        <span>当前数据时间：</span>
        <el-date-picker
          style="width:120px"
          prefix-icon="change-data-button"
          v-model="this_year_month"
          format="yyyy/MM"
          value-format="yyyyMM"
          :picker-options="pickerOptions"
          :editable="false"
          :clearable="false"
          type="month">
        </el-date-picker>
      </template>
      <template slot="right">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">概览主页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/zhiku/sh' }">售后概况</el-breadcrumb-item>
          <el-breadcrumb-item>配件价格与整车价格比较</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
    </bi-bar>
    <div class="content">
      <!-- 搜索 -->
      <bi-panel :operating="false" v-show="searchType != 2">
        <template slot="title">
          <font>按条件查询</font>
        </template>

        <div class="search-condition">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="top">
            <div class="clear" style="margin-bottom: 20px;">
              <div class="popover-box">
                <el-form-item label="本品车型" prop="model_id">
                  <el-select v-model="ruleForm.model_id" placeholder="请选择" filterable @change="handle_selected_models">
                    <el-option-group
                      v-for="group in models_grouped"
                      :key="group.label"
                      :label="group.label">
                      <el-option
                        v-for="item in group.options"
                        :key="item.sub_model_id"
                        :label="item.sub_model_name"
                        :value="item.sub_model_id">
                      </el-option>
                    </el-option-group>
                  </el-select>
                </el-form-item>
              </div>
              <div class="popover-box" style="min-width:400px;">
                <el-form-item label="竞品车型" prop="compete_model_ids">
                  <el-select v-model="ruleForm.compete_model_ids" style="width: 100%" multiple placeholder="请选择" @change="handle_selected_competitors">
                    <el-option-group
                      v-for="group in competitors_grouped"
                      :key="group.label"
                      :label="group.label">
                      <el-option
                        v-for="item in group.options"
                        :key="item.sub_model_id"
                        :label="item.sub_model_name"
                        :value="item.sub_model_id">
                      </el-option>
                    </el-option-group>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <a href="javascript:void(0);" class="submit" @click="GET_SEARCH_DATA(1, 'ruleForm')">{{ searchStatusText }}</a>
            <a href="javascript:void(0);" class="submit-back" @click="gotoback()" v-show="searchType==1">返回上一步</a>
          </el-form>
        </div>
      </bi-panel>
      <bi-panel :operating="false">
        <template slot="title">
          配件价格与整车价格比较结果
        </template>
        <div class="search-result" v-if="searchData.length>0">
          <h2>{{model_name}}与竞品配件总体价格和成交价比值比较</h2>
          <table class="type2">
            <tbody>
            <tr><td>车型</td><td  v-for="value in car_models" v-text="value"></td></tr>
            <tr><td>整车成交价(元)</td><td  v-for="value in all_price">{{value| number_format}}</td></tr>
            <tr><td>配件价格与成交价调整比</td><td  v-for="value in adjustment_ratio" v-text="value"></td></tr>
            </tbody>
          </table>
          <bi-chart :option="optionA" id="chart_a" style="height: 380px;"></bi-chart>
        </div>
        <div class="search-result" v-else>
          <div v-loading="loading" element-loading-background="#fff" style="min-height: 300px">
            <!-- 无结果 -->
            <template v-if="firstLoad">
              <bi-empty :show-result="false" v-if="!loading">
                <span slot="tips">亲爱的，您还没有选择查询条件，请先选择您关注的查询条件</span>
              </bi-empty>
            </template>
            <template v-else="">
              <bi-empty></bi-empty>
            </template>
          </div>
        </div>
      </bi-panel>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BiBar from '@index/components/bar.vue'
  import BiChart from '@index/components/echart.vue'
  import BiEmpty from '@index/components/empty.vue'
  import BiPanel from '@index/components/panel.vue'
  import echarts from 'echarts'
  import mixin from '@index/config/mixin'

  export default {
    mixins: [mixin],
    name: '',
    data() {
      return {
        selectOnClass : false,
        searchType: '',
        model_name: '',
        seriesData: [],
        searchData: [],
        optionA: {},
        car_models: [],//车型
        all_price: [],//整车成交价(元)
        adjustment_ratio: [], //调整比
        searchPage: 1,
        part_date: [],
        where: [],
        raw_models: [],
        competitors: [],
        raw_parts: [],
        ruleForm: {
          model_id: '',
          compete_model_ids: [],
        },
        rules: {
          model_id: [
            { required: true, message: '请选择本品车型', trigger: 'change' }
          ],
          compete_model_ids: [
            { required: true, message: '请选择竞品车型', trigger: 'change' }
          ],
        },
        firstLoad: true,
        loading: false,
      }
    },
    computed:{
      pickerOptions() {
        var that = this
        return {
          disabledDate(date) {
            var begin_year_month = Math.min(...that.part_date) + ''
              , end_year_month = Math.max(...that.part_date) + ''
            if (begin_year_month && end_year_month) {
              var startDate = begin_year_month.substr(0,4) + '/' + begin_year_month.substr(4,2) + '/01'
              var endDate = end_year_month.substr(0,4) + '/' + end_year_month.substr(4,2) + '/01'
              startDate = Date.parse(new Date(startDate))
              endDate = Date.parse(new Date(endDate))
              return (date && date.valueOf() < startDate) || (date && date.valueOf() > endDate)
            } else {
              return date
            }
          }
        }
      },
      searchStatusText() {
        return !!this.searchType ? '搜索' : '下一步'
      },
      competitors_grouped() {
        let competitors = {}
        this.competitors.map((model) => {
          if (!competitors[model.manf_brand_name]) {
            competitors[model.manf_brand_name] = {}
            competitors[model.manf_brand_name]['label'] = model.manf_brand_name
            competitors[model.manf_brand_name]['options'] = []
          }
          competitors[model.manf_brand_name]['options'].push(model)
        })
        return competitors
      },
      models_grouped() {
        let models = {}
        this.raw_models.map((model) => {
          if (!models[model.manf_brand_name]) {
            models[model.manf_brand_name] = {}
            models[model.manf_brand_name]['label'] = model.manf_brand_name
            models[model.manf_brand_name]['options'] = []
          }
          models[model.manf_brand_name]['options'].push(model)
        })
        return models
      },
      models() {
        let models = {}
        this.raw_models.map((model) => {
          models[model.sub_model_id] = model
        })
        return models
      },
    },
    mounted() {
      this.getToken(() => {
        this.GET_COMMON_COMPETITORS()
        this.GET_COMMON_VALID_DATE()
      });

    },
    methods:{
      getOptionA: function () {
        var option = {
          backgroundColor: "#fff",
          tooltip: {            "trigger": "axis",
            "axisPointer": {
              "type": "cross",
              "crossStyle": {
                "color": "#384757"
              }
            },
            formatter: function(params) {
              let data = params[0]
              let html = (data.name || '') + '<br>'
              html += data.seriesName + ': ' + (data.value * 100).toFixed(0) + '%'
              return html
            }
          },
          xAxis: [
            {
              axisLine: {
                show: true,
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
              data: this.car_models,
            },
          ],
          "yAxis": [
            {
              "type": "category",
              nameTextStyle: {
                "color": "#7d838b"
              },
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
                show: true,
                lineStyle: {
                  color: '#999'
                }
              },
              data: [
                "零件价格水平低",
                "基准线",
                "零件价格水平高",
              ],
            },
            {
              type: "value",
              show: false,
              min: 0,
              max: 2,
              position: 'right',
              axisLabel: {
                show: false,
                formatter : '{value}',
                textStyle: {
                  "color": "#7d838b"
                }
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
              },
            }
          ],
          "grid": {
            x: '自适应',
            y: '自适应',
            top: 10,
            bottom: 60,
            width:'自适应',
            height:'自适应',
            containLabel: true
          },
          "dataZoom": [{
            "show": true,
            "height": 30,
            "bottom": 0,
            "left":10,
            "right":5,
            "start": 0,
            "end": 100,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle:{
              color:"#d3dee5",
            },
            textStyle:{
              color:"#fff"
            },
            borderColor:"#90979c"
          },
          {
            "type": "inside",
            "show": true,
            "height": 15,
            "start": 1,
            "end": 35
          }],
          "series": [
            {
              "name": "调整比",
              "type": "line",
              "yAxisIndex": 1,
              "data": this.seriesData,
              "itemStyle": {
                "normal": {
                  "color": "#fff"
                }
              },
              "smooth": true,
              markLine: {
                lineStyle: {
                  normal: {
                    type: 'dashed',
                    color:'#f04048'
                  }
                },
                animationDuration:3000,
                label:{
                  show:false,
                  position:'middle',
                  formatter:'{b}: {d}'
                },
                data : [
                  {name: '基准线:',valueIndex:1, xAxis: 0, yAxis: 1},
                ]
              }
            }
          ]
        };
        return option;
      },
      handle_selected_models(sub_model_id) {
        this.competitors = this.models[this.ruleForm.model_id].competitors
        this.ruleForm.compete_model_ids = this.competitors.map(item => {
          return item.sub_model_id
        })
        this.clearValidate('ruleForm')
      },
      handle_selected_competitors(competitor_ids = []) {
        this.raw_parts = []
      },
      gotoback() {
        this.searchType = ''
        this.rising_rate_group = ''
        this.clearValidate('ruleForm')
        this.competitors = []
        this.ruleForm = {
          model_id: '',
          compete_model_ids: [],
        }
        this.searchData = []
      },
      GET_COMMON_COMPETITORS() {
        this.$request.get(this.$interface.GET_COMMON_COMPETITORS, {
          header: {token: this.token},
          type: 1,
          rows: 100000,
        }, (response) => {
          this.raw_models = response.data[0].list;
        }, this.failure);
      },
      GET_COMMON_VALID_DATE() {
        this.$request.get(this.$interface.GET_COMMON_VALID_DATE, {
          header: {token: this.token}
        }, (response) => {
          this.part_date = response.data[0].part_date
          this.this_year_month = Math.max(...this.part_date) + ''
        }, this.failure);
      },
      GET_SEARCH_DATA(searchType, formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.searchType = searchType
            this.$request.get(this.$interface.GET_PART_CAR_PRICE, {
              header: {token: this.token},                                  //通行令牌
              ym: this.this_year_month || '201801',                         //当前数据年月
              bp_sub_model_id: this.ruleForm.model_id,                      //本品子车型id
              jp_sub_model_ids: this.ruleForm.compete_model_ids.length
                ? this.ruleForm.compete_model_ids.join(',') : '',           //竞品子车型id
            }, (response) => {
              this.searchData = response.data;
              this.car_models=[];
              this.all_price=[];
              this.adjustment_ratio=[];
              this.seriesData=[];
              if (response.data.length > 0) {
                this.model_name = response.data[0].sub_model_name;
                response.data.map( item => {
                  this.car_models.push(item.sub_model_name);
                  this.all_price.push(item.tp);
                  this.adjustment_ratio.push((item.adjustment_ratio).toFixed(2));
                  this.seriesData.push({
                    value:(item.adjustment_ratio).toFixed(4),
                    symbol:'image://'+item.sub_model_logo_url,
                    symbolSize: [128, 90],
                    itemStyle : {
                      normal: {
                        label : {
                          show: true,
                          position: 'bottom',
                          formatter: item.sub_model_name,
                          textStyle : {
                            fontSize : '16',
                            fontFamily : '微软雅黑',
                            color: '#333',
                          }
                        }
                      }
                    }
                  })
                })
                this.$nextTick(() => {
                  this.firstLoad = false;
                  this.loading = false;
                  this.optionA = this.getOptionA();
                })
              }


              this.formData=response.data;
             /* response.data.map( row => {
                this.$nextTick(function () {
                  this.optionA = this.getOptionA()
                })
              })*/
            }, this.failure);
          } else {
            return false;
          }
        })
      },
    },
    components:{
      BiBar,BiChart,BiEmpty,BiPanel
    }
  }
</script>
<style lang="scss" type="text/scss" scoped></style>
