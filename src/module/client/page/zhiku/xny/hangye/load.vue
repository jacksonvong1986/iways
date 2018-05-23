<template>

  <div class="nerhy-load-data">
    <bi-bar columnTitle="报告下载" columnIcon="icon-bingtu">
      <template slot="right">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">概览主页</el-breadcrumb-item>
          <el-breadcrumb-item> 行业动态</el-breadcrumb-item>
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
            <dt>格式：</dt>
            <dd>
              <span class="on">不限</span>
              <span>XLS</span>
              <span>DOC</span>
              <span>PPT</span>
              <span>PDF</span>
            </dd>
          </dl>
          <dl>
            <dt>类型：</dt>
            <dd>
              <span class="on">不限</span>
              <span>免费</span>
              <span>收费</span>
            </dd>
          </dl>
        </div>
      </bi-panel>

      <bi-panel :operating="false">
        <template slot="title">
          报告下载
        </template>
        <div class="result">
          <ul class="box" v-for="(item, key) in report" :key="key">
            <li><img :src="item.img" alt=""></li>
            <li>
              <h4>{{ item.title }}</h4>
              <h5>
                <!--<el-tag size="mini">XLS</el-tag>-->
                <!--<el-tag size="mini">DOC</el-tag>-->
                <el-tag size="mini">PPT</el-tag>
                <!--<el-tag size="mini">PDF</el-tag>-->
              </h5>
              <p>大小：{{ item.size}}  {{ item.author }} 于 {{ item.time}} 发布</p>
            </li>
            <li>
              <a :href="item.url" :download="item.title">下载</a>
            </li>
          </ul>
          <!--<span class="more">加载更多 <i class="iconfont icon-unfold"></i></span>-->
        </div>
      </bi-panel>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import BiBar from '@index/components/bar.vue'
  import BiPanel from '@index/components/panel.vue'


  export default {
    name: '',
    data() {
      return {
        // 临时数据
        report:[
          {
            title: '新能源汽车行业月报-201701', size: '13.7MB', time: '2018-3-6 14:05',
            author: '惠康', url: '/static/report/新能源汽车行业月报-201701.pptx',
            img:'/static/report/images/img1.jpg'
          },
          {
            title: '新能源汽车行业月报-201702', size: '14.5MB', time: '2018-3-6 14:05',
            author: '惠康', url: '/static/report/新能源汽车行业月报-201702.pptx',
            img:'/static/report/images/img2.jpg'
          },
          {
            title: '新能源汽车行业月报-201703', size: '14.6MB', time: '2018-3-6 14:05',
            author: '惠康', url: '/static/report/新能源汽车行业月报-201703.pptx',
            img:'/static/report/images/img3.jpg'
          },
          {
            title: '新能源汽车行业月报-201704', size: '11.2MB', time: '2018-3-6 14:05',
            author: '惠康', url: '/static/report/新能源汽车行业月报-201704.pptx',
            img:'/static/report/images/img4.jpg'
          },
          {
            title: '新能源汽车行业月报-201705', size: '17.0MB', time: '2018-3-6 14:05',
            author: '惠康', url: '/static/report/新能源汽车行业月报-201705.pptx',
            img:'/static/report/images/img5.jpg'
          },
          {
            title: '新能源汽车行业月报-201706', size: '12.7MB', time: '2018-3-6 14:05',
            author: '惠康', url: '/static/report/新能源汽车行业月报-201706.pptx',
            img:'/static/report/images/img6.jpg'
          },
          {
            title: '新能源汽车行业月报-201707', size: '15.5MB', time: '2018-3-6 14:05',
            author: '惠康', url: '/static/report/新能源汽车行业月报-201707.pptx',
            img:'/static/report/images/img7.jpg'
          },
          {
            title: '新能源汽车行业月报-201708', size: '15.1MB', time: '2018-3-6 14:05',
            author: '惠康', url: '/static/report/新能源汽车行业月报-201708.pptx',
            img:'/static/report/images/img8.jpg'
          },
          {
            title: '新能源汽车行业月报-201709', size: '12.5MB', time: '2018-3-6 14:05',
            author: '惠康', url: '/static/report/新能源汽车行业月报-201709.pptx',
            img:'/static/report/images/img9.jpg'
          },
          {
            title: '新能源汽车行业月报-201710', size: '16.7MB', time: '2018-3-6 14:05',
            author: '惠康', url: '/static/report/新能源汽车行业月报-201710.pptx',
            img:'/static/report/images/img10.jpg'
          },
          {
            title: '新能源汽车行业月报-201711', size: '15.5MB', time: '2018-3-6 14:05',
            author: '惠康', url: '/static/report/新能源汽车行业月报-201711.pptx',
            img:'/static/report/images/img11.jpg'
          },
          {
            title: '新能源汽车行业月报-201712', size: '17.8MB', time: '2018-3-6 14:05',
            author: '惠康', url: '/static/report/新能源汽车行业月报-201712.pptx',
            img:'/static/report/images/img12.jpg'
          }
        ]
      }
    },
    components:{
      BiBar,
      BiPanel,
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>

</style>
