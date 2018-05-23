<template>

  <div class="cyc-shouhou-main">
    <bi-bar columnTitle="配件价格累加比较" columnIcon="icon-shouhou">
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
          <el-breadcrumb-item>配件价格累加比较</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
    </bi-bar>
    <div class="content">
      <!-- 搜索 -->
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
            </div>
            <div class="clear" style="margin-bottom: 20px;">
              <div class="popover-box">
                <el-form-item label="配件分类" prop="part_category_id">
                  <el-select v-model="ruleForm.part_category_id" placeholder="请选择" clearable filterable @change="handle_selected_cate" @clear="handle_clear_cate">
                    <el-option
                      v-for="(cate, key) in part_categories"
                      :key="key"
                      :label="cate.type_name"
                      :value="cate.type_id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="popover-box" style="min-width:400px;">
                <el-form-item label="可比配件" prop="part_ids">
                  <el-select v-model="ruleForm.part_ids" placeholder="请选择" style="width: 100%" multiple clearable @change="handle_selected_parts">
                    <el-option
                      v-for="(part, key) in parts"
                      :key="key"
                      :label="part.part_name"
                      :value="part.part_id">
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
          配件价格累加比较结果
        </template>
          <div class="search-result" v-if="searchData.length > 0">
            <h2 v-text="chart_tit"></h2>
            <bi-chart class="echarts" id="chart_a" :option="optionA"></bi-chart>
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
  import BiPanel from '@index/components/panel.vue'
  import mixin from '@index/config/mixin'
  import BiEmpty from '@index/components/empty.vue'
  import BiChart from '@index/components/echart.vue'
  export default {
    mixins: [mixin],
    data() {
      return {
        rising_rate_group:[],
        purch_price_group:[],
        sell_price_group:[],
        sub_model_name_group:[],
        chart_tit:'',
        searchType: '',
        searchData: [],
        where: [],
        raw_models: [],
        competitors: [],
        part_categories: {},
        raw_parts: [],
        isCheckAll: false,
        formData:{},
        ruleForm: {
          model_id: '',
          compete_model_ids: [],
          part_category_id: '',
          part_ids: []
        },
        rules: {
          model_id: [
            { required: true, message: '请选择本品车型', trigger: 'change' }
          ],
          compete_model_ids: [
            { required: true, message: '请选择竞品车型', trigger: 'change' }
          ],
          part_category_id: [
            { required: true, message: '请选择配件分类', trigger: 'change' }
          ],
          part_ids: [
            { required: true, message: '请选择可比配件', trigger: 'change' }
          ],
        },
        optionA: {},
        firstLoad: true,
        loading: false,
      }
    },
    computed: {
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
      parts() {
        if (this.raw_parts.length == 0)return []
        let parts = {'0': {part_id:0, part_name:'选择全部'}}
        this.raw_parts.map((part) => {
          parts[part.part_id] = part
        })
        return parts
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
      pickerOptions() {
        var that = this
        return {
          disabledDate(date) {
            var begin_year_month = Math.min(...that.part_date) + ''
              , end_year_month = Math.max(...that.part_date) + ''
            if (begin_year_month && end_year_month) {
              var startDate = begin_year_month.substr(0, 4) + '/' + begin_year_month.substr(4, 2) + '/01'
              var endDate = end_year_month.substr(0, 4) + '/' + end_year_month.substr(4, 2) + '/01'
              startDate = Date.parse(new Date(startDate))
              endDate = Date.parse(new Date(endDate))
              return (date && date.valueOf() < startDate) || (date && date.valueOf() > endDate)
            } else {
              return date
            }
          }
        }
      }
    },
    mounted() {
      this.getToken(() => {
        this.GET_COMMON_VALID_DATE()
        this.GET_COMMON_COMPETITORS()
      })
    },
    methods: {
      handle_selected_models() {
        this.competitors = this.models[this.ruleForm.model_id].competitors
        this.ruleForm.compete_model_ids = this.competitors.map(item => {
          return item.sub_model_id
        })
        this.clearValidate('ruleForm')
        this.handle_selected_competitors(this.ruleForm.compete_model_ids)
      },
      handle_selected_competitors() {
        this.part_categories = {}
        this.raw_parts = []
        this.ruleForm.part_category_id = ''
        this.ruleForm.part_ids = []
        this.GET_PART_TYPES()
      },
      handle_selected_cate() {
        this.ruleForm.part_ids = []
        var cate_id = this.ruleForm.part_category_id
        if (!this.part_categories[cate_id]) return
        this.raw_parts = this.part_categories[cate_id].parts
        this.isCheckAll = false
      },
      handle_selected_parts(value, option) {
        this.checkAll()
      },
      handle_clear_cate() {
        this.raw_parts = []
        this.ruleForm.part_ids = []
      },
      checkAll() {
        let selectCheckAll = false
        if (this.ruleForm.part_ids.includes(0) ) {
          selectCheckAll = true
        }
        if (selectCheckAll) {
          this.ruleForm.part_ids = []
          this.isCheckAll = !this.isCheckAll
          if (this.isCheckAll) {
            this.raw_parts.map(item => {
              this.ruleForm.part_ids.push(item.part_id)
            })
          }
        }
        this.isCheckAll = this.ruleForm.part_ids.length == this.raw_parts.length
      },
      gotoback() {
        this.searchType = ''
        this.rising_rate_group = ''
        this.clearValidate('ruleForm')
        this.competitors = []
        this.part_categories = {}
        this.raw_parts = []
        this.parts = []
        this.searchData = []
        this.ruleForm = {
          model_id: '',
          compete_model_ids: [],
          part_category_id: '',
          part_ids: []
        }
        this.isCheckAll = false
      },
      getOption: function () {
        var option = {
          backgroundColor: "#fff",
          color: "#384757",
          tooltip: {
            "trigger": "axis",
            "axisPointer": {
              "type": "cross",
              "crossStyle": {
                "color": "#384757"
              }
            },
            formatter: function(p) {
              return p.value > 0 ? parseFloat(p.value).toFixed(0) : '';
            }
          },
          legend: {
            "data": [
              {
                "name": "含税经销商进货价",
                "icon": "circle",
                "textStyle": {
                  "color": "#7d838b"
                }
              },
              {
                "name": "含税经销商销售价",
                "icon": "circle",
                "textStyle": {
                  "color": "#7d838b"
                }
              },
              {
                "name": "加价率(%)",
                "icon": "circle",
                "textStyle": {
                  "color": "#7d838b"
                }
              }
            ],
            "top": "2",
            "textStyle": {
              "color": "#fff"
            }
          },
          xAxis: [
            {
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
              data: this.sub_model_name_group,
            },
          ],
          "yAxis": [
            {
              type: "value",
              name: "单位：元",
              nameTextStyle: {
                "color": "#7d838b"
              },
              min: 0,
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
            },
            {
              type: "value",
              name: "加价率(%)",
              show: true,
              position: 'right',
              axisLabel: {
                show: true,
                formatter : '{value} %',
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
              }
            }
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
            "xAxisIndex": [
              0
            ],
            "bottom": 0,
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
              "name": "含税经销商进货价",
              "type": "bar",
              "data": this.purch_price_group,
              "barWidth": "40",
              "itemStyle": {
                "normal": {
                  "color": "#00b4f3",
                  "barBorderRadius": 0,
                  "label": {
                    "show": true,
                    "position": "top",
                    formatter: function(p) {
                      return p.value > 0 ? parseFloat(p.value).toFixed(2) : '';
                    }
                  }
                }
              }
            },
            {
              "name": "含税经销商销售价",
              "type": "bar",
              "data": this.sell_price_group,
              "barWidth": "40",
              "itemStyle": {
                "normal": {
                  "color": "#d1e0e7",
                  "barBorderRadius": 0,
                  "label": {
                    "show": true,
                    "position": "top",
                    formatter: function(p) {
                      return p.value > 0 ? parseFloat(p.value).toFixed(2) : '';
                    }
                  }
                }
              }
            },
            {
              "name": "加价率(%)",
              "type": "line",
              "yAxisIndex": 1,
              "data": this.rising_rate_group,
              "itemStyle": {
                "normal": {
                  "color": "#ffaa00"
                }
              },
              "smooth": true,
            }
          ]
        };
        return option
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
            this.$request.get(this.$interface.GET_PART_PRICE_SUM, {
              header: {token: this.token},                                  //通行令牌
              ym: this.this_year_month,                                     //当前数据年月
              bp_sub_model_id: this.ruleForm.model_id,                      //本品子车型id
              jp_sub_model_ids: this.ruleForm.compete_model_ids.length
                ? this.ruleForm.compete_model_ids.join(',') : '',           //竞品子车型id
              part_type_ids: this.ruleForm.part_category_id,                //配件类型id
              part_ids: this.ruleForm.part_ids.length
                ? this.ruleForm.part_ids.join(',') : '',                     //配件id
            }, (response) => {
              this.searchType = searchType;
              this.searchData = response.data;
              this.rising_rate_group=[];
              this.purch_price_group=[];
              this.sell_price_group=[];
              this.sub_model_name_group=[];
              this.optionA = {};
              if (response.data.length>0) {
                this.chart_tit=response.data[0]['sub_model_name']+"与竞品配件价格累加比较";
                for(let x in response.data) {
                  this.rising_rate_group.push((response.data[x]['rising_rate']*100).toFixed(2));
                  this.purch_price_group.push(response.data[x]['purch_price']);
                  this.sell_price_group.push(response.data[x]['sell_price']);
                  this.sub_model_name_group.push(response.data[x]['sub_model_name']);
                }
                this.$nextTick(function () {
                  this.firstLoad = false;
                  this.loading = false;
                  this.optionA = this.getOption();
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
      BiBar,BiPanel,BiEmpty,BiChart
    },
  }
</script>
<style lang="scss" type="text/scss" scoped></style>
