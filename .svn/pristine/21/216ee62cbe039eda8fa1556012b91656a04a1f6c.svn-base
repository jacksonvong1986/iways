<template>

  <div>
    <div class="content-top-floor" style="height: 51px;"></div>
    <div class="content-top" id="content-top">
      <div class="pageinfo">
        <bi-title columnTitle="周度销量预警" columnIcon="icon-jisuanqixian" columnText="专业的汽车营销决策工具">
        </bi-title>
        <div class="right-box">
          数据源：
          <el-dropdown style="float: right;" trigger="click">
            <span class="bi-button" style="width: 115px;">上险数<i class="el-icon-arrow-down el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>上险数</el-dropdown-item>
              <el-dropdown-item>终端零售量</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="nav">
      <a href="#/tools/warning" class="on">销量预警</a>
      <a href="#/tools/submarket">细分市场</a>
      <a href="#/tools/munfsummary">厂商概况</a>
      <a href="#/tools/modelview">车型概览</a>
    </div>
    <div class="content-main">
      <bi-panel>
        <template slot="title">
          <font>整体市场 - </font><cite class="font-red">12月第二周</cite>
        </template>
        <div class="all-market">
          <div class="top">
              <span class="databox">
                <bi-cell :data="marketConcentrationData" field1="avg_bq" field2="avg_bq_mom" cls="font-red">
                  <em>12月 单车平均销量/环比</em>
                </bi-cell>
              </span>
            <span class="databox">
                <bi-cell :data="marketConcentrationData" field1="avg_bq" field2="avg_bq_mom" cls="font-red">
                  <em>12月 单车平均销量/环比</em>
                </bi-cell>
              </span>
            <span class="databox">
                <bi-cell :data="marketConcentrationData" field1="avg_bq" field2="avg_bq_mom" cls="font-red">
                  <em>12月 单车平均销量/环比</em>
                </bi-cell>
              </span>
            <span class="databox">
                <bi-cell :data="marketConcentrationData" field1="avg_bq" field2="avg_bq_mom" cls="font-red">
                  <em>12月 单车平均销量/环比</em>
                </bi-cell>
              </span>
          </div>
          <div id="chart-va" style="height:480px;"></div>
        </div>
      </bi-panel>

      <bi-panel>
        <template slot="title">
          <font>细分市场 - </font><cite class="font-red">12月第二周</cite>
        </template>
        <div class="sub-market">
          <table>
            <tr>
              <th width="15%">乘用车</th>
              <th width="15%">11月零售量</th>
              <th width="20%">11月市场份额</th>
              <th width="15%">12月预测环比</th>
              <th width="15%">12月预判值</th>
              <th>12月预测同比</th>
            </tr>
            <tr>
              <td>整体乘用车市场</td>
              <td>2,459,557</td>
              <td>-</td>
              <td><i class="iconfont icon-up"></i> 24.1%</td>
              <td><font class="font-red">3,053,322</font></td>
              <td><i class="iconfont icon-up"></i> 24.1%</td>
            </tr>
            <tr>
              <td><i class="iconfont icon-roundaddfill"  @click="show2 = !show2"></i><a href="">整体乘用车市场</a></td>
              <td>2,459,557</td>
              <td>  <div class="progress-box"><bi-progress percentage="0.5" color="#329acd" height="20" ></bi-progress></div></td>
              <td><i class="iconfont icon-up"></i> 24.1%</td>
              <td><font class="font-red">3,053,322</font></td>
              <td><i class="iconfont icon-up"></i> 24.1%</td>
            </tr>
            <transition name="el-zoom-in-top">
            <tr class="sub-content" v-show="show2">
              <td>A00</td>
              <td>2,459,557</td>
              <td>  <div class="progress-box"><bi-progress percentage="0.5" color="#329acd" height="20" ></bi-progress></div></td>
              <td><i class="iconfont icon-up"></i> 24.1%</td>
              <td><font class="font-red">3,053,322</font></td>
              <td><i class="iconfont icon-up"></i> 24.1%</td>
            </tr>
            </transition>
          </table>
        </div>
      </bi-panel>

      <bi-panel>
        <template slot="title">
          <font>厂商概况 - </font><cite class="font-red">12月第二周</cite>
        </template>
        <div class="manuf">
          <table>
            <tr>
              <th width="15%">厂商</th>
              <th width="15%">11月零售量</th>
              <th width="20%">11月市场份额</th>
              <th width="15%">12月预测环比</th>
              <th width="15%">12月预判值</th>
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
            <tr>
              <td>整体乘用车市场</td>
              <td>2,459,557</td>
              <td><i class="iconfont icon-up"></i> 24.1%</td>
              <td>3,50,332</td>
              <td><font class="font-red"><i class="iconfont icon-up"></i> 24.1%</font></td>
              <td>-</td>
            </tr>
            <tr>
              <td><i class="iconfont icon-roundaddfill"  @click="show3 = !show3"></i><a href="">上汽大众</a></td>
              <td>2,459,557</td>
              <td><i class="iconfont icon-up"></i> 24.1%</td>
              <td>3,50,332</td>
              <td><font class="font-red"><i class="iconfont icon-up"></i> 24.1%</font></td>
              <td><span class="circle"></span></td>
            </tr>
            <transition name="el-zoom-in-top">
              <tr class="sub-content" v-show="show3">
                <td>大众</td>
                <td>2,459,557</td>
                <td><i class="iconfont icon-up"></i> 24.1%</td>
                <td>3,50,332</td>
                <td><font class="font-red"><i class="iconfont icon-up"></i> 24.1%</font></td>
                <td><span class="circle"></span></td>
              </tr>
            </transition>
          </table>
          <div class="pagination-box">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="20">
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

  export default {
    name: '',
    data() {
      return {
        marketConcentrationData:{},
        show2: false,
        show3: false
      }
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

  .all-market{
    margin-bottom: 10px; padding: 20px;
    .top{
      @include clearfix();
      margin-bottom: 20px;
    }
    .databox{
      @include box-Module(block, calc(25% - 8px), auto, 0px 10px 0px 0px, 20px 0px 10px, #fff, 1px solid #f6f5fb );
      @include font-adjust(12px, 20px, #69696b);
      float: left;
      &:last-child{margin-right: 0}
      &:hover{
        @include box-shadow(3px, 3px, 4px, #ccc);
        @include transition(all, .35s);
        background-color: #339ace; border-color: #339ace; color: #fff;
        b, em{color: #fff;@include transition(all, .35s);}
      }
      b{font-size: 16px; font-weight: 100;}
      em{color: #aaa}
    }
  }

  .sub-market, .manuf{
    padding: 10px 20px;
  }

  table{
    text-align: center;font-size: 12px; margin-bottom: 20px;
    tr{
      border-bottom:1px solid #f5f4fa;color: #535b66;
      &:nth-child(2){color: #f04048};
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
    .progress-box{width: 50%; margin: 0 auto}
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

</style>
