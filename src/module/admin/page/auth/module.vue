<template>
  <div class="auth panel">
    <h1>
      模块管理
      <span>
          <el-button v-if="!!privileges.includes('/menu/add')" type="primary" size="medium" @click="add()">添加模块</el-button>
          <el-button v-if="!!privileges.includes('/menu/del')" size="medium" @click="dataUpdate({field:'delete', value:0, action:classuri + 'del'})">删除模块</el-button>
      </span>
      <el-dialog
        :title="ruleForm['group_id'] ? '编辑模块' : '添加模块'"
        :visible.sync="dialogVisible"
        width="700px"
        :modal-append-to-body = "true"
        :append-to-body = "true">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="popup-cont">
          <el-form-item label="父级模块：" prop="pids">
            <el-cascader
              :options="optionsSelected"
              :props="propsSelected"
              v-model="ruleForm.pids"
              change-on-select
            ></el-cascader>
          </el-form-item>
          <el-form-item label="模块名：" prop="title">
            <el-input v-model="ruleForm.title" placeholder="请输入模块名"></el-input>
          </el-form-item>
          <el-form-item label="模块链接：" prop="url">
            <el-input v-model="ruleForm.url" placeholder="请输入模块链接"></el-input>
          </el-form-item>
          <el-form-item label="模块图标：" prop="icon">
            <el-input v-model="ruleForm.icon" placeholder="请输入模块图标"></el-input>
          </el-form-item>
          <input type="hidden" v-if="ruleForm.id" v-model="ruleForm.id" name="group_id" />
          <el-button @click="save('ruleForm')" type="success" size="small">保存数据</el-button>
          <el-button @click="dialogVisible=false" type="" size="small">取消编辑</el-button>
        </el-form-item>
        </el-form>
      </el-dialog>
    </h1>

    <div>
      <tree-table :data="tableData" :columns="columns" :evalFunc="func" :evalArgs="args" :expandAll="expandAll">
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          width="90px"
          label="排序"
          :render-header="renderHeader">
          <template slot-scope="scope"><el-input :name="'_'+scope.row.id" :value="scope.row.sort" size="mini"></el-input></template>
        </el-table-column>
        <el-table-column
          width="80px"
          label="图标">
          <template slot-scope="scope"><i class="iconfont" :class="[ scope.row.icon ? scope.row.icon : 'el-icon-location-outline']"></i></template>
        </el-table-column>
        <el-table-column
          label="菜单名称">
          <template slot-scope="scope"><span v-html="scope.row.spl+scope.row.title"></span></template>
        </el-table-column>
        <el-table-column
          prop="url"
          label="菜单链接"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          width="80px"
          label="状态">
          <template slot-scope="scope"><font :class="[ scope.row.status == 0 ? 'font-ban' : 'font-allow']">{{ status[scope.row.status] }}</font></template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button v-if="!!privileges.includes('/menu/edit')" @click="edit(scope.row.id)" type="text" size="small">编辑</el-button>
            <el-button v-if="!!privileges.includes('/menu/forbid')&&scope.row.status==1" @click="dataUpdate({update:scope.row.id, field:'status', value:0, action:classuri + 'forbid'})" type="text" size="small">禁用</el-button>
            <el-button v-else-if="!!privileges.includes('/menu/resume')" @click="dataUpdate({update:scope.row.id, field:'status', value:1, action:classuri + 'resume'})" type="text" size="small">启用</el-button>
            <el-button v-if="!!privileges.includes('/menu/del')" @click="dataUpdate({update:scope.row.id, field:'delete', value:0, action:classuri + 'del'})" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </tree-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import mixin from '@admin/config/mixin'
  import treeTable from '@/components/TreeTable'
  import treeToArray from '@/components/TreeTable/customEval'

  export default {
    name: 'Module',
    mixins: [mixin],
    data() {
      return {
        classuri: '/ajax/module/',
        dialogVisible:false,
        tableData: [],
        checked_ids: [],
        ruleForm: {
          pids: [],
          id: '',
          title: '',
          url: '',
          icon: '',
        },
        rules:{
          pids: [
            { required: true, message: '请选择父级模块', trigger: 'change' },
          ],
          title: [
            { required: true, message: '请输入模块名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
        },
        optionsSelected:[],
        propsSelected: {
          value: 'id',
          label: 'title',
          children: 'sub',
        },
        func: treeToArray,
        expandAll: false,
        args: [null, null, 'icon'],
        columns: [
          {
            text: 'ID',
            value: 'id',
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
        var URL = this.$interface.MODULE_LIST + '?' + this.$helper.queryEncoded({spm: this.spm, token: this.token})
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
        }, this.failure)
      },
      handleSelectionChange(val) {
        this.checked_ids = val.map((item) => {return item.id})
      },
      getList() {
        this.$request.get(this.$interface.MODULE_LIST, {
          token: this.token,
          spm: this.spm,
        }, (response) => {
          this.tableData = response.data.list
        }, this.failure)
      },
      add() {
        this.clearValidate('ruleForm')
        this.$request.get(this.$interface.MODULE_ADD, {
          token: this.token,
          spm: this.spm,
        }, (response) => {
          this.optionsSelected = [{id:0,title:'顶级模块'}, ...response.data.menus]
          this.ruleForm = {
            pids: [],
            id: '',
            title: '',
            url: '',
            icon: '',
          }
          this.dialogVisible = true
        }, this.failure)
      },
      edit(id) {
        this.clearValidate('ruleForm')
        this.$request.get(this.$interface.MODULE_EDIT, {
          id: id,
          token: this.token,
          spm: this.spm,
        }, (response) => {
          this.optionsSelected = [{id:0,title:'顶级模块'}, ...response.data.menus]
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
            params['pid'] = params['pids'][params['pids'].length-1]
            delete params['pids']
            this.$request.post(this.$interface['MODULE_'+method], params, (response) => {
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
    },
    components: { treeTable },
  }
</script>
<style lang="scss" type="text/scss" scoped>
  @import "~@admin/assets/scss/common";
  @import "~@admin/assets/scss/style";

</style>
