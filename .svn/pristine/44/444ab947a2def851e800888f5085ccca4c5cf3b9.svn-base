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
      <!--<div class="cyc-cx-need">-->
        <!--<h2>-->
          <!--用户需求-->
        <!--</h2>-->
      <!--</div>-->

      <div class="cyc-cx-condition">
        <div>
          <span>
            月份：<cite>2018-2</cite>
            本品：<cite>威朗</cite>
          </span>
          <span style="margin-left: 20px">
            竞品：
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
          <span class="btn on">添加对标车型</span>
        </div>
      </div>

      <bi-panel :operating="false">
        <template slot="title">
          关注点及评价
        </template>
        <template slot="others">
        <span class="download">
          <i class="iconfont icon-xiazai"></i>下载
        </span>
        </template>
        <div class="cyc-cx-att">
          <h4>
            <span class="on">关注度</span>
            <span>满意度</span>
          </h4>
          <dl class="left">
            <dt>平均</dt>
            <dd><span><em style="width: 40%;"></em></span><cite>40%</cite></dd>
            <dd><span><em style="width: 25%"></em></span><cite>25%</cite></dd>
            <dd><span><em style="width: 68%;"></em></span><cite>68%</cite></dd>
            <dd><span><em style="width: 38%"></em></span><cite>38%</cite></dd>
            <dd><span><em style="width: 75%"></em></span><cite>75%</cite></dd>
            <dd><span><em style="width: 26%;"></em></span><cite>26%</cite></dd>
            <dd><span><em style="width: 42%"></em></span><cite>42%</cite></dd>
            <dd><span><em style="width: 29%"></em></span><cite>29%</cite></dd>
            <dd><span><em style="width: 57%;"></em></span><cite>57%</cite></dd>
            <dd><span><em style="width: 43%"></em></span><cite>43%</cite></dd>
          </dl>
          <ul>
            <li>整体</li>
            <li>动力</li>
            <li>内饰</li>
            <li>空间</li>
            <li>外观</li>
            <li>经济性</li>
            <li>舒适性</li>
            <li>操控性</li>
            <li>安全性</li>
            <li>信息娱乐性</li>
          </ul>
          <dl class="right">
            <dt>威朗</dt>
            <dd><span><em style="width: 23%"></em></span><cite>23%</cite></dd>
            <dd><span><em style="width: 44%;"></em></span><cite>44%</cite></dd>
            <dd><span><em style="width: 31%"></em></span><cite>31%</cite></dd>
            <dd><span><em style="width: 26%"></em></span><cite>26%</cite></dd>
            <dd><span><em style="width: 62%"></em></span><cite>62%</cite></dd>
            <dd><span><em style="width: 38%;"></em></span><cite>38%</cite></dd>
            <dd><span><em style="width: 77%"></em></span><cite>77%</cite></dd>
            <dd><span><em style="width: 35%;"></em></span><cite>35%</cite></dd>
            <dd><span><em style="width: 49%"></em></span><cite>49%</cite></dd>
            <dd><span><em style="width: 22%;"></em></span><cite>22%</cite></dd>
          </dl>
        </div>
      </bi-panel>
      <router-link :to="{ path: '/zhice/cx/optimize/improveset/setvb'}" class="cyc-cx-btn">查看具体配置优化策略</router-link>
      <router-link :to="{ path: '/zhice/cx/optimize/selfmade/setvc'}" class="cyc-cx-btn_back">去配置自造车清单</router-link>
    </div>
	</div>

</template>

<script type="text/ecmascript-6">
  import BiBar from '@index/components/bar.vue'
  import BiPanel from '@index/components/panel.vue'

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
      BiBar,BiPanel
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>

</style>
