<template>
	<div class="shouhou panel">
    <h1>
      报表管理
      <span>
          <el-button type="primary" size="medium" @click="$router.push({path:'/shouhou/upload', query: {spm: spm}})">上传文件</el-button>
      </span>
    </h1>
    <div class="search">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" :inline="true" class="demo-form-inline" label-position="top">
        <span style="width:360px">
          <el-form-item label="日期" prop="post_time">
            <el-date-picker
              v-model="ruleForm.post_time"
              type="daterange"
              align="right"
              unlink-panels
              format="yyyy-MM-dd"
              value-format="yyyyMMdd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </span>
        <span>
          <el-form-item label="按收费类型" prop="charge_type">
            <el-select v-model="ruleForm.charge_type" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </span>
        <span>
          <el-form-item label="报表名称" prop="contributor">
            <el-input placeholder="请输入用户名" v-model="ruleForm.contributor"></el-input>
          </el-form-item>
        </span>
        <el-button type="primary" icon="el-icon-search" size="medium" style="margin-top: 27px;" @click="getList()">检索</el-button>
      </el-form>
    </div>
    <div class="result">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        style="width: 100%"
        >
        <el-table-column
          type="index"
          label="序号">
        </el-table-column>
        <el-table-column
          width="90"
          prop="id"
          label="文件ID">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="160">
        </el-table-column>
        <el-table-column
          width="70"
          label="大小">
          <template slot-scope="scope">{{ scope.row.size | number_format(2) }}M</template>
        </el-table-column>
        <el-table-column
          prop="extension"
          label="格式"
          width="80px">
        </el-table-column>
        <el-table-column
          label="收费"
          width="80px">
          <template slot-scope="scope">{{ charge_types[scope.row.charge_type] || '' }}</template>
        </el-table-column>
        <el-table-column
          prop="type_name"
          label="类别"
          width="80px">
        </el-table-column>
        <el-table-column
          label="所属"
          width="120px"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.manf }} {{ scope.row.version }}</template>
        </el-table-column>
        <el-table-column
          prop="download_count"
          label="下载次数"
          width="80px">
        </el-table-column>
        <el-table-column
          width="80px"
          label="状态">
          <template slot-scope="scope">
            <em :class="[scope.row.status==0?'font-ban':'font-allow']">{{ status[scope.row.status] }}</em>
          </template>
        </el-table-column>
        <el-table-column
          prop="contributor"
          label="发布人">
        </el-table-column>
        <el-table-column
          width="120px"
          label="日期">
          <template slot-scope="scope">{{ scope.row.post_time | date_format }}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200px">
          <template slot-scope="scope">
            <el-button v-if="!!privileges.includes('/group/edit')" @click="$router.push({path:'/shouhou/view', query: {id: scope.row.id, spm: spm}})" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-box">
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        @current-change="getList"
        :current-page.sync="page"
        :page-size="20"
        :total="total">
      </el-pagination>
    </div>
	</div>
</template>

<script type="text/ecmascript-6">
  import mixin from '@admin/config/mixin.js'
	export default {
		name: 'ShouhouList',
    mixins: [mixin],
		data() {
			return {
        classuri: '/ajax/group/',
        dialogVisible: false,
        group_name: '',
        tableData: [],
        checked_ids: [],
        charge_type: '',
        options: [{
          label: '免费',
          value: 1,
        }, {
          label: '收费',
          value: 2,
        }],
        ruleForm: {
          post_time: [],
          charge_type: 1,
          contributor: '',
        },
        rules: {
        },
        optionsSelected: [],
        propsSelected: {
          value: 'group_id',
          label: 'group_name',
          children: '_sub_',
        },
        page: 1,
        page_size: 20,
        total: 0,
      }
		},
    computed: {
      charge_types() {
        var charge_types = {}
        this.options.map(item => {
          charge_types[item.value] = item.label
        })
        return charge_types
      }
    },
    mounted() {
      this.getToken(() => {
        this.getList()
      })
    },
    methods: {
      clickTableSort(){
        var that = this, sort_ids = {}
        , sorts = document.querySelectorAll('[name^="_"]')
        for (var i = 0 ; i < sorts.length ; i++) {
          sort_ids[sorts[i].name] = sorts[i].value
        }
        var URL = this.$interface.GROUP_LIST + '?' + this.$helper.queryEncoded({spm: this.spm, token: this.token})
        this.$request.post(URL, Object.assign({}, {
          action: 'resort',
        }, sort_ids), (response) => {
          this.$message({
            type: 'success',
            message: response.msg,
            onClose() {
              that.getList()
            }
          })
        })
      },
      handleSelectionChange(val) {
        this.checked_ids = val.map((item) => {return item.group_id})
      },
      getList(page = 1) {
        this.$refs['ruleForm'].validate(valid => {
          this.page = page
          var params = {
            header: {token: this.token},
            page: this.page,
            rows: this.page_size,
            start_ymd: this.ruleForm.post_time&&this.ruleForm.post_time.length == 2 ? this.ruleForm.post_time[0] : '',
            end_ymd: this.ruleForm.post_time&&this.ruleForm.post_time.length == 2 ? this.ruleForm.post_time[1] : '',
            charge_type: this.ruleForm.charge_type,
            id_contributor: this.ruleForm.contributor,
          }
          this.$request.get(this.$interface.GET_FILE_REPORT_LIST, params, (response) => {
            let data = response.data[0]
            this.tableData = data.list
            this.total = data.total
          }, this.failure)
        })
      },
      add() {
        this.clearValidate('ruleForm')
        this.$request.get(this.$interface.GROUP_ADD, {
          token: this.token,
          spm: this.spm,
        }, (response) => {
          this.optionsSelected = response.data.groups
          this.ruleForm = {
            pids: [],
            group_id: '',
            group_name: '',
            desc: '',
          }
          this.dialogVisible = true
        }, this.failure)
      },
      edit(group_id) {
        this.clearValidate('ruleForm')
        this.$request.get(this.$interface.GROUP_EDIT, {
          group_id: group_id,
          token: this.token,
          spm: this.spm,
        }, (response) => {
          this.optionsSelected = response.data.groups
          for (var x in this.ruleForm) {
            if (response.data.hasOwnProperty(x)) {
              this.ruleForm[x] = response.data[x]
            }
          }
          this.dialogVisible = true
        }, this.failure)
      },
      save(formName) {
        var that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var method = !this.ruleForm['group_id'] ? 'ADD' : 'EDIT'
            , params = Object.assign({}, {
              token: this.token,
              spm: this.spm,
            }, this.ruleForm)
            params['pid'] = params['pids'][params['pids'].length-1]
            delete params['pids']
            this.$request.post(this.$interface['GROUP_'+method], params, (response) => {
              this.dialogVisible = false
              this.getList()
              this.$message({
                type: 'success',
                message: response.msg
              })
            }, (response) => {
              this.$message({
                type: 'error',
                message: response.msg
              })
            }, this.failure)
          } else {
            return false;
          }
        });
      },
    }
	}
</script>
<style lang="scss" type="text/scss" scoped>
  @import "~@admin/assets/scss/common";
  @import "~@admin/assets/scss/style";
</style>
