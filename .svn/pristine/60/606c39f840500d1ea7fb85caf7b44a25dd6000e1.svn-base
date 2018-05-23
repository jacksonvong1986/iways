<template>

  <div>
    <div class="content-top-floor" style="height: 51px;"></div>
    <div class="content-top" id="content-top">
      <div class="pageinfo">
        <bi-title columnTitle="周度销量预警" columnIcon="icon-jisuanqixian" columnText="专业的汽车营销决策工具">
        </bi-title>
        <div class="right-box">
          数据源：
          <el-dropdown style="float: right;" @command="changeDataSource">
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
      <a href="#/tools/munfsummary" class="on">厂商概况</a>
      <a href="#/tools/modelview">车型概览</a>
    </div>
    <div class="content-main">
      <bi-panel>
        <template slot="title">
          <font>快速通道 </font>
        </template>
        <div class="fast-aisle">
          <dl v-for="(group_item,group_key) in manfs_static">
            <dt>{{ group_key }}：</dt>
            <dd><a v-for="(item,key) in group_item" :href="'#/tools/munfdetail?manf_id='+item.manf_id" target="_blank">{{ item.manf_name }}</a></dd>
          </dl>
          <span class="more-info" @click="dialogFormVisible = true">更多厂商 <i class="iconfont icon-unfold"></i></span>
          <el-dialog title="选择厂商" :visible.sync="dialogFormVisible" :modal-append-to-body="false" width="900px">
            <div class="more-info-cont">
              <h4>
                <a v-for="(group, letter) in manfsGroupByLetter" @click="selectLetter(letter)" :class="{on: letter_selected == letter}">{{ letter }}</a>
              </h4>
              <ul id="manfsBox">
                <li v-for="(group, letter) in manfsGroupByLetter">
                  <label :data-key="letter">{{ letter }}</label>
                  <span>
                    <a v-for="(item, key) in group" :href="'#/tools/munfdetail?manf_id='+item.manf_id" target="_blank">{{ item.manf_name }}</a>
                  </span>
                </li>
              </ul>
            </div>
          </el-dialog>
        </div>
      </bi-panel>

      <bi-panel>
        <template slot="title">
          <font>厂商概况 - </font><cite class="font-red">{{ warning_month_week }}</cite>
        </template>
        <div class="manuf">
          <table>
            <thead>
              <tr>
                <th width="15%">厂商</th>
                <th width="15%">{{ this_month }}月零售量</th>
                <th width="20%">{{ this_month }}月市场份额</th>
                <th width="15%">{{ warning_month }}月预测环比</th>
                <th width="15%">{{ warning_month }}月预判值</th>
                <th>
                  预警
                  <el-tooltip placement="bottom" effect="light">
                    <div slot="content" class="warning-explain">
                      <h2>预警说明</h2>
                      <table>
                        <tr>
                          <td width="23.33%">
                            <span style="background-color: rgb(145, 187, 61)"></span>
                          </td>
                          <td width="53.33%">
                            <p>半月环比＞=市场均值</p>
                            <p>预测销量＞=过去3个月销量均值</p>
                          </td>
                          <td width="23.33%">
                            <span style="background-color: rgb(145, 187, 61)">A</span>
                          </td>
                        </tr>
                        <tr>
                          <td width="23.33%">
                            <span style="background-color: rgb(240, 173, 78)"></span>
                          </td>
                          <td width="53.33%">
                            <p>半月环比＞=市场均值</p>
                            <p>预测销量＜过去3个月销量均值</p>
                          </td>
                          <td width="23.33%">
                            <span style="background-color: rgb(240, 173, 78)">B</span>
                          </td>
                        </tr>
                        <tr>
                          <td width="23.33%">
                            <span style="background-color: rgb(252, 158, 107)"></span>
                          </td>
                          <td width="53.33%">
                            <p>半月环比＜市场均值</p>
                            <p>预测销量＞=过去3个月销量均值</p>
                          </td>
                          <td width="23.33%">
                            <span style="background-color: rgb(252, 158, 107)">C</span>
                          </td>
                        </tr>
                        <tr>
                          <td width="23.33%">
                            <span style="background-color:rgb(251, 107, 114)"></span>
                          </td>
                          <td width="53.33%">
                            <p>半月环比＜市场均值</p>
                            <p>预测销量＜过去3个月销量均值</p>
                          </td>
                          <td width="23.33%">
                            <span style="background-color: rgb(251, 107, 114)">D</span>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <i class="tootip-helf">?</i>
                  </el-tooltip>
                </th>
              </tr>
            </thead>
            <tbody v-for="(item, key) in mf_overview" :key="key">
              <tr>
                <td>
                  <template v-if="item.children">
                    <i :class="['iconfont', mfExpand[key] ? 'icon-move' : 'icon-add2']" @click="triggerStatus('mf', key)"></i>
                    <a target="_blank" :href="'#/tools/munfdetail?manf_id='+item.id">{{ item.name }}</a>
                  </template>
                  <template v-else>
                    <font class="font-red" target="_blank" href="javascript:void(0)" v-if="key == 0">{{ item.name }}</font>
                    <a target="_blank" :href="'/tools/munfdetail?manf_id='+item.id" v-else>{{ item.name }}</a>
                  </template>
                </td>
                <td><bi-cell :data="item" field1="sales" cls="warning-text"></bi-cell></td>
                <td><bi-cell :data="item" field2="mom"></bi-cell></td>
                <td><bi-cell :data="item" field2="yoy"></bi-cell></td>
                <td><bi-cell :data="item" field1="warning" cls="font-red warning-text"></bi-cell></td>
                <td>
                  <span v-if="key == 0">-</span>
                  <span v-else class="circle" :style="{background:color_group[item.color]}"></span>
                </td>
              </tr>
              <tr class="sub-content" v-if="item.children && item.children.length" v-for="(sub_item, k) in item.children" v-show="mfShow[key]==true" :key="k">
                <td>{{ sub_item.name }}</td>
                <td><bi-cell :data="sub_item" field1="sales" cls="warning-text"></bi-cell></td>
                <td><bi-cell :data="sub_item" field2="mom"></bi-cell></td>
                <td><bi-cell :data="sub_item" field2="yoy"></bi-cell></td>
                <td><bi-cell :data="sub_item" field1="warning" cls="font-red warning-text"></bi-cell></td>
                <td><span class="circle" :style="{background:color_group[sub_item.color]}"></span></td>
              </tr>
            </tbody>
          </table>
          <div class="pagination-box">
            <el-pagination
              background
              layout="prev, pager, next"
              prev-text="上一页"
              next-text="下一页"
              @current-change="getMfOverview"
              :page-size="pageSize"
              :total="total">
            </el-pagination>
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

  import JQuery from 'jquery'
  import mixin from '@index/config/mixin.js'

  export default {
    name: 'manf',
    mixins: [mixin],
    data() {
      return {
        manfs_static: {
            '自主': [
                {manf_id: 65, manf_name: '吉利汽车'},
                {manf_id: 25, manf_name: '长安汽车'},
                {manf_id: 27, manf_name: '长城汽车'},
                {manf_id: 47, manf_name: '广汽乘用车'},
                {manf_id: 112, manf_name: '一汽轿车'}
            ],
            '德系': [
                {manf_id: 89, manf_name: '上汽大众'},
                {manf_id: 109, manf_name: '一汽-大众'},
            ],
            '日系': [
                {manf_id: 30, manf_name: '东风本田'},
                {manf_id: 34, manf_name: '东风日产'},
                {manf_id: 46, manf_name: '广汽本田'},
                {manf_id: 48, manf_name: '广汽丰田'},
                {manf_id: 110, manf_name: '一汽丰田'},
            ],
            '美系': [
                {manf_id: 93, manf_name: '上汽通用'},
                {manf_id: 100, manf_name: '上汽通用五菱'},
                {manf_id: 22, manf_name: '长安福特'},
            ],
            '韩系': [
                {manf_id: 10, manf_name: '北京现代'},
                {manf_id: 36, manf_name: '东风悦达起亚'},
            ],
            '法系': [
                {manf_id: 98, manf_name: '神龙汽车'},
            ]
        },
        letter_selected: 'A',
        pageSize: 15,
        total: 0,
        mf_overview_page: 1,
        seg_overview_page: 0,
        mf_overview: [],
        mfShow: [],
        mfExpand: [],
        dialogFormVisible:false,
      }
    },
    computed: {
      manfsGroupByLetter: function() {
        var data = {};
        for (var x in this.manfs) {
            if (this.manfs[x]['first_letter'] == undefined) this.manfs[x]['first_letter'] = '';
            if (data[this.manfs[x]['first_letter']] == undefined) {
                data[this.manfs[x]['first_letter']] = [];
            }
            data[this.manfs[x]['first_letter']].push(this.manfs[x]);
        }
        return data;
      }
    },
    mounted() {
      this.getToken(() => {
        this.getManfs()
        this.getDataSource()
      });
    },
    methods: {
      changeDataSource: function (ds_id) {
        this.ds_id = ds_id
        this.loadData()
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
      getManfs() {
        this.$request.get(this.$interface.GET_MANFS, {
          token: this.token
        }, (response) => {
          this.manfs = response.data;
        }, this.failure);
      },
      getDataSource() {
        this.$request.get(this.$interface.GET_DATA_SOURCE, {
          token: this.token
        }, (response) => {
          this.dataSource = response.data[0];
          this.loadData();
        }, this.failure);
      },
      getMfOverview(page = 1) {
        this.$request.get(this.$interface.GET_MF_OVERVIEW, {
          token: this.token,
          ds_id: this.ds_id,
          ym: this.this_year_month,
          ymw: this.warning_year_month_week,
          page: page,
          rows: this.pageSize
        }, (response) => {
          this.mf_overview = response.data[0]['rows'] || []
          this.total = response.data[0]['records'] || 0
        }, this.failure)
      },
      loadData() {
        this.initParam()
        this.getMfOverview()
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

  .manuf{
    padding: 10px 20px;
  }

  .fast-aisle{
    padding:20px; position: relative;
    dl{
      height: auto; @include clearfix();
    }
    dt{
      @include font-adjust(14px, 32px, #6e6e6e, right, 100);
      width: 50px; margin-right: 10px; float: left;
    }
    dd{
      @include text-hide();
      float: left;width: calc( 100% - 150px );
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
      position: absolute;top: 20px; right: 10px;
      @include box-Module(block, 100px, 32px, 0, 0, #fff);
      @include font-adjust(14px, 30px, #333);
      cursor: pointer;
      &:hover{  color: #339ace}
    }
  }

  table{
    text-align: center;font-size: 12px; margin-bottom: 20px;
    tr{
      border-bottom:1px solid #f5f4fa;color: #535b66;
      //&:nth-child(2){color: #f04048};
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

// eleme组件重写
.el-dialog__body{padding: 0}
</style>
