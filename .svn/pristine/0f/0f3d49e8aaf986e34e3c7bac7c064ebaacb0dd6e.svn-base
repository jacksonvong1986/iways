<template>
  <div class="cyc-shouhou-main">
    <bi-bar columnTitle="工时价格查询" columnIcon="icon-shouhou">
      <template slot="button">
        <span>当前数据时间：</span>
        <el-date-picker
          style="width:120px"
          prefix-icon="change-data-button"
          v-model="this_year_month"
          format="yyyy/MM"
          value-format="yyyyMM"
          :picker-options="pickerOptions"
          :editable="false"
          :clearable="false"
          @change="GET_PART_TYPES"
          type="month">
        </el-date-picker>
      </template>
      <template slot="right">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">概览主页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/zhiku/sh' }">售后概况</el-breadcrumb-item>
          <el-breadcrumb-item>工时价格查询</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
    </bi-bar>
    <div class="content">
      <!-- 已选条件 -->
      <!-- 搜索 -->
      <bi-panel :operating="false" v-show="searchType != 2">
        <template slot="title">
          <font>按条件查询</font>
        </template>
        <div class="search-condition">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="top">
            <div class="clear" style="margin-bottom: 20px;">
              <div class="popover-box">
                <el-form-item label="本品车型" prop="model_id">
                  <el-select v-model="ruleForm.model_id" placeholder="请选择" filterable @change="handle_selected_models">
                    <el-option-group
                      v-for="group in models_grouped"
                      :key="group.label"
                      :label="group.label">
                      <el-option
                        v-for="item in group.options"
                        :key="item.sub_model_id"
                        :label="item.sub_model_name"
                        :value="item.sub_model_id">
                      </el-option>
                    </el-option-group>
                  </el-select>
                </el-form-item>
              </div>
              <div class="popover-box" style="min-width:400px;">
                <el-form-item label="竞品车型" prop="compete_model_ids">
                  <el-select v-model="ruleForm.compete_model_ids" style="width: 100%" multiple placeholder="请选择" @change="handle_selected_competitors">
                    <el-option-group
                      v-for="group in competitors_grouped"
                      :key="group.label"
                      :label="group.label">
                      <el-option
                        v-for="item in group.options"
                        :key="item.sub_model_id"
                        :label="item.sub_model_name"
                        :value="item.sub_model_id">
                      </el-option>
                    </el-option-group>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="clear" style="margin-bottom: 20px;">
              <div class="popover-box" style="min-width:400px;">
                <el-form-item label="可比配件" prop="part_ids">
                  <el-select v-model="ruleForm.part_ids" style="width: 100%" multiple placeholder="请选择" filterable>
                    <el-option
                      v-for="(cate, key) in accessories"
                      :key="key"
                      :label="cate.part_name"
                      :value="cate.part_id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <a href="javascript:void(0);" class="submit" @click="GET_SEARCH_DATA(1, 'ruleForm',1)">{{ searchStatusText }}</a>
            <a href="javascript:void(0);" class="submit-back" @click="gotoback()" v-show="searchType==1">返回上一步</a>
          </el-form>
        </div>
      </bi-panel>
      <bi-panel :operating="false">
        <template slot="title"><font style="font-size: 14px;">为您找到 <b class="font-red">{{ searchRecords }}</b> 条符合条件的工时价格</font></template>
        <transition name="table">
          <div class="search-result" v-if="searchData.length > 0">
            <el-table
              :data="searchData"
              width="100%">
              <el-table-column v-for="(column, index) in columns"
                v-if="column.show"
                :type="column.type"
                :key="column.value"
                :label="column.label"
                :align="['hourly_wage'].includes(column.value)?'right':'left'"
                :width="column.width">
                <template slot-scope="scope">
                  <template v-if="['hourly_wage'].includes(column.value)">
                    {{ scope.row[column.value] | number_format(2) }}
                  </template>
                  <template v-else-if="column.type=='index'">
                    {{ (searchPage - 1) * page_size + scope.$index + 1 }}
                  </template>
                  <template v-else>
                    {{ scope.row[column.value] }}
                  </template>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-box">
              <el-pagination
                style="text-align:right; margin-right: 10px;"
                background
                layout="prev, pager, next"
                prev-text="上一页"
                next-text="下一页"
                @current-change="GET_SEARCH_DATA(1, 'ruleForm')"
                :current-page.sync="searchPage"
                :page-size="page_size"
                :total="searchRecords">
              </el-pagination>
            </div>
          </div>
          <div class="search-result" v-else>
            <div v-loading="loading" element-loading-background="#fff" style="min-height: 300px">
              <!-- 无结果 -->
              <template v-if="firstLoad">
                <bi-empty :show-result="false" v-if="!loading">
                  <span slot="tips">亲爱的，您还没有选择查询条件，请先选择您关注的查询条件</span>
                </bi-empty>
              </template>
              <template v-else>
                <bi-empty></bi-empty>
              </template>
            </div>
          </div>
        </transition>
      </bi-panel>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import Vue from 'vue';
  import BiBar from '@index/components/bar.vue'
  import BiPanel from '@index/components/panel.vue'
  import BiEmpty from '@index/components/empty.vue'
  import mixin from '@index/config/mixin'
  import bus from '@/config/eventBus'

  export default {
    mixins: [mixin],
    data() {
      return {
        selectOnClass : false,
        searchType: this.$route.query.searchType || '',
        searchData: [],
        searchPage: 1,
        page_size: 10,
        searchRecords: 0,
        part_date: [],
        where: [],
        raw_models: [],
        competitors: [],
        accessories: [],
        firstLoad: true,
        loading: false,
        ruleForm: {
          model_id: '',
          compete_model_ids: [],
          part_ids: [],
        },
        rules: {
          model_id: [
            { required: true, message: '请选择本品车型', trigger: 'change' }
          ],
          compete_model_ids: [
            { required: true, message: '请选择竞品车型', trigger: 'change' }
          ],
          part_ids: [
            { required: true, message: '请选择可比配件', trigger: 'change' }
          ],
        },
        columns: [{
          label: '序号',
          width: '50',
          type: 'index',
          show: true
        }, {
          label: '车型',
          value: 'sub_model_name',
          show: true
        }, {
          label: '厂商配件名称',
          value: 'part_name',
          sortable: true,
          show: true
        }, {
          label: '配件分类',
          value: 'part_type',
          sortable: true,
          show: true
        }, {
          label: '工时价格',
          value: 'hourly_wage',
          show: true
        }],
      }
    },
    watch: {
    },
    computed: {
      pickerOptions() {
        var that = this
        return {
          disabledDate(date) {
            var begin_year_month = Math.min(...that.part_date) + ''
            , end_year_month = Math.max(...that.part_date) + ''
            if (begin_year_month && end_year_month) {
              var startDate = begin_year_month.substr(0,4) + '/' + begin_year_month.substr(4,2) + '/01'
              var endDate = end_year_month.substr(0,4) + '/' + end_year_month.substr(4,2) + '/01'
              startDate = Date.parse(new Date(startDate))
              endDate = Date.parse(new Date(endDate))
              return (date && date.valueOf() < startDate) || (date && date.valueOf() > endDate)
            } else {
              return date
            }
          }
        }
      },
      searchStatusText() {
        return !!this.searchType ? '搜索' : '下一步'
      },
      models_grouped() {
        let models = {}
        this.raw_models.map((model) => {
          if (!models[model.manf_brand_name]) {
            models[model.manf_brand_name] = {}
            models[model.manf_brand_name]['label'] = model.manf_brand_name
            models[model.manf_brand_name]['options'] = []
          }
          models[model.manf_brand_name]['options'].push(model)
        })
        return models
      },
      models() {
        let models = {}
        this.raw_models.map((model) => {
          models[model.sub_model_id] = model
        })
        return models
      },
      competitors_grouped() {
        let competitors = {}
        this.competitors.map((model) => {
          if (!competitors[model.manf_brand_name]) {
            competitors[model.manf_brand_name] = {}
            competitors[model.manf_brand_name]['label'] = model.manf_brand_name
            competitors[model.manf_brand_name]['options'] = []
          }
          competitors[model.manf_brand_name]['options'].push(model)
        })
        return competitors
      },
    },
    mounted() {
      this.getToken(() => {
        this.GET_COMMON_COMPETITORS()
        this.GET_COMMON_VALID_DATE()
      })
    },
    methods: {
      handle_selected_models(sub_model_id) {
        this.competitors = this.models[this.ruleForm.model_id].competitors
        this.ruleForm.compete_model_ids = this.competitors.map(item => {
          return item.sub_model_id
        })
        this.clearValidate('ruleForm')
        this.handle_selected_competitors(this.ruleForm.compete_model_ids)
      },
      handle_selected_competitors(competitor_ids = []) {
        this.raw_parts = []
        this.ruleForm.part_ids = []
        this.GET_PART_TYPES()
      },
      handle_selected_cate(cate_id) {
        this.ruleForm.part_ids = []
      },
      handle_clear_cate() {
        this.raw_parts = []
        this.ruleForm.part_ids = []
      },
      gotoback() {
        this.searchType = ''
        this.competitors = []
        this.accessories = []
        this.searchRecords = 0
        this.searchData = []
        this.clearValidate('ruleForm')
        this.ruleForm = {
          model_id: '',
          compete_model_ids: [],
          part_ids: []
        }
      },

      GET_COMMON_COMPETITORS() {
        this.$request.get(this.$interface.GET_COMMON_COMPETITORS, {
          header: {token: this.token},
          type: 1,
          rows: 100000,
        }, (response) => {
          this.raw_models = response.data[0].list;
        }, this.failure);
      },
      GET_PART_TYPES() {
        if (!this.ruleForm.model_id || this.ruleForm.compete_model_ids.length<=0)return
        this.$request.get(this.$interface.GET_PART_TYPES, {
          header: {token: this.token},
          ym: this.this_year_month || '201801',                         //数据有效时间
          bp_sub_model_id: this.ruleForm.model_id,                      //本品子车型id
          jp_sub_model_ids: this.ruleForm.compete_model_ids.join(','),  //竞品子车型id，多个用`,`方法分开
          type: '3'                                                     //比较价格
        }, (response) => {
          this.accessories=[];
          for(let x in response.data){
            let parts = response.data[x].parts;
            for(let y in parts){
              this.accessories.push(parts[y]);
            }
          }
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
      GET_SEARCH_DATA(searchType,formName,searchPage) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.searchType = searchType;
            this.searchPage = searchPage?1:this.searchPage;
            this.$request.get(this.$interface.GET_COST_HOURLY_WAGES, {
              header: {token: this.token},                                  //通行令牌
              ym: this.this_year_month || '201801',                         //当前数据年月
              bp_sub_model_id: this.ruleForm.model_id,                      //本品子车型id
              jp_sub_model_ids: this.ruleForm.compete_model_ids.length
                ? this.ruleForm.compete_model_ids.join(',') : '',           //竞品子车型id
              part_ids: this.ruleForm.part_ids.length
                ? this.ruleForm.part_ids.join(',') : '',                    //配件id
              page: this.searchPage,                                        //页数
              rows: this.page_size                                          //每页条数
            }, (response) => {
              var searchData = []
              , data = response.data[0].list || [];
              this.searchRecords = response.data[0].total;
              data.map( row => {
                var children = row.hourly_wages || {}
                if (!!children && children.length > 0) {
                  children.map( item => {
                    searchData.push(Object.assign(item, {
                      'sub_model_id':row.sub_model_id,
                      'sub_model_name':row.sub_model_name
                    }))
                  })
                }
              })
              this.searchData = searchData;
              this.firstLoad = false;
              this.loading = false;
            }, this.failure);
          } else {
            return false;
          }
        })
      }

    },
    components:{
      BiBar,
      BiPanel,
      BiEmpty
    }
  }
</script>
