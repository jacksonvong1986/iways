<style lang="stylus" scoped>
.chart-main
  height 380px
  width 100%
  background #fff
  background-size 100% 100%
  color black
  clear both
</style>

<template>
  <div :id="id" class="chart-main" :option="option" :events="events" :style="styles"></div>
</template>

<script>
  import echarts from 'echarts'
  import bus from '@/config/eventBus'

  export default {
    name: 'BiChart',
    data() {
      return {
      }
    },
    props: {
      id: {
        type: String,
        required: true,
      },
      option: {
        type: Object,
        required: true,
        default: {}
      },
      styles: {
        type: String,
        default: '',
      },
      events: {
        type: Object,
        required: false,
        default: () => {
          return {}
        }
      }
    },
    mounted() {
    },
    methods: {
      init() {
        window.addEventListener('resize', function() {
          this.myChart.resize()
        }.bind(this))
        var myChart = this.myChart
        bus.$on('ResizeChart', function() {
          setTimeout(() => {
            myChart.resize()
          }, 50)
        })
      }
    },
    watch: {
      option: function() {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(document.querySelector('#'+this.id));
        this.myChart.setOption(this.option);
        bus.$emit('ResizeChart')
      },
      events() {
        this.myChart = echarts.init(document.querySelector('#'+this.id))
        for(let types in this.events) {
          if (this.events.hasOwnProperty(types) && typeof this.events[types] != 'function')return
          this.myChart.on(types, this.events[types])
        }
      }
    },
    mounted() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.querySelector('#'+this.id));
      this.myChart.setOption(this.option);
      this.init();
    }
  }

</script>
