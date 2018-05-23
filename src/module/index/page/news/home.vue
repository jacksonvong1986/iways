<template>
  <div class="news">
    <div class="news-main">
      <dl class="news-remd" v-if="tuijian.length"  v-loading="loading['recommend']">
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
      <div class="news-main-left">
        <div class="news-category" v-for="element in panels" :key="element.type_id" v-show="element.show">
          <h1>
            <span class="">{{ element.name }}</span>
            <router-link :to="'/news/list?tid='+element.type_id">更多</router-link>
          </h1>
          <div class="clear" v-if="boxData[element.type_id]&&boxData[element.type_id].data&&boxData[element.type_id].data[0]['rows']" v-loading="loading['box'][element.type_id]">
            <dl>
              <dt v-for="(item,key) in boxData[element.type_id].data[0]['rows']" v-if="key==0">
                <figure>
                   <a :href="'/news/detail?id=' + item.id" target="_blank" :title="item.news_title"><img :src="item.pic && item.pic[0] ? item.pic[0] : '/static/images/nocar.png'" width="100" alt="暂无图片"/></a>
                  <figcaption>
                    <a :href="'/news/detail?id=' + item.id" target="_blank" :title="item.news_title">{{item.news_title}}</a>
                    <p>{{item.text}}</p>
                  </figcaption>
                </figure>
              </dt>
              <dd v-else-if="key<3">
                <span><a :href="'/news/detail?id=' + item.id" target="_blank"><img :src="item.pic && item.pic[0] ? item.pic[0] : '/static/images/nocar.png'" width="100" alt="暂无图片"/></a></span>
                <font>
                  <a :href="'/news/detail?id=' + item.id" target="_blank">{{item.news_title}}</a>
                  <p>{{item.text}}</p>
                </font>
              </dd>
            </dl>
            <ul>
              <li v-for="(item,key) in boxData[element.type_id].data[0]['rows']" v-if="key>=3">
                <router-link :to="'/news/detail?id=' + item.id" target="_blank">{{item.news_title}}</router-link>{{ item.post_time | date }}
              </li>
            </ul>
          </div>
          <div v-else style="padding: 0 20px">
            <bi-empty :show-result="false"><template slot="tips">暂时没有相关数据</template></bi-empty>
          </div>
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
      import mixin from '@index/config/mixin'
      import BiEmpty from '@index/components/empty.vue'
      export default {
        name: '',
        mixins: [mixin],
        data() {
          return {
            type_id: '0',
            sort: 1,    // 1：时间，2：热度
            news_types: [],
            guessLike: [],
            boxData: {},
            panels: JSON.parse(localStorage.getItem('PANELS_SORT')) || [],
            hotNewsList: new Array(5).fill({}),
            tuijian: new Array(5).fill({}),
            loading:{}
          }
      },
        watch: {
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
           this.loading['box'] = loading
          },
        },
      mounted() {
        this.getBaseInfo();
        let status = true;
        this.loading = {
          'recommend': status,
          'hotIndex': status,
          'box': {},
          'list': status,
          'tuijianList': status,
          'hotList': status,
          'like': status
        }
      },
      filters: {
        date: function(value) {
          var regex = new RegExp(/\d+/g);
          var matches = value.match(regex);
          return matches.slice(0, 3).join('/');
        }
      },
      methods: {
        getBaseInfo() {
          this.$request.get(this.$interface.GET_NEWS_BASE_INFO, {
            token: 'token'
          }, (response) => {
            this.baseInfo = response.data[0]
            this.news_types = this.baseInfo.news_type.map((item) => {return item})
            this.loadData()
          }, this.failure)
        },
        getBoxData() {
          this.news_types.map((item) => {
            this.loading['box'][item._id] = true;
            this.$request.get(this.$interface.GET_NEWS_PAGE, {
              token: 'token',
              manf_id: 0,
              brand_id: 0,
              model_id: 0,
              type_id: item._id,
              rows: 13,
              orderby: this.sort,
            }, (response) => {
              this.boxData[item._id] = response;
              this.loading['box'][item._id] = false
            }, this.failure)
          })
        },
        getTuijian() {
          this.loading['recommend'] = true;
          this.$request.get(this.$interface.GET_NEWS_RECOMMEND, {
            token: 'token',
            type_id: this.type_id || -1,
            page: 1,
            rows: 5,
            orderby: this.sort,
          }, (response) => {
            this.totalTuijian = this.totalTuijian || response.data[0]['total'];
            this.tuijian = response.data[0]['rows'] || [];
            this.loading['recommend'] = false
          }, this.failure)
        },
        getHot: function () {
          this.loading['hotList'] = true;
          this.$request.get(this.$interface.GET_NEWS_HOT, {
            token: 'token',
            page: 1,
            rows: 5,
          }, (response) => {
            this.totalHot = this.totalHot || response.data[0]['total'];
            this.hotNewsList = response.data[0]['rows'] || [];
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
            orderby: this.sort,
          }, (response) => {
            this.guessLike = response.data[0]['rows'] || [];
            this.loading['like'] = false
          }, this.failure);
        },
        loadData() {
          this.getBoxData()
          this.getTuijian()
          this.getHot()
          this.getLike()
        },
      },
      components:{
        BiEmpty
      }
    }
</script>
<style lang="scss" type="text/scss" scoped>
</style>
