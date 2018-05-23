import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import admin from './admin'
import VueCookies from 'vue-cookies'

Vue.use(Vuex)
Vue.use(VueCookies)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
  modules: {
    user,
    admin
  },
})
