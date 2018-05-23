<template>

  <div class="bi-progress">
    <div class="bi-progress-line" v-if="type === 'line'" :style="{height: height + 'px'}">
      <cite class="progress-title" :style="{ width: titleWidth + 'px'}"><slot></slot></cite>
      <span class="progress-bar" :style="{ width: 'calc(100% - ' + titleWidth  + 'px)'}">
      <span :class="{'notext': !showText}">
        <em  v-if="percentage >= 0" :style="{width: number_format(multiply(percentage, 100), precision) + '%', backgroundColor: color}"></em>
        <em  v-else style="width: 0"></em>
      </span>
      <label v-if="showText" :style="[{color: color, lineHeight: height + 'px'}]">
        <template v-if="percentage >= 0 ">
        {{ percentage | multiply(100) | number_format(precision) }}%
        </template>
        <template v-else>
          暂无
        </template>
      </label>
    </span>
    </div>

    <div class="bi-progress-circle" :style="{height: circleWidth + 'px', width: circleWidth + 'px'}" v-else>
      <svg viewBox="0 0 100 100">
        <path class="bi-progress-circle__track" :d="trackPath" stroke="#e5e9f2" :stroke-width="relativeStrokeWidth" fill="none"></path>
        <path class="bi-progress-circle__path" :d="trackPath" stroke-linecap="round" :stroke="color" :stroke-width="relativeStrokeWidth" fill="none" :style="circlePathStyle"></path>
      </svg>
      <div class="bi-progress-circle__text" v-if="percentage >= 0"  :style="{fontSize: circleTextSize + 'px', color: color}" >
        <template v-if="showText">{{ percentage | multiply(100) | number_format(precision) }}%</template>
        <template v-else>{{ circleText }}</template>
      </div>
      <div class="bi-progress-circle__text" v-else v-show="showText">
        <template>暂无数据</template>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import mixin from '../config/mixin.js';
	export default {
		name: 'ProgressBar',
    mixins: [mixin],
		data() {
			return {

			}
		},
    props:{
      type: {
        type: String,
        default: 'line',
//        validator: val => ['line', 'circle'].indexOf(val) > -1
      },
      percentage: {
//        type: Number,
        default: 0,
        required: true,
//        validator: val => val >= 0 && val <= 100
      },
      titleWidth:{
        default:'0'
      },
      color:{
        default:'#e5e9f2'
      },
      height:{
        default:'12'
      },
      strokeWidth: {
        default: 5
      },
      circleWidth: {
        default: 126
      },
      circleText:{
        default:''
      },
      circleTextSize:{
        default: 12
      },
//      textInside: {
//        default: false
//      },
      showText:{
        default: true,
        type: Boolean
      },
      precision: {
        default: 0,
        type: Number
      }
    },
    computed: {
      relativeStrokeWidth() {
        return (this.strokeWidth / this.circleWidth * 100).toFixed(1);
      },
      trackPath() {
        var radius = parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10);
        return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius * 2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`;
      },
      perimeter() {
        var radius = 50 - parseFloat(this.relativeStrokeWidth) / 2;
        return 2 * Math.PI * radius;
      },
      circlePathStyle() {
        var perimeter = this.perimeter;
        var percentage = this.number_format(this.multiply(this.percentage, 100)) >= 0 ?  this.number_format(this.multiply(this.percentage, 100)) : 0;

        return {
          strokeDasharray: `${perimeter}px,${perimeter}px`,
          strokeDashoffset: (percentage <= 100 ? (1 - percentage / 100) : 0) * perimeter + 'px',
          transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
        };
      },
      progressTextSize() {
        return this.type === 'line'
          ? 12 + this.strokeWidth * 0.4
          : this.width * 0.111111 + 2 ;
      }
    }
	}
</script>

<style lang="scss" type="text/scss" scoped>
.bi-progress, .bi-progress-line{width: 100%;height: 100%; min-height: 5px;}
.progress-title{float: left; display: block; font-size: 12px;line-height: 11px;}
.progress-bar{
    display: block;
    /*width: 100%;*/
    height: 100%;
    float: left;

    span{
        display: block; float: left;width: calc( 100% - 30px);background-color: #ecebf1;position: relative; height: 100%;margin-right: 5px;
        &.notext{width: 100%;}
        em{
            position: absolute;
            top: 0;
            left: 0;
            max-width: 100%;
            display: block;
            height: 100%;
        }
    }
    label{
        display: block; float: left; width: 25px; height: 100%; font-size: 12px;line-height: 11px;
    }
}
.bi-progress-circle{position: relative; margin: 0 auto 7px;}
.bi-progress-circle__text{position: absolute;top: 50%;left: 0;width: 100%;text-align: center;margin: 0;transform: translateY(-50%); font-size:12px; color:#999;}
</style>
