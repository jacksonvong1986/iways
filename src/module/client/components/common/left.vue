<template>
  <scroll-bar class="sidebar-container">
    <div class="left-menu">
      <label>
        <font class="expend-show">平台导航</font>
        <i :class="['iconfont', collapseStatus ? 'icon-fill108' : 'icon-collapse']" @click="leftMenuToggle()"></i>
      </label>
      <ul class="menu-first">
        <li v-for="level1 in menus" :class="[level1.sub?'menu-first-item':'menu-first-index']">
          <router-link v-if="!level1.sub" :to="level1.url" @click.native="selectMenu(level1.id, level1.hasOwnProperty('sub'))">
            <i class="iconfont icon-home " style="margin-right: 5px;"></i>
            <font class="expend-show">{{ level1.title}}</font>
          </router-link>
          <template v-else>
            <span @click="openSubMenu(level1)">{{ level1.title}}<i :class="['iconfont', level1.status ? 'icon-fold' : 'icon-unfold', 'expend-show']"></i></span>
            <el-collapse-transition>
              <ol class="menu-first-item-child" v-show="level1.status">
                <li v-for="level2 in level1.sub">
                  <span v-if="level2.sub" class="menu-first-item-child-title">
                    <i class="iconfont shrink-show" :class="level2.icon"></i>
                    <font class="expend-show">{{ level2.title }}</font>
                    <font class="shrink-show menu-first-item-child-title_text">{{ level2.title }}</font>
                  </span>
                  <ul v-if="!level2.sub" class="menu-first-item-child-item">
                    <li>
                      <router-link :to="level2.url"  @click.native="selectMenu(level2.id, level2.hasOwnProperty('sub'))">
                        <i :class="['iconfont', level2.icon]"></i> <font class="expend-show" >{{ level2.title }}</font>
                      </router-link>
                    </li>
                  </ul>
                  <ul v-else class="menu-first-item-child-item">
                    <li v-for="level3 in level2.sub">
                      <a v-if="level3.url.indexOf('http')==0" :href="level3.url" :title="level3.title" target="_blank">
                        <i :class="['iconfont', level3.icon]"></i>
                        <font class="expend-show" >{{ level3.title }}</font>
                      </a>
                      <router-link v-else :to="level3.url" :title="level3.title" @click.native="selectMenu(level3.id, level3.hasOwnProperty('sub'))">
                        <i :class="['iconfont', level3.icon]"></i>
                        <font class="expend-show" >{{ level3.title }}</font>
                      </router-link>
                      <transition name="el-fade-in-linear">
                        <div v-if="level3.sub" class="menu-second" v-show="level3.id==popoverMenuId&&popoverStatus">
                          <el-scrollbar style="height: 100%">
                            <label>
                              <font>{{ level3.title }}</font>
                              <i :class="['iconfont', !popoverStatus ? 'icon-fill108' : 'icon-collapse']" @click="leftPopoverMenuToggle"></i>
                            </label>
                            <ul>
                              <li v-for="level4 in level3.sub" :class="[level4.sub?'menu-second-item':'menu-second-index']">
                                <template v-if="level4.sub">
                                  <span @click="openSubMenu2(level4)">{{ level4.title }} <i :class="['iconfont', level4.status?'icon-fold':'icon-xiao73']"></i></span>
                                  <el-collapse-transition>
                                    <ol class="menu-second-item-child" v-show="level4.status">
                                      <li v-for="level5 in level4.sub" v-if="level5.is_menu"><router-link :to="level5.url">{{ level5.title }}</router-link></li>
                                    </ol>
                                  </el-collapse-transition>
                                </template>
                                <router-link v-else :to="level4.url">{{ level4.title }}</router-link>
                              </li>
                            </ul>
                          </el-scrollbar>
                        </div>
                      </transition>
                      <div class="menu-second-zoom" v-if="selectMenuZoomStatus"  @click="popoverStatusZoom(action)"><i style="font-size: 16px;" class="iconfont icon-right"></i></div>
                    </li>
                  </ul>
                </li>
              </ol>
            </el-collapse-transition>
          </template>
        </li>
      </ul>

    </div>
  </scroll-bar>
</template>

<script type="text/ecmascript-6">
  import ScrollBar from '@/components/ScrollBar'
  import menus from '@index/config/menu'
  import mixin from '@index/config/mixin.js'
  import JQuery from 'jquery'
  import bus from '@/config/eventBus'
  export default {
    name: '',
    mixins: [mixin],
    components: { ScrollBar },
    props: {
      isFixed: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        bodyHeight: '500',
        // menus: menus,
        collapseStatus: false,
        openMenuId: '1000',
        popoverMenuId: '0',
        popoverStatus: false,
        selectMenuZoomStatus: false,
        action: 'left',
        menu2:[],
        menu_group: [],
      }
    },
    created(){
      if (window.innerHeight) this.bodyHeight = parseInt(window.innerHeight) - 50;
      else if ((document.body) && (document.body.clientHeight)) this.bodyHeight = parseInt(document.body.clientHeight) - 50;
    },
    mounted(){
      this.collapseStatus = false

      bus.$on('selectMenuZoom', (status) => {
        this.selectMenuZoomStatus = status
        this.action = 'right'
      })
      this.initMenu()
    },
    methods:{
      // 折叠左边主菜单
      leftMenuToggle: function (status) {
        this.collapseStatus = status === undefined ? !this.collapseStatus : status
        this.$emit("hrinkLeftMenu", this.collapseStatus)
      },
      // 关闭弹出式菜单
      leftPopoverMenuToggle() {
        this.popoverStatus = false
        this.triggerPopoverMenu(this.popoverStatus)
        this.selectMenuZoomStatus = true
      },
      // 展开和折叠子菜单
      openSubMenu(menu, status) {
        menu.status = status != undefined ? status : !menu.status
        var id = menu.id
        // 已打开的菜单ID
        if (this.openMenuId != id) return
        // 二级菜单打开状态
        var popoverStatus = false
        // 子菜单打开状态
        var openStatus = menu.status
        // 展开的子菜单
        var openedSubMenu = this.$helper.findInArray('id', id, this.menus)
        // 弹出二级菜单
        if (openStatus && openedSubMenu && !!this.popoverMenuId) {
          var popoverMenu = this.$helper.findInArray('id', this.popoverMenuId, openedSubMenu.sub)
          if (popoverMenu && popoverMenu.hasOwnProperty('sub')) {
            popoverStatus = true
            this.openMenuId = id
          }
        }
        // 回调
        this.triggerPopoverMenu(popoverStatus)
        this.popoverStatus = popoverStatus
      },
      openSubMenu2(menu) {
        menu.status = !menu.status
      },
      selectMenu(id, hasSub = false) {
        if (hasSub&&(!this.popoverStatus||this.popoverMenuId!=id)) {
          this.popoverMenuId = id
          var popoverStatus = true
        } else {
          this.popoverMenuId = '0'
          var popoverStatus = false
        }
        // 当打开关闭主菜单时回调
        if (this.collapseStatus == false || hasSub) {
          this.leftMenuToggle(popoverStatus)
        }
        // 当打开关闭二级菜单时回调
        this.triggerPopoverMenu(popoverStatus)
        this.popoverStatus = popoverStatus
        // 还原控制二级菜单的控制条
        this.selectMenuZoomStatus = false
        this.action = 'left'

        this.selectFirstMenu()
      },
      // 默认控制左边二级菜单
      popoverStatusZoom(action = 'left'){
        this.selectMenuZoomStatus = false
        if (action == 'left') {
          this.selectMenu(this.popoverMenuId, true)
        } else {
          this.action = 'left'
          bus.$emit('triggerMainPanel', true)
        }
      },
      triggerPopoverMenu(popoverStatus = false) {
        this.$emit("popoverLeftSubmenu", popoverStatus)
      },
      initMenu() {
        // 选中菜单
        this.selectFirstMenu()
        // 选中菜单后回调函数
        var url = this.$route.path
        this.handleMenuSelected(url);
      },
      selectFirstMenu() {
        this.$nextTick(() => {
          let emptyMenu = JQuery('.menu-second:visible').find('a.router-link-exact-active').length == 0
          if (emptyMenu) {
            var url = JQuery('.menu-second:visible').find('a').attr('href')
            , path = '#' + this.$route.path
            if (url && url.indexOf(path) == 0) {
              this.$router.push({path: url.split('#')[1] || '/'})
            }
          }
        })
      },
      handleMenuSelected(url) {
        var menus = this.menus
          , urls = url.split('/')
        url = urls.slice(0, 3).join('/')
        // 确保selectedMenu是一级菜单
        menus.map((item) => {
          var selectedMenu = this.$helper.findInArray('url', url, item.sub)
          if (!!selectedMenu && selectedMenu.hasOwnProperty('url')) {
            this.openMenuId = item.id
            this.openSubMenu(item, true)
            this.selectMenu(selectedMenu.id, selectedMenu.hasOwnProperty('sub'))
          }
        })
      }
    }
  }
</script>
<style lang="scss" type="text/scss">
</style>
