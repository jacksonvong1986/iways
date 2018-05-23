<template>

  <div class="cyc-shouhou-main">
    <bi-bar columnTitle="配件价格差异分析" columnIcon="icon-shouhou">
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
          @change="GET_PART_TYPES"
          type="month">
        </el-date-picker>
      </template>
      <template slot="right">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">概览主页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/zhiku/sh' }">售后概况</el-breadcrumb-item>
          <el-breadcrumb-item>配件价格差异分析</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
    </bi-bar>
    <div class="content">
      <bi-panel :operating="false">
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
              <div class="popover-box">
                <el-form-item label="价格比较" prop="price_type">
                  <el-select v-model="ruleForm.price_type" placeholder="请选择">
                    <el-option label="进货价" value="purch_diff"></el-option>
                    <el-option label="销售价" value="sell_diff"></el-option>
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
          配件价格差异分析
        </template>
        <div class="search-result" v-if="searchData.length>0">
          <h2>{{model_name}}与竞品配件价格差异分析</h2>
          <bi-chart :option="optionA" id="chart_a" style="height: 380px;"></bi-chart>
        </div>
        <div class="search-result" v-if="searchData.length==0">
          <div v-loading="loading" element-loading-background="#fff" style="min-height: 300px">
            <!-- 无结果 -->
            <template v-if="firstLoad">
              <bi-empty :show-result="false" v-if="!loading">
                <span slot="tips">亲爱的，您还没有选择查询条件，请先选择您关注的查询条件</span>
              </bi-empty>
            </template>
            <template v-else>
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
        checkboxGroup:'',
        searchType: '',
        part_date: [],
        raw_models: [],
        competitors: [],
        part_categories: {},
        raw_parts: [],
        searchData: [],
        optionA: {},
        legend_selected: {},
        seriesData: [],
        type_names: [],
        model_name: '',
        firstLoad: true,
        loading: false,
        ruleForm: {
          model_id: '',
          model_name: '',
          compete_model_ids: [],
          price_type: 'purch_diff'
        },
        rules: {
          model_id: [
            { required: true, message: '请选择本品车型', trigger: 'change' }
          ],
          compete_model_ids: [
            { required: true, message: '请选择竞品车型', trigger: 'change' }
          ],
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
      })
    },
    methods:{
      getOptionA: function () {
        var option = {
          backgroundColor: "#fff",
          color: ['#00b0f3', '#339ca8','#cb6234','#d1e0e7','#2b821d', '#005eaa','#c12e34', '#cda819','#32a487','#333333', '#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
          tooltip : {
            trigger: 'item',
            formatter : function (params) {
              var info =  params['seriesName'] + '</br>'+
                "价格差异 : " + params["data"] + "%"
              return info;
            }
          },
          legend: {
            show: true,
            orient: 'horizontal',
            bottom: '0',
            itemGap: 50,
            textStyle:{fontSize: 13},
            selected: this.legend_selected,
            'data': this.type_names
          },
          "xAxis": [
            {
              type: "category",
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
              data: [],
            },
          ],
          "yAxis": [
            {
              type: "value",
              name: "",
              position: "right",
              nameTextStyle: {"color": "#7d838b"},
              splitLine:{
                lineStyle: {
                  color: '#f2f2f2',
                }
              },
              axisLabel: {
                formatter: '{value} %'
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#999'
                }
              }
            },
          ],
          "grid": {
            x: '自适应',
            top: 20,
            bottom:50,
            width:'自适应',
            height:'自适应',
            containLabel: true
          },
          "series": this.seriesData
        };
        return option;
      },
      handle_selected_models(sub_model_id) {
        this.competitors = this.models[this.ruleForm.model_id].competitors
        this.ruleForm.compete_model_ids = this.competitors.map(item => {
          return item.sub_model_id
        })
        this.clearValidate('ruleForm')
        this.ruleForm.model_name = this.models[this.ruleForm.model_id].sub_model_name
      },
      handle_selected_competitors(competitor_ids = []) {
        this.part_categories = {}
        this.raw_parts = []
        this.GET_PART_TYPES()
      },
      gotoback() {
        this.searchType = ''
        this.clearValidate('ruleForm')
        this.competitors = []
        this.searchData = []
        this.ruleForm = {
          model_id: '',
          compete_model_ids: [],
          price_type: 'purch_diff'
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
      GET_PART_TYPES() {
        if (!this.ruleForm.model_id || this.ruleForm.compete_model_ids.length<=0)return
        this.$request.get(this.$interface.GET_PART_TYPES, {
          header: {token: this.token},
          ym: this.this_year_month || '201801',                  //数据有效时间
          bp_sub_model_id: this.ruleForm.model_id,                      //本品子车型id
          jp_sub_model_ids: this.ruleForm.compete_model_ids.join(','),  //竞品子车型id，多个用`,`方法分开
          type: '1'                                                     //比较价格
        }, (response) => {
          this.ruleForm.part_category_id = ''
          this.ruleForm.part_ids = []
          let part_categories = {}
          response.data.map(item => {
            part_categories[item.type_id] = item
          });
          this.$nextTick(() => {
            this.part_categories = part_categories
          })
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
            this.$request.get(this.$interface.GET_PART_PRICE_DIFFS, {
              header: {token: this.token},                                  //通行令牌
              ym: this.this_year_month || '201801',                         //当前数据年月
              bp_sub_model_id: this.ruleForm.model_id,                      //本品子车型id
              jp_sub_model_ids: this.ruleForm.compete_model_ids.length
                ? this.ruleForm.compete_model_ids.join(',') : '',           //竞品子车型id
            }, (response) => {
              this.searchData = response.data;
              this.optionA = {};
              this.type_names=[];
              this.seriesData=[];
              for (let x in this.legend_selected) {
                this.legend_selected[x] = false
              }
              this.model_name = this.ruleForm.model_name
              if (response.data.length > 0) {
                response.data.map( item => {
                  this.type_names.push(item.part_type);
                  this.legend_selected[item.part_type] = true;
                  this.seriesData.push({
                    "name": item.part_type,
                    "type": "bar", "barMaxWidth": 80, itemStyle : { normal: {label : {show: true, position: 'top', formatter: item.part_type+'：{c}%'}}},
                    "data": [(item[this.ruleForm.price_type]*100).toFixed(2)]
                  })
                })
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
      BiBar,BiChart,BiEmpty,BiPanel
    }
  }
</script>
<style lang="scss" type="text/scss" scoped></style>
