<template>
	<div>
    <el-container>
      <el-aside width="200px" class="aside" >
        <div class="aside-logo">
          <span>我司管理系统</span>
        </div>
        <div class="aside-info">
          <!-- 内容菜单 -->
          <div :style="{display: $route.path!=='/index/main' ? 'block' : 'none'}">
            <el-menu
              v-for="submenu in menus"
              :key="submenu.id"
              :style="{display: [ 'm-'+submenu.id==active_menu_key ? 'block' : 'none' ]}"
              :default-active="active_submenu_key"
              :default-openeds="opened_submenu_key"
              :unique-opened="true"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              @select="leftHandleSelect">
              <el-submenu v-if="item.sub" v-for="item in submenu.sub" :index="'m-'+submenu.id+'-'+item.id" :key="item.id">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{ item.title }}</span>
                </template>
                <el-menu-item v-for="subitem in item.sub" :index="'m-'+submenu.id+'-'+subitem.id" :key="subitem.id">
                  <router-link :to="subitem.url+'?spm=m-'+submenu.id+'-'+subitem.id">
                    <i class="iconfont icon-group"></i>{{ subitem.title }}
                  </router-link>
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="'m-'+submenu.id+'-'+item.id" :key="item.id">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <router-link :to="item.url+'?spm=m-'+submenu.id+'-'+item.id">
                    <span>{{ item.title }}</span>
                  </router-link>
                </template>
              </el-menu-item>
            </el-menu>
          </div>
          <!-- 主页菜单 -->
          <div class="menu" :style="{display: $route.path==='/index/main' ? 'block' : 'none'}">
            <span>
              <img src="/static/images/linshi/user5.png" alt="">
            </span>
            <h3>
              <strong>{{ role_name }}</strong>
              <br>
              {{ username }}
            </h3>
            <p>
              欢迎登陆<br>
              营销决策支持系统DSS<br>
              后台管理系统
            </p>
            <el-button type="info" @click="logout()">退出系统</el-button>
          </div>
        </div>
      </el-aside>
      <el-container class="container">
        <el-header class="header">
          <el-menu :default-active="active_menu_key" mode="horizontal" @select="topHandleSelect" background-color="#fff" text-color="#333" active-text-color="#339ace">
            <el-menu-item v-for="menu in menus" :index="'m-'+menu.id" :key="menu.id" class="el-menuitem topbar-home-link" :data-menu-target="'m-'+menu.id">
              <a href="javascript:;">{{ menu.title }}</a>
            </el-menu-item>
            <li class="extra el-menu-item">
              <i class="iconfont icon-my_light"></i>
              {{ role_name }}
              <span @click="logout()">退出</span>
            </li>
          </el-menu>
        </el-header>
        <el-main class="main"><transition name="main"><router-view class="content" /></transition></el-main>
        <el-footer class="footer">
        </el-footer>
      </el-container>
    </el-container>
    <div class="opinion">
      <el-button icon="el-icon-edit" size="small" @click="dialogVisible = true"></el-button>
      <el-dialog
        title="用户反馈"
        :visible.sync="dialogVisible"
        width="700px"
        :modal-append-to-body = "true"
        :append-to-body = "true">
        <div class="popup-cont">
          <el-form label-position="top">
            <el-form-item label="反馈类型" prop="region" class="demo">
              <el-select v-model="region" placeholder="请选择活动区域">
                <el-option label="系统问题" value="shanghai"></el-option>
                <el-option label="界面优化" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="您的问题或反馈" prop="desc" >
              <el-input type="textarea" :rows="4" v-model="region"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small">立即发送</el-button>
              <el-button size="small">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
	</div>
</template>

<script type="text/ecmascript-6">
  import { mapActions } from 'vuex'
  import { ADMIN_SIGNOUT } from '@/store/admin'
  import menus from '@admin/config/menu'
  import mixin from '@admin/config/mixin'

	export default {
		name: 'admin',
    mixins: [mixin],
		data() {
			return {
        username: this.$store.state.admin.username,
        role_name: this.$store.state.admin.roles[0] ? this.$store.state.admin.roles[0].role_name : '暂无角色',
        dialogVisible:false,
        region:'',
        active_menu_key: this.$route.query.spm ? this.$route.query.spm.split('-').slice(0, 2).join('-') : '',
        opened_submenu_key: [],
        active_submenu_key: '',
			}
		},
    watch: {
      '$route': function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    },
    mounted() {
      this.getToken(() => {
        this.onhashchange()
      })
    },
    methods: {
      ...mapActions([ADMIN_SIGNOUT]),
      topHandleSelect(key, keyPath) {
        // 选中第一个顶部菜单
        this.active_menu_key = key
        // 打开第一个子菜单
        this.opened_submenu_key = this.menus.map((submenu) => {
          if (submenu && 'm-'+submenu.id == key && !!submenu.sub) {
            var submenuId = 'm-' + submenu.id
            var openNode = submenuId + '-' + submenu.sub[0].id
            if (!!submenu.sub[0] && !!submenu.sub[0].sub) {
              var subItem = submenu.sub[0].sub[0]
              this.active_submenu_key = submenuId + '-' + subItem.id
              this.$router.push({path: subItem.url,query:{spm: this.active_submenu_key}})
            } else {
              this.active_submenu_key = submenuId + '-' + submenu.sub[0].id
              this.$router.push({path: submenu.sub[0].url,query:{spm: this.active_submenu_key}})
            }
            return openNode
          }
        }).filter(id => id != undefined)
      },
      leftHandleSelect(key, keyPath) {
      },
      onhashchange() {
        var hash = this.$route.path.substr(1)
        var node = this.spm
        if (!/^m\-[\d\-]+$/.test(node)) {
          node = this.$helper.menu.getNode(this.menus_table, this.$helper.menu.getUri()) || '';
        }
        if (hash.length < 1 || node.length < 1) {
          var menu = this.menus_table.find(function(value, index, arr) {
            return (value.url != '' && value.url != '#')
          })
          var url = menu.url || 'index/main'
          , node = menu.path ? 'm' + menu.path : ''

          var arr = node.split('-')
          node = [arr[0], arr[1], arr[arr.length-1]].join('-')
          this.$router.push({path: url, query:{spm: node}})
        }

        var arr = node.split('-')
        node = [arr[0], arr[1], arr[arr.length-1]].join('-')
        var parentNode = [arr[0], arr[1]].join('-')

        /* 顶部菜单选中处理 */
        this.active_menu_key = parentNode
        /* 左边菜单选中处理 */
        this.active_submenu_key = node
      },
      logout() {
        const that = this;
        this.$confirm('是否退出登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.get(this.$interface.CHECK_LOGOUT, {
            token: this.token
          }, (response) => {
            this.ADMIN_SIGNOUT()
            this.$router.push({ path: '/login' })
          });
        }).catch(() => {
        });
      },
    },
    components:{
    }
	}
</script>

<style lang="scss" type="text/scss" scoped>

@import "~@admin/assets/scss/mixin";
@import "~@admin/assets/scss/common";

//侧边栏
.aside{
  background-color: #545c64; color: #fff; position: fixed; left: 0;top: 0;bottom: 0; overflow: hidden; z-index: 1005;
}
.aside-logo{
  width: 100%; height: 60px; line-height: 60px; background-color: #fff;text-align: center;
  span{
    font-size: 18px; color: #333;
  }
}
.aside-info{
  width: 201px;
  .menu{
    text-align: center;
    span{
      @include radius(1234,50%);
      display: block; width: 74px; height: 74px; margin: 30px auto 10px; border: 2px solid #eee; overflow: hidden;
    }
    strong{
      color: #f2ecec; font-size: 15px;
    }
    h3{
      line-height: 22px; margin-bottom: 30px;
    }
    p{
      @include font-adjust(13px, 28px, #ddd);
      margin-bottom: 30px;
    }
    font{
      @include radius(1345, 4px);
      @include box-Module(block, 116px, 30px, 0 auto, 0, #fff, 1px solid #eee);
      @include font-adjust(14px, 30px, #339ace);
      @include transition();
      cursor: pointer;
      &:hover{
        background-color: #00b4f3; color: #fff;
      }
    }
  }
  i{margin-right: 10px;}
}

.container{
  margin-left: 200px;
}

//头部
.header{
  padding: 0; position: fixed; width: calc(100% - 200px); z-index: 1999; min-width: 670px;
  li:nth-child(1){
    border-left: 1px solid #f5f5f5;
  }
  .extra{
    @include font-adjust(14px, 60px, #333);
    float: right; width: 200px; height: 60px;
    span{
      display: inline-block; margin-left: 20px; cursor: pointer; padding: 0 10px;
      &:hover{
        color: #0080c2;
      }
    }
  }
  .el-menuitem{
    padding: 0;
    a{display: block; width: 100%; height: 100%; padding: 0 20px;}
  }
}

.main-enter-active{
  transition: all .8s cubic-bezier(0.25, 0.1, 0.25, 0.9);
}

.main-leave-active{
  transition: all .8s cubic-bezier(0.25, 0.1, 0.25, 0.9);
}

.main-enter, .main-leave{
  transform: translateY(10px);
  opacity: 0;
}
.main{
  margin-top: 60px;
}
.opinion{
  position: fixed; bottom: 0; right: 0; width: 60px; height: 40px; text-align: center;
}
.popup-cont{
  padding: 20px 20px 5px;

}

</style>
