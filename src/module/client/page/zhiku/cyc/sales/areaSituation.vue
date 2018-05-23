<template>
	<div v-loading="loading" style="min-height: 400px">
    <bi-bar columnTitle="概况">
      <template slot="button">
        <span class="mgr20 mgl10">时间：{{ year_month }}</span>
        <span class="mgr20 cyc-xl-column">
          管理维度：{{ dimension_name }}<!--
          <el-cascader
            size="mini"
            class="change-data-button"
            popper-class="cyc-xl-column_cascader"
            :options="options"
            v-model="selectedOptions">
          </el-cascader> -->
        </span>
        <span class="mgr20">管理类型：{{ manage_type }}</span>
      </template>
      <template slot="right">
        <el-breadcrumb separator="/">
          <span class="bread-legend">当前位置：</span>
          <el-breadcrumb-item :to="{ path: '/' }">概览主页</el-breadcrumb-item>
          <el-breadcrumb-item> 销量目标管理</el-breadcrumb-item>
          <el-breadcrumb-item> 区域 - 概况</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
    </bi-bar>
    <div class="content cyc-xl-target">
      <el-row :gutter="20">
        <el-col :span="12">
          <bi-panel :operating="false" titleSize="small">
            <template slot="title">
              我收到的目标制定信息
            </template>
            <ul class="grid-target type2" v-if="target_list_get.length > 0">
              <li v-for="(item, key) in target_list_get">
                <p>
                  <router-link :to="{path: 'target/detail', query: {serial_number: item.serial_number}}" :title="item.name">
                    {{ item.name }}
                  </router-link>
                  <el-badge v-if="key==0" value="new" class="grid-target-badge"></el-badge>
                </p>
                <font v-if="item.author">
                  {{ item.author.username }} {{ item.author.role_name }}
                  <cite>{{ item.create_time | date_format('YYYY-MM-DD') }}</cite>
                </font>
              </li>
            </ul>
            <template v-else>
              <bi-empty v-if="!loading">
                <span slot="tips">  </span>
              </bi-empty>
            </template>
          </bi-panel>
        </el-col>
        <el-col :span="12">
          <bi-panel :operating="false" titleSize="small">
            <template slot="title">
              我制定的目标信息
            </template>
            <ul class="grid-target type2" v-if="target_list_push.length > 0">
              <li v-for="(item,key) in target_list_push">
                <p>
                  <router-link :to="{path: 'target/detail', query: {serial_number: item.serial_number}}" :title="item.name">
                    {{ item.name }}
                  </router-link>
                  <el-badge v-if="key==0" value="new" class="grid-target-badge"></el-badge>
                </p>
                <font v-if="item.author">
                  {{ item.author.username }} {{ item.author.role_name }}
                  <cite>{{ item.create_time | date_format('YYYY-MM-DD') }}</cite>
                </font>
              </li>
            </ul>
            <template v-else>
              <bi-empty v-if="!loading">
                <span slot="tips">  </span>
              </bi-empty>
            </template>
          </bi-panel>
        </el-col>
      </el-row>

      <bi-panel v-if="serial_number" :operating="false" titleSize="small">
        <template slot="title">
          预警信息
        </template>
        <template slot="others">
          <router-link v-if="map_area == 2" to="alarm" class="edit-btn">查看全区<i class="iconfont icon-right" style="font-size: 14px; top: 0; margin-left: 8px"></i></router-link>
        </template>
        <el-container>
          <el-aside width="180px" class="warning-left">
            <el-dropdown trigger="click" @command="changeBrand">
              <div class="el-dropdown-link">
                {{brand_name}}<i class="el-icon-arrow-down el-icon--right"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in brands" :command="item.id" :key="item.id">{{ item.name }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="car-box">
              <ul>
                <li v-for="(item, key) in sub_models" @click="selectSubmodel(item.id)" :class="{'on': selected_models[item.id]}"><img :src="item.logo_url&&item.logo_url.indexOf('http') == 0 ? item.logo_url : '/static/images/nocar-nbg.png'" alt=""><span>{{ item.name }}</span></li>
              </ul>
            </div>
          </el-aside>
          <el-main>
            <div class="warning-top">
              <el-row>
                <el-col :span="6">
                  <div class="grid-warning">
                    <h2>TY目标</h2>
                    <h3>
                      <template v-if="overview_info.ty">{{overview_info.ty | number_format}}</template>
                      <template v-else>暂无数据</template>
                    </h3>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-warning-right">
                    <h2>MTD当月完成率 </h2>
                    <span class="progress-box">
                      <bi-progress
                        :percentage="[overview_info.mtd_cr ? overview_info.mtd_cr : -1]"
                        :precision="1"
                        color="#339acd"
                        height="12" >
                      </bi-progress>
                    </span>
                    <p :title="[overview_info.mtd_sales ? ('完成销量：' + overview_info.mtd_sales) : '完成销量：暂无数据']">
                      完成销量：
                      <font style="color: #339acd" v-if="overview_info.mtd_sales">{{overview_info.mtd_sales | number_format}}</font>
                      <font style="color: #339acd" v-else>暂无数据</font>
                    </p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-warning-right">
                    <h2>YTD完成目标进度</h2>
                    <span class="progress-box">
                      <bi-progress
                        :percentage="[overview_info.ytd_target_progress ? overview_info.ytd_target_progress : -1]"
                        :precision="1"
                        color="#339acd"
                        height="12" >
                      </bi-progress>
                    </span>
                    <p :title="[overview_info.ytd_cr ? ('YTD全年完成率：' + (overview_info.ytd_cr * 100).toFixed(1) + '%') : 'YTD全年完成率：暂无数据']">
                      YTD全年完成率：
                      <font style="color: #339acd" v-if="overview_info.ytd_cr">{{ overview_info.ytd_cr | multiply(100) | number_format(1) }}%</font>
                      <font style="color: #339acd" v-else>暂无数据</font>
                    </p>
                    <p
                      :title="[overview_info.ytd_last_year_cr ? ('去年YTD全年完成率：' + (overview_info.ytd_last_year_cr * 100).toFixed(1) + '%') : '去年YTD全年完成率：暂无数据']">
                      去年YTD全年完成率：
                      <font style="color: #339acd" v-if="overview_info.ytd_last_year_cr">{{ overview_info.ytd_last_year_cr | multiply(100) | number_format(1) }}%</font>
                      <font style="color: #339acd" v-else>暂无数据</font>
                    </p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-warning-right">
                    <h2>YTD市场份额</h2>
                    <span class="progress-box">
                      <bi-progress
                        :percentage="[overview_info.ytd_share ? overview_info.ytd_share : -1]"
                        :precision="1"
                        color="#339acd"
                        height="12">
                      </bi-progress>
                    </span>
                    <p :title="[overview_info.ytd_target_share ? ('目标份额：' + (overview_info.ytd_target_share * 100).toFixed(1) + '%') : '目标份额：暂无数据']">
                      目标份额：
                      <font style="color: #339acd" v-if="overview_info.ytd_target_share">{{ overview_info.ytd_target_share | multiply(100) | number_format(1) }}%</font>
                      <font style="color: #339acd" v-else>暂无数据</font>
                    </p>
                    <p :title="[overview_info.ytd_share_diff ? ('差额：' + (overview_info.ytd_share_diff * 100).toFixed(1) + '%') : '差额：暂无数据']">
                      差额：
                      <font style="color: #339acd" v-if="overview_info.ytd_share_diff">{{ overview_info.ytd_share_diff | multiply(100) | number_format(1) }}%</font>
                      <font style="color: #339acd" v-else>暂无数据</font>
                    </p>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="warning-center">
              <!--<div class="menu-second-zoom" v-if="complete2"  @click="areaPart=!areaPart"><i style="font-size: 16px;" :class="['iconfont', areaPart ? 'icon-right' : 'icon-back']"></i></div>-->
              <span v-show="map_area == 3" @click="backToRegion()" class="back-btn btn-plain">
                <i class="iconfont icon-icon&#45;&#45;"></i> 返回区域
              </span>
              <div v-show="map_area == 2" id="areaChart" style="width: 100%; height: 500px"></div>
              <div v-show="map_area == 3" id="provinceChart" style="width: 100%; height: 500px"></div>
            </div>
          </el-main>
          <transition name="el-fade-in-linear">
            <el-aside width="190px" v-show="map_area == 2" class="warning-right">
              <div class="car-box" v-if="overview_children_page.length">
                <ul>
                  <li v-for="item in overview_children_page">
                    <router-link class="box" target="_blank" :to="{path: '/zhiku/xl/area/alarm/detail', query: {type: 'province', area_name: item.metadata.name, area_id: item.metadata.id, model_id:sub_model_id, dimension: 'PROVINCE'}}">
                      <h3><router-link target="_blank" :to="{path: '/zhiku/xl/area/alarm/detail', query: {type: 'province', area_name: item.metadata.name, area_id: item.metadata.id, model_id:sub_model_id, dimension: 'PROVINCE'}}">{{ item.metadata.name }}</router-link></h3>
                      <p>TY目标：<span>{{ item.ty | number_format }}</span></p>
                      <p>MTD：<span>{{ item.mtd_sales | number_format }}</span></p>
                      <p>YTD完成进度：<span>{{ item.ytd_target_progress | multiply(100) | number_format(1) }}%</span></p>
                      <p>YTD市场份额：<span>{{ item.ytd_share | multiply(100) | number_format(1) }}%</span></p>
                    </router-link>
                  </li>
                </ul>
              </div>
              <bi-empty v-else-if="complete2" :show-result="false">
                <span slot="tips">暂无数据</span>
              </bi-empty>
            </el-aside>
          </transition>
        </el-container>
      </bi-panel>
      <bi-panel v-else>
        <bi-empty style="margin: 100px auto" v-if="!loading">
          <span slot="tips">亲爱的，暂时没有相关数据，请先完成目标制定！如还有疑问，请联系客户管理员。</span>
        </bi-empty>
      </bi-panel>
    </div>
	</div>

</template>

<script type="text/ecmascript-6">
  import BiBar from '@index/components/bar.vue'
  import BiPanel from '@index/components/panel.vue'
  import BiProgress from '@index/components/progress'
  import BiEmpty from '@index/components/empty.vue'
  import echarts from 'echarts'
  import map from 'echarts/map/json/china';
  import mixin from '@index/config/mixin'
  import sales from './_mixin'

  export default {
    name: '',
    mixins: [mixin, sales],
    data() {
      return {
        options: [{
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
        }],

        isSelected:[],
        areaPart:true,
        region_name: this.$route.query.area || "华南",//地区名称
        areaArray: [],//地区包含的城市
        areaMap: [],//地区所包含城市的json
        province_map: {
          "北京": ['北京市'],
          "辽宁": ['辽宁省'],
          "湖北": ['湖北省'],
          "重庆": ['重庆市'],
          "河南": ['河南省'],
          "湖南": ['湖南省'],
          "河北": ['河北省'],
          "山西": ['山西省'],
          "广东": ['广东省'],
          "浙江": ['浙江省'],
          "安徽": ['安徽省'],
          "江苏": ['江苏省'],
          "上海": ['上海市'],
          "黑龙江": ['黑龙江省'],
          "天津": ['天津市'],
          "云南": ['云南省'],
          "新疆": ['新疆维吾尔族自治区', '新疆维吾尔自治区'],
          "江西": ['江西省'],
          "广西": ['广西壮族自治区'],
          "甘肃": ['甘肃省'],
          "内蒙古": ['内蒙古自治区'],
          "陕西": ['陕西省'],
          "吉林": ['吉林省'],
          "山东": ['山东省'],
          "福建": ['福建省'],
          "贵州": ['贵州省'],
          "青海": ['青海省'],
          "西藏": ['西藏自治区'],
          "四川": ['四川省'],
          "宁夏": ['宁夏回族自治区'],
          "海南": ['海南省'],
          "台湾": ['台湾省'],
          "香港": ['香港'],
          "澳门": ['澳门'],
          "南海诸岛": ['南海诸岛'],
        },
        target_list: [],
        total_page: 0,
        regions: [],
        colored_by_range: [
          {color: "#99cc00", range: [1, 'max']},
          {color: "#ff9900", range: [0.8, 1]},
          {color: "#e55353", range: [0, 0.8]},
        ],
        user_manage_type_id:'',
        brands: [],
        brand_id: '',
        brand_name: '',
        brands_models:[],
        complete: false,
        complete2: false,
        map_area: 2,
        overview_info: {},
        overview_children: [],
        page_size: 5,
        page: 1,
        province_id: '',
        province_name: '',
        region_id: '',
        sub_model_id: '',
        serial_number: '',
        selected_models: {},
        target_list_get: [],
        target_list_push: [],
        loading: true,
      }
    },
    watch: {
      brands_models() {
        this.brands = this.brands_models.map( item => {
          return item.previous_level
        })
        if (!this.brand_id && this.brands.length) {
          this.brand_id = this.brands[0].id
          this.brand_name = this.brands[0].name
        }
      },
      regions() {
        let region = this.regions.find( item => {
          return item.previous_level.id == this.region_id
        })
        this.region_name = region.previous_level.name
      }
    },
    computed: {
      overview_children_page() {
        // return this.getListData(this.overview_children)
        return this.overview_children
      },
      sub_models() {
        let sub_models = this.brands_models.filter( item => {
          let id = item.previous_level.id
          return id == this.brand_id
        })
        return sub_models.length ? sub_models[0].list : []
      },
      region_valid() {
        let region_ids = this.overview_children.map( item => {
          return item.metadata.id
        })
        let regions = this.regions.filter( item => {
          for (let item2 in item['list']){
            return region_ids.includes(item['list'][item2]['id'])
          }
        })
        return regions
      },
      region_groups() {
        let region_groups = []
          , province_map = this.province_map
        this.region_valid.map( item => {
          let region_id = item.previous_level.id
            , region_name = item.previous_level.name
          item.list.map( item2 => {
            let name = ''
            , id = ''
            for (let key in province_map) {
              let values = province_map[key]
              if (values.includes(item2.name)) {
                name = key
              }
            }
            name = name || item2.name
            id = id || item2.id
            region_groups.push({
              "name": name,
              "regions": region_name,
              "value": 1,
              "id": id
            })
          })
        })
        return region_groups
      },
      province_groups() {
        let province_groups = []
        , province_map = this.province_map

        let id = this.province_id
        , name = this.province_name

        for (let key in province_map) {
          let values = province_map[key]
          if (values.includes(name)) {
            name = key
          }
        }
        province_groups.push({
          "name": name,
          "value": 1,
          "id": id
        })

        return province_groups
      },
      provinceColor() {
        let colored_by_range = this.colored_by_range
        , province_map = this.province_map
        let overview = this.overview_children
        if (this.map_area == 3) {
          overview = [this.overview_info]
        }
        return overview.map( (item, key) => {
          let row = colored_by_range.find( row => {
            let value = item.ytd_cr
            return value >= row.range[0] && (row.range[1] == 'max' ? true : value < row.range[1])
          })
          let name = ''
          for (let key in province_map) {
            let values = province_map[key]
            if (values.includes(item.metadata.name)) {
              name = key
            }
          }
          return {name: name, color: row.color || ''}
        })
      }
    },
    mounted(){
      this.user_manage_type_id = this.dimension.manage_type_id
      this.region_id = this.dimension.object_id;
      this.brand_id = 15
      this.brand_name = '别克'
      this.GET_REGION()
      this.GET_TARGET_LOG_PAGE()
      this.GET_TARGET_LOG_PUSH()
      this.GET_NEWST_TARGET(() => {
        this.GET_SUB_MODEL()
        this.getData()
      })
    },
    methods:{
      selectSubmodel(key){
        this.sub_model_id = key
        this.selected_models = {}
        this.sub_models.map( item => {
          if (item.id == key) {
            this.selected_models[item.id] = true
          } else {
            this.selected_models[item.id] = false
          }
        })
        this.getData()
      },
      selectCar(key){
        this.isSelected = [];
        for (let i = 0; i < this.carData.length; i++){
          key == i ? this.isSelected.push(true) : this.isSelected.push(false);
        }
      },
      changeBrand(brand_id) {
        let brand = this.brands.find(item => {
          return item.id == brand_id
        })
        if (!brand)return
        this.brand_id = brand.id
        this.brand_name = brand.name
        this.getData()
      },
      initChart(){
        let _this = this;
        let chartObject = document.getElementById('areaChart')
        if (!chartObject)return
        let myChart = echarts.init(chartObject)
        let option = {
          geo: {
            map: this.region_name,
            roam: false,
            itemStyle: {
              normal: {
                borderColor: '#fff'
              }
            }
          },
          series: [
            {
              type: 'map',
              geoIndex: 0,
              itemStyle: {
                normal: {
                  color: function(params) {
                    var province = _this.provinceColor.find(item => { return item.name == params.data.name })
                    var color = province ? province.color : ''
                    return color;
                  }
                }
              },
              data: this.region_groups
            }]
        };

        myChart.on('mouseover', function(params){
          let province = params.data.name;
          _this.region_groups.forEach(function(currentValue, index, arr){
            if(province == currentValue.name){
              myChart.dispatchAction({
                type: 'highlight',
                name: currentValue.name
              });
            }
          })
        })

        myChart.on('mouseout', function(params){
          let province = params.data.name;
          _this.region_groups.forEach(function(currentValue, index, arr){
            if(province == currentValue.name){
              myChart.dispatchAction({
                type: 'downplay',
                name: currentValue.name
              });
            }
          })
        })

        myChart.on('click', function(params){
          _this.province_id = params.data.id;
          _this.province_name = params.data.name;
          _this.map_area = 3
          _this.GET_NEWST_TARGET(() => {
            _this.GET_SUB_MODEL()
            _this.getData()
          })
        })
        myChart.setOption(option);

      },
      initChart2(){
        let _this = this;
        let chartObject = document.getElementById('provinceChart')
        if (!chartObject)return
        let myChart = echarts.init(chartObject)
        let option = {
          geo: {
            map: this.province_name,
            roam: false,
            itemStyle: {
              normal: {
                borderColor: '#fff'
              }
            }
          },
          series: [
            {
              type: 'map',
              geoIndex: 0,
              itemStyle: {
                normal: {
                  color: function(params) {
                    var province = _this.provinceColor.find(item => { return item.name == params.data.name })
                    var color = province ? province.color : ''
                    return color;
                  }
                }
              },
              data: this.province_groups
            }]
        };

        myChart.on('mouseover', function(params){
          let province = params.data.name;
          _this.region_groups.forEach(function(currentValue, index, arr){
            if(province == currentValue.name){
              myChart.dispatchAction({
                type: 'highlight',
                name: currentValue.name
              });
            }
          })
        })

        myChart.on('mouseout', function(params){
          let province = params.data.name;
          _this.region_groups.forEach(function(currentValue, index, arr){
            if(province == currentValue.name){
              myChart.dispatchAction({
                type: 'downplay',
                name: currentValue.name
              });
            }
          })
        })

        myChart.on('click', function(params){
        })

        myChart.setOption(option);

      },
      GET_TARGET_LOG_PAGE(){
        this.$request.get(this.$interface.GET_TARGET_LOG_PAGE, {
          header: {token: this.token},
          manage_dimension: 'NATIONAL',
          page: 1,
          rows: 3,
        }, (response) => {
          let data = response.data[0]
          this.target_list_get = data.list || []
        }, this.failure)
      },
      GET_TARGET_LOG_PUSH(){
        this.$request.get(this.$interface.GET_TARGET_LOG_PAGE, {
          header: {token: this.token},
          manage_dimension: 'REGION',
          dimension_id: this.dimension_id,
          page: 1,
          rows: 3,
        }, (response) => {
          let data = response.data[0]
          this.target_list_push = data.list || []
        }, this.failure)
      },
      GET_TARGET_OVERVIEW(params={}, cb=()=>{}) {
        this.$request.get(this.$interface.GET_TARGET_OVERVIEW, {
          header: {token: this.token},
          serial_number: this.serial_number || '',
          brand_id: this.brand_id || '',
          sub_model_id: this.sub_model_id || '',
          manage_dimension: params.manage_dimension || 'REGION',
          region_id: params.region_id || '',
          dimension_id: params.dimension_id || '',
        }, (response) => {
          let data = response.data
          typeof cb == 'function' ? cb(data) : ''
        }, this.failure)
      },
      backToRegion() {
        this.map_area = 2
        this.getData(false)
      },
      getData(load_map = true) {
        if (!this.serial_number) return

        var callback = () => {}

        switch (this.map_area) {
          case 2:
            if (!this.region_id) break
            if (load_map) {
              let region = this.regions.find( item => {
                return item.previous_level.id == this.region_id
              })
              , provinces = !!region ? region.list : []
              , province_map = this.province_map
              provinces = provinces.map( item => {
                let name = ''
                for (let key in province_map) {
                  let values = province_map[key]
                  if (values.includes(item.name)) {
                    name = key
                  }
                }
                return {name}
              })
              callback = () => {
                let map_features = []
                for (let y in provinces) {
                  for(let z in map.features){
                    if(map.features[z].properties.name == provinces[y]['name']){
                      map_features.push(map.features[z])
                    }
                  }
                }
                echarts.parseGeoJson(map);
                echarts.registerMap(this.region_name, {"type":"FeatureCollection", "features": map_features, "UTF8Encoding":false});
                this.initChart()
              }
            }
            this.GET_TARGET_OVERVIEW({
              manage_dimension: 'REGION',
              dimension_id: this.region_id || '',
            }, (data) => {
              this.overview_info = data[0]
            })
            this.GET_TARGET_OVERVIEW({
              manage_dimension: 'PROVINCE',
              region_id: this.region_id || ''
            }, (data=[]) => {
              this.overview_children = data
              this.complete2 = true
              this.$nextTick(() => {
                callback()
              })
            })
            break;
          case 3:
            if (!this.province_name) break
            if (load_map) {
              callback = () => {
                let map_features = []
                for(let z in map.features){
                  if(map.features[z].properties.name == this.province_name){
                    map_features.push(map.features[z])
                  }
                }
                echarts.parseGeoJson(map);
                echarts.registerMap(this.province_name, {"type":"FeatureCollection", "features": map_features, "UTF8Encoding":false});
                this.initChart2()
              }
            }
            this.GET_TARGET_OVERVIEW({
              manage_dimension: 'PROVINCE',
              dimension_id: this.province_id,
              region_id: this.region_id
            }, (data) => {
              this.overview_info = data[0]
              this.overview_children = []
              this.complete2 = true
              this.$nextTick(() => {
                callback()
              })
            })
            break
        }
      },
      GET_REGION(){
        this.$request.get(this.$interface.GET_REGION, {
          header: {token: this.token},
        }, (response) => {
          this.regions = response.data || []
        }, this.failure)
      },
      GET_NEWST_TARGET(callback=()=>{}, dimension = 'REGION') {
        this.$request.get(this.$interface.GET_NEWST_TARGET, {
          header: {token: this.token},
          manage_dimension: dimension,
          region_id: this.region_id
        }, (response) => {
          this.loading = false
          let data = response.data[0] || {}
          this.serial_number = data.serial_number || ''
          if (!this.serial_number) return
          typeof callback == 'function' ? callback() : ''
        }, this.failure)
      },
      GET_SUB_MODEL(){
        this.$request.get(this.$interface.GET_SUB_MODEL, {
          header: {token: this.token},
          serial_number: this.serial_number || '',
        }, (response) => {
          let data = response.data
          this.brands_models = data || []
        }, this.failure)
      },
    },
    components:{
      BiBar,BiPanel,BiProgress,
      BiEmpty
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>

</style>
