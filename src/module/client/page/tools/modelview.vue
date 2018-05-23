<template>

  <div>
    <div class="content-top-floor" style="height: 51px;"></div>
    <div class="content-top" id="content-top">
      <div class="pageinfo">
        <bi-title columnTitle="周度销量预警" columnIcon="icon-jisuanqixian" columnText="专业的汽车营销决策工具">
        </bi-title>
        <div class="right-box">
          数据源：
          <el-dropdown style="float: right; height: 30px;" @command="changeDataSource" >
            <span class="bi-button" style="width: 115px;">{{ ds_name }}<i class="el-icon-arrow-down el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="4">上险数</el-dropdown-item>
              <el-dropdown-item command="5">终端零售量</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="nav">
      <a href="#/tools">销量预警</a>
      <a href="#/tools/submarket" >细分市场</a>
      <a href="#/tools/munfsummary">厂商概况</a>
      <a href="#/tools/modelview" class="on">车型概览</a>
    </div>
    <div class="content-main">
      <bi-panel>
        <template slot="title">
          <font>快速通道</font>
        </template>
        <div class="fast-aisle">
          <div class="condition" v-show="where.length > 0">
            <em>已选条件：</em>
            <font v-for="(item,key) in where" :key="key"> {{ item.name }} <i @click="deleteItem(item.type)">x</i></font>
            <a @click="clearAll()" href="javascript:void(0)">重置条件</a>
          </div>
          <dl>
            <dt>热门厂商：</dt>
            <dd>
              <a v-for="(item,key) in manfs_group" :class="{'on':item.id==selected_manf_id}" href="javascript:void(0)" :data-value="item.manf_id" @click="changeManf(item.id)">{{ item.manf_name }}</a>
            </dd>
          </dl>
          <span class="more-info" @click="dialogFormVisible = true;">更多 <i class="iconfont icon-unfold"></i></span>
          <el-dialog title="选择厂商" :visible.sync="dialogFormVisible" :modal-append-to-body="false" width="900px">
            <div class="more-info-cont">
              <h4>
                <a v-for="(group, letter) in manfsGroupByLetter" @click="selectLetter(letter)" :class="{on: letter_selected == letter}">{{ letter }}</a>
              </h4>
              <ul id="manfsBox">
                <li v-for="(group, letter) in manfsGroupByLetter">
                  <label :data-key="letter">{{ letter }}</label>
                  <span>
                    <a v-for="(item, key) in group" href="javascript:void(0)" :class="{'on':item.id==selected_manf_id}" @click="changeManf(item.id)">{{ item.manf_name }}</a>
                  </span>
                </li>
              </ul>
            </div>
          </el-dialog>
          <dl v-if="brands.length > 0">
              <dt>品牌：</dt>
              <dd>
                  <template v-for="(item,key) in brands">
                      <a :class="{'on':item.id==selected_brand_id}" href="javascript:void(0)" :data-value="item.id" @click="changeBrand(item.id)">{{ item.brand_name }}</a>
                  </template>
              </dd>
          </dl>
          <dl v-if="models.length > 0">
              <dt>车型：</dt>
              <dd style="height: auto;width: calc( 100% - 80px )">
                  <template v-for="(item, key) in models">
                      <a :href="'#/tools/modeldetail?sub_model_id='+item._id" target="_blank">{{ item.model_name }}</a>
                  </template>
              </dd>
          </dl>
        </div>
      </bi-panel>

      <bi-panel>
        <template slot="title">
          <font>{{ sub_segment_name }} - </font><cite class="font-red">{{ warning_month_week }}</cite>
          <el-popover placement="bottom" width="540" trigger="click" popper-class="padding0" v-model="subSegmentOnClass">
            <i class="iconfont icon-unfold reference" slot="reference"></i>
            <div class="popover-cont">
              <dl v-for="(item,key) in segments">
                <dt>{{ item.segment_name }}</dt>
                <dd>
                  <span v-for="(sub_item,sub_key) in item.sub_segment" @click="changeSubSegment(sub_item.sub_segment_id, sub_item.sub_segment_name)" :class="{on:sub_item.sub_segment_id==sub_segment_id}">{{ sub_item.sub_segment_name }}</span>
                </dd>
              </dl>
            </div>
          </el-popover>
        </template>
        <div class="manuf">
          <table>
            <thead>
              <tr>
                <th width="15%">车型</th>
                <th width="15%">{{ this_month }}月零售量</th>
                <th width="20%">{{ this_month }}月市场份额</th>
                <th width="15%">{{ warning_month }}月预判值</th>
                <th width="15%">{{ warning_month }}月预测环比</th>
                <th width="15%">{{ warning_month }}月预测同比</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,k) in sm_overview" v-if="k!=0">
                <td><a :href="'#/tools/modeldetail?sub_model_id='+item.id" target="_blank">{{ item.name }}</a></td>
                <td><bi-cell :data="item" field1="sales" cls="warning-text"></bi-cell></td>
                <td><bi-cell :data="item" field2="per"></bi-cell></td>
                <td><bi-cell :data="item" field1="warning" cls="font-red warning-text"></bi-cell></td>
                <td><bi-cell :data="item" field2="mom"></bi-cell></td>
                <td><bi-cell :data="item" field2="yoy"></bi-cell></td>
              </tr>
            </tbody>
          </table>
        </div>
      </bi-panel>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BiTitle from '@index/components/title.vue'
  import BiPanel from '@index/components/panel.vue'
  import BiSubPanel from '@index/components/subpanel.vue'
  import BiCell from '@index/components/cell.vue'

  import JQuery from 'jquery'
  import mixin from '@index/config/mixin.js'

  export default {
    name: 'model',
    mixins: [mixin],
    data() {
      return {
        manfs_static: [
            {id: 89, manf_name: '上汽大众'},
            {id: 109, manf_name: '一汽-大众'},
            {id: 93, manf_name: '上汽通用'},
            {id: 22, manf_name: '长安福特'},
            {id: 30, manf_name: '东风本田'},
            {id: 34, manf_name: '东风日产'},
            {id: 25, manf_name: '长安汽车'},
        ],
        manfsGroupByLetter: [],
        pageSize: 10,
        sm_overview_page: 0,
        segment_id: 24,
        sub_segment_id: 6,
        sub_segment_name: 'A-M',
        subSegmentOnClass: false,
        letter_selected: 'A',
        selected_manf_id: 0,
        selected_brand_id: 0,

        brands: [],
        models: [],
        segments: [],
        sm_overview: [],
        sm_overview_all: [],
        where: [],
        showMore: true,
        dialogFormVisible:false,
      }
    },
    computed: {
      manfs_group: function() {
        var is_contain = false;
        for (var i in this.manfs_static) {
          if (this.manfs_static[i]['id'] == this.selected_manf_id){
            is_contain = true;break;
          }
        }
        if (this.selected_manf_id && !is_contain) {
          return [this.manfs_brands_models_map[this.selected_manf_id]].concat(this.manfs_static);
        } else {
          return this.manfs_static;
        }
      },
      manfs_brands_models_map: function() {
        var manfs_brands_models_map = [];
        if (this.manfsGroupByLetter) {
          for (var letter in this.manfsGroupByLetter) {
            for (var x in this.manfsGroupByLetter[letter]) {
              var manf = this.manfsGroupByLetter[letter][x];
              manfs_brands_models_map[manf.id] = manf;
            }
          }
        }
        return manfs_brands_models_map;
      },
    },
    mounted() {
      this.getToken(() => {
        this.getDataSource()
      });
    },
    methods: {
      changeDataSource: function (ds_id) {
        this.ds_id = ds_id
        this.loadData()
      },
      selectLetter: function(letter) {
        this.letter_selected = letter;
        var target = document.querySelector('[data-key="' + letter + '"]');
        var parent = document.querySelector('#manfsBox');
        var scrollTop = target.offsetTop - parent.offsetTop - 10;
        setTimeout(() => {
          JQuery('#manfsBox').animate({scrollTop: scrollTop}, 300, 'swing', () => {
          });
        }, 10)
      },
      changeManf: function(manf_id) {
        this.selected_manf_id = manf_id;
        var manfs_brands_models_map = this.manfs_brands_models_map;
        var manf_name = manfs_brands_models_map[manf_id]['manf_name'];
        this.where.splice(0, 2, {type:'manf', value: manf_id, name: manf_name});
        this.selected_brand_id = 0;
        this.brands = manfs_brands_models_map[manf_id] && manfs_brands_models_map[manf_id]['brand'] ? manfs_brands_models_map[manf_id]['brand'] : [];
        this.models = [];
        this.dialogFormVisible = false
      },
      changeBrand: function(brand_id) {
        this.selected_brand_id = brand_id;
        var brand_name = ''
        , brand = {}
        for (var x in this.brands) {
          if (brand_id == this.brands[x]['id']) {
            brand_name = this.brands[x]['brand_name'];
            brand = this.brands[x]
            break;
          }
        }
        this.where.splice(1, 1, {type:'brand', value: brand_id, name: brand_name});
        this.models = brand.model;
      },
      changeSubSegment: function(sub_segment_id, sub_segment_name) {
        this.sub_segment_id = sub_segment_id
        this.sub_segment_name = sub_segment_name
        this.subSegmentOnClass = false
        this.getSmOverview({sub_segment_id: sub_segment_id})
      },
      //  清空已选
      clearSelectedManf: function() {
        this.selected_manf_id = 0;
        this.selected_brand_id = 0;
        this.brands = [];
        this.models = [];
        this.where.splice(0, 2);
      },
      //  清空已选
      clearSelectedBrand: function() {
        this.selected_brand_id = 0;
        this.models = [];
        this.where.splice(1, 1);
      },
      deleteItem: function(type) {
        if (type == 'manf') this.clearSelectedManf();
        if (type == 'brand') this.clearSelectedBrand();
      },
      clearAll: function() {
        this.selected_manf_id = 0;
        this.selected_brand_id = 0;
        this.brands = [];
        this.models = [];
        this.where.splice(0, 2);
      },
      getDataSource() {
        this.$request.get(this.$interface.GET_DATA_SOURCE, {
          token: this.token
        }, (response) => {
          this.dataSource = response.data[0];
          this.loadData();
        }, this.failure);
      },
      getBaseInfo() {
        this.$request.get(this.$interface.GET_NEWS_BASE_INFO, {
          token: this.token
        }, (response) => {
          this.manfsGroupByLetter = response.data[0].manf_brand
        }, this.failure);
      },
      getSubSegment() {
        this.$request.get(this.$interface.GET_SEG_SUBSEG, {
          token: this.token
        }, (response) => {
          this.segments = response.data
        }, this.failure)
      },
      getSmOverview(params = {sub_segment_id: this.sub_segment_id}) {
        this.$request.get(this.$interface.GET_SM_OVERVIEW, {
          token: this.token,
          ds_id: this.ds_id,
          ym: this.this_year_month,
          ymw: this.warning_year_month_week,
          sub_segment_id: params.sub_segment_id,
        }, (response) => {
          this.sm_overview = response.data || []
        }, this.failure)
      },
      loadData() {
        this.initParam()
        this.getBaseInfo()
        this.getSubSegment()
        this.getSmOverview()
      },
      initParam() {
        var ds = this.data_source_map();
        if (!ds || ds.size == 0) {
          return false;
        }

        if (this.ds_id && this.this_year_month == ""){
          this.this_year_month = this.end_year_month + "";
        }
        if (this.this_year_month > this.end_year_month && this.this_year_month < this.begin_year_month){
          this.this_year_month = this.end_year_month + "";
        }
        this.warning_year_month_week = this.warning_end_year_month_week + "";
      },
    },
    components:{
      BiTitle,
      BiPanel,
      BiSubPanel,
      BiCell
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "~@index/assets/scss/common";

  .nav{
    @include clearfix();
    margin: 0 10px 10px;background-color: #34495e;
    a{
      @include font-adjust(16px, 50px, #fff);
      display:block; float:left; width: 15%; height: 50px; cursor: pointer; margin-right: 1px;
      &:hover{background-color: #52b2e2}
      &.on{background-color: #00b4f3}
    }
  }

  .manuf{
    padding: 10px 20px;
  }

  .fast-aisle{
    padding: 20px; position: relative;
    .condition{
      padding: 5px 15px;  color: #999;  font: 14px/30px "Microsoft YaHei";  margin: 0 0 20px 0;  border: 1px solid #f1f1f1;
      em{ color: #333; margin-right: 5px;}
      font{
        @include box-Module(inline, auto, 24px, 0 5px 0 0, 0 5px, #fff, 1px solid #c1c8d0);
        cursor: pointer; line-height: 22px; color: #666;
        &:hover{
          border-color: #f04848;
          color: #f04848;
        }
      }
      a{
        color: #333;
      }
    }
    dl{
      height: auto; @include clearfix();
    }
    dt{
      @include font-adjust(14px, 32px, #6e6e6e, right, 100);
      width: 70px; margin-right: 10px; float: left;
    }
    dd{
      @include text-hide();
      float: left;width: calc( 100% - 170px );
      a{
        @include box-Module(block, 120px, 32px, 0 15px 20px 0, 0, #fff, 1px solid #e3e7ea);
        @include radius(1234, 2px);
        @include text-hide();
        @include font-adjust(14px, 32px, #555);
        float: left;
        &:hover{
          border-color: #00b4f3; color: #00b4f3;
        }
        &.on{
          background-color: #00b4f3; color: #fff; border-color: #00b4f3;
        }
      }
    }
    .more-info{
      position: absolute;top: 30px; right: 30px;
      @include font-adjust(14px, 30px, #333);
      cursor: pointer;
      &:hover{  color: #339ace}
    }
  }

  table{
    text-align: center;font-size: 12px; margin-bottom: 20px;
    tr{
      border-bottom:1px solid #f5f4fa;color: #535b66;
      &:nth-child(n+2):hover{background-color: #fcfcfc}
      &:nth-child(1) th:nth-child(1),
      td:nth-child(1) {
        text-align: left; padding-left: 15px;
        i{
          font-size: 15px; margin-right: 10px; cursor: pointer; color: #0080c1;
          &:hover{color: #f04048}
        }
      }
      &.sub-content{
        background-color: #fcfcfe;
        td:nth-child(1){padding-left: 50px;}
      }

    }
    th{
      height: 34px; color: #989898;font-weight: 100;
    }
    td{
      height: 52px; font-size: 14px;
    }
    a{
      color: #0080c1;
      &:hover{color: #f04048;text-decoration: underline;}
    }
    .progress-box{width: 60%; margin: 0 auto}
    .circle{
      @include box-Module(block, 18px, 18px, 0 auto, 0, #75c204);
      @include radius(1234, 50%);
    }
  }

  .warning-explain{
    h2 {
      @include font-adjust(15px, 40px, #555, left, 700);
      border-bottom: 1px solid #eee; padding-left: 15px;
    }
    table {width: 100%;margin: 10px 0}
    tr {height: 60px;border-bottom: 1px solid #eee;}
    span {
      @include box-Module(block, 24px, 24px, 0 auto, #eee);
      @include radius(1234, 50%);
      @include font-adjust(12px, 24px, #fff);
    }
    p {color: #666;}
  }


  .more-info-cont{
    @include clearfix();
    h4{
      @include clearfix();
      border-bottom: 1px solid #eee; padding: 0 10px; background-color: #fcfcfc;
      a{
        @include font-adjust(14px, 34px, #555);
        display: block; float: left;width: 40px;
        &:hover { color: #339ace}
        &.on{color: #339ace; border-bottom: 1px solid #339ace}
      }
    }
    ul{max-height: 500px; overflow: auto; padding-top: 10px;}
    li{
      @include clearfix();margin-bottom: 10px;
      label{ display:block; width: 50px; float: left; text-align: center; line-height: 32px;}
      span{display: block; float: left; width: calc(100% - 100px); border-bottom:1px solid #f4f4f4;}
      a{
        display: block;height: 32px; padding: 0 10px; margin:  0 10px 10px;
        @include font-adjust(14px, 34px, #333); float: left;
        &:hover, &.on{
          background-color: #00b4f3;color: #fff;
        }
      }
    }
  }

  .reference{
    @include transition();
    color: #999999; cursor: pointer;
  }
  .popover-cont{
    overflow: auto; max-height: 400px;
    dl{
      @include clearfix();
      font-size: 14px;border-bottom: 1px solid #efefef;
    }
    dt{
      @include box-Module(block, 100px, auto, 0 10px 0 0, 0, #fafafa);
      @include font-adjust(14px, 44px, #666);
      float: left;border-right: 1px solid #eee;
    }
    dd{
      width: calc(100% - 110px); height: 44px;background-color: #fff;text-align: left;float: left; padding: 6px 0;
      span{
        @include box-Module(block, 90px, auto, 0 10px 0 0, 0, #fff);
        @include text-hide();
        @include font-adjust(14px, 32px, #555);
        float: left;cursor: pointer;
        &:hover, &.on{
          background-color: #00b4f3; color: #fff;
        }
      }
    }
  }

</style>
