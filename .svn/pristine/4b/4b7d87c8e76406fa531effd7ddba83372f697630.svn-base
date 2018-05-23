<template>
  <div>
    <bi-bar columnTitle="预警详情">
      <template slot="button">
        <span class="mgr20 mgl10">时间：{{ year_month }}</span>
        <span class="mgr20">管理维度：{{ dimension_name }}</span>
        <span class="mgr20">管理类型：{{ manage_type }}</span>
      </template>
      <template slot="right">
        <el-breadcrumb separator="/">
          <span class="bread-legend">当前位置：</span>
          <el-breadcrumb-item :to="{ path: '/' }">概览主页</el-breadcrumb-item>
          <el-breadcrumb-item> 销量目标管理</el-breadcrumb-item>
          <el-breadcrumb-item> 区域 - 监测预警</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
    </bi-bar>
    <div class="content cyc-xl-targetList">
      <template v-if="newstTarget">
        <bi-panel :operating="false">
          <div class="targetList-title"  slot="title">
            <template v-if="pageType === 'model'">
              <img v-if="title_model_img" :src="title_model_img" alt="">
              <img v-else src="/static/images/nocar.png" alt="">
              <p>{{ pageTitle.brand_name }} {{ pageTitle.model_name}}-区域目标详情</p>
            </template>
            <template v-else>
              <p>{{ pageTitle.area_name }} - 车型目标详情</p>
            </template>
          </div>
          <template slot="others">
            <span class="cyc-xl-title-tips" style="margin-top: 10px">
               <font>关联ID：{{ newstTarget['serial_number'] }}</font>
               <font>制定日期： {{ newstTarget['create_time'] }}</font>
            </span>
          </template>
          <div v-loading="loading['header']">
            <el-row class="detail" align="middle" justify="center">
              <el-col :span="6">
                <div class="grid-warning">
                  <!--<i class="iconfont icon-target"></i>-->
                  <h3>TY目标</h3>
                  <h2>
                    <font style="color: #339acd">{{ headerData.ty | number_format }} </font>
                  </h2>
                </div>
              </el-col>
              <el-col :span="6">
                <h3>MTD当月完成率</h3>
                <el-row>
                  <el-col :span="13">
                    <h2 style="color: #339acd">{{ headerData.mtd_sales | number_format }}</h2>
                    <p>（完成销量）</p>
                  </el-col>
                  <el-col :span="11">
                    <bi-progress type="circle" :precision="1" :percentage="[headerData.mtd_rate ? headerData.mtd_rate : -1]" color="#339acd" circle-width="46"></bi-progress>
                    <p>（当月完成率）</p>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="6">
                <h3>YTD完成目标进度</h3>
                <el-row>
                  <el-col :span="8">
                    <bi-progress
                      :precision="1"
                      type="circle"
                      :percentage="[headerData.ytd_target_rate ? headerData.ytd_target_rate : -1]"
                      color="#339acd"
                      circle-width="48">
                    </bi-progress>
                    <p>（目标进度）</p>
                  </el-col>
                  <el-col :span="8">
                    <bi-progress type="circle" :precision="1" :percentage="[headerData.ytd_this_year_rate? headerData.ytd_this_year_rate : -1]" color="#339acd" circle-width="48"></bi-progress>
                    <p>（当年完成率）</p>
                  </el-col>
                  <el-col :span="8">
                    <bi-progress type="circle" :precision="1" :percentage="[headerData.ytd_last_year_rate? headerData.ytd_last_year_rate : -1]" color="#339acd" circle-width="48"></bi-progress>
                    <p>（去年完成率）</p>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="6">
                <h3>YTD市场份额</h3>
                <span class="box"><bi-progress :precision="1" :percentage="[headerData.ytd_rate?headerData.ytd_rate:-1]" color="#339acd" height="16"></bi-progress></span>
                <h4>目标份额：{{  headerData.ytd_target_cr | multiply(100) | number_format(1) }} %</h4>
                <h4>差额：{{ headerData.ytd_balance | multiply(100) | number_format(1) }} %</h4>
              </el-col>
            </el-row>
          </div>
        </bi-panel>
        <bi-panel :operating="false">
          <template slot="title">请选择条件</template>
          <div class="cyc-xl-search" v-if="pageType == 'model'">
            <dl>
              <dt>区域：</dt>
              <dd>
                <span :class="[selected_area_id.length == 0 ? 'on': '']" @click="changeArea()">不限</span>
                <template v-for="area in areas['list']">
                  <span
                    :class="[selected_area_id.indexOf(area.id) > -1 ? 'on': '']"
                    @click="changeArea(area.id, area.name)">
                    {{ area.name}}
                  </span>
                </template>
              </dd>
            </dl>
          </div>
          <div class="cyc-xl-search" v-loading="loading['all']" v-else>
            <dl>
              <dt>品牌：</dt>
              <dd>
                <span class="on">{{ brand.name }}</span>
              </dd>
            </dl>
            <dl>
              <dt>车型：</dt>
              <dd>
                <span :class="{'on': selected_model_id.length == 0}" @click="changeModel()">不限</span>
                <template v-for="model in models" v-if="model.name">
                  <span
                    :class="[selected_model_id.indexOf(model.id) > -1 ? 'on': '']"
                    @click="changeModel(model.id, model.name)">
                    {{ model.name }}
                  </span>
                </template>
              </dd>
            </dl>
          </div>
        </bi-panel>
        <div style="min-height: 200px">
        <template v-for="(item, key) in forecast">
          <bi-panel :operating="false" >
            <template slot="title">
              <template v-if="pageType === 'model'">
                <router-link class="link" target="_blank" :to="{path:'detail',query:{type:'region',area_name:item.previous_level.name, area_id: item.previous_level.id,  dimension: 'PROVINCE'}}">
                  {{ item.previous_level.name}}
                </router-link>
              </template>
              <template v-else>
                <img class="cyc-xl-title-img" v-if="item.previous_level.logo_url" :alt="item.previous_level.name" :src="item.previous_level.logo_url">
                <img class="cyc-xl-title-img" v-else alt="" src="/static/images/nocar.png">
                <router-link class="link" target="_blank" :to="{path:'detail',query:{type:'model', brand_name: selected_brand_name, model_name: item.previous_level.name, model_id: item.previous_level.id}}">
                  {{ item.previous_level.name}}
                </router-link>
              </template>
            </template>
            <template slot="others">
              <span class="cyc-xl-title-tips" style="margin-top: 10px">
                 <font>关联ID：{{ newstTarget['serial_number'] }}</font>
                 <font>制定日期： {{ newstTarget['create_time'] }}</font>
              </span>
            </template>
            <table class="cyc-xl-table_vc">
              <thead>
              <tr>
                <th colspan="2" rowspan="2" width="22%">零售量</th>
                <th>YTD</th>
                <th>RTG</th>
                <th>TY</th>
                <th>Jan</th>
                <th>Feb</th>
                <th>Mar</th>
                <th>Apr</th>
                <th>May</th>
                <th>Jun</th>
                <th>Jul</th>
                <th>Aug</th>
                <th>Sep</th>
                <th>Oct</th>
                <th>Nov</th>
                <th>Dec</th>
              </tr>
              <tr>
                <th>实际</th>
                <th>预测</th>
                <th>-</th>
                <th v-for="(item2,key) in forecast[0].list.segment.flag">
                  {{ item2}}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>所属细分市场预测</td>
                <td width="4%">销量</td>
                <td>{{ item.list.segment.ytd | number_format }}</td>
                <td>{{ item.list.segment.rtg | number_format }}</td>
                <td>{{ item.list.segment.ty | number_format }}</td>
                <td v-for="(item2, key) in item.list.segment.month_forecast" :key="key">
                  {{ item2 | number_format }}
                </td>
              </tr>

              <tr>
                <td colspan="1" rowspan="2">目标销量</td>
                <td>销量</td>
                <td>{{ item.list.target_sales.ytd | number_format }}</td>
                <td>{{ item.list.target_sales.rtg | number_format }}</td>
                <td>{{ item.list.target_sales.ty | number_format }}</td>
                <td v-for="(item2, key) in item.list.target_sales.month_forecast" :key="key">
                  {{ item2 | number_format  }}
                </td>
              </tr>
              <tr>
                <td>份额</td>
                <td>{{ item.list.target_share.ytd | multiply(100) | number_format(1) }}%</td>
                <td>{{ item.list.target_share.rtg | multiply(100) | number_format(1) }}%</td>
                <td>{{ item.list.target_share.ty  | multiply(100) | number_format(1) }}%</td>
                <td v-for="(item2, key) in item.list.target_share.month_forecast" :key="key">
                  {{ item2 | multiply(100) | number_format(1) }}%
                </td>
              </tr>

              <tr>
                <td colspan="1" rowspan="2">最新市场预测（维持YTD份额）</td>
                <td>销量</td>
                <td>{{ item.list.keep_ytd_sales.ytd | number_format }}</td>
                <td>{{ item.list.keep_ytd_sales.rtg | number_format }}</td>
                <td>{{ item.list.keep_ytd_sales.ty | number_format }}</td>
                <td v-if="item.list.keep_ytd_sales.month_forecast == '' || item.list.keep_ytd_sales.month_forecast == 'null'"></td>
                <td
                  v-else
                  v-for="(item2, key) in item.list.keep_ytd_sales.month_forecast" :key="key">
                  {{ item2  | number_format}}
                </td>
              </tr>
              <tr>
                <td>份额</td>
                <td>{{ item.list.keep_ytd_share.ytd | multiply(100) | number_format(1) }}%</td>
                <td>{{ item.list.keep_ytd_share.rtg | multiply(100) | number_format(1) }}%</td>
                <td>{{ item.list.keep_ytd_share.ty | multiply(100) | number_format(1) }}%</td>
                <td v-for="(item2, key) in item.list.keep_ytd_share.month_forecast" :key="key">
                  {{ item2  | multiply(100) | number_format(1) }}%
                </td>
              </tr>

              <tr>
                <td colspan="1" rowspan="2">最新市场预测（维持RTG份额）</td>
                <td>销量</td>
                <td>{{ item.list.keep_rtg_sales.ytd | number_format }}</td>
                <td>{{ item.list.keep_rtg_sales.rtg | number_format }}</td>
                <td>{{ item.list.keep_rtg_sales.ty  | number_format}}</td>
                <td v-for="(item2, key) in item.list.keep_rtg_sales.month_forecast" :key="key">
                  {{ item2  | number_format}}
                </td>
              </tr>
              <tr>
                <td>份额</td>
                <td>{{ item.list.keep_rtg_share.ytd  | multiply(100) | number_format(1) }}%</td>
                <td>{{ item.list.keep_rtg_share.rtg | multiply(100) | number_format(1) }}%</td>
                <td>{{ item.list.keep_rtg_share.ty  | multiply(100) | number_format(1) }}%</td>
                <td v-for="(item2, key) in item.list.keep_rtg_share.month_forecast" :key="key">
                  {{ item2  | multiply(100) | number_format(1) }}%
                </td>
              </tr>

              <tr>
                <td colspan="1" rowspan="2">最新市场预测（维持TY份额）</td>
                <td>销量</td>
                <td>{{ item.list.keep_ty_sales.ytd | number_format}}</td>
                <td>{{ item.list.keep_ty_sales.rtg | number_format}}</td>
                <td>{{ item.list.keep_ty_sales.ty | number_format}}</td>
                <td v-for="(item2, key) in item.list.keep_ty_sales.month_forecast" :key="key">
                  {{ item2  | number_format}}
                </td>
              </tr>
              <tr>
                <td>份额</td>
                <td>{{ item.list.keep_ty_share.ytd | multiply(100) | number_format(1) }}%</td>
                <td>{{ item.list.keep_ty_share.rtg | multiply(100) | number_format(1) }}%</td>
                <td>{{ item.list.keep_ty_share.ty  | multiply(100) | number_format(1) }}%</td>
                <td v-for="(item2, key) in item.list.keep_ty_share.month_forecast" :key="key">
                  {{ item2  | multiply(100) | number_format(1) }}%
                </td>
              </tr>
              </tbody>
            </table>
          </bi-panel>
        </template>
      </div>
      </template>
      <template v-else>
        <bi-panel v-if="!loading['all']">
          <bi-empty style="margin: 100px auto">
            <span slot="tips">亲爱的，暂时没有相关数据，请先完成目标制定！如还有疑问，请联系客户管理员。</span>
          </bi-empty>
        </bi-panel>
      </template>
      <!--<span class="cyc-xl-btn">调整全国目标</span>-->
      <!--<span class="cyc-xl-btn_back">调整区域目标</span>-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BiBar from '@index/components/bar.vue'
  import BiPanel from '@index/components/panel.vue'
  import mixin from '@index/config/mixin'
  import BiEmpty from '@index/components/empty.vue'
  import BiProgress from '@index/components/progress.vue'
  import sales from './_mixin'

  export default {
    name: '',
    mixins: [mixin, sales],
    data() {
      return {
        loading: {
          all: true,
          header: true,
        },
        headerData: [],
        pageType:{},

        user_manage_type_id:'', //用户管理维度
        user_region_id:'', // 用户所属区域
        newstTarget: '',  //流水号
        dataTime: '',  //数据时间
        manageDimensionId: '', //用户所属区域ID
        manageDimension: 'REGION',  // 管理维度
        manageTypeId: '',  //管理类型ID
        brands: {}, // 展示的品牌数据
        models: [], // 展示的车型数据
        areas: [],  //  展示的地区数据
        forecast: [], //展示的预警数据
        allBrands: '', //所有品牌数据 ,
        allAreas: [],  // 所有的地区数据
        selected_brand_id:'', //选中的品牌ID
        selected_brand_name:'', //选中的品牌name
        selected_model_id:[], //选中的车型ID
        selected_area_id: [],  //选中的地区ID
        push_model: [], //提交条件（车型ID）
        push_area: [], //提交条件（地区ID）
        brand: {},
        title_model_img: ''
      }
    },
    computed:{
      pageTitle (){
        let object = {
          brand_name: this.$route.query.brand_name ? this.$route.query.brand_name : '',
          model_name: this.$route.query.model_name ? this.$route.query.model_name : '',
          area_name : this.$route.query.area_name  ? this.$route.query.area_name  : '',
          area_id : this.$route.query.area_id  ? this.$route.query.area_id  : ''
        }
        return object
      },
      selected_all_model () {
        let model_id = []
        for (let item in this.models){
          model_id.push(this.models[item])
        }
        return model_id
      },
      selected_all_area() {
        return this.areas['list']
      },
    },
    filters: {

    },
    mounted() {
      this.user_manage_type_id = this.manage_type_id
      this.user_region_id = this.dimension_id;
      this.pageType = this.$route.query.type

      this.getToken(() => {
        this.getNewstTarget()
      })
    },
    methods:{
      getMonthForecastHeader(condition) {
        this.$request.get(this.$interface.GET_MONTH_FORECAST_HEADER, {
          header: {token: this.token},
          serial_number: this.newstTarget['serial_number'] ? this.newstTarget['serial_number'] : '',
          ym: this.dataTime,
          ...condition
        }, (response) => {
          this.headerData = response.data[0] || []
          this.loading['header'] = false
        }, this.failure)
      },
      getDataTime() {
        this.$request.get(this.$interface.GET_DATA_TIME,{
          header: {token: this.token}
        }, (response) => {
          if (response.data.length <=0 )return
          this.dataTime = response.data[0]['end_time']
          this.getSubModel()
        }, this.failure)
      },
      getNewstTarget(){
        this.$request.get(this.$interface.GET_NEWST_TARGET,{
          header: {token: this.token},
          manage_dimension: 'REGION',
          region_id: this.user_region_id
        }, (response) => {
          this.newstTarget = response.data[0] || ''
          if (this.newstTarget){
            this.getDataTime()
          }else{
            this.loading['all'] = false
            this.loading['header'] = false
          }
        }, this.failure)
      },
      getSubModel () {
        this.$request.get(this.$interface.GET_SUB_MODEL, {
          header: {token: this.token},
          serial_number: this.newstTarget['serial_number'] ? this.newstTarget['serial_number'] : ''
        }, (response) => {
          this.allBrands =  response.data || []
          this.getRegion()
        }, this.failure)
      },
      getRegion() {
        this.$request.get(this.$interface.GET_REGION, {
          header: {token: this.token},
          serial_number: this.newstTarget['serial_number'] ? this.newstTarget['serial_number'] : ''
        }, (response) => {
          this.allRegions = response.data || []
          this.initData()
        }, this.failure)
      },
      getMonthForecast(conditions, level){
        this.loading['all'] = true
        this.$request.get(this.$interface.GET_MONTH_FORECAST, {
          header: {token: this.token},
          manage_dimension: this.manageDimension,
          ym: this.dataTime,
          serial_number: this.newstTarget['serial_number'] ? this.newstTarget['serial_number'] : '',
          ...conditions
        }, (response) => {
          this.resForecastData = response.data || []
          if (this.pageType === 'model') {
            let forecast = {}
            for (let key in response.data) {
              forecast['list'] = response.data[key]
            }
            forecast['previous_level'] = {id: level.id, name: level.name}
            this.forecast.push(forecast)
          }else{
            let forecast = {}
            for (let key in response.data) {
              forecast['list'] = response.data[key]
            }
            forecast['previous_level'] = {id: level.id, name: level.name, logo_url: level.logo_url}
            this.forecast.push(forecast)
          }
          this.loading['all'] = false
        }, this.failure)
      },
      changeArea (area_id = '', area_name) {
        if (area_id == ''){
          this.selected_area_id = []
          this.push_area = this.selected_all_area
        }else{
          if (this.selected_area_id.length == 0) this.push_area = []
          let index = this.selected_area_id.indexOf(area_id)
          index > -1 ? this.selected_area_id.splice(index, 1) : this.selected_area_id.push(area_id)
          if(this.selected_area_id.length == 0) {
            this.push_area = this.selected_all_area
          }else{
            this.push_area = []
            for (let item in this.selected_area_id){
              for (let item2 in this.areas['list']) {
                if (this.selected_area_id[item] == this.areas['list'][item2]['id']){
                  this.push_area.push(this.areas['list'][item2])
                }
              }
            }
          }
        }
        this.transferGetMonthForecast(this.push_area)
      },
      changeModel (model_id = '', model_name) {
        if (model_id == ''){
          this.selected_model_id = []
          this.push_model = this.selected_all_model
        }else{
          if(this.selected_model_id.length == 0) this.push_model = []
          let index = this.selected_model_id.indexOf(model_id)
          index > -1 ? this.selected_model_id.splice(index, 1) : this.selected_model_id.push(model_id)
          if(this.selected_model_id.length == 0) {
            this.push_model = this.selected_all_model
          }else{
            this.push_model = []
            for (let item in this.selected_model_id){
              for (let item2 in this.models) {
                if (this.selected_model_id[item] == this.models[item2]['id']){
                  this.push_model.push(this.models[item2])
                }
              }
            }
          }
        }
        this.transferGetMonthForecast(this.push_model)
      },
      transferGetMonthForecast(model){
        if (this.pageType === 'model'){
          this.manageDimension = 'PROVINCE'
          this.forecast = []
          for (let item in model) {
            this.getMonthForecast({region_id: model[item]['id'], sub_model_id: this.$route.query.model_id}, model[item])
          }
        }else{
          this.forecast = []
          this.manageDimension = this.$route.query.dimension ? this.$route.query.dimension : 'REGION'
          for (let item in model) {
            this.getMonthForecast({sub_model_id: model[item]['id'],  region_id: this.pageTitle.area_id}, model[item])
          }
        }
      },
      initData (){
        this.areas = []
        //过滤数据...
        for (let item in this.allRegions) {
          if (this.allRegions[item]['previous_level']['id'] == this.user_region_id) {
            this.areas = this.allRegions[item]
          }
        }
        for (let item in this.allBrands) {
          if (this.areas['previous_level']['name'].indexOf(this.allBrands[item]['previous_level']['name']) > -1){
            this.brands =  this.allBrands[item]
          }
        }
       if (this.pageType === 'model'){
         this.brands.list.every( item =>{
           if (item.id == this.$route.query.model_id){
             this.title_model_img =  item.logo_url
             return false
           }
           return true
         })

         this.brand = this.brands['previous_level']
         //获取当前选中的条件
         this.selected_area_id = []
         //获取当前需要提交的条件
         this.push_area = this.selected_all_area
         this.transferGetMonthForecast(this.push_area)
         this.getMonthForecastHeader({
           sub_model_id: this.$route.query.model_id,
           manage_dimension: 'REGION',
           region_id: this.user_region_id
         })
       }else{
         this.brand = this.brands['previous_level']
         this.models = this.brands['list']
         //获取当前选中的条件
         this.selected_brand_id = this.brands.previous_level.id
         this.selected_brand_name = this.brands.previous_level.name
         this.selected_model_id = []
         //获取当前需要提交的条件
         if (this.$route.query.model_id){
           this.changeModel(parseInt(this.$route.query.model_id))
         }else{
           this.push_model = this.selected_all_model
           this.transferGetMonthForecast(this.push_model)
         }
         this.getMonthForecastHeader({
           manage_dimension: 'PROVINCE',
           region_id: this.$route.query.area_id,
           manage_type_id:1,
           brand_id: this.selected_brand_id
         })
       }
      }
    },
    components:{
      BiBar,BiPanel,BiEmpty,BiProgress
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>

</style>
