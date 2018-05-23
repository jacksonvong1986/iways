<template>
  <span>
    <el-popover
      ref="popover"
      placement="bottom-start"
      popper-class="padding0 popover-main"
      width="602"
      v-model="selectOnClass"
      @show="showPopover('manfsBoxForIndex')">
      <div class="search-popover-cont" style="width:600px; ">
        <h4 class="popover-title" style="max-height: 126px;">
          <p>
            <cite>厂商： </cite>
            <span>
              <em v-for="(item, id) in selected_manfs">
                {{item.name}}
                <i @click="clearSubItem('manf', item.id);">x</i>
              </em>
              <font @click="clearItem('manf')">重置条件</font>
            </span>
          </p>
          <p v-if="selected_brands.length>0">
            <cite>品牌： </cite>
            <span>
               <em v-for="(item, id) in selected_brands">
                 {{item.name}}
                 <i @click="clearSubItem('brand', item.id);">x</i>
               </em>
              <font @click="clearItem('brand')">重置条件</font>
            </span>
          </p>
          <p v-if="selected_models.length>0">
            <cite>车型： </cite>
            <span>
               <em v-for="(item, id) in selected_models">
                 {{item.name}}
                 <i @click="clearSubItem('model', item.id);">x</i>
               </em>
              <font @click="clearItem('model')">重置条件</font>
            </span>
          </p>
        </h4>

        <el-tabs type="border-card"  v-model="selectedSubTab">
          <el-tab-pane name="manf">
            <span slot="label">厂商</span>
            <dl class="popover-main_va">
              <dt>
                <em :class="{'on':first_letter==letter_selected['manfsBoxForIndex']}" v-for="(group, first_letter) in baseInfo.manf_brand" @click="selectLetter('manfsBoxForIndex', first_letter)">{{ first_letter }}</em>
                <span>
                  <font>搜索</font>
                  <input type="text" v-model="manfName" :class="{on:lookErrorClass}" @keyup.enter="lookManf('manfsBoxForIndex')">
                  <i class="iconfont icon-sousuo" @click="lookManf('manfsBoxForIndex')"></i>
                </span>
              </dt>
              <dd id="manfsBoxForIndex">
                <el-checkbox-group size="mini" :max="10" v-model="selected_manf_ids">
                  <dl v-for="(group, first_letter) in baseInfo.manf_brand">
                    <dt :data-key="first_letter">{{ first_letter }}</dt>
                    <dd>
                      <span class="radio-item" v-for="(manf, key) in group">
                        <el-checkbox :label="manf.id" :key="manf.id"  :class="{on: matchName(manfName, manf.manf_name) && lookManfId==manf.id}">{{ manf.manf_name }}</el-checkbox>
                      </span>
                    </dd>
                  </dl>
                </el-checkbox-group>
              </dd>
            </dl>
          </el-tab-pane>
          <el-tab-pane v-if="brands_grouped.length>0" name="brand">
            <span slot="label">品牌</span>
            <div class="popover-main_vb" v-if="selected_manfs.length > 0">
              <dl v-for="(manf, key) in brands_grouped">
                <dt>{{ manf.manf_name }}</dt>
                <dd>
                  <el-checkbox-group v-model="selected_brand_ids">
                    <el-checkbox-button v-for="(brand, key) in manf.brand" :label="brand.id" :key="brand.id" >{{ brand.brand_name }}</el-checkbox-button>
                  </el-checkbox-group>
                </dd>
              </dl>
            </div>
          </el-tab-pane>
          <el-tab-pane v-if="models_grouped.length>0" name="model">
            <span slot="label">车型</span>
            <div class="popover-main_vb" v-if="selected_brands.length > 0">
              <dl v-for="(brand, key) in models_grouped">
                <dt>{{ brand.brand_name }}</dt>
                <dd>
                  <span v-for="(model, key) in brand.model" :class="{'on':selected_model_ids.includes(model._id)}" :title="model.model_name" @click="checkModel(model._id)">{{ model.model_name }}</span>
                </dd>
              </dl>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="popover-footer">
          <a href="javascript:void(0);" @click="cancelIndexData">取消</a>
          <a href="javascript:void(0);" @click="submitIndexData" class="on">确定</a>
        </div>
      </div>
    </el-popover>
    <span v-popover:popover><slot></slot></span>
  </span>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import mixin from '@index/config/mixin'
  import bus from '@/config/eventBus'
  import JQuery from 'jquery'

  export default {
    mixins: [mixin],
    data() {
      return {
        manfs_map: {},
        selectedTab: this.$route.query.tab || 'index',
        letter_selected: {
          manfsBoxForIndex: 'A',
          manfsBoxForSearch: 'A',
          brandsBoxForSearch: 'A',
        },
        selectOnClass: false,
        brands: [],
        models: [],
        baseInfo: {},
        string_manf_ids: '0',
        string_brand_ids: '0',
        string_model_ids: '0',
        selected_manfs_text: '',
        selected_brands_text: '',
        selected_models_text: '',
        selectedSubTab: 'manf',

        maxItem: 10,
        manfName:'',
        lookManfIds: [],
        lookManfId:'',
        lookErrorClass:false,
        selected_manf_ids: this.$route.query.manf_ids ? this.$route.query.manf_ids.split(',').map((id)=>{return Number(id)}) : [],
        selected_brand_ids: this.$route.query.brand_ids ? this.$route.query.brand_ids.split(',').map((id)=>{return Number(id)}) : [],
        selected_model_ids: this.$route.query.model_ids ? this.$route.query.model_ids.split(',').map((id)=>{return Number(id)}) : [],
      }
    },
    watch: {
      // 以下两个函数为排除不合要求的品牌和车型
      selected_manf_ids() {
        var manfs_map = this.manfs_map
        , selected_brand_ids = []
        this.selected_manf_ids.map((manf_id) => {
          if (manfs_map.hasOwnProperty(manf_id)) {
            manfs_map[manf_id]['brand'].map((brand) => {
              if (this.selected_brand_ids.includes(brand.id)) {
                selected_brand_ids.push(brand.id)
              }
            })
          }
        })
        this.selected_brand_ids = selected_brand_ids
      },
      selected_brand_ids: function() {
        this.manfNotClass = false
        if (this['selected_manf_ids'].length == 0 && this['selected_brand_ids'].length > 0) {
          this.manfNotClass = true
        }
        var brands_map = this.brands_map
        , selected_model_ids = []
        this.selected_brand_ids.map((brand_id) => {
          if (brands_map.hasOwnProperty(brand_id)) {
            brands_map[brand_id]['model'].map((model) => {
              if (this.selected_model_ids.includes(model._id)) {
                selected_model_ids.push(model._id)
              }
            })
          }
        })
        this.selected_model_ids = selected_model_ids
      },
    },
    computed: {
      searchStatusText() {
        return !!this.searchType ? '搜索' : '下一步'
      },
      brands_map: function() {
        var brands  = {};
        for (var letter in this.baseInfo.brand) {
          var group = this.baseInfo.brand[letter];
          for (var x in group) {
            var brand = group[x];
            brands[brand.id] = brand;
          }
        }
        return brands;
      },
      brands_grouped: function() {
        var brands_grouped = []
        , manfs_map = this.manfs_map
        if (this.selected_manf_ids.length > 0) {
          this.selected_manf_ids.map((manf_id) => {
            if (manfs_map.hasOwnProperty(manf_id)) {
              var brand = manfs_map[manf_id];
              brands_grouped.push(brand);
            }
          })
        } else {
          brands_grouped = this.baseInfo.brand || [];
        }
        return brands_grouped;
      },
      models_grouped: function() {
        var brands_map = this.brands_map
        , models_grouped = [];
        if (this.selected_brand_ids.length > 0) {
          this.selected_brand_ids.map((brand_id) => {
            if (brands_map.hasOwnProperty(brand_id)) {
                var model = brands_map[brand_id];
                models_grouped.push(model);
            }
          })
        }
        this.modelNotClass = models_grouped.length == 0 ? true : false
        return models_grouped;
      },
      selected_manfs: function() {
        var manfs_map = this.manfs_map
        , selected_manfs = []
        this.selected_manf_ids.map((manf_id) => {
          if (manfs_map.hasOwnProperty(manf_id)) {
            var manf = manfs_map[manf_id]
            selected_manfs.push({id:manf.id, name:manf.manf_name})
          }
        })
        return selected_manfs
      },
      selected_brands: function() {
        var brands_map = this.brands_map
        , selected_brands = []
        this.selected_brand_ids.map((brand_id) => {
          if (brands_map.hasOwnProperty(brand_id)) {
            var brand = brands_map[brand_id]
            selected_brands.push({id:brand.id, name:brand.brand_name})
          }
        })
        return selected_brands
      },
      selected_models() {
        var brands_map = this.brands_map
        , selected_models = []
        this.selected_brand_ids.map((brand_id) => {
          if (brands_map.hasOwnProperty(brand_id)) {
            brands_map[brand_id]['model'].map((model) => {
              if (this.selected_model_ids.includes(model._id)) {
                selected_models.push({id: model._id, name: model.model_name})
              }
            })
          }
        })
        return selected_models
      },
    },
    mounted() {
      this.getToken(() => {
        this.getBaseInfo()
      })
    },
    methods: {
      selectLetter: function(boxId, letter, animate = true) {
        this.letter_selected[boxId] = letter
        var parent = document.querySelector('#' + boxId)
        if (!parent)return
        var target = parent.querySelector('[data-key="' + letter + '"]')
        , scrollTop = target.offsetTop - parent.offsetTop - 10;
        setTimeout(() => {
          if (animate) {
            JQuery('#' + boxId).animate({scrollTop: scrollTop}, 300, 'swing')
          } else {
            JQuery('#' + boxId).scrollTop(scrollTop)
          }
        }, 10)
      },
      lookManf (boxId) {
        var keyword = this.manfName.trim()
        , letter = ''
        this.lookErrorClass = true
        if (!!keyword) {
          for (let index in this.manfs) {
            var manf = this.manfs[index]
            if (this.matchName(keyword, manf.manf_name) && !this.lookManfIds.includes(manf.id)) {
              letter = manf.first_letter
              this.lookManfId = manf.id
              this.lookManfIds.push(manf.id)
              break
            }
            if (index == this.manfs.length - 1) {
              this.lookManfId = ''
              this.lookManfIds = []
            }
          }
          if (!!letter) {
            this.selectLetter(boxId, letter)
            this.lookErrorClass = false
          }
        }
      },
      matchName(keyword, string) {
        if (!!keyword) {
          var regExp = RegExp(""+keyword+"")
          return regExp.test(string)
        }
        return false
      },
      showPopover(boxId) {
        var that = this
        var letter = that.letter_selected[boxId]
        if (!letter || letter=='A') {
          var first_manf_id = this.selected_manf_ids[0] || ''
          if (first_manf_id && this.manfs_map.hasOwnProperty(first_manf_id)) {
            var letter = this.manfs_map[first_manf_id]['first_letter']
          }
        }
        setTimeout(function(){
          that.selectLetter(boxId, letter, false)
        }, 200)
      },
      hidePopover(boxId) {
      },
      cancelIndexData() {
        this['selectOnClass'] = false;
      },
      checkModel(model_id) {
        var index = this.selected_model_ids.findIndex((id)=>{return id == model_id})
        if ( index >= 0) {
          this.selected_model_ids.splice(index, 1)
        } else {
          this.selected_model_ids.push(model_id)
        }
      },
      submitIndexData() {
        this.string_manf_ids = this.selected_manf_ids.join(',')
        this.string_brand_ids = this.selected_brand_ids.join(',')
        this.string_model_ids = this.selected_model_ids.join(',')
        this.selected_manfs_text = this.selected_manfs.map((item) => { return item.name }).join('|')
        this.selected_brands_text = this.selected_brands.map((item) => { return item.name }).join('|')
        this.selected_models_text = this.selected_models.map((item) => { return item.name }).join('|')
        this.sort = 1
        this.loadData()
      },
      getBaseInfo() {
        this.$request.get(this.$interface.GET_NEWS_BASE_INFO, {
          token: this.token
        }, (response) => {
          this.baseInfo = response.data[0]
          var manfs_map  = {}
          , manfs = []
          for (var letter in this.baseInfo.manf_brand) {
              var group = this.baseInfo.manf_brand[letter];
              for (var x in group) {
                  var manf = group[x];
                  manfs_map[manf.id] = manf
                  manfs.push(manf)
              }
          }
          this.manfs_map = manfs_map
          this.manfs = manfs
          this.loadData()
        }, this.failure)
      },
      loadData() {
      },
    },
    components:{
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "~@index/assets/scss/common";

  //数据更改-弹出窗内容
  .text-box{
    @include text-hide();
   display: inline-block; max-width: 120px;vertical-align: top; color: #999;
  }
  .popover-title{
    @include font-adjust(13px, 35px, #333, left);
    @include box-Module(block, 100%, 45px, 0px, 5px 10px);
    border-bottom: 1px solid #eeeeee;
    em{ font-weight: 700}
  }
  .popover-main{
    .el-tabs--border-card {
      @include box-shadow(0px, 0px, 0px);
      border:none;
    }
  }
  .popover-footer{
    height: 52px; padding: 11px 0;text-align: center;border-top: 1px solid #eeeeee; background-color: #f8f8f8;
    a{
      @include box-Module(inline-block, 100px, 30px, 0px 10px 0px 0px , 0px, #777);
      @include font-adjust(14px, 32px, #fff);
      &:hover{ background-color: #444}
      &.on {background-color: #339acd;  }
      &.on:hover{background-color: #42a4d5;  }
    }
  }
  .change-manuf{
    width: 100%;
    .letter{
      @include adaptive();
      padding: 5px 10px; border-bottom: 1px solid #eee;
      a{
        @include box-Module(block, 20px, 20px, 0px 5px 0px 0px, 0px, #fff);
        @include font-adjust(14px, 22px, #666);
        float: left; border-radius: 4px;
        &.on {background: #339ace; color:#fff;}
      }
    }
    .center{
      height: 220px;overflow: hidden;
      & > div {overflow: auto; height: 100%;}
      dl{
        @include adaptive();
        padding: 10px 0; border-bottom: 1px solid #eee;
      }
      dt{
        @include font-adjust(14px, 40px, #333);
        float: left; width: 50px;
      }
      dd{
        float: left; width: calc(100% - 50px);
        & > span{
          @include text-hide();
          display: block; width: 24%; margin-left: 1%;  float: left; line-height: 40px;
        }
        & > a{
          @include font-adjust(14px, 26px, #5a5e66, left);
          @include box-Module(inline-block, auto, auto, 0px, 0px 10px, 1px solid #eee);
        }
      }
    }
  }
  .change-datasource{
    padding: 20px;
    dl{padding:0 30px; font-size: 14px; margin-bottom: 20px;}
    dt{margin-bottom: 10px;text-align: left; color: #003233;}
  }
  //@end 数据更改-弹出窗内容


  //搜索页
  %hover-tips{
    @include box-Module(block, auto, 24px, 0 6px 0 0, 0 10px, #fff, 1px solid #ddd);
    @include font-adjust(12px, 24px, #aeaeae, left);
    &:hover{
      border-color: #f04048; color: #f04048;
    }
  }//已选择的条件，用于继承
  .segmentation{color: #000;margin-bottom: 5px;}
  .submit{
    @include box-Module(inline-block, 18%, 50px, 0, 0, #00b4f3);
    @include font-adjust(16px, 50px, #fff);
    @include radius(1234, 2px);
    &:hover{background-color: #2ec9ff}
  }
  .submit-back{
    @include box-Module(inline-block, 10%, 50px, 0 0 0 15px, 0, #fff, 1px solid #eee);
    @include font-adjust(16px, 50px, #00b4f3);
    @include radius(1234, 2px);
    &:hover{background-color: #00b4f3; color: #ffffff;}
  }
  .search{
    padding: 0 10px;
    h2{
      @include font-adjust(13px, 28px, #333, left);
      padding: 5px 0 15px; height: 44px;
      cite{float: left; height: 24px;}
      span{
        @extend %hover-tips;
        min-width: 80px; float: left;
      }
      i{
        margin-left: 10px; cursor: pointer;
      }
      font{
        font-size:14px;cursor: pointer; float: left;height: 24px;
        &:hover{
          color: #339ace; text-decoration: underline;
        }
      }
    }
  }
  .popover-box{
    float: left; width: 16%; margin-right: 2%;min-width: 170px;
    &.on{
      .popover-input{border-color: #00b4f3; color: #00b4f3; background-color: #f3fbfe}
    }
    &.ban{
      .popover-input, .popover-label{ cursor: not-allowed; color: #e1e1e1}
      em, .popover-input i{cursor: not-allowed;}
    }
    .popover-label{
      color: #000; font-size: 13px; margin-bottom: 5px;
    }
    .popover-input{
      @include font-adjust(12px, 20px, #999, left);
      padding: 10px 26px 10px 10px; border: 1px solid #ecebf1; display: block; height: 40px; cursor: pointer;
      white-space: nowrap;text-overflow: ellipsis;  overflow: hidden; width:auto; position:relative;
      i{ float: right; cursor: pointer; position:absolute; top:10px; right:10px;}
    }
  }
  .search-popover-cont{
    .popover-title{
      @include font-adjust(12px, 28px, #333, left, bold);
      padding: 10px 10px 5px 10px;overflow: auto; overflow-x: hidden; border-bottom: 1px solid #ddd; height: auto; min-height: 45px; max-height: 98px;
      p{display: block; @include clearfix();}
      span{display: block; max-width: 600px; float: left; width: calc(100% - 74px);}
      cite{float: left}
      em{
        @extend %hover-tips;
        float: left; margin-bottom: 5px;
      }
      i,font{cursor: pointer; margin-left: 8px; font-size: 13px;}
      font{
        float: left;
        &:hover{color: #339ace; text-decoration: underline}
      }
    }
    .popover-main_va{
      & > dt{
        padding: 5px 10px; line-height: 25px; border-bottom: 1px solid #eee;
        em{
          margin-right: 7px; cursor: pointer;
          &.on{color:#339ace}
        }
        span{
          display: block; float: right; font-size: 12px; color: #666; position: relative;
        }
        input{
          padding: 0 15px 0 10px; height: 24px; width: 150px;
        }
        i{
          position: absolute; right: 5px; top: 0; font-size: 12px; cursor: pointer;
          &:hover{
            color: #339ace;
          }
        }
      }
      dd{
        max-height: 215px; overflow: auto; overflow-x: hidden;
        dl{
          @include clearfix();
          line-height: 28px; padding: 20px 0 10px; text-align: center; border-bottom: 1px solid #eeeeee;
          &:last-child{border-bottom: none;}
        }
        dt{ float: left; width: 50px; font-size: 12px;}
        dd{ float: left; width: calc(100% - 50px);}
        .radio-item{
          @include text-hide();
          display: block; float: left; width: 25%; text-align: left;
        }
        .el-checkbox.on{
          color: #339ace;
        }
      }
    }
    .popover-main_vb{
      padding: 20px 30px 0;max-height: 215px; overflow: auto;
      dl{margin-bottom: 20px; text-align: left}
      dt{margin-bottom: 10px; color: #636e7b}
      dd{@include clearfix();}
      span{
        @include font-adjust(14px,27px, #555);
        display: block; float: left; margin: 0 10px 10px 0; border:1px solid #ddd; width: 130px; cursor: pointer;
        &:hover{
          border-color: #00b4f3; color: #339ace;
        }
        &.on{ background-color: #00b4f3; color: #fff; border-color: #00b4f3;}
      }
    }
  }
  .search-condition{
    @include clearfix(); padding: 20px 40px;
  }
  .search-keyword{
    padding: 20px 40px;
    input{
      @include font-adjust(12px, 20px, #999, left);
      @include box-Module(block, 32%, 40px, 0 0 20px 0, 10px, #fff, 1px solid #ecebf1);
      &.on{border-color: #00b4f3; color: #00b4f3; background-color: #f3fbfe}
    }
  }
  .search-result{
    table{
      margin-bottom: 20px; width: 100%;
      tr{
        border-bottom: 1px solid #f7f7f7;
      }
    }
    thead{
      tr{
        @include font-adjust(13px, 40px, #000, left);
        background-color: #fcfcfe;
        th:nth-child(1){text-align: center}
      }
    }
    tbody{
      tr{
        @include font-adjust(14px, 22px, #666, left);
        height: 50px;
        &:hover{
          background-color: #fcfcfc;
        }
        td:nth-child(1){text-align: center}
      }
      a{
        color: #2f6196;
        &:hover{
          color: #f04048; text-decoration: underline;
        }
        &.text-hide{
          @include google-text-hide();
          display: block; line-height: 22px; width: 95%;
        }
      }
    }

    .progress-box{width: 60%; min-width: 50px; max-width: 100px;}
    .interested{
      text-align: center; margin-bottom: 150px;
      p{margin:20px 0;}
      a{
        @include font-adjust(12px, 26px, #000);
        display: inline-block; margin-right: 10px; border: 1px solid #eee; padding: 0 10px;
        &:hover{
          background-color: #00b4f3; color: #fff;
        }
      }
    }
  }
  //@end 搜索页

</style>
