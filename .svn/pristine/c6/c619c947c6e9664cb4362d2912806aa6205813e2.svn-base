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
      <bi-panel :operating="false" class="sheet">
        <div class="cyc-cx-title">
          <span>请选择品牌车型</span>
          <ul class="step-card">
            <li class="active">01价格段销量分布</li>
            <li class="active">02型号竞争分析</li>
            <li>03配置自造车清单</li>
            <li>04预览并提交</li>
          </ul>
          <span class="upload">
            <i class="iconfont icon-xiazai"></i>下载
          </span>
        </div>
        <div class="cyc-cx-tab">
          <el-row class="edge border_bottom">
            <el-col :span="6"><span>已选择</span></el-col>
            <el-col :span="6">车型：<span>别克 威朗</span></el-col>
            <el-col :span="6">时间：<span>2018-12</span></el-col>
            <el-col :span="6">价格段：<span>14~15万</span></el-col>
          </el-row>
          <p class="edge">
            <span>选择型号</span>
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
          </p>
        </div>
      </bi-panel>
      <bi-panel :operating="false">
        <table class="selfmadeTable">
          <thead>
          <tr>
            <th width="8">排名</th>
            <th width="8">车型</th>
            <th width="8">款型</th>
            <th width="8">销量</th>
            <th width="8">销量同比增速</th>
            <th width="8">市场份额</th>
          </tr>
          </thead>
          <tbody>
          <tr class="selfRow">
            <td><span>1</span></td>
            <td>销量</td>
            <td><i class="iconfont icon-radio-button-on"></i>
              <span class="checkbox"></span></td>
            <td>销量</td>
            <td>销量</td>
            <td>销量</td>
          </tr>
          <tr>
            <td><span>2</span></td>
            <td>销量</td>
            <td><i class="iconfont icon-radio-button-on"></i>
              <span class="checkbox"></span></td>
            <td>销量</td>
            <td>销量</td>
            <td>销量</td>
          </tr>
          <tr>
            <td><span>2</span></td>
            <td>销量</td>
            <td><i class="iconfont icon-radio-button-on"></i>
              <span class="checkbox"></span></td>
            <td>销量</td>
            <td>销量</td>
            <td>销量</td>
          </tr>
          </tbody>
        </table>
      </bi-panel>



      <router-link to="setvc" class="cyc-cx-btn">下一步：自造车</router-link>
      <router-link to="setva" class="cyc-xl-btn_back">上一步：选择价格段</router-link>

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
        value: [],
        radio: [],

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
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 3) {
          return 'stick';
        } else if (rowIndex === 3) {
          return 'second';
        }
        return '';
      }
    },
    components:{
      BiBar,BiPanel,echarts
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "~@index/assets/scss/mixin";
  .step-tit{
    display: flex;border-bottom: 1px solid #ebeef5;background: #fcfcfc;line-height: 28px;
    span{font-size: 15px;font-weight: 700;}
  }
  .step-card{
    display: flex;justify-content:space-around;line-height: 30px;color: #0080c1;flex: 1;font-size: 12px;margin: 0 20px;
    li{
      position: relative;background: #e5f2f9;flex: 1;margin-right: 15px;text-align: center;padding-left: 15px;
      &:before{@include regulaTriangle(right,#fff,15px);content: '';position: absolute;left: 0;top: 0;}
      &:after{@include regulaTriangle(right,#e5f2f9,15px);content: '';position: absolute;right: -30px;top: 0;}
    }
    li.active{
      background: #339acd;color: #fff;
      &:after{@include regulaTriangle(right,#339acd,15px);content: '';position: absolute;right: -30px;top: 0;}
    }
  }

  .sheet{
    span{font-size: 15px;font-weight: 700;}
  }

  .edge{padding: 10px 20px;}
  .selfmadeTable{
    text-align: center;
    & tr{height: 60px;border-bottom: 1px solid #ebeef5;}
  }
  .selfmadeTable tbody tr:nth-of-type(1) td:nth-child(1) span{border-radius: 50%;background: #0080c1;width: 22px;height: 22px;color: #fff;display: inline-block;}
  .selfmadeTable tbody tr:nth-of-type(2) td:nth-child(1) span{border-radius: 50%;background: #e60012;width: 22px;height: 22px;color: #fff;display: inline-block;}
  .selfmadeTable tbody tr:nth-of-type(3) td:nth-child(1) span{border-radius: 50%;background: #f8b551;width: 22px;height: 22px;color: #fff;display: inline-block;}
  .selfmadeTable tbody tr:nth-of-type(4) td:nth-child(1) span{border-radius: 50%;background: #8fc31f;width: 22px;height: 22px;color: #fff;display: inline-block;}
  .selfmadeTable tbody tr .checkbox{display: inline-block;width: 12px;height: 12px;border: 2px solid #0080c1;border-radius: 50%;}
  .selfRow{background: #e5f2f9;}
  .el-table .first{background: red}
  .border_bottom{border-bottom: 1px solid #ebeef5;}
</style>
