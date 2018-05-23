<template>

	<div class="bi-empty">
    <h4>
      <i class="">!</i>
    </h4>
    <p v-if="showResult">
      暂时没有<em><slot></slot></em>相关的结果
    </p>
    <p v-if="showTips"><small><slot name="tips">亲爱的，请减少搜索条件并检查搜索条件是否正确，简化搜索条件、搜索所需信息</slot></small></p>
	</div>

</template>

<script type="text/ecmascript-6">
	export default {
		name: 'BiEmpty',
		data() {
			return {

			}
		},
    props:{
		  showResult:{
        type: Boolean,
		    default:true
      },
      showTips:{
        type: Boolean,
        default:true
      }
    }
	}
</script>

<style lang="scss" type="text/scss" scoped>
.bi-empty{
  width: 100%; min-height: 205px;display: block;padding: 20px 0;
  img{
    display: block;margin: 60px auto 20px;width: 146px;height: 82px;
  }
  h4{
    margin: 50px 0 40px; text-align: center; font-weight: 100;
    i{display: inline-block;height: 82px; width: 82px; font-size: 80px; line-height: 82px; border-radius: 50%; border: 1px solid #cccccc; color: #bcbcbc}
  }
  p{
    font-size: 24px; color: #000; text-align: center; margin-bottom: 20px;
  }
  em{
    color: #f04048;
  }
  small{
    font-size: 16px; color: #999;margin: 0 0 70px 0; letter-spacing: 2px;
  }
}
</style>
