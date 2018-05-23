<template>

  <div class="cyc-shouhou-main">
    <bi-bar columnTitle="用车成本比较" columnIcon="icon-shouhou">
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
          <el-breadcrumb-item>用车成本比较</el-breadcrumb-item>
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
                  <el-select v-model="ruleForm.compete_model_ids" style="width: 100%" multiple placeholder="请选择">
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
            <div class="clear" style="margin-bottom: 20px;">
              <div class="popover-box">
                <el-form-item label="比较里程" prop="mile">
                  <el-select v-model="ruleForm.mile" placeholder="请选择" filterable>
                    <el-option
                      v-for="(cate, key) in mileage"
                      :key="key"
                      :label="cate.mile_val"
                      :value="cate.mile_id">
                    </el-option>
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
          用车成本比较结果
        </template>
        <div class="search-result" v-if="searchData.length>0">
          <h2>{{model_name}}与竞品用车成本比较</h2>
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
        searchData: [],
        seriesData1: [],
        seriesData2: [],
        optionA: {},
        searchPage: 1,
        part_date: [],
        where: [],
        firstLoad: true,
        loading: false,
        model_name_group: [],

        raw_models: [],
        competitors: [],
        mileage:[
          {mile_id: 60000, mile_val: "6万公里"},
          {mile_id: 100000, mile_val: "10万公里"},
        ],

        ruleForm: {
          model_id: '',
          compete_model_ids: [],
          mile: '',//默认值
        },
        rules: {
          model_id: [
            { required: true, message: '请选择本品车型', trigger: 'change' }
          ],
          compete_model_ids: [
            { required: true, message: '请选择竞品车型', trigger: 'change' }
          ],
          mile: [
            { required: true, message: '请选择比较里程', trigger: 'change' }
          ]
        },
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
    },
    mounted() {
      this.getToken(() => {
        this.GET_COMMON_COMPETITORS()
        this.GET_COMMON_VALID_DATE()
      })
    },
    methods:{
      getOptionA: function () {
        var option = {
          backgroundColor: "#fff",
          color: ['#00b0f3', '#d1e0e7','#cb6234','#d1e0e7','#2b821d', '#005eaa','#c12e34', '#cda819','#32a487','#333333', '#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
          tooltip : {
            trigger: 'item',
          },
          legend: {
            show: true,
            orient: 'horizontal',
            top: '0',
            itemGap: 50,
            textStyle:{fontSize: 13,},
            "data": ["配件价格","工时价格"]
          },
          "xAxis": [
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
                show: true,
              },
              data: this.model_name_group,
            },
          ],
          "yAxis": [
            {
              type: "value",
              name: "",
              nameTextStyle: {
                "color": "#7d838b"
              },
              min: 0,
              axisLabel: {
                formatter: '{value}元'
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
            },
          ],
          "grid": {
            x: '自适应',
            top:55,
            bottom:50,
            width:'自适应',
            height:'自适应',
            containLabel: true
          },
          "dataZoom": [{
            "show": true,
            "height": 30,
            "bottom": 5,
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
          "series": [{
              "name": '工时价格',
              "stack": "总量",
              "type": "bar",
              "barWidth": '60',
              "itemStyle": {
                "normal": {
                  "label": {
                    "show": true,
                    "position": "insideTop",
                    "textStyle": {
                      "color": "#fff"
                    },
                    formatter: function(p) {
                      return p.value > 0 ? (p.value) : '';
                    }
                  }
                }
              },
              "data": this.seriesData1
            },{
                "name": '配件价格',
                "stack": "总量",
                "type": "bar",
                "barWidth": '60',
                "itemStyle": {
                  "normal": {
                    "label": {
                      "show": true,
                      "position": "insideTop",
                      "textStyle": {
                        "color": "#fff"
                      },
                      formatter: function(p) {
                        return p.value > 0 ? (p.value) : '';
                      }
                    }
                  }
                },
                "data": this.seriesData2
              }]
        };
        return option
      },
      handle_selected_models(sub_model_id) {
        this.competitors = this.models[this.ruleForm.model_id].competitors
        this.ruleForm.compete_model_ids = this.competitors.map(item => {
          return item.sub_model_id
        })
        this.clearValidate('ruleForm')
      },
      gotoback() {
        this.searchType = ''
        this.competitors = []
        this.searchData = []
        this.clearValidate('ruleForm')
        this.ruleForm = {
          model_id: '',
          compete_model_ids: [],
          mile: ''
        }
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
            this.$request.get(this.$interface.GET_COST_USE_COST_SUM, {
              header: {token: this.token},                                  //通行令牌
              ym: this.this_year_month || '201801',                         //当前数据年月
              bp_sub_model_id: this.ruleForm.model_id,                      //本品子车型id
              jp_sub_model_ids: this.ruleForm.compete_model_ids.length
                ? this.ruleForm.compete_model_ids.join(',') : '',           //竞品子车型id
              mile: this.ruleForm.mile,                                  //比较里程/单位:公里
            }, (response) => {
              this.searchData = response.data;
              this.optionA = {};
              this.model_name_group=[];
              this.seriesData1=[];
              this.seriesData2=[];
              if (response.data.length>0) {
                this.model_name = response.data[0]['sub_model_name'];
                response.data.map( item => {
                  this.model_name_group.push(item.sub_model_name)
                  this.seriesData1.push(item.hourly_wage.toFixed(0))
                  this.seriesData2.push(item.sell_price.toFixed(0))
                  /*searchData.push(Object.assign(item, {
                    'sub_model_id':row.sub_model_id,
                    'sub_model_name':row.sub_model_name
                  }))*/
                });
                this.$nextTick(() => {
                  this.firstLoad = false;
                  this.loading = false;
                  this.optionA = this.getOptionA()
                })
              }
            }, this.failure);
          } else {
            return false;
          }
        })
      }
    },
    components:{
      BiBar,BiChart,BiEmpty,BiPanel,
    }
  }
</script>
<style lang="scss" type="text/scss" scoped></style>
