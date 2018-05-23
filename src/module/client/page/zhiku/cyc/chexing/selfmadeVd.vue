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
        <div class="cyc-cx-title">
          <span>请选择品牌车型</span>
          <ul class="step-card">
            <li class="active">01价格段销量分布</li>
            <li class="active">02型号竞争分析</li>
            <li class="active">03配置自造车清单</li>
            <li class="active">04预览并提交</li>
          </ul>
          <span class="upload">
            <i class="iconfont icon-xiazai"></i>下载
          </span>
        </div>
      </bi-panel>
      <bi-panel :operating="false">
        <template slot="title">PVA结果指标</template>
        <div slot="others">
          <router-link to="target/list" class="cyc-cx-step-btn on">去PVA分析</router-link>
        </div>
        <div class="sheet">
          <el-row class="first">
            <el-col :span="12">新型号PVA（VS旧款）：</el-col>
            <el-col :span="12">新型号PVA（VS竞争圏     ）：</el-col>
          </el-row>
          <el-row class="second">
            <el-col :span="12">
              <div class="meter blue">
                <p>指导价</p>
                <div></div>
                <span>95.6%</span>
              </div>
              <div class="meter red">
                <p>指导价</p>
                <div></div>
                <span>95.6%</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="meter blue">
                <p>指导价</p>
                <div></div>
                <span>95.6%</span>
              </div>
              <div class="meter red">
                <p>指导价</p>
                <div></div>
                <span>95.6%</span>
              </div>
            </el-col>
          </el-row>
        </div>

      </bi-panel>
      <bi-panel :operating="false">
        <template slot="title">请选择详细配置清单</template>
        <div slot="others">
          <router-link to="target/list" class="cyc-cx-step-btn on">查看配置优化策略详情</router-link>
        </div>
        <table class="cyc-cx-table">
          <thead>
          <tr>
            <th colspan="2">配置列表 <span class="legend">图例：●标配 ○选配 -无</span></th>
            <th colspan="2">装备情况</th>
            <th>配置优化策略</th>
            <th colspan="5">参考信息</th>
          </tr>
          <tr>
            <th width="10%"></th>
            <th width="10%">新型号</th>
            <th width="10%">目标型号旧款 <br>
              威朗 2018 1.5T 双离合 20T 精英型
            </th>
            <th width="10%">对比型号 <br>
              速腾 2018 1.4T 双离合 280TSI 舒适型
            </th>
            <th width="10%">增配/减配/维持</th>
            <th width="10%">缺失配置抱怨比例</th>
            <th width="10%">竞争圈装备率</th>
            <th width="10%">近三年装备率平均增速（细分市场）</th>
            <th width="10%">近一年上市新车搭载率</th>
            <th width="10%">消费者需求</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td colspan="2" @click="spreadEvent" class="tagTit">
              <i :class="spread ? 'el-icon-remove on' : 'el-icon-circle-plus'"></i>内部装备
            </td>
          </tr>
          <tr v-if="spread">
              <td>一键启动</td>
              <td><el-select
                size="mini"
                v-model="value"
                collapse-tags
                placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select></td>
              <td>● ○ -</td>
              <td>● ○ -</td>
              <td class="danger">增配（★★★）</td>
              <td>12%</td>
              <td>12%</td>
              <td>12%</td>
              <td>-</td>
              <td>渴望配置</td>
            </tr>
          <tr v-if="spread">
              <td>一键启动</td>
              <td><el-select
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
              </el-select></td>
              <td>● ○ -</td>
              <td>● ○ -</td>
              <td class="success">增配（★★★）</td>
              <td>12%</td>
              <td>12%</td>
              <td>12%</td>
              <td>-</td>
              <td>渴望配置</td>
            </tr>
          </tbody>
        </table>
      </bi-panel>

      <router-link to="#" class="cyc-cx-btn">提交完成</router-link>
      <router-link to="setvc" class="cyc-xl-btn_back">上一步：配置自造车清单</router-link>

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
        spread: true,
        value: [],

        options: [{
          value: '选项1',
          label: '●'
        }, {
          value: '选项2',
          label: '○'
        }, {
          value: '选项3',
          label: '-'
        }],
      }
    },
    methods: {
      spreadEvent() {
        this.spread = !this.spread
      }
    },
    components:{
      BiBar,BiPanel,echarts
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "~@index/assets/scss/mixin";
  .legend{color: #999;font-size: 12px;font-weight: normal;}
  .sheet{text-align: center;
    .first{
      border-bottom: 1px solid #ebeef5;
      .el-col{padding: 10px 0;font-weight: bold;}
      .el-col:first-child{border-right: 1px solid #ebeef5;}
    }
    .second{
      .el-col{padding: 16px 12%}
      .el-col:first-child{border-right: 1px solid #ebeef5;}
    }
  }
  .meter{
    p{color: #999;padding-bottom: 6px;}
    div{border-radius: 50%;border: 4px solid #0080c1;width: 60px;height: 60px;}
  }
  .meter.blue{
    float: left;
    div{border: 4px solid #0080c1;}
    span{color: #0080c1;line-height: 28px;}
  }
  .meter.red{
    float: right;
    div{border: 4px solid #e60012;}
    span{color: #e60012;line-height: 28px;}
  }
  .cyc-cx-table{
    text-align: center;border-left: 1px solid #eee; color: #555;border-collapse: collapse;
    thead{
      tr{height: 50px;}
      th{border-right: 1px solid #f6f6f6;border-bottom: 1px solid #f6f6f6; font-weight: 700;}
    }
    tbody{
      tr{height: 40px;}
      td{
        @include font-adjust(13px, 1.5, #666);
        border: 1px solid #eee;
      }
      a{@include a-style($underLine:none);}
    }
    .tagTit{font-weight: bold;cursor: pointer;border: none;
      i{font-size: 16px;margin-right: 4px;}
    }
    .success{color: #8fc31f;}
    .danger{color: #e60012;}
  }
</style>
