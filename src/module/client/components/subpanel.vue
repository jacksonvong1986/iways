<template>

	<div class="bi-subpanel" :style="{width: width}">
    <div class="bi-subpanel-header">
      <span class="bi-subpanel-title">
        <slot name="title">标题</slot>
      </span>
      <span class="bi-subpanel-button">
       <slot name="operating">
          <a href="javascript:void(0);" class="bi-subpanel-btn bi-subpanel-enlarge" @click="enlarge">□</a>
          <a href="javascript:void(0);" class="bi-subpanel-btn bi-subpanel-close" @click="close">x</a>
       </slot>
      </span>
    </div>
    <transition name="expand">
      <div class="bi-subpanel-body">
        <slot>暂无内容</slot>
      </div>
    </transition>
	</div>

</template>

<script type="text/ecmascript-6">
  import JQuery from 'jquery'

	export default {
		name: 'BiSubPanel',
    data() {
      return {
        content: '暂无内容'
      }
    },
    props:{
      width:{
        default:"100%"
      },
      method: {
        type: Function
      }
    },
		data() {
			return {
        dialogVisible: false
			}
		},
    methods:{
      enlarge: function () {
      },
      close: function () {

      }
    }
	}
</script>

<style lang="scss" type="text/scss" scoped>
.bi-subpanel {
  background: #fff;
  width: 100%;
  float: left;
}

.bi-subpanel-header {
  padding: 10px 20px;
  border-bottom: 1px solid #ebeef5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  &:after{ content: '\20';display: block;height: 0;clear: both; }
}

.bi-subpanel-title {
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
  color:#003135;
  display: block;
  float: left;
  &:after{ content: '\20';display: block;height: 0;clear: both; }
}

.bi-subpanel-button {
  float: right;
  height: 27px;
  overflow: hidden;
  .bi-subpanel-btn {
    font-size: 16px;
    color: #000;
    display: inline-block;
    line-height: 21px;
    width: 15px;
    text-align: center;
  }
}
.bi-subpanel-body{
  padding: 20px;
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
