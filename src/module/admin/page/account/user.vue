<template>
  <div class="account panel">
    <div v-show="!is_view">
      <h1>
        帐号管理
        <span>
            <el-button v-if="!!privileges.includes('/user/add')" type="primary" size="medium" @click="add()">添加用户</el-button>
            <el-button v-if="!!privileges.includes('/user/del')" size="medium" @click="dataUpdate({field:'delete', value:0, action:classuri + 'del'})">删除用户</el-button>
        </span>
        <el-dialog
          :title="ruleForm['user_id'] ? '编辑用户' : '添加用户'"
          :visible.sync="dialogVisible"
          width="700px"
          :modal-append-to-body = "true"
          :append-to-body = "true">
          <div class="popup-cont">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
                <el-form-item label="用户账号" prop="username">
                  <el-input v-model="ruleForm.username" placeholder="请输入用户名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="联系手机" prop="phone">
                  <el-input v-model="ruleForm.phone" placeholder="请输入联系手机" clearable></el-input>
                </el-form-item>
                <el-form-item label="联系邮箱" prop="mail">
                  <el-input v-model="ruleForm.mail" placeholder="请输入联系邮箱" clearable></el-input>
                </el-form-item>
                <el-form-item label="所属分组" prop="group_ids">
                  <el-cascader
                    :options="groupOptions"
                    :props="propsSelected"
                    v-model="ruleForm.group_ids"
                    @change="changeGroup('Form')"
                    change-on-select
                  ></el-cascader>
                </el-form-item>
                <el-form-item label="所属角色" prop="role_ids">
                  <el-checkbox-group v-model="ruleForm.role_ids">
                    <el-checkbox v-for="role in rolesForm" :label="role.role_id" :key="role.role_id">{{ role.role_name }}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="用户描述" prop="desc">
                  <el-input type="textarea" v-model="ruleForm.desc" :rows="3"></el-input>
                </el-form-item>
                <el-form-item label="管理分组" prop="manage_group_ids">
                  <el-select v-model="ruleForm.manage_group_ids" multiple placeholder="请选择管理分组">
                    <el-option
                      v-for="item in groupOptions"
                      :key="item.group_id"
                      :label="item.group_name"
                      :value="item.group_id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <input type="hidden" v-if="ruleForm.user_id" v-model="ruleForm.user_id" name="user_id" />
                  <el-button type="success" size="small" @click="save('ruleForm')">保存编辑</el-button>
                  <el-button size="small" @click="dialogVisible=false">取消</el-button>
                </el-form-item>
            </el-form>
          </div>
        </el-dialog>
      </h1>
      <div class="search">
        <span>
          选择分组<br>
           <el-cascader
              :options="[{group_id:'', group_name: '全部'}, ...groupOptions]"
              :props="propsSelected"
              v-model="group_ids"
              @change="changeGroup('List')"
              change-on-select
            ></el-cascader>
        </span>
        <span>
          选择角色<br>
           <el-select v-model="role_id" :disabled="propsSelected.length>0&&!rolesList.length" @change="getList()">
            <el-option v-for="item in [{role_id:'', role_name: '全部'}, ...rolesList]" :key="item.role_id" :label="item.role_name" :value="item.role_id">
            </el-option>
          </el-select>
        </span>
        <span>
          查询所有用户请留空<br>
          <el-input v-model="username" placeholder="请输入用户名"></el-input>
        </span>
        <span>
          手机号<br>
          <el-input v-model="phone" placeholder="请输入手机号"></el-input>
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
            label="账号">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="mail"
            label="电子邮箱">
          </el-table-column>
          <el-table-column
            label="所属角色">
            <template slot-scope="scope">
              <template v-if="scope.row.roles&&scope.row.roles.length">
                <span v-for="role in scope.row.roles">{{role.role_name}}</span>
              </template>
              <span v-else>暂无可用角色</span>
            </template>
          </el-table-column>
          <el-table-column
            label="所属分组">
            <template slot-scope="scope">
              <span v-if="scope.row.groupFrom">{{scope.row.groupFrom.group_name}}</span>
              <span v-else>暂无可用分组</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="login_num"
            label="登录次数">
          </el-table-column>
          <el-table-column
            prop="login_at"
            label="最后登录">
          </el-table-column>
          <el-table-column
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button v-if="!!privileges.includes('/user/view')" @click="view(scope.row.user_id)" type="text" size="small">查看</el-button>
              <el-button v-if="!!privileges.includes('/user/edit')" @click="edit(scope.row.user_id)" type="text" size="small">编辑</el-button>
              <el-button v-if="!!privileges.includes('/allot/apply')" type="text"><a class="font-blue-d" :href="'#/allot?user_id='+scope.row.user_id+'&spm='+spm" type="text" size="small">授权</a></el-button>
              <el-button v-if="!!privileges.includes('/user/del')" @click="dataUpdate({update:scope.row.user_id, field:'delete', value:0, action:classuri + 'del'})" type="text" size="small">删除</el-button>
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
    <div v-show="is_view">
      <h1>
        帐号资料
      </h1>
      <div class="info">
        <el-card class="box-card noboder">
          <div slot="header" class="clearfix">
            <span>帐号信息</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="dialogVisibleVa = true">管理</el-button>
            <el-dialog
              title="修改帐号信息"
              :visible.sync="dialogVisibleVa"
              width="700px"
              :modal-append-to-body = "true"
              :append-to-body = "true">
              <div class="popup-cont">
                <el-form :model="ruleForm2" ref="ruleForm2" label-width="100px">
                  <el-form-item label="用户ID：" prop="region">
                    <span>12315</span>
                  </el-form-item>
                  <el-form-item label="所属组：" prop="region">
                    <el-select v-model="ruleForm2.name" placeholder="请选择所属组">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="所属用户：" prop="region">
                    <el-select v-model="ruleForm2.name" placeholder="请选择所属用户">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="登录名：" prop="name">
                    <el-input v-model="ruleForm2.name"></el-input>
                  </el-form-item>
                  <el-form-item label="使用地：" prop="region">
                    <el-select v-model="ruleForm2.name" placeholder="请选择省份">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                    <el-select v-model="ruleForm2.name" placeholder="请选择所在市">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="原始密码：" prop="region">
                    <span>12315</span>
                  </el-form-item>
                  <el-form-item label="新密码：" prop="name">
                    <el-input v-model="ruleForm2.name"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码：" prop="name">
                    <el-input v-model="ruleForm2.name"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="success" size="small">立即创建</el-button>
                    <el-button size="small">重置</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-dialog>
          </div>
          <ul class="card-content">
            <li class="left">
              <h4>
                所属组：<b>长安汽车</b>
                所属用户：<b>部门经理</b>
              </h4>
              <p>
                帐户ID：<font>321647</font><br>
                登录名：<font>Zxiaohao</font>
                <el-tooltip content="使用此帐号可登录前台系统" placement="right-start" effect="light">
                  <span>正常登陆</span>
                </el-tooltip><br>
                登录密码：<font>321***</font><br>
                使用地：<font>西安</font><br>
                最后登录日期：<font>2017-5-18 12：38：49</font><br>
                登录IP：<font>192.168.8.6</font><br>
              </p>
            </li>
            <li class="right">
              <p>
                帐号添加人：<font>张小刚</font><em>[管理员]</em><br>
                添加日期：<font>2017-5-18 12：38：49</font><br>
                使用有效期：<font>2018-5-18 12：38：49</font><br>
              </p>
            </li>
          </ul>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>基本资料</span>
            <el-button style="float: right; padding: 3px 0" type="text"  @click="dialogVisibleVb = true">管理</el-button>
            <el-dialog
              title="修改帐号信息"
              :visible.sync="dialogVisibleVb"
              width="700px"
              :center="true"
              :modal-append-to-body = "true"
              :append-to-body = "true">
              <div class="popup-cont">
                <el-form :model="ruleForm3" ref="ruleForm3" label-width="100px">
                  <el-form-item>
                    <div class="upload-img">
                      <el-upload
                        class="avatar-uploader"
                        action=""
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <font>当前头像:</font>
                        <img src="/static/images/linshi/user5.png" alt="">
                      </el-upload>
                    </div>
                  </el-form-item>
                  <el-form-item label="真实姓名：" prop="name">
                    <el-input v-model="ruleForm3.name"></el-input>
                  </el-form-item>
                  <el-form-item label="性别：" prop="region">
                    <el-select v-model="ruleForm3.name" placeholder="请选择您的性别">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="生日：" prop="region">
                    <el-date-picker
                      v-model="value1"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="现居住地：" prop="region">
                    <el-select v-model="ruleForm3.name" placeholder="请选择省份" style="width:30%">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                    <el-select v-model="ruleForm3.name" placeholder="请选择所在市" style="width:30%">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                    <el-select v-model="ruleForm3.name" placeholder="请选择所在地址" style="width:30%">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="手机号码：" prop="name">
                    <el-input v-model="ruleForm3.name"></el-input>
                  </el-form-item>
                  <el-form-item label="E-mail：" prop="name">
                    <el-input v-model="ruleForm3.name"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="success" size="small">立即修改</el-button>
                    <el-button size="small">取消</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-dialog>
          </div>
          <ul class="card-content">
            <li class="left">
              <p>
                姓名：<font>张小姐</font><br>
                手机：<font>135 8798 4654</font><br>
                邮箱：<font>wera@163.com</font><br>
                性别：<font>女</font><br>
                生日：<font>未填写</font><br>
                现居住地：<font>广东</font><br>
                固定电话：<font>未填写</font><br>
                描述：<font>长安汽车员工长安汽车员工长安汽车员工</font><br>
              </p>
            </li>
            <li class="right">
              <p>当前头像：</p>
              <img src="/static/images/linshi/user5.png" alt="">
              <img src="/static/images/linshi/user5.png" alt="" class="big-img">
            </li>
          </ul>
        </el-card>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import mixin from '@admin/config/mixin.js'
  export default {
    name: 'User',
    mixins: [mixin],
    data() {
      return {
        classuri: this.$interface.USER + '/',
        dialogVisible: false,
        dialogVisibleVa: false,
        dialogVisibleVb: false,
        value1: '',
        imageUrl: '',
        ruleForm:{
          user_id: '',
          username: '',
          phone: '',
          mail: '',
          group_ids: [],
          role_ids: [],
          desc: '',
          manage_group_ids: [],
        },
        ruleForm2: {
        },
        ruleForm3: {
        },
        rules:{
          username: [
            { required: true, message: '请输入用户账号', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          group_ids: [
            { required: true, message: '请选择所属分组', trigger: 'blur' }
          ],
          role_ids: [
            { required: true, message: '请选择所属角色', trigger: 'blur' }
          ],
        },
        groupOptions: [],
        propsSelected: {
          value: 'group_id',
          label: 'group_name',
          children: '_sub_',
        },
        rolesList: [],
        rolesForm: [],
        group_ids: [''],
        role_id: '',
        username: '',
        phone: '',
        tableData: [],
        checked_ids: [],
        is_view: false,
        page: 1,
        total: 0,
      }
    },
    computed: {
      group_id() {
        var group_ids = this.group_ids
        return group_ids.length > 0 ? group_ids[group_ids.length - 1] : ''
      }
    },
    mounted() {
      this.getToken(() => {
        this.getList()
      })
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
      },
      handleSelectionChange(val) {
        this.checked_ids = val.map((item) => {return item.user_id})
      },
      changeGroup(index = 'List') {
        var group_id;
        if (index != 'List') {
          var group_ids = this.ruleForm.group_ids
          group_id = group_ids[group_ids.length - 1] || ''
          if (!group_id) {
            this.rolesFrom = []
            return
          }
        } else {
          group_id = this.group_id
          if (!group_id) {
            this.role_id = ''
            this.rolesList = []
            return
          }
        }
        this.$request.get(this.$interface.ROLE_ROLES, {
          group_id: group_id,
          spm: this.spm,
          token: this.token,
        }, (response) => {
          if (index == 'List') {
            this.rolesList = response.data
          } else {
            this.rolesForm = response.data
          }
        })
      },
      getList(page = 1) {
        this.page = page
        this.$request.get(this.$interface.USER_LIST, {
          group_id: this.group_id,
          role_id: this.role_id,
          username: this.username,
          phone: this.phone,
          page: this.page,
          spm: this.spm,
          token: this.token,
        }, (response) => {
          this.tableData = response.data.list
          this.total = response.data.page.total
          this.groupOptions = response.data.groups
          this.rolesList = response.data.roles
        }, this.failure)
      },
      add() {
        this.clearValidate('ruleForm')
        this.$request.get(this.$interface.USER_ADD, {
          token: this.token,
          spm: this.spm,
        }, (response) => {
          this.rolesForm = response.data.roles
          this.ruleForm = {
            user_id: '',
            username: '',
            phone: '',
            mail: '',
            group_ids: response.data.group_ids,
            role_ids: [],
            desc: '',
            manage_group_ids: [],
          }
          this.dialogVisible = true
        }, this.failure)
      },
      edit(id) {
        this.clearValidate('ruleForm')
        this.$request.get(this.$interface.USER_EDIT, {
          user_id: id,
          token: this.token,
          spm: this.spm,
        }, (response) => {
          this.rolesForm = response.data.roles
          for (var x in this.ruleForm) {
            if (response.data.hasOwnProperty(x)) {
              this.ruleForm[x] = response.data[x]
            }
          }
          this.dialogVisible = true
        }, this.failure)
      },
      save(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var method = !this.ruleForm['user_id'] ? 'ADD' : 'EDIT'
            , params = Object.assign({}, {
              token: this.token,
              spm: this.spm,
            }, this.ruleForm)
            params['group_id'] = params['group_ids'][params['group_ids'].length-1]
            delete params['group_ids']
            this.$request.post(this.$interface['USER_'+method], params, (response) => {
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
      view(user_id) {
        this.clearValidate('ruleForm')
        this.$request.get(this.$interface.USER_EDIT, {
          user_id: user_id,
          token: this.token,
          spm: this.spm,
        }, (response) => {
          this.is_view = true
        }, this.failure)
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  @import "~@admin/assets/scss/common";
  @import "~@admin/assets/scss/style";
</style>
