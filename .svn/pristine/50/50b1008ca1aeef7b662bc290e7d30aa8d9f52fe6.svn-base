<template>
  <div class="bi-cell" v-if="type == 'circle'">
    <bi-progress class="progress-circle" type="circle" :percentage='data[field1]' :circleWidth='52' :stroke-width='5' :color="color_group[data.color]" v-if="data[field1] != -1"></bi-progress>
    <bi-progress class="progress-circle" type="circle" :percentage='0' :circleWidth='52' :stroke-width='5' :color="color_group[data.color]" v-else></bi-progress>
    <p style="margin-top: 0"><slot></slot></p>
  </div>
  <div class="bi-cell" v-else-if="type == 'bar'">
    <h4><bi-progress :percentage="data[field1]" color="#00b4f3" show-text="true" titleWidth="60">时间进度</bi-progress></h4>
    <h4><bi-progress :percentage="data[field2]" :color="color" show-text="true" titleWidth="60">任务进度</bi-progress></h4>
    <p><slot></slot></p>
  </div>
  <div class="bi-cell" v-else>
    <template v-if="field1&&data[field1]==-1">
      <font class="no-data">亲，暂无数据。</font>
    </template>
    <template v-else>
      <template v-if="field1">
        <b v-if="!special" :class="cls">{{ data[field1] | number_format(0, ',') }}</b>
        <em v-else><b :class="cls">{{ data[field1] | multiply(100) | number_format(1) }}</b>%</em>
      </template>
      
      <template v-if="separate">{{ separate }}</template>

      <template v-if="field2&&data[field2]==-1">
        暂无
      </template>
      <template v-else-if="field2">
        <i :class="[{ iconfont: 1 }, data[field2] < 0 ? 'icon-down' : 'icon-up']"></i>
        <em>{{ data[field2] | multiply(100) | number_format(1) }}%</em>
      </template>
    </template>
    <p :title="text"><slot></slot></p>
  </div>
</template>


<script type="text/ecmascript-6">
  import mixin from '@index/config/mixin.js';
  import BiProgress from '@index/components/progress.vue'
  export default {
    name: 'BiCell',
    mixins: [mixin],
    data() {
      return {
        text: ''
      }
    },
    props: {
      data: {
        type: Object,
        required: true,
        default: {}
      },
      field1: {
        type: String,
        required: false,
        default: ''
      },
      field2: {
        type: String,
        required: false,
        default: ''
      },
      type: {
        type: String,
        required: false,
        default: 'default'
      },
      cls: {
        type: String,
        required: false,
        default: ''
      },
      color: {
        type: String,
        required: false,
        default: '#00b4f3'
      },
      special: {
        type: Boolean,
        required: false,
        default: false
      },
      separate: {
        type: String,
        required: false,
        default: ''
      }
    },
    mounted: function() {
      if (this.$slots.default && this.$slots.default.hasOwnProperty('0')) {
        this.text = this.$slots.default[0].elm.innerText
      }
    },
    components: {
      BiProgress
    }
  }
</script>

<style lang="scss" type="text/scss">
  @import "~@index/assets/scss/_common";
  @import "~@index/assets/scss/mixin";
  .sales-status{
    .left{
      & > div .bi-cell {
        @include box-Module(block, 100%, 140px, 0px, 50px 0 40px 0 );
        border-bottom: 1px solid #2e8ab9;position: relative; 
      }
      b {@include font-adjust(24px, 24px, #fff)}
      i{color: #ffffff;}
      em {@include font-adjust(12px, 24px, #fff)}
      p{ @include font-adjust(12px, 24px, #add1e7)}
      p{ @include font-adjust(12px, 24px, #add1e7);}
    }
    .right {
      & > div .bi-cell {
        @include box-Module(block, 25%, 139px, 0px, 40px 0 );
        @include font-adjust(12px, 12px, #636e7b);
        @include transition(all, .5s);
        border-bottom: 1px solid #eee;position: relative; border-right: 1px solid #eee;float: left; 
        &:hover{background: #f9f9f9;}
      }
      b{font: 100 24px/24px Arial; color: #0081c3; }
      p{font-size: 12px;font-weight: 100;margin-top: 20px;}
      h4{ font-weight: 100; height: 12px; width: 80%; margin: 0px auto 10px; color: #636e7b}
      h4{ font-weight: 100; height: 12px; width: 80%; margin: 0px auto 10px; color: #636e7b; max-width: 160px;}
    }
    &.warning{
      .left{
        & > div .bi-cell {border-bottom: 1px solid #e15e63;}
        p{color: #fcbec3}
      }
      .right{
        & > div .bi-cell {width: 33.33%}
        b{color: #ee4947}
      }
    }
    //.no-data{line-height: 60px;}
  }
  .all-sales {
    .bi-cell {
      b {font-size: 14px;color:#0080c1; font-weight:normal;}
   }
  }
  .sub-sales {
    .bi-cell {
      b{font-size: 16px;color:#0080c1;}
    }
  }
  .area-market {
    .bi-cell{
      b{font-size: 16px; color: #0080c1; font-weight:normal;}
    }
  }
  .regional-market {
    .bi-cell{
      b{font-size: 16px; color: #0080c1; font-weight:normal;}
    }
  }

  .databox {
    &:hover {
      b, em {color: #fff;@include transition(all, .35s);}
      b.font-red {color: #fff;}
    }
    b {font-size: 16px; color: #0080c1; font-weight: 100;}
    b.font-red {color: #f04048;}
    em{color: #aaa}
    p{white-space: nowrap; text-overflow: ellipsis; overflow: hidden; max-width: 100%;}
  }
  @media screen and (max-width: 1150px) {
    //厂商销量目标看板
    .sales-status {
      .right b{font-size: 20px!important;}
    }
  }
  .list-group-item .bi-cell {
    cursor: move;
  }
</style>
