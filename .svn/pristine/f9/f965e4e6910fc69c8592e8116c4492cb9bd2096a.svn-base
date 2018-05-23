import Vue from 'vue'
import router from './router/index';
import Admin from './Admin';
import store from '@/store/';
import ElementUI from 'element-ui';
import helper from '@/config/helper';
import Request from '@/config/request';
import Interface from './config/interface';

import "./assets/css/main.css"
import "./assets/iconfont/iconfont.css"
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$helper = helper
Vue.prototype.$request = Request
Vue.prototype.$interface = Interface

Vue.use(ElementUI);

Vue.config.productionTip = false;

router.beforeEach(({meta, path}, from, next) => {
    var { auth = true } = meta
    var isLogin = Boolean(store.state.admin.user_id) //true用户已登录， false用户未登录

    if (auth && !isLogin && path !== '/login') {
      return next({ path: '/login' })
    }
    next()
})

/* eslint-disable no-new */
new Vue({
  el: '#admin',
  store,
  router,
  template: '<Admin/>',
  components: { Admin }
})
