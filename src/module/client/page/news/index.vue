<template>
	<div class="news">
    <div class="content-top" id="content-top" :style="{'z-index':[ selectedTab!='search' ? '999' : '2020' ]}">
      <div class="pageinfo">
        <bi-title columnTitle="新闻舆情" columnIcon="icon-bingtu">
          <span v-if="selectedTab!='search'&&selected_manfs_text">
            当前数据
            <span v-if="selected_manfs_text">厂商：<em class="text-box">{{ selected_manfs_text }}</em></span>
            <span v-if="selected_brands_text">品牌：<em class="text-box">{{ selected_brands_text }}</em></span>
            <span v-if="selected_models_text">车型：<em class="text-box">{{ selected_models_text }}</em></span>
          </span>
          <span v-else>专业的汽车资讯平台</span>
        </bi-title>
        <div v-if="selectedTab!='search'" class="change-button">
          <el-popover placement="bottom-start" width="600" popper-class="padding0" v-model="selectOnClass" @show="showPopover('manfsBoxForIndex')" >
            <!--<el-button slot="reference">更改 <i class="iconfont icon-xiao73"></i></el-button>-->
            <!--<span class="bi-button"  slot="reference">-->
              <!--更改<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
            <!--</span>-->
            <div class="news-search-popover-cont" style="width: 630px;">
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
        </div>
        <div class="right-box">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/news' }">新闻舆情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <bi-tabs @tabsClick="tabsClick">
        <bi-tabs-item targetId="tabsindex" :selected="selectedTab=='index'">新闻首页</bi-tabs-item>
        <bi-tabs-item targetId="tabslist" :selected="selectedTab=='list'">新闻列表</bi-tabs-item>
        <bi-tabs-item targetId="tabssearch" :selected="selectedTab=='search'">新闻搜索</bi-tabs-item>
      </bi-tabs>
    </div>
    <div class="content-main">
      <!-- 首页 -->
      <div id="tabsindex">
        <el-row :gutter="20">
          <el-col :span="17">
            <bi-panel>
              <div class="focus-point">
                <ul v-if="tuijian.length" v-loading="loading['tuijianIndex']">
                  <li v-for="(item, key) in tuijian">
                    <figure>
                      <a href="javascript:void(0)">
                        <img :src="item.pic && item.pic[0] ? item.pic[0] : '/static/images/nocar.png'" alt="暂无图片">
                      </a>
                      <figcaption>
                        <div>
                          <h2>
                            <a :href="'client.html#/news/detail?id=' + item.id" target="_blank" :title="item.news_title">{{ item.news_title }}</a>
                          </h2>
                          <p>{{ item.text }}</p>
                        </div>
                      </figcaption>
                    </figure>
                  </li>
                </ul>
                <span class="change-info" @click="getTuijian('Index', -1, pageTuijian++)">换一批</span>
              </div>
            </bi-panel>
          </el-col>
          <el-col :span="7">
            <bi-panel title-type="border">
              <template slot="title">
                <font class="fs16">热门文章</font>
              </template>
              <template slot="operating">
                <a class="more-btn" href="javascript:;" @click="getHot('Index', pageHotIndex++)">换一批</a>
              </template>
              <div class="headline" v-loading="loading['hotIndex']">
               <p v-for="(item, key) in hotNewsIndex">
                 <a :href="'client.html#/news/detail?id=' + item.id" target="_blank">{{ item.news_title }}</a>
                 <span v-if="key==0">{{ item.text }}</span>
               </p>
              </div>
            </bi-panel>
          </el-col>
        </el-row>

        <div class="cont-list">
          <draggable class="list-group" element="div" v-model="panels" :options="panelOptions" :move="onMove" @start="onStart" @end="onDragEnd">
            <transition-group type="transition" :name="'panel-list'" tag="div">
              <bi-panel v-for="element in panels" :operating="false" :key="element.type_id" v-show="element.show" @closePanel="closePanel(element.type_id)" :panel_key="element.type_id" :cls="{'list-group-item':editable}" title-type="border" class="list">
                <template slot="title">
                  <font>{{ element.name }}</font>
                </template>
                <div style="height:376px; overflow: hidden" v-loading="loading['box'][element.type_id]">
                  <ul v-if="boxData[element.type_id]&&boxData[element.type_id].data&&boxData[element.type_id].data[0]['rows']" >
                    <li v-for="item in boxData[element.type_id].data[0]['rows']">
                      <a :href="'client.html#/news/detail?id=' + item.id" target="_blank" :title="item.news_title">{{ item.news_title }}</a>
                      <cite>{{ item.post_time | date }}</cite>
                    </li>
                    <a :href="'#/news?tab=list&tid=' + element.type_id" target="_blank" class="more">查看更多</a>
                  </ul>
                  <div v-else style="padding: 0 20px">
                    <bi-empty :show-result="false" v-if="!loading['box'][element.type_id]"><template slot="tips">暂时没有相关数据</template></bi-empty>
                  </div>
                </div>
              </bi-panel>
            </transition-group>
          </draggable>
        </div>
      </div>

      <!-- 列表 -->
      <div id="tabslist" style="display: none">
        <el-row :gutter="20">
          <el-col :span="18">
            <bi-panel>
              <div class="classification">
                <ul>
                  <li class="category">
                    <span class="left">
                      <font :class="{'on':type_id==0}" href="javascript:void(0)" @click="changeType(0)">全部</font>
                      <font :class="{'on':type_id==-2}" href="javascript:void(0)" @click="changeType(-2)">个性化推荐</font>
                      <font :class="{'on':type_id==item._id}" href="javascript:void(0)" v-for="(item,key) in news_types" :key="item._id" v-if="key <= 9" @click="changeType(item._id)">{{ item.type_name }}</font>
                    </span>
                    <el-popover placement="bottom-end" trigger="click" v-model="typeBoxOpen">
                      <em slot="reference">更多 <i :class="['iconfont', typeBoxOpen ? 'icon-fold ' : 'icon-xiao73']"></i></em>
                      <div class="classification-popover-cont">
                        <a :class="{'on':type_id==item._id}" href="javascript:void(0)" v-for="(item,key) in news_types" :key="item._id" @click="changeType(item._id, key)">{{ item.type_name }}</a>
                      </div>
                    </el-popover>
                  </li>
                  <li class="sort">
                    <span>
                      浏览模式：<em @click="showClass=0" :class="{'on':showClass==0}"><i class="iconfont icon-apps"></i> 标题模式</em> <em @click="showClass=1" :class="{'on':showClass==1}"><i class="iconfont icon-sort"></i> 图文模式</em>
                    </span>
                    <span>
                      排序：<em :class="{'on':sortClass==1}" @click="changeSort(1)"><i class="iconfont icon-time"></i> 按时间排序</em> | <em :class="{'on':sortClass==2}" @click="changeSort(2)"><i class="iconfont icon-favor"></i> 按热度排序</em>
                    </span>
                  </li>
                </ul>
                <div v-loading="loading['list']" style="min-height: 300px;">
                  <template v-if="listData.length > 0">
                    <!-- 标题模式 -->
                    <ol class="caption-mode" :style="{display : showClass==0 ? 'block' : 'none'}">
                      <li v-for="(item,key) in listData">
                        <font v-if="item.news_type">【{{ item.news_type.type_name }}】</font>
                        <font v-else>【综合】</font>
                        <a :href="'client.html#/news/detail?id=' + item.id" target="_blank">{{ item.news_title }}</a>
                        <cite>{{ item.post_time | date }}</cite>
                      </li>
                    </ol>
                    <!-- 图文模式 -->
                    <ol class="graphic-mode" :style="{display : showClass==1 ? 'block' : 'none'}">
                      <li v-for="(item,key) in listData">
                        <span><a :href="'client.html#/news/detail?id=' + item.id" target="_blank"><img :src="item.pic && item.pic[0] ? item.pic[0] : '/static/images/nocar.png'" alt="暂无图片"></a></span>
                        <div>
                          <h2>
                            <a :href="'client.html#/news/detail?id=' + item.id" target="_blank">{{ item.news_title }}</a>
                            <p>{{ item.text }}</p>
                          </h2>
                          <p v-if="item.news_type">
                            分类：<a :href="'client.html#/news?tab=list&tid=' + item.news_type._id" target="_blank">{{ item.news_type.type_name }}</a>
                            <cite>{{ item.post_time | date }}</cite>
                          </p>
                        </div>
                      </li>
                    </ol>
                    <div class="pagination-box">
                      <el-pagination
                        background
                        layout="prev, pager, next"
                        prev-text="上一页"
                        next-text="下一页"
                        @current-change="getListData"
                        :current-page.sync="page"
                        :page-size="40"
                        :total="listRecords">
                      </el-pagination>
                    </div>
                  </template>
                  <div v-if="listData.length == 0">
                    <bi-empty :show-result="true" v-if="!loading['list']">
                      <template slot="tips">
                        <!-- <p>亲爱的，请减少搜索条件并检查搜索条件是否正确，简化搜索条件、搜索所需新闻信息</p>
                        <font>猜你感兴趣 ：</font>
                        <div>
                            <a href="javascript:history.go(0)">国内新车</a>
                            <a href="javascript:history.go(0)">生活八卦</a>
                            <a href="javascript:history.go(0)">行业动态</a>
                            <a href="javascript:history.go(0)">新车资讯</a>
                            <a href="javascript:history.go(0)">独家新闻</a>
                        </div> -->
                      </template>
                    </bi-empty>
                  </div>
                </div>
              </div>
            </bi-panel>
          </el-col>

          <el-col :span="6">
            <bi-panel title-type="border">
              <template slot="title">
                <font>推荐新闻</font>
              </template>
              <ul class="recommend" v-loading="loading['tuijianList']" style="min-height: 150px;">
                <li v-for="(item,key) in listTuijian">
                  <figure v-if="key==0">
                    <a :href="'client.html#/news/detail?id='+item.id" target="_blank">
                      <img :src="item.pic && item.pic[0] ? item.pic[0] : '/static/images/nocar.png'" alt="暂无图片">
                    </a>
                    <figcaption>
                      <h3><a :href="'client.html#/news/detail?id='+item.id" target="_blank">{{ item.news_title }}</a></h3>
                      <p>[{{ item.news_type.type_name }}] ]&nbsp; {{ item.post_time | date }}</p>
                    </figcaption>
                  </figure>
                  <dl v-else>
                    <dt>
                      <a :href="'client.html#/news/detail?id='+item.id" target="_blank">
                        <img :src="item.pic && item.pic[0] ? item.pic[0] : '/static/images/nocar.png'" alt="暂无图片">
                      </a>
                    </dt>
                    <dd>
                      <a :href="'client.html#/news/detail?id='+item.id" target="_blank">{{ item.news_title }}</a>
                      <p>{{ item.text }}</p>
                    </dd>
                  </dl>
                </li>
              </ul>
            </bi-panel>
            <bi-panel title-type="border">
              <template slot="title">
                <font class="fs16">热门文章</font>
              </template>
              <template slot="operating">
                <a class="more-btn" href="javascript:;" @click="getHot('List', pageHotList++)">换一批</a>
              </template>
              <div class="headline" v-loading="loading['hotList']">
                <p v-for="(item,key) in hotNewsList">
                  <a :href="'client.html#/news/detail?id=' + item.id" target="_blank">{{ item.news_title }}</a>
                  <span>{{ item.text }}</span>
                </p>
              </div>
            </bi-panel>
          </el-col>
        </el-row>
       </div>
      </div>

      <!-- 搜索 -->
      <div id="tabssearch" style="display: none">
        <div class="search">
          <!-- 已选条件 -->
          <h2 class="panel-selected" v-show="where.length > 0">
            当前已选条件：
            <span v-for="(item,key) in where"> {{ item.name }} <i @click="deleteItem(item.type)" class="iconfont icon-close"></i></span>
            <font @click="deleteAll()">重置条件</font>
          </h2>

          <!-- 搜索 -->
          <bi-panel title-type="border" v-show="searchType != 2">
            <template slot="title">
              <font>按条件搜索</font>
            </template>
            <div class="search-condition">
              <div class="clear" style="margin-bottom: 20px;">
                <div class="popover-box" :class="{on: manfOnClass&&!manfNotClass, ban: manfNotClass}">
                  <label class="popover-label">请选择厂商</label>
                  <el-popover placement="bottom-start" popper-class="padding0" v-model="manfOnClass" @show="showPopover('manfsBoxForSearch')" @hide="hidePopover('manfsBoxForSearch')" :disabled="manfNotClass">
                    <span class="popover-input" slot="reference">
                      <em v-if="selected_manfs.length==0">全部</em>
                      <em v-else>
                        已选择了
                        <template v-for="(item, id) in selected_manfs">{{item.name}}
                        </template>
                      </em>
                      <i class="iconfont icon-xiao73"></i>
                    </span>
                    <div class="news-search-popover-cont" style="width:600px;">
                      <h4 class="popover-title">
                        <cite>当前已选择：</cite>
                        <span>
                          <em v-for="(item, index) in selected_manfs" :manfId="item.id">{{ item.name }}<i @click="clearSubItem('manf', item.id);">x</i></em>
                          <font @click="clearItem('manf')">重置条件</font>
                        </span>
                      </h4>
                      <dl class="popover-main_va">
                        <dt>
                          <em :class="{'on':first_letter==letter_selected['manfsBoxForSearch']}" v-for="(group, first_letter) in baseInfo.manf_brand" @click="selectLetter('manfsBoxForSearch', first_letter)">{{ first_letter }}</em>
                          <span>
                            <font>搜索</font>
                            <input type="text" v-model="manfName" :class="{on:lookErrorClass}" @keyup.enter="lookManf('manfsBoxForSearch')">
                            <i class="iconfont icon-sousuo" @click="lookManf('manfsBoxForSearch')"></i>
                          </span>
                        </dt>
                        <dd id="manfsBoxForSearch">
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
                      <div class="popover-footer">
                        <a href="javascript:;" @click="cancelManf()">取消</a>
                        <a href="javascript:;" @click="manfOnClass=false" class="on">确定</a>
                      </div>
                    </div>
                  </el-popover>
                </div>
                <div class="popover-box" :class="{on: brandOnClass}">
                  <label class="popover-label">请选择品牌</label>
                  <el-popover placement="bottom-start" popper-class="padding0" v-model="brandOnClass" @show="showPopover('brandsBoxForSearch')" @hide="hidePopover('brandsBoxForSearch')">
                    <span class="popover-input" slot="reference">
                      <em v-if="brands_grouped.length==0 || selected_brands.length==0">全部</em>
                      <em v-else>已选择了
                        <template v-for="(item, id) in selected_brands">
                          {{ item.name }}
                        </template>
                      </em>
                      <i class="iconfont icon-xiao73"></i>
                    </span>
                    <div class="news-search-popover-cont" style="min-width: 440px; max-width: 600px;">
                      <h4 class="popover-title">
                        <cite>当前已选择：</cite>
                        <span>
                          <em v-for="(item, index) in selected_brands" :brandId="item.id">{{ item.name }}<i @click="clearSubItem('brand', item.id);">x</i></em>
                          <font @click="clearItem('brand')">重置条件</font>
                        </span>
                      </h4>
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
                      <div class="popover-main_va" v-else>
                        <dt>
                          <em :class="{'on':first_letter==letter_selected['brandsBoxForSearch']}" v-for="(group, first_letter) in brands_grouped" @click="selectLetter('brandsBoxForSearch', first_letter)" style="margin-right: 10px;">{{ first_letter }}</em>
                        </dt>
                        <dd id="brandsBoxForSearch">
                          <el-checkbox-group size="mini" :max="10" v-model="selected_brand_ids">
                            <dl v-for="(group, first_letter) in brands_grouped">
                              <dt :data-key="first_letter">{{ first_letter }}</dt>
                              <dd>
                                <span class="radio-item" v-for="(brand, key) in group">
                                  <el-checkbox :label="brand.id" :key="brand.id" >{{ brand.brand_name }}</el-checkbox>
                                </span>
                              </dd>
                            </dl>
                          </el-checkbox-group>
                        </dd>
                      </div>
                      <div class="popover-footer">
                        <a href="javascript:;" @click="cancelBrand()">取消</a>
                        <a href="javascript:;" @click="brandOnClass=false" class="on">确定</a>
                      </div>
                    </div>
                  </el-popover>
                </div>
                <div class="popover-box" :class="{on: modelOnClass&&!modelNotClass, ban: modelNotClass}">
                  <label class="popover-label">请选择车型</label>
                  <el-popover placement="bottom-start" popper-class="padding0" v-model="modelOnClass" :disabled="modelNotClass">
                    <span class="popover-input" slot="reference">
                      <em v-if="models_grouped.length==0 || selected_models.length==0">全部</em>
                      <em v-else>已选择了
                        <template v-for="(item, id) in selected_models">
                          {{ item.name }}
                        </template>
                      </em>
                      <i class="iconfont icon-xiao73"></i>
                    </span>
                    <div class="news-search-popover-cont" style="min-width: 440px; max-width: 520px">
                      <h4 class="popover-title">
                        <cite>当前已选择：</cite>
                        <span>
                          <em v-for="(item, index) in selected_models" :modelId="item.id">{{ item.name }}<i @click="clearSubItem('model', item.id);">x</i></em>
                          <font @click="clearItem('model')">重置条件</font>
                        </span>
                      </h4>
                      <div class="popover-main_vb" v-if="selected_brands.length > 0">
                        <dl v-for="(brand, key) in models_grouped">
                          <dt>{{ brand.brand_name }}</dt>
                          <dd>
                            <span v-for="(model, key) in brand.model" :class="{'on':selected_model_ids.includes(model._id)}" :title="model.model_name" @click="checkModel(model._id)">{{ model.model_name }}</span>
                          </dd>
                        </dl>
                      </div>
                      <div class="popover-footer">
                        <a href="javascript:;" @click="cancelModel()">取消</a>
                        <a href="javascript:;" @click="modelOnClass=false" class="on">确定</a>
                      </div>
                    </div>
                  </el-popover>
                </div>
                <div class="popover-box" :class="{active: typeActiveClass, on: typeOnClass}">
                  <label class="popover-label">请选择新闻类型</label>
                  <el-select v-model="type" placeholder="全部" value="全部">
                    <el-option
                      v-for="(item, key) in types_map"
                      :key="item._id"
                      :label="item.type_name"
                      :value="item._id">
                    </el-option>
                  </el-select>
                </div>
                <div class="popover-box" :class="{active: sourceActiveClass, on: sourceOnClass}">
                  <label class="popover-label">请选择信息来源</label>
                  <el-select v-model="source" placeholder="全部">
                    <el-option
                      v-for="(item, key) in ['全部', ...baseInfo.news_source]"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="clear" style="margin-bottom: 20px;">
                <p class="segmentation">请选择日期</p>
                <el-date-picker
                  v-model="dateRange"
                  type="daterange"
                  format="yyyy/MM/dd"
                  value-format="yyyyMMdd"
                  align="left"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                  style="width: 34%; min-width: 380px;">
                </el-date-picker>
              </div>
              <a href="javascript:void(0);" class="submit" @click="submitSearchData(1)">{{ searchStatusText }}</a>
              <a href="javascript:void(0);" class="submit-back" @click="gotoback()" v-show="searchType==1">返回上一步</a>
            </div>
          </bi-panel>

          <bi-panel title-type="border" v-show="searchType != 1">
            <template slot="title">
              <font>按关键词搜索</font>
            </template>
            <div class="search-keyword">
              <p class="segmentation">请输入关键字</p>
              <input type="text" placeholder="如：通用汽车" v-model="key_word">
              <a href="javascript:void(0);" class="submit" @click="submitSearchData(2)">{{ searchStatusText }}</a>
              <a href="javascript:void(0);" class="submit-back" @click="gotoback()" v-show="searchType==2">返回上一步</a>
            </div>
          </bi-panel>

          <!-- 结果 -->
          <h2 class="panel-selected" v-show="searchType != ''">
            为您找到 <b class="font-red">{{ searchRecords }}</b> 个结果
          </h2>
          <bi-panel title-type="border" v-show="searchType != ''" v-loading="loading['search']" style="min-height: 300px; background-color: #fff">
            <div>
              <div class="search-result" v-if="searchRecords > 0">
                <table>
                  <thead>
                    <tr>
                      <th width="5%">ID</th>
                      <th width="9%">ID-厂商</th>
                      <th width="9%">ID-品牌</th>
                      <th width="9%">ID-车型</th>
                      <th width="7%">新闻类别</th>
                      <th width="8%">发布时间</th>
                      <th>标题</th>
                      <th width="12%">信息来源</th>
                      <th width="8%">热度</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, key) in searchData">
                      <td>{{ key + 1 }}</td>
                      <td>
                        <p v-if="row.manf&&row.manf[0]">{{ row.manf[0].id }}-{{ row.manf[0].manf_name }}</p>
                        <p v-else>暂无厂商</p>
                      </td>
                      <td>
                        <p v-if="row.brand&&row.brand[0]">
                          {{ row.brand[0].id }}-{{ row.brand[0].brand_name }}
                        </p>
                        <p v-else>暂无品牌</p>
                      </td>
                      <td>
                        <p v-if="row.model&&row.model[0]">{{ row.model[0]._id }}-{{ row.model[0].model_name }}</p>
                        <p v-else>暂无车型</p>
                      </td>
                      <td>
                        <a v-if="row.news_type" :href="'#/news?tab=list&tid=' + row.news_type._id">{{ row.news_type.type_name }}</a>
                        <em v-else>暂无分类</em>
                      </td>
                      <td>{{ row.post_time | date }}</td>
                      <td><a class="text-hide" :href="'client.html#/news/detail?id=' + row.id" target="_blank">{{ row.news_title }}</a></td>
                      <td>{{ row.source }}</td>
                      <td>
                       <div class="progress-box">
                         <bi-progress :percentage="row.heat" color="#ff8838" height="8" :show-text="false"></bi-progress>
                       </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="pagination-box">
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    prev-text="上一页"
                    next-text="下一页"
                    @current-change="getSearchData"
                    :current-page.sync="searchPage"
                    :page-size="20"
                    :total="searchRecords">
                  </el-pagination>
                </div>
              </div>
              <div class="search-result" v-else>
                <template v-if="!loading['search']">
                  <!-- 无结果 -->
                  <bi-empty>
                    <em v-for="(item,key) in where"> {{ item.name }} </em>
                    <slot name="tips">
                      <!--<p>亲爱的，请减少搜索条件并检查搜索条件是否正确，简化搜索条件、搜索所需新闻信息</p>-->
                    </slot>
                  </bi-empty>
                  <div class="interested">
                    <p>猜你感兴趣:</p>
                    <a href="#">国内新车</a>
                    <a href="#">生活八卦</a>
                    <a href="#">行业动态</a>
                    <a href="#">新车资讯</a>
                    <a href="#">独家新闻</a>
                  </div>
                </template>
              </div>
            </div>
          </bi-panel>
        </div>
      </div>

    </div>
	</div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import BiTitle from '@index/components/title.vue'
  import BiPanel from '@index/components/panel.vue'
  import BiCell from '@index/components/cell.vue'
  import BiProgress from '@index/components/progress.vue'
  import BiTabs from '@index/components/tabs'
  import BiEmpty from '@index/components/empty.vue'
  import mixin from '@index/config/mixin.js'
  import bus from '@/config/eventBus.js'
  import JQuery from 'jquery'
  import Draggable from 'vuedraggable'
  Vue.use(BiTabs);

  export default {
    name: 'News',
    mixins: [mixin],
    data() {
      return {
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
        news_types: [],
        toutiao: [],
        totalHot: 0,
        tuijian: new Array(5).fill({}),
        pageTuijian: 1,
        totalTuijian: 0,
        loading: {},

        // index tab param
        panels: JSON.parse(localStorage.getItem('PANELS_SORT')) || [],
        string_manf_ids: '0',
        string_brand_ids: '0',
        string_model_ids: '0',
        selected_manfs_text: '',
        selected_brands_text: '',
        selected_models_text: '',
        boxData: {},
        selectedSubTab: 'manf',
        pageHotIndex: 1,
        hotNewsIndex: new Array(5).fill({}),

        // list tab param
        listData: [],
        listTuijian: [],
        pageHotList: 1,
        hotNewsList: new Array(5).fill({}),
        page: 1,
        pageSize: 10,
        listRecords: 0,
        sort: 1,    // 1：时间，2：热度
        sortClass: 1,
        type_id: this.$route.query.tid || '0',
        showClass: localStorage.getItem('NEWS_SHOW_TYPE') || 0,
        typeBoxOpen: false,

        // search tab param
        searchData: [],
        searchPage: 1,
        searchRecords: 0,
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        manfs_map: {},
        manfOnClass: false,
        manfNotClass: false,
        brandOnClass: false,
        brandNotClass: true,
        modelOnClass: false,
        modelNotClass: true,
        typeOnClass: false,
        typeActiveClass: false,
        sourceOnClass: false,
        sourceActiveClass: false,
        keywordActiveClass: false,
        lookErrorClass:false,
        lookManfIds: [],
        lookManfId:'',
        key_word: this.$route.query.keyword || '',
        where: [],
        searchType: this.$route.query.searchType || '',
        maxItem: 10,
        manfName:'',
        selected_manf_ids: this.$route.query.manf_ids ? this.$route.query.manf_ids.split(',').map((id)=>{return Number(id)}) : [],
        selected_brand_ids: this.$route.query.brand_ids ? this.$route.query.brand_ids.split(',').map((id)=>{return Number(id)}) : [],
        selected_model_ids: this.$route.query.model_ids ? this.$route.query.model_ids.split(',').map((id)=>{return Number(id)}) : [],
        type: Number(this.$route.query.type) || 0,
        source: this.$route.query.source || '全部',
        dateRange: [this.$route.query.start_date || '', this.$route.query.end_date || ''],
      }
    },
    mounted() {
      this.getToken(() => {
          this.getBaseInfo()
      })
      var that = this
      bus.$on('updateConfig', function(config) {
        that.editable = config[7]
      })
      var status = true
      this.loading = {
        'tuijianIndex': status,
        'hotIndex': status,
        'box': {},
        'list': status,
        'tuijianList': status,
        'hotList': status,
        'search': status
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
      news_types() {
        if (this.panels.length != 0) return this.panels
        var panels = []
        , loading = {}
        this.news_types.map( (item, index) => {
          var name = item['type_name'] || ''
          , type_id = item['_id'] || ''
          panels.push({name, type_id, fixed: false, show: true})
          loading[type_id] = false
        })
        this.panels = panels
//        this.loading['box'] = loading
      },
    },
    computed: {
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
      types_map: function() {
          var types  = {0: {_id:0,type_name:'全部'}};
          for (var x in this.baseInfo.news_type) {
              var type = this.baseInfo.news_type[x];
              types[type._id] = type;
          }
          return types;
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
      searchStatusText() {
        return !!this.searchType ? '搜索' : '下一步'
      },
    },
    filters: {
      date: function(value) {
          var regex = new RegExp(/\d+/g);
          var matches = value.match(regex);
          return matches.slice(0, 3).join('/');
      }
    },
    methods: {
      tabsClick: function(targetId) {
        var index = targetId.replace('tabs','')
        this.$router.push({query: {tab:index}})

        this.selectedTab = index
        // this.loadData()
      },
      // search tab methods
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
      cancelManf() {
        this.manfOnClass = false
        this.letter_selected['manfsBoxForSearch'] = 'A'
        this.selected_manf_ids = []
        this.selected_brand_ids = []
        this.selected_model_ids = []
      },
      cancelBrand() {
        this.brandOnClass = false
        this.letter_selected['brandsBoxForSearch'] = 'A'
        this.selected_brand_ids = []
        this.selected_model_ids = []
      },
      cancelModel() {
        this.modelOnClass = false
        this.selected_model_ids = []
      },
      checkModel(model_id) {
        var index = this.selected_model_ids.findIndex((id)=>{return id == model_id})
        if ( index >= 0) {
          this.selected_model_ids.splice(index, 1)
        } else {
          this.selected_model_ids.push(model_id)
        }
      },
      gotoback() {
        this.searchType = ''
        this.searchRecords = 0
        this.searchData = []
        this.clearAll()
        this.initWhere()
        this.$router.push({query: {tab: 'search'}})
      },
      submitSearchData: function(searchType = 1) {
        this.searchType = searchType
        if (searchType == 1) {
          var params = {
            tab: 'search',
            manf_ids: this.selected_manf_ids.join(','),
            brand_ids: this.selected_brand_ids.join(','),
            model_ids: this.selected_model_ids.join(','),
            type: this.type != false ? this.type : undefined,
            source: this.source != '全部' ? this.source : undefined,
            start_date: this.dateRange[0],
            end_date: this.dateRange[1],
            searchType: searchType,
          }
        } else if (searchType == 2) {
          var params = {
            tab: 'search',
            keyword: this.key_word.trim() || '',
            searchType: searchType,
          }
        }
        this.$router.push({query: params})
        this.getSearchData()
      },
      initWhere() {
        var where = []
        if (this.selected_manfs.length > 0) {
          var dot = this.selected_manfs.length > 1 ? '...' : ''
          where.push({type: 'manf', value: this.selected_manfs[0]['id'], name: this.selected_manfs[0]['name'] + dot})
        }
        if (this.selected_brands.length > 0) {
          var dot = this.selected_brands.length > 1 ? '...' : ''
          where.push({type: 'brand', value: this.selected_brands[0]['id'], name: this.selected_brands[0]['name'] + dot})
        }
        if (this.selected_models.length > 0) {
          var dot = this.selected_models.length > 1 ? '...' : ''
          where.push({type: 'model', value: this.selected_models[0]['id'], name: this.selected_models[0]['name'] + dot})
        }
        if (this.type > 0) {
          where.push({type: 'type', value: this.types_map[this.type]['_id'], name: this.types_map[this.type]['type_name']})
        }
        if (this.source != '全部') {
          where.push({type: 'source', value: this.source, name: this.source});
        }
        if (this.dateRange.length == 2 && this.dateRange[0] && this.dateRange[1]) {
          where.push({type: 'date', value: this.dateRange[0] + '/' + this.dateRange[1], name: this.dateRange[0] + '到' + this.dateRange[1]});
        }
        if (this.key_word != '') {
          where.push({type: 'keyword', value: this.key_word, name: this.key_word})
        }
        this.where = where
      },
      deleteItem: function(type) {
        this.clearItem(type)
        this.submitSearchData(this.searchType);
      },
      clearItem(type) {
        switch(type) {
          case 'manf':
            this.selected_manf_ids = []
            if (!this.selected_manf_ids.length) this.selectedSubTab = 'manf'
          case 'brand':
            this.selected_brand_ids = []
            if (this.selected_manf_ids.length && !this.selected_brand_ids.length) this.selectedSubTab = 'brand'
          case 'model':
            this.selected_model_ids = []
            break
          case 'type':
            this.type = 0
            break
          case 'source':
            this.source = '全部'
            break
          case 'date':
            this.dateRange = ['', '']
            break
          case 'keyword':
            this.key_word = ''
            break
        }
      },
      clearSubItem(type, id='') {
        switch(type) {
          case 'manf':
            var index = this.selected_manf_ids.findIndex( (i)=>{return i == id} )
            this.selected_manf_ids.splice(index, 1)
            if (!this.selected_manf_ids.length) this.selectedSubTab = 'manf'
            break
          case 'brand':
            var index = this.selected_brand_ids.findIndex( (i)=>{return i == id} )
            this.selected_brand_ids.splice(index, 1)
            if (this.selected_manf_ids.length && !this.selected_brand_ids.length) this.selectedSubTab = 'brand'
            break
          case 'model':
            var index = this.selected_model_ids.findIndex( (i)=>{return i == id} )
            this.selected_model_ids.splice(index, 1)
            break
        }
      },
      deleteAll() {
        this.clearAll()
        this.submitSearchData(this.searchType);
      },
      clearAll() {
        var that = this
        , types = ['manf', 'brand', 'model', 'type', 'source', 'date', 'keyword']
        types.map((type) => {
          that.clearItem(type)
        })
      },
      // list tab methods
      changeType: function(type, index) {
        this.type_id = type;
        if (index > 9) {
          var item = this.news_types.splice(index, 1)[0]
          this.news_types.unshift(item)
        }
        this.page = 1;
        this.typeBoxOpen = false;
        this.getListData(this.page, type);
        this.getTuijian('List', type);
      },
      changeSort: function(sort) {
          this.sort = sort;
          this.sortClass = sort;
          this.getListData(this.page, this.type_id);
      },
      // index tab method
      cancelIndexData() {
        this['selectOnClass'] = false;
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
      onDragEnd() {
        localStorage.setItem('PANELS_SORT', JSON.stringify(this.panels))
      },
      // api methods
      getBaseInfo() {
        this.$request.get(this.$interface.GET_NEWS_BASE_INFO, {
          token: this.token
        }, (response) => {
          this.baseInfo = response.data[0]
          this.news_types = this.baseInfo.news_type.map((item) => {return item})
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
      getTuijian(id = 'Index', type = -1, page = 1) {
        this.loading['tuijian'+id] = true
        this.$request.get(this.$interface.GET_NEWS_RECOMMEND, {
          token: this.token,
          manf_id: this.string_manf_ids || 0,
          brand_id: this.string_brand_ids || 0,
          model_id: this.string_model_ids || 0,
          type_id: type == 0 ? -1 : type,
          page: page,
          rows: 5,
          orderby: 1,
        }, (response) => {
          if (type == -1) {
            this.totalTuijian = this.totalTuijian || response.data[0]['total'];
            if (this.pageTuijian >= this.totalTuijian || this.pageTuijian * 5 > response.data[0]['records'] || this.pageTuijian >= 5) {
              this.pageTuijian = 1;
            }
            this.tuijian = response.data[0]['rows'] || []
          } else {
            this.listTuijian = response.data[0]['rows'] || this.tuijian
          }
          this.listTuijian = this.listTuijian || this.tuijian
          this.loading['tuijian'+id] = false
        }, this.failure)
      },
      getToutiao() {
        this.$request.get(this.$interface.GET_NEWS_PAGE, {
          token: this.token,
          manf_id: this.string_manf_ids || 0,
          brand_id: this.string_brand_ids || 0,
          model_id: this.string_model_ids || 0,
          type_id: -2,
          rows: 5,
          orderby: this.sort,
        }, (response) => {
          this.toutiao = response.data[0]['rows'] || []
        }, this.failure)
      },
      getHot(id = 'Index', page = 1) {
        this.loading['hot'+id] = true
        this.$request.get(this.$interface.GET_NEWS_HOT, {
          token: this.token,
          page: page,
          rows: 5,
        }, (response) => {
          this.totalHot = this.totalHot || response.data[0]['total'];
          if (this['pageHot'+id] >= this.totalHot || this['pageHot'+id] * 5 > response.data[0]['records'] || this['pageHot'+id] > 5) {
            this['pageHot'+id] = 1;
          }
          this['hotNews'+id] = response.data[0]['rows'] || []
          this.loading['hot'+id] = false
        }, this.failure)
      },
      getBoxData() {
        this.selectOnClass = false
        var that = this
        , news_types = this.news_types
        news_types.map((item) => {
          that.loading['box'][item._id] = true
          that.$request.get(this.$interface.GET_NEWS_PAGE, {
            token: this.token,
            manf_id: this.string_manf_ids || 0,
            brand_id: this.string_brand_ids || 0,
            model_id: this.string_model_ids || 0,
            type_id: item._id,
            rows: 10,
            orderby: this.sort,
          }, (response) => {
            that.loading['box'][item._id] = false
            that.boxData[item._id] = response
          }, this.failure)
        })
      },
      getListData(page = 1, type = this.type_id) {
        var that = this
        , counter = 0
        , listData = {}
        this.loading['list'] = true
        this.$request.get(this.$interface.GET_NEWS_PAGE, {
          token: this.token,
          manf_id: this.string_manf_ids || 0,
          brand_id: this.string_brand_ids || 0,
          model_id: this.string_model_ids || 0,
          type_id: type,
          rows: 40,
          orderby: this.sort,
          page: page
        }, (response) => {
          var result = response['data'][0]
          this.listData = result['rows']
          this.listRecords = result['records']
          this.loading['list'] = false
        }, this.failure)
      },
      getSearchData(page = 1) {
        this.initWhere()
        this.loading['search'] = true
        this.$request.get(this.$interface.GET_NEWS_PAGE, {
          token: this.token,
          key_word: this.key_word.trim() || '',
          manf_id: this.selected_manf_ids.join(',') || 0,
          brand_id: this.selected_brand_ids.join(',') || 0,
          model_id: this.selected_model_ids.join(',') || 0,
          type_id: this.type || 0,
          source: this.source !== '全部' ? this.source : '',
          start_date: this.dateRange[0] || '',
          end_date: this.dateRange[1] || '',
          orderby: this.sort,
          page: page,
          rows: 20,
        }, (response) => {
          var result = response['data'][0]
          this.searchData = result['rows'] || []
          this.searchRecords = result['records']
          this.loading['search'] = false
        }, this.failure)
      },
      loadData() {
        this.pageTuijian = 1
        this.selectOnClass = false
        this.getTuijian('Index', -1, this.pageTuijian++)
        this.getTuijian('List', this.type_id)
        this.getHot('Index', this.pageHotIndex++)
        this.getHot('List', this.pageHotList++)
        this.getBoxData()
        this.getListData()
      },
    },
    components:{
      BiTitle,
      BiPanel,
      BiCell,
      BiProgress,
      BiEmpty,
      Draggable
    }
	}
</script>


<style lang="scss" type="text/scss" scoped>
</style>
