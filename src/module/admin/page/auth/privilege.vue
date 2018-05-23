<template>
  <div class="account panel">
    <h1>
      权限管理
      <span>
          <el-button v-if="!!privileges.includes('/node/add')" type="primary" size="medium" @click="add()">添加权限</el-button>
          <el-button v-if="!!privileges.includes('/node/del')" size="medium" @click="dataUpdate({field:'delete', value:0, action:classuri + 'del'})">删除权限</el-button>
      </span>
      <el-dialog
        :title="ruleForm['id'] ? '编辑权限' : '添加权限'"
        :visible.sync="dialogVisible"
        width="700px"
        :modal-append-to-body = "true"
        :append-to-body = "true">
        <div class="popup-cont">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="所属模块" prop="module_ids">
              <el-cascader
                :options="optionsSelected"
                :props="propsSelected"
                v-model="ruleForm.module_ids"
                change-on-select
              ></el-cascader>
            </el-form-item>
            <el-form-item label="权限名称" prop="title">
              <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="权限链接" prop="url">
              <el-input v-model="ruleForm.url"></el-input>
            </el-form-item>
            <el-form-item label="是否在线" prop="status">
              <el-select v-model="ruleForm.status">
                <el-option label="是" :value="1"></el-option>
                <el-option label="否" :value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="权限描述" prop="desc">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <input type="hidden" v-if="ruleForm.id" v-model="ruleForm.id" name="id" />
              <el-button @click="save('ruleForm')" type="success" size="small">保存数据</el-button>
              <el-button @click="dialogVisible=false" type="" size="small">取消编辑</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </h1>
    <div class="search">
      <span style="width: 300px">
        选择模块<br>
        <el-cascader
          :options="[{id:'',title:'全部'}, ...optionsSelected]"
          :props="propsSelected"
          v-model="module_ids"
          @change="getList">
        </el-cascader>
      </span>
      <span>
        权限名称<br>
        <el-input placeholder="请输入权限名称" v-model="privilege_name" @change="getList()"></el-input>
      </span>
      <el-button type="primary" icon="el-icon-search" size="medium" style="margin-top: 27px;" @click="getList()">检索</el-button>
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
          type="selection">
        </el-table-column>
        <el-table-column
          width="180px"
          label="模块名称">
          <template slot-scope="scope">{{ scope.row.module.name }}</template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="权限名称">
        </el-table-column>
        <el-table-column
          prop="url"
          label="权限链接"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="90px"
          >
          <template slot-scope="scope">
            <em :class="[scope.row.status==0?'font-ban':'font-allow']">{{ status[scope.row.status] }}</em>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button v-if="!!privileges.includes('/node/edit')" @click="edit(scope.row.id)" type="text" size="small">编辑</el-button>
            <el-button v-if="!!privileges.includes('/node/forbid')&&scope.row.status==1" @click="dataUpdate({update:scope.row.id, field:'status', value:0, action:classuri + 'forbid'})" type="text" size="small">禁用</el-button>
            <el-button v-else-if="!!privileges.includes('/node/resume')" @click="dataUpdate({update:scope.row.id, field:'status', value:1, action:classuri + 'resume'})" type="text" size="small">启用</el-button>
            <el-button v-if="!!privileges.includes('/node/del')" @click="dataUpdate({update:scope.row.id, field:'delete', value:0, action:classuri + 'del'})" type="text" size="small">删除</el-button>
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
  import mixin from '@admin/config/mixin'
  export default {
    name: 'Node',
    mixins: [mixin],
    data() {
      return {
        classuri: '/ajax/node/',
        dialogVisible:false,
        tableData: [],
        checked_ids: [],
        optionsSelected:[],
        propsSelected: {
          value: 'id',
          label: 'title',
          children: 'sub',
        },
        module_ids: [],
        privilege_name: '',
        ruleForm: {
          id: '',
          module_ids: [],
          title: '',
          url: '',
          status: 1,
          desc: ''
        },
        rules: {
          module_ids: [
            { required: true, message: '请输入选择模块', trigger: 'change' },
          ],
          title: [
            { required: true, message: '请输入权限名称', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          url: [
            { required: true, message: '请输入权限链接', trigger: 'blur' },
            { min: 3, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '请选择是否在线', trigger: 'change' }
          ],
          desc: [
            { required: false, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
        page: 1,
        total: 0,
      }
    },
    mounted() {
      this.getToken(() => {
        this.getList()
      })
    },
    methods: {
      handleSelectionChange(val) {
        this.checked_ids = val.map((item) => {return item.id})
      },
      getList(page = 1) {
        this.page = page
        this.$request.get(this.$interface.PRIV_LIST, {
          module_id: this.module_ids[this.module_ids.length - 1] || '',
          title: this.privilege_name,
          page: this.page,
          token: this.token,
          spm: this.spm,
        }, (response) => {
          this.tableData = response.data.list
          this.optionsSelected = response.data.modules
          this.total = response.data.page.total
        }, this.failure)
      },
      add() {
        this.clearValidate('ruleForm')
        this.$request.get(this.$interface.PRIV_ADD, {
          token: this.token,
          spm: this.spm,
        }, (response) => {
          this.ruleForm = {
            id: '',
            module_ids: [],
            title: '',
            url: '',
            status: 1,
            desc: ''
          }
          this.dialogVisible = true
        }, this.failure)
      },
      edit(id) {
        this.clearValidate('ruleForm')
        this.$request.get(this.$interface.PRIV_EDIT, {
          id: id,
          token: this.token,
          spm: this.spm,
        }, (response) => {
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
            var method = !this.ruleForm['id'] ? 'ADD' : 'EDIT'
            , params = Object.assign({}, {
              token: this.token,
              spm: this.spm,
            }, this.ruleForm)
            this.$request.post(this.$interface['PRIV_'+method], params, (response) => {
              this.dialogVisible = false
              this.getList(this.page)
              this.$message({
                type: 'success',
                message: response.msg
              })
            }, (response) => {
              this.$message({
                type: 'error',
                message: response.msg
              })
            })
          } else {
            return false;
          }
        }, this.failure);
      },
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  @import "~@admin/assets/scss/common";
  @import "~@admin/assets/scss/style";
</style>
