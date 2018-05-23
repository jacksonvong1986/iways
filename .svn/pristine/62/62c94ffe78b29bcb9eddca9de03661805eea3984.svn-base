<template>
  <div class="account panel">
    <h1>
      角色管理
      <span>
        <el-button v-if="!!privileges.includes('/role/add')" type="primary" size="medium" @click="addRole()">添加角色</el-button>
        <el-button v-if="!!privileges.includes('/role/del')" size="medium" @click="dataUpdate({field:'delete', value:0, action:classuri + 'del'})">删除角色</el-button>
      </span>
      <el-dialog
        :title="ruleForm['role_id'] ? '编辑角色' : '添加角色'"
        :visible.sync="dialogVisible"
        width="700px"
        :modal-append-to-body = "true"
        :append-to-body = "true">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="104px" class="popup-cont">
          <el-form-item label="父级分组：" prop="group_ids">
            <el-cascader
              :options="optionsSelected"
              :props="propsSelected"
              v-model="ruleForm.group_ids"
              change-on-select
            ></el-cascader>
          </el-form-item>
          <el-form-item label="角色名称：" prop="role_name">
            <el-input v-model="ruleForm.role_name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述：" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <input type="hidden" v-if="ruleForm.role_id" v-model="ruleForm.role_id" name="role_id" />
            <el-button type="success" size="small" @click="save('ruleForm')">保存编辑</el-button>
            <el-button size="small" @click="dialogVisible=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </h1>
    <div class="search">
      <span>
        选择分组<br>
        <el-cascader
          :options="[{group_id:'', group_name:'全部'}, ...optionsSelected]"
          :props="propsSelected"
          v-model="group_ids"
          @change="changeGroup"
          change-on-select>
        </el-cascader>
      </span>
      <span>
        查询所有角色请留空<br>
        <el-input placeholder="请输入内容" v-model="role_name"></el-input>
      </span>
      <el-button type="primary" icon="el-icon-search" size="medium" style="margin-top: 27px;" @click="getList()">检索</el-button>
    </div>
    <div class="result">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          width="70px"
          label="排序"
          :render-header="renderHeader">
          <template slot-scope="scope"><el-input :name="'_'+scope.row.role_id" :value="scope.row.sort" v-model="scope.row.sort"  size="mini"></el-input></template>
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="角色名称"
          width="120px">
        </el-table-column>
        <el-table-column
          prop="groupFrom.group_name"
          label="所属组"
          >
        </el-table-column>
        <el-table-column
          prop="user.username"
          label="所有者"
          width="120px">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="角色描述"
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
          width="200px">
          <template slot-scope="scope">
            <el-button v-if="!!privileges.includes('/role/edit')" type="text" size="small" @click="edit(scope.row.role_id)">编辑 </el-button>
            <el-button v-if="!!privileges.includes('/allot/apply')" type="text"><a class="font-blue-d" :href="'#/allot?role_id='+scope.row.role_id+'&spm='+spm" type="text" size="small">授权</a></el-button>
            <el-button v-if="!!privileges.includes('/role/forbid')&&scope.row.status==1" @click="dataUpdate({update:scope.row.role_id, field:'status', value:0, action:classuri + 'forbid'})" type="text" size="small">禁用</el-button>
            <el-button v-else-if="!!privileges.includes('/role/resume')" @click="dataUpdate({update:scope.row.role_id, field:'status', value:1, action:classuri + 'resume'})" type="text" size="small">启用</el-button>
            <el-button v-if="!!privileges.includes('/role/del')" @click="dataUpdate({update:scope.row.role_id, field:'delete', value:0, action:classuri + 'del'})" type="text" size="small">删除</el-button>
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
    name: '',
    mixins: [mixin],
    data() {
      return {
        //element 参数 可删除
        dialogVisible: false,
        multipleSelection: [],

        ruleForm:{
          group_ids:[],
          sort:'',
          role_id:'',
          role_name:'',
          desc:'',
        },
        rules:{
          group_ids: [
            { required: true, message: '请选择所属分组', trigger: 'blur' }
          ],
          role_name: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
        },
        role_name:'',
        group_ids: [''],
        group_id: '',
        optionsSelected:[],
        propsSelected: {
          value: 'group_id',
          label: 'group_name',
          children: '_sub_',
        },
        classuri: '/ajax/role/',
        tableData: [],
        page: 1,
        total: 0,
      }
    },
    computed:{

    },
    mounted() {
      this.getToken(() => {
        this.getList()
      })
    },
    methods: {
      renderHeader (h) {
        return [h('button', {on: {click: this.clickTableSort}, class:'button-sort'}, ['排序'])]
      },
      clickTableSort(){
        var that = this, sort_ids = {}
          , sorts = document.querySelectorAll('[name^="_"]')
        for (var i = 0 ; i < sorts.length ; i++) {
          sort_ids[sorts[i].name] = sorts[i].value
        }
        var URL = this.$interface.ROLE_LIST + '?' + this.$helper.queryEncoded({spm: this.spm, token: this.token})
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
      getList(page = 1) {
        this.page = page
        this.$request.get(this.$interface.ROLE_LIST, {
          group_id:  this.group_id,
          role_name: this.role_name,
          page: this.page,
          spm: this.spm,
          token: this.token,
        }, (response) => {
          this.tableData = response.data.list
          this.total = response.data.page.total
          this.optionsSelected = response.data.groups
        }, this.failure)
      },
      save(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var method = !this.ruleForm['role_id'] ? 'ADD' : 'EDIT'
            , params = Object.assign({}, {
              spm: this.spm,
              token: this.token,
            }, this.ruleForm);
            params['group_id'] = params['group_ids'][params['group_ids'].length-1]
            delete params['group_ids']
            this.$request.post(this.$interface['ROLE_'+method], params, (response) => {
              this.dialogVisible = false
              this.getList();
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
      addRole() {
        this.clearValidate('ruleForm')
        this.$request.get(this.$interface.ROLE_ADD, {
          token: this.token,
          spm: this.spm,
        }, (response) => {
          this.ruleForm = {
            group_ids: response.data.group_ids,
            desc: '',
            role_name: '',
          }
          this.dialogVisible = true;
        }, this.failure)
      },
      edit(role_id) {
        this.clearValidate('ruleForm');
        this.$request.get(this.$interface.ROLE_EDIT, {
          spm: this.spm,
          token: this.token,
          role_id: role_id,
        }, (response) => {
          this.ruleForm = {
            group_ids: response.data.group_ids,
            role_id:'',
            desc: '',
            role_name: '',
          };
          for (var x in this.ruleForm) {
            if (response.data.hasOwnProperty(x)) {
              this.ruleForm[x] = response.data[x]
            }
          }
          this.dialogVisible = true
        }, this.failure)
      },
      changeGroup(val) {
        if ( val.length > 0) {
         this.group_id = val[val.length - 1];
         this.getList();
        }
        else if (val.length == 0) {
          this.group_id = val;
          this.getList();
        }
      },
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  @import "~@admin/assets/scss/common";
  @import "~@admin/assets/scss/style";
</style>
