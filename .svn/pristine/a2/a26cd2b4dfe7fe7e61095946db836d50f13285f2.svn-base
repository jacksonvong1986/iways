<template>
	<div>
    <div class="header-el-popover-cont-s">
      <div class="dropGroup">
        <span @click="panel_control('cityP_show')"><div class="dropGroupHead"><i class="el-icon-location-outline" :class="{'on': panel.cityP_show}"></i>{{cityName}}</div></span>
        <span @click="panel_control('brandP_show')"><div class="dropGroupHead">厂商品牌<i :class="[panel.brandP_show?'el-icon-arrow-up on':'el-icon-arrow-down']"></i></div></span>
        <span>
          <div class="dropGroupHead" @click="panel_control('accreditP_show')">合作性质<i :class="[panel.accreditP_show?'el-icon-arrow-up on':'el-icon-arrow-down']"></i></div>
          <transition name="el-zoom-in-top">
            <div v-if="panel.accreditP_show" class="dropDown">
              <el-checkbox :indeterminate="selectGroup.accredit.isIndeterminate" v-model="selectGroup.accredit.checkAll" @change="handleCheckAllChange('accredit')">全选</el-checkbox>
              <el-checkbox-group v-model="selectGroup.accredit.checkedOption" @change="handleCheckedChange('accredit')">
                <el-checkbox v-for="item in selectGroup.accredit.option" :label="item" :key="item">{{item}}</el-checkbox>
              </el-checkbox-group>
              <div class="dropDownBtn">
                <span @click="resetData('accredit')">重置</span>
                <span @click="handleSubmit('accreditP_show')">确定</span>
              </div>
            </div>
          </transition>
        </span>
        <span>
          <div class="dropGroupHead" @click="panel_control('netPointP_show')">网点类型<i :class="[panel.netPointP_show?'el-icon-arrow-up on':'el-icon-arrow-down']"></i></div>
          <transition name="el-zoom-in-top">
            <div v-if="panel.netPointP_show" class="dropDown">
              <el-checkbox :indeterminate="selectGroup.netPoint.isIndeterminate" v-model="selectGroup.netPoint.checkAll" @change="handleCheckAllChange('netPoint')">全选</el-checkbox>
              <el-checkbox-group v-model="selectGroup.netPoint.checkedOption" @change="handleCheckedChange('netPoint')">
                <el-checkbox v-for="item in selectGroup.netPoint.option" :label="item" :key="item">{{item}}</el-checkbox>
              </el-checkbox-group>
              <div class="dropDownBtn">
                <span @click="resetData('netPoint')">重置</span>
                <span @click="handleSubmit('netPointP_show')">确定</span>
              </div>
            </div>
          </transition>
        </span>
        <span>
          <div class="dropGroupHead" @click="panel_control('showStyleP_show')">
            <span v-if="showStyleStatus">{{showStyleStatus}}</span>
            <span v-else>显示方式</span>
            <i class="iconfont icon-form_search" :class="{'on': panel.showStyleP_show}"></i>
          </div>
          <transition name="el-zoom-in-top">
            <!--<ul v-if="panel.showStyleP_show" class="dropDown">
              <li v-for="(item, key) in selectGroup.showStyle.option" @click="handleShowStyle(key)">{{item}}</li>
            </ul>-->
            <div v-if="panel.showStyleP_show" class="dropDown">
              <el-checkbox-group v-model="selectGroup.showStyle.checkedOption">
                <el-checkbox v-for="(item, key) in selectGroup.showStyle.option" :label="item" :max="1" :key="item" @change="radioChecked(item,key)">{{item}}</el-checkbox>
              </el-checkbox-group>
              <div class="dropDownBtn">
                <span @click="panel.showStyleP_show = false">关闭</span>
                <span @click="radioSubmit">确定</span>
              </div>
            </div>
          </transition>
        </span>
      </div>
      <transition name="el-zoom-in-top">
        <div class="cityPanel" v-if="panel.cityP_show">
        <div class="hotCity">
          <el-autocomplete
            size="mini"
            class="inline-input"
            v-model="state1"
            :fetch-suggestions="queryCity"
            placeholder="请输入城市名"
            :trigger-on-focus="false"
            @select="citySelect"
            prefix-icon="el-icon-search"
          ></el-autocomplete>
          <dl class="meter">
            <dt><h2>热门城市：</h2></dt><dd :class="{'on': city==cityName}" v-for="(city,key) in hotCity" @click="citySelect({value:city,order:key})">{{city}}</dd>
          </dl>
          <i class="el-icon-close" @click="panel_control('cityP_show')"></i>
        </div>
        <div class="alphabet">
          <dl class="meter">
            <dt><h2>按省份首字母选择：</h2></dt><dd v-for="item in city" :class="{'on':letter_selected.cityBox==item.firstLetter}" v-text="item.firstLetter" @click="selectLetter('cityBox', item.firstLetter)"></dd>
          </dl>
        </div>
        <div class="straightCity" v-if="city&&city[0]&&city[0].firstLetter==''">
          <dl class="meter" v-if="city[0].provinces&&city[0].provinces[0]">
            <dt><h2>直辖市：</h2></dt>
            <dd v-for="item in city[0].provinces[0].citys" @click="citySelect({value:item.cityName})">{{item.cityName}}</dd>
          </dl>
        </div>
        <div class="city" v-if="city.length">
          <el-scrollbar style="width: 100%;height: 100%;" wrapClass="cityBox">
            <dl v-for="(item,key) in city" v-if="key!=0">
              <dt v-text="item.firstLetter" :data-key="item.firstLetter"></dt>
              <dd v-for="column in item.provinces"><h2>{{column.provinceName}}：</h2><span v-for="col in column.citys" @click="citySelect({value:col.cityName})">{{col.cityName}}</span></dd>
            </dl>
          </el-scrollbar>
        </div>
        <div class="city" v-else>
          <bi-empty :show-result="false">
            <span slot="tips">亲爱的，网络链接异常，请耐心等待</span>
          </bi-empty>
        </div>
      </div>
      </transition>
      <transition name="el-zoom-in-top">
        <div class="brandPanel" v-if="panel.brandP_show">
          <div class="brandSearch">
            <el-autocomplete
              size="mini"
              class="inline-input brandInput"
              v-model="state2"
              :fetch-suggestions="queryBrand"
              placeholder="快速搜索"
              :trigger-on-focus="false"
              @select="brandSelect"
              prefix-icon="el-icon-search"
            ></el-autocomplete>
            <div class="brandTag">
              <el-tag
                v-for="tag in brandNameArr"
                :key="tag.id"
                @close="handleClose(tag)"
                size="small"
                closable>
                {{tag.name}}
              </el-tag>
            </div>
            <i class="el-icon-close" @click="panel_control('brandP_show')"></i>
          </div>
          <div class="alphabet">
            <dl class="meter">
              <dt><h2>按首字母选择：</h2></dt><dd v-for="item in brand" :class="{'on':letter_selected.manfsBox==item.firstLetter}" v-text="item.firstLetter" @click="selectLetter('manfsBox', item.firstLetter)"></dd>
            </dl>
          </div>
          <div class="brand" v-if="brand.length">
            <el-scrollbar style="width: 100%;height: 100%;" wrapClass="manfsBox">
              <el-checkbox-group v-model="brandIdArr" :max="10">
                <dl v-for="item in brand">
                  <dt v-text="item.firstLetter" :data-key="item.firstLetter"></dt>
                  <dd><el-checkbox v-for="column in item.manfBrands" :label="column.manfBrandId" :key="column.manfBrandId">{{column.manfBrandName}}</el-checkbox></dd>
                </dl>
              </el-checkbox-group>
            </el-scrollbar>
          </div>
          <div class="brand" v-else>
            <bi-empty :show-result="false">
              <span slot="tips">亲爱的，网络链接异常，请耐心等待</span>
            </bi-empty>
          </div>
          <div class="brandBtn">
            <span @click="resetData('brand')">重置</span>
            <span @click="handleSubmit('brandP_show')">确定</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import JQuery from 'jquery'
  import BiEmpty from '@index/components/empty.vue'
  import mixin from '@index/config/mixin.js'
	export default {
  	name: 'search',
    mixins: [mixin],
    data(){
  	  return{
        state1:'',
        state2:'',
        brandIdArr:[],
        brandNameArr: [],
        panel: {
          cityP_show: false,
          brandP_show: false,
          accreditP_show: false,
          netPointP_show: false,
          showStyleP_show: false,
        },
        selectGroup: {
          accredit: {
            checkedOption: [],
            option: ['授权', '未授权'],
            checkAll: false,
            isIndeterminate: false,
          },
          netPoint:{
            checkedOption: [],
            option: ['2S店', '4S店'],
            checkAll: false,
            isIndeterminate: false,
          },
          showStyle:{
            checkedOption: ['经销店简称'],
            option: ['经销店简称', '经销店简称+厂商品牌', '厂商品牌', '经销店工商注册名称'],
            checkAll: false,
            isIndeterminate: true,
          },
        },
        hotCity: ['北京市', '广州市', '深圳市', '南京市', '上海市', '杭州市', '重庆市', '成都市'],
        letter_selected: {
          cityBox: '',
          manfsBox: '',
        },
        showStyleStatus: '',
      }
    },
    computed: {
      associate() {
        let associate = []
        for ( let x in this.city) {
          for(let y in this.city[x].provinces) {
            for(let z in this.city[x].provinces[y].citys) {
              associate.push({
                value: this.city[x].provinces[y].citys[z].cityName
              })
            }
          }
        }
        return associate
      },
      brandNamesArr() {
        let brandNamesArr = []
        for ( let x in this.brand) {
          for(let y in this.brand[x].manfBrands) {
            brandNamesArr.push({
              value: this.brand[x].manfBrands[y].manfBrandName,
              key: this.brand[x].manfBrands[y].manfBrandId
            })
          }
        }
        return brandNamesArr
      },
      manfBrandMap() {
        let manfBrandMap = {}
        for ( let x in this.brand) {
          for(let y in this.brand[x].manfBrands) {
            let key = this.brand[x].manfBrands[y].manfBrandId
            manfBrandMap[key] = this.brand[x].manfBrands[y].manfBrandName
          }
        }
        return manfBrandMap
      }
    },
    props: {
      cityName: {
        type: String,
        default: '北京'
      },
      city: {
        type: Array,
        default: () => {
          return []
        }
      },
      brand: {
        type: Array,
        default: () => {
          return []
        }
      },
      cooperation: {
        type: Array,
        default: () => {
          return []
        }
      },
      netPoint: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    watch: {
      cooperation() {
        let data = this.selectGroup
        if (this.cooperation.length) {
          data.accredit.option = this.cooperation.map(item => {return item.cooperativeNature})
        }
        this.selectGroup = data
      },
      netPoint() {
        let data = this.selectGroup
        if (this.netPoint.length) {
          data.netPoint.option = this.netPoint.map(item => {return item.networkType})
        }
        this.selectGroup = data
      },
      brandIdArr() {
        this.brandNameArr = []
        this.brandIdArr.map( id => {
          let name = this.manfBrandMap[id]
          this.brandNameArr.push({id:id, name:name})
        })
      }
    },
    mounted() {
      this.showStyleStatus = this.selectGroup.showStyle.checkedOption[0]
    },
    methods: {
      selectLetter: function(boxId, letter, animate = true) {
        this.letter_selected[boxId] = letter
        var parent = document.querySelector('.' + boxId)
        if (!parent)return
        var target = parent.querySelector('[data-key="' + letter + '"]')
        , scrollTop = target.offsetTop - parent.offsetTop
        setTimeout(() => {
          if (animate) {
            JQuery('.' + boxId).animate({scrollTop: scrollTop}, 300, 'swing')
          } else {
            JQuery('.' + boxId).scrollTop(scrollTop)
          }
        }, 10)
      },
      citySelect(item) {
        this.panel_control('city_panel')
        this.$emit('selectCity', item.value)
      },
      brandSelect(item) {
        if(this.brandIdArr.length>=10){
          this.$message('最多可选择10个品牌!');
          return
        }
        this.brandIdArr.map( model => {
          if(model==item.key){
           return
         }
        })
        this.brandIdArr.push(item.key)
      },
      handleClose(tag) {
        let brandIds = [];
        this.brandIdArr.map( id => {
          if(tag.id!=id){
            brandIds.push(id)
          }
        });
        this.brandIdArr = brandIds
      },
      queryCity(queryString, cb) {
        var restaurants = this.associate;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      queryBrand(queryString, cb) {
        var restaurants = this.brandNamesArr;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleCheckAllChange(val) {
        this.selectGroup[val].checkedOption = this.selectGroup[val].checkAll ? this.selectGroup[val].option : [];
        this.selectGroup[val].isIndeterminate = false;
        // this.submitData()
      },
      handleCheckedChange(val) {
        let checkedCount = this.selectGroup[val].checkedOption.length;
        this.selectGroup[val].checkAll = checkedCount === this.selectGroup[val].option.length;
        this.selectGroup[val].isIndeterminate = checkedCount > 0 && checkedCount < this.selectGroup[val].option.length;
        // this.submitData()
      },
      radioChecked(item,key) {
        this.selectGroup.showStyle.checkedOption=[item]
        this.selectGroup.showStyle.checkedKey=key
      },
      radioSubmit() {
        this.panel.showStyleP_show = false
        this.showStyleStatus = this.selectGroup.showStyle.checkedOption[0]
        this.$emit('handleShowStyle', this.selectGroup.showStyle.checkedKey)
      },
      panel_control(name){
        this.panel[name]=!this.panel[name]
        for(let i in this.panel){
          if(i!=name){
            this.panel[i]=false
          }
        }
      },
      handleSubmit(params) {
        this.panel_control(params)
        this.submitData()
      },
      submitData() {
        let form = {
          manfBrandIds: this.brandIdArr,
          cooperativeNatures: this.selectGroup.accredit.checkedOption,
          networkTypes: this.selectGroup.netPoint.checkedOption,
        }
        this.$emit('filterNetwork', form)
      },
      resetData(params) {
        switch(params){
          case 'brand':
            this.brandIdArr = []
            break
          case 'accredit':
            this.selectGroup.accredit.checkedOption = []
            this.selectGroup.accredit.isIndeterminate = false
            this.selectGroup.accredit.checkAll = false
            break
          case 'netPoint':
            this.selectGroup.netPoint.checkedOption = []
            this.selectGroup.netPoint.isIndeterminate = false
            this.selectGroup.netPoint.checkAll = false
            break
          case 'showStyle':
            this.selectGroup.showStyle.checkedOption = ['经销店简称']
            this.selectGroup.showStyle.isIndeterminate = false
            this.selectGroup.showStyle.checkAll = false
            this.showStyleStatus = this.selectGroup.showStyle.checkedOption[0]
            break
        }
      },
      clearData() {
        ['brand', 'accredit', 'netPoint'].map(key => {
          this.resetData(key)
        })
      }
    },
    components: {BiEmpty}
  }
</script>
<style lang="scss" type="text/scss" scoped>
  @import "~@index/assets/scss/style";
  .header-el-popover-cont-s{
    .dropGroup{
      border-bottom: 1px solid $line-color;@include clearfix();
      .dropGroupHead{padding: 14px 26px;}
      &>span{
        border-right: 1px solid $line-color;cursor: pointer;float: left;position: relative;
        &:first-child i{margin: 0 6px 0 0}
      }
      &>span:last-child{float: right;border: none;width: 200px;text-align: right;}
      &>span:last-child div{padding-left: 0;}
      .icon-form_search{font-size: 12px;}
      i{margin-left:6px;}
      i.on{color: #428ece;}
    }
    .dropDown{position: absolute;top:42px;left: -1px;width: calc(100% + 2px);background: #fff;border: 1px solid $line-color;z-index: 1;font-size: 12px;
      .el-checkbox {
        margin-left: 0;display: block;text-align: left;padding: 10px 5px 10px 26px;@include text-hide();
        &:hover{background: #f3f3f3;}
      }
      .el-checkbox__input.is-checked + .el-checkbox__label{color: #666;}
      li{
        padding: 10px 10px 10px 20px;
        &:hover{background: #f3f3f3;}
      }
    }
    .alphabet{
      border-top: 1px solid $line-color;border-bottom: 1px solid $line-color;padding-left: 20px;
      span{width: 20px;display: inline-block;text-align: center;}
    }
    .cityPanel,.brandPanel{background: #fefefe;position: absolute;@include box-shadow(0, 3px, 5px, #999);width: 100%;overflow: hidden;z-index: 1700;font-size: 12px;}
    .hotCity{
    @include clearfix();
      .el-autocomplete{float: left;}
      dl{float: left;}
    }
    .straightCity{
      border-bottom: 1px solid $line-color;padding-left: 20px;
      dt{width: 90px;}
    }
    .meter{
      @include clearfix();padding: 17px 0;
      dt{float: left;padding-right: 10px;text-align: right;@include text-hide();}
      dd{float: left;padding-right: 16px;@include text-hide();cursor: pointer;}
      dd.on{color: #428ece;}
      dd:hover{color: #428ece;}
    }
    .city{
      height: 224px;padding: 8px 0 16px 10px;
      dl{
        @include clearfix();
        dd{
          position: relative;float: left;@include clearfix();width: calc(100% - 30px);padding-left: 70px;
          span{float: left;@include clearfix();margin: 11px 14px 11px 0;cursor: pointer;}
          span:hover{color: #428ece;}
          h2{position: absolute;left: 0;float: left;width: 70px;@include clearfix();padding: 11px 10px 11px 0;@include text-hide();text-align: right;}
          &:nth-of-type(n+2) {margin-left: 30px;}
        }
      }
      dt{width: 30px;text-align: center;padding: 11px 0;color: #428ece;float: left;}
    }
    .brand{
      height: 256px;padding: 6px 0 10px 10px;
      i{margin-right: 4px;}
      dl{@include clearfix();}
      dt{position: relative;float: left;width: 36px;text-align: center;padding: 11px 0;color: #428ece;font-size: 12px;line-height: 19px;}
      dd{
        @include clearfix();width: calc(100% - 36px);margin-left: 36px;cursor: pointer;
        .el-checkbox{float: left;width: 156px;@include clearfix();margin: 11px 10px;@include text-hide();}
        .el-checkbox:hover{color: #428ece;}
      }
    }
    .brandInput{float: left;}
    .brandTag{
      float: left;width: calc(100% - 302px);padding: 10px; 
      span{margin-left: 8px;}
    }
    .brandSearch{@include clearfix();}
    .brandBtn{
      text-align: center;padding: 16px 0;border-top: 1px solid $line-color;
      span:first-child{@include button(110px, 32px, #696969);margin-right: 20px;}
      span:last-child{@include button(110px, 32px, #246ca9);}
    }
    .dropDownBtn{
      text-align: center;padding: 8px 0;
      span:first-child{@include button(40%, 32px, #696969);margin-right: 4px;}
      span:last-child{@include button(40%, 32px, #246ca9);}
    }
    .el-autocomplete{width: 220px;margin: 10px 10px 10px 20px;}
    .el-icon-circle-check{color: #428ece;}
    .el-icon-close{float: right;cursor: pointer;padding: 18px;}
    .el-checkbox__label{font-size: 12px;}
    @include font-adjust();
    @include clearfix();
    @at-root .left-menu-shrink.right-menu-open &{left: 60px; right: 280px}
    text-align:left;  line-height: 1;position: relative;
  }
</style>
