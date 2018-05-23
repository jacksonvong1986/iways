<template>
  <div class="news">
    <div class="news-main">
     <div class="clear">
        <div class="news-main-left" style="min-width:800px;">
          <div v-loading="loading['recommend']" style="min-height:303px;">
            <dl class="news-remd newslist-remd" v-if="tuijian.length" >
              <dt v-for="(item, key) in tuijian" v-if="key==0">
                <figure>
                  <router-link :to="'/news/detail?id=' + item.id" target="_blank"><img :src="item.pic && item.pic[0] ? item.pic[0] : '/static/images/nocar.png'" alt="暂无图片"/></router-link>
                  <figcaption>
                    <div>
                      <h2>
                        <router-link :to="'/news/detail?id=' + item.id" target="_blank" :title="item.news_title">{{ item.news_title }}</router-link>
                      </h2>
                      <p>{{ item.text }}</p>
                    </div>
                  </figcaption>
                </figure>
              </dt>
              <dd v-else>
                <figure>
                  <router-link :to="'/news/detail?id=' + item.id" target="_blank"><img :src="item.pic && item.pic[0] ? item.pic[0] : '/static/images/nocar.png'" alt="暂无图片"/></router-link>
                  <figcaption>
                    <div>
                      <h2>
                        <router-link :to="'/news/detail?id=' + item.id" target="_blank" :title="item.news_title">{{ item.news_title }}</router-link>
                      </h2>
                      <p>{{ item.text }}</p>
                    </div>
                  </figcaption>
                </figure>
              </dd>
            </dl>
          </div>
          <div class="news-list" style="min-width: 800px; min-height: 300px" v-loading="loading['list']">
            <template v-if="listData.length > 0">
              <dl v-for="(item,key) in listData">
                <dt><a :href="'detail?id=' + item.id" target="_blank"><img :src="item.pic && item.pic[0] ? item.pic[0] : '/static/images/nocar.png'" alt="暂无图片"/></a></dt>
                <dd>
                  <h2><a :href="'detail?id=' + item.id" target="_blank">{{ item.news_title }}</a></h2>
                  <p>{{ item.text }}</p>
                  <div v-if="item.news_type">新闻类别：<a :href="'?tab=list&tid=' + item.news_type._id" target="_blank">{{ item.news_type.type_name }}</a><font>发布时间：{{ item.post_time | date }}</font></div>
                </dd>
              </dl>
            </template>
            <template v-else>
              <bi-empty v-if="!loading['list']"></bi-empty>
            </template>
          </div>
          <div class="listPaging">
            <el-pagination
            background
            style="text-align: center"
            @size-change="handleSizeChange"
            @current-change="getListData"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="total">
            </el-pagination>
          </div>
        </div>
       <div class="news-main-right">
         <div>
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
         <div>
           <h1><span>猜你喜欢</span></h1>
           <dl v-loading="loading['like']">
             <dt v-for="(item,key) in guessLike" v-if="key==0">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import mixin from '@index/config/mixin.js'
  import bus from '@/config/eventBus'
  import BiEmpty from '@portal/components/empty.vue'
  export default {
    name: '',
    mixins: [mixin],
    data() {
      return {
        type_id: this.$route.query.tid || '0',
        listData: [],
        guessLike: [],
        sort: 1,    // 1：时间，2：热度
        hotNewsList: new Array(5).fill({}),
        tuijian: new Array(5).fill({}),
        currentPage: 1,
        pageSize: 10,
        total: 0,
        tuijian: [],
        cls: {
          1:'mgb15',
          2:'va mgb15',
          3:'va',
          4:'',
        },
        loading: {},
        keyword: this.$route.query.wd || '',
      }
    },
    mounted() {
      this.loadData();
      let status = true
      this.loading = {
        'recommend': status,
        'hotIndex': status,
        'list': status,
        'hotList': status,
        'like': status
      };
      this.$emit("changePageTitle", "-新闻中心");

    },
    filters: {
      date: function(value) {
        var regex = new RegExp(/\d+/g);
        var matches = value.match(regex);
        return matches.slice(0, 3).join('/');
      }
    },
    watch: {
      $route() {
        this.currentPage = 1
        this.type_id = this.$route.query.tid || '0'
        this.keyword = this.$route.query.wd || '',
        this.getTuijian(this.type_id)
        this.getListData()
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      getTuijian() {
        this.loading['recommend'] = true;
        this.$request.get(this.$interface.GET_NEWS_RECOMMEND, {
          token: 'token',
          type_id: this.type_id || -1,
          page: 1,
          rows: 5,
          orderby: 1,
        }, (response) => {
          this.totalTuijian = this.totalTuijian || response.data[0]['total'];
          this.tuijian = response.data[0]['rows'] || [];
          this.loading['recommend'] = false
        }, this.failure)
      },
      getListData(page = this.currentPage, type = this.type_id) {
        this.loading['list'] = true;
        this.listData = [];//重置
        this.$request.get(this.$interface.GET_NEWS_PAGE, {
          token: 'token',
          type_id: type,
          rows: this.pageSize,
          orderby: this.sort,
          page: page,
          key_word: this.keyword.trim() || '',
        }, (response) => {
          let result = response['data'][0];
          this.total = result['records'];
          this.listData = result['rows'];
          this.loading['list'] = false
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
          this.loading['hotList'] = false
        }, this.failure)
      },
      getLike() {
        this.loading['like'] = true;
        this.$request.get(this.$interface.GET_NEWS_PAGE, {
          token: 'token',
          manf_id: 0,
          brand_id: 0,
          model_id: 0,
          type_id: -2,
          rows: 5,
          orderby: 1,
        }, (response) => {
          this.guessLike = response.data[0]['rows'] || [];
          this.loading['like'] = false;
        }, this.failure);
      },
      loadData() {
        this.getTuijian()
        this.getListData()
        this.getHot()
        this.getLike()
      },
    },
    components: {
      BiEmpty
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
</style>
