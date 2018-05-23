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

    <div class="content cyc-cx-tab">
      <bi-panel :operating="false">
        <div class="cyc-cx-panelTit">
          <span>用户需求</span>
          <div class="pane">
            <span class="on">缺失配置抱怨点</span>
            <span>竞争对比</span>
            <span>行业趋势</span>
          </div>
        </div>
        <div class="">

        </div>
        <el-row class="complain_sheet">
          <el-col :span="6">月份：<span>别克 威朗</span></el-col>
          <el-col :span="6">本品型号：<el-select
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
          <el-col :span="6">竞品：<span>14~15万</span></el-col>
        </el-row>
        <div>

        </div>
      </bi-panel>
      <bi-panel :operating="false">
        <div class="cyc-cx-panelTit">
          <span>配置分类</span>
          <div class="pane">
            <span class="on">整体</span>
            <span>参数</span>
            <span>底盘&动力</span>
            <span>安全</span>
            <span>外部装备</span>
            <span>内部装备</span>
            <span>功能</span>
            <span>娱乐/信息</span>
          </div>
        </div>
        <div class="config_sheet">
          <ul>
            <li>内部装备</li>
            <li>
              <dl>
                <dt>配置列表</dt>
                <dd>一键启动</dd>
                <dd>无钥匙进入</dd>
                <dd>自动空调</dd>
                <dd>雨量感应式雨刮</dd>
              </dl>
            </li>
            <li>
              <el-scrollbar style="height: 100%; width: 100%">
                <div>
                  <dl>
                    <dt>配置列表</dt>
                    <dd>一键启动</dd>
                    <dd>无钥匙进入</dd>
                    <dd>自动空调</dd>
                    <dd>雨量感应式雨刮</dd>
                  </dl>
                  <dl>
                    <dt>配置列表</dt>
                    <dd>一键启动</dd>
                    <dd>无钥匙进入</dd>
                    <dd>自动空调</dd>
                    <dd>雨量感应式雨刮</dd>
                  </dl>
                  <dl>
                    <dt>配置列表</dt>
                    <dd>一键启动</dd>
                    <dd>无钥匙进入</dd>
                    <dd>自动空调</dd>
                    <dd>雨量感应式雨刮</dd>
                  </dl>
                  <dl>
                    <dt>配置列表</dt>
                    <dd>一键启动</dd>
                    <dd>无钥匙进入</dd>
                    <dd>自动空调</dd>
                    <dd>雨量感应式雨刮</dd>
                  </dl>
                  <dl>
                    <dt>配置列表</dt>
                    <dd>一键启动</dd>
                    <dd>无钥匙进入</dd>
                    <dd>自动空调</dd>
                    <dd>雨量感应式雨刮</dd>
                  </dl>
                  <dl>
                    <dt>配置列表</dt>
                    <dd>一键启动</dd>
                    <dd>无钥匙进入</dd>
                    <dd>自动空调</dd>
                    <dd>雨量感应式雨刮</dd>
                  </dl>
                  <dl>
                    <dt>配置列表</dt>
                    <dd>一键启动</dd>
                    <dd>无钥匙进入</dd>
                    <dd>自动空调</dd>
                    <dd>雨量感应式雨刮</dd>
                  </dl>
                  <dl>
                    <dt>配置列表</dt>
                    <dd>一键启动</dd>
                    <dd>无钥匙进入</dd>
                    <dd>自动空调</dd>
                    <dd>雨量感应式雨刮</dd>
                  </dl>
                </div>
              </el-scrollbar>
            </li>
          </ul>
        </div>
      </bi-panel>
      <router-link :to="{ path: '/zhice/cx/optimize/selfmade/setvc'}" class="cyc-cx-btn">去配置自造车清单</router-link>
      <router-link to="setva" class="cyc-cx-btn_back">返回上一步</router-link>
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
  @import "~@index/assets/scss/mixin";
  .complain_sheet{font-weight: 700;padding: 20px 41px;}
  .pane{border: none}
  .config_sheet ul{
    text-align: center;display: flex;
    li{float: left;font-weight: 700;color: #339acd;}
    li:nth-child(1){background: #e5f2f9;display: flex;align-items: center;justify-content: center;width: 20%;}
    li:nth-child(2){width: 30%;}
    li:nth-child(3){
      white-space: nowrap;width: 50%;
      dl{display: inline-block;width: 50%;}
    }
    dt{font-weight: 700;padding: 20px 0;border-bottom: 1px solid #ebeef5;}
    dd{border-bottom: 1px solid #ebeef5;padding: 16px 0;}
    dl dd:last-child{border: none}
  }
</style>
