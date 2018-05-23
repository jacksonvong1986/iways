<template>
	<div>
    <div class="content-top-floor"></div>
    <div class="content-top" id="content-top">
      <div class="pageinfo">
        <bi-title columnTitle="销量目标管理场景" columnIcon="icon-bingtu" :columnText="'当前数据：' + (manf_name ? manf_name : '厂商') + '-' + (ds_name ? ds_name : '数据源') + '-' + (year_month ? year_month : new Date().getFullYear() + '/' + (Number(new Date().getMonth()) + 1))">
        </bi-title>
        <div class="change-button">
          <el-popover placement="bottom-end" width="600" popper-class="padding0" v-model="selectOnClass">
            <!--<el-button slot="reference">更改 <i class="iconfont icon-xiao73"></i></el-button>-->
            <span class="bi-button"  slot="reference">
              更改<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <div style="width: 598px;">
              <h4 class="popover-title">
                <em>已选数据：</em>
                厂商：{{ manf_name_selected }}
                数据源：{{ ds_name_selected }}
                日期：{{ year_month_selected }}
              </h4>
              <div class="popover-main">
                <el-tabs type="border-card">
                  <el-tab-pane>
                    <span slot="label">厂商</span>
                    <ul class="change-manuf" id="letterBar">
                      <li class="letter">
                        <a href="javascript:void(0);" v-for="(group, first_letter) in manfsGroupByLetter" @click="selectLetter(first_letter)" :class="{on: letter_selected == first_letter}">{{ first_letter }}</a>
                      </li>
                      <li class="center">
                        <div id="manfsBox">
                          <dl v-for="(group, first_letter) in manfsGroupByLetter">
                            <dt :data-key="first_letter">{{ first_letter }}</dt>
                            <dd>
                              <span v-for="(item, key) in group"><el-radio v-model="manf_id_selected" :label="item.manf_id" :checked="item.manf_id==manf_id_selected">{{ item.manf_name }}</el-radio></span>
                            </dd>
                          </dl>
                        </div>
                      </li>
                    </ul>
                  </el-tab-pane>
                  <el-tab-pane>
                    <span slot="label">数据源</span>
                    <div class="change-datasource">
                      <dl v-for="(group, gkey) in dataSource" v-if="ds_group[gkey]">
                        <dt>{{ ds_group[gkey] }}：</dt>
                        <dd>
                          <el-radio v-for="(item, key) in group" :key="key" v-model="ds_id_selected" :label="item.ds_id" border>{{ item.name }}</el-radio>
                        </dd>
                      </dl>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane>
                    <span slot="label">日期</span>
                    <div class="change-date">
                      <span class="demonstration">请选择所需月份：</span>
                      <el-date-picker
                        v-model="this_year_month_selected"
                        format="yyyy/MM"
                        value-format="yyyyMM"
                        :picker-options="pickerOptions"
                        type="month">
                      </el-date-picker>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
              <div class="popover-footer">
                <a href="javascript:void(0);" @click="cancelData">取消</a>
                <a href="javascript:void(0);" @click="searchData" class="on">确定</a>
              </div>
            </div>
          </el-popover>
        </div>
        <div class="right-box">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/scene' }">销量目标管理场景</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <bi-tabs>
        <bi-tabs-item targetId="tabs1" :selected="true" @click="currentPath = '厂商销量目标看板'">厂商销量目标看板</bi-tabs-item>
        <bi-tabs-item targetId="tabs2"  @click="currentPath = '车型列表看板'">车型列表看板</bi-tabs-item>
      </bi-tabs>
    </div>
    <div class="content-main">
      <div id="tabs1">
        <draggable class="list-group" element="div" v-model="panels" :options="panelOptions" :move="onMove" @start="onStart" @end="onEnd">
          <transition-group type="transition" :name="'panel-list'" tag="div">
            <bi-panel v-for="element in panels" :key="element.index" v-show="element.show" @closePanel="closePanel(element.index)" :panel_key="element.index" :cls="{'list-group-item':editable}" >
              <template v-if="element.index == 1">
                <template slot="title">
                  <font>{{ element.name }}-</font><em class="font-blue">{{ this_month }}月</em>
                </template>
                <draggable class="sales-status" element="ul" :options="itemOptions[0]" v-loading="loading[0]">
                  <li class="left">
                    <abbr class="hot-spots" title="拖动此区域可更改布局">
                      <span>整体市场情况</span>
                      <i class="iconfont icon-tuodong over-move"></i>
                    </abbr>
                    <draggable element="div" :options="cellOptions[0]">
                      <bi-cell :data="thisMonthData" field1="whole_bq" field2="whole_yoy" type="default">
                        {{ this_month }}月 乘用车销量（同比增速）
                      </bi-cell>
                      <bi-cell :data="thisMonthData" field1="whole_acc_bq" field2="whole_acc_yoy" type="default">
                        1~{{ this_month }}月 乘用车销量（同比增速）
                      </bi-cell>
                    </draggable>
                  </li>
                  <li class="center">
                    <abbr class="hot-spots" title="拖动此区域可更改布局" style="height: auto; bottom: 0">
                      <i class="iconfont icon-tuodong over-move"></i>
                    </abbr>
                    <img v-bind:src="manfInfo.url ? 'http://image.way-s.cn' + manfInfo.url : null" v-bind:alt="manfInfo.manf_name" >
                    <p>{{ manfInfo.manf_name }}</p>
                  </li>
                  <li class="right">
                    <abbr class="hot-spots" title="拖动此区域可更改布局"><i class="iconfont icon-tuodong over-move"></i></abbr>
                    <draggable element="div" :options="cellOptions[1]" class="lattice4">
                        <bi-cell :data="thisMonthData" field1="ob_bq" field2="ob_yoy">
                          <em class="font-blue">{{ this_month }}月</em> 销量目标（同比增速）
                        </bi-cell>
                        <bi-cell :data="thisMonthData" field1="bq" field2="yoy">
                          <em class="font-blue">{{ this_month }}月</em> 销量实际（同比增速）
                        </bi-cell>
                        <bi-cell :data="thisMonthData" field1="pass_ratio" type="circle" >
                          <em class="font-blue">{{ this_month }}月</em> 实际完成率
                        </bi-cell>
                        <bi-cell :data="thisMonthData" field1="per" field2="per_yoy" :special="true">
                          <em class="font-blue">{{ this_month }}月</em> 份额实际（同比变化）
                        </bi-cell>
                        <bi-cell :data="thisMonthData" field1="ob_year" field2="ob_year_yoy">
                          <em class="font-blue">{{ this_year }}年</em> 销量目标（环比增速）
                        </bi-cell>
                        <bi-cell :data="thisMonthData" field1="acc_bq" field2="acc_yoy">
                          <em class="font-blue">1~{{ this_month }}月</em> 销量实际（同比增速）
                        </bi-cell>
                        <bi-cell :data="thisMonthData" field1="pass_time" field2="pass_task" type="bar" :color="color_group[thisMonthData.accColor]">
                          <em class="font-blue">1~{{ this_month }}月</em> 实际完成率
                        </bi-cell>
                        <bi-cell :data="thisMonthData" field1="acc_per" field2="acc_per_yoy" :special="true">
                          <em class="font-blue">1~{{ this_month }}月</em> 份额实际（同比变化）
                        </bi-cell>
                    </draggable>
                  </li>
                </draggable>
              </template>
              <template v-if="element.index == 2">
                <template slot="title">
                  <font>{{ element.name }}-</font>
                  <em class="font-red">{{ warning_month }}月W{{ warning_week }}周</em>
                  <router-link to="/" class="more-info">查看更多</router-link>
                </template>
                <span class="notice" slot="others">
                  <i class="iconfont icon-custom-wechat" @click="dialogVisible = true"></i>
                  <i class="iconfont icon-mobile" @click="dialogVisible = true"></i>
                  <el-dialog
                     title="智能推送"
                     :visible.sync="dialogVisible"
                     width="1000px"
                     :modal-append-to-body = "true"
                     :append-to-body = "true"
                   >
                    <div class="notice-content">
                      <h4>智能预警  <font>(当前预警超过临界值，系统已智能推送以下人员)</font></h4>
                      <ul>
                        <li>
                          <i>x</i>
                          <img src="/static/images/linshi/user1.png" alt="">
                          <p>
                            <label>李莉</label>
                            <span>销售部经理</span>
                          </p>
                        </li>
                        <li>
                          <i>x</i>
                          <img src="/static/images/linshi/user3.png" alt="">
                          <p>
                            <label>李勇</label>
                            <span>品牌广告科</span>
                          </p>
                        </li>

                      </ul>
                      <h4>自定义预警 <font>(您还可以发送预警情况到相关人员)</font></h4>
                      <ul>
                        <li>
                          <input type="checkbox">
                          <img src="/static/images/linshi/user5.png" alt="">
                          <p>
                            <label>李永娟</label>
                            <span>计划销售科</span>
                          </p>
                        </li>
                        <li>
                          <input type="checkbox">
                          <img src="/static/images/linshi/user6.png" alt="">
                          <p>
                            <label>钟强</label>
                            <span>网络开发科</span>
                          </p>
                        </li>
                        <li>
                          <input type="checkbox">
                          <img src="/static/images/linshi/user7.png" alt="">
                          <p>
                            <label>韩磊</label>
                            <span>市场营销部经理</span>
                          </p>
                        </li>
                        <li>
                          <input type="checkbox">
                          <img src="/static/images/linshi/user4.png" alt="">
                          <p>
                            <label>林达</label>
                            <span>信息与产品规划科</span>
                          </p>
                        </li>
                      </ul>
                    </div>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    </span>
                  </el-dialog>
                </span>
                <draggable class="sales-status warning" element="ul" :options="itemOptions[1]" v-loading="loading[1]">
                  <li class='left'>
                    <abbr class="hot-spots" title="拖动此区域可更改布局"><span>整体市场情况</span><i class="iconfont icon-tuodong over-move"></i></abbr>
                    <draggable element="div" :options="cellOptions[2]">
                      <bi-cell :data="warningMonthData" field1="whole_bq" field2="whole_yoy" type="default">
                        {{ warning_month }}月 乘用车销量预警（同比增速）
                      </bi-cell>
                      <bi-cell :data="warningMonthData" field1="whole_acc_bq" field2="whole_acc_yoy" type="default">
                        1~{{ warning_month }}月 乘用车销量预警（同比增速）
                      </bi-cell>
                    </draggable>
                  </li>
                  <li class='center'>
                    <abbr class="hot-spots" title="拖动此区域可更改布局" style="height: auto; bottom: 0"><i class="iconfont icon-tuodong over-move"></i></abbr>
                    <img v-bind:src="manfInfo.url ? 'http://image.way-s.cn' + manfInfo.url : null" v-bind:alt="manfInfo.manf_name" >
                    <p>{{ manfInfo.manf_name }}</p>
                  </li>
                  <li class='right'>
                    <abbr class="hot-spots" title="拖动此区域可更改布局"><i class="iconfont icon-tuodong over-move"></i></abbr>
                    <draggable element="div" :options="cellOptions[3]" class="lattice3">
                      <bi-cell :data="warningMonthData" field1="ob_bq" field2="ob_yoy">
                        <em class="font-red">{{ warning_month }}月</em> 销量目标（同比增速）
                      </bi-cell>
                      <bi-cell :data="warningMonthData" field1="bq" field2="yoy">
                        <em class="font-red">{{ warning_month }}月</em> 销量预警（同比增速）
                      </bi-cell>
                      <bi-cell :data="warningMonthData" field1="pass_ratio" type="circle">
                        <em class="font-red">{{ warning_month }}月</em> 预警完成率
                      </bi-cell>
                      <bi-cell :data="warningMonthData" field1="ob_year" field2="ob_year_mom">
                        <em class="font-red">{{ warning_year }}年</em> 销量目标（环比增速）
                      </bi-cell>
                      <bi-cell :data="warningMonthData" field1="acc_bq" field2="acc_yoy">
                        <em class="font-red">1~{{ warning_month }}月</em> 销量预警（同比增速）
                      </bi-cell>
                      <bi-cell :data="warningMonthData" field1="pass_time" field2="pass_task" type="bar" :color="color_group[warningMonthData.accColor]">
                        <em class="font-red">1~{{ warning_month }}月</em> 预警完成率
                      </bi-cell>
                    </draggable>
                  </li>
                </draggable>
              </template>
              <template v-if="element.index == 3">
                <template slot="title" >
                  <font>{{ element.name }}</font>
                </template>
                <draggable class="all-sales clear" element="ul" :options="itemOptions[2]">
                  <li class="manuf-show">
                    <abbr class="hot-spots" style="width:60%;"></abbr>
                    <h5 class="scene-title">
                      厂商排名
                      <span class="scene-btn">
                          <a :class="{ on: manfSalesRankClass == 0 }" href="javascript:void(0)" @click="getManfSalesRank(0)">本月</a>
                          <a :class="{ on: manfSalesRankClass == 1 }" href="javascript:void(0)" @click="getManfSalesRank(1)">累计</a>
                        </span>
                    </h5>
                    <table class="scene-table" v-loading="loading[2]">
                      <tr>
                        <th width="15%">厂商</th>
                        <th width="20%">销量</th>
                        <th width="15%">同比</th>
                        <th width="30%">份额 | 变化	</th>
                        <th>
                          <span v-if="manfSalesRankClass == 0">   {{ this_month }}月 完成率</span>
                          <span v-else> 1~{{ this_month }}月 完成率</span>
                        </th>
                      </tr>
                      <tr v-for="(item, key) in manfSalesRankData">
                        <td><img v-bind:src="item.manf.url ? 'http://image.way-s.cn' + item.manf.url : null" v-bind:alt="item.manf.manf_name" v-bind:title="item.manf.manf_name"></td>
                        <td>
                          <bi-cell :data="item" field1="bq"></bi-cell>
                        </td>
                        <td>
                          <bi-cell :data="item" field2="yoy"></bi-cell>
                        </td>
                        <td>
                          <bi-cell :data="item" field1="per" field2="change" :special="true" separate="|" bStyle="color:#666;font-size:12px;"></bi-cell>
                        </td>
                        <td>
                          <div style="width: 60%; margin: 0px auto">
                            <bi-progress :percentage="manfSalesRankData[0]['pass_time']" color="#00b4f3" height="14" v-if="key == 0 && manfSalesRankClass == 1 && manfSalesRankData[0]"  style="margin-bottom: 5px;"></bi-progress>
                            <bi-progress :percentage="item.pass_ratio" :color="color_group[item.color]" height="14"></bi-progress>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <div class="scene-bottom clear">
                      <a :class="{ on: manfSalesRankPage == 1 }" href="javascript:void(0)" @click="getManfSalesRank(manfSalesRankClass, 1)">1-12</a>
                      <a :class="{ on: manfSalesRankPage == 2 }"href="javascript:void(0)" @click="getManfSalesRank(manfSalesRankClass, 2)">13-24</a>
                      <a :class="{ on: manfSalesRankPage == 3 }"href="javascript:void(0)" @click="getManfSalesRank(manfSalesRankClass, 3)">25-36</a>
                    </div>
                  </li>
                  <li class="model-show">
                    <abbr class="hot-spots" style="width:60%;"></abbr>
                    <draggable element="div" :options="cellOptions[4]">
                      <div class="special" style="margin-bottom: 7px;">
                        <h5 class="scene-title">
                          国别表现
                          <span class="scene-btn">
                            <a :class="{ on: nationSalesClass == 0 }" href="javascript:void(0)" @click="getNationSales(0)">本月</a>
                            <a :class="{ on: nationSalesClass == 1 }" href="javascript:void(0)" @click="getNationSales(1)">累计</a>
                            </span>
                        </h5>
                        <table class="scene-table" v-loading="loading[3]">
                          <tr>
                            <th width="20%">国别</th>
                            <th width="25%">销量</th>
                            <th width="20%">同比</th>
                            <th width="">份额 | 变化</th>
                          </tr>
                          <tr v-for="(item, key) in nationSalesData">
                            <td>
                              <img :src="item.nati.url ? image_path + item.nati.url : null" :alt="item.nati.brand_nati_name" :title="item.nati.brand_nati_name"></td>
                            <td>
                              <bi-cell :data="item" field1="bq"></bi-cell>
                            </td>
                            <td>
                              <bi-cell :data="item" field2="yoy"></bi-cell>
                            </td>
                            <td>
                              <bi-cell :data="item" field1="per" field2="change" :special="true" separate="|" bStyle="color:#666;font-size:12px;"></bi-cell>
                            </td>
                          </tr>
                        </table>
                      </div>

                      <div class="special" style="border-bottom: 1px solid #eee;">
                        <h5 class="scene-title">
                          集团表现
                          <span class="scene-btn">
                            <a v-bind:class="{ on: groupsSalesClass == 0 }" href="javascript:void(0)" @click="getGroupsSales(0)">本月</a>
                            <a v-bind:class="{ on: groupsSalesClass == 1 }" href="javascript:void(0)" @click="getGroupsSales(1)">累计</a>
                          </span>
                        </h5>
                        <table class="scene-table" v-loading="loading[4]">
                          <tr>
                            <th width="20%">集团</th>
                            <th width="25%">销量</th>
                            <th width="20%">同比</th>
                            <th>份额 | 变化</th>
                          </tr>
                          <tr v-for="(item, key) in groupsSalesData">
                            <td>
                              <img :src="item.group.url ? image_path + item.group.url : null" v-bind:alt="item.group.manf_group_name" :title="item.group.manf_group_name">
                            </td>
                            <td>
                              <bi-cell :data="item" field1="bq"></bi-cell>
                            </td>
                            <td>
                              <bi-cell :data="item" field2="yoy"></bi-cell>
                            </td>
                            <td>
                              <bi-cell :data="item" field1="per" field2="change" :special="true" seperate="|" bStyle="color:#666;font-size:12px;"></bi-cell>
                            </td>
                          </tr>
                        </table>
                        <div class="scene-bottom clear">
                          <a :class="{ on: groupsSalesPage == 1 }" href="javascript:void(0)" @click="getGroupsSales(groupsSalesClass, 1)">1-3</a>
                          <a :class="{ on: groupsSalesPage == 2 }" href="javascript:void(0)" @click="getGroupsSales(groupsSalesClass, 2)">4-6</a>
                          <a :class="{ on: groupsSalesPage == 3 }" href="javascript:void(0)" @click="getGroupsSales(groupsSalesClass, 3)">7-9</a>
                        </div>
                      </div>
                    </draggable>
                  </li>
                  <li class="brand-show">
                    <abbr class="hot-spots" style="width:60%;"></abbr>
                    <h5 class="scene-title">
                      <em>{{ manf_name }}-品牌表现</em>
                      <span class="scene-btn">
                        <a v-bind:class="{ on: brandsSalesClass == 0 }" href="javascript:void(0)" @click="getBrandsSales(0)">本月</a>
                        <a v-bind:class="{ on: brandsSalesClass == 1 }" href="javascript:void(0)" @click="getBrandsSales(1)">累计</a>
                      </span>
                    </h5>
                    <div style="padding: 0 20px;">
                      <table class="scene-table noboder" v-loading="loading[5]">
                        <tr v-for="(item, key) in brandsSalesData">
                          <td width="80px;">
                            <img :title="item.brand.brand_name" :src="item.brand.url ? 'http://image.way-s.cn' + item.brand.url : null" v-bind:alt="item.brand.brand_name">
                          </td>
                          <td style="padding-left: 10%">
                            <template v-if="brandsSalesClass == 0">
                              <font :title="this_month + '月销量'">{{ this_month }}月销量</font><span><b class="font-blue">{{ item.bq | number_format(0,',') }}</b></span><br>
                            </template>
                            <template v-if="brandsSalesClass == 1">
                              <font :title="'1~' + this_month + '月销量'">1~{{ this_month }}月销量</font><span><b class="font-blue">{{ item.bq | number_format(0,',') }}</b></span><br>
                            </template>
                            <font title="同比增长">同比增长</font><span><i :class="[{ iconfont: 1 }, item.yoy < 0 ? 'icon-down' : 'icon-up']"></i> {{ item.yoy | multiply(100) | number_format(1) }}%</span><br>
                            <font title="市占率">市占率</font><span>{{ item.per | multiply(100) | number_format(1) }}%<i :class="[{ iconfont: 1 }, item.change < 0 ? 'icon-down' : 'icon-up']"></i> {{ item.change | multiply(100) | number_format(1) }}%</span>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </li>
                </draggable>
              </template>
              <template v-if="element.index == 4">
                <template slot="title">
                  <font>{{ manf_name }}{{ element.name }}</font>
                </template>
                <div class="sub-sales">
                  <h5 class="scene-title">
                    <template v-if="segmentSalesClass == 0">零售量现状-<font class="font-blue">{{ this_month }}月</font></template>
                    <template v-if="segmentSalesClass == 1">零售量现状-<font class="font-blue">1~{{ this_month }}月</font></template>
                    <span class="scene-btn">
                      <a v-bind:class="{ on: segmentSalesClass == 0 }" href="javascript:void(0)" @click="getSegmentsSales(0)">本月</a>
                      <a v-bind:class="{ on: segmentSalesClass == 1 }" href="javascript:void(0)" @click="getSegmentsSales(1)">累计</a>
                    </span>
                  </h5>
                  <table class="scene-table noboder" v-loading="loading[6]">
                    <tr>
                      <th width="10%">汽车类型</th>
                      <th width="20%">销量</th>
                      <th width="20%">份额</th>
                      <th width="10%">细分市场</th>
                      <th width="25%">销量(同比增速)</th>
                      <th>份额(同比变化)</th>
                    </tr>
                    <tr v-for="(item, key) in lastMonthSegmentData">
                      <td><em>{{ item.vehicle_type_name }}</em></td>
                      <td>
                        <bi-cell :data="item" field1="bq" field2="yoy"></bi-cell>
                      </td>
                      <td>
                        <bi-cell :data="item" field1="per" field2="change" :special="true"></bi-cell>
                      </td>
                      <td>
                        <p v-for="(vo, k) in item.segment"><cite>{{ vo.segment_name }}</cite></p>
                      </td>
                      <td>
                        <p v-for="(vo, k) in item.segment">
                          <bi-cell :data="vo" field1="bq" field2="yoy"></bi-cell>
                        </p>
                      </td>
                      <td>
                        <p v-for="(vo, k) in item.segment">
                          <bi-cell :data="vo" field1="per" field2="change" :special="true"></bi-cell>
                        </p>
                      </td>
                    </tr>
                  </table>
                </div>
              </template>
              <template v-if="element.index == 5">
                <template slot="title">
                  <font>{{ manf_name }}{{ element.name }}</font>
                  <em class="font-blue" v-if="regionsSalesClass == 0">-{{ this_month }}月实际销量</em>
                  <em class="font-blue" v-if="regionsSalesClass == 1">-1~{{ this_month }}月实际销量累计</em>
                </template>
                <div class="area-market">
                  <h5 class="scene-title optional">
                    <a href="javascript:void(0);" :class="{ on: regionsSalesBrand == 0 }"@click="getRegionsSales(regionsSalesClass, 0)">全部</a>
                    <template v-for="(item, key) in manfInfo.brandlist">
                    <a href="javascript:void(0);" :class="{ on: regionsSalesBrand == item.brand_id }" @click="getRegionsSales(regionsSalesClass, item.brand_id)">{{ item.brand_name }}</a>
                    </template>
                    <span class="scene-btn">
                      <a v-bind:class="{ on: regionsSalesClass == 0 }" href="javascript:void(0)" @click="getRegionsSales(0, regionsSalesBrand)">本月</a>
                      <a v-bind:class="{ on: regionsSalesClass == 1 }" href="javascript:void(0)" @click="getRegionsSales(1, regionsSalesBrand)">累计</a>
                    </span>
                  </h5>
                  <table class="scene-table noboder" v-loading="loading[7]">
                    <tr>
                      <th width="10%">区域划分</th>
                      <th width="25%">{{ this_year }}销量目标（同比增速）</th>
                      <th width="30%">销量（同比增速）</th>
                      <th width="15%">
                        <span v-if="regionsSalesClass == 0">{{ this_month }}月完成率</span>
                        <span v-if="regionsSalesClass == 1">1~{{ this_month }}月完成率</span>
                      </th>
                      <th>份额(同比变化)</th>
                    </tr>
                    <tr v-for="(item, key) in regionsSalesData" class="has-border">
                      <td><font class="fw700">{{ item.region_name }}</font></td>
                      <td>
                        <bi-cell :data="item" field1="ob_bq" field2="ob_yoy"></bi-cell>
                      </td>
                      <td>
                        <bi-cell :data="item" field1="bq" field2="yoy"></bi-cell>
                      </td>
                      <td>
                        <div style="height: 15px; width: 80%; margin: 0px auto;">
                          <bi-progress :percentage="item.pass_time" color="#00b4f3" height="15" v-if="key == 0 && regionsSalesClass == 1 && regionsSalesData[0]" style="margin-bottom: 5px;"></bi-progress>
                          <bi-progress :percentage="item.pass_ratio" :color="color_group[item.ratioColor]" height="15"></bi-progress>
                        </div>
                      </td>
                      <td>
                        <bi-cell :data="item" field1="per" field2="per_yoy" :special="true"></bi-cell>
                      </td>
                    </tr>
                  </table>
                </div>
              </template>
            </bi-panel>
          </transition-group>
        </draggable>
        <bi-lift :panels="panels" :scroll_selected="scroll_selected" @reachFloor="reachFloor" @updatePanels="updatePanels"></bi-lift>
      </div>
      <div id="tabs2" style="display: none">
        <div class="carlist-header">
          <h4 class="panel-title">
            请选择筛选条件
            <span>
              <input type="text" placeholder="请输入品牌或车型搜索" v-model="keyword" @keyup="searchModelsQuick()"  @focus="searchModelsQuick()" @keyup.enter="searchModels()">
              <i class="iconfont icon-sousuo" @click="searchModels()"></i>
              <ul v-if="models_matches.length > 0 && isShowModelBox" class="animated fadeInUp time">
                <li v-for="(model, mKey) in models_matches" @click="selectModel(model.sub_model_name)">
                  <em>{{ model.sub_model_name }}</em>
                </li>
              </ul>
            </span>
          </h4>
          <div v-loading="loading[8]">
            <dl>
              <dt>品牌 ：</dt>
              <dd>
                <span>
                  <a href="javascript:void(0)" v-bind:class="{'on': 0 == brand_id}" v-on:click="selectBrand(0)">不限</a>
                  <template v-for="(brand, bKey) in brands">
                    <a href="javascript:void(0)" v-bind:class="{'on': brand.brand_id == brand_id}" v-on:click="selectBrand(brand.brand_id, brand.brand_name)">{{ brand.brand_name }}</a>
                  </template>
                </span>
                <font style="display:none;">更多 <i class="iconfont icon-xiao73"></i></font>
              </dd>
            </dl>
            <dl>
              <dt>车型 ：</dt>
              <dd>
                <span>
                  <a href="javascript:void(0)" v-bind:class="{'on': 0 == segment_id}" v-on:click="selectSegment(0)">不限</a>
                  <template v-for="(segment, sKey) in segments">
                    <a href="javascript:void(0)" v-bind:class="{'on': segment.vehicle_type_id == segment_id}" v-on:click="selectSegment(segment.vehicle_type_id, segment.vehicle_type_name)">{{ segment.vehicle_type_name }}</a>
                  </template>
                </span>
                <font style="display:none;">更多 <i class="iconfont icon-xiao73"></i></font>
              </dd>
            </dl>
          </div>
        </div>
        <bi-panel>
          <template slot="title">
            <font>{{ brand_name }}品牌车型</font>
          </template>
          <template slot="operating">
            <a href="javascript:;" style="margin-right: 5px;" class="btn-col" title="图文展示" :class="{'on':showType==2}" @click="setShowType(2)"><i class="iconfont icon-apps" style="font-size: 17px;"></i></a>
            <a href="javascript:;" class="btn-row" title="列表展示" :class="{'on':showType==1}" @click="setShowType(1)"><i class="iconfont icon-fenlei" style="font-size: 18px;"></i></a>
          </template>
          <div class="carlist-main" v-loading="loading8">
            <template v-if="models.length>0">
              <h5>
                <b v-if="segment_id">{{ segment_name }}</b>为您找到<em>{{ models.length || 0 }}</em>款车型
                <span class="scene-btn">
                  <a v-bind:class="{ on: modelsSalesClass == 0 }" href="javascript:void(0)" @click="getModelsSales(0)">本月</a>
                  <a v-bind:class="{ on: modelsSalesClass == 1 }" href="javascript:void(0)" @click="getModelsSales(1)">累计</a>
                </span>
              </h5>
              <div class="show-col" v-if="showType==2">
                <div class="cards" v-for="(item3, mKey) in models">
                  <a :href="'#/scene/model?sub_model_id='+item3.sub_model_id+'&ds_id='+ds_id+'&ym_id='+this_year_month+'&ymw_id='+warning_year_month_week" target="_blank">
                    <dl>
                      <dt>
                        <img v-bind:src="item3.url ? image_path + item3.url : '/static/images/nocar.png'" :alt="item3.sub_model_name">
                        <span style="display:none;"><em>问题指数 : </em> <i> 10 </i></span>
                      </dt>
                      <dd>
                        <a :href="'#/scene/model?sub_model_id='+item3.sub_model_id+'&ds_id='+ds_id+'&ym_id='+this_year_month+'&ymw_id='+warning_year_month_week" target="_blank">
                          <font :title="item3.sub_model_name">{{ item3.sub_model_name }}</font>
                          <span v-if="item3.new_desc && item3.new_desc.indexOf('新车') >= 0" class="on">{{ item3.new_desc }}</span>
                          <span v-else-if="item3.new_desc">{{ item3.new_desc }}</span>
                        </a>
                        <p>
                           <template v-if="item3.tp">
                           TP : <b>￥{{ item3.tp.lowest_tp | number_format(1) }}~{{ item3.tp.higher_tp | number_format(1) }}万</b>
                           </template>
                           <template v-else>
                           TP : 亲，暂无数据。
                           </template>
                           <br>
                           <template v-if="item3.msrp">
                           MSRP : <font v-bind:title="'￥' + item3.msrp.lowest_msrp + '~ ' +  item3.msrp.higher_msrp +'万'">￥{{ item3.msrp.lowest_msrp | number_format(1) }}~{{ item3.msrp.higher_msrp | number_format(1) }}万</font>
                           </template>
                           <template v-else>
                           MSRP : 亲，暂无数据。
                           </template>
                           </br>
                           <template v-if="item3.discount_max != -1">
                           折扣率 : <em>{{ item3.discount_min | multiply(100) | number_format(1) }}~{{ item3.discount_max | multiply(100) | number_format(1) }}%</em>
                           </template>
                           <template v-else>
                           折扣率 : 亲，暂无数据。
                           </template>
                        </p>
                      </dd>
                    </dl>
                    <ul>
                      <li class="left">
                        <div v-if="modelsSalesClass == 0">
                          <p>{{ this_month }}月零售目标</p>
                          <div class="progress-box">
                            <bi-progress :percentage="item3.this_month_target/modelsSalesData.max_sales" color="#80858c" height="15" :show-text="false"></bi-progress>
                          </div>
                          <font style="color: #80858c">{{ item3.this_month_target | number_format }}</font>
                        </div>
                        <div v-else>
                          <p>全年累计零售目标</p>
                          <div class="progress-box">
                            <bi-progress :percentage="item3.ob_year/modelsSalesData.max_sales" color="#80858c" height="15" :show-text="false"></bi-progress>
                          </div>
                          <font style="color: #80858c">{{ item3.ob_year | number_format }}</font>
                        </div>
                        <div v-if="modelsSalesClass == 0">
                          <p>{{ this_month }}月零售实际</p>
                          <div class="progress-box">
                            <bi-progress :percentage="item3.this_month/modelsSalesData.max_sales" :color="color_group[item3.pass_color]" height="15" :show-text="false"></bi-progress>
                          </div>
                          <font style="color:#329acd;">{{ item3.this_month | number_format }}</font>
                        </div>
                        <div v-else>
                          <p>1~{{ this_month }}月累计零售实际</p>
                          <div class="progress-box">
                            <bi-progress :percentage="item3.yearacc/modelsSalesData.max_sales" :color="color_group[item3.pass_color]" height="15" :show-text="false"></bi-progress>
                          </div>
                          <font style="color:#329acd;">{{ item3.yearacc | number_format }}</font>
                        </div>
                      </li>
                      <li class="right">
                        <template v-if="modelsSalesClass == 0">
                          <bi-progress class="progress-circle" type="circle" :percentage="item3.pass_ratio" circleWidth="60" stroke-width="5" color="#339ace"></bi-progress>
                          <font>{{ this_month }}月实际完成率</font>
                        </template>
                        <!-- 点击累计显示如下 -->
                        <template v-else>
                          <font>1~{{ this_month }}月实际累计完成率</font>
                          <div class="progress-box"><bi-progress :percentage="thisMonthData.pass_time" color="#00b4f3" height="14" ></bi-progress></div>
                          <div class="progress-box"><bi-progress :percentage="item3.pass_ratio" :color="color_group[item3.pass_color]" height="14" ></bi-progress></div>
                        </template>
                      </li>
                    </ul>
                    <ul class="noboder" v-if="!(ds_id==2||ds_id==3)">
                      <li class="left">
                        <div class="clear" v-if="modelsSalesClass == 0">
                          <p>{{ warning_month }}月零售目标预警</p>
                          <div class="progress-box"><bi-progress :percentage="item3.next_month_target/modelsSalesData.max_sales" color="#80858c" height="15" :show-text="false"></bi-progress></div>
                          <font style="color: #80858c">{{ item3.next_month_target | number_format }}</font>
                        </div>
                        <div class="clear">
                          <p>{{ warning_month }}月预警</p>
                          <div class="progress-box"><bi-progress :percentage="item3.next_month_warning/modelsSalesData.max_sales" :color="color_group[item3.warning_pass_color]" height="15" :show-text="false"></bi-progress></div>
                          <font style="color:#329acd;">{{ item3.next_month_warning | number_format }}</font>
                        </div>
                      </li>
                      <li class="right">
                        <template v-if="modelsSalesClass == 0">
                          <bi-progress class="progress-circle" type="circle" :percentage="item3.warning_pass_ratio" circleWidth="60" stroke-width="5" color="#fb6b72"></bi-progress>
                          <font>{{ warning_month }}月实际完成率</font>
                        </template>
                        <!-- 点击累计显示如下 -->
                        <template v-else>
                          <font>1~{{ warning_month }}月实际累计完成率</font>
                          <div class="progress-box"><bi-progress :percentage="thisMonthData.pass_time" color="#00b4f3" height="14" ></bi-progress></div>
                          <div class="progress-box"><bi-progress :percentage="item3.warning_pass_ratio" :color="color_group[item3.warning_pass_color]" height="14" ></bi-progress></div>
                        </template>
                      </li>
                    </ul>
                  </a>
                </div>
              </div>
              <div class="show-row" v-if="showType==1">
                <div class="cards" v-for="(item3, mKey) in models">
                  <a :href="'#/scene/model?sub_model_id='+item3.sub_model_id+'&ds_id='+ds_id+'&ym_id='+this_year_month+'&ymw_id='+warning_year_month_week" class="clear">
                    <dl>
                      <dt>
                        <img v-bind:src="item3.url ? image_path + item3.url : '/static/images/nocar.png'" :alt="item3.sub_model_name">
                        <span style="display:none;"><em>问题指数 : </em> <i> 10 </i></span>
                      </dt>
                      <dd>
                        <a :href="'#/scene/model?sub_model_id='+item3.sub_model_id+'&ds_id='+ds_id+'&ym_id='+this_year_month+'&ymw_id='+warning_year_month_week">
                          <font :title="item3.sub_model_name">{{ item3.sub_model_name }}</font>
                          <span class="on">{{ item3.new_desc }}</span>
                        </a>
                        <p>
                           <template v-if="item3.tp">
                           TP : <b>￥{{ item3.tp.lowest_tp | number_format(1) }}~{{ item3.tp.higher_tp | number_format(1) }}万</b>
                           </template>
                           <template v-else>
                           TP : 亲，暂无数据。
                           </template>
                           <br>
                           <template v-if="item3.msrp">
                           MSRP : <font v-bind:title="'￥' + item3.msrp.lowest_msrp + '~ ' +  item3.msrp.higher_msrp +'万'">￥{{ item3.msrp.lowest_msrp | number_format(1) }}~{{ item3.msrp.higher_msrp | number_format(1) }}万</font>
                           </template>
                           <template v-else>
                           MSRP : 亲，暂无数据。
                           </template>
                           </br>
                           <template v-if="item3.discount_max != -1">
                           折扣率 : <em>{{ item3.discount_min | multiply(100) | number_format(1) }}~{{ item3.discount_max | multiply(100) | number_format(1) }}%</em>
                           </template>
                           <template v-else>
                           折扣率 : 亲，暂无数据。
                           </template>
                        </p>
                      </dd>
                    </dl>
                    <ul>
                      <li class="left">
                        <div v-if="modelsSalesClass == 0">
                          <p>{{ this_month }}月零售目标</p>
                          <div class="progress-box">
                            <bi-progress :percentage="item3.this_month_target/modelsSalesData.max_sales" color="#80858c" height="15" :show-text="false"></bi-progress>
                          </div>
                          <font style="color: #80858c">{{ item3.this_month_target | number_format }}</font>
                        </div>
                        <div v-else>
                          <p>全年累计零售目标</p>
                          <div class="progress-box">
                            <bi-progress :percentage="item3.ob_year/modelsSalesData.max_sales" color="#80858c" height="15" :show-text="false"></bi-progress>
                          </div>
                          <font style="color: #80858c">{{ item3.ob_year | number_format }}</font>
                        </div>
                        <div v-if="modelsSalesClass == 0">
                          <p>{{ this_month }}月零售实际</p>
                          <div class="progress-box">
                            <bi-progress :percentage="item3.this_month/modelsSalesData.max_sales" :color="color_group[item3.pass_color]" height="15" :show-text="false"></bi-progress>
                          </div>
                          <font style="color:#329acd;">{{ item3.this_month | number_format }}</font>
                        </div>
                        <div v-else>
                          <p>1~{{ this_month }}月累计零售实际</p>
                          <div class="progress-box">
                            <bi-progress :percentage="item3.yearacc/modelsSalesData.max_sales" :color="color_group[item3.pass_color]" height="15" :show-text="false"></bi-progress>
                          </div>
                          <font style="color:#329acd;">{{ item3.yearacc | number_format }}</font>
                        </div>
                      </li>
                      <li class="right">
                        <template v-if="modelsSalesClass == 0">
                          <bi-progress class="progress-circle" type="circle" :percentage="item3.pass_ratio" circleWidth="60" stroke-width="5" color="#339ace"></bi-progress>
                          <font>{{ this_month }}月实际完成率</font>
                        </template>
                        <!-- 点击累计显示如下 -->
                        <template v-else>
                          <font>1~{{ this_month }}月实际累计完成率</font>
                          <div class="progress-box"><bi-progress :percentage="thisMonthData.pass_time" color="#00b4f3" height="14" ></bi-progress></div>
                          <div class="progress-box"><bi-progress :percentage="item3.pass_ratio" :color="color_group[item3.pass_color]" height="14" ></bi-progress></div>
                        </template>
                      </li>
                    </ul>
                    <ul class="mr0" v-if="!(ds_id==2||ds_id==3)">
                      <li class="left">
                        <div class="clear" v-if="modelsSalesClass == 0">
                          <p>{{ warning_month }}月零售目标预警</p>
                          <div class="progress-box"><bi-progress :percentage="item3.next_month_target/modelsSalesData.max_sales" color="#80858c" height="15" :show-text="false"></bi-progress></div>
                          <font style="color: #80858c">{{ item3.next_month_target | number_format }}</font>
                        </div>
                        <div class="clear">
                          <p>{{ warning_month }}月预警</p>
                          <div class="progress-box"><bi-progress :percentage="item3.next_month_warning/modelsSalesData.max_sales" :color="color_group[item3.warning_pass_color]" height="15" :show-text="false"></bi-progress></div>
                          <font style="color:#329acd;">{{ item3.next_month_warning | number_format }}</font>
                        </div>
                      </li>
                      <li class="right">
                        <template v-if="modelsSalesClass == 0">
                          <bi-progress class="progress-circle" type="circle" :percentage="item3.warning_pass_ratio" circleWidth="60" stroke-width="5" color="#fb6b72"></bi-progress>
                          <font>{{ warning_month }}月实际完成率</font>
                        </template>
                        <!-- 点击累计显示如下 -->
                        <template v-else>
                          <font>1~{{ warning_month }}月实际累计完成率</font>
                          <div class="progress-box"><bi-progress :percentage="thisMonthData.pass_time" color="#00b4f3" height="14" ></bi-progress></div>
                          <div class="progress-box"><bi-progress :percentage="item3.warning_pass_ratio" :color="color_group[item3.warning_pass_color]" height="14" ></bi-progress></div>
                        </template>
                      </li>
                    </ul>
                  </a>
                </div>
              </div>
            </template>
            <bi-empty v-else>{{ !!keyword_result.trim()?'“'+keyword_result.trim()+'”':'' }}</bi-empty>
          </div>
        </bi-panel>
      </div>
    </div>
	</div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import BiTitle from '@index/components/title.vue'
  import BiPanel from '@index/components/panel.vue'
  import BiLift from '@index/components/lift.vue'
  import BiCell from '@index/components/cell.vue'
  import BiProgress from '@index/components/progress.vue'
  import BiEmpty from '@index/components/empty.vue'
  import mixin from '@index/config/mixin.js'
  import bus from '@/config/eventBus.js'
  import JQuery from 'jquery'
  import Draggable from 'vuedraggable'
  import BiTabs from '@index/components/tabs'
  Vue.use(BiTabs);

  const names = [ '全国销量现状', '全国滚动预警', '整体市场销量', '细分市场销量', '区域市场表现']
	export default {
		name: 'ScenePage',
    mixins: [mixin],
		data() {
			return {
        panels: names.map( (name,index) => {return {name, index: index+1, fixed: false, show: true}; }),
        dialogVisible: false,

        headerHeight: 51,
        ds_group: {
          retail: '零售量',
          wholesale: '批发量',
        },
        manfs: [],
        letter_selected: 'A',
        selectOnClass: false,
        status:true,

        thisMonthData: {},
        warningMonthData: {},
        lastMonthSegmentData: {},
        thisMonthSegmentData: {},
        manfSalesRankData: {},
        nationSalesData: {},
        groupsSalesData: {},
        brandsSalesData: {},
        regionsSalesData: [],
        segmentData: [],
        modelsSalesData: [],

        // 面板参数
        image_path: 'http://dss.ways.cn/images29',
        segmentSalesClass: 0,
        segmentSalesWarningClass: 0,
        manfSalesRankClass: 0,
        manfSalesRankPage:1,
        nationSalesClass:0,
        groupsSalesClass:0,
        groupsSalesPage:1,
        brandsSalesClass:0,
        regionsSalesClass:0,
        regionsSalesBrand:0,
        modelsSalesClass:0,

        // 车型列表
        brand_id: 0,
        brand_name: '全部',
        segment_id: 0,
        segment_name: '',
        keyword: '',
        keyword_result: '',
        showType: localStorage.getItem('SHOW_TYPE') || 1,
        brands: [],
        segments: [],
        models: [],
        models_matches: [],
        isShowModelBox: false,
        modelsDelay: 500,
        loading: new Array(9).fill(0),
        loading8: 0, // 车型筛选加载并非异步独立区分
			}
		},
    mounted() {
      this.getToken(() => {
          this.getManfs()
          this.initBase()
          this.getDataSource()
      });
      this.onOver()
      window.addEventListener('scroll', this.scroll)

      var that = this
      bus.$on('updateConfig', function(config) {
        that.editable = config[7]
      })
    },
    computed: {
      manfsGroupByLetter: function () {
          var data = {};
          for (let manf of this.manfs) {
              manf['first_letter'] = manf['first_letter'] || '';
              if (!data.hasOwnProperty(manf['first_letter'])) {
                  data[manf['first_letter']] = [];
              }
              data[manf['first_letter']].push(manf);
          }
          return data;
      },
      manf_name_selected: function() {
          var data = this.get_manfs_map();
          if (data.hasOwnProperty(this.manf_id_selected)) {
              return data[this.manf_id_selected]['manf_name'] || '';
          }
      },
      ds_name_selected: function() {
          var data_source = this.data_source_map();
          if (data_source.hasOwnProperty(this.ds_id_selected)) {
              return data_source[this.ds_id_selected]['name'] || '';
          }
      },
      year_month_selected: function() {
          var year_month_arr = this.this_year_month_selected.split('');
          year_month_arr.splice(4, 0, '/');
          return year_month_arr.join('');
      },
      begin_year_month_selected: function(){
        var dataSource = this.data_source_map();
        return !!dataSource[this.ds_id_selected] ? dataSource[this.ds_id_selected]['begin_ym'] + "" : "";
      },
      end_year_month_selected: function(){
        var dataSource = this.data_source_map();
        return !!dataSource[this.ds_id_selected] ? dataSource[this.ds_id_selected]['end_ym'] + "" : "";
      },
      panelOptions () {
        return  {
          draggable: '.bi-panel',
          animation: 10,
          group: 'panel',
          disabled: !this.editable,
          filter: '.bi-panel-body',
          preventOnFilter: true,
          chosenClass: 'sortable-chosen',
          dragClass:'sortable-drag',
          ghostClass: 'sortable-ghost'
        };
      },
      itemOptions () {
        let options = [];
        for (let i = 0 ; i < 3 ; i++) {
          options.push({
            animation: 200,
            group: 'item' + i,
            disabled: !this.editable,
            filter: i == 2 ? '.scene-table' : '.bi-cell',
            preventOnFilter: true,
            chosenClass: 'sortable-chosen',
            dragClass:'sortable-drag',
            ghostClass: 'sortable-ghost'
          });
        }
        return options;
      },
      cellOptions () {
        let options = [];
        for (let i = 0 ; i < 5 ; i++) {
          options.push({
            animation: 500,
            group: 'cell' + i,
            disabled: !this.editable,
            filter: i == 4 ? '.scene-table' : 'b,em,i,font,p,cite',
            preventOnFilter: true,
            chosenClass: 'sortable-chosen',
            dragClass:'sortable-drag',
            ghostClass: 'sortable-ghost'
          });
        }
        return options;
      },
      pickerOptions() {
        var that = this
        return {
          disabledDate(date) {
            var startDate = that.begin_year_month_selected.substr(0,4) + '/' + that.begin_year_month_selected.substr(4,2) + '/01'
            var endDate = that.end_year_month_selected.substr(0,4) + '/' + that.end_year_month_selected.substr(4,2) + '/01'
            startDate = Date.parse(new Date(startDate))
            endDate = Date.parse(new Date(endDate))
            return (date && date.valueOf() < startDate) || (date && date.valueOf() > endDate)
          }
        }
      }
    },
    watch: {
      ds_id_selected() {
        this.this_year_month_selected = this.end_year_month_selected
      },
      modelsSalesData: function() {
        this.brands = this.modelsSalesData.list || [];
        this.segments = [];
        if (this.brands.length > 0) {
          var segments = {};
          for (var x in this.brands) {
            var item = this.brands[x];
            for (var y in item.list) {
              var key = item.list[y]['vehicle_type_id'];
              var value = item.list[y]['vehicle_type_name'];
              segments[key] = {vehicle_type_id: key, vehicle_type_name: value};
            }
          }
          for (var x in segments) {
              this.segments.push(segments[x]);
          }
          this.segments = this.segments.sort(function(a, b){
              return b.vehicle_type_id - a.vehicle_type_id;
          });
        }
        if (!!this.brand_id || !!this.segment_id) {
          if (!!this.brand_id) {
            this.selectBrand(this.brand_id);
          }
          if (!!this.segment_id) {
            this.selectSegment(this.segment_id);
          }
        }
        else {
          this.searchModels();
        }
      }
    },
    methods: {
      closePanel(index) {
        if (!!this.panels[index]) {
          this.panels[index]['show'] = false
        }
      },
      reachFloor(index) {
        var scrollY = 0;
        if (index != -1) {
          this.scroll_selected = index;
          for (let panel of this.panels) {
            var key = panel.index;
            if (key == index) {
              var panelObject = document.querySelector('[panel_key="' + key + '"]');
              if (!!panelObject) {
                scrollY = panelObject.offsetTop - this.headerHeight;
              }
              break;
            }
          }
        }
        setTimeout(() => {
          window.removeEventListener('scroll', this.scroll);
          JQuery('html, body').animate({scrollTop: scrollY}, 300, 'swing', () => {
            window.addEventListener('scroll', this.scroll);
          });
        }, 10)
      },
      updatePanels(panels) {
        this.panels = panels;
      },
      scroll() {
        var windowScroll = window.scrollY;
        for (var panel of this.panels) {
          var panelObject = document.querySelector('[panel_key="' + panel.index + '"]');
          if (!!panelObject) {
            var panelOffset = panelObject.offsetTop;
            var panelHeight = panelObject.offsetHeight;
            if (windowScroll < panelOffset + panelHeight - this.headerHeight) {
              this.scroll_selected = panel.index;
              break;
            }
          }
        }
        var Lift = document.querySelector('.bi-lift');
        if (Lift) {
          if (this.headerHeight < windowScroll)
            Lift.setAttribute('class', 'bi-lift animated fadeIn');
          else
            Lift.setAttribute('class', 'bi-lift animated fadeOut');
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
      searchData: function() {
        var params = {
          manf_id: this.manf_id_selected,
          ds_id: this.ds_id_selected,
          ym_id: this.this_year_month_selected
        };
        this.manf_id = params['manf_id'];
        this.ds_id = params['ds_id'];
        this.this_year_month = params['ym_id'];

        var that = this;
        this.$router.replace({ path: '/scene', query: params}, function() {
          that['selectOnClass'] = false;
          that.getDataSource();
        });
      },
      cancelData: function() {
        this.manf_id_selected = '';
        this.ds_id_selected = '';
        this.this_year_month_selected = '';
        this['selectOnClass'] = false;
        this.initParam();
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
          token: this.token,
          manf_id: this.manf_id
        }, (response) => {
          this.dataSource = response.data[0];
          this.loadData();
        }, this.failure);
      },
      getManfInfo() {
        this.$request.get(this.$interface.GET_MANF_INFO, {
          token: this.token,
          manf_id: this.manf_id,
        }, (response) => {
          this.manfInfo = response.data[0];
        }, this.failure);
      },
      loadData() {
          this.initParam()
          this.getManfInfo()
          this.getWholeSales()
          this.getWholeSalesWarning()
          this.getSegmentsSales()
          this.getSegmentsSalesWarning()
          this.getManfSalesRank()
          this.getNationSales()
          this.getGroupsSales()
          this.getBrandsSales()
          this.getRegionsSales()
          this.getModelsSales()
        },
      getWholeSales() {
        this.loading[0] = true;
        this.$request.get(this.$interface.GET_WHOLE_SALES, {
          token: this.token,
          manf_id: this.manf_id,
          ds_id: this.ds_id,
          ym_id: this.this_year_month,
          acc: 0,
        }, (response) => {
          this.thisMonthData = response.data[0];
          this.loading[0] = false;
        }, this.failure);
      },
      getWholeSalesWarning() {
        this.loading[1] = true;
        this.$request.get(this.$interface.GET_WHOLE_SALES_WARNING, {
          token: this.token,
          manf_id: this.manf_id,
          ds_id: this.ds_id,
          ym_id: this.this_year_month,
          ymw_id: this.warning_year_month_week,
          acc: 0,
        }, (response) => {
          this.warningMonthData = response.data[0];
          this.loading[1] = false;
        }, this.failure);
      },
      getSegmentsSales(acc = 0) {
        this.loading[6] = true;
        this.segmentSalesClass = acc;
        this.$request.get(this.$interface.GET_SEGMENTS_SALES, {
          token: this.token,
          manf_id: this.manf_id,
          ds_id: this.ds_id,
          ym_id: this.this_year_month,
          acc: acc,
        }, (response) => {
          this.lastMonthSegmentData = response.data;
          this.loading[6] = false;
        }, this.failure);
      },
      getSegmentsSalesWarning(acc = 0) {
        this.$request.get(this.$interface.GET_SEGMENTS_SALES_WARNING, {
          token: this.token,
          manf_id: this.manf_id,
          ds_id: this.ds_id,
          ym_id: this.this_year_month,
          ymw_id: this.warning_year_month_week,
          acc: acc,
        }, (response) => {
          this.thisMonthSegmentData = response.data;
        });
      },
      getManfSalesRank(acc = 0, page = 1) {
        this.loading[2] = true;
        this.manfSalesRankClass = acc;
        this.manfSalesRankPage = page;
        var page_size = 12;
        var offset = (page - 1) * page_size;
        this.$request.get(this.$interface.GET_MANF_SALES_RANK, {
          token: this.token,
          manf_id: this.manf_id,
          ds_id: this.ds_id,
          ym_id: this.this_year_month,
          size: page_size * 3,
          page: page,
          acc: acc,
        }, (response) => {
          var data = response.data.slice(offset, offset + page_size);
          this.manfSalesRankData = data;
          this.loading[2] = false;
        }, this.failure);
      },
      getNationSales(acc = 0) {
        this.loading[3] = true;
        this.nationSalesClass = acc;
        this.$request.get(this.$interface.GET_NATION_SALES, {
          token: this.token,
          manf_id: this.manf_id,
          ds_id: this.ds_id,
          ym_id: this.this_year_month,
          size: 5,
          acc: acc,
          page: 1,
        }, (response) => {
          this.nationSalesData = response.data;
          this.loading[3] = false;
        }, this.failure);
      },
      getGroupsSales(acc = 0, page = 1) {
        this.loading[4] = true;
        this.groupsSalesClass = acc;
        this.groupsSalesPage = page;
        var page_size = 3;
        var offset = (page - 1) * page_size;
        this.$request.get(this.$interface.GET_GROUPS_SALES, {
          token: this.token,
          manf_id: this.manf_id,
          ds_id: this.ds_id,
          ym_id: this.this_year_month,
          size: page_size * 3,
          acc: acc || 0,
          page: page || 1,
        }, (response) => {
          var data = response.data.slice(offset, offset + page_size);
          this.groupsSalesData = data;
          this.loading[4] = false;
        }, this.failure);
      },
      getBrandsSales(acc = 0) {
        this.loading[5] = true;
        this.brandsSalesClass = acc;
        this.$request.get(this.$interface.GET_BRANDS_SALES, {
          token: this.token,
          manf_id: this.manf_id,
          ds_id: this.ds_id,
          ym_id: this.this_year_month,
          size: 3,
          acc: acc,
        }, (response) => {
          this.brandsSalesData = response.data;
          this.loading[5] = false;
        }, this.failure);
      },
      getRegionsSales(acc = 0, brand_id = 0) {
        this.loading[7] = true;
        this.regionsSalesClass = acc;
        this.regionsSalesBrand = brand_id;
        this.$request.get(this.$interface.GET_REGIONS_SALES, {
          token: this.token,
          manf_id: this.manf_id,
          ym_id: this.this_year_month,
          ds_id: this.$helper.inArray(this.ds_id, [4,5] != -1) ? this.ds_id : 4,
          acc: acc,
          brand_id: brand_id || 0,
        }, (response) => {
          this.regionsSalesData = response.data;
          this.loading[7] = false;
        }, this.failure);
      },
      getModelsSales(acc = 0) {
        this.loading[8] = this.loading8 = true;
        this.modelsSalesClass = acc;
        this.$request.get(this.$interface.GET_MODELS_SALES, {
          token: this.token,
          manf_id: this.manf_id,
          ds_id: this.ds_id,
          ym_id: this.this_year_month,
          ymw_id: this.warning_year_month_week,
          p_ym_id: this.price_year_month,
          pb_id: this.price_batch,
          acc: acc,
        }, (response) => {
          this.modelsSalesData = response.data[0];
          this.loading[8] = this.loading8 = false;
        }, this.failure);
      },
      initBase() {
        var query = this.$route.query;
        this.ds_id_selected = this.ds_id = !!query.ds_id ? query.ds_id : this.ds_id;
        this.manf_id_selected = this.manf_id = !!query.manf_id ? query.manf_id : this.manf_id;
        this.this_year_month_selected = this.this_year_month = !!query.ym_id ? query.ym_id : this.this_year_month;
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

        var priceDataSource = this.dataSource.tp; // 成交价
        this.price_year_month = priceDataSource['end'];
        this.price_batch = priceDataSource['end_batch'];

        this.manf_id_selected = this.manf_id_selected || this.manf_id;
        this.ds_id_selected = this.ds_id_selected || this.ds_id;
        this.this_year_month_selected = this.this_year_month_selected || this.this_year_month;

        if (this.this_year_month_selected > this.end_year_month_selected || this.this_year_month_selected < this.begin_year_month_selected){
            this.this_year_month_selected = this.end_year_month_selected + "";
        }

        this.keyword = '';
        this.keyword_result = '';
        this.brand_id = 0;
        this.segment_id = 0;
        this.brand_name = '';
        this.segment_name = '';
      },
      // 车型列表看板开始
      setShowType: function(type) {
          this.showType = type;
          localStorage.setItem('SHOW_TYPE', type);
      },
      selectBrand: function(brand_id, brand_name='') {
        this.brand_id = brand_id;
        this.brand_name = brand_name;
        var that = this;
        var segment_id = this.segment_id;
        var brands = this.modelsSalesData.list || [];
        var data = [];
        that.loading8 = true;
        if (brands.length > 0) {
          for (var x in brands) {
            var brand = brands[x];
            if(brand.brand_id == brand_id || brand_id == 0) {
              this.brand_name = brand.brand_name;
              var segments = brand.list || [];
              if (segments) {
                for (var y in segments) {
                  if (segments[y].vehicle_type_id == segment_id || segment_id == 0) {
                      this.segment_name = segments[y].vehicle_type_name;
                      var models = segments[y].list || [];
                      if (models) {
                          data = data.concat(models);
                      }
                      if (segment_id == 0) {
                          this.segment_name = '全部';
                          this.models = this.models.length > 0 ? this.models : models;
                      } else {
                          this.models = models;
                          break;
                      }
                  }
                }
              }
              if (brand_id == 0) {
                this.brand_name = '全部';
              }
            }
          }
        }
        this.keyword_result = this.brand_name + ' ' + this.segment_name;
        this.models = data;
        setTimeout( function() {
          that.loading8 = false;
        }, that.modelsDelay);
      },
      selectSegment: function(segment_id, segment_name='') {
        this.segment_id = segment_id;
        this.segment_name = segment_name;
        var that = this;
        var brands = this.modelsSalesData.list || [];
        var brand_id = this.brand_id;
        var data = [];
        that.loading8 = true;
        if (brands.length > 0) {
          for (var x in brands) {
            if (brands[x].brand_id == brand_id || brand_id == 0) {
              var segments = brands[x].list;
              if (segments) {
                for (var y in segments) {
                  if (segments[y].vehicle_type_id == segment_id || segment_id == 0) {
                    this.segment_name = segments[y].vehicle_type_name;
                    var models = segments[y].list || [];
                    if (models) {
                      data = data.concat(models);
                    }
                    if (segment_id == 0) {
                      this.segment_name = '全部';
                      this.models = this.models.length > 0 ? this.models : models;
                    } else {
                      this.models = models;
                      break;
                    }
                  }
                }
              }
            }
          }
        }
        this.keyword_result = this.brand_name + ' ' + this.segment_name;
        this.models = data;
        setTimeout( function() {
          that.loading8 = false;
        }, that.modelsDelay);
      },
      searchModels: function() {
        this.keyword = this.keyword.trim() || '';
        this.keyword_result = this.keyword;
        this.brand_id = 0;
        this.segment_id = 0;
        this.brand_name = '全部';
        this.segment_name = '';
        var that = this;
        var brands = this.modelsSalesData.list || [];
        var data = [];
        that.loading8 = true;
        if (brands.length > 0) {
          for (var x in brands) {
            var segments = brands[x].list;
            if (brands[x].brand_name.indexOf(this.keyword) >= 0) {
              if (segments) {
                for (var y in segments) {
                  var models = segments[y].list;
                  if (models) {
                    data = data.concat(models);
                  }
                }
              }
            } else if (segments) {
              for (var y in segments) {
                var models = segments[y].list;
                if (segments[y].vehicle_type_name.indexOf(this.keyword) >= 0) {
                  for (var z in models) {
                    data = data.concat([models[z]]);
                  }
                }
                else if (models) {
                  for (var z in models) {
                    if (this.match(this.keyword, models[z])) {
                      data = data.concat([models[z]]);
                    }
                  }
                }
              }
            }
          }
        }
        this.models = data;
        this.isShowModelBox = false;
        setTimeout( function() {
          that.loading8 = false;
        }, that.modelsDelay);
      },
      searchModelsQuick: function() {
          this.keyword = this.keyword.trim() || '';
          var brands = this.modelsSalesData.list || [];
          var data = [];
          if (brands.length > 0) {
            for (var x in brands) {
              var segments = brands[x].list;
              if (segments) {
                for (var y in segments) {
                  var models = segments[y].list;
                  if (models) {
                    for (var z in models) {
                      if (this.match(this.keyword, models[z])) {
                          data = data.concat([models[z]]);
                      }
                    }
                  }
                }
              }
            }
          }
          this.isShowModelBox = true;
          this.models_matches = data;
      },
      match: function(pattern, obj) {
        var sub_model_name = obj.sub_model_name || ''
        , sub_model_pinyin = obj.sub_model_pinyin || '';
        if (pattern){
            if (sub_model_name.toLowerCase().indexOf(pattern.toLowerCase()) >= 0) {
                return true;
            }
            var first_letter_string = sub_model_pinyin.split(" ").map(function(item){
                return item.substr(0, 1);
            }).join("").toLowerCase();
            if (eval("/"+pattern+"/ig").test(first_letter_string)) {
                return true;
            }
        }
        return false;
      },
      selectModel: function(sub_model_name) {
        this.keyword = sub_model_name;
        this.models_matches = [];
        this.searchModels();
      },
    },
    components:{
      BiTitle,
      BiPanel,
      BiLift,
      BiCell,
      BiProgress,
      Draggable,
      BiEmpty
    }
	}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~@index/assets/scss/mixin";
@import "~@index/assets/scss/media";


//数据更改-弹出窗内容
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
    &.on {background-color: #339ace;  }
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
.change-date{padding: 20px 50px;}
//数据更改-弹出窗内容 end


// 智能推送消息  */
.notice{
  float: right;
  i{
    font-size: 23px; color: #ccc; line-height: 26px; cursor: pointer;font-weight: 100;
    &:hover{color: #333}
  }
}
.notice-content{
  width: 100%; overflow: hidden; cursor: text;
  h4{
    @include font-adjust(14px, 28px, #f04848, left, 600);
    display: block;
    background-color: #efefef;
    text-indent: 1em;
    margin: 0 0 10px 0;
    font{
      color: #339ace;
    }
  }
  ul{
    width: 2000px;overflow: auto;margin: 0;
  }
  li{
    @include box-Module(block, 120px, 162px, 0 5px 10px, 5px, #fff, 1px solid #eee);position: relative;
    @include transition();
    float: left;
    &:hover{
      @include box-shadow(0px, 0px, 15px, rgba(0,0,0,.15) );
    }
  }
  img{
    width: 100%; display: block;  vertical-align: middle; margin-bottom: 5px;
  }
  i{
    @include box-Module(block, 15px, 15px, 0px, 0px, rgba(0, 0, 0, 0.4));
    @include font-adjust(14px, 14px, #fff);
    position: absolute;right: 6px;top: 5px;cursor: pointer;
    &:hover{background-color: rgba(20, 18, 18, 0.74);}
  }
  input{
    @include box-Module(block, 15px, 15px, 0px, 0px, rgba(0, 0, 0, 0.4));
    @include font-adjust(14px, 14px, #fff);
    position: absolute;right: 6px;top: 5px;cursor: pointer;
  }
  p{
    display: block; width: 100%;line-height: 18px;
  }
  label{
    color: #666;font-size: 13px;
  }
  span{
    font-size: 12px;color: #999;display: block;
  }
}
//智能推送消息 end


// 热点 */
.hot-spots{
  @include box-Module(block, 100%, 40px, 0px, 0px );
  position: absolute;z-index: 1; top: 0;left: 0; border: none;
  &:hover{background: transparent;}
}
.list-group-item .hot-spots {
  cursor: move;
}
.over-move{
  position: absolute; top: 5px; left: 5px;font-size: 18px;display: none;
}

// 场景按钮、表格 */
.scene-btn{
  display: inline-block;width: auto;
  a{
    @include box-Module(block, auto, 22px, 0px, 0px 13px, #555c66);
    @include font-adjust(12px, 22px, #fff);
    float: left;
    &:hover{background-color: #414346}
    &.on{background-color: #329acd}
    &.on:hover{background-color: #47b1e5}
  }
}
.scene-title{
  @include font-adjust(14px, 20px, #003344, left, bold);
  padding: 10px 10px 10px 20px;border-bottom: 1px solid #eee;height: 41px;
  em{@include text-hide();display:inline-block;width: 46%;}
  span{
    float: right;
  }
  &.optional{
    padding: 0 10px 0 25px;line-height: 40px;
    & > a{
      display: inline-block;min-width: 100px;padding: 0 10px;color: #003344;text-align: center;
      &.on{color:#5a9ecd;border-bottom: 2px solid #329acd}
      &:hover{color:#5a9ecd;}
    }
    span{margin:10px 0}
  }
}
.scene-table{
  width: 100%;margin-bottom: 5px;
  &.noboder{border: none}
  tr{
    @include transition(all, .3s);
    &:nth-child(1){background-color: #fdfdff}
    &:nth-child(n + 2):hover{background-color: #f7faff}
    &.has-border{border-bottom: 1px solid #eeeeee}
    &.has-border:last-child{border-bottom: none}
  }
  th{
    @include text-hide();
    @include font-adjust(12px, 32px, #999, center, 100);border-bottom: 1px solid #eee;
  }
  td{
    @include font-adjust(12px, 40px, #666, center, 100);
    @include text-hide();
  }
  img{ max-height: 32px;max-width: 50px;vertical-align: middle;}
}
.scene-bottom{
  @include font-adjust(12px, 20px, #666);
  margin: 0 auto;border-top: 1px solid #eeeeee; padding: 15px 0;
  a{
    @include box-Module(inline-block, 50px, 22px, 0px 5px 0px 0px , 0, #fff, 1px solid #eee);
    @include font-adjust(12px, 20px, #339ace);
    &:hover{border-color: #329acd}
    &.on{background-color: #339ace; color: #ffffff;border-color: #329acd}
  }
}
//! end 场景按钮、表格

//销量现状、预警
.sales-status{
  @include clearfix();
  height: 280px; width: auto;
  li {
    @include transition(all, 0.5s, cubic-bezier(0.4, 0, 0.2, 1), 0s);
    float: left; height: 100%;overflow: hidden;
    &.over-on{
      @include box-shadow(0, 0, 10px, rgba(186,204,207,.7));z-index: 1;
      &:hover .over-move{display: block}
    }
  }
  .left{
    position: relative;
    &.over-on{ @include box-shadow(0, 0, 10px, #888);}
    @include box-Module(block, 20%, 100%, 0, 0, #339ace);
    @include font-adjust(14px, 20px, #fff);
    span{
      @include font-adjust(12px, 30px, #dbe4ed);
      @include radius(34, 3px);
      @include box-Module(block, 110px, auto, 0px 0px 0px -55px, 0px, #3285b1);
      border: 1px solid #0b76ae; border-top: none;position: absolute; top:0; left: 50%;
    }
    div .bi-cell{
      &:nth-child(2){border-bottom: none}
    }
  }
  .center{
    width: 16%;padding-top: 80px;text-align: center;position: relative; border-left: 1px solid #eee;border-right: 1px solid #eee;
    img{max-height: 100px;vertical-align: middle; margin-bottom: 20px;}
    p{@include font-adjust(14px, 20px, #0081c2)}
  }
  .right {
    width: 64%; position: relative;border: 1px solid transparent;
    & > div{
      @include clearfix(); border-left-color:#eee;overflow: hidden;
    }
  }
  &.warning {
    .left{
      background: #fc6d73;
      span{color: #f8dedf;background: #e16065;border-color: #e46169}
    }
  }

  .lattice4{
    .bi-cell:nth-child(4n){border-right: none}
    .bi-cell:nth-child(n + 5){border-bottom: none}
  }
  .lattice3{
    .bi-cell:nth-child(3n){border-right: none}
    .bi-cell:nth-child(n + 4){border-bottom: none}
  }
}
.more-info{
  font-size: 13px; color:#339ace;margin: 0 0 0 15px;
  &:hover{color: #f04048; text-decoration: underline}
}

//销量现状、预警 End

//整体市场销量
.all-sales{
  li{
    float: left; width: 33.33%; border-right: 1px solid #eee;overflow: hidden; position:relative;height: 617px;
    &:nth-last-child{border: none}
    &.manuf-show{width: 37.33%}
    &.brand-show{
    width: 29.33%;
    table{
      padding: 0px 20px;
      tr{
        border-bottom: 1px solid #eeeeee;
        &:hover{background-color: transparent}
        &:nth-child(3){border: none}
      }
      td{padding: 35px 0px 35px 0;}
      img{max-height: 80px; max-width: 80px;}
      font,span{@include text-hide();float: left; line-height:20px;font-size: 14px;}
      font{text-align: left;width: 50%; color: #999}
      span{text-align: right;width: 50%; color: #666}
      }
    }
    cite{font-size: 14px;}
  }
}
//整体市场销量 End

//细分市场销量
.sub-sales{
  b,em{font-size: 16px;}
  cite{font-size: 14px;color: #333}
  td{height: 120px;}
  .scene-table  tr{
    border-bottom: 1px solid #eee;
    &:last-child{border-bottom: none}
  }
  .scene-table  tr:nth-child(n + 2):hover{background-color: transparent}
}
//!- End细分市场销量

//区域市场表现
.area-market{
  font{font-size: 14px;}
  em{font-size: 16px; color: #0080c2}
  table tr:nth-child(2){
    font, em{color: #f14949}
    em{font-weight: bold}
    font.fw700{font-weight: 700}
  }
}
// !-end 区域市场表现

//车型列表看板
.carlist-header{
  background-color: #fff;margin-bottom: 10px;
  h4{
    @include font-adjust(14px, 30px, #a7a7a7, left, 100);
    height: 50px; padding: 10px 20px;border-bottom: 1px solid #eee;
    span{
      display: inline-block; float: right;position: relative;
    }
    input{
      @include box-Module(block, 252px, 30px, 0, 0px 35px 0px 10px, #f7f7f7, 1px solid #eee);
      font-size: 12px;
    }
    i{position: absolute;top:2px; right: 10px;}

    ul {
      border: 1px #eee solid;
      background: #fff;
      padding: 10px 0 10px 0;
      margin-top: 5px;
      display: block;
      position: absolute;
      top: 30px;left: 0px;
      box-shadow:0 1px 5px 0 rgba(0,0,0,.1);
      box-sizing:border-box;
      z-index: 1;
      width: 252px;
      border-radius: 2px;
      li {
        height: 34px;line-height: 34px; cursor: pointer;padding: 0 10px 0 10px;background: #fff;
        em {font-size: 14px; float: left; color:#333;}
      }
      li:hover {
        background-color: #f5f8f9;
        em {color: #339ace;}
      }
    }
  }

  dl{
    border-bottom: 1px solid #f4f4f4;color: #656565;overflow: auto;overflow-x: hidden;background-color: #fafafa;overflow-y: hidden;
  }
  dt{
    float: left; width: 100px; height: auto; line-height: 50px; text-align: center; font-weight: 100;
  }
  dd{
    float: left; width: calc( 100% - 100px ); padding: 12px 20px 12px 10px; height: auto; background-color: #fff;
    span{
      display: block;line-height: 26px;height: auto; width: calc(100% - 50px);float: left;
    }
    a{
      display: inline-block;float: left;height: 26px;padding: 0 15px;margin: 0 10px 0 0;color: #656565;text-align: center;text-decoration: none;border: 1px solid #fff;
      &:hover{color: #329acd; border: 1px solid #329acd}
      &.on{background-color: #329acd;color: #fff;border: 1px solid #329acd}
    }
    font{
      @include box-Module(block, 50px, 26px);
      float: right; line-height: 26px;cursor: pointer;color: #333;
      &:hover{color: #339ace}
      i{font-size:14px;}
    }
  }

}
.btn-col.on, .btn-row.on{color: #339ace}
.carlist-main{
  padding: 0 30px;
  h5{
    @include font-adjust(14px, 20px, #676767, left);
    height: 51px; border-bottom: 1px solid #dedee0; padding: 15px 0;margin-bottom: 20px;
    b{margin-right: 5px;}
    em{color: #ff4d51}
    span{float: right}
  }
}
.show-col {
  @include clearfix();
  padding-bottom: 10px;margin-left: -10px; margin-right: -10px;
  .cards{
    border: 1px solid #ebebeb; padding: 20px 19px 0;background-color: #ffffff;width: calc(100%/3 - 20px);margin:0 10px 20px 10px; float: left;
    &:hover{
      @include transition(all, .5s, cubic-bezier(.4,0,.2,1));
      @include box-shadow(0, 0, 8px,  rgba(186,204,207,.7));
      border-color: #b9e0f4;
      //img{
        //<!--@include css3(transform, scale(1.1));
      //}
    }
  }
  dl{@include clearfix();margin-bottom: 10px;}
  dt{
    width: 40%; float: left; position: relative; border: 1px solid #eee; overflow: hidden;
    img{ @include transition(all, .5s);max-height: 100px;width: 100%;background: #fff; float: left}
    span{
      @include box-Module(inline-block, 24px, 24px, 0px, 0px, #333);
      @include font-adjust(12px, 24px, #fff);
      @include opacity(80);
      @include transition(all, 0.2s);
      position: absolute;right: 0;bottom: 0;
    }
    em {display: none}
    &:hover{
      span{width: 86px;background-color: #ff5a38;}
      em {display: inline-block}
    }
  }
  dd{
    @include text-hide();
    width: 55%; float: left; height: 100px; margin: 0 0 0 10px;
    a{
      @include clearfix();
      color: #333;display: block; margin-bottom: 14px;
      font{
        @include text-hide();
        display: inline-block;max-width: calc(100% - 60px);float: left;line-height: 24px;
        &:hover{color: #f04848; text-decoration: underline}
      }
    }
    span{
      @include font-adjust(11px, 24px, #fff);
      @include radius(1234, 2px);
      position: absolute; display: inline-block;float: left; padding: 0 4px; height: 24px; background-color: #555c65; vertical-align: bottom;margin-left: 10px;
      &.on{
        min-width: 44px; background-color: #ff5a38;
        &:before{
          @include regulaTriangle(left, #ff5a38, 6px);
        }
      }
      &:before{
        @include regulaTriangle(left, #555c65, 6px);
        content: '';
        position: absolute;left: -11px;top: 6px;
      }
    }
    p{
      @include font-adjust(12px, 22px, #333, left);
      @include text-hide();
      b{font-size: 14px;color: #ff572c;font-weight: 100}
      em{color: #669900;}
    }
  }
  ul{
    @include clearfix();
    margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #e5e5e5;
    &.noboder{border: 0;margin-bottom: 0}
  }
  li{
    &.left{
      width: 60%;float:left;
      & > div {@include clearfix(); margin-bottom: 18px;}
      .progress-box {display: inline-block;width: 66%;height: auto;position: relative; float: left}
      font {@include font-adjust(12px, 15px); float: left; margin-left: 5px;}
    }
    &.right{
      width: 40%; float: right;padding-top: 10px;
      font{ @include font-adjust(12px, 16px, #999);display: block;margin-bottom: 10px;}
      .progress-box{margin-bottom: 10px;}
    }
    p{
      @include font-adjust(12px, 13px, #343434, left);
      margin-bottom: 5px;
    }
  }
}
.show-row{
  @include clearfix();
  .cards{
    @include transition(all, .5s, cubic-bezier(.4,0,.2,1));
    border: 1px solid #ebebeb; padding: 20px;background-color: #ffffff;width: 100%;margin-bottom: 20px;
    &:hover{
      @include box-shadow(0, 0, 10px,  rgba(186,204,207,.7));
      border-color: #b9e0f4;
      /*<!--img{-->*/
        /*<!--@include css3(transform, scale(1.1));-->*/
      /*<!--}-->*/
    }
  }
  dl{@include clearfix();width: 35%;float: left; margin-right: 4%; }
  dt{
    width: calc(60% - 10px); float: left; position: relative;border: 1px solid #eee; overflow: hidden;
    img{ @include transition(all, .5s);max-height: 130px;width: 100%;background: #fff; float: left}
    span{
      @include box-Module(inline-block, 24px, 24px, 0px, 0px, #333);
      @include font-adjust(12px, 24px, #fff);
      @include opacity(80);
      @include transition(all, 0.2s);
      position: absolute;right: 0;bottom: 0;
    }
    em {display: none}
    &:hover{
      span{width: 86px;background-color: #ff5a38;}
      em {display: inline-block}
    }
  }
  dd{
    @include text-hide();
    width: 40%; float: left;margin: 0 0 0 10px; padding-top: 5px;
    a{
      @include clearfix();
      font-size: 16px;color: #333;display: block; margin-bottom: 12px;
      font{
        @include text-hide();
        display: inline-block;max-width: calc(100% - 95px);float: left;line-height: 24px;
        &:hover{color: #f04848; text-decoration: underline}
      }
    }
    span{
      @include font-adjust(11px, 24px, #fff);
      @include radius(1234, 2px);
      position: relative; display: inline-block;float: left; padding: 0 4px; height: 24px; background-color: #555c65; vertical-align: bottom;margin-left: 10px;
      &.on{
        min-width: 44px; background-color: #ff5a38;
        &:before{
          @include regulaTriangle(left, #ff5a38, 6px);
        }
      }
      &:before{
        @include regulaTriangle(left, #555c65, 10px);
        content: '';
        position: absolute;left: -11px;top: 6px;
      }
    }
    p{
      @include font-adjust(14px, 27px, #333, left);
      @include text-hide();
      margin-top: 22px;
      b{font-size: 14px;color: #ff572c;font-weight: 100}
      em{color: #669900;}
    }
  }
  ul{
    @include clearfix();width: 28%;float: left; margin-right: 5%;padding-top: 20px;
    &.mr0{margin-right: 0px;}
  }
  li{
    &.left{
      width: 60%;float:left;
      & > div {
        @include clearfix(); margin-bottom: 28px;
        &:nth-child(2){margin: 0px;}
      }
      .progress-box {display: inline-block;width: 68%;height: auto;position: relative; float: left}
      font {@include font-adjust(12px, 15px); float: left; margin-left: 5px;}
    }
    &.right{
      width: 40%; float: right;padding-top: 10px;
      font{
        @include font-adjust(12px, 16px, #999);
        display: block;
      }
      .special{padding: 10px; border: 1px solid #eeeeee;}
      .progress-box{margin-bottom: 10px;}
    }
    p{
      @include font-adjust(13px, 13px, #343434, left);
      margin-bottom: 5px;
    }
  }

}
//车型列表看板 End

//拖到样式
.dragging {
  opacity: .5;
  border: 1px solid #DDD;
  background: #C8EBFB;
}
.panel-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}

.sortable-chosen {
  opacity: 1;
}
.sortable-drag {
  opacity: 1;
}
.sortable-ghost {
  opacity: 1;
}

.list-group {
  min-height: 20px;
}

</style>
