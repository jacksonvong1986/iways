<template>

	<div class="cyc-shouhou-detail">
    <bi-bar columnTitle="车型详情" columnIcon="icon-bingtu">
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
          @change="GET_SEARCH_DATA"
          type="month">
        </el-date-picker>
      </template>
      <template slot="right">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">概览主页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/zhiku/sh' }">售后概况</el-breadcrumb-item>
          <el-breadcrumb-item> 车型详情</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
    </bi-bar>
    <div class="content">
      <div class="condition">
        <h3>
          <!--<el-popover-->
            <!--ref="popover"-->
            <!--placement="bottom-start"-->
            <!--popper-class="padding0">-->
            <!--<dl class="popover-va">-->
              <!--<dt>-->
                <!--<em v-for="group in manfs_group" :data-key="group.py_first_letter" @click="selectLetter('manfsBox', group.py_first_letter)">{{ group.py_first_letter }}</em>-->
              <!--</dt>-->
              <!--<dd id="manfsBox">-->
                <!--<ul v-for="group in manfs_group">-->
                  <!--<li v-for="manf in group.manf_brands" :data-key="group.py_first_letter" @click="selectManf(manf.manf_name)">{{ group.py_first_letter }} {{ manf.manf_name }}</li>-->
                <!--</ul>-->
              <!--</dd>-->
              <!--<dd id="modelsBox" v-if="models_grouped[manf_selected]">-->
                <!--<ul v-for="brand_models in models_grouped[manf_selected]">-->
                  <!--<li v-for="model in brand_models.models" @click="selectModel(model.sub_model_id)">{{ model.sub_model_name }}</li>-->
                <!--</ul>-->
              <!--</dd>-->
            <!--</dl>-->
          <!--</el-popover>-->
          <el-popover
            ref="popover"
            v-model="showPopover"
            placement="bottom-start"
            popper-class="padding0">
            <div class="popover-selection" style="height:260px;overflow-y:auto">
              <dl v-for="group in models_grouped"
              :key="group.label">
                <dt>{{ group.label }}</dt>
                <dd v-for="item in group.options"
                :key="item.sub_model_id" @click="handle_selected_models(item.sub_model_id)">{{ item.sub_model_name }}</dd>
              </dl>
            </div>
          </el-popover>
          <span class="left">
          本品车型
          <button v-popover:popover>更换</button>
        </span>
          竞品车型
        </h3>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <dl v-if="sub_model">
            <dt>
              <span class="imgbox noborder">
                <img :src="sub_model.sub_model_logo_url || 'static/images/nocar.png'" alt="">
              </span>
              <cite>{{sub_model.sub_model_name}}</cite>
            </dt>
            <dd>
              <el-checkbox-group v-model="ruleForm.compete_model_ids">
                <div v-for="competitor in competitors">
                   <span :class="['imgbox', {'on': ruleForm.compete_model_ids.indexOf(competitor.sub_model_id) >= 0}]" >
                    <el-checkbox class="checkbox" :label="competitor.sub_model_id" @change="GET_SEARCH_DATA"> </el-checkbox>
                    <img :src="competitor.sub_model_logo_url || 'static/images/nocar.png'" alt="">
                  </span>
                  <cite>{{competitor.sub_model_name}}</cite>
                </div>
              </el-checkbox-group>

              <!-- 添加竞品 -->
              <el-popover
                ref="popover2"
                placement="bottom-start"
                title="标题"
                popper-class="padding0">
                <div>
                  123
                </div>
              </el-popover>
              <div v-if="0" class="add" v-popover:popover2>
                <font>+</font>
                添加竞品
              </div>
            </dd>
          </dl>
        </el-form>
      </div>
      <bi-panel :operating="false">
        <template slot="title">
          {{sub_model.sub_model_name}}与竞品车型总体配件价格比较
        </template>
        <div v-loading="loading" style="min-height: 300px">
          <div class="result" style="width: 100%" v-if="searchData.length">
            <bi-chart id="chart_a" :option="optionA" style="height: 500px;width:100%"></bi-chart>
          </div>
          <div class="result" v-else>
            <!-- 无结果 -->
           <template v-if="!loading">
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
  import BiChart from '@index/components/echart.vue'
  import BiEmpty from '@index/components/empty.vue'
  import mixin from '@index/config/mixin'
  import JQuery from 'jquery'

  export default {
    name: '',
    mixins: [mixin],
    data() {
      return {
        checkList: ['number1', 'number2'],
        sub_model: {},
        competitors: [],
        raw_models: [],
        part_date: [],
        model_id: this.$route.query.sub_model_id,
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
        searchData: [],
        optionA: {},
        manfs_group: [],
        letter_selected: {
          manfsBox: 'A',
        },
        manf_selected: '',
        showPopover: false,
        loading: true,
      }
    },
    mounted() {
      this.ruleForm.model_id = Number(this.model_id)
      this.GET_COMMON_VALID_DATE()
      this.GET_COMMON_MANFS_BRANDS()
      this.GET_COMMON_COMPETITORS()
    },
    computed: {
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
    watch: {
      models() {
        if (!!this.models) {
          this.sub_model = this.models[this.ruleForm.model_id] || {}
          if (!this.sub_model['sub_model_name']) {
            this.$router.replace({path: '/home'})
            return
          }
          this.handle_selected_models()
          this.GET_SEARCH_DATA()
        }
      }
    },
    methods:{
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
            formatter : function (params) {
              let html = ''
              for (let x in params) {
                let item = params[x]
                if (x == 0) {
                  html += item['name'] + '</br>'
                }
                if (item.seriesIndex < 2) {
                  html += item['seriesName'] + ':' + parseFloat(item['value']).toFixed(0) + '</br>'
                } else {
                  html += item['seriesName'] + ':' + item['value'] + '</br>'
                }
              }
              return html;
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
              data: this.model_data,
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
            right:30,
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
              "data": this.purch_price_data,
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
              },
              markLine : {
                label:{
                  normal:{
                    show: true,
                    position:'start',
                  }
                },
                lineStyle: {
                  normal: {
                    type: 'dashed',
                    color:'#f04048'
                  }
                },
                animationDuration:3000,
                data : [
                  {type : 'average', name: '平均值',valueIndex:1},
                ]
              },
            },
            {
              "name": "含税经销商销售价",
              "type": "bar",
              "data": this.sell_price_data,
              "barWidth": "40",
              "itemStyle": {
                "normal": {
                  "color": "#d1e0e7",
                  "barBorderRadius": 0,
                  "label": {
                    "show": true,
                    "position": "top",
                    color: '#666',
                    formatter: function(p) {
                      return p.value > 0 ? parseFloat(p.value).toFixed(2) : '';
                    }
                  }
                }
              },
              markLine : {
                lineStyle: {
                  normal: {
                    type: 'dashed',
                    color:'#f04048'
                  }
                },
                animationDuration:3000,
                label:{
                  normal:{
                    show: true,
                    position:'start',
                  }
                },
                data : [
                  {type : 'average', name: '平均值:' + '{b}:{c}',valueIndex:1},
                ]
              },
            },
            {
              "name": "加价率(%)",
              "type": "line",
              "yAxisIndex": 1,
              "data": this.rising_rate_data,
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
      selectLetter: function(boxId, letter, animate = true) {
        this.letter_selected[boxId] = letter
        var parent = document.querySelector('#' + boxId)
        if (!parent)return
        var target = parent.querySelector('[data-key="' + letter + '"]')
        , scrollTop = target.offsetTop - parent.offsetTop - 10;
        setTimeout(() => {
          if (animate) {
            JQuery('#' + boxId).animate({scrollTop: scrollTop}, 300, 'swing')
          } else {
            JQuery('#' + boxId).scrollTop(scrollTop)
          }
        }, 10)
      },
      selectManf(manf_name) {
        this.manf_selected = manf_name
        this.models_grouped[this.manf_selected]
      },
      selectModel(model_id, model_name) {
        this.$router.push({path: '/zhiku/sh/detail', query: {sub_model_id: model_id, spm: this.spm}})
      },

      handle_selected_models(model_id = '') {
        this.ruleForm.model_id = model_id || this.ruleForm.model_id
        this.sub_model = this.models[this.ruleForm.model_id] || {}
        this.competitors = this.models[this.ruleForm.model_id].competitors
        this.ruleForm.compete_model_ids = this.competitors.map(item => {
          return item.sub_model_id
        })
        this.GET_SEARCH_DATA()

        this.$router.push({path: '/zhiku/sh/detail', query: {sub_model_id: this.ruleForm.model_id}})
        this.showPopover = false
      },

      GET_COMMON_MANFS_BRANDS() {
        this.$request.get(this.$interface.GET_COMMON_MANFS_BRANDS, {
          header: {token: this.token}
        }, (response) => {
          this.manfs_group = response.data;
        }, this.failure);
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
      GET_SEARCH_DATA() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.$request.get(this.$interface.GET_PART_PRICE_SUM, {
              header: {token: this.token},                                  //通行令牌
              ym: this.this_year_month || '201801',                              //当前数据年月
              bp_sub_model_id: this.ruleForm.model_id,                      //本品子车型id
              jp_sub_model_ids: this.ruleForm.compete_model_ids.length
                ? this.ruleForm.compete_model_ids.join(',') : '',           //竞品子车型id
            }, (response) => {
              this.optionA = {}
              this.model_data = []
              this.purch_price_data = []
              this.sell_price_data = []
              this.rising_rate_data = []
              this.searchData = response.data || []
              if (this.searchData.length > 0) {
                this.searchData.map( item => {
                  this.model_data.push(item.sub_model_name)
                  this.purch_price_data.push(item.purch_price)
                  this.sell_price_data.push(item.sell_price)
                  this.rising_rate_data.push((item.rising_rate * 100).toFixed(2))
                })
              }
              this.$nextTick(function () {
                this.optionA = this.getOption();
                this.loading = false;
              })
            }, this.failure);
          } else {
            return false;
          }
        })
      }
    },
    components:{
      BiBar,
      BiPanel,
      BiChart,
      BiEmpty
    }
  }


</script>

<style lang="scss" type="text/scss" scoped>

</style>
