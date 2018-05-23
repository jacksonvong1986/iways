<template>

	<div class="cyc-cx">
    <bi-bar columnTitle="生命周期规划看板">
      <template slot="right">
        <el-breadcrumb separator="/">
          <span class="bread-legend">当前位置：</span>
          <el-breadcrumb-item :to="{ path: '/' }">概览主页</el-breadcrumb-item>
          <el-breadcrumb-item> 年款配置优化支持系统</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
    </bi-bar>

    <div class="content">
      <bi-panel :operating="false">
        <template slot="title">
          请选择品牌车型
        </template>

        <div class="cyc-cx-tab">
          <el-tabs type="border-card">
            <el-tab-pane>
              <div class="label" slot="label"><img src="/static/images/linshi/u152.png" alt="别克" />别克</div>
              <div class="cont">
                <div class="prev"><i class="el-icon-arrow-left disabled"></i></div>

                <div class="box">
                  <span @click="" v-for="item in 7">
                    <img src="/static/images/linshi/hafuoH6.jpg" alt="">
                    威朗
                  </span>
                </div>

                <div class="next"><i class="el-icon-arrow-right"></i></div>
              </div>
            </el-tab-pane>
            <el-tab-pane>
              <div class="label" slot="label"><img src="/static/images/linshi/u152.png" alt="雪佛兰" /> 雪佛兰</div>
              <div class="cont">
                雪佛兰
              </div>
            </el-tab-pane>
            <el-tab-pane>
              <div class="label" slot="label"><img src="/static/images/linshi/u152.png" alt="凯迪拉克"/> 凯迪拉克</div>
              <div class="cont">
                凯迪拉克
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </bi-panel>

      <bi-panel :operating="false">
        <template slot="title">
          别克 威朗 车型规划
        </template>
        <template slot="others">
          <span class="box" style="float: left; margin-right: 40px;">
            <font class="cyc-cx-btn_small on" style="margin: 1px 1px 0 0;">月度</font>
            <font class="cyc-cx-btn_small" style="margin: 1px 0 0 0;">季度</font>
          </span>
          <span class="upload">
            <i class="iconfont icon-xiazai"></i>下载
          </span>
        </template>
        <div class="cyc-cx-plan">
          <div class="cyc-cx-title">
            <span class="box">
              请选择竞品：
              <el-select
                size="mini"
                v-model="value"
                multiple
                collapse-tags
                placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
            <span class="box">
              请选择时间：
             <el-date-picker
               style="width: 300px"
               size="mini"
               v-model="value2"
               type="daterange"
               align="center"
               unlink-panels
               range-separator="至"
               start-placeholder="开始日期"
               end-placeholder="结束日期">
             </el-date-picker>
            </span>
          </div>

          <h3>
            变化描述：
            <i class="red"></i>全新NEW
            <i class="blue"></i>换代NG
            <i class="green"></i>年款MY
            <i class="orange"></i>改款MCE
          </h3>

        </div>
      </bi-panel>
      <div id="countryChart" style="width: 100%; height: 500px"></div>

      <router-link to="#" class="cyc-cx-btn">去配置自造车清单</router-link>
    </div>
	</div>

</template>

<script type="text/ecmascript-6">
  import BiBar from '@index/components/bar.vue'
  import BiPanel from '@index/components/panel.vue'
  import echarts from 'echarts'


  export default {
    name: '',
    data () {
      return {
        options: [{
          value: '选项1',
          label: '奔驰'
        }, {
          value: '选项2',
          label: '宝马'
        }, {
          value: '选项3',
          label: '奥迪'
        }, {
          value: '选项4',
          label: '长安'
        }, {
          value: '选项5',
          label: '英菲尼迪'
        }],
        value: [],
        value2: [],
      }
    },
    mounted(){
      this.initChart()
    },
    methods:{
      initChart(){
        var myBgColor=['rgba(230,56,16,0.2)','rgba(255,107,0,0.2)','rgba(227,182,31,0.2)','rgba(19,181,177,0.2)'];

        let myChart = echarts.init(document.getElementById('countryChart'))
        let option = {
          title: {
            text: '最近上映电影',
            left: '50%',
            textAlign: 'center'
          },
          grid: {
            left: 0,
            right: 20,
            bottom: 100,
            top: 30
          },
          xAxis: {
            data: []
          },
          yAxis: {
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            }
          },
          series: [{
            type: 'bar',
            barWidth: 40,
            itemStyle: {
              normal: {
                show: true,
                color: function(params) {
                  console.log(params)
                  var num=myBgColor.length;
                  return myBgColor[params.dataIndex%num]
                },
                borderWidth: 0,
                borderColor: '#333',
              }
            },
            data: [-10,-20,-33],
            label: {
              normal: {
                show: true,
                position: 'bottom',
                color: '#5faabd',
                backgroundColor:'rgba(95,170,189,.6)',
                distance:0,
                formatter: [
                  '{abg|NEW}'
                ].join('\n'),
                backgroundColor: '#eee',
                rich: {
                  title: {
                    color: '#eee',
                    align: 'center'
                  },
                  abg: {
                    color: '#eee',
                    width: 40,
                    height: 40,
                    backgroundColor: 'rgba(95,170,189,.9) ',
                    align: 'center',
                  }
                }
              },
            },

            animationDelay: function(idx) {
              return idx * 100;
            }
          }]
        };




        myChart.setOption(option);
      },

    },
    components:{
      BiBar,BiPanel,echarts
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  /*
  optimize/lifeCycle/Block

  optimize/selfmade/price
  optimize/selfmade/model
  optimize/selfmade/list
  optimize/selfmade/preview

  optimize/improveSet/userNeed
  optimize/improveSet/detail

  record/overview

  record/selfmade
  record/selfmade/detail

  record/collect
  record/collect/detail

  */

</style>
