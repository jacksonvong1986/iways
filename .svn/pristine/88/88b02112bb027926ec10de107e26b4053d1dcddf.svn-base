<template>
  <iframe :src="page_url" :style="{width:'100%', height:height, paddingTop:'51px', border:0}"></iframe>
</template>

<script>
export default {
  data() {
    return {
      height: '765px',
      base_url: '/hangye.html',
      page_url: '',
    }
  },
  destroyed(){
    this.$emit('panelStyle', true)
  },
  mounted() {
    this.height = (window.innerHeight - 5) + 'px'
    this.page_url = this.base_url + this.getHash()
    this.$emit('panelStyle', false)
  },
  watch: {
    $route() {
      this.page_url = this.base_url + this.getHash()
    }
  },
  methods: {
    getHash() {
      let urls = this.$route.path.split('/')
      , hash = ''
      if (urls && urls.length == 4) {
        hash = urls[urls.length - 1]
      }
      hash = hash == '' ? '#/home' : '#/' + hash
      return hash
    }
  }
}
</script>