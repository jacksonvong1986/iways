<template>

  <div class="cyc-shouhou">
    <bi-bar columnTitle="售后概况" columnIcon="icon-shouhou">
      <template slot="button">
        <!--<span>当前数据时间：2018/03</span>-->
      </template>
      <template slot="right">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">概览主页</el-breadcrumb-item>
          <el-breadcrumb-item> 售后服务-售后概况</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
    </bi-bar>
    <div class="content">
      <!--<h2 class="panel-selected" style="display:none;">-->
        <!--已选条件:-->
        <!--<span>2015款SRX 3.0L <i class="iconfont icon-close"></i></span>-->
        <!--<span>2015款SRX 3.0L <i class="iconfont icon-close"></i></span>-->
        <!--<font>重置条件</font>-->
      <!--</h2>-->
      <bi-panel :operating="false">
        <template slot="title">
          请选择筛选条件
        </template>
        <div class="condition">
          <dl>
            <dt>厂商：</dt>
            <dd class="cont">
              <span :class="{'on':''==selected_manf_name}" @click="changeManf()">不限</span>
              <span v-for="manf in manfs_static" :class="{'on':manf.manf_name==selected_manf_name}" @click="changeManf(manf.manf_name)">{{manf.manf_name}}</span>
            </dd>
            <dd class="more">
              <!--<span @click="DialogVisible = true">更多 <i class="iconfont icon-unfold"></i></span>-->
              <el-dialog
                title="请选择厂商"
                :visible.sync="DialogVisible"
                :append-to-body="true"
                custom-class="dialog-va"
                width="900px"
                @open="isOpenDialogVisible(true)"
                @close="isOpenDialogVisible(false)"
                :lock-scroll="false"
                center>
                <div class="cont">
                  <ul>
                    <li @click="selectLetter('manfsBox', group.py_first_letter)" v-for="group in manfs_group">{{ group.py_first_letter }}</li>
                  </ul>
                  <div id="manfsBox">
                   <dl v-for="group in manfs_group">
                      <dt :data-key="group.py_first_letter">{{ group.py_first_letter }}</dt>
                      <dd>
                        <span v-for="manf in group.manf_brands" @click="handleSelectManf(manf.manf_id, manf.manf_name)">{{ manf.manf_name }}</span>
                      </dd>
                    </dl>
                  </div>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="DialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="DialogVisible = false">确 定</el-button>
                </span>
              </el-dialog>
            </dd>
          </dl>
          <dl>
            <dt>品牌：</dt>
            <dd>
              <span :class="{'on':''==selected_brand_name}" @click="changeBrand()">不限</span>
              <span v-for="brand in brands" :class="{'on':brand.brand_name==selected_brand_name}" @click="changeBrand(brand.brand_name)">{{brand.brand_name}}</span>
            </dd>
          </dl>
        </div>
      </bi-panel>
      <bi-panel :operating="false">
        <template slot="title">本品与竞品列表</template>
        <template slot="others">
          <span class="title-btn">
            <font @click="show_type = '1'" :class="{'on': show_type == '1'}">全部</font>
            <font @click="show_type = '2'" :class="{'on': show_type == '2'}">只显示本品</font>
            <font @click="show_type = '3'" :class="{'on': show_type == '3'}">只显示竞品</font>
          </span>
        </template>
        <div style="min-height: 300px" v-loading="loading"  element-loading-background="#fff">
          <div class="list" v-if="records>0">
            <div v-if="show_type == '1'">
              <h3>
                <span>本品车型</span>
                竞品车型
              </h3>
              <router-link :to="'/zhiku/sh/detail?sub_model_id='+sub_model.sub_model_id" target="_blank" v-for="sub_model in models" :key="sub_model.sub_model_id">
                <dl>
                  <dt>
                  <span  class="box">
                    <span><img :src="sub_model.sub_model_logo_url || 'static/images/nocar.png'" alt=""></span>
                    <cite>{{sub_model.sub_model_name}}</cite>
                  </span>
                  </dt>
                  <dd>
                    <span v-for="competitor in sub_model.competitors" :key="competitor.sub_model_id" class="box">
                      <span><img :src="competitor.sub_model_logo_url || 'static/images/nocar.png'" alt=""></span>
                      <cite>{{competitor.sub_model_name}}</cite>
                    </span>
                  </dd>
                </dl>
              </router-link>
            </div>
            <div v-else-if="show_type == '2'">
              <h3><span>本品车型</span></h3>
              <ul class="every-box">
                <li v-for="sub_model in models">
                  <router-link :to="'/zhiku/sh/detail?sub_model_id='+sub_model.sub_model_id" target="_blank" class="box">
                    <span><img :src="sub_model.sub_model_logo_url || 'static/images/nocar.png'" alt=""></span>
                    <cite>{{sub_model.sub_model_name}}</cite>
                  </router-link>
                </li>
              </ul>
            </div>
            <div v-else>
              <h3><span>竞品车型</span></h3>
              <ul class="every-box noclick">
                <li v-for="competitor in models">
                <span :key="competitor.sub_model_id" class="box">
                  <span><img :src="competitor.sub_model_logo_url || 'static/images/nocar.png'" alt=""></span>
                  <cite>{{competitor.sub_model_name}}</cite>
                </span>
                </li>
              </ul>
            </div>
            <div class="pagination-box">
              <el-pagination
                background
                layout="prev, pager, next"
                prev-text="上一页"
                next-text="下一页"
                @current-change="GET_COMMON_COMPETITORS"
                :current-page.sync="page"
                :page-size="page_size"
                :total="records">
              </el-pagination>
            </div>
          </div>
          <div class="search-result" v-else>
            <!-- 无结果 -->
            <temlate v-if="!loading">
              <bi-empty style="margin-bottom: 70px; margin-top: 40px;">
                <span slot="tips">亲爱的，暂无您要搜索的数据，如有需要，请联系客服人员。</span>
              </bi-empty>
            </temlate>
          </div>
        </div>
      </bi-panel>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import BiBar from '@index/components/bar.vue'
  import BiPanel from '@index/components/panel.vue'
  import BiEmpty from '@index/components/empty.vue'
  import mixin from '@index/config/mixin'
  import JQuery from 'jquery'

  export default {
    name: '',
    mixins: [mixin],
    data() {
      return {
        manfOnClass: false,
        manfNotClass: false,
        displayResult: 'all',
        DialogVisible: false,
        manfs_group: [],
        dialogVisible:false,
        loading: true,

        brands: [],
        raw_models: [],
        selected_manf_name: '',
        selected_brand_name: '',
        show_type: 1, //1:显示全部，2：只显示本品，3：只显示竞品
        page_size: 20,  //竞品数量
        page: 1,
        records: 0,

        letter_selected: {
          manfsBox: 'A',
        },
        manfs_static: [],
        manf_max: 8,
      }
    },
    mounted() {
      this.getToken(() => {
        this.GET_COMMON_MANFS_BRANDS()
        this.GET_COMMON_COMPETITORS()
        this.GET_COMMON_VALID_DATE()
      })
    },
    computed: {
      models() {
        let models = {}
        this.raw_models.map((model) => {
          models[model.sub_model_id] = model
        })
        return models
      },
      manfs_map_by_name() {
        var manfs_map_by_name = {}
        this.manfs_group.map(group => {
          group.manf_brands.map(manf => {
            manfs_map_by_name[manf.manf_name] = manf
          })
        })
        return manfs_map_by_name
      },
    },
    watch: {
      show_type() {
        this.page = 1
        this.GET_COMMON_COMPETITORS([this.selected_manf_name], [this.selected_brand_name])
      }
    },
    methods: {
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
      handleSelectManf(manf_id, manf_name) {
        this.changeManf(manf_name)
        this.DialogVisible = false
        let manf_max = this.manf_max
        let index = this.manfs_static.findIndex((item, index) => {
          return item.manf_name == manf_name
        })
        if (this.manfs_static.length == manf_max) {
          this.manfs_static.splice(this.manfs_static.length - 1, 1, {manf_id, manf_name})
        } else if (index == -1) {
          this.manfs_static.push({manf_id, manf_name})
        }
      },
      changeManf(manf_name = '') {
        this.selected_manf_name = manf_name
        this.selected_brand_name = ''
        this.page = 1
        this.GET_COMMON_COMPETITORS([this.selected_manf_name])
        if (!this.manfs_map_by_name[manf_name]) {
          this.brands = []
          return
        }
        this.brands = this.manfs_map_by_name[manf_name].brands || []
      },
      changeBrand(brand_name = '') {
        this.selected_brand_name = brand_name
        this.page = 1
        this.GET_COMMON_COMPETITORS([this.selected_manf_name], [this.selected_brand_name])
      },

      GET_COMMON_MANFS_BRANDS() {
        this.$request.get(this.$interface.GET_COMMON_MANFS_BRANDS, {
          header: {token: this.token}
        }, (response) => {
          this.manfs_group = response.data || []
          this.manfs_group.map(group => {
            group.manf_brands.map(manf => {
              if (this.manfs_static.length >= this.manf_max)return
              this.manfs_static.push({manf_id: manf.manf_id, manf_name: manf.manf_name})
            })
          })
        }, this.failure);
      },
      GET_COMMON_COMPETITORS(manf_names = [], brand_names = []) {
        this.$request.get(this.$interface.GET_COMMON_COMPETITORS, {
          header: {token: this.token},
          manf_names: manf_names.length > 0 ? manf_names.join(',') : '',
          brand_names: brand_names.length > 0 ? brand_names.join(',') : '',
          type: this.show_type,
          rows: this.page_size,
          page: this.page,
        }, (response) => {
          this.raw_models = []
          this.records = 0
          if (response.data.length <=0 )return
          this.raw_models = response.data[0].list;
          this.records = response.data[0].total
          this.loading = false;
        }, this.failure);
      },
      GET_COMMON_VALID_DATE() {
        this.$request.get(this.$interface.GET_COMMON_VALID_DATE, {
          header: {token: this.token}
        }, (response) => {
          this.part_date = response.data[0].part_date
          this.this_year_month = Math.max(...this.part_date) + ''
        }, this.failure);
      },
      isOpenDialogVisible(status){
        this.$emit('openTheDialog', status);
      }
    },
    components:{
      BiBar,
      BiPanel,
      BiEmpty
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
</style>
