<template>

	<div class="cyc-shouhou-main">
    <bi-bar columnTitle="数据下载" columnIcon="icon-calendar">

      <template slot="right">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">概览主页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/zhiku/sh' }">售后概况</el-breadcrumb-item>
          <el-breadcrumb-item> 数据下载</el-breadcrumb-item>
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
            <dd>
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
                  <el-button @click="centerDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
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
        <template slot="title">
          本品车型及竞品价格列表下载
        </template>
        <div class="result" v-if="searchData.length>0">
          <ul class="box" v-for="item in searchData">
            <li><img :src="item.cover" alt=""></li>
            <li>
              <h4>{{ item.title }}</h4>
              <h5>
                <el-tag size="mini">{{ item.extension }}</el-tag>
              </h5>
               <p>大小：{{ item.size | number_format(2) }}M  {{ item.contributor }} 于 {{ item.post_time }} 发布</p>
            </li>
            <li>
              <a href="javascript:void(0);" @click="download(item.id)">下载</a>
              <p>已下载：{{ item.download_count }}次</p>
            </li>
          </ul>
          <div v-if="searchRecords" class="pagination-box">
            <el-pagination
              background
              layout="prev, pager, next"
              prev-text="上一页"
              next-text="下一页"
              @current-change="GET_FILE_REPORT_LIST"
              :current-page.sync="page"
              :page-size="10"
              :total="searchRecords">
            </el-pagination>
          </div>
        </div>
        <div class="search-result" v-else style="min-height: 300px"  v-loading="loading">
          <!-- 无结果 -->
          <bi-empty v-if="!loading">
          </bi-empty>
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
        brands: [],
        raw_models: [],
        selected_manf_name: '',
        selected_brand_name: '',
        DialogVisible:false,
        searchData: [],
        page: 1,
        searchRecords: 0,

        manfs_group: [],
        letter_selected: {
          manfsBox: 'A',
        },
        manfs_static: [],
        manf_max: 8,
        loading: true,
      }
    },
    mounted() {
      this.getToken(() => {
        this.GET_COMMON_MANFS_BRANDS()
        this.GET_FILE_REPORT_LIST()
      })
    },
    computed: {
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
        let manf_max = 8
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
        this.GET_FILE_REPORT_LIST()
        if (!this.manfs_map_by_name[manf_name])return
        this.brands = this.manfs_map_by_name[manf_name].brands || []
      },
      changeBrand(brand_name = '') {
        this.selected_brand_name = brand_name
        this.GET_FILE_REPORT_LIST()
      },

      GET_COMMON_MANFS_BRANDS() {
        this.$request.get(this.$interface.GET_COMMON_MANFS_BRANDS, {
          header: {token: this.token}
        }, (response) => {
          this.manfs_group = response.data;
          this.manfs_group.map(group => {
            group.manf_brands.map(manf => {
              if (this.manfs_static.length >= this.manf_max)return
              this.manfs_static.push({manf_id: manf.manf_id, manf_name: manf.manf_name})
            })
          })
        }, this.failure);
      },
      GET_FILE_REPORT_LIST() {
        this.$request.get(this.$interface.GET_FILE_REPORT_LIST, {
          header: {token: this.token},
          manf_names: this.selected_manf_name,
          brand_names: this.selected_brand_name,
          // post_time: '',         //发布距离现在的时间,单位:月
          // formats: '',           //文件格式,不区分大小写
          // charge_type: '',       //收费类型:1免费,2收费
          type: '1',                //文件类别id
          page: this.page,
          rows: 10,
        }, (response) => {
          this.loading = false;
          var data = response.data[0] || {}
          this.searchData = data.list || []
          this.searchRecords = data.total || 0
        }, this.failure)
      },
      download(id) {
        this.$request.get(this.$interface.GET_REPORT_FILE, {
          header: {token: this.token},
          responseType: 'blob',
          id: id,                //文件id
        }, (response) => {
          let filename = this.getFileName(response.headers)
          this.downloadFile(response.data, filename)
        }, this.failure)
      },
      downloadFile (data, filename) {
        if (!data) {
          return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', filename || 'excel.xlsx')

        document.body.appendChild(link)
        link.click()
      },
      getFileName(headers) {
        if (!headers || !headers['content-disposition'])return
        let headerInfo = headers['content-disposition'].split(';')
        let filename = ''
        for (let x in headerInfo) {
          let item = headerInfo[x]
          item = item.trim().split('=')
          if (item.length == 2 && item[0] == 'filename*') {
            filename = item[1]
            break
          }
        }
        if (filename.indexOf("''") != -1) {
          return decodeURIComponent(filename.split("''")[1]) || ''
        }
        return
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
