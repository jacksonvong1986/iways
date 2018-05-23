<template>
  <div>
    <div class="content-top-floor" style="height: 51px;"></div>
    <div class="content-top" id="content-top">
      <div class="pageinfo">
        <bi-title columnTitle="周度销量预警" columnIcon="icon-jisuanqixian" columnText="专业的汽车营销决策工具">
        </bi-title>
        <div class="right-box">
          数据源：
          <el-dropdown style="float: right; height: 30px;" @command="changeDataSource">
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
      <a href="#/tools/submarket"  class="on">细分市场</a>
      <a href="#/tools/munfsummary">厂商概况</a>
      <a href="#/tools/modelview">车型概览</a>
    </div>
    <div class="content-main">
      <bi-panel>
        <template slot="title">
          <font>快速通道</font>
        </template>
        <div class="fast-aisle">
          <dl v-for="(group_item, group_key) in segments">
            <dt>{{ group_key }}：</dt>
            <dd>
              <a v-for="(item,key) in group_item" :href="'#/tools/marketdetail?segment_id='+item.segment_id" target="_blank">{{ item.segment_name }}</a>
            </dd>
          </dl>
        </div>
      </bi-panel>

      <bi-panel>
        <template slot="title">
          <font>细分市场 - </font><cite class="font-red">{{ warning_month_week }}</cite>
        </template>
        <div class="sub-market">
          <table>
            <thead>
              <tr>
                <th width="15%">乘用车</th>
                <th width="15%">{{ this_month }}月零售量</th>
                <th width="20%">{{ this_month }}月市场份额</th>
                <th width="15%">{{ warning_month }}月预测环比</th>
                <th width="15%">{{ warning_month }}月预判值</th>
                <th>{{ warning_month }}月预测同比</th>
              </tr>
            </thead>
            <tbody v-for="(item, key) in seg_overview" >
              <tr>
                <td>
                  <template v-if="item.children">
                    <i :class="['iconfont', segExpand[key] ? 'icon-move' : 'icon-add2']" @click="triggerStatus('seg', key)"></i>
                    <a target="_blank" :href="'#/tools/marketdetail?segment_id='+item.id">{{ item.name }}</a>
                  </template>
                  <template v-else>
                    <font class="font-red" target="_blank" href="javascript:void(0)" v-if="key == 0">{{ item.name }}</font>
                    <a target="_blank" :href="'/tools/marketdetail?segment_id='+item.id" v-else>{{ item.name }}</a>
                  </template>
                </td>
                <td><bi-cell :data="item" field1="sales" cls="warning-text"></bi-cell></td>
                <td><div class="progress-box"><bi-progress :percentage="item.per" :color="color_group[item.color]" height="20" ></bi-progress></div></td>
                <td><bi-cell :data="item" field2="mom"></bi-cell></td>
                <td><bi-cell :data="item" field1="warning" cls="font-red warning-text"></bi-cell></td>
                <td><bi-cell :data="item" field2="yoy"></bi-cell></td>
              </tr>
              <tr class="sub-content" v-if="item.children && item.children.length" v-for="(sub_item, k) in item.children" v-show="segShow[key]">
                <td>{{ sub_item.name }}</td>
                <td><bi-cell :data="sub_item" field1="sales" cls="warning-text"></bi-cell></td>
                <td><div class="progress-box"><bi-progress :percentage="sub_item.per" :color="color_group[sub_item.color]" height="20" ></bi-progress></div></td>
                <td><bi-cell :data="sub_item" field2="mom"></bi-cell></td>
                <td><bi-cell :data="sub_item" field1="warning" cls="font-red warning-text"></bi-cell></td>
                <td><bi-cell :data="sub_item" field2="yoy"></bi-cell></td>
              </tr>
            </tbody>
          </table>
          <div class="load-more" v-show="showMore">
            <span @click="getMoreSegment">加载更多细分市场 <i class="iconfont icon-unfold"></i></span>
          </div>
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
  import BiProgress from '@index/components/progress.vue'

  import mixin from '@index/config/mixin.js'

	export default {
		name: 'submarket',
    mixins: [mixin],
		data() {
			return {
        pageSize: 10,
        seg_overview_page: 0,

        baseInfo: {},
        segments: [],
        seg_overview: [],
        seg_overview_all: [],
        showMore: true,
        segShow: [],
        segExpand: [],
			}
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
      getDataSource() {
        this.$request.get(this.$interface.GET_DATA_SOURCE, {
          token: this.token
        }, (response) => {
          this.dataSource = response.data[0];
          this.loadData();
        }, this.failure);
      },
      triggerStatus: function(type, key) {
        var objShow = this[type+'Show']
        , objExpand = this[type+'Expand']
        if (objShow && objExpand) {
          objShow.push('')
          objShow.pop()
          objShow[key] = !objShow[key]
          objExpand[key] = !objExpand[key]
        }
      },
      getSegment() {
        this.$request.get(this.$interface.GET_SEG, {
          token: this.token,
        }, (response) => {
          var sortKey = ['CAR', 'SUV', 'MPV', '跑车'];
          var segments = response.data[0] || {};
          var data = {};
          sortKey.map(function(key) {
            data[key] = segments[key] ? segments[key] : [];
          });
          this.segments = data
        }, this.failure)
      },
      getMoreSegment: function() {
        if (this.seg_overview_page * this.pageSize < this.seg_overview_all.length) {
          this.seg_overview_page += 1;
          var limit = this.seg_overview_page * this.pageSize;
          this.seg_overview = this.seg_overview_all.slice(0, limit);
          if (limit >= this.seg_overview_all.length) {
            this.showMore = false
          }
        }
      },
      getSegOverview() {
        this.$request.get(this.$interface.GET_SEG_OVERVIEW, {
          token: this.token,
          ds_id: this.ds_id,
          ym: this.this_year_month,
          ymw: this.warning_year_month_week
        }, (response) => {
          this.seg_overview_all = response.data || []
          this.getMoreSegment()
        }, this.failure)
      },
      loadData() {
        this.initParam()
        this.getSegment()
        this.getSegOverview()
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
      BiCell,
      BiProgress
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

  .sub-market{
    padding: 10px 20px;
  }

  .fast-aisle{
    padding: 20px;
    dl{
      height: auto;@include clearfix();
    }
    dt{
      @include font-adjust(14px, 32px, #6e6e6e, right, 100);
      width: 50px; margin-right: 10px; float: left;
    }
    dd{
      @include text-hide();
      float: left;width: calc( 100% - 70px );
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
  }

  table{
    text-align: center;font-size: 12px; margin-bottom: 20px;
    tr{
      border-bottom:1px solid #f5f4fa;color: #535b66;
      &:nth-child(n+2):hover{background-color: #fcfcfc}
      &.sub-content{
        background-color: #fcfcfe;
        td:nth-child(1){padding-left: 50px;}
      }

    }
    th{
      height: 34px; color: #989898;font-weight: 100;
      &:nth-child(1) {
        text-align: left; padding-left: 15px;
      }
    }
    td{
      height: 52px; font-size: 14px;
      &:nth-child(1) {
        text-align: left; padding-left: 15px;
        i{
          @include box-Module(inline-block, 16px, 16px, 0 5px 0 0, 0, #0080c1);
          @include font-adjust(12px, 16px, #fff);
          @include radius(1234, 50%);
          cursor: pointer; vertical-align: sub;
          &:hover{background-color: #f04048}
        }
      }
    }
    a{
      color: #0080c1;
      &:hover{color: #f04048;text-decoration: underline;}
    }
    .progress-box{width: 50%; margin: 0 auto}
    .circle{
      @include box-Module(block, 18px, 18px, 0 auto, 0, #75c204);
      @include radius(1234, 50%);
    }
  }
</style>
