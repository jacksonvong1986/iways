<template>
  <div class="shouhou panel">
    <h1>
      类别管理
      <span>
          <el-button type="primary" size="medium" @click="add()">添加类别</el-button>
      </span>
      <el-dialog
        :title="ruleForm['id'] ? '查看' : '添加'"
        :visible.sync="dialogVisible"
        width="700px"
        :modal-append-to-body = "true"
        :append-to-body = "true">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm popup-cont">
          <el-form-item label="类别名称" prop="type_name">
            <el-input v-model="ruleForm.type_name" placeholder="请输入类别名称" :disabled="if_disabled"></el-input>
          </el-form-item>
          <el-form-item label="类别描述" prop="type_desc">
            <el-input v-model="ruleForm.type_desc" placeholder="请输入类别描述" type="textarea" :disabled="if_disabled"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="desc">
            <el-checkbox v-model="toTop" :disabled="if_disabled">置顶</el-checkbox>
          </el-form-item>
          <el-form-item label="排序编号" prop="id">
            <el-input v-model="sort" placeholder="请输入排序编号" type="number" :disabled="sort_disabled"></el-input>
          </el-form-item>
          <el-form-item>
            <el-radio-group v-model="ruleForm.state" :disabled="if_disabled">
              <el-radio :label="1">所有客户可见</el-radio>
              <el-radio :label="2">指定客户可见</el-radio>
              <el-radio :label="3">隐藏</el-radio>
              <el-radio :label="4">删除</el-radio>
            </el-radio-group>

          </el-form-item>
          <div class="popup-btn" v-if="if_disabled">
            <el-button @click="dialogVisible=false" type="" size="small">关闭</el-button>
          </div>
          <div class="popup-btn" v-else>
            <input type="hidden" v-if="ruleForm.id" v-model="ruleForm.id" name="id" />
            <el-button @click="save('ruleForm')" type="success" size="small">保存数据</el-button>
            <el-button @click="dialogVisible=false" type="" size="small">取消编辑</el-button>
          </div>
        </el-form>
      </el-dialog>
    </h1>
    <div class="result">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          :index="indexMethod"
          width="100px">
        </el-table-column>
        <el-table-column
          prop="id"
          label="类别ID"
          width="100px">
        </el-table-column>
        <el-table-column
          prop="type_name"
          width="100px"
          label="类别">
        </el-table-column>
        <el-table-column
          prop="type_desc"
          label="描述"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          width="180px"
          label="状态">
          <template slot-scope="scope">
            <em :class="[scope.row.state==3?'font-ban':'font-allow']">{{ status[scope.row.state] }}</em>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100px">
          <template slot-scope="scope">
            <el-button @click="look(scope.row.id)" type="text" size="small">查看</el-button>
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
        :page-size="rows"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import mixin from '@admin/config/mixin.js'
  export default {
    name: 'Group',
    mixins: [mixin],
    data() {
      return {
        dialogVisible: false,
        tableData: [],
        checked_ids: [],
        toTop: false,
        if_disabled: false,//表单是否禁用
        sort_disabled: false,//排序编号是否禁用
        sort: '',
        startRow: '',
        ruleForm: {
          id: '',
          type_name: '',
          type_desc: '',
          ordinal: '',
          state: 1,
        },
        status: {
          '1': '所有客户可见',
          '2': '指定客户可见',
          '3': '隐藏',
          '4': '删除'
        },
        rules: {
          type_name: [
            { required: true, message: '请输入类别名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ]
        },
        page: 1,
        total: 0,
        rows: 10
      }
    },
    mounted() {
      this.getToken(() => {
        this.getList()
      })
    },
    watch: {
      toTop(curVal,oldVal){
        if(curVal){
          this.ruleForm.ordinal=-1;
          this.sort_disabled=true
        }else{
          this.ruleForm.ordinal=this.sort;
          this.sort_disabled=false
        }
      },
      sort(curVal,oldVal){
        this.ruleForm.ordinal = curVal
      },
    },
    methods: {
      getList(page = 1) {
        this.page = page
        this.$request.get(this.$interface.REPORT_TYPES, {
          header: {token: this.token},
          page: this.page,
          rows: this.rows,
        }, (response) => {
          this.startRow = response.data[0].startRow
          this.tableData = response.data[0].list
          this.total = response.data[0].total
        }, this.failure)
      },
      indexMethod(index) {
        return this.startRow+index
      },
      add() {
        this.clearValidate('ruleForm');
        this.dialogVisible = true;
        this.toTop = false;
        this.if_disabled = false;
        this.sort_disabled = false;
        this.sort = '';
        this.ruleForm = {
          id: '',
          type_name: '',
          type_desc: '',
          ordinal: '',
          state: 1,
        }
      },
      look(id) {
        this.clearValidate('ruleForm')
        this.if_disabled = true;
        this.sort_disabled = true;
        this.$request.get(this.$interface.MANAGE_REPORT_TYPE, {
          header: {token: this.token},
          id: id,
        }, (response) => {
          for (var x in this.ruleForm) {
            if (response.data[0].hasOwnProperty(x)) {
              this.ruleForm[x] = response.data[0][x]
            }
          }
          if(this.ruleForm.ordinal==-1){
            this.toTop=true
          }
          else{
            this.sort=this.ruleForm.ordinal
          }
          this.dialogVisible = true
        }, this.failure)
      },
      save(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var params = Object.assign({}, {
              header: {token: this.token},
            }, this.ruleForm)
            this.$request.post(this.$interface.MANAGE_REPORT_TYPE, params, (response) => {
              this.dialogVisible = false
              this.getList()
              this.$message({
                type: 'success',
                message: '添加类别成功'
              })
            }, (response) => {
              this.dialogVisible = false;
              this.$message({
                type: 'error',
                message: response.result_msg
              })
            })
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
