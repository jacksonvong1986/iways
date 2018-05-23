<template>
    <div class="login">
        <div class="cont">
            <div class="left">
                <img src="/static/images/client/logo.png" alt="Way-s">
                <p>请登录您的账号</p>
                <form v-on:submit.prevent="submit">
                  <span>
                      <i></i>
                      <input type="text" name="username" placeholder="帐号" v-model="form.username">
                  </span>
                  <span>
                      <i></i>
                      <input type="password" name="password" placeholder="密码" v-model="form.password">
                  </span>
                  <span>
                      <input type="checkbox">
                      <font>记住密码</font>
                      <a href="#">忘记密码</a>
                  </span>
                  <input type="submit" value="登录">
                </form>
            </div>
            <div class="right">
                <p>
                  欢迎使用威尔森
                  </br>
                  <font>智能决策系统</font>
                </p>
            </div>
        </div>
        <div class="footer">
            <p>公司地址：广州市天河区珠江新城东路12号高德置地H座12层（全层） <i class="fa fa-phone"></i> 联系电话：020-83912326</p>
            <p>© 2013 -2017,技术支持 广州威尔森信息科技有限公司   粤ICP备09206296号-6</p>
        </div>
    </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { USER_SIGNIN, USER_MENUS } from '@/store/user'
  import mixin from '@index/config/mixin'

  export default {
    mixins: [mixin],
    data() {
      return {
        btn: false, //true 已经提交过， false没有提交过
        form: {
          username: '',
          password: '',
        }
      }
    },
    created() {
      if (!!this.$route.query.code) {
        this.loginByCode(this.$route.query.code)
      }
    },
    methods: {
      ...mapActions([USER_SIGNIN, USER_MENUS]),
      submit() {
        this.btn = true
        if(!this.form.username || !this.form.password) return
        this.$request.post(this.$interface.LOGIN, this.form, (response) => {
          this.$message({
            type: 'success',
            message: '欢迎登录威尔森智能决策平台',
          });
          this.USER_SIGNIN(response.data)
          this.token = response.data.token
          this.getMenus(() => {
            this.$router.push({path: '/'})
          })
        }, (response) => {
          this.$message({
            type: 'error',
            message: response.msg,
          });
        });
      },
      loginByCode(code) {
        this.$request.get(this.$interface.LOGIN_BY_CODE, {code}, (response) => {
          this.$message({
            type: 'success',
            message: '欢迎登录威尔森智能决策平台',
          });
          this.USER_SIGNIN(response.data)
          this.token = response.data.token
          this.getMenus(() => {
            this.$router.push({path: '/'})
          })
        }, (response) => {
          this.$message({
            type: 'error',
            message: response.result_msg,
          });
        });
      },
      getMenus(callback) {
        this.$request.get(this.$interface.MENUS, {
          token: this.token,
        }, (response) => {
          var menus = response.data
          this.USER_MENUS(menus)
          callback()
        }, this.failure)
      },
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>

    @import "../../assets/scss/mixin.scss";

.login {
    @include box-center(1200px, 510px, fixed);
}
.cont {
    @include box-shadow(0px, 0px, 10px, rgba(153, 153, 153, 0.14));
    min-width:1100px;max-width: 1200px; margin:0 auto 30px; background-color:#fff;overflow: auto;
    > div {float: left}
}

.left {
    width: 40%;padding: 40px 40px 94px;
    img { max-width: 100%;border: none;display: block; margin: 0 auto}
    p {
        @include font-adjust(18px, 22px, #676a6d);
        margin: 10px 0 20px; padding: 0; letter-spacing: 4px;
    }
    span {
        display: block;width: 100%;margin: 15px 0;position: relative;
        i {
            @include box-Module(inline-block, 16px, 24px, 0px, 0px, url("/static/images/img02.png") no-repeat);
            position: absolute;top:10px; left:10px;
        }
        &:nth-child(1) i {background-position:-2px 0;}
        &:nth-child(2) i {background-position: -20px 0;}
        font {color: #676a6d}
        a {
            float: right;color: #3287b4;text-decoration: underline;
            &:hover {float: right;color: #f04848}
        }
    }
    input{
        background-color: #fcfcfc; border: 1px solid #eee; border-radius: 2px;
        &[type="text"],
        &[type="password"] {
            @include box-Module(block, 100%, 40px, 20px 0px 0px , 0px 0px 0px 35px);
        }
        &[type="checkbox"] {
            width: 18px;height: 18px; vertical-align: sub;
        }
        &[type="submit"] {
            @include box-Module(block, 100%, 50px, 0px, 0px, #00aaff, 0);
            @include font-adjust(18px, 50px, #fcfcfc, center);
            @include radius(1234, 2px);
            cursor: pointer;
            &:hover {background-color: #198dc7}
        }
    }
}
.right {
    @include box-Module(block, 60%, 435px, 0px , 0px 0px 0px 54px, url("/static/images/img03.jpg") no-repeat 0 0);
    p {
        @include font-adjust(18px, 22px, #fff, left);
        margin-top: 180px;letter-spacing:1px; text-shadow: 3px 2px 6px #000;
    }
    font { font-size: 30px; letter-spacing:8px;display: inline-block;margin-top: 10px;  }
}
.footer p {
    @include font-adjust(14px, 22px, #999, center); background: transparent;
}
</style>
