<template>

	<div class="article panel">
    <h1>
      文章列表
      <span>
        <el-button type="primary" size="medium" @click="dialogVisible = true">添加文章</el-button>
      </span>
      <el-dialog
        title="智能推送"
        :visible.sync="dialogVisible"
        width="700px"
        :modal-append-to-body = "true"
        :append-to-body = "true">
        <el-form :model="form" :rules="rules" ref="form" label-width="92px" class="popup-cont">
          <el-form-item label="标题：" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="排序：" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="文章内容：" prop="desc">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="文章管理：" prop="resource">
            <el-radio-group v-model="form.name">
              <el-radio label="可见"></el-radio>
              <el-radio label="隐藏"></el-radio>
              <el-radio label="删除"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="success" size="small">保存编辑</el-button>
            <el-button size="small">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </h1>
    <div class="search">
      <span>
        选择账号组<br>
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </span>
      <span style="max-width: 420px; width: 420px;">
        请选择时间<br>
        <el-date-picker
           style="width: 100%"
           v-model="value4"
           type="datetimerange"
           :picker-options="pickerOptions2"
           range-separator="至"
           start-placeholder="开始日期"
           end-placeholder="结束日期"
           align="right">
        </el-date-picker>
      </span>
      <span>
        按ID、发布人<br>
        <el-input placeholder="请输入内容"></el-input>
      </span>
       <el-button type="primary" icon="el-icon-search" size="medium" style="margin-top: 27px;">检索</el-button>
    </div>
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
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
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
        form:{
          name:''
        },
        rules:{},
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
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
