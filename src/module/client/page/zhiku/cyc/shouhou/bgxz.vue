<template>

  <div class="cyc-shouhou-main">
    <bi-bar columnTitle="报告下载" columnIcon="icon-calendar">
      <template slot="right">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">概览主页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/zhiku/sh' }">售后概况</el-breadcrumb-item>
          <el-breadcrumb-item> 报告下载</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
    </bi-bar>
    <div class="content">
      <bi-panel :operating="false">
        <template slot="title">
          请选择筛选条件
        </template>
        <div class="condition">
          <dl>
            <dt>时间：</dt>
            <dd>
              <span :class="{'on':post_time==''}" @click="changeCondition('post_time', '')">不限</span>
              <span v-for="item in conditions['post_time']" :class="{'on':post_time==item.value}" :key="item.value" @click="changeCondition('post_time', item.value)">{{item.label}}</span>
            </dd>
          </dl>
          <dl>
            <dt>格式：</dt>
            <dd>
              <span :class="{'on':extensions==''}" @click="changeCondition('extensions', '')">不限</span>
              <span v-for="item in conditions['extensions']" :class="{'on':extensions==item.value}" :key="item.value" @click="changeCondition('extensions', item.value)">{{item.label}}</span>
            </dd>
          </dl>
          <dl>
            <dt>类型：</dt>
            <dd>
              <span :class="{'on':charge_type==''}" @click="changeCondition('charge_type', '')">不限</span>
              <span v-for="item in conditions['charge_type']" :class="{'on':charge_type==item.value}" :key="item.value" @click="changeCondition('charge_type', item.value)">{{item.label}}</span>
            </dd>
          </dl>
        </div>
      </bi-panel>

      <bi-panel :operating="false">
        <template slot="title">
          报告列表
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

  export default {
    name: '',
    mixins: [mixin],
    data() {
      return {
        conditions: {
          post_time: [
            {value: '6', label:'半年内'},
            {value: '12', label:'一年内'},
            {value: '36', label:'三年内'},
          ],
          extensions: [
            {value: 'XLS,XLSX', label:'XLS'},
            {value: 'DOC,DOCX', label:'DOC'},
            {value: 'PPT,PPTX', label:'PPT'},
            {value: 'PDF', label:'PDF'},
          ],
          charge_type: [
            {value: '1', label:'免费'},
            {value: '2', label:'收费'},
          ],
        },
        post_time: '',
        extensions: '',
        charge_type: '',
        searchData: [],
        page: 1,
        searchRecords: 0,
        loading: true,
      }
    },
    mounted() {
      this.getToken(() => {
        this.GET_FILE_REPORT_LIST()
      })
    },
    methods: {
      changeCondition(field, value) {
        if (this[field] != undefined) {
          this[field] = value
          this.GET_FILE_REPORT_LIST()
        }
      },
      GET_FILE_REPORT_LIST() {
        this.$request.get(this.$interface.GET_FILE_REPORT_LIST, {
          header: {token: this.token},
          // manf_names: this.selected_manf_name,
          // brand_names: this.selected_brand_name,
          post_time: this.post_time,         //发布距离现在的时间,单位:月
          extensions: this.extensions,           //文件格式,不区分大小写
          charge_type: this.charge_type,       //收费类型:1免费,2收费
          type: '2',             //文件类别id
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
