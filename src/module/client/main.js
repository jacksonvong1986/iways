// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from '@/store/';
import ElementUI from 'element-ui';
import helper from '@/config/helper';
import Request from '@/config/request';
import Interface from './config/interface';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import "./assets/css/main.css"
import "./assets/css/animate.min.css"
import "./assets/iconfont/iconfont.css"
import 'element-ui/lib/theme-chalk/index.css'
import 'swiper/dist/css/swiper.css'
import './assets/scss/element-variables.scss'

Vue.prototype.$helper = helper
Vue.prototype.$request = Request
Vue.prototype.$interface = Interface

Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper);

Vue.component(CollapseTransition.name, CollapseTransition);
Vue.config.productionTip = false;

router.beforeEach(({meta, path}, from, next) => {
    var { auth = true } = meta
    var isLogin = Boolean(store.state.user.user_id) //true用户已登录， false用户未登录

    if (auth && !isLogin && path !== '/login') {
      // return next({ path: '/login' })
      window.location.href = '/login'
      return
    } 
    if (path !== '/login') {
      var menus = store.state.user.menus
      var menus_table = helper.arr2table(menus)
      if (!menus_table || menus_table.length == 0) {
        VueCookies.remove('user')
      }
      var first_menu = menus_table.find( item => { return !['', '#', '/'].includes(item.url) })
      var valid_menu = menus_table.find( item => { 
        let str = '\/setva|\/setvb|\/setvc|\/setvd|\/setve|\/detail|\/list'
        path = path.replace(new RegExp("(" + str + ")", "g"), '')
        return !['', '#', '/'].includes(item.url) && path == item.url 
      }) || ''

      // console.log(first_menu)
      // console.log(valid_menu)
      // console.log(!valid_menu && !!first_menu)
      // return;

      if (!valid_menu && !!first_menu) {
        return next({path: first_menu['url']})
      }
    }
    next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
