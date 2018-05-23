<template>
  <div class="column">
    <h2 class="title">
      <i class="iconfont" :class="columnIcon"></i>
      {{columnTitle}}
      <small :title="columnText"><slot>{{columnText}}</slot></small>
    </h2>
  </div>
</template>

<script type="text/ecmascript-6">
	export default {
		name: 'BiTitle',
		data() {
			return {

			}
		},
    props:{
      columnTitle:{
        default:''
      },
      columnIcon:{
        default:''
      },
      columnText:{
        default:''
      }
    }
	}
</script>

<style lang="scss" type="text/scss" scoped>

@import "../assets/scss/mixin.scss";

$lineHeight:28px;

.column{
    @include box-Module(inline-block, auto,30px, 0px, 0px);float: left;
    i {font-size: 25px; line-height: $lineHeight; position: relative; top: 2px;}
}

.title{
    @include font-adjust(20px, $lineHeight, #34495e, left, 700);
   margin-right: 10px;
}

small{
    @include box-Module(block, auto, 26px, 0 5px 0 10px, 0px 0px 0px 10px);
    @include font-adjust(14px, 26px, #888, left);
    @include text-hide();
    float:right;letter-spacing: 1px;border-left: 1px solid #ccc;position: relative;top: 3px; max-width: 530px;
}

.bread-crumbs{
    float: right;
    @include font-adjust(13px, $lineHeight, #999, left);
    a{
        color: #666;
        &:hover{ color: #339ace; text-decoration: underline}
    }
}

</style>
