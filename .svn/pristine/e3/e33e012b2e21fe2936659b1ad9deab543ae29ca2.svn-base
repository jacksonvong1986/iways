<template>

  <div>
    <bi-bar columnTitle="目标制定">
      <template slot="button">
        <span class="mgr20 mgl10">时间：{{ year_month }}</span>
        <span class="mgr20">管理维度：{{ dimension_name }}</span>
        <span class="mgr20">管理类型：{{ manage_type }}</span>
      </template>
      <template slot="right">
        <el-breadcrumb separator="/">
          <span class="bread-legend">当前位置：</span>
          <el-breadcrumb-item :to="{ path: '/' }">概览主页</el-breadcrumb-item>
          <el-breadcrumb-item> 销量目标管理</el-breadcrumb-item>
          <el-breadcrumb-item> 区域 - 目标制定</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
    </bi-bar>

    <div class="content">

      <div class="cyc-xl-step-end">
        <div class="step-status">
          <i class="iconfont icon-check"></i>
        </div>
        <h2>目标制定及下发成功！</h2>
        <p>您的目标制定及下发成功，流水号：<cite>{{ serial_number }}</cite>，请通知区域管理者查看目标。</p>
      </div>
      <div style="text-align: center">
        <router-link :to="{path: 'detail', query: {serial_number: serial_number}}" class="cyc-xl-btn">查看当前定制的目标</router-link>
        <router-link to="setva" class="cyc-xl-btn_back">继续制定新目标</router-link>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import BiBar from '@index/components/bar.vue'
  import BiPanel from '@index/components/panel.vue'
  import sales from './_mixin'

  export default {
    name: '',
    mixins: [sales],
    data() {
      return {
        serial_number: this.$route.query.serial_number || ''
      }
    },
    mounted() {
      this.$emit('panelStyle', false)
    },
    destroyed(){
      this.$emit('panelStyle', true)
    },
    components:{
      BiBar,
      BiPanel,
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>

</style>
