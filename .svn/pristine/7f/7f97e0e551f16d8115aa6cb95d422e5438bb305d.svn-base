<template>
  <div class="cyc-qudao">
    <bi-bar columnTitle="汽车商圈" columnIcon="icon-map">
      <template slot="button">
        <span></span>
      </template>
      <template slot="right">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">概览主页</el-breadcrumb-item>
          <el-breadcrumb-item> 渠道管理-汽车商圈</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
    </bi-bar>
    <div :class="{'shrink-leftPart': !leftPartStatus}">
      <bi-panel :operating="false" v-loading="loading">
        <bi-search ref="search" :cityName="cityName" :city="cityData" :brand="brandData" :cooperation="cooperationData" :netPoint="netPointData" @selectCity="selectCity" @filterNetwork="filterNetwork" @handleShowStyle="handleShowStyle"></bi-search>
        <div class="leftPart" v-show="leftPartStatus">
          <div v-if="(scaleType!='2' && listData.length)">
            <dl class="massageBox">
              <dt>
                <span :title="cityName+'信息统计'" style="max-width: 196px">{{cityName}}信息统计</span>
                <el-tooltip class="item" effect="dark" placement="right-start" popper-class="popperTip" visible-arrow="true">
                  <div slot="content">
                    <span><i class="el-icon-caret-left"></i>商圈数量：</span>
                    <p>本品进驻商圈数量/城市商圈数量</p>
                    <span><i class="el-icon-caret-left"></i>商圈网点：</span>
                    <p>本品进驻商圈的网点数量/商圈覆盖的网点数量</p>
                    <span><i class="el-icon-caret-left"></i>网点占比：</span>
                    <p>进驻商圈的网点数量占全市网点数量比例/商圈覆盖的网点数量占全市网点数量的比例</p>
                  </div>
                  <i class="iconfont icon-wenhao1"></i>
                </el-tooltip>
              </dt>
              <dd><em>商圈数量(本品/城市)：</em>{{city_stat.bpInBusiCirCount ||0}} / {{city_stat.cityBusiCirCount ||0}}</dd>
              <dd><em>商圈网点(本品/城市)：</em>{{city_stat.bpInBusiCirBranCount ||0}} / {{city_stat.busiCirBranCount ||0}}</dd>
              <dd><em>网点占比(本品/城市)：</em>{{city_stat.bpInBusiCirRate|multiply(100)|number_format(1)}}% / {{city_stat.inBusiCirBranCityRate|multiply(100)|number_format(1)}}%</dd>
            </dl>
            <div class="businessPage">
              <el-scrollbar style="width: 100%;height: 100%;">
                <dl v-for="(item, key) in listData" :class="{hoverClass:1,'on': item.active}" @mouseenter="focusItem(item.bcId)" @mouseleave="blurItem(item.bcId)" @click="selectCircle(item.bcId, item.businessCircleName)">
                  <dt><p :title="item.businessCircleName">{{ (page - 1) * pageSize + key + 1 }} {{ item.businessCircleName }}</p><small class="stayBody" v-if="item.businessCircleStatistics.bpIsInBusiCir!='未进驻'">{{ item.businessCircleStatistics.bpIsInBusiCir}}</small></dt>
                  <dd>商圈网点数量：<i>{{item.businessCircleStatistics.branchCount || 0}}</i></dd>
                  <dd>竞品进驻数量：<i>{{item.businessCircleStatistics.jpInBusiCirCount|number_format}}</i></dd>
                </dl>
              </el-scrollbar>
            </div>
            <el-row class="paging">
              <el-col :span="9" :class="{'able':page-1>=1}"><span @click="jumpToPage(page-1)">上一页</span></el-col>
              <el-col :span="6"><span>{{page}}</span>/<span class="totalPage">{{totalPage}}</span></el-col>
              <el-col :span="9" :class="{'able':page+1<=totalPage}"><span @click="jumpToPage(page+1)">下一页</span></el-col>
            </el-row>
          </div>
          <div v-else-if="scaleType=='2' && listData2.length">
            <dl class="massageBox">
              <dt>
                <span :title="circle_stat.businessCircleName" style="max-width: 162px">{{circle_stat.businessCircleName}}</span>
                <small class="stayHead">{{circle_stat.bpIsInBusiCir}}</small>
              </dt>
              <dd><em>网点数量：</em>{{circle_stat.branchCount ||0}}</dd>
              <dd><em>进驻竞品数量：</em>{{circle_stat.jpInBusiCirCount}}</dd>
            </dl>
            <div class="shopPage">
              <el-scrollbar style="width: 100%;height: 100%;">
                <dl v-for="(item, key) in listData2" :class="{hoverClass:1,'on': item.active}" @click="addAutoShopInfo(item, (page-1)*pageSize+key+1)">
                  <dt :title="item.dealerName">{{ (page - 1) * pageSize + key + 1 }} {{ item.dealerName }}</dt>
                  <dd>经营品牌：<i :title="item.manfNames">{{item.manfNames}}</i></dd>
                  <dd>去年网点销量：<i>--台</i></dd>
                </dl>
              </el-scrollbar>
            </div>
            <el-row class="paging">
              <el-col :span="9" :class="{'able':page-1>=1}"><span @click="jumpToPage(page-1)">上一页</span></el-col>
              <el-col :span="6"><span>{{page}}</span>/<span class="totalPage">{{totalPage}}</span></el-col>
              <el-col :span="9" :class="{'able':page+1<=totalPage}"><span @click="jumpToPage(page+1)">下一页</span></el-col>
            </el-row>
          </div>
          <div class="netError" v-else-if="!loading">
            <bi-empty :show-result="false">
              <span slot="tips">暂无数据</span>
            </bi-empty>
          </div>
          <div class="netError" v-else></div>
        </div>
        <div class="rightPart">
          <div id="XSDFXPage" class="XSDFXPage"></div>
          <div class="menu-second-zoom closePanel" v-if="leftPartStatus"  @click="leftPartToggle"><i style="font-size: 16px;" class="iconfont icon-back"></i></div>
        </div>
      </bi-panel>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BiBar from '@index/components/bar.vue'
  import BiEmpty from '@index/components/empty.vue'
  import BiPanel from '@index/components/panel.vue'
  import BiSearch from '@index/components/search.vue'
  import mixin from '@index/config/mixin'
  import bus from '@/config/eventBus'
  export default {
    name: '',
    mixins: [mixin],
    data() {
      return {
        leftPartStatus: true,
        cityData: [],
        brandData: [],
        cooperationData: [],
        netPointData: [],
        show_type: '0',
        ruleForm: {
          area: '',
          cooperation: '',
          network: '',
          show_type: '',
        },
        map: {}, // 地图对象
        zoom: '15', // 地图级别，共19级
        zoomToMeter: [null,10000000,5000000,2000000,1000000,500000,200000,100000,50000,25000,20000,
          10000,5000,2000, 1000,500,200, 100,50,20
        ],
        rawData: [],
        rawData2: [],
        listData: [],
        listData2: [],
        circleData: [],
        dealersData: [],  // 城市中的经销商
        outDealersData: '', // 不在商圈中的经销商
        page: 1,
        pageSize: 10,
        totalPage: 1,
        color: {
          '-1': '#7e868d',
          '0': '#4aa2fb',  // blue
          '1': '#288a81',  // green
          '2': '#e7894a',  // orange
          '3': '#3d86c3',  // blue
          '4': '#61ba63',  // green
          '5': '#ea695c',  // red
          '6': '#b5a185',  // brown
          '7': '#40c2ae',  // green
          '8': '#3a7edb',  // blue

          '9': '#d27c7e',   // pink
          '10': '#827a9b',  // purple
          '11': '#6687f2',  // blue
          '12': '#bbcc5a',  // yellow
          '13': '#51b5d6',  // cync
          '14': '#70916b',  // green
          '15': '#a768c2',  // red
          '16': '#246ca9',  // blue
          '17': '#bf7fa0',  // pink
          '18': '#989b62',  // green
        },
        circles: {},
        markers: {},
        autoshopMarkers: {},
        scaleType: '',    // 显示类型：0：按商圈显示，1：按商圈+经销商标注，2：经销商名称
        cityName: localStorage.getItem('iways_cityName') || '北京市',
        city_stat: {},
        circle_stat: {},
        currentCircleId: '', // 当前商圈ID
        currentCircleName: '', // 当前商圈名称
        loading: true,
        focusCircleId: '',
      }
    },
    computed: {
      scaleTypeOptions() {
        return [
          {zooms: [12,11,10,9,8,7,6,5,4,3,2,1], text: '大于等于5公里'},   // [5000,...]
          {zooms: [13,14,15], text: '大于0.2公里小于5公里'},           // [2000,1000,500]
          {zooms: [16,17,18,19], text: '小于等于0.2公里'},                   // [,200,100,50,20]
        ]
      },
      circleOptions() {
        return {
          fillColor: '#e55353',         //商圈填充颜色，
          fillOpacity: 0.9,             //商圈透明度
          strokeColor: '#e55353',       //商圈边缘颜色，
          strokeWeight: 1,              //商圈描边宽度
          strokeOpacity: 1,             //商圈描边透明度

          fillColorFocus: '#d75455',    //商圈填充颜色，
          fillOpacityFocus: 0.98,       //商圈透明度
          strokeColorFocus: '#e55353',  //商圈边缘颜色，
          strokeWeightFocus: 8,         //商圈描边宽度
          strokeOpacityFocus: 0.4,      //商圈描边透明度
        }
      },
      showType() {
        let meter = this.zoomToMeter[this.zoom] || ''
      },
      iconOffset() {
        let data = {}
        , width = this.iconOptions.width
        , height = this.iconOptions.height
        data['-1'] = [0, 0]
        for (let i = 0 ;  i < 9 ; i++) {
          data[i] = [-(width*i), -(height)]
        }
        for (let i = 0 ;  i < 19 ; i++) {
          data[i+9] = [-(width*i), -(height*2)]
        }
        return data
      },
      iconOptions() {
        let times = 0.6
        return {
          width: 36*times,
          height: 52*times,
          times: times,
        }
      },
    },
    destroyed(){
      this.$emit('panelStyle', true)
      document.getElementById("app").style.minWidth = '';
    },
    mounted() {
      this.zoom = 12
      this.$emit('panelStyle', false)
      document.getElementById("app").style.minWidth = document.documentElement.clientHeight + 'px' || document.body.clientHeight + 'px';
      var map = new BMap.Map("XSDFXPage",{
        enableMapClick: false,
        minZoom: 10,
        maxZoom: 18
     });
      map.addControl(new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT}));
      map.addControl(new BMap.NavigationControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT}));
      map.centerAndZoom(this.cityName, this.zoom);
      map.enableScrollWheelZoom(true);
      map.disableInertialDragging();

      let that = this
      this.map = map;
      this.map.addEventListener('zoomend', (type, target) => {
        this.initOverlay()
      })
      this.map.addEventListener('moving', () => {
        var point = this.map.getCenter()
        var gc = new BMap.Geocoder();
        gc.getLocation(point, function(rs){
          if (rs.addressComponents.city) {
            that.cityName = rs.addressComponents.city
          }
        });
      })

      this.queryConditions()
      this.initData()

      bus.$on('triggerMainPanel', (status) => {
        this.leftPartStatus = status
      })
    },
    watch: {
      circleData() {
        this.initOverlay()
      },
      dealersData() {
        let dealersData = {}
        for (let x in this.dealersData) {
          let item = this.dealersData[x]
          dealersData[item.bcId] = item.dealers || []
        }
        if (this.circleData.length) {
          this.circleData.map( item => {
            item.dealers = dealersData[item.bcId] || []
            return item
          })
        }
        this.initOverlay()
      },
      outDealersData() {
        this.initOverlay()
      },
      rawData2() {
        this.circleData.map( item => {
          if (item.bcId == this.currentCircleId) {
            item.dealers.map((point, dealerIndex) => {
              this.map.removeOverlay(this['markers'][point.dealerId])
              delete this['markers'][point.dealerId]
            })
          }
        })
        this.rawData2.map((point, dealerIndex) => {
          var bcIndex = this.circleData.findIndex(item => {
            return item.bcId == this.currentCircleId
          })
          this.addMarker(point, bcIndex, '', false)
          this.addAutoShopMarker(point, bcIndex, '', this.currentCircleId)
        })
      },
      cityName() {
        this.initData()
      }
    },
    methods: {
      // 关闭左边信息栏
      leftPartToggle() {
        this.leftPartStatus = !this.leftPartStatus
        bus.$emit('selectMenuZoom', true)
      },
      getListData(data = this.rawData) {
        let offset = (this.page - 1) * this.pageSize
        , limit = this.pageSize
        this.totalPage = Math.ceil(data.length / this.pageSize)

        let output = []
        for (var x in data) {
          if (x < offset || x >= offset + limit)continue
          output.push(data[x])
        }
        return output
      },
      selectCity(cityName) {
        this.map.setZoom(12)
        this.map.setCenter(cityName);
        this.cityName = cityName
        localStorage.setItem('iways_cityName', cityName)
      },
      filterNetwork(form) {
        this.getInBusiCirDealers(form)
        this.getOutBusiCirDealers(form)
      },
      handleShowStyle(key) {
        this.show_type = key
        this.initOverlay()
      },
      jumpToPage(page) {
        if (page <= 0) {
          page = 1
        } else if (page >= this.totalPage) {
          page = this.totalPage
        }
        if (page == this.page)return
        this.page = page
        if (this.scaleType == 2) {
          this.listData2 = this.getListData(this.rawData2)
        } else {
          this.listData = this.getListData(this.rawData)
        }
      },
      initData() {
        this.page = 1
        this.map.setZoom(12)
        this.map.clearOverlays()
        this.$refs.search.clearData()
        this.getBusiCirList()
        this.getCityStatistics()
      },
      initOverlay() {
        this.zoom = Number(this.map.getZoom())
        let scaleType = this.scaleTypeOptions.findIndex( item => {
          return item['zooms'].includes(this.zoom)
        })
        this.map.clearOverlays()
        switch(scaleType) {
          case 0:
            this.addCircles()
            break
          case 1:
            this.addCircles()
            this.addMarkers(true)
            break
          case 2:
            this.addMarkers(false)
            this.addAutoShopMarkers()
            break
          default:
            break
        }
        this.scaleType = scaleType
      },
      addCircles() {
        this.circleData.map((item, key) => {
          let point = new BMap.Point(item.geoCoordinate.longitude, item.geoCoordinate.latitude);
          item.radius = 60
          this.addCircle(item.bcId, point, item.radius, item.businessCircleName || '商圈'+key, item.businessCircleStatistics.branchCount)
        })
      },
      addCircle(id, point, radius, name, number='0') {
        var vm = this
        function ComplexCustomOverlay(point){
          this._point = point
          this._radius = radius
        }
        ComplexCustomOverlay.prototype = new BMap.Overlay();
        ComplexCustomOverlay.prototype.initialize = function(map){
          this.map = map;
          var div = this._div = document.createElement("div");
          div.style.position = "absolute";

          var that = this;
          var arrow = this._arrow = document.createElement("a");
          arrow.style.zIndex = BMap.Overlay.getZIndex(-(this._point.lat));
          arrow.setAttribute('class', 'circle');

          var span = document.createElement("span");
          span.appendChild(document.createTextNode(name));
          span.setAttribute('title', name)
          arrow.appendChild(span);

          var p = document.createElement("font");
          p.appendChild(document.createTextNode('经销店数量：'));
          var em = document.createElement("em");
          em.appendChild(document.createTextNode(number));
          p.appendChild(em)
          arrow.appendChild(p)

          arrow.addEventListener('click', () => {
            vm.currentCircleId = id
            vm.currentCircleName = name
            vm.openCircle()
          })
          arrow.addEventListener('mouseenter', () => {
            arrow.style.zIndex = '10000000'
            vm.addCircleInfo(id)
          })
          arrow.addEventListener('mouseleave', () => {
            arrow.style.zIndex = BMap.Overlay.getZIndex(-(that._point.lat));
            vm.removeCircleInfo(id)
          })
          div.appendChild(arrow);

          this.map.getPanes().labelPane.appendChild(div);
          return div;
        }
        ComplexCustomOverlay.prototype.draw = function(){
          var map = this.map;
          var pixel = map.pointToOverlayPixel(this._point);
          this._div.style.left = pixel.x - parseInt(this._radius) + "px";
          this._div.style.top  = pixel.y - 0 + "px";
        }
        var circle = new ComplexCustomOverlay(point);
        this.map.addOverlay(circle);//将标注添加到地图中
        this['circles'][id] = circle
      },
      focusItem(id) {
        this.focusCircle(id)
        this.addCircleInfo(id)
      },
      blurItem(id) {
        this.blurCirlce(id)
        this.removeCircleInfo(id)
      },
      focusCircle(id) {
        if (!this['circles'][id])return
      },
      blurCirlce(id) {
        if (!this['circles'][id])return
      },
      selectCircle(id, name) {
        this.currentCircleId = id
        this.currentCircleName = name
        this.openCircle()
      },
      openCircle() {
        let id = this.currentCircleId
        if (!this['circles'][id])return
        let point = this['circles'][id]._point
        this.page = 1
        this.zoom = 16
        this.map.setCenter(point)
        this.map.setZoom(this.zoom)
        this.getBusiCirStatistics()
        this.getDealerList()
      },
      addCircleInfo(id, name = '') {
        let item = this['rawData'].find((item, index) => {
          item.bcId = item.bcId || (index + 1)
          return item.bcId == id
        })
        if (!item)return
        name = name || item.businessCircleName || ''
        let jpInBusicCirs = item.jpInBusicCirs || ''
        let jpOutBusiCirs = item.jpOutBusiCirs || ''
        let stayHead = item.businessCircleStatistics.bpIsInBusiCir || ''
        let joinBrand = '' , outBrand = ''
        if(jpInBusicCirs){
          let joinBrandData = jpInBusicCirs.split(",")
          for (let i in joinBrandData){
            joinBrand+="<span>"+joinBrandData[i]+"</span>"
          }
          joinBrand = '<dt>进驻竞品：</dt><dd>'+joinBrand+'</dd>'
        }
        if(jpOutBusiCirs){
          let outBrandData = jpOutBusiCirs.split(",")
            for (let i in outBrandData){
            outBrand+="<span>"+outBrandData[i]+"</span>"
          }
          outBrand ='<dt>未进驻竞品：</dt><dd>'+outBrand+'</dd>'
        }
        let inAndOut = joinBrand||outBrand?joinBrand+outBrand:'<div>暂无相关信息</div>'
        let html = '<dl class="messageBox">\
        <h2>' + name + '<small class="stayHead">'+ stayHead +'</small></h2>\
        '+inAndOut+'</dl>'
        let infoWindow = new BMap.InfoWindow(html, {enableAutoPan: false, offset: new BMap.Size(0, 0)})
        let point = this['circles'][id]._point
        this.map.openInfoWindow(infoWindow, point);
      },
      removeCircleInfo(id) {
        this.map.closeInfoWindow()
      },
      addIcon(index = 0, show=true) {
        index = Number(index) % 19
        let offset = this.iconOffset[index]
        , width = show ? this.iconOptions.width : 1
        , height = show ? this.iconOptions.height : 1
        return new BMap.Icon(
          'http://i.way-s.cn/static/images/map_icons.png',
          new BMap.Size(width, height),
          {
            imageSize: new BMap.Size(364*this.iconOptions.times, 159*this.iconOptions.times),
            imageOffset:new BMap.Size(offset[0], offset[1])
          }
        );
      },
      addMarkers(show=true) {
        this.circleData.map((item, index) => {
          var id = item.bcId
          if (!item.hasOwnProperty('dealers'))return
          item.dealers.map((m, key) => {
            this.addMarker(m, index, key+1, show)
          })
        })
        this.outDealersData.map((m) => {
            this.addMarker(m, '-1', '', show)
        })
      },
      addMarker(m, index, key, show) {
        let point = new BMap.Point(m.longitude, m.latitude)
        let icon = this.addIcon(index, show)
        var marker = new BMap.Marker(point, {icon})
        marker.addEventListener('click', () => {
          this.addAutoShopInfo(m, key)
        })
        this.map.addOverlay(marker)
        this['markers'][m.dealerId] = marker
      },
      addAutoShopMarkers() {
        this.circleData.map((item,bcIndex) => {
          var id = item.bcId
          if (!item.hasOwnProperty('dealers'))return
          item.dealers.map((point, dealerIndex) => {
            this.addAutoShopMarker(point, bcIndex, '', id)
          })
        })
        this.outDealersData.map(point => {
          this.addAutoShopMarker(point, '-1', '')
        })
      },
      addAutoShopMarker(point, bcIndex, dealerIndex='', bcId='') {
        bcIndex = Number(bcIndex) % 19
        if (!this['markers'][point.dealerId])return
        let marker = this['markers'][point.dealerId]
        , label = new BMap.Label() 
        , names = point.dealerNames || [[
          point.dealerId,
          point.dealerName,
          point.dealerAbbreviation,
          point.manfBrandNames
        ]]
        , name = '', offsetTop = 32, offsetLeft = 10

        for (var x in names) {
          let item = names[x]
          
          if (this.show_type == 1) {
            if (item[2] == point.dealerAbbreviation) {
              name = (item[2] || point.dealerAbbreviation) + '(' + (item[3]||point.manfBrandNames) + ')'; break;
            }
          } else if (this.show_type == 2) {
            if (item[3] == point.manfBrandNames) {
              name = item[3] || point.manfBrandNames; break;
            }
          } else if (this.show_type == 3) {
            if (item[1] == point.dealerName) {
              name = item[1] || point.dealerName; break;
            }
          } else {
            if (item[2] == point.dealerAbbreviation) {
              name = item[2] || point.dealerAbbreviation; break;
            }
          }
          offsetTop += 22
        }
        let html = '<div class="marker" style="background-color:'+this.color[bcIndex]+';top:-'+offsetTop+'px;"><span>' + (dealerIndex?dealerIndex+'.':'') + name + '</span></div>'
        if (x == 0) {
          html += '<div class="markerArrows" style="border-color:'+this.color[bcIndex]+' transparent transparent '+this.color[bcIndex]+';"></div>'
        }
        label.setContent(html)
        label.setStyle({ borderColor:this.color[bcIndex], border: 0, padding:'0', fontSize:'12px', backgroundColor:'transparent' })
        label.addEventListener('click', () => {
          this.addAutoShopInfo(point, dealerIndex)
          if (bcId) {
            if (bcId == this.currentCircleId)return
            this.currentCircleId = bcId
            this.openCircle()
          }
        })
        marker.setLabel(label)
      },
      addAutoShopInfo(shopInfo = {}, key = '') {
        if (!shopInfo.hasOwnProperty('dealerAbbreviation'))return
        let title = key + ' ' + (shopInfo.dealerAbbreviation || '')
        , longitude = shopInfo.longitude
        , latitude = shopInfo.latitude
        if (this.show_type == 1) {
          title = shopInfo.dealerAbbreviation + '(' + (shopInfo.manfBrandNames||'') + ')'
        } else if (this.show_type == 2) {
          title = shopInfo.manfBrandNames
        } else if (this.show_type == 3) {
          title = shopInfo.dealerName
        }
        let html = '<div class="shopBox"><h2>' + title + '</h2><div style="font-size:12px;">\
          <p>集团归属：<em>'+(shopInfo.dealerGroup||'-')+'</em></p>\
          <p title="'+(shopInfo.brandNames||'-')+'">经营品牌：<em>'+(shopInfo.brandNames||'-')+'</em></p>\
          <p title="'+(shopInfo.manfNames||'-')+'">合作厂商：<em>'+(shopInfo.manfNames||'-')+'</em></p>\
          <p>注册时间：<em>'+(shopInfo.registrationTime||'-')+'</em></p>\
          <p>注册资金：<em>'+(shopInfo.registeredCapital||'-')+(shopInfo.capitalUnit||'万元')+'</em></p>\
          <p>占地面积：<em>'+(shopInfo.floorArea||'-')+'</em></p><div><div>\
        '
        let infoWindow = new BMap.InfoWindow(html)

        let point = new BMap.Point(longitude, latitude)
        this.map.openInfoWindow(infoWindow, point);
      },

      // 接口方法
      getBusiCirList() {
        if (!this.cityName)return
        this.$request.get(this.$interface.getBusiCirList, {
          header: {token: this.token},
          cityName: this.cityName,
        }, (response) => {
          this.rawData = response.data.length ? response.data : []
          this.listData = this.getListData()
          this.circleData = this.rawData.map(item => {
            item.active = false
            return item
          })
          this.getInBusiCirDealers()
          this.getOutBusiCirDealers()
        }, this.failure)
      },
      getInBusiCirDealers(form={}) {
        if (!this.cityName)return
        this.loading = true
        this.$request.get(this.$interface.getInBusiCirDealers, {
          header: {token: this.token},
          cityName: this.cityName,
          manfBrandIds: form.manfBrandIds || '',
          cooperativeNatures: form.cooperativeNatures || '',
          networkTypes: form.networkTypes || '',
        }, (response) => {
          this.dealersData = response.data.length ? response.data : []
          this.loading = false
        }, this.failure)
      },
      getCityStatistics() {
        if (!this.cityName)return
        this.$request.get(this.$interface.getCityStatistics, {
          header: {token: this.token},
          cityName: this.cityName
        }, (response) => {
          this.city_stat = response.data[0]
        }, this.failure)
      },
      getBusiCirStatistics() {
        if (!this.cityName)return
        this.$request.get(this.$interface.getBusiCirStatistics, {
          header: {token: this.token},
          cityName: this.cityName,
          bcId: this.currentCircleId
        }, (response) => {
          this.circle_stat = response.data[0]
        }, this.failure)
      },
      getDealerList(form={}, cb=function(){}) {
        if (!this.currentCircleId)return
        this.loading = true
        this.$request.get(this.$interface.getDealerList, {
          header: {token: this.token},
          bcId: this.currentCircleId,
          manfBrandIds: form.manfBrandIds || '',
          cooperativeNatures: form.cooperativeNatures || '',
          networkTypes: form.networkTypes || '',
        }, (response) => {
          this.loading = false
          let data = response.data || []
          this.rawData2 = data
          this.listData2 = this.getListData(this.rawData2)
          if (typeof cb == 'function') {
            cb()
          }
        }, this.failure)
      },
      getOutBusiCirDealers(form={}) {
        if (!this.cityName)return
        this.$request.get(this.$interface.getOutBusiCirDealers, {
          header: {token: this.token},
          cityName: this.cityName,
          manfBrandIds: form.manfBrandIds || '',
          cooperativeNatures: form.cooperativeNatures || '',
          networkTypes: form.networkTypes || '',
        }, (response) => {
          this.outDealersData = response.data.length ? response.data : []
        }, this.failure)
      },
      queryConditions() {
        this.$request.get(this.$interface.queryConditions, {
          header: {token: this.token},
          qtype: '1'
        }, (response) => {
          this.cityData = response.data || []
        }, this.failure)

        this.$request.get(this.$interface.queryConditions, {
          header: {token: this.token},
          qtype: '2'
        }, (response) => {
          this.brandData = response.data || []
        }, this.failure)

        this.$request.get(this.$interface.queryConditions, {
          header: {token: this.token},
          qtype: '3'
        }, (response) => {
          this.cooperationData = response.data || []
        }, this.failure)

        this.$request.get(this.$interface.queryConditions, {
          header: {token: this.token},
          qtype: '4'
        }, (response) => {
          this.netPointData = response.data || []
        }, this.failure)
      },
    },
    components: {
      BiBar,BiEmpty,BiPanel,BiSearch
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
html,body,.XSDFXPage{
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  font-family: "微软雅黑";
}
.main-panel{
  padding: 0;min-height: initial;
 .bi-panel {border: none;margin: 0;}
}
</style>
