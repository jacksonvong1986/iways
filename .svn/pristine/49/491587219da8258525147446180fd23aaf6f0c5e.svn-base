<template>
  <div class="account panel">
    <h1>
      系统操作日志
      <span>
          <el-button size="medium" @click="dataUpdate({field:'delete', value:0, action:classuri + 'del'})">删除日志</el-button>
      </span>
    </h1>
    <div class="search">
      <span>
        选择行为<br>
         <el-select v-model="action">
           <el-option label="全部" value=""></el-option>
           <el-option v-for="item in actions" :key="item" :label="item" :value="item"></el-option>
         </el-select>
        </el-select>
      </span>
      <span>
        操作者<br>
        <el-input v-model="username" placeholder="请输入操作者"></el-input>
      </span>
      <span>
        操作内容<br>
        <el-input v-model="content" placeholder="请输入操作内容"></el-input>
      </span>
      <el-button type="primary" icon="el-icon-search" size="medium" style="margin-top: 27px;" @click="getList()">检索</el-button>
    </div>
    <div class="result">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          prop="username"
          label="操作者">
        </el-table-column>
        <el-table-column
          prop="node"
          label="节点">
        </el-table-column>
        <el-table-column
          prop="action"
          label="行为">
        </el-table-column>
        <el-table-column
          label="操作内容">
          <template slot-scope="scope">{{scope.row.content}}</template>
        </el-table-column>
        <el-table-column
          prop="create_at"
          label="操作时间">
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
    name: 'Log',
    mixins: [mixin],
    data() {
      return {
        classuri: this.$interface.LOG + '/',
        dialogVisible: false,
        actions: [],
        action: '',
        username: '',
        content: '',
        tableData: [],
        checked_ids: [],
        is_view: false,
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
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
      },
      handleSelectionChange(val) {
        this.checked_ids = val.map((item) => {return item.id})
      },
      getList(page = 1) {
        this.page = page
        this.$request.get(this.$interface.LOG_LIST, {
          action: this.action,
          username: this.username,
          content: this.content,
          page: this.page,
          spm: this.spm,
          token: this.token,
        }, (response) => {
          this.tableData = response.data.list
          this.actions = response.data.actions
          this.total = response.data.page.total
        })
      },
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  @import "~@admin/assets/scss/common";
  @import "~@admin/assets/scss/style";
</style>
