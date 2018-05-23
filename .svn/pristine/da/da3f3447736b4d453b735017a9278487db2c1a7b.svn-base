<template>
  <div id="app">
    <el-scrollbar :style="{height: windowHeight + 'px'}">
      <router-view></router-view>
    </el-scrollbar>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return{
        windowHeight: document.documentElement.clientHeight || document.body.clientHeight,
      }
    },
    mounted(){
      window.addEventListener('resize', this.windowChange);
    },
    beforeDestroy(){
      window.removeEventListener('resize', this.windowChange);
    },
    methods:{
      windowChange: function () {
        this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  #app {
    height: 100%;position: relative; min-width: 1200px;
  }
</style>
