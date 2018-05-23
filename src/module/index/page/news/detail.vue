<template>
  <div style="background-color: #fafafa">
    <div class="news news-detail">
      <div class="news-main-column">
        <el-breadcrumb separator="/">
          <span style="float: left; margin-right: 10px; color: #606266">当前位置：</span>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/news' }">新闻中心</el-breadcrumb-item>
          <el-breadcrumb-item :to="'/news/list?tid=' + dataDetail.news_type._id">{{ dataDetail.news_type.type_name }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ dataDetail.news_title }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="news-main-left news-detail-main"  v-loading="loading['detail']">
        <div class="news-detail-top">
          <h1>{{ dataDetail.news_title }}</h1>
          <p>
            <font>发布时间： {{ dataDetail.post_time }}</font>
            新闻类别： <a v-if="dataDetail.news_type" :href="'/news/list?tid=' + dataDetail.news_type._id" target="_blank">{{ dataDetail.news_type.type_name }}</a><em v-else>暂无</em>
            <font v-if="dataDetail.source">来源：{{ dataDetail.source }}</font><font v-else>来源：暂无</font>
            <font>作者： {{ dataDetail.author || '匿名' }}</font>
          </p>
          <p class="clear">
            <cite>文章热度：</cite><el-rate v-model="heat" disabled text-color="#ff9900" score-template="{value}" style="float: left"></el-rate>
          </p>
          <div class="key">
            <font>关键词：</font>
            <span class="btn-plain" v-for="(item, key) in dataDetail.tag">{{ item }}</span>
          </div>
        </div>
        <div class="news-detail-center">
          <div>
            <!-- 文章内容 -->
            <div class="cont" v-html="dataDetail.html_file"></div>
          </div>
        </div>
        <div class="news-detail-bottom">
          版权声明：凡本网注明来源为"{{ dataDetail.source }}"，版权均属于{{ dataDetail.source }}，转载请注明"来源：{{ dataDetail.source }}"。本网转载自其它媒体的信息，不代表本网观点，转载均有出处，对转载文章不存在侵权等法律问题。
        </div>
      </div>
      <div class="news-main-right">
        <div class="bgwhite">
          <h1><span>推荐文章</span></h1>
          <dl v-loading="loading['recommend']">
            <dt v-for="(item,key) in tuijian" v-if="key==0">
              <figure>
                <a :href="'/news/detail?id=' + item.id" target="_blank"><img :src="item.pic && item.pic[0] ? item.pic[0] : '/static/images/nocar.png'" alt="暂无图片"/></a>
                <figcaption>
                  <a :href="'/news/detail?id=' + item.id" target="_blank">{{ item.news_title }}</a>
                  <p>{{ item.text }}</p>
                </figcaption>
              </figure>
            </dt>
            <dd v-else>
              <h2> <a :href="'/news/detail?id=' + item.id" target="_blank">{{ item.news_title }}</a></h2>
              <p>{{ item.text }}</p>
            </dd>
          </dl>
        </div>
        <div class="bgwhite">
          <h1><span>热门文章</span></h1>
          <dl v-loading="loading['hotList']">
            <dt v-for="(item,key) in hotNewsList" v-if="key==0">
              <figure>
                <a :href="'/news/detail?id=' + item.id" target="_blank"><img :src="item.pic && item.pic[0] ? item.pic[0] : '/static/images/nocar.png'" alt="暂无图片"/></a>
                <figcaption>
                  <a :href="'/news/detail?id=' + item.id" target="_blank">{{ item.news_title }}</a>
                  <p>{{ item.text }}</p>
                </figcaption>
              </figure>
            </dt>
            <dd v-else>
              <h2><a :href="'/news/detail?id=' + item.id" target="_blank">{{ item.news_title }}</a></h2>
              <p>{{ item.text }}</p>
            </dd>
          </dl>
        </div>
        <div class="bgwhite">
          <h1><span>猜你喜欢</span></h1>
          <dl v-loading="loading['like']">
            <dt v-for="(item,key) in guessLike" v-if="key==0">
              <figure>
                <a :href="'/news/detail?tid=' + item.news_type._id + '&id=' + item.id" target="_blank"><img :src="item.pic && item.pic[0] ? item.pic[0] : '/static/images/nocar.png'" alt="暂无图片"/></a>
                <figcaption>
                  <a :href="'/news/detail?tid=' + item.news_type._id + '&id=' + item.id" target="_blank">{{ item.news_title }}</a>
                  <p>{{ item.text }}</p>
                </figcaption>
              </figure>
            </dt>
            <dd v-else>
              <h2><a :href="'/news/detail?tid=' + item.news_type._id + '&id=' + item.id" target="_blank">{{ item.news_title }}</a></h2>
              <p>{{ item.text }}</p>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import mixin from '@index/config/mixin.js'
  import bus from '@/config/eventBus'

  export default {
    name: 'newsDetail',
    mixins: [mixin],
    data() {
      return {
        news_id: this.$route.query.id || 0,
        baseInfo: {},
        dataDetail: {news_type:{_id:0,type_name:''}},
        tuijian: {},
        guessLike: [],
        hotNewsList: new Array(5).fill({}),
        sort: 1,    // 1：时间，2：热度
        page: 1,
        type_id: '',
        heat: 0,
        loading:{}
      }
    },
    mounted() {
      this.getBaseInfo()
      let status = true;
      this.loading = {
        'recommend': status,
        'hotIndex': status,
        'box': {},
        'list': status,
        'tuijianList': status,
        'hotList': status,
        'like': status,
        'detail': status
      }
    },
    methods: {
      getBaseInfo() {
        this.$request.get(this.$interface.GET_NEWS_BASE_INFO, {
          token: this.token
        }, (response) => {
          this.baseInfo = response.data[0]
          this.loadData()
        }, this.failure)
      },
      getTuijian() {
        this.loading['recommend'] = true;
        this.$request.get(this.$interface.GET_NEWS_RECOMMEND, {
          token: 'token',
          news_id: this.news_id,
          rows: 5,
          orderby: this.sort,
        }, (response) => {
          this.tuijian = response.data[0]['rows'] || [];
          this.loading['recommend'] = false;
        }, this.failure)
      },
      getDetail() {
        this.loading['detail'] = true
        this.$request.get(this.$interface.GET_NEWS_DETAIL, {
          token: 'token',
          news_id: this.news_id,
        }, (response) => {
          this.dataDetail = response['data'][0] || {};
          this.heat = this.dataDetail.heat * 5
          this.loading['detail'] = false
          bus.$emit('getNewsType', this.dataDetail.news_type ? this.dataDetail.news_type._id : 0)
        }, this.failure)
      },
      getHot() {
        this.loading['hotList'] = true;
        this.$request.get(this.$interface.GET_NEWS_HOT, {
          token: 'token',
          page: 1,
          rows: 5,
        }, (response) => {
          this.totalHot = this.totalHot || response.data[0]['total'];
          this.hotNewsList = response.data[0]['rows'] || []
          this.loading['hotList'] = false;
        }, this.failure)
      },
      getLike() {
        this.loading['like'] = true;
        this.$request.get(this.$interface.GET_NEWS_PAGE, {
          token: 'token',
          manf_id: this.string_manf_ids || 0,
          brand_id: this.string_brand_ids || 0,
          model_id: this.string_model_ids || 0,
          type_id: -2,
          rows: 5,
          orderby: this.sort,
        }, (response) => {
          this.guessLike = response.data[0]['rows'] || [];
          this.loading['like'] = false;
        });
      },
      loadData() {
        this.getDetail()
        this.getTuijian()
        this.getHot()
        this.getLike()
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
</style>
