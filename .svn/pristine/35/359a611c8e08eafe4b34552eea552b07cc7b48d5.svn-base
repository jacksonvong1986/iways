<template>

  <div class="msg panel">
    <h1>
      消息类别
      <span>
        <el-button type="primary" size="medium" @click="dialogVisible = true">添加类别</el-button>
      </span>
      <el-dialog
        title="消息类别"
        :visible.sync="dialogVisible"
        width="700px"
        :modal-append-to-body = "true"
        :append-to-body = "true">
        <el-form :model="form" :rules="rules" ref="form" label-width="92px" class="popup-cont">
          <el-form-item label="类别名称：" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="类别排序：" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="状态：" prop="resource">
            <el-radio-group v-model="form.name">
              <el-radio label="可用"></el-radio>
              <el-radio label="不可用"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="success" size="small">保存编辑</el-button>
            <el-button size="small">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </h1>
    <div class="result">
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          label="日期">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button @click="dialogVisible = true" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="$router.push({path: '/feedback/list'})">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    name: '',
    data() {
      return {
        value: '',
        dialogVisible: false,
        form:{
          name: ''
        },
        rules:{},
        tableData3: [
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-08',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-06',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-07',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }],
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "~@admin/assets/scss/common";
  @import "~@admin/assets/scss/style";
</style>
