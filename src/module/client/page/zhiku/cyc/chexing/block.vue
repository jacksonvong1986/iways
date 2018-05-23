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
          <div class="pane">
            <span class="on" @click="tabEvent"><img src="/static/images/linshi/u152.png" alt="别克" />别克</span>
            <span><img src="/static/images/linshi/u152.png" alt="别克" />雪佛兰</span>
            <span><img src="/static/images/linshi/u152.png" alt="别克" />别克</span>
          </div>
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
        </div>
      </bi-panel>

      <bi-panel :operating="false">
        <div class="cyc-cx-title">
          <span>别克 威朗 与竞品新车规划</span>
          <span class="box">
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
          <span class="box">
            <font class="cyc-cx-btn_small on">月度</font>
            <font class="cyc-cx-btn_small">季度</font>
          </span>
          <span class="box">
              <el-select
                size="mini"
                v-model="value"
                multiple
                collapse-tags
                placeholder="选择竞品">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
          <span class="upload">
            <i class="iconfont icon-xiazai"></i>下载
          </span>
        </div>
        <h3 class="cyc-cx-plan">
          变化描述：
          <i class="red"></i>全新NEW
          <i class="blue"></i>换代NG
          <i class="green"></i>年款MY
          <i class="orange"></i>改款MCE
        </h3>
        <div id="countryChart" style="width: 100%; height: 500px"></div>

      </bi-panel>

      <router-link to="cx/optimize/selfmade" class="cyc-cx-btn">去选择价格段</router-link>
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
      tabEvent(){

      },
      initChart(){
        var myBgColor=['rgba(230,56,16,0.2)','rgba(255,107,0,0.2)','rgba(227,182,31,0.2)','rgba(19,181,177,0.2)'];

        var data = {
          title: ['总计', '12-01', '12-02', '12-03', '12-04', '12-05', '12-06', '12-07', '12-08', '12-09'],
          plan_production: [500, 300, 490, 333, 346, 777, 888, 864, 789, 765],
          actual_production: [300, 400, 500, 300, 400, 500, 300, 400, 500, 500],
          attainment_rate: [60, 80, 90, 60, 70, 80, 90, 60, 70, 90],
          productivity: [30, 45, 88, 100, 110, 70, 80, 90, 100, 100],
          date: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        };

        for (var pr in data) {
          data[pr] = data[pr].slice(1, -1);
        }
        function getTableLine(num) {
          var list = [];
          var top = 232;
          var height = 40;
          for (var i = 0; i < num; i++) {
            list.push({
              type: 'line',
              top: top + i * height,
              style: {
                stroke: 'rgba(229,242,249,0.9)'
              },
              shape: {
                x1: 0,
                y1: 0,
                x2: 3200,
                y2: 0
              }

            });
          }
          return list;
        }
        var lineList = getTableLine(5);
        console.log(lineList)
        let myChart = echarts.init(document.getElementById('countryChart'))
        let option = {
          title: [{
            text: ' \n竞品（高尔夫，速腾）\n高尔夫\n速腾',
            top: 190,
            left: 10,
            textStyle: {
              lineHeight: 40,
              fontSize: 13,
              fontWeight: 'normal',
              formatter: function(value) {
                return '{table|' + value + '}';
              },
              rich: {
                table: {
                  align: 'center'
                }
              }
            }
          }],
          legend: {
            data: ['计划数量', '实际产出', '达成率', '生产效率']
          },
          grid: {
            bottom: 150,
            left: 80,
            right: 80
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {}
            }
          },
          dataZoom: {
            show: true,
            start: 0,
            end: 50,
            maxSpan: 80
            // zoomLock: true
          },
          xAxis: [{
            type: 'category',
            show: false,
            boundaryGap: true,
            data: data.title,
            axisTick: {
              length: 108
            },

          }],
          yAxis: [{
            show: false,
            type: 'value',
            scale: true,
            minInterval: 1,
            min: -10,
            max: 0,
            name: '数量',
            splitLine: {
              show: false
            }
          }],
          series: [
            {
              name: '基准线',
              type: 'line',
              color: '#f2f2f2',
              symbolSize:10,
              showAllSymbol :true,
              label: {
                show: true,
                position: 'bottom',
                formatter: '{c}'
              },
              itemStyle:{
                color:'red'
              },
              data: [-4,-4,-4,-4,-4,-4],

            },
            {
              barWidth:'40',
              name: 'SEI值',
              type: 'bar',
              stack: 'total',
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
                  rich: {
                    title: {
                      color: '#eee',
                      align: 'center'
                    },
                    abg: {
                      color: '#eee',
                      width: 40,
                      height: 40,
                      backgroundColor: 'rgba(95,170,189,.9)',
                      align: 'center',
                    }
                  }
                },
              },
              itemStyle: {
                normal: {
                  show: true,
                  color: function(params) {
                    console.log(params)
                    var num=myBgColor.length;
                    return myBgColor[params.dataIndex%num]
                  },
                }
              },
              data: [-2, -6, -7.4, -8.8,-10.2,-11.6]  //1.4
            }
          ],
          graphic: lineList
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
  .cyc-cx-title .box{margin-left: 20px;}
</style>
