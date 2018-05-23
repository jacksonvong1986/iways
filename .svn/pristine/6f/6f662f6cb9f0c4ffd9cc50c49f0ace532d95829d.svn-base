<template>
  <div :class="[type == 'slide' ? 'bi-tabs-slide' : '' , 'bi-tabs']">
    <ul class="clear"><slot></slot><li class="line" :style="styleObject"></li></ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import JQuery from 'jquery'
	export default {
		name: 'BiTabs',
    props:{
      type:{
        default:'tab'
      },
    },
		data() {
			return {
        styleObject:{
          transform: ''
        }
			}
		},
    mounted(){

    },
    methods: {
      slideUnderline: function (distance) {
        this.styleObject =  this.type == 'tab' ? 'left:' + distance + 'px' : ''
      },

      openTabsBox: function (selectedId, allTabsObj) {
        [...allTabsObj].forEach(function (item) {
          var tabId = item.getAttribute('targetId');
          var tabBox = document.getElementById(tabId);
          if (!tabBox)return;
          tabBox.style.display = 'none'
        });
        var selectBox = document.getElementById(selectedId);
        if (!selectBox)return;
        selectBox.style.display = 'block'
      },

      slideTabsBox: function (id) {
        var scrollTop =  parseInt(JQuery('#' + id).offset().top) - 100;
        JQuery("html,body").animate({scrollTop: scrollTop}, 500);
      },

      click(targetId) {
        this.$emit('tabsClick', targetId)
      }
    }
	}
</script>

<style lang="scss" type="text/scss" scoped>
.bi-tabs {
  display: block;background: #fff; padding: 0px 10px;position: relative;
}
ul {text-align: center; position: relative}
li.line{ position: absolute;left:0; height: 2px; width: 175px; background-color: #339ace; bottom:-2px;-webkit-transition: all .35s ease-out 0s;  transition: all .35s ease-out 0s;}
</style>
