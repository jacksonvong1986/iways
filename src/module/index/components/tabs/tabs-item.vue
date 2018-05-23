<template>
    <li class="bi-tabs-item" :class="{'tabs-selected': selected}" @click="click"><a><slot></slot></a></li>
</template>

<script type="text/ecmascript-6">
	export default {
		name: 'BiTabsItem',
    props:{
      selected:{
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
      }
    },
    created(){

    },
    mounted(){
      if (this.selected) {
        var selectedTab = this.$el
        var offsetLeft = selectedTab.offsetLeft
        var selectedTabId = selectedTab.getAttribute('targetId')
        var allTabsObj = this.$parent.$el.getElementsByClassName('bi-tabs-item')

        this.$parent.slideUnderline(offsetLeft)
        if (this.$parent.type == 'tab') {
          this.$parent.openTabsBox(selectedTabId, allTabsObj);
          return;
        }
      }
    },
    methods:{
      click: function () {
        var selectedTab = this.$el
        var selectedTabId = selectedTab.getAttribute('targetId')
        this.$parent.click(selectedTabId)

        //设置选中状态
        var distance = parseInt(selectedTab['offsetLeft'])
        var allTabsObj = this.$parent.$el.getElementsByClassName('bi-tabs-item')
        this.$parent.slideUnderline(distance);
        [...allTabsObj].forEach(function (item) {
          item.setAttribute('class', 'bi-tabs-item')
        })
        selectedTab.setAttribute('class', 'bi-tabs-item tabs-selected')

        //显示内容区
        if (this.$parent.type == 'tab') {
          this.$parent.openTabsBox(selectedTabId, allTabsObj);
          return;
        }

        //tabs框滑动参数
        else if (this.$parent.type == 'slide'){
          this.$parent.slideTabsBox(selectedTabId);
          return;
        }
        else{
          console.log('please talk me the correct instruction');
        }
      }
    }
	}
</script>

<style lang="scss" type="text/scss" scoped>

  li {
    float: left;
    &.tabs-selected a{ color: #0080c2}
    &:hover a {color: #0080c2}
  }
  a { display: block; border-right: 1px solid #eeeeee; color: #2a343d; width: 175px; padding: 7px 0px;line-height: 25px; height: 100%; }

</style>
