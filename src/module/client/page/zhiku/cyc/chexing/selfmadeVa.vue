<template>

  <div class="cyc-cx">
    <bi-bar columnTitle="自造车配置">
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

        </template>
        <template slot="others">
        </template>
        <div class="cyc-cx-title">
          <span>请选择品牌车型</span>
          <ul class="step-card">
            <li class="active">01价格段销量分布</li>
            <li>02型号竞争分析</li>
            <li>03配置自造车清单</li>
            <li>04预览并提交</li>
          </ul>

          <span class="upload">
            <i class="iconfont icon-xiazai"></i>下载
          </span>
        </div>
        <div class="cyc-cx-tab">
          <div class="form_bar">
            <el-row>
              <el-col :span="6">
                选择车型：
                <el-select
                  class="selected"
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
              </el-col>
              <el-col :span="6">
                选择时间：
                <el-date-picker
                  size="mini"
                  v-model="value2"
                  type="daterange"
                  align="center"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-col>
              <el-col :span="8">
                价格段：
                <input type="text" class="mini_input">万 ~ <input type="text" class="mini_input">万
              </el-col>
              <el-col :span="4">
                <input type="number" class="mini_input">
                <span class="cyc-cx-btn_small on">确定</span>
              </el-col>
            </el-row>
          </div>


          <table class="cyc-xl-table_vc">
            <thead>
            <tr>
              <th rowspan="2">价格段（TP）</th>
              <th colspan="3">细分市场</th>
              <th colspan="4">威朗</th>
              <th colspan="5">竞争格局</th>
            </tr>
            <tr>
              <th>销量</th>
              <th>销量同比增速</th>
              <th>份额</th>
              <th>销量</th>
              <th>销量同比增速</th>
              <th>市场份额</th>
              <th>相对市场份额</th>
              <th>排名</th>
              <th>车型</th>
              <th>销量</th>
              <th>销量同比增速</th>
              <th>市场份额</th>
            </tr>
            </thead>
            <tbody>
            <tr >
              <td rowspan="5">销量</td>
              <td rowspan="5">销量</td>
              <td rowspan="5">销量</td>
              <td rowspan="5">销量</td>
              <td rowspan="5">销量</td>
              <td rowspan="5">销量</td>
              <td rowspan="5">销量</td>
              <td rowspan="5">销量</td>
              <td>销量</td>
              <td>销量</td>
              <td>销量</td>
              <td>销量</td>
              <td>销量</td>
            </tr>
            <tr >
              <td>销量</td>
              <td>销量</td>
              <td>销量</td>
              <td>销量</td>
              <td>销量</td>
            </tr><tr >
              <td>销量</td>
              <td>销量</td>
              <td>销量</td>
              <td>销量</td>
              <td>销量</td>
            </tr><tr >
              <td>销量</td>
              <td>销量</td>
              <td>销量</td>
              <td>销量</td>
              <td>销量</td>
            </tr>
            </tbody>
          </table>
        </div>
      </bi-panel>

      <router-link :to="{ path: '/zhice/cx/optimize/selfmade/setvb'}" class="cyc-cx-btn">下一步：型号分析</router-link>
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
    components:{
      BiBar,BiPanel,echarts
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "~@index/assets/scss/mixin";
  .selected .el-input__inner{width: 60px;border-radius: 4px;border: 1px solid #339acd;}
  .mini_input{width: 60px;border: 1px solid #339acd;outline: none;padding: 0 6px;height: 30px;}
  .form_bar{padding: 10px 20px;}
  .cyc-cx-tab{}
</style>
