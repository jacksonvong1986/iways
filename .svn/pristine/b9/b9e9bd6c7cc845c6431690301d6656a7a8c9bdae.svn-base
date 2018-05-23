<template>
	<div class="news-detail"><!-- 
    <div class="content-top-floor" style="height: 20px;"></div> -->
    <div class="content-top" id="content-top">
      <div class="pageinfo">
        <bi-title columnTitle="新闻舆情" columnIcon="icon-bingtu" columnText="专业的汽车阅读平台">
        </bi-title>
        <div class="right-box">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/news' }">新闻舆情</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/news', query: {tab: 'list', tid: dataDetail.news_type._id} }" v-if="dataDetail.news_type">{{ dataDetail.news_type.type_name }}</el-breadcrumb-item>
            <el-breadcrumb-item><strong>{{ dataDetail.news_title }}</strong></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div><!-- 
      <bi-tabs @tabsClick="tabsClick">
        <bi-tabs-item targetId="tabsindex" :selected="selectedTab=='index'"><router-link to="#news">新闻首页</router-link></bi-tabs-item>
        <bi-tabs-item targetId="tabslist" :selected="selectedTab=='list'"><router-link to="#news/list">新闻列表</router-link></bi-tabs-item>
        <bi-tabs-item targetId="tabssearch" :selected="selectedTab=='search'"><router-link to="#news/search">新闻搜索</router-link></bi-tabs-item>
      </bi-tabs> -->
    </div>

    <div class="content-main news-detail">
      <el-row :gutter="20">
        <el-col :span="18">
          <bi-panel>
            <div class="left">
              <h1>{{ dataDetail.news_title }}</h1>
              <h2>
                发布时间：{{ dataDetail.post_time }}
                新闻类别：
                <a v-if="dataDetail.news_type" :href="'#/news?tab=list&tid=' + dataDetail.news_type._id" target="_blank">{{ dataDetail.news_type.type_name }}</a><em v-else>暂无</em>
              　来源: {{ dataDetail.source }}
                作者：{{ dataDetail.author }}
                热度：
                <span style="display: inline-block;vertical-align: text-top">
                  <el-rate v-model="heat" disabled text-color="#ff9900" score-template="{value}"></el-rate>
                </span>
              </h2>
              <h3 v-if="dataDetail.tag">
                关键词：
                <a v-for="(item, key) in dataDetail.tag" href="#/news?tab=list" target="_blank">{{ item }}</a>
              </h3>
              <div class="cont" v-html="dataDetail.html_file"></div>
              <h4>版权声明：凡本网注明来源为"{{ dataDetail.source }}"，版权均属于{{ dataDetail.source }}，转载请注明"来源：{{ dataDetail.source }}"。本网转载自其它媒体的信息，不代表本网观点，转载均有出处，对转载文章不存在侵权等法律问题。</h4>
            </div>
          </bi-panel>
        </el-col>
        <el-col :span="6">
          <bi-panel title-type="border">
            <template slot="title">
              <font>推荐新闻</font>
            </template>
            <ul class="recommend">
              <li v-for="(item,key) in tuijian">
                <figure v-if="key==0">
                  <a :href="'#/news/detail?id=' + item.id" target="_blank">
                    <img :src="item.pic && item.pic[0] ? item.pic[0] : '/static/images/nocar.png'" alt="暂无图片">
                  </a>
                  <figcaption>
                    <h3><a :href="'#/news/detail?id=' + item.id" target="_blank">{{ item.text }}</a></h3>
                    <p>[{{ item.source }}]&nbsp; {{ item.post_time }}</p>
                  </figcaption>
                </figure>
                <dl v-else>
                  <dt><a :href="'#/news/detail?id=' + item.id" target="_blank"><img :src="item.pic && item.pic[0] ? item.pic[0] : '/static/images/nocar.png'" alt="暂无图片"></a></dt>
                  <dd>
                    <a :href="'#/news/detail?id=' + item.id" target="_blank">{{ item.news_title }}</a>
                    <p>{{ item.text }}</p>
                  </dd>
                </dl>
              </li>
            </ul>
          </bi-panel>
          <bi-panel title-type="border" id="youlike">
            <template slot="title">
              <font class="fs16">猜你喜欢</font>
            </template>
            <template slot="operating">
              <a class="more-btn" href="#/news?tab=list&tid=-2" target="_blank">更多</a>
            </template>
            <div class="youlike">
              <p v-for="(item,key) in toutiao">
                <a :href="'#/news/detail?id=' + item.id" target="_blank">{{ item.news_title }}</a>
                <span>{{ item.text }}</span>
              </p>
            </div>
          </bi-panel>
        </el-col>
      </el-row>
    </div>
	</div>
</template>

<script type="text/ecmascript-6">
  import BiTitle from '@index/components/title.vue'
  import BiPanel from '@index/components/panel.vue'
  import mixin from '@index/config/mixin.js'

	export default {
		name: 'newsDetail',
    mixins: [mixin],
		data() {
			return {
        news_id: this.$route.query.id || 0,
        selectedTab: this.$route.query.tab || 'index',
        baseInfo: {},
        dataDetail: {news_type:{_id:0,type_name:''}},
        tuijian: {},
        toutiao: {},
        sort: 1,    // 1：时间，2：热度
        sortClass: 1,
        page: 1,
        pageSize: 20,
        pageRecommend: 1,
        totalPageRecommend: 0,
        type_id: '',
        typeClass: 0,
        heat: 0
			}
		},
    mounted() {
      this.getToken(() => {
        this.getBaseInfo()
      })
    },
    methods: {
      tabsClick: function(targetId) {
        var index = targetId.replace('tabs','')
        this.$router.push({query: {tab:index}})
        this.selectedTab = index
      },
      getBaseInfo() {
        this.$request.get(this.$interface.GET_NEWS_BASE_INFO, {
          token: this.token
        }, (response) => {
          this.baseInfo = response.data[0]
          this.loadData()
        }, this.failure)
      },
      getTuijian(type = -1) {
        this.$request.get(this.$interface.GET_NEWS_RECOMMEND, {
          token: this.token,
          news_id: this.news_id,
          rows: 5,
          orderby: 1,
        }, (response) => {
          this.tuijian = response.data[0]['rows'] || [];
        }, this.failure)
      },
      getDetail() {
        this.$request.get(this.$interface.GET_NEWS_DETAIL, {
          token: this.token,
          news_id: this.news_id,
        }, (response) => {
          this.dataDetail = response['data'][0] || {};
          this.heat = this.dataDetail.heat * 5
        }, this.failure)
      },
      getLike() {
        this.$request.get(this.$interface.GET_NEWS_PAGE, {
          token: this.token,
          news_id: this.news_id,
          type_id: -2,
          rows: 5,
          orderby: 1,
        }, (response) => {
          this.toutiao = response.data[0]['rows'] || [];
        });
      },
      loadData() {
        this.getDetail()
        this.getTuijian()
        this.getLike()
      }
    },
    components:{
      BiTitle,
      BiPanel,
    }
	}
</script>

<style lang="scss" type="text/scss" scoped>
</style>
