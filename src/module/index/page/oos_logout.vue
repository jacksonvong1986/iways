<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
  	var domain = 'http://dss.ways.cn'
    window.location.href = domain + this.$interface.CAS_LOGOUT
  }
}
</script>