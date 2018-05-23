<template>
	<div class="account panel">
    <h1>
      组管理
      <span>
          <el-button v-if="!!privileges.includes('/group/add')" type="primary" size="medium" @click="add()">添加组</el-button>
          <el-button v-if="!!privileges.includes('/group/del')" size="medium" @click="dataUpdate({field:'delete', value:0, action:classuri + 'del'})">删除组</el-button>
      </span>
      <el-dialog
        :title="ruleForm['group_id'] ? '编辑' : '添加'"
        :visible.sync="dialogVisible"
        width="700px"
        :modal-append-to-body = "true"
        :append-to-body = "true">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="92px" class="demo-ruleForm popup-cont">
          <el-form-item label="父级分组" prop="pids">
            <el-cascader
              :options="optionsSelected"
              :props="propsSelected"
              v-model="ruleForm.pids"
              change-on-select
            ></el-cascader>
          </el-form-item>
          <el-form-item label="分组名称" prop="group_name">
            <el-input v-model="ruleForm.group_name" placeholder="请输入分组名称"></el-input>
          </el-form-item>
          <el-form-item label="分组描述" prop="desc">
            <el-input v-model="ruleForm.desc" placeholder="请输入分组描述" type="textarea"></el-input>
          </el-form-item>
          <div class="popup-btn">
            <input type="hidden" v-if="ruleForm.group_id" v-model="ruleForm.group_id" name="group_id" />
            <el-button @click="save('ruleForm')" type="success" size="small">保存数据</el-button>
            <el-button @click="dialogVisible=false" type="" size="small">取消编辑</el-button>
          </div>
        </el-form>
      </el-dialog>
    </h1>
    <div class="search">
      <span>
        分组名称<br>
        <el-input placeholder="请输入分组名称" v-model="group_name" @change="getList()"></el-input>
      </span>
      <el-button type="primary" icon="el-icon-search" size="medium" style="margin-top: 27px;" @click="getList()">检索</el-button>
    </div>
    <div class="result">
      <tree-table :data="tableData" :columns="columns" :evalFunc="func" :evalArgs="args" :expandAll="expandAll"
        ref="multipleTable"
        tooltip-effect="dark"
        :selectionChange="handleSelectionChange"
        style="width: 100%"
        >
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          width="90px"
          label="排序"
          :render-header="renderHeader"
        >
          <template slot-scope="scope"><el-input :name="'_'+scope.row.group_id" :value="scope.row.sort" size="mini"></el-input></template>
        </el-table-column>
        <el-table-column
          prop="group_id"
          label="分组ID"
          width="100px">
        </el-table-column>
        <el-table-column
          prop="group_name"
          width="140px"
          label="分组名称">
        </el-table-column>
        <el-table-column
          prop="user.username"
          label="所有者"
          width="80px"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="desc"
          label="描述"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          width="80px"
          label="状态">
          <template slot-scope="scope">
            <em :class="[scope.row.status==0?'font-ban':'font-allow']">{{ status[scope.row.status] }}</em>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200px">
          <template slot-scope="scope">
            <el-button v-if="!!privileges.includes('/group/edit')" @click="edit(scope.row.group_id)" type="text" size="small">编辑</el-button>
            <el-button v-if="!!privileges.includes('/allot/apply')" type="text"><a class="font-blue-d" :href="'#/allot?group_id='+scope.row.group_id+'&spm='+spm" type="text" size="small">授权</a></el-button>
            <el-button v-if="!!privileges.includes('/group/forbid')&&scope.row.status==1" @click="dataUpdate({update:scope.row.group_id, field:'status', value:0, action:classuri + 'forbid'})" type="text" size="small">禁用</el-button>
            <el-button v-else-if="!!privileges.includes('/group/resume')" @click="dataUpdate({update:scope.row.group_id, field:'status', value:1, action:classuri + 'resume'})" type="text" size="small">启用</el-button>
            <el-button v-if="!!privileges.includes('/group/del')" @click="dataUpdate({update:scope.row.group_id, field:'delete', value:0, action:classuri + 'del'})" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </tree-table>
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
  import treeTable from '@/components/TreeTable'
  import treeToArray from '@/components/TreeTable/customEval'
	export default {
		name: 'Group',
    mixins: [mixin],
    components: { treeTable },
		data() {
			return {
        classuri: '/ajax/group/',
        dialogVisible: false,
        group_name: '',
        tableData: [],
        checked_ids: [],
        ruleForm: {
          pids: [],
          group_id: '',
          group_name: '',
          desc: '',
        },
        rules: {
          pids: [
            { required: true, message: '请选择父级分组', trigger: 'blur' },
          ],
          group_name: [
            { required: true, message: '请输入分组名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          desc: [
            { required: false, message: '请填写分组描述', trigger: 'blur' }
          ]
        },
        optionsSelected: [],
        propsSelected: {
          value: 'group_id',
          label: 'group_name',
          children: '_sub_',
        },
        page: 1,
        total: 0,
        func: treeToArray,
        expandAll: false,
        args: [null, null, 'icon'],
        columns: [
          {
            text: 'ID',
            value: 'group_id',
            width: 120
          },
        ],
      }
		},
    mounted() {
      this.getToken(() => {
        this.getList()
      })
    },
    methods: {
      renderHeader (h) {
        return [h('button', {on: {click: this.clickTableSort},class:'button-sort'}, ['排序'])]
      },
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
        this.page = page
        this.$request.get(this.$interface.GROUP_LIST, {
          group_name: this.group_name,
          page: this.page,
          spm: this.spm,
          token: this.token,
        }, (response) => {
          this.tableData = response.data.list
          this.total = response.data.page.total
        }, this.failure)
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
