<template>
	<div class="login">
    <div class="center">
      <img src="/static/images/logo.png" alt="">
      <p>我司管理系统</p>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="username" class="input">
          <el-input prefix-icon="iconfont icon-people" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="input">
          <el-input prefix-icon="iconfont icon-suo" v-model="ruleForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100%">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <p class="footer">
      公司地址：广州市天河区珠江新城东路12号高德置地H座12层（全层） 联系电话：020-83912326 <br>
      © 2013 -2017,技术支持 广州威尔森信息科技有限公司 粤ICP备09206296号-6
    </p>
	</div>

</template>

<script type="text/ecmascript-6">
  import { mapActions } from 'vuex'
  import { ADMIN_SIGNIN, ADMIN_MENUS } from '@/store/admin'
	export default {
		name: 'Login',
		data() {
			return {
        token: '',
        ruleForm:{
          username:'',
          password:''
        },
        rules:{
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
          ],
        }
			}
		},
    methods: {
      ...mapActions([ADMIN_SIGNIN, ADMIN_MENUS]),
      submitForm(form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            this.$request.post(this.$interface.CHECK_LOGIN, this.ruleForm, (response) => {
              this.$message({
                type: 'success',
                message: '欢迎登录我司管理系统',
              });
              this.ADMIN_SIGNIN(response.data)
              this.token = response.data.token
              this.getMenus(() => {
                this.$router.push({path: '/'})
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
        })
      },
      getMenus(callback) {
        this.$request.get(this.$interface.INDEX, {
          token: this.token,
        }, (response) => {
          var menus = response.data
          this.ADMIN_MENUS(menus)
          callback()
        }, this.failure)
      },
    }
	}
</script>

<style lang="scss" type="text/scss" scoped>
  @import "~@admin/assets/scss/common";
  @import "~@admin/assets/scss/style";
</style>
