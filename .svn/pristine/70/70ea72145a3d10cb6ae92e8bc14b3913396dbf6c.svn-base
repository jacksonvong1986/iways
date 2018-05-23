<template>

  <div>
    <bi-bar columnTitle="目标制定">
      <template slot="button">
        <span class="mgr20">时间：{{ year_month }}</span>
        <span class="mgr20">管理维度：{{ dimension_name }}</span>
        <span class="mgr20">管理类型：{{ manage_type }}</span>
      </template>
      <template slot="right">
        <el-breadcrumb separator="/">
          <span class="bread-legend">当前位置：</span>
          <el-breadcrumb-item :to="{ path: '/' }">概览主页</el-breadcrumb-item>
          <el-breadcrumb-item> 销量目标管理</el-breadcrumb-item>
          <el-breadcrumb-item> 区域 - 目标制定</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
    </bi-bar>

    <div class="content">
      <template v-if="serial_number">
        <bi-panel :operating="false" >
          <template slot="title">请确认区域总目标</template>
          <div slot="others">
            <router-link to="target/list" class="cyc-xl-step-btn on"><i class="iconfont icon-time"></i>查看过往制定的目标</router-link>
          </div>
          <div class="cyc-xl-step">
            <ul class="step-bar">
              <li class="active">
                <span>1</span>
                <div>
                  进行中
                  <em></em>
                  <small>车型总目标</small>
                </div>
              </li>
              <li>
                <span class="iconfont">2</span>
                <div>
                  待进行
                  <em></em>
                  <small>省份车型目标</small>
                </div>
              </li>
              <li>
                <span class="iconfont">3</span>
                <div>
                  待进行
                  <em></em>
                  <small>省份月度目标</small>
                </div>
              </li>
              <li>
                <span class="iconfont">4</span>
                <div>
                  待进行
                  <small>确认下发</small>
                </div>
              </li>
            </ul>
          </div>
        </bi-panel>

        <bi-panel :operating="false" title-size="small" style="margin-bottom: -2px;">
          <template slot="title">确认品牌总目标</template>
          <template slot="others">
          <span class="cyc-xl-title-tips">
            <font>说明：MTD 当前月份</font>
            <font>YTD 累积至当前月份</font>
            <font>RTD 下月累积至年底</font>
            <font>TY  全年累积</font>
          </span>
          </template>
          <div>
            <table class="cyc-xl-table_va">
              <thead>
              <tr>
                <th width="13%">品牌</th>
                <th width="23">TY-2018目标</th>
                <th width="16%">TY-2017实际完成</th>
                <th width="21%">最新目标-相对去年增长</th>
                <th width="10%">TY(0+12)</th>
                <th width="17%">最新目标-相对0+12增长</th>
              </tr>
              </thead>
              <tbody>
              <tr v-if="region_target.previous_level">
                <td>{{ region_target.previous_level.metadata.name}}</td>
                <td>{{ region_target.previous_level.ty | number_format }}</td>
                <td>{{ region_target.previous_level.ly_sales | number_format }}</td>
                <td>
                  <template v-if="region_target.previous_level.ty_growth_rate">
                    {{ region_target.previous_level.ty_growth_rate | multiply(100) | number_format(1) }}%
                  </template>
                  <template v-else>
                    亲，暂未制定目标
                  </template>
                </td>
                <td>{{ region_target.previous_level.last_ty | number_format}}</td>
                <td>{{ region_target.previous_level.ty_mom | number_format }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </bi-panel>

        <bi-panel :operating="false" title-size="small" >
          <template slot="title">确认车型总目标</template>
          <div v-loading="loading" style="min-height: 200px;">
            <table class="cyc-xl-table_va">
              <thead>
              <tr>
                <th width="13%">车型</th>
                <th width="23">TY-2018目标</th>
                <th width="16%">TY-2017实际完成</th>
                <th width="21%">最新目标-相对去年增长</th>
                <th width="10%">TY(0+12)</th>
                <th width="17%">最新目标-相对0+12增长</th>
              </tr>
              </thead>
              <tbody>
              <tr class="" v-for="(item, key) in region_target.list">
                <td>{{ item.metadata.name }}</td>
                <td>{{ item.ty | number_format }}</td>
                <td>{{ item.ly_sales | number_format }}</td>
                <td>{{ item.ty_growth_rate | multiply(100) | number_format(1) }}%</td>
                <td>{{ item.last_ty | number_format }}</td>
                <td>{{ item.ty_mom | multiply(100) | number_format(1) }}%</td>
              </tr>
              </tbody>
            </table>
          </div>
        </bi-panel>
        <router-link :to="{path: 'target/setvb', query: {uuid: uuid}}" class="cyc-xl-btn">下一步：制定省份车型目标</router-link>
      </template>

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
  import BiEmpty from '@index/components/empty.vue'
  import mixin from '@index/config/mixin'
  import sales from './_mixin'

  export default {
    name: '',
    mixins: [mixin, sales],
    data() {
      return {
        region_target: [],
        serial_number:'',
        uuid:'',
        loading: true,
        region_id: '',
      }
    },
    mounted(){
      this.region_id = this.dimension.object_id
      if (!this.region_id) {
        alert('region_id is null')
        return
      }
      this.GET_NEWST_TARGET()
    },
    methods:{
      GET_NEWST_TARGET(cb) {
        this.$request.get(this.$interface.GET_NEWST_TARGET, {
          header: {token: this.token},
          manage_dimension: "NATIONAL",
        }, (response) => {
          let data = response.data[0] || {}
          this.serial_number = data.serial_number
          this.loading = false
          if (!this.serial_number) return
          this.POST_REGION_TARGET_DRAFT()
        }, this.failure)
      },
      POST_REGION_TARGET_DRAFT () {  //创建一个区域目标草稿
        let uuid = sessionStorage.getItem('iways_uuid_b') || ''
        if (!!uuid) {
          this.uuid = uuid
          this.$router.push({path: '/zhiku/xl/area/target', query: {uuid: this.uuid}})
          this.PUT_REGION_TARGET()
          return
        }
        this.$request.post(this.$interface.POST_REGION_TARGET_DRAFT, {
          header: {token: this.token},
          national_serial_number: this.serial_number,
          region_id: this.region_id,
          title: ""
        }, (response) => {
          this.uuid = response.data[0].uuid || ''
          sessionStorage.setItem('iways_uuid_b', this.uuid)
          this.$router.push({path: '/zhiku/xl/area/target', query: {uuid: this.uuid}})
          this.PUT_REGION_TARGET()
        }, this.failure)
      },
      PUT_REGION_TARGET(cb=()=>{}) {
        let region_target =[{
              "id": 0,
              "sales": 0
            }]
        this.$request.put(this.$interface.PUT_REGION_TARGET, {
          header: {token: this.token},
          region_target: region_target,
          resplit: false,
          uuid: this.uuid
        }, (response) => {
          this.region_target = response.data[0]
          typeof cb == 'function' ? cb(response) : ''
        }, (response) => {
          if (response.result_code == "400" && response.result_msg == "Bad Request: 目标草稿已过期或不存在") {
            sessionStorage.removeItem('iways_uuid_b')
            this.POST_REGION_TARGET_DRAFT(cb)
          } else {
            this.failure(response)
          }
        })
      }
    },
    components:{
      BiBar,
      BiPanel,
      BiEmpty,
    }
  }
</script>
<style lang="scss" type="text/scss" scoped></style>
