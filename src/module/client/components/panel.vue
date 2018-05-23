<template>
  <div
    class="clear bi-panel"
    :class="cls">
    <div class="bi-panel-header"  :class="[titleSize, titleType]" v-if="$slots.title">
      <span class="bi-panel-title clear">
        <slot name="title">标题</slot>
      </span>
      <span class="bi-panel-button" v-if="operating">
        <slot name="operating">
          <a href="javascript:void(0);" v-if="button.minimize" class="bi-panel-btn bi-panel-minimize" @click="minimize">{{ minimize_text }}</a>
          <a href="javascript:void(0);" v-if="button.maximize" class="bi-panel-btn bi-panel-maximize" @click="maximize">{{ maximize_text }}</a>
          <a href="javascript:void(0);" v-if="button.close" class="bi-panel-btn bi-panel-close" @click="close">x</a>
        </slot>
      </span>
      <span class="bi-panel-others">
        <slot name="others"></slot>
      </span>
    </div>
    <transition name="expand">
      <div class="bi-panel-body clear" v-if="expand_body" :style="bodyStyle">
        <slot> </slot>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'BiPanel',
    props: {
      cls: {
        type: Object,
        required: false,
        default: function() {
          return {};
        }
      },
      title: {
        type: String,
        required: false
      },
      titleType: {
        default:''
      },
      titleSize:{
        type: String,
        default: ''
      },
      button: {
        type: Object,
        default: () => {
          return {
            minimize: true,
            maximize: false,
            close: true,
          }
        }
      },
      bodyStyle: {
        type: String,
        required: false
      },
      operating:{
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        minimize_text: '-',
        maximize_text: '□',
        expand_body: true
      }
    },
    methods: {
      maximize() {
        alert('maximize')
      },
      minimize() {
        this.expand_body = !this.expand_body
        this.minimize_text = this.minimize_text == '-' ? '+' : '-'
      },
      close() {
        this.$emit('closePanel')
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .bi-panel {
    background: #fff;
    margin-bottom: 20px;
    border: 1px solid #e6e7ec;

    &.shadows{
      -webkit-box-shadow: 0 0 10px rgba(153, 153, 153, 0.14);
      box-shadow: 0 0 10px rgba(153, 153, 153, 0.14);
      filter:progid:DXImageTransform.Microsoft.dropshadow(OffX=0, OffY=0, Color='rgba(153, 153, 153, 0.14)');
      -ms-filter:"progid:DXImageTransform.Microsoft.dropshadow(OffX=0, OffY=0, Color='rgba(153, 153, 153, 0.14)')";
    }
  }
  .bi-panel-header {
    padding: 10px 20px;
    border-bottom: 1px solid #ebeef5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #fcfcfc;
    line-height: 28px;
    &:after{ content: '\20';display: block;height: 0;clear: both; }
    &.small{
      padding: 5px 20px;
      .bi-panel-title{font-size: 13px;}
    }
    &.gray{
      background-color: #727476;color: #f8f8f8;
      .bi-panel-title{color: #f8f8f8;}
    }
    i { cursor: pointer; }
  }
  .list-group-item {
    .bi-panel-header {
      cursor: move;
    }
  }
  .bi-panel-title {
    font-size: 15px;
    font-weight: 700;
    line-height: 28px;
    /*height: 28px;*/
    color:#003135;
    display: block;
    position: relative;
    float: left;
    &:after{ content: '\20';display: block;height: 0;clear: both; }
  }
  /*.bi-panel-header_two{*/
    /*padding-left: 0; background-color: #fff; border-bottom: none;*/
    /*.bi-panel-title{*/
      /*padding-left: 18px;*/
      /*&:before{*/
        /*content: '';*/
        /*border-left: 8px solid #339ace;*/
        /*margin-right: 10px;*/
        /*height: 18px;*/
        /*display: block;*/
        /*position: absolute;*/
        /*left: 0;*/
        /*top: 4px;*/
      /*}*/
    /*}*/
  /*}*/
  .bi-panel-body {
  }
  .bi-panel-button {
    float: right;
    height: 27px;
    overflow: hidden;
    margin-left: 20px;
    .bi-panel-btn {
      font-size: 16px;
      color: #000;
      display: inline-block;
      line-height: 21px;
      width: 15px;
      text-align: center;
    }
  }
  .bi-panel-others{
    float: right;
    display: inline-block;
    line-height: 24px;
  }
  .expand-enter-active {
    transition: all 1s cubic-bezier(0.25, 0.1, 0.25, 0.9);
  }
  .expand-leave-active {
    transition: all .2s cubic-bezier(0.25, 0.1, 0.25, 0.9);
  }
  .expand-enter, .expand-leave-to {
    opacity: 0.1
  }
</style>
