<template>
  <div class="column">
    <div class="title">
      <i class="iconfont" :class="columnIcon"></i>
      <em>{{columnTitle}}</em>
    </div>
    <div class="button" :title="columnText"><slot name="button">{{columnText}}</slot></div>
    <div class="right"><div class="cont"><slot name="right"></slot></div></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'BiBar',
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

  $lineHeight:30px;
  .left-submenu-popover .column{@include calc(100%, 450px); /*left: 400px; right: 50px;*/}
  .left-menu-shrink .column{@include calc(100%, 110px); /*left: 60px; right: 50px;*/}
  .left-menu-shrink.left-submenu-popover .column{ @include calc(100%, 310px); /*left: 260px; right: 50px;*/}
  .left-menu-shrink.left-submenu-popover.right-menu-open .column{ @include calc(100%, 480px); /*left: 260px; right: 220px;*/}
  .left-menu-shrink.right-menu-open .column{@include calc(100%, 280px); /*left: 60px; right: 220px;*/}

  .column{
    @include box-Module(block, calc(100% - 250px), 51px, 0 0 20px 0, 10px 20px, #fdfdfd, none, inherit);
    line-height: $lineHeight; border-bottom: 1px solid #dbdbdb; position: fixed; top: 52px; z-index: 2088;
    i {font-size: 25px;  position: relative; top: 2px;}
  }

  .title{
    @include font-adjust(20px, 27px, #34495e, left, 700);
    margin-right: 12px;  position: relative;  float:left; height: $lineHeight;
  }

  .button{
    @include box-Module(block, auto, $lineHeight, 0 5px 0 0, null);
    @include font-adjust(14px, 32px, #888, left);
    @include text-hide();
    float:left;letter-spacing: 1px;  max-width: 530px; position: relative; padding-left: 12px;
    &:before{
      @include position(5px, null, 5px, 0);
      content: ''; display: block; width: 1px; background-color: #ccc;
    }
  }
  .right{
    @include text-hide();
    float:right; height: $lineHeight; padding: 8px 5px; position: relative;
  }
  .cont{
    @media screen and (max-width: 1300px){
      display: none;
    }
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
