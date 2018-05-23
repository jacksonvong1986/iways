<template>

	<div class="login">
    <div class="top">
      <div>
        <router-link to="/">
          <img src="/static/images/index/logo.png" alt="">
        </router-link>
        <cite>威尔森智能决策平台</cite>
        <router-link class="right" to="/">返回首页</router-link>
      </div>
    </div>
    <div class="main">
      <div>
        <h2>
          欢迎使用 <br>
          <b>威尔森智能决策平台</b>
        </h2>
        <div class="operating">
          <h4>
            <span :class="{on:login_type==1}" @click="login_type=1">客户登录</span>
            <span :class="{on:login_type==2}" @click="login_type=2">客户管理员登录</span>
          </h4>
          <div class="achieve">
            <el-form :model="ruleForm" ref="ruleForm" :rules="rules" class="login-form">
              <el-form-item prop="username" class="input">
                <i class="account-icon"></i><el-input v-model="ruleForm.username" placeholder="账号"></el-input>
              </el-form-item>
              <el-form-item prop="password" class="input">
                <i class="passwd-icon"></i><el-input type="password" v-model="ruleForm.password" placeholder="密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100%">立即登录</el-button>
              </el-form-item>
            </el-form>
            <el-checkbox v-model="ruleForm.remember">记住密码</el-checkbox>
            <a href="#">忘记密码</a>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <p class="copyright">© 2009-2018 广州威尔森信息科技有限公司 版权所有 粤ICP09206296号-1</p>
    </div>
	</div>
</template>

<script type="text/ecmascript-6">
  import { mapActions } from 'vuex'
  import { USER_SIGNIN, USER_MENUS } from '@/store/user'
  import { ADMIN_SIGNIN, ADMIN_MENUS } from '@/store/admin'
  import mixin from '@portal/config/mixin'

  export default {
    name: 'Login',
    mixins: [mixin],
    data() {
      return {
        login_type: 1,
        ruleForm: {
          username: '',
          password: '',
          remember: false,
        },
        rules:{
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 25, message: '长度在 6 到 25 个字符', trigger: 'blur' }
          ],
        }
			}
		},
    // mounted() {
    //   if (process.env.AJAX_ROOT != '/') {
    //     let domain = process.env.AJAX_ROOT
    //     let login_url = domain + this.$interface.CAS_LOGIN
    //     window.location.href = login_url
    //   }
    // },
    methods: {
      ...mapActions([USER_SIGNIN, ADMIN_SIGNIN, USER_MENUS, ADMIN_MENUS]),
      submitForm(form) {
        var URL
        , SIGNIN
        , MENUS
        , message
        , rediect_url
        if (this.login_type == 2) {
          URL = this.$interface.CHECK_LOGIN
          message = '欢迎登录威尔森智能决策管理平台'
          SIGNIN = ADMIN_SIGNIN
          MENUS = ADMIN_MENUS
          rediect_url = '/admin.html'
        } else {
          URL = this.$interface.LOGIN
          message = '欢迎登录威尔森智能决策操作平台'
          SIGNIN = USER_SIGNIN
          MENUS = USER_MENUS
          rediect_url = '/client.html'
        }
        this.$refs[form].validate(valid => {
          if (valid) {
            var that = this
            this.$request.post(URL, this.ruleForm, (response) => {
              this.$message({
                type: 'success',
                message: message,
                onClose() {
                }
              });
              that[SIGNIN](response.data)
              this.token = response.data.token
              this.getMenus(() => {
                window.location.href = rediect_url
              }, MENUS)
            }, (response) => {
              this.$message({
                type: 'error',
                message: response.msg
              })
            }, this.failure)
          } else {
            return false;
          }
        })
      },
      getMenus(callback, MENUS) {
        this.$request.get(this.$interface.MENUS, {
          token: this.token,
        }, (response) => {
          var menus = response.data
          this[MENUS](menus)
          callback()
        }, this.failure)
      },
    }
	}
</script>

<style lang="scss" type="text/scss" scoped>
  @import "~@portal/assets/scss/style";
</style>
