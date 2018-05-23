<template>
  <iframe src="http://car.waysdata.com/product/SelectModelController!main.do?urlPath=product/configComparison.do&locale=zh_CN" 
  style="width:100%;height:764px;padding-top:51px;border:0;"></iframe>
</template>

<script>
export default {
  destroyed(){
    this.$emit('panelStyle', true)
  },
  mounted() {
    this.$emit('panelStyle', false)
  }
}
</script>