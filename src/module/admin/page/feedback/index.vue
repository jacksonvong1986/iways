<template>

  <div class="feedback panel">
    <h1>
      反馈列表
    </h1>
    <div class="search">
      <span>
        请选择问题状态<br>
        <el-select v-model="value" placeholder="默认显示未处理">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </span>
      <span>
        请选择问题类型<br>
        <el-select v-model="value" placeholder="全部">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </span>
      <span>
        按消息对象、发布人<br>
        <el-input placeholder="按消息对象、发布人"></el-input>
      </span>
      <el-button type="primary" icon="el-icon-search" size="medium" style="margin-top: 27px;">检索</el-button>
    </div>
    <div class="result">
      <el-dialog
        title="反馈详情"
        :visible.sync="dialogVisible"
        width="700px"
        :modal-append-to-body = "true"
        :append-to-body = "true">
        <div class="popup-cont">
          <div>123</div>
          <div class="popup-btn">
            <el-button type="success" size="small">提交</el-button>
            <el-button type="" size="small">取消</el-button>
          </div>
        </div>
      </el-dialog>
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
            <el-button @click="" type="text" size="small">隐藏</el-button>
            <el-button type="text" size="small" @click="$router.push({path: '/feedback/detail'})">查看</el-button>
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
        options: [],
        dialogVisible: false,
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
