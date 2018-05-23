import Vue from 'vue'
import MetaInfo from 'vue-meta-info'
import App from './App.vue'
import store from '@/store'
import router from './router'
import ElementUI from 'element-ui';
import Request from '@/config/request';
import Interface from './config/interface'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import "./assets/css/animate.min.css"
import "./assets/css/main.css"
import "./assets/iconfont/iconfont.css"
import 'element-ui/lib/theme-chalk/index.css'
import 'swiper/dist/css/swiper.css'
import './assets/scss/element-variables.scss'

Vue.prototype.$request = Request
Vue.prototype.$interface = Interface

Vue.use(MetaInfo)
Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper);

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
